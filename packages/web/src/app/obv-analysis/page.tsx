'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface OBVData { symbol: string; name: string; price: number; obv: number; obvChange: number; trend: string; }
const STOCKS: OBVData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, obv: 284.5, obvChange: 12.4, trend: 'Bullish' },
  { symbol: 'META', name: 'Meta', price: 484.10, obv: 198.2, obvChange: 8.2, trend: 'Bullish' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, obv: 312.4, obvChange: 3.1, trend: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, obv: 542.8, obvChange: -2.4, trend: 'Neutral' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, obv: 148.2, obvChange: -15.8, trend: 'Bearish' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, obv: 224.1, obvChange: 5.4, trend: 'Bullish' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, obv: 88.4, obvChange: -8.2, trend: 'Bearish' },
  { symbol: 'AMD', name: 'AMD', price: 172.40, obv: 142.8, obvChange: 6.8, trend: 'Bullish' },
];

export default function OBVAnalysisPage() {
  const bullish = STOCKS.filter((s) => s.trend === 'Bullish').length;
  const bearish = STOCKS.filter((s) => s.trend === 'Bearish').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">OBV Analysis</h1><p className="mt-1 text-sm text-gray-500">On-Balance Volume — volume-based trend confirmation</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Neutral</p><p className="text-lg font-bold text-gray-400">{STOCKS.length - bullish - bearish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-indigo-400" /> OBV Trends</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.obvChange - a.obvChange).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.trend === 'Bullish' ? 'success' : s.trend === 'Bearish' ? 'danger' : 'default'}>{s.trend}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">OBV: {s.obv.toFixed(1)}M</span>
                <span className={cn('text-sm font-bold font-mono', s.obvChange > 0 ? 'text-green-400' : 'text-red-400')}>{s.obvChange > 0 ? '+' : ''}{s.obvChange.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
