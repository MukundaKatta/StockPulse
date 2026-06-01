'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface ADLineData { symbol: string; name: string; price: number; adLine: number; adChange: number; signal: string; }
const STOCKS: ADLineData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, adLine: 45.2, adChange: 8.4, signal: 'Accumulation' },
  { symbol: 'META', name: 'Meta', price: 484.10, adLine: 32.8, adChange: 5.2, signal: 'Accumulation' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, adLine: 18.4, adChange: 1.2, signal: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, adLine: -12.4, adChange: -3.8, signal: 'Distribution' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, adLine: -28.6, adChange: -9.4, signal: 'Distribution' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, adLine: 22.1, adChange: 4.2, signal: 'Accumulation' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, adLine: -18.4, adChange: -6.8, signal: 'Distribution' },
  { symbol: 'AMD', name: 'AMD', price: 172.40, adLine: 28.4, adChange: 6.2, signal: 'Accumulation' },
];

export default function AccumulationDistributionPage() {
  const accum = STOCKS.filter((s) => s.signal === 'Accumulation').length;
  const distrib = STOCKS.filter((s) => s.signal === 'Distribution').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Accumulation/Distribution</h1><p className="mt-1 text-sm text-gray-500">A/D line analysis — volume flow and money flow direction</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Accumulation</p><p className="text-lg font-bold text-green-400">{accum}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Neutral</p><p className="text-lg font-bold text-gray-400">{STOCKS.length - accum - distrib}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Distribution</p><p className="text-lg font-bold text-red-400">{distrib}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Activity className="h-4 w-4 text-indigo-400" /> A/D Line</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.adChange - a.adChange).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.signal === 'Accumulation' ? 'success' : s.signal === 'Distribution' ? 'danger' : 'default'}>{s.signal}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">A/D: {s.adLine.toFixed(1)}M</span>
                <span className={cn('text-sm font-bold font-mono', s.adChange > 0 ? 'text-green-400' : 'text-red-400')}>{s.adChange > 0 ? '+' : ''}{s.adChange.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
