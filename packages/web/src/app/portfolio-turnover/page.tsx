'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { RefreshCw } from 'lucide-react';

interface TurnoverEntry {
  portfolio: string;
  strategy: string;
  turnoverRatio: number;
  avgHoldingDays: number;
  tradesPerMonth: number;
  costImpact: number;
  period: string;
}

const TURNOVERS: TurnoverEntry[] = [
  { portfolio: 'Growth Alpha', strategy: 'Momentum', turnoverRatio: 1.85, avgHoldingDays: 45, tradesPerMonth: 28, costImpact: 0.42, period: 'Q1 2024' },
  { portfolio: 'Value Core', strategy: 'Value', turnoverRatio: 0.35, avgHoldingDays: 280, tradesPerMonth: 6, costImpact: 0.08, period: 'Q1 2024' },
  { portfolio: 'Income Plus', strategy: 'Dividend', turnoverRatio: 0.22, avgHoldingDays: 410, tradesPerMonth: 4, costImpact: 0.05, period: 'Q1 2024' },
  { portfolio: 'Tech Select', strategy: 'Sector Rotation', turnoverRatio: 2.10, avgHoldingDays: 32, tradesPerMonth: 35, costImpact: 0.55, period: 'Q1 2024' },
  { portfolio: 'Balanced 60/40', strategy: 'Balanced', turnoverRatio: 0.48, avgHoldingDays: 195, tradesPerMonth: 8, costImpact: 0.12, period: 'Q1 2024' },
  { portfolio: 'Small Cap Focus', strategy: 'Growth', turnoverRatio: 1.42, avgHoldingDays: 68, tradesPerMonth: 22, costImpact: 0.38, period: 'Q1 2024' },
  { portfolio: 'Global Macro', strategy: 'Macro', turnoverRatio: 3.20, avgHoldingDays: 18, tradesPerMonth: 52, costImpact: 0.78, period: 'Q1 2024' },
  { portfolio: 'ESG Leaders', strategy: 'ESG', turnoverRatio: 0.30, avgHoldingDays: 340, tradesPerMonth: 5, costImpact: 0.07, period: 'Q1 2024' },
];

export default function PortfolioTurnoverPage() {
  const avgTurnover = TURNOVERS.reduce((s, t) => s + t.turnoverRatio, 0) / TURNOVERS.length;
  const avgHolding = TURNOVERS.reduce((s, t) => s + t.avgHoldingDays, 0) / TURNOVERS.length;
  const totalTrades = TURNOVERS.reduce((s, t) => s + t.tradesPerMonth, 0);
  const avgCost = TURNOVERS.reduce((s, t) => s + t.costImpact, 0) / TURNOVERS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Turnover</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio turnover ratio analysis across strategies</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Turnover</p><p className="text-lg font-bold text-indigo-400">{avgTurnover.toFixed(2)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Holding</p><p className="text-lg font-bold text-white">{avgHolding.toFixed(0)}d</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Trades/Mo</p><p className="text-lg font-bold text-amber-400">{totalTrades}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Cost Impact</p><p className="text-lg font-bold text-red-400">{avgCost.toFixed(2)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><RefreshCw className="h-4 w-4 text-indigo-400" /> Turnover by Portfolio</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {TURNOVERS.sort((a, b) => b.turnoverRatio - a.turnoverRatio).map((t) => (
            <div key={t.portfolio} className="flex items-center gap-3 py-2.5 px-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{t.portfolio}</span>
                  <Badge variant={t.turnoverRatio > 1.5 ? 'danger' : t.turnoverRatio > 0.5 ? 'warning' : 'success'}>
                    {t.turnoverRatio > 1.5 ? 'High' : t.turnoverRatio > 0.5 ? 'Medium' : 'Low'}
                  </Badge>
                </div>
                <p className="text-[10px] text-gray-500">{t.strategy} - {t.period}</p>
              </div>
              <span className={cn('text-sm font-mono font-bold', t.turnoverRatio > 1.5 ? 'text-red-400' : t.turnoverRatio > 0.5 ? 'text-amber-400' : 'text-green-400')}>{t.turnoverRatio.toFixed(2)}x</span>
              <span className="text-xs font-mono text-gray-400 w-14 text-right">{t.avgHoldingDays}d avg</span>
              <span className="text-xs font-mono text-gray-500 w-16 text-right">{t.tradesPerMonth} trades</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
