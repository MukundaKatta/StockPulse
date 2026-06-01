'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface KeltnerData { symbol: string; name: string; price: number; upper: number; middle: number; lower: number; position: string; }
const STOCKS: KeltnerData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, upper: 860.00, middle: 820.00, lower: 780.00, position: 'Above' },
  { symbol: 'META', name: 'Meta', price: 484.10, upper: 490.00, middle: 470.00, lower: 450.00, position: 'Inside' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, upper: 410.00, middle: 395.00, lower: 380.00, position: 'Inside' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, upper: 195.00, middle: 188.00, lower: 181.00, position: 'Inside' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, upper: 210.00, middle: 198.00, lower: 186.00, position: 'Below' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, upper: 145.00, middle: 140.00, lower: 135.00, position: 'Inside' },
  { symbol: 'AMD', name: 'AMD', price: 172.40, upper: 168.00, middle: 158.00, lower: 148.00, position: 'Above' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, upper: 48.00, middle: 45.00, lower: 42.00, position: 'Below' },
];

export default function KeltnerChannelsPage() {
  const above = STOCKS.filter((s) => s.position === 'Above').length;
  const below = STOCKS.filter((s) => s.position === 'Below').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Keltner Channels</h1><p className="mt-1 text-sm text-gray-500">Channel breakouts based on ATR volatility bands</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Above Channel</p><p className="text-lg font-bold text-green-400">{above}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Inside</p><p className="text-lg font-bold text-gray-400">{STOCKS.length - above - below}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Below Channel</p><p className="text-lg font-bold text-red-400">{below}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-indigo-400" /> Channel Positions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.position === 'Above' ? 'success' : s.position === 'Below' ? 'danger' : 'default'}>{s.position}</Badge>
                </div>
                <span className={cn('text-sm font-bold font-mono', s.position === 'Above' ? 'text-green-400' : s.position === 'Below' ? 'text-red-400' : 'text-gray-400')}>${s.price.toFixed(2)}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>Upper: <span className="font-mono text-gray-400">${s.upper.toFixed(2)}</span></span>
                <span>Mid: <span className="font-mono text-gray-400">${s.middle.toFixed(2)}</span></span>
                <span>Lower: <span className="font-mono text-gray-400">${s.lower.toFixed(2)}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
