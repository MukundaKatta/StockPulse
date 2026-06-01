'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Clock } from 'lucide-react';

interface IntradayPattern {
  name: string;
  timeWindow: string;
  avgMove: number;
  winRate: number;
  occurrences: number;
  direction: 'Bullish' | 'Bearish' | 'Neutral';
  reliability: 'High' | 'Medium' | 'Low';
}

const PATTERNS: IntradayPattern[] = [
  { name: 'Opening Gap Fill', timeWindow: '9:30-10:00', avgMove: 0.35, winRate: 68, occurrences: 185, direction: 'Bullish', reliability: 'High' },
  { name: 'Power Hour Rally', timeWindow: '15:00-16:00', avgMove: 0.28, winRate: 62, occurrences: 142, direction: 'Bullish', reliability: 'Medium' },
  { name: 'Lunch Dip', timeWindow: '11:30-13:00', avgMove: -0.18, winRate: 58, occurrences: 168, direction: 'Bearish', reliability: 'Medium' },
  { name: 'VWAP Reversion', timeWindow: '10:30-11:30', avgMove: 0.15, winRate: 72, occurrences: 220, direction: 'Neutral', reliability: 'High' },
  { name: 'MOC Imbalance', timeWindow: '15:45-16:00', avgMove: 0.42, winRate: 55, occurrences: 95, direction: 'Bullish', reliability: 'Low' },
  { name: 'First Red Bar', timeWindow: '9:30-9:45', avgMove: -0.52, winRate: 64, occurrences: 130, direction: 'Bearish', reliability: 'Medium' },
  { name: 'Afternoon Breakout', timeWindow: '14:00-15:00', avgMove: 0.38, winRate: 58, occurrences: 108, direction: 'Bullish', reliability: 'Medium' },
  { name: 'Pre-Close Fade', timeWindow: '15:30-15:55', avgMove: -0.22, winRate: 60, occurrences: 145, direction: 'Bearish', reliability: 'Medium' },
];

const dirVariant = (d: string) => d === 'Bullish' ? 'success' : d === 'Bearish' ? 'danger' : 'default';
const relVariant = (r: string) => r === 'High' ? 'success' : r === 'Medium' ? 'warning' : 'danger';

export default function IntradayPatternsPage() {
  const avgWinRate = PATTERNS.reduce((s, p) => s + p.winRate, 0) / PATTERNS.length;
  const highRel = PATTERNS.filter(p => p.reliability === 'High').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Intraday Patterns</h1>
        <p className="mt-1 text-sm text-gray-500">Recurring intraday price patterns and statistics</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Patterns</p><p className="text-lg font-bold text-white">{PATTERNS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Win Rate</p><p className="text-lg font-bold text-green-400">{avgWinRate.toFixed(0)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Reliability</p><p className="text-lg font-bold text-indigo-400">{highRel}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-cyan-400">{PATTERNS.filter(p => p.direction === 'Bullish').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-indigo-400" /> Pattern Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PATTERNS.map((p) => (
            <div key={p.name} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-32">
                <p className="text-xs font-bold text-white">{p.name}</p>
                <p className="text-[10px] text-gray-500">{p.timeWindow}</p>
              </div>
              <span className={cn('text-xs font-mono w-12', p.avgMove >= 0 ? 'text-green-400' : 'text-red-400')}>{p.avgMove >= 0 ? '+' : ''}{p.avgMove}%</span>
              <span className="text-xs font-mono text-white w-12">{p.winRate}% WR</span>
              <span className="text-[10px] text-gray-500 w-10">{p.occurrences}x</span>
              <Badge variant={dirVariant(p.direction)}>{p.direction}</Badge>
              <Badge variant={relVariant(p.reliability)} className="ml-auto">{p.reliability}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
