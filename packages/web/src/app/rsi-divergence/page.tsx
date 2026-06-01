'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { GitBranch } from 'lucide-react';

interface Divergence {
  symbol: string;
  name: string;
  price: number;
  rsi: number;
  type: 'Bullish' | 'Bearish';
  class: 'Regular' | 'Hidden';
  priceAction: string;
  rsiAction: string;
  strength: 'Strong' | 'Moderate' | 'Weak';
  timeframe: string;
}

const DIVERGENCES: Divergence[] = [
  { symbol: 'AAPL', name: 'Apple', price: 186.05, rsi: 58.2, type: 'Bullish', class: 'Hidden', priceAction: 'Higher low', rsiAction: 'Lower low', strength: 'Strong', timeframe: 'Daily' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, rsi: 32.4, type: 'Bullish', class: 'Regular', priceAction: 'Lower low', rsiAction: 'Higher low', strength: 'Strong', timeframe: 'Daily' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, rsi: 78.4, type: 'Bearish', class: 'Regular', priceAction: 'Higher high', rsiAction: 'Lower high', strength: 'Moderate', timeframe: 'Daily' },
  { symbol: 'AMD', name: 'AMD', price: 172.40, rsi: 62.8, type: 'Bullish', class: 'Hidden', priceAction: 'Higher low', rsiAction: 'Lower low', strength: 'Moderate', timeframe: '4H' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, rsi: 72.1, type: 'Bearish', class: 'Regular', priceAction: 'Higher high', rsiAction: 'Lower high', strength: 'Weak', timeframe: 'Weekly' },
  { symbol: 'META', name: 'Meta', price: 484.10, rsi: 68.5, type: 'Bearish', class: 'Hidden', priceAction: 'Lower high', rsiAction: 'Higher high', strength: 'Moderate', timeframe: 'Daily' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, rsi: 28.4, type: 'Bullish', class: 'Regular', priceAction: 'Lower low', rsiAction: 'Higher low', strength: 'Strong', timeframe: 'Weekly' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, rsi: 55.2, type: 'Bullish', class: 'Regular', priceAction: 'Lower low', rsiAction: 'Higher low', strength: 'Moderate', timeframe: '4H' },
];

export default function RSIDivergencePage() {
  const bullish = DIVERGENCES.filter((d) => d.type === 'Bullish').length;
  const bearish = DIVERGENCES.filter((d) => d.type === 'Bearish').length;
  const strong = DIVERGENCES.filter((d) => d.strength === 'Strong').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">RSI Divergence Scanner</h1>
        <p className="mt-1 text-sm text-gray-500">Price vs RSI divergence signals for trend reversals</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Signals</p><p className="text-lg font-bold text-indigo-400">{strong}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total</p><p className="text-lg font-bold text-white">{DIVERGENCES.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><GitBranch className="h-4 w-4 text-indigo-400" /> Divergence Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DIVERGENCES.map((d) => (
            <div key={`${d.symbol}-${d.timeframe}`} className="px-4 py-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{d.symbol}</span>
                  <span className="text-[10px] text-gray-500">{d.name}</span>
                  <Badge variant={d.type === 'Bullish' ? 'success' : 'danger'}>{d.type}</Badge>
                  <Badge variant="info">{d.class}</Badge>
                  <Badge variant={d.strength === 'Strong' ? 'success' : d.strength === 'Moderate' ? 'warning' : 'default'}>{d.strength}</Badge>
                </div>
                <span className="text-[10px] text-gray-500">{d.timeframe}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                <span className="text-gray-400">Price: <span className="font-mono text-white">${d.price.toFixed(2)}</span></span>
                <span className="text-gray-400">RSI: <span className={cn('font-mono', d.rsi > 70 ? 'text-red-400' : d.rsi < 30 ? 'text-green-400' : 'text-white')}>{d.rsi.toFixed(1)}</span></span>
                <span className="text-gray-400">Price: <span className="text-white">{d.priceAction}</span></span>
                <span className="text-gray-400">RSI: <span className="text-white">{d.rsiAction}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
