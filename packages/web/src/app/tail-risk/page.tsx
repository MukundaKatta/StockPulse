'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { AlertTriangle } from 'lucide-react';

interface TailRiskMetric {
  name: string;
  value: number;
  threshold: number;
  unit: string;
  percentile: string;
  status: 'safe' | 'elevated' | 'critical';
}

const mockData: TailRiskMetric[] = [
  { name: 'VaR (99%)', value: -4.8, threshold: -5.0, unit: '%', percentile: '99th', status: 'elevated' },
  { name: 'CVaR / Expected Shortfall', value: -7.2, threshold: -8.0, unit: '%', percentile: '99th', status: 'elevated' },
  { name: 'Max Drawdown (1Y)', value: -12.4, threshold: -15.0, unit: '%', percentile: '95th', status: 'safe' },
  { name: 'Tail Ratio', value: 0.85, threshold: 0.70, unit: 'x', percentile: 'N/A', status: 'safe' },
  { name: 'Skewness', value: -0.42, threshold: -1.0, unit: '', percentile: 'N/A', status: 'safe' },
  { name: 'Kurtosis (Excess)', value: 3.8, threshold: 3.0, unit: '', percentile: 'N/A', status: 'elevated' },
  { name: 'Black Swan Index', value: 72, threshold: 80, unit: '/100', percentile: 'N/A', status: 'elevated' },
];

const summaryCards = [
  { label: 'VaR (99%)', value: '-4.8%', sub: '1-day portfolio VaR' },
  { label: 'Expected Shortfall', value: '-7.2%', sub: 'Avg loss beyond VaR' },
  { label: 'Tail Risk Score', value: '72/100', sub: 'Elevated risk' },
  { label: 'Black Swan Prob.', value: '2.3%', sub: '30-day horizon' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  safe: 'success', elevated: 'warning', critical: 'danger',
};

export default function TailRiskPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Tail Risk Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor extreme risk metrics and black swan indicators</p>
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
          <CardTitle>Tail Risk Metrics</CardTitle>
          <AlertTriangle className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((m) => (
            <div key={m.name} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{m.name}</p>
                  <Badge variant={statusVariant[m.status]}>{m.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Threshold: {m.threshold}{m.unit} | Percentile: {m.percentile}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', m.status === 'safe' ? 'text-green-400' : m.status === 'elevated' ? 'text-amber-400' : 'text-red-400')}>
                {m.value}{m.unit}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
