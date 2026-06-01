'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { RefreshCw } from 'lucide-react';

interface SectorSignal {
  sector: string;
  momentum1M: number;
  momentum3M: number;
  relativeStrength: number;
  signal: 'overweight' | 'neutral' | 'underweight';
  phase: 'early' | 'mid' | 'late' | 'recession';
  score: number;
}

const mockData: SectorSignal[] = [
  { sector: 'Technology', momentum1M: 4.2, momentum3M: 12.5, relativeStrength: 1.15, signal: 'overweight', phase: 'mid', score: 85 },
  { sector: 'Healthcare', momentum1M: 2.1, momentum3M: 6.8, relativeStrength: 1.05, signal: 'overweight', phase: 'late', score: 72 },
  { sector: 'Financials', momentum1M: 1.8, momentum3M: 8.2, relativeStrength: 0.98, signal: 'neutral', phase: 'mid', score: 58 },
  { sector: 'Energy', momentum1M: -2.5, momentum3M: -4.1, relativeStrength: 0.82, signal: 'underweight', phase: 'late', score: 32 },
  { sector: 'Consumer Disc.', momentum1M: 3.1, momentum3M: 9.4, relativeStrength: 1.08, signal: 'overweight', phase: 'early', score: 78 },
  { sector: 'Utilities', momentum1M: -0.8, momentum3M: 1.2, relativeStrength: 0.91, signal: 'underweight', phase: 'recession', score: 25 },
  { sector: 'Industrials', momentum1M: 1.5, momentum3M: 5.6, relativeStrength: 1.02, signal: 'neutral', phase: 'mid', score: 62 },
];

const summaryCards = [
  { label: 'Cycle Phase', value: 'Mid-Cycle', sub: 'Expansion phase' },
  { label: 'Top Sector', value: 'Tech', sub: 'Score: 85/100' },
  { label: 'Avoid Sector', value: 'Utilities', sub: 'Score: 25/100' },
  { label: 'Model Confidence', value: '74%', sub: 'Historical accuracy' },
];

const signalVariant: Record<string, 'success' | 'default' | 'danger'> = {
  overweight: 'success', neutral: 'default', underweight: 'danger',
};

export default function SectorRotationModelPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Rotation Model</h1>
        <p className="mt-1 text-sm text-gray-500">Time sector allocation based on business cycle positioning</p>
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
          <CardTitle>Sector Signals</CardTitle>
          <RefreshCw className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.sector} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{s.sector}</p>
                  <Badge variant={signalVariant[s.signal]}>{s.signal}</Badge>
                  <Badge variant="info">{s.phase}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  1M: {s.momentum1M >= 0 ? '+' : ''}{s.momentum1M}% | 3M: {s.momentum3M >= 0 ? '+' : ''}{s.momentum3M}% | RS: {s.relativeStrength.toFixed(2)}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', s.score >= 70 ? 'text-green-400' : s.score >= 40 ? 'text-amber-400' : 'text-red-400')}>
                {s.score}/100
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
