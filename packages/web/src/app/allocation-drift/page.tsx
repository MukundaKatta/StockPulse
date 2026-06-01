'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { GitBranch } from 'lucide-react';

interface AllocationDrift {
  assetClass: string;
  targetPct: number;
  currentPct: number;
  driftPct: number;
  currentValue: number;
  rebalanceAction: 'Buy' | 'Sell' | 'Hold';
  severity: 'Low' | 'Medium' | 'High';
}

const DRIFTS: AllocationDrift[] = [
  { assetClass: 'US Large Cap', targetPct: 40, currentPct: 46.2, driftPct: 6.2, currentValue: 184800, rebalanceAction: 'Sell', severity: 'High' },
  { assetClass: 'International Equity', targetPct: 20, currentPct: 16.5, driftPct: -3.5, currentValue: 66000, rebalanceAction: 'Buy', severity: 'Medium' },
  { assetClass: 'US Small Cap', targetPct: 10, currentPct: 11.8, driftPct: 1.8, currentValue: 47200, rebalanceAction: 'Sell', severity: 'Low' },
  { assetClass: 'Fixed Income', targetPct: 15, currentPct: 12.1, driftPct: -2.9, currentValue: 48400, rebalanceAction: 'Buy', severity: 'Medium' },
  { assetClass: 'REITs', targetPct: 5, currentPct: 4.2, driftPct: -0.8, currentValue: 16800, rebalanceAction: 'Buy', severity: 'Low' },
  { assetClass: 'Commodities', targetPct: 5, currentPct: 3.8, driftPct: -1.2, currentValue: 15200, rebalanceAction: 'Buy', severity: 'Low' },
  { assetClass: 'Cash', targetPct: 5, currentPct: 5.4, driftPct: 0.4, currentValue: 21600, rebalanceAction: 'Hold', severity: 'Low' },
];

const sevVariant = (s: string) => s === 'Low' ? 'success' : s === 'High' ? 'danger' : 'warning';

export default function AllocationDriftPage() {
  const totalValue = DRIFTS.reduce((s, d) => s + d.currentValue, 0);
  const maxDrift = Math.max(...DRIFTS.map(d => Math.abs(d.driftPct)));
  const avgDrift = DRIFTS.reduce((s, d) => s + Math.abs(d.driftPct), 0) / DRIFTS.length;
  const needsRebal = DRIFTS.filter(d => d.rebalanceAction !== 'Hold').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Allocation Drift</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio allocation drift from target</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Portfolio Value</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Max Drift</p><p className="text-lg font-bold text-red-400">{maxDrift.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Drift</p><p className="text-lg font-bold text-yellow-400">{avgDrift.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Needs Rebal</p><p className="text-lg font-bold text-indigo-400">{needsRebal}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><GitBranch className="h-4 w-4 text-indigo-400" /> Drift Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DRIFTS.map((d) => (
            <div key={d.assetClass} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{d.assetClass}</p>
                <p className="text-xs text-gray-500">Target {d.targetPct}% &middot; Current {d.currentPct}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', d.driftPct > 0 ? 'text-green-400' : d.driftPct < 0 ? 'text-red-400' : 'text-white')}>{d.driftPct > 0 ? '+' : ''}{d.driftPct.toFixed(1)}%</p>
                  <p className="text-[10px] text-gray-500">{formatCurrency(d.currentValue)}</p>
                </div>
                <Badge variant={sevVariant(d.severity)}>{d.rebalanceAction}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
