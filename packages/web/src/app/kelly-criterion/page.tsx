'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Percent } from 'lucide-react';

interface KellyPosition {
  strategy: string;
  winRate: number;
  winLossRatio: number;
  kellyFull: number;
  kellyHalf: number;
  kellyQuarter: number;
  currentSize: number;
  recommendation: 'increase' | 'decrease' | 'optimal' | 'avoid';
}

const mockData: KellyPosition[] = [
  { strategy: 'Momentum Long', winRate: 58, winLossRatio: 1.8, kellyFull: 34.7, kellyHalf: 17.4, kellyQuarter: 8.7, currentSize: 15, recommendation: 'optimal' },
  { strategy: 'Mean Reversion', winRate: 65, winLossRatio: 1.2, kellyFull: 35.8, kellyHalf: 17.9, kellyQuarter: 9.0, currentSize: 10, recommendation: 'increase' },
  { strategy: 'Breakout', winRate: 40, winLossRatio: 2.5, kellyFull: 16.0, kellyHalf: 8.0, kellyQuarter: 4.0, currentSize: 12, recommendation: 'decrease' },
  { strategy: 'Options Selling', winRate: 75, winLossRatio: 0.5, kellyFull: 25.0, kellyHalf: 12.5, kellyQuarter: 6.3, currentSize: 8, recommendation: 'optimal' },
  { strategy: 'Pairs Trading', winRate: 55, winLossRatio: 1.4, kellyFull: 22.9, kellyHalf: 11.4, kellyQuarter: 5.7, currentSize: 5, recommendation: 'increase' },
  { strategy: 'Counter-Trend', winRate: 35, winLossRatio: 1.2, kellyFull: -19.2, kellyHalf: -9.6, kellyQuarter: -4.8, currentSize: 5, recommendation: 'avoid' },
];

const summaryCards = [
  { label: 'Avg Kelly %', value: '17.4%', sub: 'Half Kelly optimal' },
  { label: 'Portfolio Utilization', value: '55%', sub: 'Of total capital' },
  { label: 'Optimal Strategies', value: '2/6', sub: 'Correctly sized' },
  { label: 'Risk of Ruin', value: '0.8%', sub: 'At half Kelly' },
];

const recVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
  optimal: 'success', increase: 'info', decrease: 'warning', avoid: 'danger',
};

export default function KellyCriterionPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Kelly Criterion Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Optimal position sizing based on edge and odds</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summaryCards.map((c) => (
          <Card key={c.label}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="mt-1 text-lg font-bold text-white">{c.value}</p>
            <p className="text-[11px] text-gray-600">{c.sub}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Position Sizing</CardTitle>
          <Percent className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((k) => (
            <div key={k.strategy} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{k.strategy}</p>
                  <Badge variant={recVariant[k.recommendation]}>{k.recommendation}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Win: {k.winRate}% | W/L: {k.winLossRatio}x | Full: {k.kellyFull.toFixed(1)}% | Half: {k.kellyHalf.toFixed(1)}% | Current: {k.currentSize}%
                </p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-semibold', k.kellyHalf > 0 ? 'text-green-400' : 'text-red-400')}>
                  {k.kellyHalf.toFixed(1)}%
                </p>
                <p className="text-[10px] text-gray-600">half Kelly</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
