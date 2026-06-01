'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingDown } from 'lucide-react';

interface PnLData { date: string; realized: number; unrealized: number; total: number; trades: number; winRate: number; }
const DAYS: PnLData[] = [
  { date: '2024-03-28', realized: 1240, unrealized: 3420, total: 4660, trades: 4, winRate: 75 },
  { date: '2024-03-27', realized: -480, unrealized: 1840, total: 1360, trades: 6, winRate: 50 },
  { date: '2024-03-26', realized: 820, unrealized: -2240, total: -1420, trades: 3, winRate: 67 },
  { date: '2024-03-25', realized: 0, unrealized: -4820, total: -4820, trades: 0, winRate: 0 },
  { date: '2024-03-22', realized: 2480, unrealized: 1280, total: 3760, trades: 8, winRate: 63 },
  { date: '2024-03-21', realized: -1240, unrealized: -840, total: -2080, trades: 5, winRate: 40 },
  { date: '2024-03-20', realized: 680, unrealized: 2840, total: 3520, trades: 4, winRate: 75 },
  { date: '2024-03-19', realized: 1840, unrealized: -420, total: 1420, trades: 6, winRate: 67 },
];

export default function DailyPnLPage() {
  const totalPnL = DAYS.reduce((s, d) => s + d.total, 0);
  const winDays = DAYS.filter((d) => d.total > 0).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Daily P&L</h1><p className="mt-1 text-sm text-gray-500">Daily profit and loss breakdown — realized and unrealized</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Period P&L</p><p className={cn('text-lg font-bold', totalPnL >= 0 ? 'text-green-400' : 'text-red-400')}>${totalPnL.toLocaleString()}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Win Days</p><p className="text-lg font-bold text-green-400">{winDays}/{DAYS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Best Day</p><p className="text-lg font-bold text-indigo-400">${Math.max(...DAYS.map((d) => d.total)).toLocaleString()}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingDown className="h-4 w-4 text-indigo-400" /> Daily Breakdown</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DAYS.map((d) => (
            <div key={d.date} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{d.date}</span>
                <Badge variant={d.total > 0 ? 'success' : d.total < 0 ? 'danger' : 'default'}>{d.total > 0 ? 'Profit' : d.total < 0 ? 'Loss' : 'Flat'}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn('text-[10px] font-mono', d.realized >= 0 ? 'text-green-400' : 'text-red-400')}>R: ${d.realized.toLocaleString()}</span>
                <span className={cn('text-[10px] font-mono', d.unrealized >= 0 ? 'text-green-400' : 'text-red-400')}>U: ${d.unrealized.toLocaleString()}</span>
                <span className={cn('text-sm font-bold font-mono', d.total >= 0 ? 'text-green-400' : 'text-red-400')}>{d.total >= 0 ? '+' : ''}${d.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
