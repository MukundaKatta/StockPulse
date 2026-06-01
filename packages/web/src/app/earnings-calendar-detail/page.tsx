'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Calendar } from 'lucide-react';

interface EarningsEvent {
  company: string;
  ticker: string;
  date: string;
  time: 'BMO' | 'AMC';
  epsEstimate: number;
  revenueEstimate: string;
  surprise: number | null;
}

const EARNINGS: EarningsEvent[] = [
  { company: 'Apple Inc', ticker: 'AAPL', date: 'Jan 30', time: 'AMC', epsEstimate: 2.10, revenueEstimate: '$118B', surprise: null },
  { company: 'Microsoft', ticker: 'MSFT', date: 'Jan 29', time: 'AMC', epsEstimate: 3.12, revenueEstimate: '$68B', surprise: 4.2 },
  { company: 'Meta Platforms', ticker: 'META', date: 'Jan 31', time: 'AMC', epsEstimate: 5.25, revenueEstimate: '$45B', surprise: null },
  { company: 'Amazon', ticker: 'AMZN', date: 'Feb 1', time: 'AMC', epsEstimate: 1.15, revenueEstimate: '$187B', surprise: null },
  { company: 'Tesla', ticker: 'TSLA', date: 'Jan 29', time: 'AMC', epsEstimate: 0.72, revenueEstimate: '$25.6B', surprise: -8.1 },
  { company: 'Alphabet', ticker: 'GOOGL', date: 'Jan 30', time: 'AMC', epsEstimate: 1.72, revenueEstimate: '$86B', surprise: null },
  { company: 'NVIDIA', ticker: 'NVDA', date: 'Feb 21', time: 'AMC', epsEstimate: 0.64, revenueEstimate: '$38B', surprise: null },
];

export default function EarningsCalendarDetailPage() {
  const reported = EARNINGS.filter(e => e.surprise !== null).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Earnings Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">Detailed upcoming and recent earnings</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Upcoming</p>
          <p className="text-lg font-bold text-white">{EARNINGS.length - reported}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Reported</p>
          <p className="text-lg font-bold text-indigo-400">{reported}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">This Week</p>
          <p className="text-lg font-bold text-white">{EARNINGS.filter(e => e.date.includes('Jan')).length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Calendar className="inline h-4 w-4 mr-1" />Earnings Schedule</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {EARNINGS.map((e) => (
            <div key={e.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{e.company} <span className="text-gray-500">{e.ticker}</span></p>
                <p className="text-xs text-gray-500">{e.date} {e.time} &middot; EPS Est. ${e.epsEstimate} &middot; Rev {e.revenueEstimate}</p>
              </div>
              <div className="flex items-center gap-2">
                {e.surprise !== null ? (
                  <Badge variant={e.surprise >= 0 ? 'success' : 'danger'}>
                    {e.surprise > 0 ? '+' : ''}{e.surprise}%
                  </Badge>
                ) : (
                  <Badge variant="default">Pending</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
