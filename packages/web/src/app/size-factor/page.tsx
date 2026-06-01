'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Maximize2 } from 'lucide-react';

interface SizeStock {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  capCategory: 'mega' | 'large' | 'mid' | 'small' | 'micro';
  return1Y: number;
  volatility: number;
  beta: number;
}

const mockData: SizeStock[] = [
  { symbol: 'AAPL', name: 'Apple', price: 185.20, marketCap: 2850000, capCategory: 'mega', return1Y: 28.5, volatility: 22.1, beta: 1.15 },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.80, marketCap: 3100000, capCategory: 'mega', return1Y: 32.1, volatility: 24.5, beta: 1.08 },
  { symbol: 'DHR', name: 'Danaher', price: 252.40, marketCap: 185000, capCategory: 'large', return1Y: 15.8, volatility: 28.2, beta: 0.92 },
  { symbol: 'POOL', name: 'Pool Corp', price: 378.50, marketCap: 14500, capCategory: 'mid', return1Y: 22.4, volatility: 32.5, beta: 1.25 },
  { symbol: 'CABO', name: 'Cable One', price: 485.20, marketCap: 2800, capCategory: 'small', return1Y: -12.5, volatility: 38.2, beta: 0.85 },
  { symbol: 'PRFT', name: 'Perficient', price: 68.40, marketCap: 2200, capCategory: 'small', return1Y: 18.2, volatility: 42.1, beta: 1.35 },
];

const summaryCards = [
  { label: 'SMB Premium', value: '+2.8%', sub: 'Small minus big YTD' },
  { label: 'Small Cap Avg', value: '+15.2%', sub: 'vs Large +22.5%' },
  { label: 'Vol Spread', value: '14.5%', sub: 'Small vs Large cap' },
  { label: 'Correlation', value: '0.72', sub: 'Small vs S&P 500' },
];

const capVariant: Record<string, 'success' | 'info' | 'warning' | 'danger' | 'default'> = {
  mega: 'success', large: 'info', mid: 'warning', small: 'danger', micro: 'default',
};

export default function SizeFactorPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Size Factor Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Analyze the small-cap premium and size factor performance</p>
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
          <CardTitle>Size Comparison</CardTitle>
          <Maximize2 className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{s.symbol}</p>
                  <span className="text-xs text-gray-500">{s.name}</span>
                  <Badge variant={capVariant[s.capCategory]}>{s.capCategory}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Mkt Cap: ${s.marketCap >= 1000000 ? `${(s.marketCap / 1000000).toFixed(1)}T` : s.marketCap >= 1000 ? `${(s.marketCap / 1000).toFixed(0)}B` : `${s.marketCap}M`} | Vol: {s.volatility}% | Beta: {s.beta}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', s.return1Y >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.return1Y >= 0 ? '+' : ''}{s.return1Y}%
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
