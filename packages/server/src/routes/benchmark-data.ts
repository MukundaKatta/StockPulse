import { Router, Request, Response } from 'express';

interface BenchmarkIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  previousClose: number;
  yearToDateReturn: number;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  peRatio: number;
  dividendYield: number;
  components: number;
  lastUpdated: string;
}

interface BenchmarkHistoryPoint {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

const benchmarks: BenchmarkIndex[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    value: 5320.45,
    change: 28.73,
    changePercent: 0.54,
    previousClose: 5291.72,
    yearToDateReturn: 11.8,
    oneYearReturn: 24.5,
    threeYearReturn: 32.1,
    fiveYearReturn: 82.4,
    peRatio: 23.8,
    dividendYield: 1.32,
    components: 500,
    lastUpdated: '2026-05-31T20:00:00Z',
  },
  {
    symbol: 'NDX',
    name: 'NASDAQ 100',
    value: 18945.32,
    change: 142.55,
    changePercent: 0.76,
    previousClose: 18802.77,
    yearToDateReturn: 14.2,
    oneYearReturn: 29.8,
    threeYearReturn: 41.5,
    fiveYearReturn: 125.3,
    peRatio: 32.1,
    dividendYield: 0.65,
    components: 100,
    lastUpdated: '2026-05-31T20:00:00Z',
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones Industrial Average',
    value: 39125.88,
    change: -45.22,
    changePercent: -0.12,
    previousClose: 39171.1,
    yearToDateReturn: 5.4,
    oneYearReturn: 16.2,
    threeYearReturn: 22.8,
    fiveYearReturn: 52.1,
    peRatio: 20.5,
    dividendYield: 1.88,
    components: 30,
    lastUpdated: '2026-05-31T20:00:00Z',
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000',
    value: 2085.44,
    change: 12.33,
    changePercent: 0.59,
    previousClose: 2073.11,
    yearToDateReturn: 3.2,
    oneYearReturn: 12.5,
    threeYearReturn: 8.4,
    fiveYearReturn: 35.6,
    peRatio: 26.3,
    dividendYield: 1.45,
    components: 2000,
    lastUpdated: '2026-05-31T20:00:00Z',
  },
  {
    symbol: 'VIX',
    name: 'CBOE Volatility Index',
    value: 14.32,
    change: -0.85,
    changePercent: -5.6,
    previousClose: 15.17,
    yearToDateReturn: -18.5,
    oneYearReturn: -22.1,
    threeYearReturn: -35.2,
    fiveYearReturn: -48.8,
    peRatio: 0,
    dividendYield: 0,
    components: 0,
    lastUpdated: '2026-05-31T20:00:00Z',
  },
];

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { symbol } = req.query;

  if (typeof symbol === 'string') {
    const benchmark = benchmarks.find(
      (b) => b.symbol.toUpperCase() === symbol.toUpperCase()
    );

    if (!benchmark) {
      res.status(404).json({
        success: false,
        error: `Benchmark '${symbol}' not found`,
        availableSymbols: benchmarks.map((b) => b.symbol),
      });
      return;
    }

    res.json({ success: true, data: benchmark });
    return;
  }

  res.json({
    success: true,
    data: benchmarks,
    total: benchmarks.length,
  });
});

router.get('/:symbol/history', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const period = (req.query.period as string) || '1M';

  const benchmark = benchmarks.find((b) => b.symbol === symbol);
  if (!benchmark) {
    res.status(404).json({
      success: false,
      error: `Benchmark '${symbol}' not found`,
    });
    return;
  }

  const periodDays: Record<string, number> = {
    '1W': 7, '1M': 30, '3M': 90, '6M': 180, '1Y': 365,
  };
  const days = periodDays[period] || 30;

  const history: BenchmarkHistoryPoint[] = [];
  let value = benchmark.value * (1 - Math.random() * 0.1);

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const change = value * (Math.random() - 0.48) * 0.02;
    value += change;

    history.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(((change / (value - change)) * 100).toFixed(2)),
    });
  }

  res.json({
    success: true,
    symbol,
    name: benchmark.name,
    period,
    data: history,
  });
});

export default router;
