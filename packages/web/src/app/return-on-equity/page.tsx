'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Target } from 'lucide-react';
interface ROEData { symbol: string; name: string; roe: number; roa: number; roic: number; roce: number; }
const STOCKS: ROEData[] = [
  { symbol: 'AAPL', name: 'Apple', roe: 160.1, roa: 28.3, roic: 52.4, roce: 58.2 },
  { symbol: 'MSFT', name: 'Microsoft', roe: 38.5, roa: 19.2, roic: 28.4, roce: 32.1 },
  { symbol: 'NVDA', name: 'NVIDIA', roe: 91.5, roa: 45.2, roic: 68.4, roce: 72.1 },
  { symbol: 'META', name: 'Meta', roe: 28.2, roa: 18.4, roic: 24.8, roce: 26.4 },
  { symbol: 'GOOGL', name: 'Alphabet', roe: 25.4, roa: 18.1, roic: 22.8, roce: 24.2 },
  { symbol: 'AMZN', name: 'Amazon', roe: 17.8, roa: 5.2, roic: 8.4, roce: 12.1 },
  { symbol: 'JPM', name: 'JP Morgan', roe: 15.2, roa: 1.2, roic: 0, roce: 0 },
  { symbol: 'TSLA', name: 'Tesla', roe: 18.2, roa: 8.4, roic: 12.1, roce: 14.8 },
];
export default function ReturnOnEquityPage() {
  const avgROE = STOCKS.reduce((s, st) => s + st.roe, 0) / STOCKS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Return on Equity</h1><p className="mt-1 text-sm text-gray-500">ROE, ROA, ROIC, and ROCE comparison</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg ROE</p><p className="text-lg font-bold text-green-400">{avgROE.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">ROE &gt; 20%</p><p className="text-lg font-bold text-indigo-400">{STOCKS.filter((s) => s.roe > 20).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">ROA &gt; 15%</p><p className="text-lg font-bold text-blue-400">{STOCKS.filter((s) => s.roa > 15).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-indigo-400" /> Returns Comparison</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.roe - a.roe).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span></div>
                <Badge variant={s.roe > 30 ? 'success' : s.roe > 15 ? 'warning' : 'danger'}>{s.roe > 30 ? 'Excellent' : s.roe > 15 ? 'Good' : 'Fair'}</Badge>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[10px]">
                {[{ l: 'ROE', v: s.roe }, { l: 'ROA', v: s.roa }, { l: 'ROIC', v: s.roic }, { l: 'ROCE', v: s.roce }].map((m) => (
                  <div key={m.l}><span className="text-gray-500">{m.l}: </span><span className={cn('font-mono', m.v > 20 ? 'text-green-400' : m.v > 10 ? 'text-yellow-400' : m.v > 0 ? 'text-gray-300' : 'text-gray-600')}>{m.v > 0 ? `${m.v}%` : 'N/A'}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
