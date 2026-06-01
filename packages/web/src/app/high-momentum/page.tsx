'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Rocket } from 'lucide-react';

interface MomentumData { symbol: string; name: string; price: number; mom1m: number; mom3m: number; mom6m: number; rsi: number; strength: string; }
const STOCKS: MomentumData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, mom1m: 22.4, mom3m: 48.2, mom6m: 82.4, rsi: 78, strength: 'Very High' },
  { symbol: 'META', name: 'Meta', price: 484.10, mom1m: 12.8, mom3m: 28.4, mom6m: 42.8, rsi: 72, strength: 'High' },
  { symbol: 'SMCI', name: 'Super Micro', price: 842.20, mom1m: 38.4, mom3m: 124.8, mom6m: 248.2, rsi: 82, strength: 'Extreme' },
  { symbol: 'ARM', name: 'ARM Holdings', price: 142.80, mom1m: 18.2, mom3m: 42.4, mom6m: 68.4, rsi: 74, strength: 'High' },
  { symbol: 'AVGO', name: 'Broadcom', price: 1284.20, mom1m: 14.2, mom3m: 32.8, mom6m: 48.2, rsi: 68, strength: 'High' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 782.40, mom1m: 8.4, mom3m: 22.4, mom6m: 38.8, rsi: 64, strength: 'Moderate' },
  { symbol: 'PLTR', name: 'Palantir', price: 24.80, mom1m: 28.4, mom3m: 62.8, mom6m: 118.4, rsi: 76, strength: 'Very High' },
];

export default function HighMomentumPage() {
  const extreme = STOCKS.filter((s) => s.rsi > 75).length;
  const avgMom = STOCKS.reduce((s, st) => s + st.mom3m, 0) / STOCKS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">High Momentum</h1><p className="mt-1 text-sm text-gray-500">Stocks with strongest price momentum across timeframes</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Overbought RSI</p><p className="text-lg font-bold text-amber-400">{extreme}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg 3M Mom</p><p className="text-lg font-bold text-green-400">{avgMom.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Screened</p><p className="text-lg font-bold text-indigo-400">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Rocket className="h-4 w-4 text-indigo-400" /> Momentum Leaders</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.mom6m - a.mom6m).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.strength === 'Extreme' ? 'danger' : s.strength === 'Very High' ? 'warning' : 'success'}>{s.strength}</Badge>
                </div>
                <span className="text-sm font-bold font-mono text-white">${s.price.toFixed(2)}</span>
              </div>
              <div className="flex gap-4 text-[10px]">
                <span className="text-gray-500">1M: <span className={cn('font-mono text-green-400')}>+{s.mom1m}%</span></span>
                <span className="text-gray-500">3M: <span className={cn('font-mono text-green-400')}>+{s.mom3m}%</span></span>
                <span className="text-gray-500">6M: <span className={cn('font-mono text-green-400')}>+{s.mom6m}%</span></span>
                <span className="text-gray-500 ml-auto">RSI: <span className={cn('font-mono', s.rsi > 70 ? 'text-amber-400' : 'text-gray-400')}>{s.rsi}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
