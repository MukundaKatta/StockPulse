'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

interface StrategyExpectancy {
  strategy: string;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  expectancy: number;
  expectancyR: number;
  tradesPerMonth: number;
  monthlyExpected: number;
  rating: 'high' | 'medium' | 'low' | 'negative';
}

const mockData: StrategyExpectancy[] = [
  { strategy: 'Trend Following', winRate: 42, avgWin: 850, avgLoss: -320, expectancy: 171.40, expectancyR: 0.54, tradesPerMonth: 12, monthlyExpected: 2057, rating: 'high' },
  { strategy: 'Mean Reversion', winRate: 65, avgWin: 280, avgLoss: -350, expectancy: 59.50, expectancyR: 0.17, tradesPerMonth: 25, monthlyExpected: 1488, rating: 'medium' },
  { strategy: 'Breakout', winRate: 38, avgWin: 1200, avgLoss: -450, expectancy: 177.00, expectancyR: 0.39, tradesPerMonth: 8, monthlyExpected: 1416, rating: 'high' },
  { strategy: 'Scalping', winRate: 72, avgWin: 85, avgLoss: -120, expectancy: 27.60, expectancyR: 0.23, tradesPerMonth: 80, monthlyExpected: 2208, rating: 'medium' },
  { strategy: 'Swing Trading', winRate: 55, avgWin: 520, avgLoss: -380, expectancy: 115.00, expectancyR: 0.30, tradesPerMonth: 6, monthlyExpected: 690, rating: 'medium' },
  { strategy: 'Counter-Trend', winRate: 35, avgWin: 450, avgLoss: -380, expectancy: -89.50, expectancyR: -0.24, tradesPerMonth: 15, monthlyExpected: -1343, rating: 'negative' },
];

const summaryCards = [
  { label: 'Best Expectancy', value: '$177.00', sub: 'Breakout strategy' },
  { label: 'Best Monthly', value: '$2,208', sub: 'Scalping (volume)' },
  { label: 'Avg Expectancy', value: '$93.50', sub: 'Across strategies' },
  { label: 'Positive Systems', value: '5/6', sub: '83% profitable' },
];

const ratingVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
  high: 'success', medium: 'info', low: 'warning', negative: 'danger',
};

export default function ExpectancyCalcPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Trading Expectancy Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Calculate expected value per trade across strategies</p>
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
          <CardTitle>Strategy Expectancy</CardTitle>
          <Calculator className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.strategy} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{s.strategy}</p>
                  <Badge variant={ratingVariant[s.rating]}>{s.rating}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Win: {s.winRate}% | Avg W: ${s.avgWin} | Avg L: ${Math.abs(s.avgLoss)} | R: {s.expectancyR.toFixed(2)} | Trades/mo: {s.tradesPerMonth}
                </p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-semibold', s.expectancy >= 0 ? 'text-green-400' : 'text-red-400')}>
                  ${s.expectancy.toFixed(2)}
                </p>
                <p className={cn('text-[10px]', s.monthlyExpected >= 0 ? 'text-green-400' : 'text-red-400')}>
                  ${s.monthlyExpected.toLocaleString()}/mo
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
