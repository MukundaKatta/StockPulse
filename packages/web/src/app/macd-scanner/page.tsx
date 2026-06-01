'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface MACDStock {
  symbol: string;
  name: string;
  price: number;
  macd: number;
  signal: number;
  histogram: number;
  crossover: 'Bullish' | 'Bearish' | 'None';
  daysAgo: number;
}

const STOCKS: MACDStock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, macd: 18.42, signal: 14.85, histogram: 3.57, crossover: 'Bullish', daysAgo: 3 },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, macd: 8.65, signal: 6.20, histogram: 2.45, crossover: 'Bullish', daysAgo: 5 },
  { symbol: 'AMD', name: 'Advanced Micro', price: 177.52, macd: 4.12, signal: 2.85, histogram: 1.27, crossover: 'Bullish', daysAgo: 2 },
  { symbol: 'AAPL', name: 'Apple Inc', price: 186.05, macd: -0.45, signal: 0.12, histogram: -0.57, crossover: 'Bearish', daysAgo: 1 },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, macd: 2.18, signal: 1.95, histogram: 0.23, crossover: 'None', daysAgo: 0 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, macd: -0.82, signal: -0.45, histogram: -0.37, crossover: 'Bearish', daysAgo: 4 },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 188.70, macd: -5.25, signal: -3.80, histogram: -1.45, crossover: 'Bearish', daysAgo: 8 },
  { symbol: 'BA', name: 'Boeing Co', price: 204.15, macd: -4.85, signal: -3.20, histogram: -1.65, crossover: 'Bearish', daysAgo: 6 },
  { symbol: 'CRWD', name: 'CrowdStrike', price: 312.45, macd: 6.80, signal: 5.40, histogram: 1.40, crossover: 'Bullish', daysAgo: 7 },
  { symbol: 'AVGO', name: 'Broadcom', price: 1285.40, macd: 22.50, signal: 18.90, histogram: 3.60, crossover: 'Bullish', daysAgo: 4 },
];

export default function MACDScannerPage() {
  const bullish = STOCKS.filter((s) => s.crossover === 'Bullish').length;
  const bearish = STOCKS.filter((s) => s.crossover === 'Bearish').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">MACD Scanner</h1>
        <p className="mt-1 text-sm text-gray-500">Moving Average Convergence Divergence crossover signals</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Bullish Cross</p>
          <p className="text-lg font-bold text-green-400">{bullish}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">No Signal</p>
          <p className="text-lg font-bold text-gray-400">{STOCKS.length - bullish - bearish}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Bearish Cross</p>
          <p className="text-lg font-bold text-red-400">{bearish}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-indigo-400" /> MACD Readings
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.histogram - a.histogram).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
              </div>
              <span className={cn('text-xs font-mono w-14', s.macd >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.macd >= 0 ? '+' : ''}{s.macd.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-gray-400 w-14">S: {s.signal.toFixed(2)}</span>
              <div className="flex-1 flex items-center justify-center">
                <div className={cn('h-4 rounded', s.histogram >= 0 ? 'bg-green-500/40' : 'bg-red-500/40')} style={{ width: `${Math.min(Math.abs(s.histogram) * 15, 100)}%` }} />
              </div>
              <Badge variant={s.crossover === 'Bullish' ? 'success' : s.crossover === 'Bearish' ? 'danger' : 'default'}>
                {s.crossover}
              </Badge>
              {s.daysAgo > 0 && <span className="text-[10px] text-gray-500 w-8">{s.daysAgo}d</span>}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
