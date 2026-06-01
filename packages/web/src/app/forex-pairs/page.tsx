'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { ArrowLeftRight } from 'lucide-react';

interface ForexPair {
  pair: string;
  base: string;
  quote: string;
  rate: number;
  change24h: number;
  high24h: number;
  low24h: number;
  spread: number;
  type: 'Major' | 'Minor' | 'Exotic';
}

const PAIRS: ForexPair[] = [
  { pair: 'EUR/USD', base: 'EUR', quote: 'USD', rate: 1.0842, change24h: 0.15, high24h: 1.0878, low24h: 1.0801, spread: 0.6, type: 'Major' },
  { pair: 'GBP/USD', base: 'GBP', quote: 'USD', rate: 1.2645, change24h: -0.22, high24h: 1.2698, low24h: 1.2610, spread: 0.8, type: 'Major' },
  { pair: 'USD/JPY', base: 'USD', quote: 'JPY', rate: 150.42, change24h: 0.38, high24h: 150.88, low24h: 149.85, spread: 0.7, type: 'Major' },
  { pair: 'USD/CHF', base: 'USD', quote: 'CHF', rate: 0.8765, change24h: -0.12, high24h: 0.8790, low24h: 0.8742, spread: 1.0, type: 'Major' },
  { pair: 'AUD/USD', base: 'AUD', quote: 'USD', rate: 0.6528, change24h: 0.45, high24h: 0.6555, low24h: 0.6498, spread: 0.9, type: 'Major' },
  { pair: 'EUR/GBP', base: 'EUR', quote: 'GBP', rate: 0.8574, change24h: 0.08, high24h: 0.8598, low24h: 0.8555, spread: 1.2, type: 'Minor' },
  { pair: 'GBP/JPY', base: 'GBP', quote: 'JPY', rate: 190.18, change24h: -0.55, high24h: 191.22, low24h: 189.60, spread: 1.8, type: 'Minor' },
  { pair: 'USD/MXN', base: 'USD', quote: 'MXN', rate: 17.15, change24h: 0.72, high24h: 17.28, low24h: 17.02, spread: 3.5, type: 'Exotic' },
];

export default function ForexPairsPage() {
  const majors = PAIRS.filter((p) => p.type === 'Major').length;
  const gainers = PAIRS.filter((p) => p.change24h > 0).length;
  const avgSpread = PAIRS.reduce((s, p) => s + p.spread, 0) / PAIRS.length;
  const maxVolatility = Math.max(...PAIRS.map((p) => Math.abs(p.change24h)));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Forex Pairs</h1>
        <p className="mt-1 text-sm text-gray-500">Major, minor, and exotic currency pair rates</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Major Pairs</p>
          <p className="text-lg font-bold text-white">{majors}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Gainers</p>
          <p className="text-lg font-bold text-green-400">{gainers}/{PAIRS.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Spread</p>
          <p className="text-lg font-bold text-indigo-400">{avgSpread.toFixed(1)} pips</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Max Move</p>
          <p className="text-lg font-bold text-amber-400">{maxVolatility.toFixed(2)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <ArrowLeftRight className="h-4 w-4 text-indigo-400" /> Currency Pairs
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {PAIRS.map((p) => (
            <div key={p.pair} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{p.pair}</p>
              </div>
              <Badge variant={p.type === 'Major' ? 'info' : p.type === 'Minor' ? 'warning' : 'default'}>
                {p.type}
              </Badge>
              <span className="text-xs font-mono text-white w-16">{p.rate.toFixed(4)}</span>
              <span className={cn('text-xs font-mono w-14', p.change24h >= 0 ? 'text-green-400' : 'text-red-400')}>
                {p.change24h >= 0 ? '+' : ''}{p.change24h.toFixed(2)}%
              </span>
              <span className="text-[10px] text-gray-400 w-20">H: {p.high24h.toFixed(4)}</span>
              <span className="text-[10px] text-gray-400 w-20">L: {p.low24h.toFixed(4)}</span>
              <span className="text-[10px] text-gray-500 ml-auto">{p.spread} pips</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
