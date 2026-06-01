'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { RefreshCw } from 'lucide-react';

interface MeanRevData { symbol: string; name: string; price: number; sma50: number; deviation: number; zScore: number; signal: string; }
const STOCKS: MeanRevData[] = [
  { symbol: 'INTC', name: 'Intel', price: 42.80, sma50: 48.20, deviation: -11.2, zScore: -2.4, signal: 'Buy' },
  { symbol: 'BABA', name: 'Alibaba', price: 72.40, sma50: 82.80, deviation: -12.6, zScore: -2.1, signal: 'Buy' },
  { symbol: 'NKE', name: 'Nike', price: 98.20, sma50: 108.40, deviation: -9.4, zScore: -1.8, signal: 'Buy' },
  { symbol: 'PYPL', name: 'PayPal', price: 62.40, sma50: 68.80, deviation: -9.3, zScore: -1.6, signal: 'Watch' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, sma50: 742.80, deviation: 18.2, zScore: 2.8, signal: 'Sell' },
  { symbol: 'SMCI', name: 'Super Micro', price: 842.20, sma50: 628.40, deviation: 34.0, zScore: 3.2, signal: 'Sell' },
  { symbol: 'DIS', name: 'Disney', price: 94.80, sma50: 102.20, deviation: -7.2, zScore: -1.4, signal: 'Watch' },
];

export default function MeanReversionPicksPage() {
  const buySignals = STOCKS.filter((s) => s.signal === 'Buy').length;
  const sellSignals = STOCKS.filter((s) => s.signal === 'Sell').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Mean Reversion</h1><p className="mt-1 text-sm text-gray-500">Stocks deviating significantly from their mean — reversion candidates</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Buy Signals</p><p className="text-lg font-bold text-green-400">{buySignals}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sell Signals</p><p className="text-lg font-bold text-red-400">{sellSignals}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Candidates</p><p className="text-lg font-bold text-indigo-400">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><RefreshCw className="h-4 w-4 text-indigo-400" /> Reversion Candidates</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => a.zScore - b.zScore).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.signal === 'Buy' ? 'success' : s.signal === 'Sell' ? 'danger' : 'warning'}>{s.signal}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">SMA50: ${s.sma50.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500">Z: {s.zScore.toFixed(1)}</span>
                <span className={cn('text-sm font-bold font-mono', s.deviation < 0 ? 'text-red-400' : 'text-green-400')}>{s.deviation > 0 ? '+' : ''}{s.deviation.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
