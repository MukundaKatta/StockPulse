'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Cloud } from 'lucide-react';
interface IchiData { symbol: string; name: string; price: number; tenkan: number; kijun: number; senkouA: number; senkouB: number; chikou: number; signal: string; cloudColor: 'green' | 'red'; }
const STOCKS: IchiData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, tenkan: 862.4, kijun: 825.2, senkouA: 843.8, senkouB: 780.4, chikou: 878.35, signal: 'Strong Bullish', cloudColor: 'green' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, tenkan: 398.2, kijun: 388.4, senkouA: 393.3, senkouB: 372.8, chikou: 404.87, signal: 'Bullish', cloudColor: 'green' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, tenkan: 184.8, kijun: 182.4, senkouA: 183.6, senkouB: 178.2, chikou: 186.05, signal: 'Neutral Bullish', cloudColor: 'green' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, tenkan: 195.4, kijun: 208.2, senkouA: 201.8, senkouB: 218.4, chikou: 188.20, signal: 'Strong Bearish', cloudColor: 'red' },
  { symbol: 'META', name: 'Meta', price: 484.10, tenkan: 478.2, kijun: 462.8, senkouA: 470.5, senkouB: 445.2, chikou: 484.10, signal: 'Bullish', cloudColor: 'green' },
  { symbol: 'AMD', name: 'AMD', price: 172.40, tenkan: 168.4, kijun: 158.2, senkouA: 163.3, senkouB: 148.8, chikou: 172.40, signal: 'Bullish', cloudColor: 'green' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, tenkan: 44.2, kijun: 46.8, senkouA: 45.5, senkouB: 48.2, chikou: 42.80, signal: 'Bearish', cloudColor: 'red' },
  { symbol: 'BABA', name: 'Alibaba', price: 72.40, tenkan: 74.8, kijun: 78.2, senkouA: 76.5, senkouB: 82.4, chikou: 72.40, signal: 'Bearish', cloudColor: 'red' },
];
export default function IchimokuCloudPage() {
  const bullish = STOCKS.filter((s) => s.signal.includes('Bullish')).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Ichimoku Cloud</h1><p className="mt-1 text-sm text-gray-500">Tenkan-Sen, Kijun-Sen, Senkou Span, and Chikou analysis</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{STOCKS.length - bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Above Cloud</p><p className="text-lg font-bold text-indigo-400">{STOCKS.filter((s) => s.price > Math.max(s.senkouA, s.senkouB)).length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Cloud className="h-4 w-4 text-indigo-400" /> Ichimoku Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.signal.includes('Bullish') ? 'success' : 'danger'}>{s.signal}</Badge>
                  <span className={cn('text-[9px] px-1.5 rounded', s.cloudColor === 'green' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>{s.cloudColor === 'green' ? 'Green Cloud' : 'Red Cloud'}</span>
                </div>
                <span className="text-xs font-mono text-white">${s.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-x-3 text-[10px]">
                <span className="text-gray-400">TK: <span className={cn('font-mono', s.price > s.tenkan ? 'text-green-400' : 'text-red-400')}>{s.tenkan.toFixed(1)}</span></span>
                <span className="text-gray-400">KJ: <span className={cn('font-mono', s.price > s.kijun ? 'text-green-400' : 'text-red-400')}>{s.kijun.toFixed(1)}</span></span>
                <span className="text-gray-400">SA: <span className="font-mono text-white">{s.senkouA.toFixed(1)}</span></span>
                <span className="text-gray-400">SB: <span className="font-mono text-white">{s.senkouB.toFixed(1)}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
