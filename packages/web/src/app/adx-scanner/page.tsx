'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';
interface ADXData { symbol: string; name: string; price: number; adx: number; plusDI: number; minusDI: number; trend: string; strength: string; }
const STOCKS: ADXData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, adx: 48.2, plusDI: 38.4, minusDI: 12.1, trend: 'Up', strength: 'Strong' },
  { symbol: 'META', name: 'Meta', price: 484.10, adx: 35.4, plusDI: 32.8, minusDI: 15.2, trend: 'Up', strength: 'Strong' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, adx: 28.2, plusDI: 24.1, minusDI: 18.4, trend: 'Up', strength: 'Moderate' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, adx: 18.4, plusDI: 22.1, minusDI: 20.8, trend: 'Flat', strength: 'Weak' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, adx: 22.1, plusDI: 20.4, minusDI: 18.2, trend: 'Up', strength: 'Weak' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, adx: 42.8, plusDI: 12.4, minusDI: 35.8, trend: 'Down', strength: 'Strong' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, adx: 32.4, plusDI: 14.2, minusDI: 28.4, trend: 'Down', strength: 'Moderate' },
  { symbol: 'BABA', name: 'Alibaba', price: 72.40, adx: 38.2, plusDI: 10.8, minusDI: 32.4, trend: 'Down', strength: 'Strong' },
];
export default function ADXScannerPage() {
  const strong = STOCKS.filter((s) => s.adx > 25).length;
  const upTrend = STOCKS.filter((s) => s.trend === 'Up').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">ADX Scanner</h1><p className="mt-1 text-sm text-gray-500">Average Directional Index — trend strength and direction</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Trend</p><p className="text-lg font-bold text-indigo-400">{strong}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Uptrend</p><p className="text-lg font-bold text-green-400">{upTrend}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Downtrend</p><p className="text-lg font-bold text-red-400">{STOCKS.filter((s) => s.trend === 'Down').length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Activity className="h-4 w-4 text-indigo-400" /> ADX Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.adx - a.adx).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.trend === 'Up' ? 'success' : s.trend === 'Down' ? 'danger' : 'default'}>{s.trend}</Badge>
                  <Badge variant={s.strength === 'Strong' ? 'warning' : 'default'}>{s.strength}</Badge></div>
                <span className={cn('text-sm font-bold font-mono', s.adx > 30 ? 'text-amber-400' : 'text-gray-400')}>{s.adx.toFixed(1)}</span>
              </div>
              <div className="flex gap-4 text-[10px]">
                <span className="text-gray-400">+DI: <span className="font-mono text-green-400">{s.plusDI.toFixed(1)}</span></span>
                <span className="text-gray-400">-DI: <span className="font-mono text-red-400">{s.minusDI.toFixed(1)}</span></span>
                <span className="text-gray-400">ADX: <span className="font-mono text-white">{s.adx.toFixed(1)}</span></span>
                <span className="text-xs font-mono text-gray-500 ml-auto">${s.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
