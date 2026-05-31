'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { RotateCcw } from 'lucide-react';

interface MeanRevStock {
  symbol: string;
  name: string;
  price: number;
  sma20: number;
  sma50: number;
  devFromMean: number;
  zScore: number;
  signal: 'Buy' | 'Sell' | 'Neutral';
}

const STOCKS: MeanRevStock[] = [
  { symbol: 'SMCI', name: 'Super Micro', price: 1012.50, sma20: 820.40, sma50: 620.80, devFromMean: 23.4, zScore: 3.2, signal: 'Sell' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, sma20: 785.20, sma50: 680.50, devFromMean: 11.9, zScore: 2.1, signal: 'Sell' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, sma20: 465.30, sma50: 425.80, devFromMean: 4.0, zScore: 0.8, signal: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 186.05, sma20: 188.40, sma50: 185.20, devFromMean: -1.2, zScore: -0.4, signal: 'Neutral' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 404.87, sma20: 398.60, sma50: 385.40, devFromMean: 1.6, zScore: 0.5, signal: 'Neutral' },
  { symbol: 'BA', name: 'Boeing Co', price: 204.15, sma20: 218.40, sma50: 225.60, devFromMean: -6.5, zScore: -1.8, signal: 'Buy' },
  { symbol: 'PFE', name: 'Pfizer Inc', price: 26.45, sma20: 28.10, sma50: 29.80, devFromMean: -5.9, zScore: -2.0, signal: 'Buy' },
  { symbol: 'NKE', name: 'Nike Inc', price: 93.20, sma20: 98.60, sma50: 102.40, devFromMean: -5.5, zScore: -1.7, signal: 'Buy' },
  { symbol: 'INTC', name: 'Intel Corp', price: 42.18, sma20: 44.80, sma50: 45.20, devFromMean: -5.8, zScore: -1.6, signal: 'Buy' },
];

export default function MeanReversionPage() {
  const buySignals = STOCKS.filter((s) => s.signal === 'Buy').length;
  const sellSignals = STOCKS.filter((s) => s.signal === 'Sell').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Mean Reversion</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks deviating from their moving averages</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Buy Signals</p>
          <p className="text-lg font-bold text-green-400">{buySignals}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Neutral</p>
          <p className="text-lg font-bold text-gray-400">{STOCKS.length - buySignals - sellSignals}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Sell Signals</p>
          <p className="text-lg font-bold text-red-400">{sellSignals}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <RotateCcw className="h-4 w-4 text-indigo-400" /> Deviation Scanner
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => a.zScore - b.zScore).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-16">${s.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-gray-400 w-14">SMA20: {s.sma20.toFixed(0)}</span>
              <span className={cn('text-xs font-mono w-14', s.devFromMean >= 0 ? 'text-red-400' : 'text-green-400')}>
                {s.devFromMean >= 0 ? '+' : ''}{s.devFromMean.toFixed(1)}%
              </span>
              <span className={cn(
                'text-xs font-mono w-12',
                Math.abs(s.zScore) >= 2 ? (s.zScore > 0 ? 'text-red-400' : 'text-green-400') : 'text-gray-400'
              )}>
                z={s.zScore >= 0 ? '+' : ''}{s.zScore.toFixed(1)}
              </span>
              <Badge variant={s.signal === 'Buy' ? 'success' : s.signal === 'Sell' ? 'danger' : 'default'}>
                {s.signal}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
