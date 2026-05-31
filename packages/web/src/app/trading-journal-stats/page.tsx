'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { BarChart3, Target, Clock } from 'lucide-react';

const STATS = {
  totalTrades: 248,
  winRate: 62.5,
  avgWin: 1250,
  avgLoss: -680,
  profitFactor: 2.85,
  expectancy: 325,
  largestWin: 8500,
  largestLoss: -3200,
  avgHoldDays: 4.2,
  maxConsecutiveWins: 8,
  maxConsecutiveLosses: 4,
  sharpeRatio: 1.82,
  totalPnL: 80600,
};

const MONTHLY_PNL = [
  { month: 'Jan', pnl: 8500 }, { month: 'Feb', pnl: 4200 }, { month: 'Mar', pnl: -2100 },
  { month: 'Apr', pnl: 12800 }, { month: 'May', pnl: 6500 }, { month: 'Jun', pnl: -1500 },
  { month: 'Jul', pnl: 9800 }, { month: 'Aug', pnl: 3200 }, { month: 'Sep', pnl: 15200 },
  { month: 'Oct', pnl: 7800 }, { month: 'Nov', pnl: 11500 }, { month: 'Dec', pnl: 4700 },
];

const BY_SETUP = [
  { setup: 'Breakout', trades: 65, winRate: 68, avgPnL: 520 },
  { setup: 'Pullback', trades: 52, winRate: 65, avgPnL: 380 },
  { setup: 'Reversal', trades: 38, winRate: 55, avgPnL: 280 },
  { setup: 'Momentum', trades: 48, winRate: 72, avgPnL: 650 },
  { setup: 'Mean Revert', trades: 45, winRate: 58, avgPnL: 210 },
];

export default function TradingJournalStatsPage() {
  const maxPnl = Math.max(...MONTHLY_PNL.map((m) => Math.abs(m.pnl)));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Trading Statistics</h1>
        <p className="mt-1 text-sm text-gray-500">Performance analytics from your journal</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total P&L</p><p className="text-sm font-bold text-green-400">{formatCurrency(STATS.totalPnL)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Win Rate</p><p className="text-sm font-bold text-white">{STATS.winRate}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Profit Factor</p><p className="text-sm font-bold text-indigo-400">{STATS.profitFactor}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sharpe</p><p className="text-sm font-bold text-yellow-400">{STATS.sharpeRatio}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Monthly P&L</CardTitle></CardHeader>
        <div className="flex items-end gap-1 h-28 px-2 pb-2">
          {MONTHLY_PNL.map((m) => {
            const height = (Math.abs(m.pnl) / maxPnl) * 100;
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[8px] text-gray-500 font-mono">{m.pnl >= 0 ? '+' : ''}{(m.pnl / 1000).toFixed(1)}K</span>
                <div className={cn('w-full rounded-t', m.pnl >= 0 ? 'bg-green-500/50' : 'bg-red-500/50')} style={{ height: `${Math.max(height, 5)}%` }} />
                <span className="text-[8px] text-gray-600">{m.month}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader><CardTitle className="text-sm text-green-400">Wins</CardTitle></CardHeader>
          <div className="space-y-2 px-2 pb-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-400">Average Win</span><span className="font-mono text-green-400">{formatCurrency(STATS.avgWin)}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Largest Win</span><span className="font-mono text-green-400">{formatCurrency(STATS.largestWin)}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Max Streak</span><span className="font-mono text-white">{STATS.maxConsecutiveWins}</span></div>
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-red-400">Losses</CardTitle></CardHeader>
          <div className="space-y-2 px-2 pb-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-400">Average Loss</span><span className="font-mono text-red-400">{formatCurrency(Math.abs(STATS.avgLoss))}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Largest Loss</span><span className="font-mono text-red-400">{formatCurrency(Math.abs(STATS.largestLoss))}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Max Streak</span><span className="font-mono text-white">{STATS.maxConsecutiveLosses}</span></div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-indigo-400" /> By Setup Type</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BY_SETUP.map((s) => (
            <div key={s.setup} className="flex items-center gap-3 py-2.5 px-2">
              <span className="text-sm text-white w-24">{s.setup}</span>
              <span className="text-xs text-gray-500 w-16">{s.trades} trades</span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className={cn('h-full rounded-full', s.winRate >= 65 ? 'bg-green-500/60' : s.winRate >= 55 ? 'bg-yellow-500/60' : 'bg-red-500/60')} style={{ width: `${s.winRate}%` }} />
              </div>
              <span className="text-xs font-mono text-white w-10 text-right">{s.winRate}%</span>
              <span className={cn('text-xs font-mono w-16 text-right', s.avgPnL >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(s.avgPnL)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
