'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Zap } from 'lucide-react';

interface MomentumStock {
  symbol: string;
  name: string;
  price: number;
  momentum1M: number;
  momentum3M: number;
  momentum12M: number;
  score: number;
  rank: number;
  signal: 'strong-buy' | 'buy' | 'neutral' | 'sell';
}

const mockData: MomentumStock[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 892.40, momentum1M: 18.2, momentum3M: 42.5, momentum12M: 185.4, score: 98, rank: 1, signal: 'strong-buy' },
  { symbol: 'META', name: 'Meta Platforms', price: 505.20, momentum1M: 8.5, momentum3M: 25.8, momentum12M: 142.1, score: 92, rank: 2, signal: 'strong-buy' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 758.30, momentum1M: 6.2, momentum3M: 18.4, momentum12M: 98.5, score: 85, rank: 3, signal: 'buy' },
  { symbol: 'AVGO', name: 'Broadcom', price: 1285.50, momentum1M: 12.1, momentum3M: 35.2, momentum12M: 125.8, score: 90, rank: 4, signal: 'strong-buy' },
  { symbol: 'COST', name: 'Costco', price: 712.80, momentum1M: 3.8, momentum3M: 12.1, momentum12M: 45.2, score: 68, rank: 5, signal: 'buy' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 108.50, momentum1M: -2.4, momentum3M: -5.8, momentum12M: -12.1, score: 22, rank: 6, signal: 'sell' },
];

const summaryCards = [
  { label: 'Factor Return', value: '+18.4%', sub: 'Top quintile YTD' },
  { label: 'Spread', value: '32.1%', sub: 'Top vs bottom quintile' },
  { label: 'Turnover', value: '42%', sub: 'Monthly rebalance' },
  { label: 'Sharpe Ratio', value: '1.85', sub: 'Risk-adjusted' },
];

const signalVariant: Record<string, 'success' | 'info' | 'default' | 'danger'> = {
  'strong-buy': 'success', buy: 'info', neutral: 'default', sell: 'danger',
};

export default function MomentumFactorPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Momentum Factor Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Identify stocks with strong price momentum across timeframes</p>
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
          <CardTitle>Momentum Rankings</CardTitle>
          <Zap className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">#{s.rank}</span>
                  <p className="text-sm font-bold text-white">{s.symbol}</p>
                  <span className="text-xs text-gray-500">{s.name}</span>
                  <Badge variant={signalVariant[s.signal]}>{s.signal}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  1M: {s.momentum1M >= 0 ? '+' : ''}{s.momentum1M}% | 3M: {s.momentum3M >= 0 ? '+' : ''}{s.momentum3M}% | 12M: {s.momentum12M >= 0 ? '+' : ''}{s.momentum12M}%
                </p>
              </div>
              <p className={cn('text-sm font-semibold', s.score >= 70 ? 'text-green-400' : s.score >= 40 ? 'text-amber-400' : 'text-red-400')}>
                {s.score}/100
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
