'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calendar, Clock } from 'lucide-react';

interface EarningsEvent {
  symbol: string;
  name: string;
  date: string;
  time: 'BMO' | 'AMC';
  epsEstimate: number;
  revenueEstimate: number;
  marketCap: string;
}

const EARNINGS: EarningsEvent[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', date: '2024-01-25', time: 'AMC', epsEstimate: 2.10, revenueEstimate: 117.9e9, marketCap: '$2.89T' },
  { symbol: 'MSFT', name: 'Microsoft', date: '2024-01-25', time: 'AMC', epsEstimate: 2.78, revenueEstimate: 61.1e9, marketCap: '$2.89T' },
  { symbol: 'TSLA', name: 'Tesla Inc.', date: '2024-01-24', time: 'AMC', epsEstimate: 0.74, revenueEstimate: 25.6e9, marketCap: '$790B' },
  { symbol: 'NFLX', name: 'Netflix', date: '2024-01-23', time: 'AMC', epsEstimate: 2.22, revenueEstimate: 8.7e9, marketCap: '$212B' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', date: '2024-01-23', time: 'BMO', epsEstimate: 2.28, revenueEstimate: 21.4e9, marketCap: '$382B' },
  { symbol: 'V', name: 'Visa Inc.', date: '2024-01-25', time: 'AMC', epsEstimate: 2.34, revenueEstimate: 8.6e9, marketCap: '$550B' },
  { symbol: 'PG', name: 'Procter & Gamble', date: '2024-01-23', time: 'BMO', epsEstimate: 1.70, revenueEstimate: 21.4e9, marketCap: '$355B' },
  { symbol: 'INTC', name: 'Intel Corp', date: '2024-01-25', time: 'AMC', epsEstimate: 0.45, revenueEstimate: 15.2e9, marketCap: '$208B' },
  { symbol: 'IBM', name: 'IBM', date: '2024-01-24', time: 'AMC', epsEstimate: 3.78, revenueEstimate: 17.3e9, marketCap: '$168B' },
  { symbol: 'T', name: 'AT&T', date: '2024-01-24', time: 'BMO', epsEstimate: 0.55, revenueEstimate: 31.5e9, marketCap: '$122B' },
];

export default function EarningsCalendarPage() {
  const grouped = EARNINGS.reduce<Record<string, EarningsEvent[]>>((acc, e) => {
    (acc[e.date] ||= []).push(e);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Earnings Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">Upcoming quarterly earnings reports</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">This Week</p><p className="text-lg font-bold text-white">{EARNINGS.length}</p><p className="text-[10px] text-gray-500">reports</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Before Open</p><p className="text-lg font-bold text-yellow-400">{EARNINGS.filter((e) => e.time === 'BMO').length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">After Close</p><p className="text-lg font-bold text-indigo-400">{EARNINGS.filter((e) => e.time === 'AMC').length}</p></Card>
      </div>

      {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, events]) => (
        <Card key={date}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-3.5 w-3.5 text-gray-500" />
              {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-white/5">
            {events.map((ev) => (
              <div key={ev.symbol} className="flex items-center gap-3 py-2.5 px-2">
                <Badge variant={ev.time === 'BMO' ? 'warning' : 'info'} className="text-[9px] w-10 justify-center">{ev.time}</Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-indigo-400">{ev.symbol}</span>
                    <span className="text-xs text-gray-500 truncate">{ev.name}</span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <p className="font-mono text-gray-300">EPS Est: ${ev.epsEstimate.toFixed(2)}</p>
                  <p className="text-gray-500">{ev.marketCap}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
