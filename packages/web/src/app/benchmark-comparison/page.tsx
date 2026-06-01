'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { GitCompare } from 'lucide-react';

interface PeriodReturn {
  period: string;
  portfolio: number;
  benchmark: number;
  alpha: number;
}

const PERIODS: PeriodReturn[] = [
  { period: '1 Week', portfolio: 2.1, benchmark: 1.4, alpha: 0.7 },
  { period: '1 Month', portfolio: 5.8, benchmark: 3.2, alpha: 2.6 },
  { period: '3 Months', portfolio: 12.4, benchmark: 8.5, alpha: 3.9 },
  { period: '6 Months', portfolio: 18.2, benchmark: 14.1, alpha: 4.1 },
  { period: 'YTD', portfolio: 22.8, benchmark: 16.4, alpha: 6.4 },
  { period: '1 Year', portfolio: 28.5, benchmark: 21.2, alpha: 7.3 },
  { period: '3 Years', portfolio: 42.1, benchmark: 34.8, alpha: 7.3 },
  { period: '5 Years', portfolio: 98.4, benchmark: 78.2, alpha: 20.2 },
];

interface RiskMetric {
  metric: string;
  portfolio: string;
  benchmark: string;
  better: boolean;
}

const RISK_METRICS: RiskMetric[] = [
  { metric: 'Sharpe Ratio', portfolio: '1.42', benchmark: '1.18', better: true },
  { metric: 'Sortino Ratio', portfolio: '2.08', benchmark: '1.65', better: true },
  { metric: 'Max Drawdown', portfolio: '-18.4%', benchmark: '-22.1%', better: true },
  { metric: 'Beta', portfolio: '1.12', benchmark: '1.00', better: false },
  { metric: 'Volatility', portfolio: '18.2%', benchmark: '15.8%', better: false },
  { metric: 'Tracking Error', portfolio: '4.8%', benchmark: '-', better: true },
  { metric: 'Info Ratio', portfolio: '1.35', benchmark: '-', better: true },
];

export default function BenchmarkComparisonPage() {
  const ytd = PERIODS.find((p) => p.period === 'YTD')!;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Benchmark Comparison</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio performance vs S&P 500</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Portfolio YTD</p><p className="text-lg font-bold text-green-400">+{ytd.portfolio}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">S&P 500 YTD</p><p className="text-lg font-bold text-white">+{ytd.benchmark}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Alpha</p><p className="text-lg font-bold text-indigo-400">+{ytd.alpha}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Beat Rate</p><p className="text-lg font-bold text-green-400">{((PERIODS.filter((p) => p.alpha > 0).length / PERIODS.length) * 100).toFixed(0)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><GitCompare className="h-4 w-4 text-indigo-400" /> Period Returns</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PERIODS.map((p) => {
            const maxVal = Math.max(Math.abs(p.portfolio), Math.abs(p.benchmark));
            return (
              <div key={p.period} className="px-4 py-2.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white w-20">{p.period}</span>
                  <Badge variant={p.alpha > 0 ? 'success' : 'danger'}>{p.alpha >= 0 ? '+' : ''}{p.alpha.toFixed(1)}% alpha</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-500 w-14">Portfolio</span>
                    <div className="flex-1 h-2 rounded bg-white/5">
                      <div className="h-full rounded bg-indigo-500" style={{ width: `${(p.portfolio / maxVal) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 w-14 text-right">+{p.portfolio}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-500 w-14">S&P 500</span>
                    <div className="flex-1 h-2 rounded bg-white/5">
                      <div className="h-full rounded bg-gray-500" style={{ width: `${(p.benchmark / maxVal) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 w-14 text-right">+{p.benchmark}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Risk-Adjusted Metrics</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {RISK_METRICS.map((m) => (
            <div key={m.metric} className="flex items-center justify-between px-4 py-2">
              <span className="text-xs text-gray-400">{m.metric}</span>
              <div className="flex items-center gap-4">
                <span className={cn('text-xs font-mono', m.better ? 'text-green-400' : 'text-amber-400')}>{m.portfolio}</span>
                <span className="text-xs font-mono text-gray-500">{m.benchmark}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
