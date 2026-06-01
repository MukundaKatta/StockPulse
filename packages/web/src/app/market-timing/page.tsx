'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Crosshair } from 'lucide-react';

interface TimingIndicator {
  name: string;
  type: string;
  value: number;
  signal: 'Buy' | 'Sell' | 'Hold';
  strength: number;
  accuracy: number;
  timeframe: string;
}

const INDICATORS: TimingIndicator[] = [
  { name: 'RSI (14)', type: 'Momentum', value: 58.5, signal: 'Hold', strength: 45, accuracy: 62, timeframe: 'Short' },
  { name: 'MACD Crossover', type: 'Trend', value: 12.4, signal: 'Buy', strength: 78, accuracy: 68, timeframe: 'Medium' },
  { name: 'Bollinger Band %B', type: 'Volatility', value: 0.72, signal: 'Hold', strength: 35, accuracy: 58, timeframe: 'Short' },
  { name: '200 DMA Cross', type: 'Trend', value: 1, signal: 'Buy', strength: 85, accuracy: 72, timeframe: 'Long' },
  { name: 'Stochastic (14,3)', type: 'Momentum', value: 82.5, signal: 'Sell', strength: 68, accuracy: 60, timeframe: 'Short' },
  { name: 'Fear & Greed Index', type: 'Sentiment', value: 65, signal: 'Hold', strength: 40, accuracy: 55, timeframe: 'Short' },
  { name: 'Breadth Thrust', type: 'Breadth', value: 62.8, signal: 'Buy', strength: 72, accuracy: 75, timeframe: 'Medium' },
  { name: 'Zweig Breadth', type: 'Breadth', value: 0.58, signal: 'Hold', strength: 30, accuracy: 82, timeframe: 'Long' },
];

const signalVariant = (s: string) => s === 'Buy' ? 'success' : s === 'Sell' ? 'danger' : 'default';

export default function MarketTimingPage() {
  const buySignals = INDICATORS.filter(i => i.signal === 'Buy').length;
  const avgAccuracy = INDICATORS.reduce((s, i) => s + i.accuracy, 0) / INDICATORS.length;
  const avgStrength = INDICATORS.reduce((s, i) => s + i.strength, 0) / INDICATORS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Timing</h1>
        <p className="mt-1 text-sm text-gray-500">Technical and sentiment-based timing indicators</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Indicators</p><p className="text-lg font-bold text-white">{INDICATORS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Buy Signals</p><p className="text-lg font-bold text-green-400">{buySignals}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Accuracy</p><p className="text-lg font-bold text-indigo-400">{avgAccuracy.toFixed(0)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Strength</p><p className="text-lg font-bold text-cyan-400">{avgStrength.toFixed(0)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Crosshair className="h-4 w-4 text-indigo-400" /> Timing Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICATORS.map((ind) => (
            <div key={ind.name} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{ind.name}</p>
                <p className="text-[10px] text-gray-500">{ind.type} &middot; {ind.timeframe}</p>
              </div>
              <span className="text-xs font-mono text-white w-12">{ind.value}</span>
              <span className="text-[10px] text-gray-400 w-14">Str: {ind.strength}%</span>
              <span className="text-[10px] text-gray-500 w-14">Acc: {ind.accuracy}%</span>
              <Badge variant={signalVariant(ind.signal)} className="ml-auto">{ind.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
