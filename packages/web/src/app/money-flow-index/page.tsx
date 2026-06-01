'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Waves } from 'lucide-react';
interface MFIData { symbol: string; name: string; price: number; mfi14: number; mfi28: number; signal: string; moneyFlow: 'Inflow' | 'Outflow'; }
const STOCKS: MFIData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, mfi14: 78.4, mfi28: 72.1, signal: 'Near Overbought', moneyFlow: 'Inflow' },
  { symbol: 'META', name: 'Meta', price: 484.10, mfi14: 68.2, mfi28: 62.8, signal: 'Neutral', moneyFlow: 'Inflow' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, mfi14: 58.4, mfi28: 55.2, signal: 'Neutral', moneyFlow: 'Inflow' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, mfi14: 52.1, mfi28: 48.8, signal: 'Neutral', moneyFlow: 'Outflow' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, mfi14: 45.8, mfi28: 42.4, signal: 'Neutral', moneyFlow: 'Outflow' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, mfi14: 22.4, mfi28: 28.2, signal: 'Oversold', moneyFlow: 'Outflow' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, mfi14: 18.2, mfi28: 22.4, signal: 'Oversold', moneyFlow: 'Outflow' },
  { symbol: 'PLTR', name: 'Palantir', price: 22.40, mfi14: 82.4, mfi28: 75.2, signal: 'Overbought', moneyFlow: 'Inflow' },
];
export default function MoneyFlowIndexPage() {
  const ob = STOCKS.filter((s) => s.mfi14 > 80).length;
  const os = STOCKS.filter((s) => s.mfi14 < 20).length;
  const inflow = STOCKS.filter((s) => s.moneyFlow === 'Inflow').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Money Flow Index</h1><p className="mt-1 text-sm text-gray-500">Volume-weighted RSI showing buying and selling pressure</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Overbought</p><p className="text-lg font-bold text-red-400">{ob}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Oversold</p><p className="text-lg font-bold text-green-400">{os}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Net Inflow</p><p className="text-lg font-bold text-blue-400">{inflow}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Net Outflow</p><p className="text-lg font-bold text-amber-400">{STOCKS.length - inflow}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Waves className="h-4 w-4 text-indigo-400" /> MFI Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.mfi14 - a.mfi14).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.mfi14 > 80 ? 'danger' : s.mfi14 < 20 ? 'success' : 'default'}>{s.signal}</Badge>
                  <Badge variant={s.moneyFlow === 'Inflow' ? 'success' : 'danger'}>{s.moneyFlow}</Badge></div>
                <span className="text-xs font-mono text-white">${s.price.toFixed(2)}</span>
              </div>
              <div className="h-2 rounded bg-white/5"><div className={cn('h-full rounded', s.mfi14 > 80 ? 'bg-red-500' : s.mfi14 < 20 ? 'bg-green-500' : 'bg-indigo-500')} style={{ width: `${s.mfi14}%` }} /></div>
              <div className="flex gap-4 text-[10px]">
                <span className="text-gray-400">MFI(14): <span className="font-mono text-white">{s.mfi14.toFixed(1)}</span></span>
                <span className="text-gray-400">MFI(28): <span className="font-mono text-white">{s.mfi28.toFixed(1)}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
