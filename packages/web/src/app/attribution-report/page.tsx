'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Award } from 'lucide-react';

interface AttributionSector {
  sector: string;
  portfolioWeight: number;
  benchmarkWeight: number;
  portfolioReturn: number;
  benchmarkReturn: number;
  allocationEffect: number;
  selectionEffect: number;
  totalEffect: number;
}

const SECTORS: AttributionSector[] = [
  { sector: 'Technology', portfolioWeight: 35, benchmarkWeight: 30, portfolioReturn: 18.5, benchmarkReturn: 15.2, allocationEffect: 0.76, selectionEffect: 1.16, totalEffect: 1.92 },
  { sector: 'Healthcare', portfolioWeight: 12, benchmarkWeight: 13, portfolioReturn: 8.2, benchmarkReturn: 10.1, allocationEffect: 0.01, selectionEffect: -0.23, totalEffect: -0.22 },
  { sector: 'Financials', portfolioWeight: 14, benchmarkWeight: 13, portfolioReturn: 12.8, benchmarkReturn: 11.5, allocationEffect: 0.12, selectionEffect: 0.18, totalEffect: 0.30 },
  { sector: 'Consumer Disc.', portfolioWeight: 10, benchmarkWeight: 11, portfolioReturn: 14.2, benchmarkReturn: 12.0, allocationEffect: -0.01, selectionEffect: 0.22, totalEffect: 0.21 },
  { sector: 'Industrials', portfolioWeight: 8, benchmarkWeight: 9, portfolioReturn: 9.5, benchmarkReturn: 10.8, allocationEffect: 0.01, selectionEffect: -0.10, totalEffect: -0.09 },
  { sector: 'Energy', portfolioWeight: 5, benchmarkWeight: 4, portfolioReturn: -2.5, benchmarkReturn: -4.1, allocationEffect: -0.04, selectionEffect: 0.08, totalEffect: 0.04 },
  { sector: 'Other', portfolioWeight: 16, benchmarkWeight: 20, portfolioReturn: 7.0, benchmarkReturn: 7.5, allocationEffect: -0.03, selectionEffect: -0.08, totalEffect: -0.11 },
];

export default function AttributionReportPage() {
  const totalAlloc = SECTORS.reduce((s, sec) => s + sec.allocationEffect, 0);
  const totalSelection = SECTORS.reduce((s, sec) => s + sec.selectionEffect, 0);
  const totalEffect = SECTORS.reduce((s, sec) => s + sec.totalEffect, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Attribution Report</h1>
        <p className="mt-1 text-sm text-gray-500">Performance attribution by sector</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Allocation</p>
          <p className={cn('text-lg font-bold', totalAlloc >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalAlloc > 0 ? '+' : ''}{totalAlloc.toFixed(2)}%
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Selection</p>
          <p className={cn('text-lg font-bold', totalSelection >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalSelection > 0 ? '+' : ''}{totalSelection.toFixed(2)}%
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Active</p>
          <p className={cn('text-lg font-bold', totalEffect >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalEffect > 0 ? '+' : ''}{totalEffect.toFixed(2)}%
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Award className="inline h-4 w-4 mr-1" />Sector Attribution</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {SECTORS.map((sec) => (
            <div key={sec.sector} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{sec.sector}</p>
                <p className="text-xs text-gray-500">
                  Wt {sec.portfolioWeight}% vs {sec.benchmarkWeight}% &middot;
                  Ret {sec.portfolioReturn > 0 ? '+' : ''}{sec.portfolioReturn}% vs {sec.benchmarkReturn > 0 ? '+' : ''}{sec.benchmarkReturn}%
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', sec.totalEffect >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {sec.totalEffect > 0 ? '+' : ''}{sec.totalEffect.toFixed(2)}%
                  </p>
                  <p className="text-[10px] text-gray-500">
                    A: {sec.allocationEffect > 0 ? '+' : ''}{sec.allocationEffect.toFixed(2)} S: {sec.selectionEffect > 0 ? '+' : ''}{sec.selectionEffect.toFixed(2)}
                  </p>
                </div>
                <Badge variant={sec.totalEffect > 0.1 ? 'success' : sec.totalEffect < -0.1 ? 'danger' : 'default'}>
                  {sec.totalEffect > 0.1 ? 'Positive' : sec.totalEffect < -0.1 ? 'Negative' : 'Neutral'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
