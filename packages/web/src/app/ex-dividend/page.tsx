'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calendar } from 'lucide-react';

interface ExDividendEntry {
  symbol: string;
  company: string;
  exDate: string;
  payDate: string;
  dividend: number;
  yield: number;
  frequency: 'Monthly' | 'Quarterly' | 'Semi-Annual';
  status: 'Upcoming' | 'Today' | 'Passed';
}

const ENTRIES: ExDividendEntry[] = [
  { symbol: 'AAPL', company: 'Apple', exDate: 'Jun 7', payDate: 'Jun 15', dividend: 0.25, yield: 0.54, frequency: 'Quarterly', status: 'Upcoming' },
  { symbol: 'MSFT', company: 'Microsoft', exDate: 'Jun 5', payDate: 'Jun 13', dividend: 0.75, yield: 0.74, frequency: 'Quarterly', status: 'Upcoming' },
  { symbol: 'JNJ', company: 'Johnson & Johnson', exDate: 'Jun 3', payDate: 'Jun 11', dividend: 1.24, yield: 3.1, frequency: 'Quarterly', status: 'Today' },
  { symbol: 'PG', company: 'Procter & Gamble', exDate: 'Jun 1', payDate: 'Jun 10', dividend: 1.01, yield: 2.4, frequency: 'Quarterly', status: 'Today' },
  { symbol: 'O', company: 'Realty Income', exDate: 'May 31', payDate: 'Jun 15', dividend: 0.26, yield: 5.8, frequency: 'Monthly', status: 'Passed' },
  { symbol: 'KO', company: 'Coca-Cola', exDate: 'Jun 10', payDate: 'Jun 28', dividend: 0.49, yield: 3.2, frequency: 'Quarterly', status: 'Upcoming' },
  { symbol: 'T', company: 'AT&T', exDate: 'Jun 8', payDate: 'Jun 20', dividend: 0.28, yield: 6.5, frequency: 'Quarterly', status: 'Upcoming' },
  { symbol: 'SCHD', company: 'Schwab US Dividend', exDate: 'Jun 4', payDate: 'Jun 12', dividend: 0.68, yield: 3.5, frequency: 'Quarterly', status: 'Upcoming' },
];

const statusVariant = (s: string) => s === 'Today' ? 'danger' : s === 'Upcoming' ? 'success' : 'default';

export default function ExDividendPage() {
  const todayCount = ENTRIES.filter(e => e.status === 'Today').length;
  const upcomingCount = ENTRIES.filter(e => e.status === 'Upcoming').length;
  const avgYield = ENTRIES.reduce((s, e) => s + e.yield, 0) / ENTRIES.length;
  const totalDividends = ENTRIES.reduce((s, e) => s + e.dividend, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Ex-Dividend Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">Upcoming and recent ex-dividend dates</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Today</p><p className="text-lg font-bold text-red-400">{todayCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Upcoming</p><p className="text-lg font-bold text-green-400">{upcomingCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-indigo-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Div/Share</p><p className="text-lg font-bold text-white">{formatCurrency(totalDividends)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-indigo-400" /> Ex-Dividend Dates</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ENTRIES.map((e) => (
            <div key={e.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{e.symbol} <span className="text-gray-500">{e.company}</span></p>
                <p className="text-xs text-gray-500">Ex {e.exDate} &middot; Pay {e.payDate} &middot; {e.frequency}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(e.dividend)}</p>
                  <p className="text-[10px] text-gray-500">{e.yield}% yield</p>
                </div>
                <Badge variant={statusVariant(e.status)}>{e.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
