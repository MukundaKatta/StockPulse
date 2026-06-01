'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowUpDown } from 'lucide-react';

interface SARData { symbol: string; name: string; price: number; sar: number; signal: string; af: number; }
const STOCKS: SARData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, sar: 842.10, signal: 'Buy', af: 0.02 },
  { symbol: 'META', name: 'Meta', price: 484.10, sar: 468.20, signal: 'Buy', af: 0.04 },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, sar: 398.40, signal: 'Buy', af: 0.02 },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, sar: 192.80, signal: 'Sell', af: 0.06 },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, sar: 204.50, signal: 'Sell', af: 0.08 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, sar: 136.20, signal: 'Buy', af: 0.02 },
  { symbol: 'INTC', name: 'Intel', price: 42.80, sar: 46.10, signal: 'Sell', af: 0.10 },
  { symbol: 'AMD', name: 'AMD', price: 172.40, sar: 165.80, signal: 'Buy', af: 0.04 },
];

export default function ParabolicSARPage() {
  const buys = STOCKS.filter((s) => s.signal === 'Buy').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Parabolic SAR</h1><p className="mt-1 text-sm text-gray-500">Stop and Reverse — trend direction and trailing stops</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Buy Signals</p><p className="text-lg font-bold text-green-400">{buys}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sell Signals</p><p className="text-lg font-bold text-red-400">{STOCKS.length - buys}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total</p><p className="text-lg font-bold text-indigo-400">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowUpDown className="h-4 w-4 text-indigo-400" /> SAR Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.signal === 'Buy' ? 'success' : 'danger'}>{s.signal}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">SAR: ${s.sar.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500">AF: {s.af.toFixed(2)}</span>
                <span className={cn('text-sm font-bold font-mono', s.signal === 'Buy' ? 'text-green-400' : 'text-red-400')}>${s.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
