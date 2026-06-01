'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { Clock } from 'lucide-react';

interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
}

const PRICES: HistoricalPrice[] = [
  { date: '2024-02-09', open: 185.04, high: 187.12, low: 184.80, close: 186.05, volume: 45200000, change: 0.82 },
  { date: '2024-02-08', open: 183.48, high: 185.85, low: 183.25, close: 184.52, volume: 52800000, change: 0.58 },
  { date: '2024-02-07', open: 182.25, high: 184.15, low: 181.90, close: 183.45, volume: 48500000, change: 0.66 },
  { date: '2024-02-06', open: 183.85, high: 184.20, low: 181.50, close: 182.24, volume: 55100000, change: -0.87 },
  { date: '2024-02-05', open: 184.90, high: 185.45, low: 183.10, close: 183.84, volume: 42800000, change: -0.57 },
  { date: '2024-02-02', open: 186.20, high: 187.05, low: 184.50, close: 184.90, volume: 58200000, change: -0.70 },
  { date: '2024-02-01', open: 183.75, high: 186.95, low: 183.50, close: 186.20, volume: 62400000, change: 1.33 },
  { date: '2024-01-31', open: 185.60, high: 186.10, low: 183.15, close: 183.75, volume: 55800000, change: -1.00 },
  { date: '2024-01-30', open: 187.20, high: 187.65, low: 185.42, close: 185.60, volume: 48200000, change: -0.87 },
  { date: '2024-01-29', open: 188.10, high: 188.85, low: 186.80, close: 187.23, volume: 38500000, change: -0.47 },
];

export default function PriceHistoryPage() {
  const avgVolume = PRICES.reduce((s, p) => s + p.volume, 0) / PRICES.length;
  const highestPrice = Math.max(...PRICES.map((p) => p.high));
  const lowestPrice = Math.min(...PRICES.map((p) => p.low));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Price History</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL daily OHLCV data</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Period High</p><p className="text-lg font-bold text-green-400">${highestPrice.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Period Low</p><p className="text-lg font-bold text-red-400">${lowestPrice.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Volume</p><p className="text-lg font-bold text-indigo-400">{(avgVolume / 1e6).toFixed(1)}M</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Range</p><p className="text-lg font-bold text-white">${(highestPrice - lowestPrice).toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-indigo-400" /> Daily Prices</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PRICES.map((p) => {
            const range = highestPrice - lowestPrice;
            const barLeft = ((p.low - lowestPrice) / range) * 100;
            const barWidth = ((p.high - p.low) / range) * 100;
            return (
              <div key={p.date} className="flex items-center gap-2 py-1.5 px-4">
                <span className="text-xs font-mono text-gray-500 w-20">{p.date}</span>
                <span className="text-xs font-mono text-gray-400 w-14">{p.open.toFixed(2)}</span>
                <span className="text-xs font-mono text-green-400 w-14">{p.high.toFixed(2)}</span>
                <span className="text-xs font-mono text-red-400 w-14">{p.low.toFixed(2)}</span>
                <span className={cn('text-xs font-mono font-bold w-14', p.change >= 0 ? 'text-green-400' : 'text-red-400')}>{p.close.toFixed(2)}</span>
                <div className="flex-1 relative h-3 rounded bg-white/5">
                  <div className={cn('absolute top-0 h-full rounded', p.change >= 0 ? 'bg-green-500/30' : 'bg-red-500/30')} style={{ left: `${barLeft}%`, width: `${Math.max(barWidth, 1)}%` }} />
                </div>
                <span className="text-[10px] font-mono text-gray-500 w-12">{(p.volume / 1e6).toFixed(1)}M</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
