'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { PieChart, TrendingUp, TrendingDown } from 'lucide-react';

interface SectorData {
  name: string;
  etf: string;
  performance1W: number;
  performance1M: number;
  performance3M: number;
  performance1Y: number;
  flowScore: number;
  phase: 'expansion' | 'peak' | 'contraction' | 'trough';
}

const SECTORS: SectorData[] = [
  { name: 'Technology', etf: 'XLK', performance1W: 2.1, performance1M: 5.4, performance3M: 12.3, performance1Y: 28.5, flowScore: 85, phase: 'expansion' },
  { name: 'Healthcare', etf: 'XLV', performance1W: 0.8, performance1M: 2.1, performance3M: 4.5, performance1Y: 8.2, flowScore: 62, phase: 'peak' },
  { name: 'Financials', etf: 'XLF', performance1W: 1.5, performance1M: 3.8, performance3M: 8.9, performance1Y: 18.4, flowScore: 72, phase: 'expansion' },
  { name: 'Consumer Disc.', etf: 'XLY', performance1W: -0.3, performance1M: 1.2, performance3M: 3.1, performance1Y: 12.1, flowScore: 48, phase: 'peak' },
  { name: 'Industrials', etf: 'XLI', performance1W: 1.2, performance1M: 4.1, performance3M: 9.2, performance1Y: 15.7, flowScore: 68, phase: 'expansion' },
  { name: 'Energy', etf: 'XLE', performance1W: -1.8, performance1M: -4.2, performance3M: -8.5, performance1Y: -2.3, flowScore: 25, phase: 'contraction' },
  { name: 'Utilities', etf: 'XLU', performance1W: 0.4, performance1M: 1.5, performance3M: 5.8, performance1Y: 10.2, flowScore: 55, phase: 'trough' },
  { name: 'Materials', etf: 'XLB', performance1W: -0.6, performance1M: -1.3, performance3M: 2.4, performance1Y: 7.8, flowScore: 38, phase: 'contraction' },
  { name: 'Real Estate', etf: 'XLRE', performance1W: 0.9, performance1M: 2.8, performance3M: 6.1, performance1Y: 9.5, flowScore: 58, phase: 'trough' },
  { name: 'Comm. Services', etf: 'XLC', performance1W: 1.8, performance1M: 4.5, performance3M: 11.2, performance1Y: 24.8, flowScore: 78, phase: 'expansion' },
  { name: 'Consumer Staples', etf: 'XLP', performance1W: 0.2, performance1M: 0.8, performance3M: 3.2, performance1Y: 5.4, flowScore: 42, phase: 'peak' },
];

const phaseColors = {
  expansion: 'text-green-400 bg-green-400/10',
  peak: 'text-amber-400 bg-amber-400/10',
  contraction: 'text-red-400 bg-red-400/10',
  trough: 'text-blue-400 bg-blue-400/10',
};

export default function SectorRotationPage() {
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '3M' | '1Y'>('1M');

  const getPerformance = (s: SectorData) => {
    if (timeframe === '1W') return s.performance1W;
    if (timeframe === '1M') return s.performance1M;
    if (timeframe === '3M') return s.performance3M;
    return s.performance1Y;
  };

  const sorted = [...SECTORS].sort((a, b) => getPerformance(b) - getPerformance(a));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Rotation</h1>
          <p className="mt-1 text-sm text-gray-500">Track capital flows across market sectors</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {(['1W', '1M', '3M', '1Y'] as const).map((t) => (
            <button key={t} onClick={() => setTimeframe(t)}
              className={cn('rounded-md px-3 py-1.5 text-xs font-medium transition-colors', timeframe === t ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Sector Heatmap */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {sorted.map((sector) => {
          const perf = getPerformance(sector);
          const intensity = Math.min(Math.abs(perf) / 10, 1);
          return (
            <Card key={sector.etf} className="!p-3 cursor-pointer hover:ring-1 hover:ring-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-300">{sector.name}</span>
                <span className="text-[10px] text-gray-600 font-mono">{sector.etf}</span>
              </div>
              <p className={cn('text-lg font-bold font-mono', perf >= 0 ? 'text-green-400' : 'text-red-400')}>
                {perf >= 0 ? '+' : ''}{perf.toFixed(1)}%
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded', phaseColors[sector.phase])}>
                  {sector.phase}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={cn('h-full rounded-full', sector.flowScore > 60 ? 'bg-green-500' : sector.flowScore > 40 ? 'bg-amber-500' : 'bg-red-500')}
                      style={{ width: `${sector.flowScore}%` }} />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Business Cycle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-4 w-4 text-indigo-400" />
            Business Cycle Positioning
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['expansion', 'peak', 'contraction', 'trough'] as const).map((phase) => {
            const sectors = SECTORS.filter((s) => s.phase === phase);
            return (
              <div key={phase} className={cn('rounded-lg border p-3', phase === 'expansion' ? 'border-green-500/20' : phase === 'peak' ? 'border-amber-500/20' : phase === 'contraction' ? 'border-red-500/20' : 'border-blue-500/20')}>
                <p className={cn('text-xs font-medium capitalize mb-2', phaseColors[phase].split(' ')[0])}>{phase}</p>
                <div className="space-y-1">
                  {sectors.map((s) => (
                    <p key={s.etf} className="text-xs text-gray-400">{s.name}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
