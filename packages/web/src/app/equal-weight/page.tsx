'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Equal } from 'lucide-react';

interface WeightComparison {
  metric: string;
  equalWeight: number;
  capWeight: number;
  difference: number;
  winner: 'equal' | 'cap' | 'tie';
  period: string;
}

const mockData: WeightComparison[] = [
  { metric: 'Total Return (1Y)', equalWeight: 15.8, capWeight: 22.5, difference: -6.7, winner: 'cap', period: '1 Year' },
  { metric: 'Total Return (3Y)', equalWeight: 32.5, capWeight: 28.8, difference: 3.7, winner: 'equal', period: '3 Years' },
  { metric: 'Total Return (5Y)', equalWeight: 58.2, capWeight: 65.1, difference: -6.9, winner: 'cap', period: '5 Years' },
  { metric: 'Volatility', equalWeight: 18.5, capWeight: 16.2, difference: 2.3, winner: 'cap', period: 'Annualized' },
  { metric: 'Sharpe Ratio', equalWeight: 0.85, capWeight: 1.08, difference: -0.23, winner: 'cap', period: 'Annualized' },
  { metric: 'Max Drawdown', equalWeight: -22.5, capWeight: -18.8, difference: -3.7, winner: 'cap', period: '5 Years' },
  { metric: 'Sector Diversification', equalWeight: 92, capWeight: 45, difference: 47, winner: 'equal', period: 'Score /100' },
  { metric: 'Stock Concentration', equalWeight: 0.2, capWeight: 8.5, difference: -8.3, winner: 'equal', period: 'Top 10 Weight %' },
];

const summaryCards = [
  { label: 'EW Return YTD', value: '+15.8%', sub: 'Equal weight' },
  { label: 'CW Return YTD', value: '+22.5%', sub: 'Cap weight' },
  { label: 'Spread', value: '-6.7%', sub: 'EW underperforming' },
  { label: 'Better 3Y', value: 'Equal', sub: '+3.7% advantage' },
];

const winnerVariant: Record<string, 'success' | 'info' | 'default'> = {
  equal: 'success', cap: 'info', tie: 'default',
};

export default function EqualWeightPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Equal Weight vs Cap Weight</h1>
        <p className="mt-1 text-sm text-gray-500">Compare equal-weight and capitalization-weight index strategies</p>
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
          <Equal className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((m) => (
            <div key={m.metric} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{m.metric}</p>
                  <Badge variant={winnerVariant[m.winner]}>{m.winner === 'equal' ? 'EW wins' : m.winner === 'cap' ? 'CW wins' : 'Tie'}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Equal: {m.equalWeight} | Cap: {m.capWeight} | {m.period}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', m.difference > 0 ? 'text-green-400' : m.difference < 0 ? 'text-red-400' : 'text-gray-400')}>
                {m.difference >= 0 ? '+' : ''}{m.difference}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
