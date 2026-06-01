import { Router, Request, Response } from 'express';

interface MarketCalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'half_day' | 'expiration' | 'ipo' | 'earnings';
  exchange: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

const calendarEvents: MarketCalendarEvent[] = [
  {
    id: 'cal-001',
    title: 'Independence Day',
    date: '2026-07-04',
    type: 'holiday',
    exchange: 'NYSE',
    description: 'US markets closed for Independence Day',
    impact: 'high',
  },
  {
    id: 'cal-002',
    title: 'Independence Day Early Close',
    date: '2026-07-03',
    type: 'half_day',
    exchange: 'NYSE',
    description: 'Markets close at 1:00 PM ET',
    impact: 'medium',
  },
  {
    id: 'cal-003',
    title: 'Monthly Options Expiration',
    date: '2026-06-19',
    type: 'expiration',
    exchange: 'CBOE',
    description: 'June monthly options expiration (OpEx)',
    impact: 'high',
  },
  {
    id: 'cal-004',
    title: 'Weekly Options Expiration',
    date: '2026-06-06',
    type: 'expiration',
    exchange: 'CBOE',
    description: 'Weekly options expiration',
    impact: 'low',
  },
  {
    id: 'cal-005',
    title: 'Labor Day',
    date: '2026-09-07',
    type: 'holiday',
    exchange: 'NYSE',
    description: 'US markets closed for Labor Day',
    impact: 'high',
  },
  {
    id: 'cal-006',
    title: 'Thanksgiving Day',
    date: '2026-11-26',
    type: 'holiday',
    exchange: 'NYSE',
    description: 'US markets closed for Thanksgiving',
    impact: 'high',
  },
  {
    id: 'cal-007',
    title: 'Thanksgiving Early Close',
    date: '2026-11-27',
    type: 'half_day',
    exchange: 'NYSE',
    description: 'Markets close at 1:00 PM ET',
    impact: 'medium',
  },
  {
    id: 'cal-008',
    title: 'AAPL Earnings',
    date: '2026-07-30',
    type: 'earnings',
    exchange: 'NASDAQ',
    description: 'Apple Inc. Q3 2026 earnings report',
    impact: 'high',
  },
];

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { type, exchange, startDate, endDate, impact } = req.query;

  let filtered = [...calendarEvents];

  if (typeof type === 'string') {
    filtered = filtered.filter((e) => e.type === type);
  }

  if (typeof exchange === 'string') {
    filtered = filtered.filter((e) => e.exchange.toLowerCase() === exchange.toLowerCase());
  }

  if (typeof impact === 'string') {
    filtered = filtered.filter((e) => e.impact === impact);
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
