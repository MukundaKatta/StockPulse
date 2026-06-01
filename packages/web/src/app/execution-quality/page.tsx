'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Gauge } from 'lucide-react';

interface ExecutionMetric {
  venue: string;
  fillRate: number;
  avgSlippage: number;
  avgLatency: number;
  priceImprovement: number;
  tradesCount: number;
  grade: 'A' | 'B' | 'C' | 'D';
}

const mockData: ExecutionMetric[] = [
  { venue: 'NYSE', fillRate: 98.5, avgSlippage: 0.02, avgLatency: 1.2, priceImprovement: 45, tradesCount: 1250, grade: 'A' },
  { venue: 'NASDAQ', fillRate: 97.8, avgSlippage: 0.03, avgLatency: 0.8, priceImprovement: 38, tradesCount: 980, grade: 'A' },
  { venue: 'ARCA', fillRate: 95.2, avgSlippage: 0.05, avgLatency: 2.1, priceImprovement: 28, tradesCount: 450, grade: 'B' },
  { venue: 'BATS', fillRate: 96.1, avgSlippage: 0.04, avgLatency: 1.5, priceImprovement: 32, tradesCount: 320, grade: 'B' },
  { venue: 'IEX', fillRate: 99.1, avgSlippage: 0.01, avgLatency: 3.2, priceImprovement: 62, tradesCount: 180, grade: 'A' },
  { venue: 'Dark Pool', fillRate: 88.5, avgSlippage: 0.08, avgLatency: 5.4, priceImprovement: 15, tradesCount: 95, grade: 'C' },
];

const summaryCards = [
  { label: 'Avg Fill Rate', value: '95.9%', sub: 'Across all venues' },
  { label: 'Avg Slippage', value: '0.03%', sub: 'Per trade' },
  { label: 'Price Improvement', value: '38%', sub: 'Of all orders' },
  { label: 'Avg Latency', value: '1.8ms', sub: 'Order to fill' },
];

const gradeVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
  A: 'success', B: 'info', C: 'warning', D: 'danger',
};

export default function ExecutionQualityPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Execution Quality</h1>
        <p className="mt-1 text-sm text-gray-500">Analyze trade execution quality across venues</p>
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
          <CardTitle>Venue Performance</CardTitle>
          <Gauge className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((m) => (
            <div key={m.venue} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{m.venue}</p>
                  <Badge variant={gradeVariant[m.grade]}>Grade {m.grade}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Fill: {m.fillRate}% | Slippage: {m.avgSlippage}% | Latency: {m.avgLatency}ms | Trades: {m.tradesCount}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', m.priceImprovement >= 40 ? 'text-green-400' : m.priceImprovement >= 25 ? 'text-amber-400' : 'text-gray-400')}>
                {m.priceImprovement}% PI
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
