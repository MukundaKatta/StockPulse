'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ShieldAlert } from 'lucide-react';

interface RiskBudgetItem {
  asset: string;
  allocation: number;
  riskContribution: number;
  budgetUsed: number;
  limit: number;
  status: 'within' | 'warning' | 'exceeded';
}

const mockData: RiskBudgetItem[] = [
  { asset: 'US Large Cap', allocation: 35, riskContribution: 28.4, budgetUsed: 81, limit: 35, status: 'within' },
  { asset: 'US Small Cap', allocation: 15, riskContribution: 18.2, budgetUsed: 91, limit: 20, status: 'warning' },
  { asset: 'International Equity', allocation: 20, riskContribution: 24.6, budgetUsed: 102, limit: 24, status: 'exceeded' },
  { asset: 'Emerging Markets', allocation: 10, riskContribution: 16.8, budgetUsed: 84, limit: 20, status: 'within' },
  { asset: 'Fixed Income', allocation: 15, riskContribution: 8.2, budgetUsed: 41, limit: 20, status: 'within' },
  { asset: 'Alternatives', allocation: 5, riskContribution: 3.8, budgetUsed: 63, limit: 6, status: 'within' },
];

const summaryCards = [
  { label: 'Total Risk Budget', value: '12.5%', sub: 'Annualized VaR' },
  { label: 'Budget Utilized', value: '84.2%', sub: '+2.1% this week' },
  { label: 'Tracking Error', value: '3.8%', sub: 'vs benchmark' },
  { label: 'Risk Efficiency', value: '0.92', sub: 'Return per unit risk' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  within: 'success', warning: 'warning', exceeded: 'danger',
};

export default function RiskBudgetPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Risk Budget Framework</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor and manage risk allocation across asset classes</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summaryCards.map((c) => (
          <Card key={c.label}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="mt-1 text-lg font-bold text-white">{c.value}</p>
            <p className="text-[11px] text-gray-600">{c.sub}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Budget Allocation</CardTitle>
          <ShieldAlert className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((item) => (
            <div key={item.asset} className={cn('flex items-center justify-between rounded-lg border border-white/[0.06] p-3')}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{item.asset}</p>
                  <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Alloc: {item.allocation}% | Risk Contrib: {item.riskContribution}% | Limit: {item.limit}%
                </p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-semibold', item.budgetUsed > 100 ? 'text-red-400' : item.budgetUsed > 85 ? 'text-amber-400' : 'text-green-400')}>
                  {item.budgetUsed}%
                </p>
                <p className="text-[10px] text-gray-600">budget used</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
