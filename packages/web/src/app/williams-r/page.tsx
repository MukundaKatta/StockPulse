'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Gauge } from 'lucide-react';
interface WRData { symbol: string; name: string; price: number; wr14: number; wr28: number; signal: string; }
const STOCKS: WRData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, wr14: -8.4, wr28: -12.2, signal: 'Overbought' },
  { symbol: 'META', name: 'Meta', price: 484.10, wr14: -15.2, wr28: -22.4, signal: 'Near Overbought' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, wr14: -28.4, wr28: -32.1, signal: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, wr14: -42.1, wr28: -38.8, signal: 'Neutral' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, wr14: -55.4, wr28: -48.2, signal: 'Neutral' },
  { symbol: 'AMZN', name: 'Amazon', price: 178.25, wr14: -32.8, wr28: -28.4, signal: 'Neutral' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, wr14: -82.4, wr28: -78.5, signal: 'Near Oversold' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, wr14: -92.1, wr28: -88.4, signal: 'Oversold' },
  { symbol: 'BABA', name: 'Alibaba', price: 72.40, wr14: -88.2, wr28: -85.4, signal: 'Oversold' },
];
export default function WilliamsRPage() {
  const ob = STOCKS.filter((s) => s.wr14 > -20).length;
  const os = STOCKS.filter((s) => s.wr14 < -80).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Williams %R</h1><p className="mt-1 text-sm text-gray-500">14 and 28-period Williams %R momentum oscillator</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Overbought</p><p className="text-lg font-bold text-red-400">{ob}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Neutral</p><p className="text-lg font-bold text-gray-400">{STOCKS.length - ob - os}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Oversold</p><p className="text-lg font-bold text-green-400">{os}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gauge className="h-4 w-4 text-indigo-400" /> %R Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.wr14 > -20 ? 'danger' : s.wr14 < -80 ? 'success' : 'default'}>{s.signal}</Badge></div>
                <span className="text-xs font-mono text-white">${s.price.toFixed(2)}</span>
              </div>
              <div className="relative h-2 rounded bg-white/5">
                <div className="absolute left-0 w-[20%] h-full bg-red-500/10 rounded-l" />
                <div className="absolute right-0 w-[20%] h-full bg-green-500/10 rounded-r" />
                <div className="absolute top-0 bottom-0 w-1.5 rounded bg-white" style={{ left: `${Math.abs(s.wr14)}%` }} />
              </div>
              <div className="flex gap-4 text-[10px]">
                <span className="text-gray-400">%R(14): <span className={cn('font-mono', s.wr14 > -20 ? 'text-red-400' : s.wr14 < -80 ? 'text-green-400' : 'text-white')}>{s.wr14.toFixed(1)}</span></span>
                <span className="text-gray-400">%R(28): <span className={cn('font-mono', s.wr28 > -20 ? 'text-red-400' : s.wr28 < -80 ? 'text-green-400' : 'text-white')}>{s.wr28.toFixed(1)}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
