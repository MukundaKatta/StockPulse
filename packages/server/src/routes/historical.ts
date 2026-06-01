import { Router, Request, Response } from 'express';

const router = Router();

interface HistoricalBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjClose: number;
}

function generateBars(symbol: string, days: number): HistoricalBar[] {
  const bases: Record<string, number> = { AAPL: 186, MSFT: 405, NVDA: 878, TSLA: 188, META: 484, GOOGL: 142, AMZN: 178, JPM: 182 };
  const base = bases[symbol.toUpperCase()] ?? 100;
  const bars: HistoricalBar[] = [];
  let price = base;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const change = (Math.random() - 0.48) * base * 0.03;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * base * 0.01;
    const low = Math.min(open, close) - Math.random() * base * 0.01;
    const volume = Math.floor(20000000 + Math.random() * 40000000);

    bars.push({
      date: date.toISOString().split('T')[0],
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
      adjClose: Number(close.toFixed(2)),
    });
    price = close;
  }
  return bars;
}

router.get('/:symbol', (req: Request, res: Response) => {
  const { symbol } = req.params;
  const days = Math.min(Number(req.query.days) || 30, 365);
  const bars = generateBars(symbol, days);
  res.json({ symbol: symbol.toUpperCase(), bars, count: bars.length });
});

export default router;
