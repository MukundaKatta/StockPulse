'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Brain } from 'lucide-react';

interface SmartBetaStrategy {
  name: string;
  ticker: string;
  factor: string;
  return1Y: number;
  return3Y: number;
  volatility: number;
  sharpe: number;
  expenseRatio: number;
  aum: string;
  rank: number;
}

const mockData: SmartBetaStrategy[] = [
  { name: 'Quality Factor ETF', ticker: 'QUAL', factor: 'Quality', return1Y: 18.5, return3Y: 12.2, volatility: 16.8, sharpe: 1.10, expenseRatio: 0.15, aum: '$42B', rank: 1 },
  { name: 'Momentum Factor ETF', ticker: 'MTUM', factor: 'Momentum', return1Y: 22.1, return3Y: 14.8, volatility: 20.5, sharpe: 1.08, expenseRatio: 0.15, aum: '$18B', rank: 2 },
  { name: 'Low Volatility ETF', ticker: 'USMV', factor: 'Low Vol', return1Y: 10.2, return3Y: 8.5, volatility: 12.1, sharpe: 0.84, expenseRatio: 0.15, aum: '$28B', rank: 3 },
  { name: 'Value Factor ETF', ticker: 'VLUE', factor: 'Value', return1Y: 8.8, return3Y: 10.5, volatility: 18.2, sharpe: 0.48, expenseRatio: 0.15, aum: '$12B', rank: 4 },
  { name: 'Size Factor ETF', ticker: 'SIZE', factor: 'Size', return1Y: 12.5, return3Y: 9.8, volatility: 19.5, sharpe: 0.64, expenseRatio: 0.15, aum: '$3B', rank: 5 },
  { name: 'Dividend Growth ETF', ticker: 'DGRO', factor: 'Dividend', return1Y: 14.2, return3Y: 11.5, volatility: 14.8, sharpe: 0.96, expenseRatio: 0.08, aum: '$25B', rank: 6 },
];

const summaryCards = [
  { label: 'Best Factor YTD', value: 'Momentum', sub: '+22.1% return' },
  { label: 'Best Sharpe', value: 'Quality', sub: '1.10 ratio' },
  { label: 'Lowest Vol', value: 'Low Vol', sub: '12.1% annualized' },
  { label: 'Strategies', value: '6', sub: 'Active comparisons' },
];

export default function SmartBetaPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Smart Beta Strategies</h1>
        <p className="mt-1 text-sm text-gray-500">Compare factor-based smart beta strategies and ETFs</p>
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
          <CardTitle>Strategy Comparison</CardTitle>
          <Brain className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.ticker} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">#{s.rank}</span>
                  <p className="text-sm font-bold text-white">{s.ticker}</p>
                  <span className="text-xs text-gray-500">{s.name}</span>
                  <Badge variant="info">{s.factor}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  1Y: {cn(s.return1Y >= 0 ? '' : '') && `${s.return1Y >= 0 ? '+' : ''}${s.return1Y}%`} | 3Y: +{s.return3Y}% | Vol: {s.volatility}% | ER: {s.expenseRatio}% | AUM: {s.aum}
                </p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-semibold', s.sharpe >= 1.0 ? 'text-green-400' : s.sharpe >= 0.7 ? 'text-amber-400' : 'text-gray-400')}>
                  {s.sharpe.toFixed(2)}
                </p>
                <p className="text-[10px] text-gray-600">Sharpe</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
