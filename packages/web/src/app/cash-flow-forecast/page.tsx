'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface CashFlowItem {
  month: string;
  dividends: number;
  interest: number;
  options: number;
  deposits: number;
  withdrawals: number;
  netFlow: number;
  cumulative: number;
}

const mockData: CashFlowItem[] = [
  { month: 'Jan 2024', dividends: 1250, interest: 180, options: 450, deposits: 5000, withdrawals: -2000, netFlow: 4880, cumulative: 4880 },
  { month: 'Feb 2024', dividends: 850, interest: 185, options: 320, deposits: 5000, withdrawals: -2000, netFlow: 4355, cumulative: 9235 },
  { month: 'Mar 2024', dividends: 2100, interest: 190, options: 580, deposits: 5000, withdrawals: -2000, netFlow: 5870, cumulative: 15105 },
  { month: 'Apr 2024', dividends: 1100, interest: 195, options: 410, deposits: 5000, withdrawals: -2000, netFlow: 4705, cumulative: 19810 },
  { month: 'May 2024', dividends: 950, interest: 200, options: 350, deposits: 5000, withdrawals: -2000, netFlow: 4500, cumulative: 24310 },
  { month: 'Jun 2024', dividends: 2400, interest: 205, options: 620, deposits: 5000, withdrawals: -2000, netFlow: 6225, cumulative: 30535 },
];

const summaryCards = [
  { label: 'Net Cash Flow', value: '$30.5K', sub: 'YTD cumulative' },
  { label: 'Avg Monthly', value: '$5,089', sub: 'Net inflow' },
  { label: 'Dividend Income', value: '$8,650', sub: 'YTD total' },
  { label: 'Next Quarter', value: '$15.2K', sub: 'Projected inflow' },
];

export default function CashFlowForecastPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cash Flow Forecast</h1>
        <p className="mt-1 text-sm text-gray-500">Project portfolio cash flows from all income sources</p>
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
          <CardTitle>Monthly Cash Flows</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((f) => (
            <div key={f.month} className="rounded-lg border border-white/[0.06] p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">{f.month}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={f.netFlow >= 5000 ? 'success' : 'info'}>Net: ${f.netFlow.toLocaleString()}</Badge>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-2 text-xs">
                <div><span className="text-gray-500">Dividends</span><p className={cn('font-medium text-green-400')}>${f.dividends.toLocaleString()}</p></div>
                <div><span className="text-gray-500">Interest</span><p className="font-medium text-green-400">${f.interest}</p></div>
                <div><span className="text-gray-500">Options</span><p className="font-medium text-green-400">${f.options}</p></div>
                <div><span className="text-gray-500">Deposits</span><p className="font-medium text-blue-400">${f.deposits.toLocaleString()}</p></div>
                <div><span className="text-gray-500">Withdrawals</span><p className="font-medium text-red-400">-${Math.abs(f.withdrawals).toLocaleString()}</p></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
