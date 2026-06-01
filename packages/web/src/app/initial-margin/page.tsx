'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

interface MarginRequirement {
  asset: string;
  type: 'Equity' | 'Options' | 'Futures' | 'Forex';
  position: number;
  marginRate: number;
  initialMargin: number;
  maintenanceMargin: number;
  excess: number;
  status: 'Adequate' | 'Warning' | 'Call';
}

const POSITIONS: MarginRequirement[] = [
  { asset: 'AAPL 100 shares', type: 'Equity', position: 19250, marginRate: 50, initialMargin: 9625, maintenanceMargin: 4812, excess: 4813, status: 'Adequate' },
  { asset: 'TSLA Jul 260 Call', type: 'Options', position: 12400, marginRate: 100, initialMargin: 12400, maintenanceMargin: 12400, excess: 0, status: 'Warning' },
  { asset: 'ES Jun Futures', type: 'Futures', position: 271025, marginRate: 5.2, initialMargin: 14093, maintenanceMargin: 12800, excess: 1293, status: 'Adequate' },
  { asset: 'EUR/USD 100K', type: 'Forex', position: 108500, marginRate: 2, initialMargin: 2170, maintenanceMargin: 1628, excess: 542, status: 'Adequate' },
  { asset: 'NVDA 200 shares', type: 'Equity', position: 27040, marginRate: 50, initialMargin: 13520, maintenanceMargin: 6760, excess: 2105, status: 'Warning' },
  { asset: 'SPY Jun 540 Put', type: 'Options', position: 8650, marginRate: 100, initialMargin: 8650, maintenanceMargin: 8650, excess: -1200, status: 'Call' },
  { asset: 'NQ Sep Futures', type: 'Futures', position: 385250, marginRate: 4.8, initialMargin: 18492, maintenanceMargin: 16800, excess: 1692, status: 'Adequate' },
];

const statusVariant = (s: string) => s === 'Adequate' ? 'success' : s === 'Warning' ? 'warning' : 'danger';

export default function InitialMarginPage() {
  const totalMargin = POSITIONS.reduce((s, p) => s + p.initialMargin, 0);
  const totalExcess = POSITIONS.reduce((s, p) => s + p.excess, 0);
  const callCount = POSITIONS.filter(p => p.status === 'Call').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Initial Margin</h1>
        <p className="mt-1 text-sm text-gray-500">Margin requirements and excess calculator</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Positions</p><p className="text-lg font-bold text-white">{POSITIONS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Margin</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(totalMargin)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Excess</p><p className="text-lg font-bold text-green-400">{formatCurrency(totalExcess)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Margin Calls</p><p className="text-lg font-bold text-red-400">{callCount}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> Margin Requirements</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {POSITIONS.map((p, i) => (
            <div key={i} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-32">
                <p className="text-xs font-bold text-white">{p.asset}</p>
                <p className="text-[10px] text-gray-500">{p.type} &middot; {p.marginRate}%</p>
              </div>
              <span className="text-xs font-mono text-white w-20">{formatCurrency(p.initialMargin)}</span>
              <span className="text-xs font-mono text-gray-400 w-20">{formatCurrency(p.maintenanceMargin)}</span>
              <span className={cn('text-xs font-mono w-16', p.excess >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(p.excess)}</span>
              <Badge variant={statusVariant(p.status)} className="ml-auto">{p.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
