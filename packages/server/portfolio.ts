/**
 * Portfolio analytics — position snapshot + risk summary.
 *
 * StockPulse's dashboard panels all ultimately come from one canonical
 * portfolio snapshot: positions + their mark-to-market, realised P&L
 * from closed lots, unrealised P&L from open lots, plus rollups like
 * beta-to-benchmark and sector concentration. This module is that
 * snapshot builder — deterministic, side-effect-free, so tests can
 * seed any point-in-time state and assert.
 */

export type Lot = {
  id: string;
  symbol: string;
  quantity: number;              // signed — negative = short
  costBasis: number;             // per-share
  acquiredAt: number;            // epoch ms
};

export type Trade = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  tradedAt: number;
};

export type Quote = {
  symbol: string;
  last: number;
  previousClose: number;
  betaToBenchmark?: number;      // e.g. SPY
  sector?: string;
};

export type Position = {
  symbol: string;
  quantity: number;
  avgCost: number;
  marketValue: number;
  unrealisedPnl: number;
  unrealisedPnlPct: number;
  dayPnl: number;
  weight: number;                // fraction of portfolio MV
  sector?: string;
};

export type PortfolioSnapshot = {
  asOf: number;
  positions: Position[];
  cash: number;
  grossMarketValue: number;
  netMarketValue: number;
  dayPnl: number;
  unrealisedPnl: number;
  beta: number;                  // weighted
  sectorWeights: Record<string, number>;
  herfindahl: number;            // concentration 0..1
};

/** FIFO-roll lots against trades to produce the current open-lot set. */
export function applyTrades(initial: Lot[], trades: Trade[]): { open: Lot[]; realisedPnl: number } {
  const bySymbol = new Map<string, Lot[]>();
  for (const l of initial) {
    const arr = bySymbol.get(l.symbol) ?? [];
    arr.push({ ...l });
    bySymbol.set(l.symbol, arr);
  }
  let realised = 0;
  for (const t of [...trades].sort((a, b) => a.tradedAt - b.tradedAt)) {
    const lots = bySymbol.get(t.symbol) ?? [];
    let remaining = t.quantity;
    if (t.side === "buy") {
      lots.push({
        id: t.id,
        symbol: t.symbol,
        quantity: remaining,
        costBasis: t.price,
        acquiredAt: t.tradedAt,
      });
    } else {
      while (remaining > 0 && lots.length > 0) {
        const lot = lots[0];
        const take = Math.min(lot.quantity, remaining);
        realised += take * (t.price - lot.costBasis);
        lot.quantity -= take;
        remaining -= take;
        if (lot.quantity <= 1e-9) lots.shift();
      }
      if (remaining > 0) {
        // opens a short lot with negative quantity
        lots.push({
          id: t.id,
          symbol: t.symbol,
          quantity: -remaining,
          costBasis: t.price,
          acquiredAt: t.tradedAt,
        });
      }
    }
    bySymbol.set(t.symbol, lots);
  }
  const open: Lot[] = [];
  for (const [, lots] of bySymbol) open.push(...lots);
  return { open, realisedPnl: round(realised, 2) };
}

export function snapshot(
  openLots: Lot[],
  quotes: Record<string, Quote>,
  cash: number,
  asOf: number,
): PortfolioSnapshot {
  const bySymbol = new Map<string, Lot[]>();
  for (const l of openLots) {
    const arr = bySymbol.get(l.symbol) ?? [];
    arr.push(l);
    bySymbol.set(l.symbol, arr);
  }

  const positions: Position[] = [];
  let gmv = 0;
  let nmv = 0;
  let dayPnl = 0;
  let unrealisedPnl = 0;
  for (const [symbol, lots] of bySymbol) {
    const q = quotes[symbol];
    if (!q) continue;
    const qty = lots.reduce((a, l) => a + l.quantity, 0);
    if (qty === 0) continue;
    const costQty = lots.reduce((a, l) => a + l.costBasis * l.quantity, 0);
    const avgCost = costQty / qty;
    const mv = qty * q.last;
    const unr = qty * (q.last - avgCost);
    const day = qty * (q.last - q.previousClose);
    gmv += Math.abs(mv);
    nmv += mv;
    unrealisedPnl += unr;
    dayPnl += day;
    positions.push({
      symbol,
      quantity: qty,
      avgCost: round(avgCost, 4),
      marketValue: round(mv, 2),
      unrealisedPnl: round(unr, 2),
      unrealisedPnlPct: round(unr / Math.abs(costQty || 1), 4),
      dayPnl: round(day, 2),
      weight: 0,
      sector: q.sector,
    });
  }
  const mvTotal = gmv || 1;
  for (const p of positions) p.weight = round(Math.abs(p.marketValue) / mvTotal, 4);

  let beta = 0;
  for (const p of positions) {
    const q = quotes[p.symbol];
    if (q?.betaToBenchmark !== undefined) beta += p.weight * q.betaToBenchmark;
  }

  const sectorWeights: Record<string, number> = {};
  for (const p of positions) {
    const s = p.sector ?? "unclassified";
    sectorWeights[s] = round((sectorWeights[s] ?? 0) + p.weight, 4);
  }
  const herfindahl = round(
    positions.reduce((a, p) => a + p.weight * p.weight, 0),
    4,
  );

  return {
    asOf,
    positions: positions.sort((a, b) => b.weight - a.weight),
    cash: round(cash, 2),
    grossMarketValue: round(gmv, 2),
    netMarketValue: round(nmv + cash, 2),
    dayPnl: round(dayPnl, 2),
    unrealisedPnl: round(unrealisedPnl, 2),
    beta: round(beta, 4),
    sectorWeights,
    herfindahl,
  };
}

function round(x: number, digits: number): number {
  const m = Math.pow(10, digits);
  return Math.round(x * m) / m;
}
