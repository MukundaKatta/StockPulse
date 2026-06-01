'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Coins } from 'lucide-react';

interface DividendStock {
  symbol: string;
  name: string;
  shares: number;
  annualDiv: number;
  yield: number;
  frequency: string;
  nextPayDate: string;
  nextAmount: number;
  growth5Y: number;
}

const mockData: DividendStock[] = [
  { symbol: 'JNJ', name: 'Johnson & Johnson', shares: 100, annualDiv: 476, yield: 3.1, frequency: 'Quarterly', nextPayDate: '2024-03-10', nextAmount: 119, growth5Y: 5.8 },
  { symbol: 'PG', name: 'Procter & Gamble', shares: 80, annualDiv: 302, yield: 2.4, frequency: 'Quarterly', nextPayDate: '2024-02-15', nextAmount: 75.5, growth5Y: 6.2 },
  { symbol: 'KO', name: 'Coca-Cola Co', shares: 200, annualDiv: 368, yield: 3.0, frequency: 'Quarterly', nextPayDate: '2024-04-01', nextAmount: 92, growth5Y: 3.5 },
  { symbol: 'O', name: 'Realty Income', shares: 150, annualDiv: 456, yield: 5.2, frequency: 'Monthly', nextPayDate: '2024-02-01', nextAmount: 38, growth5Y: 4.1 },
  { symbol: 'VZ', name: 'Verizon Comm', shares: 120, annualDiv: 316, yield: 6.8, frequency: 'Quarterly', nextPayDate: '2024-02-01', nextAmount: 79, growth5Y: 2.0 },
  { symbol: 'ABBV', name: 'AbbVie Inc', shares: 60, annualDiv: 364, yield: 3.8, frequency: 'Quarterly', nextPayDate: '2024-02-15', nextAmount: 91, growth5Y: 8.5 },
];

const summaryCards = [
  { label: 'Annual Income', value: '$2,282', sub: 'Projected dividends' },
  { label: 'Monthly Avg', value: '$190', sub: 'Average payout' },
  { label: 'Portfolio Yield', value: '3.4%', sub: 'Weighted average' },
  { label: 'Div Growth', value: '+5.0%', sub: '5Y avg growth rate' },
];

export default function IncomeProjectionPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dividend Income Projection</h1>
        <p className="mt-1 text-sm text-gray-500">Forecast dividend income from portfolio holdings</p>
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
          <CardTitle>Dividend Holdings</CardTitle>
          <Coins className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{s.symbol}</p>
                  <span className="text-xs text-gray-500">{s.name}</span>
                  <Badge variant="info">{s.frequency}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Shares: {s.shares} | Yield: {s.yield}% | Next: {s.nextPayDate} (${s.nextAmount}) | Growth: {cn(s.growth5Y >= 5 ? 'text-green-400' : 'text-gray-400') && `+${s.growth5Y}%`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-400">${s.annualDiv}/yr</p>
                <p className="text-[10px] text-gray-600">${(s.annualDiv / 12).toFixed(0)}/mo</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
