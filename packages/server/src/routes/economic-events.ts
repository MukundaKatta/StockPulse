import { Router, Request, Response } from 'express';

interface EconomicEvent {
  id: string;
  name: string;
  category: 'monetary_policy' | 'inflation' | 'employment' | 'gdp' | 'housing' | 'consumer';
  date: string;
  time: string;
  importance: 'high' | 'medium' | 'low';
  previous: string | null;
  forecast: string | null;
  actual: string | null;
  description: string;
  source: string;
}

const economicEvents: EconomicEvent[] = [
  {
    id: 'econ-001',
    name: 'FOMC Interest Rate Decision',
    category: 'monetary_policy',
    date: '2026-06-17',
    time: '14:00 ET',
    importance: 'high',
    previous: '4.50%',
    forecast: '4.25%',
    actual: null,
    description: 'Federal Open Market Committee announces target federal funds rate',
    source: 'Federal Reserve',
  },
  {
    id: 'econ-002',
    name: 'Consumer Price Index (CPI)',
    category: 'inflation',
    date: '2026-06-11',
    time: '08:30 ET',
    importance: 'high',
    previous: '2.8%',
    forecast: '2.7%',
    actual: null,
    description: 'Monthly consumer price index measuring inflation',
    source: 'Bureau of Labor Statistics',
  },
  {
    id: 'econ-003',
    name: 'Non-Farm Payrolls',
    category: 'employment',
    date: '2026-06-05',
    time: '08:30 ET',
    importance: 'high',
    previous: '175K',
    forecast: '180K',
    actual: null,
    description: 'Monthly change in non-farm employment',
    source: 'Bureau of Labor Statistics',
  },
  {
    id: 'econ-004',
    name: 'GDP Growth Rate (Q1)',
    category: 'gdp',
    date: '2026-06-25',
    time: '08:30 ET',
    importance: 'high',
    previous: '2.4%',
    forecast: '2.3%',
    actual: null,
    description: 'Third estimate of Q1 2026 GDP growth',
    source: 'Bureau of Economic Analysis',
  },
  {
    id: 'econ-005',
    name: 'Unemployment Rate',
    category: 'employment',
    date: '2026-06-05',
    time: '08:30 ET',
    importance: 'high',
    previous: '3.9%',
    forecast: '3.9%',
    actual: null,
    description: 'Monthly unemployment rate',
    source: 'Bureau of Labor Statistics',
  },
  {
    id: 'econ-006',
    name: 'Producer Price Index (PPI)',
    category: 'inflation',
    date: '2026-06-12',
    time: '08:30 ET',
    importance: 'medium',
    previous: '0.3%',
    forecast: '0.2%',
    actual: null,
    description: 'Monthly producer price index for final demand',
    source: 'Bureau of Labor Statistics',
  },
  {
    id: 'econ-007',
    name: 'Existing Home Sales',
    category: 'housing',
    date: '2026-06-22',
    time: '10:00 ET',
    importance: 'medium',
    previous: '4.14M',
    forecast: '4.20M',
    actual: null,
    description: 'Monthly existing home sales annualized rate',
    source: 'National Association of Realtors',
  },
  {
    id: 'econ-008',
    name: 'Consumer Confidence Index',
    category: 'consumer',
    date: '2026-06-30',
    time: '10:00 ET',
    importance: 'medium',
    previous: '102.5',
    forecast: '103.0',
    actual: null,
    description: 'Monthly consumer confidence survey',
    source: 'The Conference Board',
  },
];

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { category, importance, startDate, endDate } = req.query;

  let filtered = [...economicEvents];

  if (typeof category === 'string') {
    filtered = filtered.filter((e) => e.category === category);
  }

  if (typeof importance === 'string') {
    filtered = filtered.filter((e) => e.importance === importance);
  }

  if (typeof startDate === 'string') {
    filtered = filtered.filter((e) => e.date >= startDate);
  }

  if (typeof endDate === 'string') {
    filtered = filtered.filter((e) => e.date <= endDate);
  }

  filtered.sort((a, b) => a.date.localeCompare(b.date));

  res.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
});

export default router;
