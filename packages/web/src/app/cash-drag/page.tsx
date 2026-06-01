'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Banknote } from 'lucide-react';

interface CashDragEntry {
  account: string;
  totalValue: number;
  cashBalance: number;
  cashPct: number;
  opportunityCost: number;
  recommendation: string;
  severity: 'Low' | 'Medium' | 'High';
}

const ACCOUNTS: CashDragEntry[] = [
  { account: 'Growth IRA', totalValue: 285000, cashBalance: 42750, cashPct: 15.0, opportunityCost: 4282, recommendation: 'Deploy into equities', severity: 'High' },
  { account: 'Taxable Brokerage', totalValue: 520000, cashBalance: 26000, cashPct: 5.0, opportunityCost: 2604, recommendation: 'Within target range', severity: 'Low' },
  { account: 'Roth IRA', totalValue: 145000, cashBalance: 14500, cashPct: 10.0, opportunityCost: 1452, recommendation: 'Consider bond allocation', severity: 'Medium' },
  { account: '401(k)', totalValue: 380000, cashBalance: 7600, cashPct: 2.0, opportunityCost: 761, recommendation: 'Optimal allocation', severity: 'Low' },
  { account: 'HSA Investment', totalValue: 42000, cashBalance: 8400, cashPct: 20.0, opportunityCost: 841, recommendation: 'Significant cash drag', severity: 'High' },
  { account: 'Joint Account', totalValue: 195000, cashBalance: 15600, cashPct: 8.0, opportunityCost: 1562, recommendation: 'Slightly above target', severity: 'Medium' },
];

const sevVariant = (s: string) => s === 'Low' ? 'success' : s === 'High' ? 'danger' : 'warning';

export default function CashDragPage() {
  const totalValue = ACCOUNTS.reduce((s, a) => s + a.totalValue, 0);
  const totalCash = ACCOUNTS.reduce((s, a) => s + a.cashBalance, 0);
  const totalOpCost = ACCOUNTS.reduce((s, a) => s + a.opportunityCost, 0);
  const avgCashPct = (totalCash / totalValue) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cash Drag Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio cash drag analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Cash</p><p className="text-lg font-bold text-white">{formatCurrency(totalCash)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Cash %</p><p className="text-lg font-bold text-yellow-400">{avgCashPct.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Opportunity Cost</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalOpCost)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Accounts</p><p className="text-lg font-bold text-indigo-400">{ACCOUNTS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Banknote className="h-4 w-4 text-indigo-400" /> Cash Drag by Account</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ACCOUNTS.map((a) => (
            <div key={a.account} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{a.account}</p>
                <p className="text-xs text-gray-500">{a.recommendation}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(a.cashBalance)} ({a.cashPct}%)</p>
                  <p className="text-[10px] text-red-400">-{formatCurrency(a.opportunityCost)}/yr drag</p>
                </div>
                <Badge variant={sevVariant(a.severity)}>{a.severity}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
