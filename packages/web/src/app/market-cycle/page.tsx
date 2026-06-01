'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { RefreshCw } from 'lucide-react';

interface CycleIndicator {
  name: string;
  category: string;
  value: number;
  threshold: number;
  signal: 'Bull' | 'Bear' | 'Neutral';
  weight: number;
  lastFlip: string;
}

const INDICATORS: CycleIndicator[] = [
  { name: '200-Day MA Signal', category: 'Trend', value: 1, threshold: 0, signal: 'Bull', weight: 20, lastFlip: 'Nov 2023' },
  { name: 'Yield Curve Slope', category: 'Macro', value: -0.25, threshold: 0, signal: 'Bear', weight: 15, lastFlip: 'Jul 2022' },
  { name: 'ISM Manufacturing', category: 'Macro', value: 51.2, threshold: 50, signal: 'Bull', weight: 15, lastFlip: 'Mar 2024' },
  { name: 'Credit Spreads', category: 'Risk', value: 1.45, threshold: 2.0, signal: 'Bull', weight: 15, lastFlip: 'Oct 2023' },
  { name: 'Market Breadth', category: 'Breadth', value: 58, threshold: 50, signal: 'Bull', weight: 10, lastFlip: 'Jan 2024' },
  { name: 'Earnings Revisions', category: 'Earnings', value: 1.2, threshold: 1.0, signal: 'Bull', weight: 10, lastFlip: 'Feb 2024' },
  { name: 'Fed Policy', category: 'Macro', value: 0, threshold: 0, signal: 'Neutral', weight: 10, lastFlip: 'Sep 2023' },
  { name: 'Sentiment Composite', category: 'Sentiment', value: 62, threshold: 70, signal: 'Neutral', weight: 5, lastFlip: 'Apr 2024' },
];

const signalVariant = (s: string) => s === 'Bull' ? 'success' : s === 'Bear' ? 'danger' : 'default';

export default function MarketCyclePage() {
  const bullWeight = INDICATORS.filter(i => i.signal === 'Bull').reduce((s, i) => s + i.weight, 0);
  const bearWeight = INDICATORS.filter(i => i.signal === 'Bear').reduce((s, i) => s + i.weight, 0);
  const bullCount = INDICATORS.filter(i => i.signal === 'Bull').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Cycle</h1>
        <p className="mt-1 text-sm text-gray-500">Market cycle phase and composite indicator</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bull Weight</p><p className="text-lg font-bold text-green-400">{bullWeight}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bear Weight</p><p className="text-lg font-bold text-red-400">{bearWeight}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bull Signals</p><p className="text-lg font-bold text-indigo-400">{bullCount}/{INDICATORS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Phase</p><p className="text-lg font-bold text-cyan-400">{bullWeight > 60 ? 'Bull' : bullWeight > 40 ? 'Transition' : 'Bear'}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><RefreshCw className="h-4 w-4 text-indigo-400" /> Cycle Indicators</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICATORS.map((ind) => (
            <div key={ind.name} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-32">
                <p className="text-xs font-bold text-white">{ind.name}</p>
                <p className="text-[10px] text-gray-500">{ind.category} &middot; Wt {ind.weight}%</p>
              </div>
              <span className="text-xs font-mono text-white w-12">{ind.value}</span>
              <span className="text-[10px] text-gray-400 w-14">Thr: {ind.threshold}</span>
              <span className="text-[10px] text-gray-500 w-16">Flip: {ind.lastFlip}</span>
              <Badge variant={signalVariant(ind.signal)} className="ml-auto">{ind.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
