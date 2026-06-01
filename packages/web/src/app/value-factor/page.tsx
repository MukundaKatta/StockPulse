'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Tag } from 'lucide-react';

interface ValueStock {
  symbol: string;
  name: string;
  price: number;
  peRatio: number;
  pbRatio: number;
  dividendYield: number;
  fcfYield: number;
  valueScore: number;
  signal: 'deep-value' | 'value' | 'fair' | 'overvalued';
}

const mockData: ValueStock[] = [
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 412.50, peRatio: 9.2, pbRatio: 1.5, dividendYield: 0, fcfYield: 8.2, valueScore: 88, signal: 'deep-value' },
  { symbol: 'CVX', name: 'Chevron', price: 152.80, peRatio: 11.5, pbRatio: 1.8, dividendYield: 4.1, fcfYield: 9.5, valueScore: 82, signal: 'value' },
  { symbol: 'BAC', name: 'Bank of America', price: 34.20, peRatio: 10.8, pbRatio: 1.0, dividendYield: 2.8, fcfYield: 12.1, valueScore: 85, signal: 'deep-value' },
  { symbol: 'VZ', name: 'Verizon', price: 38.50, peRatio: 8.5, pbRatio: 1.6, dividendYield: 6.8, fcfYield: 14.2, valueScore: 90, signal: 'deep-value' },
  { symbol: 'INTC', name: 'Intel', price: 45.20, peRatio: 28.5, pbRatio: 1.2, dividendYield: 1.1, fcfYield: 3.8, valueScore: 45, signal: 'fair' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 892.40, peRatio: 72.5, pbRatio: 48.2, dividendYield: 0.02, fcfYield: 1.8, valueScore: 12, signal: 'overvalued' },
];

const summaryCards = [
  { label: 'Factor Return', value: '+8.2%', sub: 'Top quintile YTD' },
  { label: 'Value Spread', value: 'Wide', sub: 'Above avg opportunity' },
  { label: 'Avg P/E', value: '10.5x', sub: 'Top quintile' },
  { label: 'Avg FCF Yield', value: '11.0%', sub: 'Top quintile' },
];

const signalVariant: Record<string, 'success' | 'info' | 'default' | 'danger'> = {
  'deep-value': 'success', value: 'info', fair: 'default', overvalued: 'danger',
};

export default function ValueFactorPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Value Factor Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Screen stocks using value factor metrics and composite scoring</p>
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
          <CardTitle>Value Rankings</CardTitle>
          <Tag className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{s.symbol}</p>
                  <span className="text-xs text-gray-500">{s.name}</span>
                  <Badge variant={signalVariant[s.signal]}>{s.signal}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  P/E: {s.peRatio}x | P/B: {s.pbRatio}x | Div: {s.dividendYield}% | FCF Yield: {s.fcfYield}%
                </p>
              </div>
              <p className={cn('text-sm font-semibold', s.valueScore >= 70 ? 'text-green-400' : s.valueScore >= 40 ? 'text-amber-400' : 'text-red-400')}>
                {s.valueScore}/100
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
