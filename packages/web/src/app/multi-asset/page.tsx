'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { PieChart } from 'lucide-react';

interface AssetAllocation {
  assetClass: string;
  allocation: number;
  currentValue: number;
  targetAllocation: number;
  ytdReturn: number;
  risk: string;
  status: 'On Target' | 'Overweight' | 'Underweight';
}

const ALLOCATIONS: AssetAllocation[] = [
  { assetClass: 'US Equities', allocation: 42, currentValue: 420000, targetAllocation: 40, ytdReturn: 14.2, risk: 'Medium', status: 'Overweight' },
  { assetClass: 'Intl Equities', allocation: 18, currentValue: 180000, targetAllocation: 20, ytdReturn: 8.5, risk: 'Medium', status: 'Underweight' },
  { assetClass: 'Fixed Income', allocation: 22, currentValue: 220000, targetAllocation: 25, ytdReturn: 2.8, risk: 'Low', status: 'Underweight' },
  { assetClass: 'Real Estate', allocation: 8, currentValue: 80000, targetAllocation: 7, ytdReturn: -1.5, risk: 'Medium', status: 'Overweight' },
  { assetClass: 'Commodities', allocation: 5, currentValue: 50000, targetAllocation: 5, ytdReturn: 6.2, risk: 'High', status: 'On Target' },
  { assetClass: 'Alternatives', allocation: 3, currentValue: 30000, targetAllocation: 3, ytdReturn: 4.8, risk: 'High', status: 'On Target' },
  { assetClass: 'Cash', allocation: 2, currentValue: 20000, targetAllocation: 0, ytdReturn: 5.2, risk: 'Low', status: 'Overweight' },
];

const statusVariant = (s: string) => s === 'On Target' ? 'success' : s === 'Overweight' ? 'warning' : 'info';

export default function MultiAssetPage() {
  const totalValue = ALLOCATIONS.reduce((s, a) => s + a.currentValue, 0);
  const weightedReturn = ALLOCATIONS.reduce((s, a) => s + (a.allocation / 100) * a.ytdReturn, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Multi-Asset Portfolio</h1>
        <p className="mt-1 text-sm text-gray-500">Cross-asset portfolio allocation and rebalancing</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Value</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Portfolio YTD</p><p className="text-lg font-bold text-green-400">{weightedReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Asset Classes</p><p className="text-lg font-bold text-indigo-400">{ALLOCATIONS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">On Target</p><p className="text-lg font-bold text-cyan-400">{ALLOCATIONS.filter(a => a.status === 'On Target').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PieChart className="h-4 w-4 text-indigo-400" /> Asset Allocation</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ALLOCATIONS.map((a) => (
            <div key={a.assetClass} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{a.assetClass}</p>
                <p className="text-[10px] text-gray-500">Target: {a.targetAllocation}%</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 w-10">{a.allocation}%</span>
              <span className="text-xs font-mono text-white w-20">{formatCurrency(a.currentValue)}</span>
              <span className={cn('text-xs font-mono w-12', a.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{a.ytdReturn >= 0 ? '+' : ''}{a.ytdReturn}%</span>
              <span className="text-[10px] text-gray-500 w-12">{a.risk}</span>
              <Badge variant={statusVariant(a.status)} className="ml-auto">{a.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
