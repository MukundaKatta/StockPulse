'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Receipt } from 'lucide-react';

interface AfterTaxReturn {
  account: string;
  preTaxReturn: number;
  taxRate: number;
  afterTaxReturn: number;
  taxDrag: number;
  strategy: 'Tax-Loss Harvesting' | 'Buy & Hold' | 'Active Trading';
  status: 'Optimized' | 'Needs Review' | 'At Risk';
}

const RETURNS: AfterTaxReturn[] = [
  { account: 'Growth Portfolio', preTaxReturn: 18500, taxRate: 22, afterTaxReturn: 14430, taxDrag: 4070, strategy: 'Tax-Loss Harvesting', status: 'Optimized' },
  { account: 'Income Portfolio', preTaxReturn: 12200, taxRate: 32, afterTaxReturn: 8296, taxDrag: 3904, strategy: 'Buy & Hold', status: 'Needs Review' },
  { account: 'Dividend Fund', preTaxReturn: 8750, taxRate: 15, afterTaxReturn: 7438, taxDrag: 1312, strategy: 'Buy & Hold', status: 'Optimized' },
  { account: 'Active Trading', preTaxReturn: 22400, taxRate: 37, afterTaxReturn: 14112, taxDrag: 8288, strategy: 'Active Trading', status: 'At Risk' },
  { account: 'Index Fund', preTaxReturn: 15600, taxRate: 18, afterTaxReturn: 12792, taxDrag: 2808, strategy: 'Buy & Hold', status: 'Optimized' },
  { account: 'Small Cap Fund', preTaxReturn: 19800, taxRate: 28, afterTaxReturn: 14256, taxDrag: 5544, strategy: 'Tax-Loss Harvesting', status: 'Needs Review' },
  { account: 'Bond Portfolio', preTaxReturn: 5400, taxRate: 32, afterTaxReturn: 3672, taxDrag: 1728, strategy: 'Buy & Hold', status: 'Optimized' },
];

const statusVariant = (s: string) => s === 'Optimized' ? 'success' : s === 'At Risk' ? 'danger' : 'warning';

export default function AfterTaxReturnsPage() {
  const totalPreTax = RETURNS.reduce((s, r) => s + r.preTaxReturn, 0);
  const totalAfterTax = RETURNS.reduce((s, r) => s + r.afterTaxReturn, 0);
  const totalDrag = RETURNS.reduce((s, r) => s + r.taxDrag, 0);
  const avgTaxRate = RETURNS.reduce((s, r) => s + r.taxRate, 0) / RETURNS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">After-Tax Returns</h1>
        <p className="mt-1 text-sm text-gray-500">Post-tax investment returns analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Pre-Tax Total</p><p className="text-lg font-bold text-white">{formatCurrency(totalPreTax)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">After-Tax Total</p><p className="text-lg font-bold text-green-400">{formatCurrency(totalAfterTax)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Tax Drag</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalDrag)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Tax Rate</p><p className="text-lg font-bold text-indigo-400">{avgTaxRate.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Receipt className="h-4 w-4 text-indigo-400" /> After-Tax Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {RETURNS.map((r) => (
            <div key={r.account} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{r.account}</p>
                <p className="text-xs text-gray-500">{r.strategy} &middot; {r.taxRate}% rate</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(r.afterTaxReturn)}</p>
                  <p className={cn('text-[10px] font-mono', 'text-red-400')}>-{formatCurrency(r.taxDrag)} drag</p>
                </div>
                <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
