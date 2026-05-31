'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface SectorPerf {
  name: string;
  etf: string;
  day: number;
  week: number;
  month: number;
  threeMonth: number;
  sixMonth: number;
  year: number;
}

const SECTOR_PERF: SectorPerf[] = [
  { name: 'Technology', etf: 'XLK', day: 1.2, week: 2.8, month: 5.4, threeMonth: 12.3, sixMonth: 18.5, year: 28.5 },
  { name: 'Healthcare', etf: 'XLV', day: -0.3, week: 0.5, month: 2.1, threeMonth: 4.5, sixMonth: 6.8, year: 8.2 },
  { name: 'Financials', etf: 'XLF', day: 0.8, week: 1.5, month: 3.8, threeMonth: 8.9, sixMonth: 12.5, year: 18.4 },
  { name: 'Consumer Disc.', etf: 'XLY', day: -0.5, week: 0.2, month: 1.2, threeMonth: 3.1, sixMonth: 8.2, year: 12.1 },
  { name: 'Industrials', etf: 'XLI', day: 0.4, week: 1.2, month: 4.1, threeMonth: 9.2, sixMonth: 11.8, year: 15.7 },
  { name: 'Energy', etf: 'XLE', day: -1.2, week: -2.5, month: -4.2, threeMonth: -8.5, sixMonth: -5.2, year: -2.3 },
  { name: 'Utilities', etf: 'XLU', day: 0.1, week: 0.4, month: 1.5, threeMonth: 5.8, sixMonth: 8.5, year: 10.2 },
  { name: 'Materials', etf: 'XLB', day: -0.2, week: -0.6, month: -1.3, threeMonth: 2.4, sixMonth: 5.2, year: 7.8 },
  { name: 'Real Estate', etf: 'XLRE', day: 0.6, week: 0.9, month: 2.8, threeMonth: 6.1, sixMonth: 7.5, year: 9.5 },
  { name: 'Comm. Svcs', etf: 'XLC', day: 1.5, week: 2.2, month: 4.5, threeMonth: 11.2, sixMonth: 16.8, year: 24.8 },
  { name: 'Cons. Staples', etf: 'XLP', day: -0.1, week: 0.2, month: 0.8, threeMonth: 3.2, sixMonth: 4.5, year: 5.4 },
];

type Timeframe = 'day' | 'week' | 'month' | 'threeMonth' | 'sixMonth' | 'year';
const TIMEFRAMES: { key: Timeframe; label: string }[] = [
  { key: 'day', label: '1D' },
  { key: 'week', label: '1W' },
  { key: 'month', label: '1M' },
  { key: 'threeMonth', label: '3M' },
  { key: 'sixMonth', label: '6M' },
  { key: 'year', label: '1Y' },
];

export default function SectorPerformancePage() {
  const [timeframe, setTimeframe] = useState<Timeframe>('month');

  const sorted = [...SECTOR_PERF].sort((a, b) => b[timeframe] - a[timeframe]);
  const maxVal = Math.max(...sorted.map((s) => Math.abs(s[timeframe])));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Performance</h1>
          <p className="mt-1 text-sm text-gray-500">Comparative sector returns across timeframes</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {TIMEFRAMES.map(({ key, label }) => (
            <button key={key} onClick={() => setTimeframe(key)}
              className={cn('rounded-md px-3 py-1.5 text-xs font-medium transition-colors', timeframe === key ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
            >{label}</button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-indigo-400" />
            Returns ({TIMEFRAMES.find((t) => t.key === timeframe)?.label})
          </CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {sorted.map((sector) => {
            const val = sector[timeframe];
            const barWidth = maxVal > 0 ? (Math.abs(val) / maxVal) * 100 : 0;
            return (
              <div key={sector.etf} className="flex items-center gap-3 py-1">
                <span className="w-28 text-xs text-gray-400 shrink-0">{sector.name}</span>
                <span className="w-10 text-[10px] text-gray-600 font-mono shrink-0">{sector.etf}</span>
                <div className="flex-1 flex items-center">
                  {val < 0 && (
                    <div className="flex-1 flex justify-end">
                      <div className="h-4 rounded-l bg-red-500/40" style={{ width: `${barWidth / 2}%` }} />
                    </div>
                  )}
                  <div className="w-px h-6 bg-white/10 mx-1" />
                  {val >= 0 && (
                    <div className="flex-1">
                      <div className="h-4 rounded-r bg-green-500/40" style={{ width: `${barWidth / 2}%` }} />
                    </div>
                  )}
                  {val < 0 && <div className="flex-1" />}
                </div>
                <span className={cn('w-16 text-right text-xs font-mono font-medium shrink-0', val >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {val >= 0 ? '+' : ''}{val.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
