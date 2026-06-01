'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Zap } from 'lucide-react';

interface DayTradeTool {
  name: string;
  category: string;
  winRate: number;
  avgProfit: number;
  tradesPerDay: number;
  status: 'Active' | 'Paused' | 'Backtesting';
  sharpeRatio: number;
}

const TOOLS: DayTradeTool[] = [
  { name: 'Momentum Scalper', category: 'Scalping', winRate: 62.4, avgProfit: 285.50, tradesPerDay: 18, status: 'Active', sharpeRatio: 2.1 },
  { name: 'VWAP Reversion', category: 'Mean Reversion', winRate: 58.1, avgProfit: 420.00, tradesPerDay: 8, status: 'Active', sharpeRatio: 1.8 },
  { name: 'Opening Range Breakout', category: 'Breakout', winRate: 55.3, avgProfit: 680.25, tradesPerDay: 4, status: 'Paused', sharpeRatio: 1.5 },
  { name: 'Level 2 Scanner', category: 'Order Flow', winRate: 64.8, avgProfit: 195.00, tradesPerDay: 22, status: 'Active', sharpeRatio: 2.4 },
  { name: 'Gap Fill Strategy', category: 'Gap Trading', winRate: 51.2, avgProfit: 550.75, tradesPerDay: 3, status: 'Backtesting', sharpeRatio: 1.2 },
  { name: 'Tape Reader Bot', category: 'Order Flow', winRate: 60.0, avgProfit: 310.40, tradesPerDay: 15, status: 'Active', sharpeRatio: 1.9 },
  { name: 'Pivot Point Trader', category: 'Support/Resistance', winRate: 57.6, avgProfit: 445.80, tradesPerDay: 6, status: 'Paused', sharpeRatio: 1.6 },
];

const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'Paused' ? 'warning' : 'info';

export default function DayTradingToolsPage() {
  const activeTools = TOOLS.filter(t => t.status === 'Active').length;
  const avgWinRate = TOOLS.reduce((s, t) => s + t.winRate, 0) / TOOLS.length;
  const totalDailyProfit = TOOLS.filter(t => t.status === 'Active').reduce((s, t) => s + t.avgProfit * t.tradesPerDay * (t.winRate / 100), 0);
  const avgSharpe = TOOLS.reduce((s, t) => s + t.sharpeRatio, 0) / TOOLS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Day Trading Tools</h1>
        <p className="mt-1 text-sm text-gray-500">Active day trading strategies and toolkit</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Active Tools</p><p className="text-lg font-bold text-green-400">{activeTools}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Win Rate</p><p className="text-lg font-bold text-white">{avgWinRate.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Est. Daily P&L</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(totalDailyProfit)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Sharpe</p><p className="text-lg font-bold text-amber-400">{avgSharpe.toFixed(1)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-indigo-400" /> Trading Toolkit</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {TOOLS.map((t) => (
            <div key={t.name} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-gray-500">{t.category} &middot; {t.tradesPerDay} trades/day</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{t.winRate}%</p>
                  <p className="text-[10px] text-gray-500">{formatCurrency(t.avgProfit)} avg</p>
                </div>
                <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
