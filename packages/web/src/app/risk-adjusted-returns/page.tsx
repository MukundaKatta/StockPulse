'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface RiskAdjustedMetric {
  name: string;
  totalReturn: number;
  volatility: number;
  sharpe: number;
  sortino: number;
  calmar: number;
  maxDrawdown: number;
  grade: 'A' | 'B' | 'C' | 'D';
}

const mockData: RiskAdjustedMetric[] = [
  { name: 'Your Portfolio', totalReturn: 18.5, volatility: 14.2, sharpe: 1.30, sortino: 1.85, calmar: 1.49, maxDrawdown: -12.4, grade: 'A' },
  { name: 'S&P 500', totalReturn: 22.1, volatility: 16.8, sharpe: 1.32, sortino: 1.72, calmar: 1.21, maxDrawdown: -18.2, grade: 'A' },
  { name: '60/40 Portfolio', totalReturn: 12.5, volatility: 10.2, sharpe: 1.23, sortino: 1.65, calmar: 1.04, maxDrawdown: -12.0, grade: 'B' },
  { name: 'All-Weather', totalReturn: 10.8, volatility: 8.5, sharpe: 1.27, sortino: 1.78, calmar: 1.35, maxDrawdown: -8.0, grade: 'A' },
  { name: 'Growth Tilt', totalReturn: 28.5, volatility: 22.4, sharpe: 1.27, sortino: 1.52, calmar: 0.95, maxDrawdown: -30.0, grade: 'B' },
  { name: 'Value Tilt', totalReturn: 14.2, volatility: 15.8, sharpe: 0.90, sortino: 1.15, calmar: 0.71, maxDrawdown: -20.0, grade: 'C' },
];

const summaryCards = [
  { label: 'Sharpe Ratio', value: '1.30', sub: 'Your portfolio' },
  { label: 'Sortino Ratio', value: '1.85', sub: 'Downside adjusted' },
  { label: 'Calmar Ratio', value: '1.49', sub: 'Return/drawdown' },
  { label: 'Risk Grade', value: 'A', sub: 'Top quartile' },
];

const gradeVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
  A: 'success', B: 'info', C: 'warning', D: 'danger',
};

export default function RiskAdjustedReturnsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Risk-Adjusted Performance</h1>
        <p className="mt-1 text-sm text-gray-500">Evaluate returns after accounting for risk taken</p>
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
          <CardTitle>Risk-Adjusted Metrics</CardTitle>
          <BarChart3 className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((m) => (
            <div key={m.name} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{m.name}</p>
                  <Badge variant={gradeVariant[m.grade]}>Grade {m.grade}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Return: +{m.totalReturn}% | Vol: {m.volatility}% | Sharpe: {m.sharpe} | Sortino: {m.sortino} | DD: {m.maxDrawdown}%
                </p>
              </div>
              <p className={cn('text-sm font-semibold', m.calmar >= 1.2 ? 'text-green-400' : m.calmar >= 0.8 ? 'text-amber-400' : 'text-red-400')}>
                {m.calmar.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
