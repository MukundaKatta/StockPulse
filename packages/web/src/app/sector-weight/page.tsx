'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { PieChart } from 'lucide-react';

interface SectorAlloc {
  sector: string;
  weight: number;
  benchmark: number;
  holdings: number;
  performance: number;
  color: string;
}

const SECTORS: SectorAlloc[] = [
  { sector: 'Technology', weight: 42.5, benchmark: 31.2, holdings: 8, performance: 18.4, color: 'bg-indigo-500' },
  { sector: 'Healthcare', weight: 12.8, benchmark: 12.5, holdings: 4, performance: 5.2, color: 'bg-emerald-500' },
  { sector: 'Financials', weight: 11.2, benchmark: 12.8, holdings: 5, performance: 12.1, color: 'bg-blue-500' },
  { sector: 'Consumer Disc.', weight: 9.4, benchmark: 10.5, holdings: 3, performance: 8.7, color: 'bg-amber-500' },
  { sector: 'Communication', weight: 7.8, benchmark: 8.9, holdings: 2, performance: 22.3, color: 'bg-violet-500' },
  { sector: 'Industrials', weight: 5.6, benchmark: 8.7, holdings: 3, performance: 6.8, color: 'bg-cyan-500' },
  { sector: 'Energy', weight: 4.2, benchmark: 4.1, holdings: 2, performance: -3.4, color: 'bg-orange-500' },
  { sector: 'Real Estate', weight: 3.1, benchmark: 2.5, holdings: 2, performance: 1.9, color: 'bg-pink-500' },
  { sector: 'Utilities', weight: 2.0, benchmark: 2.4, holdings: 1, performance: 4.1, color: 'bg-teal-500' },
  { sector: 'Materials', weight: 1.4, benchmark: 2.6, holdings: 1, performance: -1.2, color: 'bg-lime-500' },
];

export default function SectorWeightPage() {
  const maxWeight = Math.max(...SECTORS.map((s) => Math.max(s.weight, s.benchmark)));
  const totalHoldings = SECTORS.reduce((s, sec) => s + sec.holdings, 0);
  const overweight = SECTORS.filter((s) => s.weight > s.benchmark + 2);
  const underweight = SECTORS.filter((s) => s.weight < s.benchmark - 2);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Weights</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio allocation vs S&P 500 benchmark</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Holdings</p><p className="text-lg font-bold text-white">{totalHoldings}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Overweight</p><p className="text-lg font-bold text-amber-400">{overweight.length} sectors</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Underweight</p><p className="text-lg font-bold text-blue-400">{underweight.length} sectors</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PieChart className="h-4 w-4 text-indigo-400" /> Allocation Comparison</CardTitle></CardHeader>
        <div className="space-y-3 p-4">
          {SECTORS.map((s) => {
            const diff = s.weight - s.benchmark;
            return (
              <div key={s.sector} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', s.color)} />
                    <span className="text-xs text-white">{s.sector}</span>
                    <span className="text-[10px] text-gray-500">{s.holdings} holdings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn('text-[10px] font-mono', s.performance >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {s.performance >= 0 ? '+' : ''}{s.performance.toFixed(1)}%
                    </span>
                    <span className={cn('text-[10px] font-mono w-16 text-right', diff > 2 ? 'text-amber-400' : diff < -2 ? 'text-blue-400' : 'text-gray-400')}>
                      {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="relative h-3 rounded bg-white/5">
                  <div className={cn('absolute inset-y-0 left-0 rounded', s.color, 'opacity-80')} style={{ width: `${(s.weight / maxWeight) * 100}%` }} />
                  <div className="absolute inset-y-0 left-0 rounded border border-dashed border-gray-500 opacity-50" style={{ width: `${(s.benchmark / maxWeight) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[9px] text-gray-500">
                  <span>Portfolio: {s.weight.toFixed(1)}%</span>
                  <span>Benchmark: {s.benchmark.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
