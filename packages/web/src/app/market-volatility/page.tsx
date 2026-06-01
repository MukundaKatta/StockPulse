'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Zap } from 'lucide-react';

interface VolatilityData { metric: string; current: number; weekAgo: number; monthAgo: number; change: number; level: string; }
const METRICS: VolatilityData[] = [
  { metric: 'VIX', current: 14.2, weekAgo: 15.8, monthAgo: 18.4, change: -10.1, level: 'Low' },
  { metric: 'VIX9D', current: 12.8, weekAgo: 14.2, monthAgo: 16.4, change: -9.9, level: 'Low' },
  { metric: 'VIX3M', current: 16.4, weekAgo: 17.2, monthAgo: 19.8, change: -4.7, level: 'Low' },
  { metric: 'VIX6M', current: 18.2, weekAgo: 18.8, monthAgo: 20.4, change: -3.2, level: 'Moderate' },
  { metric: 'VVIX', current: 82.4, weekAgo: 88.2, monthAgo: 94.8, change: -6.6, level: 'Moderate' },
  { metric: 'SKEW', current: 142.8, weekAgo: 138.4, monthAgo: 134.2, change: 3.2, level: 'Elevated' },
  { metric: 'MOVE', current: 108.4, weekAgo: 112.8, monthAgo: 118.2, change: -3.9, level: 'Moderate' },
  { metric: 'GVZ (Gold)', current: 14.8, weekAgo: 15.2, monthAgo: 16.8, change: -2.6, level: 'Low' },
];

export default function MarketVolatilityPage() {
  const low = METRICS.filter((m) => m.level === 'Low').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Volatility</h1><p className="mt-1 text-sm text-gray-500">VIX and volatility metrics across asset classes</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">VIX</p><p className="text-lg font-bold text-green-400">{METRICS[0].current}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Low Vol</p><p className="text-lg font-bold text-indigo-400">{low}/{METRICS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">SKEW</p><p className="text-lg font-bold text-amber-400">{METRICS.find((m) => m.metric === 'SKEW')?.current}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-indigo-400" /> Volatility Indices</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {METRICS.map((m) => (
            <div key={m.metric} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{m.metric}</span>
                <Badge variant={m.level === 'Low' ? 'success' : m.level === 'Elevated' ? 'danger' : 'warning'}>{m.level}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">1w: {m.weekAgo}</span>
                <span className="text-[10px] text-gray-500">1m: {m.monthAgo}</span>
                <span className={cn('text-sm font-bold font-mono', m.change < 0 ? 'text-green-400' : 'text-red-400')}>{m.change > 0 ? '+' : ''}{m.change.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
