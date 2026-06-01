'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Sliders } from 'lucide-react';

interface AllocationSlice {
  assetClass: string;
  currentWeight: number;
  targetWeight: number;
  drift: number;
  returnYTD: number;
  value: number;
  signal: 'Overweight' | 'Underweight' | 'Neutral';
}

const ALLOCATIONS: AllocationSlice[] = [
  { assetClass: 'US Large Cap', currentWeight: 35.2, targetWeight: 30.0, drift: 5.2, returnYTD: 12.4, value: 352000, signal: 'Overweight' },
  { assetClass: 'Int\'l Developed', currentWeight: 15.8, targetWeight: 20.0, drift: -4.2, returnYTD: 8.1, value: 158000, signal: 'Underweight' },
  { assetClass: 'Emerging Markets', currentWeight: 8.5, targetWeight: 10.0, drift: -1.5, returnYTD: 5.2, value: 85000, signal: 'Underweight' },
  { assetClass: 'US Bonds', currentWeight: 22.0, targetWeight: 20.0, drift: 2.0, returnYTD: 2.8, value: 220000, signal: 'Neutral' },
  { assetClass: 'TIPS', currentWeight: 5.5, targetWeight: 5.0, drift: 0.5, returnYTD: 1.5, value: 55000, signal: 'Neutral' },
  { assetClass: 'REITs', currentWeight: 6.0, targetWeight: 8.0, drift: -2.0, returnYTD: -3.2, value: 60000, signal: 'Underweight' },
  { assetClass: 'Commodities', currentWeight: 4.0, targetWeight: 5.0, drift: -1.0, returnYTD: 6.8, value: 40000, signal: 'Neutral' },
  { assetClass: 'Cash', currentWeight: 3.0, targetWeight: 2.0, drift: 1.0, returnYTD: 4.5, value: 30000, signal: 'Overweight' },
];

const signalVariant = (s: string) => s === 'Overweight' ? 'warning' : s === 'Underweight' ? 'danger' : 'success';

export default function DynamicAllocationPage() {
  const totalValue = ALLOCATIONS.reduce((s, a) => s + a.value, 0);
  const avgDrift = ALLOCATIONS.reduce((s, a) => s + Math.abs(a.drift), 0) / ALLOCATIONS.length;
  const wtdReturn = ALLOCATIONS.reduce((s, a) => s + a.returnYTD * (a.currentWeight / 100), 0);
  const needsRebalance = ALLOCATIONS.filter(a => Math.abs(a.drift) > 2).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dynamic Allocation</h1>
        <p className="mt-1 text-sm text-gray-500">Dynamic asset allocation with drift monitoring</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Portfolio</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Wtd Return YTD</p><p className="text-lg font-bold text-green-400">{wtdReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Drift</p><p className="text-lg font-bold text-amber-400">{avgDrift.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Rebalance</p><p className="text-lg font-bold text-red-400">{needsRebalance} needed</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Sliders className="h-4 w-4 text-indigo-400" /> Allocation Model</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ALLOCATIONS.map((a) => (
            <div key={a.assetClass} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{a.assetClass}</p>
                <p className="text-xs text-gray-500">Target {a.targetWeight}% &middot; Current {a.currentWeight}% &middot; YTD {a.returnYTD >= 0 ? '+' : ''}{a.returnYTD}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(a.value)}</p>
                  <p className={cn('text-[10px] font-mono', a.drift >= 0 ? 'text-amber-400' : 'text-red-400')}>{a.drift >= 0 ? '+' : ''}{a.drift}% drift</p>
                </div>
                <Badge variant={signalVariant(a.signal)}>{a.signal}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
