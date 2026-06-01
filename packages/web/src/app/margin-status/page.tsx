'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ShieldCheck } from 'lucide-react';

interface MarginAccount {
  label: string;
  value: number;
  format: 'currency' | 'percent' | 'ratio';
  status: 'healthy' | 'caution' | 'warning' | 'danger';
  description: string;
}

const mockData: MarginAccount[] = [
  { label: 'Account Equity', value: 285000, format: 'currency', status: 'healthy', description: 'Total account value minus margin debt' },
  { label: 'Margin Used', value: 142500, format: 'currency', status: 'caution', description: 'Current borrowed amount' },
  { label: 'Margin Available', value: 142500, format: 'currency', status: 'healthy', description: 'Remaining borrowing capacity' },
  { label: 'Margin Ratio', value: 50.0, format: 'percent', status: 'caution', description: 'Margin used as % of equity' },
  { label: 'Maintenance Margin', value: 25.0, format: 'percent', status: 'healthy', description: 'Minimum required margin' },
  { label: 'Margin Call Level', value: 71250, format: 'currency', status: 'healthy', description: 'Equity level triggering margin call' },
  { label: 'Cushion', value: 213750, format: 'currency', status: 'healthy', description: 'Buffer above margin call' },
  { label: 'Leverage Ratio', value: 1.5, format: 'ratio', status: 'caution', description: 'Total exposure / equity' },
];

const summaryCards = [
  { label: 'Account Equity', value: '$285.0K', sub: 'Net liquidation' },
  { label: 'Margin Used', value: '$142.5K', sub: '50% of equity' },
  { label: 'Margin Call At', value: '$71.3K', sub: '75% cushion' },
  { label: 'Interest Rate', value: '6.83%', sub: 'Annual margin rate' },
];

const statusVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
  healthy: 'success', caution: 'info', warning: 'warning', danger: 'danger',
};

export default function MarginStatusPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Margin Account Status</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor margin utilization and maintenance requirements</p>
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
          <CardTitle>Margin Details</CardTitle>
          <ShieldCheck className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((m) => (
            <div key={m.label} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{m.label}</p>
                  <Badge variant={statusVariant[m.status]}>{m.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">{m.description}</p>
              </div>
              <p className={cn('text-sm font-semibold text-white')}>
                {m.format === 'currency' ? `$${m.value.toLocaleString()}` : m.format === 'percent' ? `${m.value}%` : `${m.value}x`}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
