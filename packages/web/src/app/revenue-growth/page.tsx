'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';
interface RGData { symbol: string; name: string; rev1y: number; rev3y: number; rev5y: number; qoq: number; yoy: number; sector: string; }
const STOCKS: RGData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', rev1y: 122.4, rev3y: 68.5, rev5y: 52.8, qoq: 22.1, yoy: 122.4, sector: 'Tech' },
  { symbol: 'META', name: 'Meta', rev1y: 24.8, rev3y: 12.4, rev5y: 22.1, qoq: 8.2, yoy: 24.8, sector: 'Tech' },
  { symbol: 'AMZN', name: 'Amazon', rev1y: 12.5, rev3y: 18.4, rev5y: 22.8, qoq: 4.2, yoy: 12.5, sector: 'Consumer' },
  { symbol: 'MSFT', name: 'Microsoft', rev1y: 15.8, rev3y: 14.2, rev5y: 16.4, qoq: 5.8, yoy: 15.8, sector: 'Tech' },
  { symbol: 'AAPL', name: 'Apple', rev1y: 2.1, rev3y: 8.2, rev5y: 10.4, qoq: -1.2, yoy: 2.1, sector: 'Tech' },
  { symbol: 'GOOGL', name: 'Alphabet', rev1y: 13.5, rev3y: 18.2, rev5y: 20.1, qoq: 6.8, yoy: 13.5, sector: 'Tech' },
  { symbol: 'TSLA', name: 'Tesla', rev1y: -3.2, rev3y: 28.4, rev5y: 42.1, qoq: -8.4, yoy: -3.2, sector: 'Auto' },
  { symbol: 'CRM', name: 'Salesforce', rev1y: 11.2, rev3y: 18.4, rev5y: 22.4, qoq: 3.8, yoy: 11.2, sector: 'Tech' },
];
export default function RevenueGrowthPage() {
  const avgYoy = STOCKS.reduce((s, st) => s + st.yoy, 0) / STOCKS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Revenue Growth</h1><p className="mt-1 text-sm text-gray-500">Year-over-year and multi-year revenue growth rates</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg YoY Growth</p><p className={cn('text-lg font-bold', avgYoy >= 0 ? 'text-green-400' : 'text-red-400')}>{avgYoy.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Accelerating</p><p className="text-lg font-bold text-green-400">{STOCKS.filter((s) => s.qoq > 0).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Decelerating</p><p className="text-lg font-bold text-red-400">{STOCKS.filter((s) => s.qoq < 0).length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-indigo-400" /> Growth Rates</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.yoy - a.yoy).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span><Badge variant="info">{s.sector}</Badge></div>
                <span className={cn('text-xs font-mono font-bold', s.yoy >= 0 ? 'text-green-400' : 'text-red-400')}>{s.yoy >= 0 ? '+' : ''}{s.yoy}%</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-[10px]">
                <span className="text-gray-400">QoQ: <span className={cn('font-mono', s.qoq >= 0 ? 'text-green-400' : 'text-red-400')}>{s.qoq >= 0 ? '+' : ''}{s.qoq}%</span></span>
                <span className="text-gray-400">1Y: <span className={cn('font-mono', s.rev1y >= 0 ? 'text-green-400' : 'text-red-400')}>{s.rev1y >= 0 ? '+' : ''}{s.rev1y}%</span></span>
                <span className="text-gray-400">3Y CAGR: <span className="font-mono text-white">{s.rev3y}%</span></span>
                <span className="text-gray-400">5Y CAGR: <span className="font-mono text-white">{s.rev5y}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
