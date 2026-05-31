export interface Position {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export function totalValue(positions: Position[]): number {
  return positions.reduce((s, p) => s + p.shares * p.currentPrice, 0);
}

export function totalCost(positions: Position[]): number {
  return positions.reduce((s, p) => s + p.shares * p.avgCost, 0);
}

export function totalGainLoss(positions: Position[]): number {
  return totalValue(positions) - totalCost(positions);
}

export function totalGainLossPercent(positions: Position[]): number {
  const cost = totalCost(positions);
  return cost > 0 ? ((totalValue(positions) - cost) / cost) * 100 : 0;
}

export function positionWeight(position: Position, positions: Position[]): number {
  const total = totalValue(positions);
  return total > 0 ? ((position.shares * position.currentPrice) / total) * 100 : 0;
}

export function positionGainLoss(position: Position): number {
  return (position.currentPrice - position.avgCost) * position.shares;
}

export function positionGainLossPercent(position: Position): number {
  return position.avgCost > 0 ? ((position.currentPrice - position.avgCost) / position.avgCost) * 100 : 0;
}

export function diversificationScore(positions: Position[]): number {
  const total = totalValue(positions);
  if (total === 0) return 0;
  const weights = positions.map((p) => (p.shares * p.currentPrice) / total);
  const hhi = weights.reduce((s, w) => s + w * w, 0);
  return Math.round((1 - hhi) * 100);
}

export function topHolding(positions: Position[]): Position | undefined {
  return positions.reduce<Position | undefined>(
    (max, p) => (!max || p.shares * p.currentPrice > max.shares * max.currentPrice ? p : max),
    undefined
  );
}

export function sortByValue(positions: Position[], desc = true): Position[] {
  return [...positions].sort((a, b) => {
    const va = a.shares * a.currentPrice;
    const vb = b.shares * b.currentPrice;
    return desc ? vb - va : va - vb;
  });
}
