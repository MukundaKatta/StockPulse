'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Calendar } from 'lucide-react';

interface AnnualData { year: number; startValue: number; endValue: number; returnPct: number; dividends: number; benchmark: number; alpha: number; }
const YEARS: AnnualData[] = [
  { year: 2024, startValue: 482000, endValue: 548000, returnPct: 13.7, dividends: 8420, benchmark: 10.2, alpha: 3.5 },
  { year: 2023, startValue: 392000, endValue: 482000, returnPct: 22.9, dividends: 7840, benchmark: 24.2, alpha: -1.3 },
  { year: 2022, startValue: 484000, endValue: 392000, returnPct: -19.0, dividends: 7200, benchmark: -19.4, alpha: 0.4 },
  { year: 2021, startValue: 368000, endValue: 484000, returnPct: 31.5, dividends: 6800, benchmark: 26.9, alpha: 4.6 },
  { year: 2020, startValue: 298000, endValue: 368000, returnPct: 23.5, dividends: 5840, benchmark: 16.3, alpha: 7.2 },
  { year: 2019, startValue: 242000, endValue: 298000, returnPct: 23.1, dividends: 5200, benchmark: 28.9, alpha: -5.8 },
];

export default function AnnualSummaryPage() {
  const totalReturn = YEARS.reduce((s, y) => s + y.returnPct, 0);
  const avgAlpha = YEARS.reduce((s, y) => s + y.alpha, 0) / YEARS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Annual Summary</h1><p className="mt-1 text-sm text-gray-500">Year-by-year portfolio performance overview</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Cumulative</p><p className="text-lg font-bold text-green-400">{totalReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Alpha</p><p className={cn('text-lg font-bold', avgAlpha > 0 ? 'text-green-400' : 'text-red-400')}>{avgAlpha > 0 ? '+' : ''}{avgAlpha.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Years</p><p className="text-lg font-bold text-indigo-400">{YEARS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-indigo-400" /> Annual Performance</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {YEARS.map((y) => (
            <div key={y.year} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{y.year}</span>
                <Badge variant={y.returnPct > 0 ? 'success' : 'danger'}>{y.returnPct > 0 ? 'Gain' : 'Loss'}</Badge>
                {y.alpha > 0 && <Badge variant="info">Alpha</Badge>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Div: ${y.dividends.toLocaleString()}</span>
                <span className="text-[10px] text-gray-500">Bench: {y.benchmark > 0 ? '+' : ''}{y.benchmark}%</span>
                <span className={cn('text-sm font-bold font-mono', y.returnPct > 0 ? 'text-green-400' : 'text-red-400')}>{y.returnPct > 0 ? '+' : ''}{y.returnPct.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
