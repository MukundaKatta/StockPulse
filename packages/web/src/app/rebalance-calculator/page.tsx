'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Scale } from 'lucide-react';

interface RebalanceItem {
  asset: string;
  currentWeight: number;
  targetWeight: number;
  drift: number;
  currentValue: number;
  tradeNeeded: number;
  action: 'buy' | 'sell' | 'hold';
}

const mockData: RebalanceItem[] = [
  { asset: 'US Large Cap', currentWeight: 38.5, targetWeight: 35, drift: 3.5, currentValue: 96250, tradeNeeded: -8750, action: 'sell' },
  { asset: 'US Small Cap', currentWeight: 12.2, targetWeight: 15, drift: -2.8, currentValue: 30500, tradeNeeded: 7000, action: 'buy' },
  { asset: 'International Dev', currentWeight: 18.8, targetWeight: 20, drift: -1.2, currentValue: 47000, tradeNeeded: 3000, action: 'buy' },
  { asset: 'Emerging Markets', currentWeight: 8.5, targetWeight: 10, drift: -1.5, currentValue: 21250, tradeNeeded: 3750, action: 'buy' },
  { asset: 'US Bonds', currentWeight: 16.0, targetWeight: 15, drift: 1.0, currentValue: 40000, tradeNeeded: -2500, action: 'sell' },
  { asset: 'Alternatives', currentWeight: 6.0, targetWeight: 5, drift: 1.0, currentValue: 15000, tradeNeeded: -2500, action: 'sell' },
];

const summaryCards = [
  { label: 'Portfolio Value', value: '$250.0K', sub: 'Total market value' },
  { label: 'Max Drift', value: '3.5%', sub: 'US Large Cap' },
  { label: 'Trades Needed', value: '5', sub: '2 sell, 3 buy' },
  { label: 'Trade Volume', value: '$27.5K', sub: 'Total rebalance' },
];

const actionVariant: Record<string, 'success' | 'danger' | 'default'> = {
  buy: 'success', sell: 'danger', hold: 'default',
};

export default function RebalanceCalculatorPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Rebalance Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Calculate trades needed to realign portfolio to target weights</p>
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
          <CardTitle>Rebalance Trades</CardTitle>
          <Scale className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((r) => (
            <div key={r.asset} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{r.asset}</p>
                  <Badge variant={actionVariant[r.action]}>{r.action}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Current: {r.currentWeight}% | Target: {r.targetWeight}% | Drift: {r.drift >= 0 ? '+' : ''}{r.drift}%
                </p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-semibold', r.tradeNeeded >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {r.tradeNeeded >= 0 ? '+' : ''}${r.tradeNeeded.toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-600">${r.currentValue.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
