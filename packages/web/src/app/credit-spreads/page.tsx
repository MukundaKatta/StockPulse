'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface CreditSpread {
  category: string;
  spread: number;
  change: number;
  weekAgo: number;
  yearAgo: number;
  rating: string;
}

const SPREADS: CreditSpread[] = [
  { category: 'IG Corporate (AAA)', spread: 55, change: -2, weekAgo: 57, yearAgo: 48, rating: 'AAA' },
  { category: 'IG Corporate (AA)', spread: 72, change: -1, weekAgo: 73, yearAgo: 65, rating: 'AA' },
  { category: 'IG Corporate (A)', spread: 95, change: 3, weekAgo: 92, yearAgo: 88, rating: 'A' },
  { category: 'IG Corporate (BBB)', spread: 138, change: 5, weekAgo: 133, yearAgo: 125, rating: 'BBB' },
  { category: 'HY Corporate (BB)', spread: 210, change: 8, weekAgo: 202, yearAgo: 185, rating: 'BB' },
  { category: 'HY Corporate (B)', spread: 350, change: 12, weekAgo: 338, yearAgo: 310, rating: 'B' },
  { category: 'HY Corporate (CCC)', spread: 820, change: 25, weekAgo: 795, yearAgo: 690, rating: 'CCC' },
];

export default function CreditSpreadsPage() {
  const igAvg = SPREADS.filter(s => ['AAA', 'AA', 'A', 'BBB'].includes(s.rating)).reduce((a, s) => a + s.spread, 0) / 4;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Credit Spreads</h1>
        <p className="mt-1 text-sm text-gray-500">Corporate credit spread analysis by rating</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">IG Avg Spread</p>
          <p className="text-lg font-bold text-white">{igAvg.toFixed(0)} bps</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">HY BB Spread</p>
          <p className="text-lg font-bold text-amber-400">210 bps</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">CCC Spread</p>
          <p className="text-lg font-bold text-red-400">820 bps</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><TrendingUp className="inline h-4 w-4 mr-1" />Credit Spreads by Rating</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {SPREADS.map((s) => (
            <div key={s.category} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{s.category}</p>
                <p className="text-xs text-gray-500">1W: {s.weekAgo} bps &middot; 1Y: {s.yearAgo} bps</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{s.spread} bps</p>
                  <p className={cn('text-[10px] font-mono', s.change > 0 ? 'text-red-400' : 'text-green-400')}>
                    {s.change > 0 ? '+' : ''}{s.change} bps
                  </p>
                </div>
                <Badge variant={s.spread < 100 ? 'success' : s.spread < 300 ? 'warning' : 'danger'}>{s.rating}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
