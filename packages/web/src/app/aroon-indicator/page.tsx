'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Gauge } from 'lucide-react';

interface AroonData { symbol: string; name: string; price: number; aroonUp: number; aroonDown: number; signal: string; }
const STOCKS: AroonData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, aroonUp: 92, aroonDown: 12, signal: 'Strong Up' },
  { symbol: 'META', name: 'Meta', price: 484.10, aroonUp: 84, aroonDown: 20, signal: 'Up' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, aroonUp: 56, aroonDown: 48, signal: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, aroonUp: 40, aroonDown: 64, signal: 'Down' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, aroonUp: 8, aroonDown: 96, signal: 'Strong Down' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, aroonUp: 76, aroonDown: 28, signal: 'Up' },
  { symbol: 'AMD', name: 'AMD', price: 172.40, aroonUp: 88, aroonDown: 16, signal: 'Strong Up' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, aroonUp: 16, aroonDown: 88, signal: 'Strong Down' },
];

export default function AroonIndicatorPage() {
  const upTrend = STOCKS.filter((s) => s.signal.includes('Up')).length;
  const downTrend = STOCKS.filter((s) => s.signal.includes('Down')).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Aroon Indicator</h1><p className="mt-1 text-sm text-gray-500">Aroon Up/Down oscillator — trend identification</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Uptrend</p><p className="text-lg font-bold text-green-400">{upTrend}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Neutral</p><p className="text-lg font-bold text-gray-400">{STOCKS.length - upTrend - downTrend}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Downtrend</p><p className="text-lg font-bold text-red-400">{downTrend}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gauge className="h-4 w-4 text-indigo-400" /> Aroon Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.signal.includes('Up') ? 'success' : s.signal.includes('Down') ? 'danger' : 'default'}>{s.signal}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Up: <span className={cn('font-mono', s.aroonUp > 70 ? 'text-green-400' : 'text-gray-400')}>{s.aroonUp}</span></span>
                <span className="text-[10px] text-gray-500">Down: <span className={cn('font-mono', s.aroonDown > 70 ? 'text-red-400' : 'text-gray-400')}>{s.aroonDown}</span></span>
                <span className="text-xs font-mono text-gray-500">${s.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
