'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface CrossoverSignal {
  symbol: string;
  name: string;
  price: number;
  sma20: number;
  sma50: number;
  sma200: number;
  signal: 'Golden Cross' | 'Death Cross' | 'Bullish' | 'Bearish';
  daysAgo: number;
  volume: string;
}

const SIGNALS: CrossoverSignal[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, sma20: 845.20, sma50: 780.40, sma200: 520.80, signal: 'Bullish', daysAgo: 0, volume: '42.1M' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, sma20: 470.50, sma50: 420.80, sma200: 340.20, signal: 'Golden Cross', daysAgo: 3, volume: '18.5M' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, sma20: 398.40, sma50: 385.60, sma200: 345.90, signal: 'Bullish', daysAgo: 0, volume: '22.8M' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, sma20: 195.80, sma50: 218.40, sma200: 232.50, signal: 'Death Cross', daysAgo: 12, volume: '98.4M' },
  { symbol: 'AMD', name: 'AMD Inc', price: 172.40, sma20: 168.20, sma50: 155.80, sma200: 128.40, signal: 'Golden Cross', daysAgo: 8, volume: '54.2M' },
  { symbol: 'INTC', name: 'Intel Corp', price: 42.80, sma20: 45.20, sma50: 46.80, sma200: 38.50, signal: 'Bearish', daysAgo: 0, volume: '38.1M' },
  { symbol: 'NFLX', name: 'Netflix', price: 565.20, sma20: 548.40, sma50: 510.80, sma200: 445.20, signal: 'Bullish', daysAgo: 0, volume: '8.2M' },
  { symbol: 'BABA', name: 'Alibaba', price: 72.40, sma20: 74.80, sma50: 78.20, sma200: 82.40, signal: 'Death Cross', daysAgo: 22, volume: '14.8M' },
  { symbol: 'SHOP', name: 'Shopify', price: 78.50, sma20: 75.20, sma50: 68.40, sma200: 62.80, signal: 'Golden Cross', daysAgo: 5, volume: '12.4M' },
];

export default function MovingAvgCrossoverPage() {
  const bullish = SIGNALS.filter((s) => s.signal === 'Bullish' || s.signal === 'Golden Cross').length;
  const bearish = SIGNALS.filter((s) => s.signal === 'Bearish' || s.signal === 'Death Cross').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">MA Crossover Scanner</h1>
        <p className="mt-1 text-sm text-gray-500">Moving average crossover signals (20/50/200 SMA)</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish Signals</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bearish Signals</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Scanned</p><p className="text-lg font-bold text-white">{SIGNALS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-indigo-400" /> Crossover Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SIGNALS.map((s) => {
            const aboveSma20 = s.price > s.sma20;
            const aboveSma50 = s.price > s.sma50;
            const aboveSma200 = s.price > s.sma200;
            const signalColor = s.signal === 'Golden Cross' ? 'success' : s.signal === 'Death Cross' ? 'danger' : s.signal === 'Bullish' ? 'success' : 'danger';
            return (
              <div key={s.symbol} className="px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{s.symbol}</span>
                    <span className="text-[10px] text-gray-500">{s.name}</span>
                    <Badge variant={signalColor}>{s.signal}</Badge>
                    {s.daysAgo > 0 && <span className="text-[9px] text-gray-500">{s.daysAgo}d ago</span>}
                  </div>
                  <span className="text-xs font-mono text-white">${s.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 text-[10px]">
                  <span className="text-gray-400">SMA20: <span className={cn('font-mono', aboveSma20 ? 'text-green-400' : 'text-red-400')}>{s.sma20.toFixed(2)}</span></span>
                  <span className="text-gray-400">SMA50: <span className={cn('font-mono', aboveSma50 ? 'text-green-400' : 'text-red-400')}>{s.sma50.toFixed(2)}</span></span>
                  <span className="text-gray-400">SMA200: <span className={cn('font-mono', aboveSma200 ? 'text-green-400' : 'text-red-400')}>{s.sma200.toFixed(2)}</span></span>
                  <span className="text-gray-400 ml-auto">Vol: <span className="font-mono text-white">{s.volume}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
