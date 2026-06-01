'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Shuffle } from 'lucide-react';

interface SimResult {
  percentile: string;
  year5: number;
  year10: number;
  year20: number;
  year30: number;
}

const RESULTS: SimResult[] = [
  { percentile: '95th (Bull)', year5: 485200, year10: 985400, year20: 3245000, year30: 8920000 },
  { percentile: '75th', year5: 368400, year10: 628500, year20: 1625000, year30: 3480000 },
  { percentile: '50th (Median)', year5: 298500, year10: 462800, year20: 985400, year30: 1820000 },
  { percentile: '25th', year5: 242100, year10: 345200, year20: 618500, year30: 985000 },
  { percentile: '5th (Bear)', year5: 178400, year10: 218500, year20: 325400, year30: 428500 },
];

export default function MonteCarloPage() {
  const initial = 200000;
  const monthlyAdd = 2000;
  const simulations = 10000;
  const medianResult = RESULTS[2];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Monte Carlo Simulation</h1>
        <p className="mt-1 text-sm text-gray-500">{simulations.toLocaleString()} simulated portfolio outcomes</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Initial</p>
          <p className="text-lg font-bold text-white">{formatCurrency(initial)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Monthly Add</p>
          <p className="text-lg font-bold text-indigo-400">{formatCurrency(monthlyAdd)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Median 20Y</p>
          <p className="text-lg font-bold text-green-400">{formatCurrency(medianResult.year20)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Simulations</p>
          <p className="text-lg font-bold text-yellow-400">{(simulations / 1000).toFixed(0)}K</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shuffle className="h-4 w-4 text-indigo-400" /> Outcome Distribution
          </CardTitle>
        </CardHeader>
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 pb-1.5 border-b border-white/5">
            <span className="text-[10px] text-gray-500 w-28">Percentile</span>
            <span className="text-[10px] text-gray-500 w-20 text-right">5 Years</span>
            <span className="text-[10px] text-gray-500 w-20 text-right">10 Years</span>
            <span className="text-[10px] text-gray-500 w-20 text-right">20 Years</span>
            <span className="text-[10px] text-gray-500 w-20 text-right">30 Years</span>
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {RESULTS.map((r) => {
            const isMedian = r.percentile.includes('Median');
            return (
              <div key={r.percentile} className={cn('flex items-center gap-2 py-2 px-4', isMedian && 'bg-indigo-500/5')}>
                <span className={cn('text-xs w-28', isMedian ? 'font-bold text-indigo-400' : 'text-gray-400')}>{r.percentile}</span>
                <span className="text-xs font-mono text-white w-20 text-right">{formatCurrency(r.year5)}</span>
                <span className="text-xs font-mono text-white w-20 text-right">{formatCurrency(r.year10)}</span>
                <span className="text-xs font-mono text-green-400 w-20 text-right">{formatCurrency(r.year20)}</span>
                <span className="text-xs font-mono text-green-400 w-20 text-right">{formatCurrency(r.year30)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
