'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { DollarSign } from 'lucide-react';
interface FCFData { symbol: string; name: string; fcf: number; fcfYield: number; fcfGrowth: number; fcfMargin: number; capexRatio: number; }
const STOCKS: FCFData[] = [
  { symbol: 'AAPL', name: 'Apple', fcf: 110.5, fcfYield: 3.8, fcfGrowth: 8.2, fcfMargin: 28.8, capexRatio: 3.2 },
  { symbol: 'MSFT', name: 'Microsoft', fcf: 59.5, fcfYield: 2.1, fcfGrowth: 18.4, fcfMargin: 28.1, capexRatio: 12.4 },
  { symbol: 'GOOGL', name: 'Alphabet', fcf: 69.5, fcfYield: 4.0, fcfGrowth: 22.1, fcfMargin: 24.2, capexRatio: 15.8 },
  { symbol: 'META', name: 'Meta', fcf: 43.0, fcfYield: 3.6, fcfGrowth: 82.4, fcfMargin: 31.8, capexRatio: 22.1 },
  { symbol: 'NVDA', name: 'NVIDIA', fcf: 27.0, fcfYield: 1.2, fcfGrowth: 544.0, fcfMargin: 44.2, capexRatio: 2.8 },
  { symbol: 'AMZN', name: 'Amazon', fcf: 36.8, fcfYield: 2.3, fcfGrowth: 148.0, fcfMargin: 6.4, capexRatio: 38.5 },
  { symbol: 'TSLA', name: 'Tesla', fcf: 4.4, fcfYield: 0.7, fcfGrowth: -42.1, fcfMargin: 4.5, capexRatio: 42.8 },
  { symbol: 'JPM', name: 'JP Morgan', fcf: 0, fcfYield: 0, fcfGrowth: 0, fcfMargin: 0, capexRatio: 0 },
];
export default function FreeCashFlowPage() {
  const valid = STOCKS.filter((s) => s.fcf > 0);
  const avgYield = valid.reduce((s, st) => s + st.fcfYield, 0) / valid.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Free Cash Flow</h1><p className="mt-1 text-sm text-gray-500">FCF yield, growth, and margin analysis</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg FCF Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">FCF Positive</p><p className="text-lg font-bold text-white">{valid.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Growing FCF</p><p className="text-lg font-bold text-indigo-400">{STOCKS.filter((s) => s.fcfGrowth > 0).length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-indigo-400" /> FCF Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.filter((s) => s.fcf > 0).sort((a, b) => b.fcf - a.fcf).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-20"><p className="text-xs font-bold text-white">{s.symbol}</p><p className="text-[10px] text-gray-500">{s.name}</p></div>
              <span className="text-xs font-mono text-white w-14">${s.fcf}B</span>
              <span className="text-xs font-mono text-green-400 w-12">{s.fcfYield}%</span>
              <span className={cn('text-xs font-mono w-16', s.fcfGrowth >= 0 ? 'text-green-400' : 'text-red-400')}>{s.fcfGrowth >= 0 ? '+' : ''}{s.fcfGrowth > 100 ? '>100' : s.fcfGrowth}%</span>
              <span className="text-xs font-mono text-indigo-400 w-12">{s.fcfMargin}%</span>
              <span className="text-[10px] text-gray-400 ml-auto">CapEx: {s.capexRatio}%</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
