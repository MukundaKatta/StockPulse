'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingDown } from 'lucide-react';

interface DrawdownEvent {
  period: string;
  peakDate: string;
  troughDate: string;
  recoveryDate: string;
  drawdown: number;
  recoveryDays: number;
  drawdownDays: number;
  status: 'recovered' | 'recovering' | 'new-low';
}

const mockData: DrawdownEvent[] = [
  { period: 'COVID Crash', peakDate: '2020-02-19', troughDate: '2020-03-23', recoveryDate: '2020-08-18', drawdown: -33.9, recoveryDays: 148, drawdownDays: 33, status: 'recovered' },
  { period: '2022 Bear Market', peakDate: '2022-01-03', troughDate: '2022-10-12', recoveryDate: '2024-01-19', drawdown: -25.4, recoveryDays: 464, drawdownDays: 282, status: 'recovered' },
  { period: 'Q3 2023 Pullback', peakDate: '2023-07-31', troughDate: '2023-10-27', recoveryDate: '2023-12-08', drawdown: -10.3, recoveryDays: 42, drawdownDays: 88, status: 'recovered' },
  { period: 'Current Drawdown', peakDate: '2024-01-02', troughDate: '2024-01-18', recoveryDate: '-', drawdown: -3.8, recoveryDays: 0, drawdownDays: 16, status: 'recovering' },
  { period: '2018 Q4 Selloff', peakDate: '2018-09-20', troughDate: '2018-12-24', recoveryDate: '2019-04-23', drawdown: -19.8, recoveryDays: 120, drawdownDays: 95, status: 'recovered' },
];

const summaryCards = [
  { label: 'Current Drawdown', value: '-3.8%', sub: 'From recent peak' },
  { label: 'Max Drawdown', value: '-33.9%', sub: 'COVID crash' },
  { label: 'Avg Recovery', value: '194 days', sub: 'Historical average' },
  { label: 'Win Rate', value: '100%', sub: 'All recoveries' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  recovered: 'success', recovering: 'warning', 'new-low': 'danger',
};

export default function DrawdownRecoveryPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Drawdown Recovery Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Track portfolio drawdowns and recovery timelines</p>
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
          <CardTitle>Drawdown Events</CardTitle>
          <TrendingDown className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((d) => (
            <div key={d.period} className="rounded-lg border border-white/[0.06] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{d.period}</p>
                  <Badge variant={statusVariant[d.status]}>{d.status}</Badge>
                </div>
                <p className={cn('text-sm font-semibold text-red-400')}>{d.drawdown}%</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Peak: {d.peakDate} | Trough: {d.troughDate} | Recovery: {d.recoveryDate}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Drawdown: {d.drawdownDays} days | Recovery: {d.recoveryDays > 0 ? `${d.recoveryDays} days` : 'In progress'}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
