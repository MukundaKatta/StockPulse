'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Users } from 'lucide-react';

interface ConfidenceReading {
  month: string;
  index: number;
  change: number;
  presentSituation: number;
  expectations: number;
  inflationExpect: number;
  jobsPlentiful: number;
  jobsHardToGet: number;
}

const READINGS: ConfidenceReading[] = [
  { month: 'Mar 2024', index: 104.7, change: 0.5, presentSituation: 151.0, expectations: 73.8, inflationExpect: 5.3, jobsPlentiful: 38.6, jobsHardToGet: 13.2 },
  { month: 'Feb 2024', index: 104.2, change: -2.4, presentSituation: 147.2, expectations: 74.0, inflationExpect: 5.2, jobsPlentiful: 39.4, jobsHardToGet: 12.8 },
  { month: 'Jan 2024', index: 106.6, change: 4.5, presentSituation: 150.9, expectations: 77.8, inflationExpect: 5.2, jobsPlentiful: 40.1, jobsHardToGet: 12.6 },
  { month: 'Dec 2023', index: 102.1, change: -4.8, presentSituation: 145.8, expectations: 73.5, inflationExpect: 5.1, jobsPlentiful: 37.8, jobsHardToGet: 14.0 },
  { month: 'Nov 2023', index: 106.9, change: 1.8, presentSituation: 148.5, expectations: 79.2, inflationExpect: 5.4, jobsPlentiful: 39.0, jobsHardToGet: 13.5 },
  { month: 'Oct 2023', index: 105.1, change: -3.2, presentSituation: 142.5, expectations: 75.6, inflationExpect: 5.5, jobsPlentiful: 37.2, jobsHardToGet: 14.2 },
  { month: 'Sep 2023', index: 108.3, change: 2.1, presentSituation: 152.8, expectations: 78.4, inflationExpect: 5.6, jobsPlentiful: 41.0, jobsHardToGet: 12.5 },
  { month: 'Aug 2023', index: 106.2, change: -1.5, presentSituation: 149.4, expectations: 76.8, inflationExpect: 5.8, jobsPlentiful: 40.2, jobsHardToGet: 13.0 },
];

export default function ConsumerConfidencePage() {
  const latest = READINGS[0];
  const avgIndex = READINGS.reduce((s, r) => s + r.index, 0) / READINGS.length;
  const high = Math.max(...READINGS.map((r) => r.index));
  const low = Math.min(...READINGS.map((r) => r.index));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Consumer Confidence</h1>
        <p className="mt-1 text-sm text-gray-500">Consumer confidence index tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Current Index</p><p className="text-lg font-bold text-white">{latest.index.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">MoM Change</p><p className={cn('text-lg font-bold', latest.change >= 0 ? 'text-green-400' : 'text-red-400')}>{latest.change >= 0 ? '+' : ''}{latest.change.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">8M Average</p><p className="text-lg font-bold text-indigo-400">{avgIndex.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Range</p><p className="text-lg font-bold text-amber-400">{low.toFixed(0)}-{high.toFixed(0)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-indigo-400" /> Monthly Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {READINGS.map((r) => (
            <div key={r.month} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{r.month}</span>
                  <Badge variant={r.change >= 0 ? 'success' : 'danger'}>{r.change >= 0 ? '+' : ''}{r.change.toFixed(1)}</Badge>
                </div>
                <span className="text-sm font-mono font-bold text-white">{r.index.toFixed(1)}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-[10px]">
                <div>
                  <span className="text-gray-500">Present: </span>
                  <span className="text-white font-mono">{r.presentSituation.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Expectations: </span>
                  <span className="text-white font-mono">{r.expectations.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Inflation Exp: </span>
                  <span className="text-amber-400 font-mono">{r.inflationExpect.toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>Jobs Plentiful: <span className="text-green-400 font-mono">{r.jobsPlentiful}%</span></span>
                <span>Jobs Hard to Get: <span className="text-red-400 font-mono">{r.jobsHardToGet}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
