'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Landmark } from 'lucide-react';

interface WithdrawalYear {
  year: number;
  age: number;
  startBalance: number;
  withdrawal: number;
  rate: number;
  growth: number;
  endBalance: number;
  status: 'safe' | 'caution' | 'risk';
}

const mockData: WithdrawalYear[] = [
  { year: 2024, age: 65, startBalance: 1200000, withdrawal: 48000, rate: 4.0, growth: 72000, endBalance: 1224000, status: 'safe' },
  { year: 2025, age: 66, startBalance: 1224000, withdrawal: 49440, rate: 4.04, growth: 70500, endBalance: 1245060, status: 'safe' },
  { year: 2026, age: 67, startBalance: 1245060, withdrawal: 50923, rate: 4.09, growth: 68400, endBalance: 1262537, status: 'safe' },
  { year: 2027, age: 68, startBalance: 1262537, withdrawal: 52451, rate: 4.15, growth: 65200, endBalance: 1275286, status: 'safe' },
  { year: 2028, age: 69, startBalance: 1275286, withdrawal: 54024, rate: 4.24, growth: 58000, endBalance: 1279262, status: 'caution' },
  { year: 2029, age: 70, startBalance: 1279262, withdrawal: 55645, rate: 4.35, growth: 51000, endBalance: 1274617, status: 'caution' },
];

const summaryCards = [
  { label: 'Current Balance', value: '$1.2M', sub: 'Portfolio value' },
  { label: 'Withdrawal Rate', value: '4.0%', sub: 'Initial rate' },
  { label: 'Annual Withdrawal', value: '$48,000', sub: '$4,000/month' },
  { label: 'Longevity', value: '32 yrs', sub: 'Projected to age 97' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  safe: 'success', caution: 'warning', risk: 'danger',
};

export default function WithdrawalPlannerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Withdrawal Planner</h1>
        <p className="mt-1 text-sm text-gray-500">Plan retirement withdrawals with sustainable spending rates</p>
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
          <CardTitle>Withdrawal Projections</CardTitle>
          <Landmark className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((y) => (
            <div key={y.year} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{y.year} (Age {y.age})</p>
                  <Badge variant={statusVariant[y.status]}>{y.rate.toFixed(1)}% rate</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Withdraw: ${y.withdrawal.toLocaleString()} | Growth: ${y.growth.toLocaleString()} | End: ${y.endBalance.toLocaleString()}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', y.endBalance >= y.startBalance ? 'text-green-400' : 'text-amber-400')}>
                ${(y.endBalance / 1000).toFixed(0)}K
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
