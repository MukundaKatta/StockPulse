'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface RSIStock {
  symbol: string;
  name: string;
  price: number;
  rsi: number;
  change: number;
  signal: 'Overbought' | 'Oversold' | 'Neutral';
}

const STOCKS: RSIStock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, rsi: 78.4, change: 4.2, signal: 'Overbought' },
  { symbol: 'AMD', name: 'Advanced Micro', price: 177.52, rsi: 72.1, change: 2.8, signal: 'Overbought' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, rsi: 68.5, change: 1.9, signal: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 186.05, rsi: 52.3, change: -0.3, signal: 'Neutral' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 404.87, rsi: 55.1, change: 0.5, signal: 'Neutral' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 141.80, rsi: 48.7, change: -0.8, signal: 'Neutral' },
  { symbol: 'BA', name: 'Boeing Co', price: 204.15, rsi: 28.6, change: -3.1, signal: 'Oversold' },
  { symbol: 'PFE', name: 'Pfizer Inc', price: 26.45, rsi: 22.3, change: -2.4, signal: 'Oversold' },
  { symbol: 'NKE', name: 'Nike Inc', price: 93.20, rsi: 25.8, change: -1.9, signal: 'Oversold' },
  { symbol: 'INTC', name: 'Intel Corp', price: 42.18, rsi: 31.4, change: -1.5, signal: 'Neutral' },
];

function rsiColor(rsi: number) {
  if (rsi >= 70) return 'text-red-400';
  if (rsi <= 30) return 'text-green-400';
  return 'text-gray-400';
}

export default function RSIScannerPage() {
  const overbought = STOCKS.filter((s) => s.signal === 'Overbought');
  const oversold = STOCKS.filter((s) => s.signal === 'Oversold');

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">RSI Scanner</h1>
        <p className="mt-1 text-sm text-gray-500">Relative Strength Index signals across equities</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Overbought (&gt;70)</p>
          <p className="text-lg font-bold text-red-400">{overbought.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Neutral</p>
          <p className="text-lg font-bold text-gray-400">{STOCKS.length - overbought.length - oversold.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Oversold (&lt;30)</p>
          <p className="text-lg font-bold text-green-400">{oversold.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-indigo-400" /> RSI(14) Readings
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.rsi - a.rsi).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-gray-400 w-16">${s.price.toFixed(2)}</span>
              <div className="flex-1 relative h-4 rounded bg-white/5">
                <div
                  className={cn('absolute top-0 h-4 rounded', s.rsi >= 70 ? 'bg-red-500/30' : s.rsi <= 30 ? 'bg-green-500/30' : 'bg-indigo-500/20')}
                  style={{ width: `${s.rsi}%` }}
                />
                <span className={cn('absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold', rsiColor(s.rsi))}>
                  {s.rsi.toFixed(1)}
                </span>
              </div>
              <Badge variant={s.signal === 'Overbought' ? 'danger' : s.signal === 'Oversold' ? 'success' : 'default'}>
                {s.signal}
              </Badge>
              <span className={cn('text-xs font-mono w-14 text-right', s.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.change >= 0 ? '+' : ''}{s.change.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
