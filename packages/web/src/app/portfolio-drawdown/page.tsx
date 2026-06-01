'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { TrendingDown } from 'lucide-react';

interface DrawdownPeriod {
  start: string;
  trough: string;
  recovery: string | null;
  maxDrawdown: number;
  duration: number;
  recoveryDays: number | null;
  trigger: string;
  peakValue: number;
  troughValue: number;
}

const DRAWDOWNS: DrawdownPeriod[] = [
  { start: '2024-01-02', trough: '2024-01-17', recovery: '2024-02-05', maxDrawdown: -8.2, duration: 15, recoveryDays: 19, trigger: 'Rate hike fears', peakValue: 284500, troughValue: 261200 },
  { start: '2023-09-14', trough: '2023-10-27', recovery: '2023-12-08', maxDrawdown: -12.4, duration: 43, recoveryDays: 42, trigger: 'Bond selloff', peakValue: 268400, troughValue: 235100 },
  { start: '2023-07-20', trough: '2023-08-18', recovery: '2023-09-05', maxDrawdown: -5.8, duration: 29, recoveryDays: 18, trigger: 'China concerns', peakValue: 252800, troughValue: 238100 },
  { start: '2023-02-02', trough: '2023-03-13', recovery: '2023-04-18', maxDrawdown: -14.2, duration: 39, recoveryDays: 36, trigger: 'Banking crisis', peakValue: 245200, troughValue: 210400 },
  { start: '2022-08-16', trough: '2022-10-12', recovery: '2023-01-20', maxDrawdown: -22.8, duration: 57, recoveryDays: 100, trigger: 'Fed tightening', peakValue: 238500, troughValue: 184100 },
  { start: '2024-02-12', trough: '2024-02-14', recovery: null, maxDrawdown: -3.1, duration: 2, recoveryDays: null, trigger: 'CPI surprise', peakValue: 298200, troughValue: 288900 },
];

export default function PortfolioDrawdownPage() {
  const maxDd = Math.min(...DRAWDOWNS.map((d) => d.maxDrawdown));
  const avgDd = DRAWDOWNS.reduce((s, d) => s + d.maxDrawdown, 0) / DRAWDOWNS.length;
  const avgRecovery = DRAWDOWNS.filter((d) => d.recoveryDays !== null).reduce((s, d) => s + (d.recoveryDays ?? 0), 0) / DRAWDOWNS.filter((d) => d.recoveryDays !== null).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Drawdown</h1>
        <p className="mt-1 text-sm text-gray-500">Historical drawdown analysis and recovery periods</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Max Drawdown</p><p className="text-lg font-bold text-red-400">{maxDd.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Drawdown</p><p className="text-lg font-bold text-amber-400">{avgDd.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Recovery</p><p className="text-lg font-bold text-indigo-400">{avgRecovery.toFixed(0)} days</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Drawdowns</p><p className="text-lg font-bold text-white">{DRAWDOWNS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingDown className="h-4 w-4 text-red-400" /> Drawdown History</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DRAWDOWNS.sort((a, b) => a.maxDrawdown - b.maxDrawdown).map((d, i) => (
            <div key={i} className="px-4 py-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{d.start} → {d.trough}</span>
                  <Badge variant={d.recovery ? 'success' : 'warning'}>{d.recovery ? 'Recovered' : 'Active'}</Badge>
                </div>
                <span className="text-sm font-bold font-mono text-red-400">{d.maxDrawdown.toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded bg-white/5">
                <div className="h-full rounded bg-red-500/60" style={{ width: `${Math.abs(d.maxDrawdown / maxDd) * 100}%` }} />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                <span className="text-gray-400">Duration: <span className="text-white font-mono">{d.duration}d</span></span>
                {d.recoveryDays !== null && <span className="text-gray-400">Recovery: <span className="text-green-400 font-mono">{d.recoveryDays}d</span></span>}
                <span className="text-gray-400">Peak: <span className="text-white font-mono">{formatCurrency(d.peakValue)}</span></span>
                <span className="text-gray-400">Trough: <span className="text-red-400 font-mono">{formatCurrency(d.troughValue)}</span></span>
                <span className="text-gray-500 italic">{d.trigger}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
