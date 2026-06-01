'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface BreadthEntry {
  date: string;
  advancing: number;
  declining: number;
  unchanged: number;
  adLine: number;
  adRatio: number;
  newHighs: number;
  newLows: number;
}

const BREADTH: BreadthEntry[] = [
  { date: '2024-03-15', advancing: 2180, declining: 1620, unchanged: 200, adLine: 14520, adRatio: 1.35, newHighs: 145, newLows: 22 },
  { date: '2024-03-14', advancing: 1850, declining: 1940, unchanged: 210, adLine: 13960, adRatio: 0.95, newHighs: 98, newLows: 38 },
  { date: '2024-03-13', advancing: 2340, declining: 1420, unchanged: 240, adLine: 14870, adRatio: 1.65, newHighs: 168, newLows: 15 },
  { date: '2024-03-12', advancing: 1680, declining: 2110, unchanged: 210, adLine: 13440, adRatio: 0.80, newHighs: 72, newLows: 55 },
  { date: '2024-03-11', advancing: 2050, declining: 1750, unchanged: 200, adLine: 13870, adRatio: 1.17, newHighs: 120, newLows: 28 },
  { date: '2024-03-08', advancing: 2410, declining: 1350, unchanged: 240, adLine: 14930, adRatio: 1.79, newHighs: 182, newLows: 12 },
  { date: '2024-03-07', advancing: 1920, declining: 1880, unchanged: 200, adLine: 13870, adRatio: 1.02, newHighs: 105, newLows: 32 },
  { date: '2024-03-06', advancing: 1540, declining: 2260, unchanged: 200, adLine: 13150, adRatio: 0.68, newHighs: 58, newLows: 78 },
];

export default function AdvanceDeclinePage() {
  const latest = BREADTH[0];
  const avgRatio = BREADTH.reduce((s, b) => s + b.adRatio, 0) / BREADTH.length;
  const totalHighs = BREADTH.reduce((s, b) => s + b.newHighs, 0);
  const totalLows = BREADTH.reduce((s, b) => s + b.newLows, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Advance / Decline</h1>
        <p className="mt-1 text-sm text-gray-500">Market advance/decline breadth line</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">A/D Ratio</p><p className={cn('text-lg font-bold', latest.adRatio >= 1 ? 'text-green-400' : 'text-red-400')}>{latest.adRatio.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">A/D Line</p><p className="text-lg font-bold text-white">{latest.adLine.toLocaleString()}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">New Highs</p><p className="text-lg font-bold text-green-400">{latest.newHighs}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">New Lows</p><p className="text-lg font-bold text-red-400">{latest.newLows}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Daily Breadth</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BREADTH.map((b) => {
            const total = b.advancing + b.declining + b.unchanged;
            const advPct = (b.advancing / total) * 100;
            const decPct = (b.declining / total) * 100;
            return (
              <div key={b.date} className="px-4 py-2.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white">{b.date}</span>
                    <Badge variant={b.adRatio >= 1 ? 'success' : 'danger'}>{b.adRatio >= 1 ? 'Bullish' : 'Bearish'}</Badge>
                  </div>
                  <span className={cn('text-xs font-mono font-bold', b.adRatio >= 1 ? 'text-green-400' : 'text-red-400')}>{b.adRatio.toFixed(2)}</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
                  <div className="bg-green-500/60 h-full" style={{ width: `${advPct}%` }} />
                  <div className="bg-red-500/60 h-full" style={{ width: `${decPct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span className="text-green-400">{b.advancing} adv</span>
                  <span>{b.unchanged} unch</span>
                  <span className="text-red-400">{b.declining} dec</span>
                  <span>Highs: {b.newHighs} / Lows: {b.newLows}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
