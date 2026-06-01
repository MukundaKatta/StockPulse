'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { RotateCcw } from 'lucide-react';

interface TurnaroundData { symbol: string; name: string; price: number; from52Low: number; catalyst: string; stage: string; rating: string; }
const STOCKS: TurnaroundData[] = [
  { symbol: 'INTC', name: 'Intel', price: 42.80, from52Low: 18.4, catalyst: 'Foundry restructuring', stage: 'Early', rating: 'Buy' },
  { symbol: 'PYPL', name: 'PayPal', price: 62.40, from52Low: 12.8, catalyst: 'New CEO strategy', stage: 'Mid', rating: 'Hold' },
  { symbol: 'DIS', name: 'Disney', price: 94.80, from52Low: 22.4, catalyst: 'Streaming profitability', stage: 'Mid', rating: 'Buy' },
  { symbol: 'BA', name: 'Boeing', price: 184.20, from52Low: 28.2, catalyst: 'Production ramp', stage: 'Early', rating: 'Hold' },
  { symbol: 'NKE', name: 'Nike', price: 98.20, from52Low: 8.4, catalyst: 'DTC strategy pivot', stage: 'Early', rating: 'Buy' },
  { symbol: 'BABA', name: 'Alibaba', price: 72.40, from52Low: 32.4, catalyst: 'Restructuring & buyback', stage: 'Mid', rating: 'Buy' },
  { symbol: 'WBD', name: 'Warner Bros', price: 8.40, from52Low: 15.2, catalyst: 'Debt reduction', stage: 'Early', rating: 'Speculative' },
];

export default function TurnaroundStocksPage() {
  const buys = STOCKS.filter((s) => s.rating === 'Buy').length;
  const avgBounce = STOCKS.reduce((s, st) => s + st.from52Low, 0) / STOCKS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Turnaround Stocks</h1><p className="mt-1 text-sm text-gray-500">Companies executing turnaround strategies</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Buy Rated</p><p className="text-lg font-bold text-green-400">{buys}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Bounce</p><p className="text-lg font-bold text-indigo-400">{avgBounce.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Candidates</p><p className="text-lg font-bold text-gray-400">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><RotateCcw className="h-4 w-4 text-indigo-400" /> Turnaround Plays</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.rating === 'Buy' ? 'success' : s.rating === 'Speculative' ? 'danger' : 'warning'}>{s.rating}</Badge>
                  <Badge variant="default">{s.stage}</Badge>
                </div>
                <span className="text-sm font-bold font-mono text-white">${s.price.toFixed(2)}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>From 52w Low: <span className={cn('font-mono text-green-400')}>+{s.from52Low}%</span></span>
                <span>Catalyst: <span className="text-gray-400">{s.catalyst}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
