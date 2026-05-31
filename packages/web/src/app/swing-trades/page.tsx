'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowUpDown } from 'lucide-react';

interface SwingTrade {
  symbol: string;
  name: string;
  entry: number;
  current: number;
  target: number;
  stop: number;
  daysHeld: number;
  pnl: number;
  status: 'Active' | 'Target Hit' | 'Stopped';
}

const TRADES: SwingTrade[] = [
  { symbol: 'META', name: 'Meta Platforms', entry: 465.20, current: 484.10, target: 510, stop: 445, daysHeld: 5, pnl: 4.06, status: 'Active' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', entry: 820.50, current: 878.35, target: 920, stop: 790, daysHeld: 8, pnl: 7.05, status: 'Active' },
  { symbol: 'AMD', name: 'Advanced Micro', entry: 168.40, current: 177.52, target: 190, stop: 160, daysHeld: 4, pnl: 5.42, status: 'Active' },
  { symbol: 'MSFT', name: 'Microsoft Corp', entry: 398.80, current: 404.87, target: 420, stop: 388, daysHeld: 3, pnl: 1.52, status: 'Active' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', entry: 148.50, current: 155.20, target: 155, stop: 142, daysHeld: 12, pnl: 4.51, status: 'Target Hit' },
  { symbol: 'TSLA', name: 'Tesla Inc', entry: 198.40, current: 188.70, target: 220, stop: 190, daysHeld: 6, pnl: -4.89, status: 'Stopped' },
  { symbol: 'AMZN', name: 'Amazon.com', entry: 172.80, current: 178.25, target: 185, stop: 165, daysHeld: 7, pnl: 3.16, status: 'Active' },
  { symbol: 'CRM', name: 'Salesforce', entry: 275.60, current: 282.40, target: 295, stop: 265, daysHeld: 2, pnl: 2.47, status: 'Active' },
];

export default function SwingTradesPage() {
  const active = TRADES.filter((t) => t.status === 'Active');
  const winRate = TRADES.filter((t) => t.pnl > 0).length / TRADES.length;
  const avgPnl = TRADES.reduce((s, t) => s + t.pnl, 0) / TRADES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Swing Trades</h1>
        <p className="mt-1 text-sm text-gray-500">Active and recent swing trade positions</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Active</p>
          <p className="text-lg font-bold text-white">{active.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Win Rate</p>
          <p className="text-lg font-bold text-green-400">{(winRate * 100).toFixed(0)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg P&L</p>
          <p className={cn('text-lg font-bold', avgPnl >= 0 ? 'text-green-400' : 'text-red-400')}>
            {avgPnl >= 0 ? '+' : ''}{avgPnl.toFixed(2)}%
          </p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total Trades</p>
          <p className="text-lg font-bold text-indigo-400">{TRADES.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <ArrowUpDown className="h-4 w-4 text-indigo-400" /> Trade Log
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {TRADES.map((t) => {
            const rr = Math.abs(t.target - t.entry) / Math.abs(t.entry - t.stop);
            return (
              <div key={t.symbol} className="flex items-center gap-3 py-2 px-4">
                <div className="w-20">
                  <p className="text-xs font-bold text-white">{t.symbol}</p>
                  <p className="text-[10px] text-gray-500 truncate">{t.name}</p>
                </div>
                <span className="text-xs font-mono text-gray-400 w-14">${t.entry.toFixed(2)}</span>
                <span className={cn('text-xs font-mono font-bold w-14', t.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(2)}%
                </span>
                <span className="text-[10px] text-gray-500 w-10">{t.daysHeld}d</span>
                <span className="text-[10px] text-gray-500 w-10">{rr.toFixed(1)}R</span>
                <Badge variant={t.status === 'Active' ? 'info' : t.status === 'Target Hit' ? 'success' : 'danger'}>
                  {t.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
