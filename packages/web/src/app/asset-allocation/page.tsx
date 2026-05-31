'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, cn } from '@/lib/formatters';
import { PieChart } from 'lucide-react';

interface AssetClass {
  name: string;
  target: number;
  actual: number;
  value: number;
  color: string;
}

const ALLOCATIONS: AssetClass[] = [
  { name: 'US Large Cap', target: 35, actual: 40, value: 200000, color: 'bg-indigo-500' },
  { name: 'US Mid Cap', target: 10, actual: 8, value: 40000, color: 'bg-blue-500' },
  { name: 'US Small Cap', target: 5, actual: 4, value: 20000, color: 'bg-cyan-500' },
  { name: 'International Developed', target: 15, actual: 12, value: 60000, color: 'bg-green-500' },
  { name: 'Emerging Markets', target: 5, actual: 6, value: 30000, color: 'bg-emerald-500' },
  { name: 'US Bonds', target: 15, actual: 18, value: 90000, color: 'bg-yellow-500' },
  { name: 'International Bonds', target: 5, actual: 3, value: 15000, color: 'bg-orange-500' },
  { name: 'REITs', target: 5, actual: 4, value: 20000, color: 'bg-red-500' },
  { name: 'Commodities', target: 3, actual: 3, value: 15000, color: 'bg-purple-500' },
  { name: 'Cash', target: 2, actual: 2, value: 10000, color: 'bg-gray-500' },
];

export default function AssetAllocationPage() {
  const totalValue = ALLOCATIONS.reduce((s, a) => s + a.value, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Asset Allocation</h1>
        <p className="mt-1 text-sm text-gray-500">Target vs actual portfolio allocation</p>
      </div>

      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-2">Current Allocation</p>
        <div className="h-6 rounded-full overflow-hidden flex">
          {ALLOCATIONS.map((a) => (
            <div key={a.name} className={cn('h-full', a.color)} style={{ width: `${a.actual}%`, opacity: 0.7 }} title={`${a.name}: ${a.actual}%`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
          {ALLOCATIONS.map((a) => (
            <div key={a.name} className="flex items-center gap-1.5">
              <div className={cn('w-2 h-2 rounded-full', a.color)} />
              <span className="text-[10px] text-gray-500">{a.name} ({a.actual}%)</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PieChart className="h-4 w-4 text-indigo-400" /> Allocation Detail</CardTitle></CardHeader>
        <div className="space-y-3 px-2 pb-3">
          {ALLOCATIONS.map((a) => {
            const diff = a.actual - a.target;
            const rebalanceAmount = (diff / 100) * totalValue;
            return (
              <div key={a.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-2 h-2 rounded-full', a.color)} />
                    <span className="text-xs text-gray-300">{a.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-500">Target: {a.target}%</span>
                    <span className="text-white font-mono">{a.actual}%</span>
                    <span className={cn('font-mono', diff > 0 ? 'text-red-400' : diff < 0 ? 'text-green-400' : 'text-gray-500')}>
                      {diff > 0 ? '+' : ''}{diff}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={cn('h-full rounded-full', a.color)} style={{ width: `${(a.actual / Math.max(a.target, a.actual)) * 100}%`, opacity: 0.6 }} />
                  </div>
                </div>
                {Math.abs(diff) >= 2 && (
                  <p className="text-[10px] text-gray-600">
                    {diff > 0 ? 'Sell' : 'Buy'} {formatCurrency(Math.abs(rebalanceAmount))} to rebalance
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
