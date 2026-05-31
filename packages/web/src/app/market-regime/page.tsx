'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Compass, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RegimeIndicator {
  name: string;
  value: string;
  signal: 'bull' | 'bear' | 'neutral';
  weight: number;
}

const INDICATORS: RegimeIndicator[] = [
  { name: 'S&P 500 vs 200 SMA', value: 'Above', signal: 'bull', weight: 20 },
  { name: 'Yield Curve (2s10s)', value: '-26 bps', signal: 'bear', weight: 15 },
  { name: 'VIX Level', value: '13.45', signal: 'bull', weight: 15 },
  { name: 'Credit Spreads', value: 'Narrowing', signal: 'bull', weight: 10 },
  { name: 'Fed Funds Trend', value: 'Pause', signal: 'neutral', weight: 10 },
  { name: 'ISM Manufacturing', value: '47.9', signal: 'bear', weight: 10 },
  { name: 'Breadth (% > 200 SMA)', value: '62.5%', signal: 'bull', weight: 10 },
  { name: 'Consumer Sentiment', value: '69.7', signal: 'neutral', weight: 5 },
  { name: 'Leading Indicators', value: '-0.5%', signal: 'bear', weight: 5 },
];

export default function MarketRegimePage() {
  const bullScore = INDICATORS.filter((i) => i.signal === 'bull').reduce((s, i) => s + i.weight, 0);
  const bearScore = INDICATORS.filter((i) => i.signal === 'bear').reduce((s, i) => s + i.weight, 0);
  const neutralScore = INDICATORS.filter((i) => i.signal === 'neutral').reduce((s, i) => s + i.weight, 0);

  const regime = bullScore > bearScore + 15 ? 'Bull Market' : bearScore > bullScore + 15 ? 'Bear Market' : 'Transitional';
  const regimeColor = regime === 'Bull Market' ? 'text-green-400' : regime === 'Bear Market' ? 'text-red-400' : 'text-yellow-400';

  const strategies = {
    'Bull Market': ['Buy dips in quality growth', 'Increase equity exposure', 'Reduce hedges', 'Focus on momentum'],
    'Bear Market': ['Raise cash levels', 'Add defensive positions', 'Increase bond allocation', 'Consider hedging'],
    'Transitional': ['Balanced equity/bond mix', 'Focus on quality', 'Reduce position sizes', 'Watch for confirmation'],
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Regime</h1>
        <p className="mt-1 text-sm text-gray-500">Macro regime identification and strategy</p>
      </div>

      <Card className="!p-5 text-center">
        <p className="text-xs text-gray-500 mb-2">Current Regime</p>
        <p className={cn('text-3xl font-bold', regimeColor)}>{regime}</p>
        <div className="flex justify-center gap-6 mt-3">
          <div><p className="text-[10px] text-gray-500">Bull</p><p className="text-sm font-bold text-green-400">{bullScore}%</p></div>
          <div><p className="text-[10px] text-gray-500">Neutral</p><p className="text-sm font-bold text-yellow-400">{neutralScore}%</p></div>
          <div><p className="text-[10px] text-gray-500">Bear</p><p className="text-sm font-bold text-red-400">{bearScore}%</p></div>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Compass className="h-4 w-4 text-indigo-400" /> Regime Indicators</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICATORS.map((ind) => (
            <div key={ind.name} className="flex items-center gap-3 py-2.5 px-2">
              {ind.signal === 'bull' ? <TrendingUp className="h-3.5 w-3.5 text-green-400" /> : ind.signal === 'bear' ? <TrendingDown className="h-3.5 w-3.5 text-red-400" /> : <Minus className="h-3.5 w-3.5 text-yellow-400" />}
              <div className="flex-1"><p className="text-sm text-gray-300">{ind.name}</p></div>
              <span className="text-xs font-mono text-gray-400">{ind.value}</span>
              <Badge variant={ind.signal === 'bull' ? 'success' : ind.signal === 'bear' ? 'danger' : 'warning'} className="text-[9px] w-14 justify-center capitalize">{ind.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Suggested Strategy</CardTitle></CardHeader>
        <div className="space-y-2 px-2 pb-2">
          {strategies[regime].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-xs text-gray-300">{s}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
