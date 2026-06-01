'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Palette } from 'lucide-react';

interface StyleWeight {
  benchmark: string;
  weight: number;
  returnContribution: number;
  rSquared: number;
}

interface StylePeriod {
  period: string;
  weights: StyleWeight[];
  totalRSquared: number;
  alpha: number;
}

const STYLE_DATA: StylePeriod[] = [
  {
    period: 'Current (36M)',
    totalRSquared: 0.94,
    alpha: 1.8,
    weights: [
      { benchmark: 'Russell 1000 Growth', weight: 0.45, returnContribution: 5.2, rSquared: 0.42 },
      { benchmark: 'Russell 1000 Value', weight: 0.22, returnContribution: 1.8, rSquared: 0.20 },
      { benchmark: 'Russell 2000', weight: 0.08, returnContribution: 0.4, rSquared: 0.07 },
      { benchmark: 'MSCI EAFE', weight: 0.15, returnContribution: 1.1, rSquared: 0.14 },
      { benchmark: 'Bloomberg Agg', weight: 0.10, returnContribution: 0.3, rSquared: 0.09 },
    ],
  },
];

export default function StyleAnalysisPage() {
  const data = STYLE_DATA[0];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Style Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Sharpe returns-based style analysis</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">R-Squared</p>
          <p className="text-lg font-bold text-indigo-400">{data.totalRSquared.toFixed(2)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Alpha</p>
          <p className={cn('text-lg font-bold', data.alpha >= 0 ? 'text-green-400' : 'text-red-400')}>
            {data.alpha > 0 ? '+' : ''}{data.alpha}%
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Dominant Style</p>
          <p className="text-lg font-bold text-white">Growth</p>
        </Card>
      </div>

      {/* Style Weight Visualization */}
      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-3">Style Weights ({data.period})</p>
        <div className="space-y-2">
          {data.weights.map((w) => (
            <div key={w.benchmark} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">{w.benchmark}</span>
                <span className="text-white font-mono">{(w.weight * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-full rounded-full bg-indigo-500/60" style={{ width: `${w.weight * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Palette className="inline h-4 w-4 mr-1" />Style Decomposition</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {data.weights.map((w) => (
            <div key={w.benchmark} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{w.benchmark}</p>
                <p className="text-xs text-gray-500">R2 Contribution: {w.rSquared.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{(w.weight * 100).toFixed(0)}%</p>
                  <p className={cn('text-[10px] font-mono', w.returnContribution >= 0 ? 'text-green-400' : 'text-red-400')}>
                    +{w.returnContribution}%
                  </p>
                </div>
                <Badge variant={w.weight > 0.3 ? 'info' : w.weight > 0.1 ? 'default' : 'warning'}>
                  {w.weight > 0.3 ? 'Primary' : w.weight > 0.1 ? 'Secondary' : 'Minor'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
