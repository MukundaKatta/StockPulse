'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { FileText } from 'lucide-react';

interface QuarterData { quarter: string; portfolioReturn: number; benchmark: number; topHolding: string; worstHolding: string; trades: number; turnover: number; }
const QUARTERS: QuarterData[] = [
  { quarter: 'Q1 2024', portfolioReturn: 12.4, benchmark: 10.2, topHolding: 'NVDA (+48%)', worstHolding: 'INTC (-12%)', trades: 18, turnover: 8.2 },
  { quarter: 'Q4 2023', portfolioReturn: 8.8, benchmark: 11.2, topHolding: 'META (+22%)', worstHolding: 'BABA (-8%)', trades: 14, turnover: 6.4 },
  { quarter: 'Q3 2023', portfolioReturn: -2.4, benchmark: -3.6, topHolding: 'AAPL (+4%)', worstHolding: 'TSLA (-18%)', trades: 22, turnover: 12.8 },
  { quarter: 'Q2 2023', portfolioReturn: 6.2, benchmark: 8.4, topHolding: 'NVDA (+52%)', worstHolding: 'DIS (-14%)', trades: 16, turnover: 7.8 },
  { quarter: 'Q1 2023', portfolioReturn: 10.8, benchmark: 7.4, topHolding: 'META (+76%)', worstHolding: 'PYPL (-4%)', trades: 12, turnover: 5.2 },
];

export default function QuarterlyReviewPage() {
  const avgReturn = QUARTERS.reduce((s, q) => s + q.portfolioReturn, 0) / QUARTERS.length;
  const beatBench = QUARTERS.filter((q) => q.portfolioReturn > q.benchmark).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Quarterly Review</h1><p className="mt-1 text-sm text-gray-500">Quarter-by-quarter portfolio holdings review</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Quarterly</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Beat Benchmark</p><p className="text-lg font-bold text-indigo-400">{beatBench}/{QUARTERS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Latest</p><p className={cn('text-lg font-bold', QUARTERS[0].portfolioReturn > 0 ? 'text-green-400' : 'text-red-400')}>{QUARTERS[0].portfolioReturn > 0 ? '+' : ''}{QUARTERS[0].portfolioReturn}%</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-indigo-400" /> Quarterly Performance</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {QUARTERS.map((q) => (
            <div key={q.quarter} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{q.quarter}</span>
                  <Badge variant={q.portfolioReturn > q.benchmark ? 'success' : 'warning'}>{q.portfolioReturn > q.benchmark ? 'Outperform' : 'Underperform'}</Badge>
                </div>
                <span className={cn('text-sm font-bold font-mono', q.portfolioReturn > 0 ? 'text-green-400' : 'text-red-400')}>{q.portfolioReturn > 0 ? '+' : ''}{q.portfolioReturn}%</span>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>Best: <span className="text-green-400">{q.topHolding}</span></span>
                <span>Worst: <span className="text-red-400">{q.worstHolding}</span></span>
                <span className="ml-auto">{q.trades} trades</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
