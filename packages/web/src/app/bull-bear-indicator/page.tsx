'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Gauge } from 'lucide-react';

interface SentimentIndicator {
  indicator: string;
  value: number;
  signal: 'Bullish' | 'Bearish' | 'Neutral';
  weight: number;
  description: string;
  change: number;
}

const INDICATORS: SentimentIndicator[] = [
  { indicator: 'AAII Survey', value: 62.4, signal: 'Bullish', weight: 15, description: 'Individual investor sentiment', change: 4.2 },
  { indicator: 'Put/Call Ratio', value: 0.72, signal: 'Bullish', weight: 20, description: 'Options market sentiment', change: -0.08 },
  { indicator: 'VIX Index', value: 14.5, signal: 'Bullish', weight: 20, description: 'Volatility fear gauge', change: -2.1 },
  { indicator: 'Advance/Decline', value: 1.85, signal: 'Bullish', weight: 15, description: 'Market breadth indicator', change: 0.12 },
  { indicator: 'High/Low Ratio', value: 0.45, signal: 'Neutral', weight: 10, description: 'New highs vs new lows', change: -0.05 },
  { indicator: 'CNN Fear & Greed', value: 72, signal: 'Bullish', weight: 10, description: 'Composite fear/greed index', change: 8 },
  { indicator: 'Margin Debt', value: -2.4, signal: 'Bearish', weight: 10, description: 'Leverage levels', change: -1.2 },
];

const signalVariant = (s: string) => s === 'Bullish' ? 'success' : s === 'Bearish' ? 'danger' : 'warning';

export default function BullBearIndicatorPage() {
  const bullish = INDICATORS.filter(i => i.signal === 'Bullish').length;
  const bearish = INDICATORS.filter(i => i.signal === 'Bearish').length;
  const compositeScore = INDICATORS.reduce((s, i) => s + (i.signal === 'Bullish' ? i.weight : i.signal === 'Bearish' ? -i.weight : 0), 0);
  const overallSignal = compositeScore > 30 ? 'Bullish' : compositeScore < -30 ? 'Bearish' : 'Neutral';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bull/Bear Indicator</h1>
        <p className="mt-1 text-sm text-gray-500">Market sentiment bull/bear gauge</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Overall</p><p className={cn('text-lg font-bold', overallSignal === 'Bullish' ? 'text-green-400' : overallSignal === 'Bearish' ? 'text-red-400' : 'text-yellow-400')}>{overallSignal}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Score</p><p className="text-lg font-bold text-white">{compositeScore}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gauge className="h-4 w-4 text-indigo-400" /> Sentiment Indicators</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICATORS.map((i) => (
            <div key={i.indicator} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{i.indicator}</p>
                <p className="text-xs text-gray-500">{i.description} &middot; Weight {i.weight}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{i.value}</p>
                  <p className={cn('text-[10px] font-mono', i.change >= 0 ? 'text-green-400' : 'text-red-400')}>{i.change > 0 ? '+' : ''}{i.change}</p>
                </div>
                <Badge variant={signalVariant(i.signal)}>{i.signal}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
