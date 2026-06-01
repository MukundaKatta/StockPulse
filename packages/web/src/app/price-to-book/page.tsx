'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BookOpen } from 'lucide-react';
interface PBData { symbol: string; name: string; pb: number; ps: number; evEbitda: number; pegRatio: number; sector: string; }
const STOCKS: PBData[] = [
  { symbol: 'AAPL', name: 'Apple', pb: 48.2, ps: 7.8, evEbitda: 22.4, pegRatio: 2.8, sector: 'Tech' },
  { symbol: 'MSFT', name: 'Microsoft', pb: 12.8, ps: 13.4, evEbitda: 24.8, pegRatio: 2.2, sector: 'Tech' },
  { symbol: 'NVDA', name: 'NVIDIA', pb: 52.4, ps: 34.2, evEbitda: 48.2, pegRatio: 0.8, sector: 'Tech' },
  { symbol: 'META', name: 'Meta', pb: 8.2, ps: 8.4, evEbitda: 18.2, pegRatio: 1.2, sector: 'Tech' },
  { symbol: 'GOOGL', name: 'Alphabet', pb: 6.8, ps: 6.2, evEbitda: 16.8, pegRatio: 1.4, sector: 'Tech' },
  { symbol: 'JPM', name: 'JP Morgan', pb: 1.8, ps: 3.4, evEbitda: 0, pegRatio: 1.8, sector: 'Finance' },
  { symbol: 'BAC', name: 'Bank of America', pb: 1.1, ps: 2.8, evEbitda: 0, pegRatio: 2.1, sector: 'Finance' },
  { symbol: 'XOM', name: 'Exxon Mobil', pb: 2.2, ps: 1.2, evEbitda: 6.4, pegRatio: 0, sector: 'Energy' },
];
export default function PriceToBookPage() {
  const avgPB = STOCKS.reduce((s, st) => s + st.pb, 0) / STOCKS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Valuation Multiples</h1><p className="mt-1 text-sm text-gray-500">P/B, P/S, EV/EBITDA, and PEG ratio comparison</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg P/B</p><p className="text-lg font-bold text-indigo-400">{avgPB.toFixed(1)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">P/B &lt; 3</p><p className="text-lg font-bold text-green-400">{STOCKS.filter((s) => s.pb < 3).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">PEG &lt; 1.5</p><p className="text-lg font-bold text-blue-400">{STOCKS.filter((s) => s.pegRatio > 0 && s.pegRatio < 1.5).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4 text-indigo-400" /> Multiples</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => a.pb - b.pb).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-20"><p className="text-xs font-bold text-white">{s.symbol}</p><p className="text-[10px] text-gray-500">{s.name}</p></div>
              <Badge variant="info">{s.sector}</Badge>
              <span className="text-[10px] text-gray-400">P/B: <span className={cn('font-mono', s.pb < 5 ? 'text-green-400' : 'text-amber-400')}>{s.pb}x</span></span>
              <span className="text-[10px] text-gray-400">P/S: <span className="font-mono text-white">{s.ps}x</span></span>
              {s.evEbitda > 0 && <span className="text-[10px] text-gray-400">EV/EBITDA: <span className="font-mono text-white">{s.evEbitda}x</span></span>}
              {s.pegRatio > 0 && <span className="text-[10px] text-gray-400 ml-auto">PEG: <span className={cn('font-mono', s.pegRatio < 1.5 ? 'text-green-400' : 'text-amber-400')}>{s.pegRatio}x</span></span>}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
