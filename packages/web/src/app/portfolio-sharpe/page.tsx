'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface SharpeData { period: string; returnPct: number; riskFree: number; stdDev: number; sharpe: number; rating: string; }
const PERIODS: SharpeData[] = [
  { period: '1 Month', returnPct: 2.4, riskFree: 0.44, stdDev: 3.2, sharpe: 0.61, rating: 'Below Avg' },
  { period: '3 Months', returnPct: 8.2, riskFree: 1.32, stdDev: 5.8, sharpe: 1.19, rating: 'Good' },
  { period: '6 Months', returnPct: 14.8, riskFree: 2.64, stdDev: 8.4, sharpe: 1.45, rating: 'Good' },
  { period: 'YTD', returnPct: 18.2, riskFree: 3.52, stdDev: 11.2, sharpe: 1.31, rating: 'Good' },
  { period: '1 Year', returnPct: 22.4, riskFree: 5.28, stdDev: 14.8, sharpe: 1.16, rating: 'Good' },
  { period: '3 Years', returnPct: 42.8, riskFree: 12.4, stdDev: 22.4, sharpe: 1.36, rating: 'Good' },
  { period: '5 Years', returnPct: 68.4, riskFree: 18.2, stdDev: 28.8, sharpe: 1.74, rating: 'Excellent' },
];

export default function PortfolioSharpePage() {
  const avg = PERIODS.reduce((s, p) => s + p.sharpe, 0) / PERIODS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sharpe Ratio</h1><p className="mt-1 text-sm text-gray-500">Risk-adjusted return analysis across time periods</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Sharpe</p><p className="text-lg font-bold text-indigo-400">{avg.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Best Period</p><p className="text-lg font-bold text-green-400">5Y</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Risk-Free</p><p className="text-lg font-bold text-gray-400">5.28%</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-indigo-400" /> Sharpe by Period</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PERIODS.map((p) => (
            <div key={p.period} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{p.period}</span>
                <Badge variant={p.rating === 'Excellent' ? 'success' : p.rating === 'Good' ? 'info' : 'warning'}>{p.rating}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Ret: {p.returnPct.toFixed(1)}%</span>
                <span className="text-[10px] text-gray-500">StdDev: {p.stdDev.toFixed(1)}%</span>
                <span className={cn('text-sm font-bold font-mono', p.sharpe > 1.5 ? 'text-green-400' : p.sharpe > 1 ? 'text-indigo-400' : 'text-amber-400')}>{p.sharpe.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
