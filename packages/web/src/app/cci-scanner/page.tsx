'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface CCIData { symbol: string; name: string; price: number; cci: number; signal: string; period: number; }
const STOCKS: CCIData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, cci: 185.4, signal: 'Overbought', period: 20 },
  { symbol: 'META', name: 'Meta', price: 484.10, cci: 142.8, signal: 'Overbought', period: 20 },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, cci: 68.2, signal: 'Neutral', period: 20 },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, cci: -45.1, signal: 'Neutral', period: 20 },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, cci: -162.4, signal: 'Oversold', period: 20 },
  { symbol: 'INTC', name: 'Intel', price: 42.80, cci: -210.8, signal: 'Oversold', period: 20 },
  { symbol: 'AMD', name: 'AMD', price: 172.40, cci: 98.4, signal: 'Neutral', period: 20 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, cci: 52.1, signal: 'Neutral', period: 20 },
];

export default function CCIScannerPage() {
  const overbought = STOCKS.filter((s) => s.cci > 100).length;
  const oversold = STOCKS.filter((s) => s.cci < -100).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">CCI Scanner</h1><p className="mt-1 text-sm text-gray-500">Commodity Channel Index — overbought/oversold signals</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Overbought</p><p className="text-lg font-bold text-red-400">{overbought}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Neutral</p><p className="text-lg font-bold text-gray-400">{STOCKS.length - overbought - oversold}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Oversold</p><p className="text-lg font-bold text-green-400">{oversold}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> CCI Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.cci - a.cci).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.signal === 'Overbought' ? 'danger' : s.signal === 'Oversold' ? 'success' : 'default'}>{s.signal}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">${s.price.toFixed(2)}</span>
                <span className={cn('text-sm font-bold font-mono', s.cci > 100 ? 'text-red-400' : s.cci < -100 ? 'text-green-400' : 'text-gray-400')}>{s.cci.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
