'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Grid3X3 } from 'lucide-react';

interface CorrelationPair {
  asset1: string;
  asset2: string;
  correlation: number;
  period: string;
  change30d: number;
}

const ASSETS = ['SPY', 'QQQ', 'IWM', 'TLT', 'GLD', 'DXY'];

const PAIRS: CorrelationPair[] = [
  { asset1: 'SPY', asset2: 'QQQ', correlation: 0.95, period: '90d', change30d: 0.02 },
  { asset1: 'SPY', asset2: 'IWM', correlation: 0.88, period: '90d', change30d: -0.03 },
  { asset1: 'SPY', asset2: 'TLT', correlation: -0.42, period: '90d', change30d: 0.08 },
  { asset1: 'SPY', asset2: 'GLD', correlation: 0.12, period: '90d', change30d: 0.15 },
  { asset1: 'SPY', asset2: 'DXY', correlation: -0.28, period: '90d', change30d: -0.05 },
  { asset1: 'QQQ', asset2: 'TLT', correlation: -0.38, period: '90d', change30d: 0.06 },
  { asset1: 'TLT', asset2: 'GLD', correlation: 0.35, period: '90d', change30d: -0.10 },
  { asset1: 'GLD', asset2: 'DXY', correlation: -0.65, period: '90d', change30d: 0.04 },
];

const corrColor = (v: number) => {
  if (v > 0.7) return 'text-green-400';
  if (v > 0.3) return 'text-green-400/60';
  if (v > -0.3) return 'text-gray-400';
  if (v > -0.7) return 'text-red-400/60';
  return 'text-red-400';
};

export default function CorrelationMatrixPage() {
  const avgCorr = PAIRS.reduce((s, p) => s + Math.abs(p.correlation), 0) / PAIRS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Correlation Matrix</h1>
        <p className="mt-1 text-sm text-gray-500">Asset class correlations (90-day rolling)</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Assets</p>
          <p className="text-lg font-bold text-white">{ASSETS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg |Corr|</p>
          <p className="text-lg font-bold text-indigo-400">{avgCorr.toFixed(2)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Most Negative</p>
          <p className="text-lg font-bold text-red-400">{Math.min(...PAIRS.map(p => p.correlation)).toFixed(2)}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Grid3X3 className="inline h-4 w-4 mr-1" />Correlation Pairs</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {PAIRS.map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{p.asset1} / {p.asset2}</p>
                <p className="text-xs text-gray-500">{p.period} rolling</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', corrColor(p.correlation))}>{p.correlation.toFixed(2)}</p>
                  <p className={cn('text-[10px] font-mono', p.change30d >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {p.change30d > 0 ? '+' : ''}{p.change30d.toFixed(2)}
                  </p>
                </div>
                <Badge variant={Math.abs(p.correlation) > 0.7 ? 'danger' : Math.abs(p.correlation) > 0.3 ? 'warning' : 'success'}>
                  {Math.abs(p.correlation) > 0.7 ? 'High' : Math.abs(p.correlation) > 0.3 ? 'Moderate' : 'Low'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
