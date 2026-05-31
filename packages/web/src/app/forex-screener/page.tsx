'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowLeftRight } from 'lucide-react';

interface ForexPair {
  pair: string;
  bid: number;
  ask: number;
  change: number;
  high: number;
  low: number;
  spread: number;
}

const PAIRS: ForexPair[] = [
  { pair: 'EUR/USD', bid: 1.0782, ask: 1.0784, change: -0.15, high: 1.0812, low: 1.0762, spread: 0.2 },
  { pair: 'GBP/USD', bid: 1.2628, ask: 1.2631, change: 0.08, high: 1.2658, low: 1.2605, spread: 0.3 },
  { pair: 'USD/JPY', bid: 148.52, ask: 148.55, change: 0.32, high: 148.80, low: 147.95, spread: 0.3 },
  { pair: 'USD/CHF', bid: 0.8745, ask: 0.8748, change: 0.18, high: 0.8768, low: 0.8720, spread: 0.3 },
  { pair: 'AUD/USD', bid: 0.6528, ask: 0.6531, change: -0.25, high: 0.6560, low: 0.6510, spread: 0.3 },
  { pair: 'USD/CAD', bid: 1.3468, ask: 1.3471, change: 0.12, high: 1.3495, low: 1.3440, spread: 0.3 },
  { pair: 'NZD/USD', bid: 0.6105, ask: 0.6108, change: -0.35, high: 0.6145, low: 0.6088, spread: 0.3 },
  { pair: 'EUR/GBP', bid: 0.8538, ask: 0.8541, change: -0.22, high: 0.8562, low: 0.8525, spread: 0.3 },
  { pair: 'EUR/JPY', bid: 160.15, ask: 160.19, change: 0.18, high: 160.45, low: 159.72, spread: 0.4 },
  { pair: 'GBP/JPY', bid: 187.58, ask: 187.63, change: 0.42, high: 187.95, low: 186.85, spread: 0.5 },
];

export default function ForexScreenerPage() {
  const usdPairs = PAIRS.filter((p) => p.pair.includes('USD'));
  const avgSpread = PAIRS.reduce((s, p) => s + p.spread, 0) / PAIRS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Forex Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Major and cross currency pairs</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Pairs</p>
          <p className="text-lg font-bold text-white">{PAIRS.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">USD Pairs</p>
          <p className="text-lg font-bold text-indigo-400">{usdPairs.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Avg Spread</p>
          <p className="text-lg font-bold text-yellow-400">{avgSpread.toFixed(1)} pips</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <ArrowLeftRight className="h-4 w-4 text-indigo-400" /> FX Rates
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {PAIRS.map((p) => {
            const range = p.high - p.low;
            const position = range > 0 ? ((p.bid - p.low) / range) * 100 : 50;
            return (
              <div key={p.pair} className="flex items-center gap-3 py-2 px-4">
                <span className="text-xs font-bold text-white w-16">{p.pair}</span>
                <span className="text-xs font-mono text-white w-16">{p.bid.toFixed(p.bid > 100 ? 2 : 4)}</span>
                <span className={cn('text-xs font-mono w-14', p.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {p.change >= 0 ? '+' : ''}{p.change.toFixed(2)}%
                </span>
                <div className="flex-1 relative h-3 rounded bg-white/5">
                  <div className="absolute top-0 left-0 h-full bg-indigo-500/20 rounded" style={{ width: `${position}%` }} />
                  <div className="absolute top-0 h-full w-px bg-indigo-400" style={{ left: `${position}%` }} />
                </div>
                <span className="text-[10px] text-gray-500 w-16">{p.low.toFixed(p.low > 100 ? 2 : 4)}</span>
                <span className="text-[10px] text-gray-500 w-16">{p.high.toFixed(p.high > 100 ? 2 : 4)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
