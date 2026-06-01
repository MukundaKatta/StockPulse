'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface TradingPeriod {
  period: string;
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  netPnL: number;
  grade: 'excellent' | 'good' | 'average' | 'poor';
}

const mockData: TradingPeriod[] = [
  { period: 'Jan 2024', totalTrades: 42, wins: 26, losses: 16, winRate: 61.9, avgWin: 485, avgLoss: -312, profitFactor: 2.52, netPnL: 7618, grade: 'excellent' },
  { period: 'Dec 2023', totalTrades: 38, wins: 22, losses: 16, winRate: 57.9, avgWin: 420, avgLoss: -345, profitFactor: 1.68, netPnL: 3720, grade: 'good' },
  { period: 'Nov 2023', totalTrades: 45, wins: 28, losses: 17, winRate: 62.2, avgWin: 510, avgLoss: -290, profitFactor: 2.90, netPnL: 9350, grade: 'excellent' },
  { period: 'Oct 2023', totalTrades: 35, wins: 16, losses: 19, winRate: 45.7, avgWin: 580, avgLoss: -385, profitFactor: 1.27, netPnL: 965, grade: 'average' },
  { period: 'Sep 2023', totalTrades: 40, wins: 18, losses: 22, winRate: 45.0, avgWin: 350, avgLoss: -420, profitFactor: 0.68, netPnL: -2940, grade: 'poor' },
  { period: 'Aug 2023', totalTrades: 36, wins: 21, losses: 15, winRate: 58.3, avgWin: 445, avgLoss: -310, profitFactor: 2.01, netPnL: 4695, grade: 'good' },
];

const summaryCards = [
  { label: 'Overall Win Rate', value: '55.7%', sub: '236 total trades' },
  { label: 'Profit Factor', value: '1.82', sub: 'Gross win/loss' },
  { label: 'Avg Win/Loss', value: '1.42x', sub: 'Win size vs loss' },
  { label: 'Best Month', value: 'Nov 23', sub: '+$9,350 P&L' },
];

const gradeVariant: Record<string, 'success' | 'info' | 'default' | 'danger'> = {
  excellent: 'success', good: 'info', average: 'default', poor: 'danger',
};

export default function WinLossRatioPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Win/Loss Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Analyze trading performance by win rate and profit factor</p>
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
          <CardTitle>Monthly Performance</CardTitle>
          <Target className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((p) => (
            <div key={p.period} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{p.period}</p>
                  <Badge variant={gradeVariant[p.grade]}>{p.grade}</Badge>
                  <span className="text-xs text-gray-500">{p.totalTrades} trades</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  W: {p.wins} L: {p.losses} | Win Rate: {p.winRate}% | Avg Win: ${p.avgWin} | Avg Loss: ${Math.abs(p.avgLoss)} | PF: {p.profitFactor.toFixed(2)}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', p.netPnL >= 0 ? 'text-green-400' : 'text-red-400')}>
                {p.netPnL >= 0 ? '+' : ''}${p.netPnL.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
