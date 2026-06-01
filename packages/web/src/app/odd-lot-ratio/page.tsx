'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { PieChart } from 'lucide-react';

interface OddLotData { symbol: string; name: string; oddLotPct: number; totalTrades: number; oddLotTrades: number; trend: string; }
const STOCKS: OddLotData[] = [
  { symbol: 'AAPL', name: 'Apple', oddLotPct: 48.2, totalTrades: 124500, oddLotTrades: 60009, trend: 'Rising' },
  { symbol: 'MSFT', name: 'Microsoft', oddLotPct: 42.8, totalTrades: 98200, oddLotTrades: 42030, trend: 'Stable' },
  { symbol: 'NVDA', name: 'NVIDIA', oddLotPct: 55.4, totalTrades: 142800, oddLotTrades: 79111, trend: 'Rising' },
  { symbol: 'TSLA', name: 'Tesla', oddLotPct: 62.1, totalTrades: 168400, oddLotTrades: 104577, trend: 'Rising' },
  { symbol: 'AMD', name: 'AMD', oddLotPct: 51.2, totalTrades: 88400, oddLotTrades: 45261, trend: 'Stable' },
  { symbol: 'GOOGL', name: 'Alphabet', oddLotPct: 38.4, totalTrades: 72800, oddLotTrades: 27955, trend: 'Falling' },
  { symbol: 'META', name: 'Meta', oddLotPct: 44.8, totalTrades: 82400, oddLotTrades: 36915, trend: 'Stable' },
];

export default function OddLotRatioPage() {
  const avgRatio = STOCKS.reduce((s, st) => s + st.oddLotPct, 0) / STOCKS.length;
  const rising = STOCKS.filter((s) => s.trend === 'Rising').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Odd Lot Ratio</h1><p className="mt-1 text-sm text-gray-500">Odd lot trade ratio — retail activity indicator</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Ratio</p><p className="text-lg font-bold text-indigo-400">{avgRatio.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Rising</p><p className="text-lg font-bold text-amber-400">{rising}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Tracked</p><p className="text-lg font-bold text-gray-400">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PieChart className="h-4 w-4 text-indigo-400" /> Odd Lot Activity</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.oddLotPct - a.oddLotPct).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.trend === 'Rising' ? 'warning' : s.trend === 'Falling' ? 'success' : 'default'}>{s.trend}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">{s.oddLotTrades.toLocaleString()} trades</span>
                <span className={cn('text-sm font-bold font-mono', s.oddLotPct > 50 ? 'text-amber-400' : 'text-gray-400')}>{s.oddLotPct.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
