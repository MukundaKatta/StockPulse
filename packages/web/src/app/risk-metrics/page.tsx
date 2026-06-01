'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ShieldAlert } from 'lucide-react';

interface RiskData {
  metric: string;
  value: number;
  display: string;
  benchmark: string;
  status: 'Good' | 'Warning' | 'Elevated';
  description: string;
}

const METRICS: RiskData[] = [
  { metric: 'Value at Risk (95%)', value: 2.4, display: '-2.4%', benchmark: '-1.8%', status: 'Warning', description: 'Daily VaR at 95% confidence' },
  { metric: 'Value at Risk (99%)', value: 4.1, display: '-4.1%', benchmark: '-3.2%', status: 'Elevated', description: 'Daily VaR at 99% confidence' },
  { metric: 'Sharpe Ratio', value: 1.42, display: '1.42', benchmark: '1.18', status: 'Good', description: 'Risk-adjusted return per unit of volatility' },
  { metric: 'Sortino Ratio', value: 2.08, display: '2.08', benchmark: '1.65', status: 'Good', description: 'Downside risk-adjusted return' },
  { metric: 'Max Drawdown', value: 18.4, display: '-18.4%', benchmark: '-22.1%', status: 'Good', description: 'Largest peak-to-trough decline' },
  { metric: 'Beta', value: 1.12, display: '1.12', benchmark: '1.00', status: 'Warning', description: 'Market sensitivity coefficient' },
  { metric: 'Tracking Error', value: 4.8, display: '4.8%', benchmark: '-', status: 'Warning', description: 'Standard deviation of active returns' },
  { metric: 'Information Ratio', value: 1.35, display: '1.35', benchmark: '-', status: 'Good', description: 'Alpha per unit of tracking error' },
  { metric: 'Calmar Ratio', value: 1.24, display: '1.24', benchmark: '0.96', status: 'Good', description: 'Return per unit of max drawdown' },
  { metric: 'Ulcer Index', value: 5.2, display: '5.2', benchmark: '6.8', status: 'Good', description: 'Duration and depth of drawdowns' },
];

export default function RiskMetricsPage() {
  const goodCount = METRICS.filter((m) => m.status === 'Good').length;
  const warningCount = METRICS.filter((m) => m.status === 'Warning').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Risk Metrics</h1>
        <p className="mt-1 text-sm text-gray-500">Comprehensive portfolio risk analysis</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Good</p><p className="text-lg font-bold text-green-400">{goodCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Warning</p><p className="text-lg font-bold text-amber-400">{warningCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Elevated</p><p className="text-lg font-bold text-red-400">{METRICS.filter((m) => m.status === 'Elevated').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ShieldAlert className="h-4 w-4 text-indigo-400" /> Risk Dashboard</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {METRICS.map((m) => (
            <div key={m.metric} className="px-4 py-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white">{m.metric}</span>
                  <Badge variant={m.status === 'Good' ? 'success' : m.status === 'Warning' ? 'warning' : 'danger'}>{m.status}</Badge>
                </div>
                <span className={cn('text-sm font-bold font-mono', m.status === 'Good' ? 'text-green-400' : m.status === 'Warning' ? 'text-amber-400' : 'text-red-400')}>{m.display}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-500">{m.description}</span>
                <span className="text-gray-400">Benchmark: {m.benchmark}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
