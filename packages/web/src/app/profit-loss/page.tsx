'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface PnLItem {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  dayChange: number;
}

const PNL_DATA: PnLItem[] = [
  { symbol: 'NVDA', shares: 15, avgCost: 450.00, currentPrice: 875.20, totalCost: 6750, currentValue: 13128, pnl: 6378, pnlPercent: 94.5, dayChange: 3.5 },
  { symbol: 'AAPL', shares: 50, avgCost: 155.00, currentPrice: 189.45, totalCost: 7750, currentValue: 9472.50, pnl: 1722.50, pnlPercent: 22.2, dayChange: 1.2 },
  { symbol: 'MSFT', shares: 20, avgCost: 340.00, currentPrice: 415.60, totalCost: 6800, currentValue: 8312, pnl: 1512, pnlPercent: 22.2, dayChange: 0.8 },
  { symbol: 'AMZN', shares: 30, avgCost: 145.00, currentPrice: 178.90, totalCost: 4350, currentValue: 5367, pnl: 1017, pnlPercent: 23.4, dayChange: 2.1 },
  { symbol: 'TSLA', shares: 25, avgCost: 280.00, currentPrice: 245.80, totalCost: 7000, currentValue: 6145, pnl: -855, pnlPercent: -12.2, dayChange: -2.8 },
  { symbol: 'META', shares: 10, avgCost: 320.00, currentPrice: 485.30, totalCost: 3200, currentValue: 4853, pnl: 1653, pnlPercent: 51.7, dayChange: 1.5 },
  { symbol: 'GOOGL', shares: 40, avgCost: 130.00, currentPrice: 155.80, totalCost: 5200, currentValue: 6232, pnl: 1032, pnlPercent: 19.8, dayChange: -0.5 },
  { symbol: 'AMD', shares: 35, avgCost: 160.00, currentPrice: 172.60, totalCost: 5600, currentValue: 6041, pnl: 441, pnlPercent: 7.9, dayChange: -1.2 },
];

export default function ProfitLossPage() {
  const [sortBy, setSortBy] = useState<'pnl' | 'pnlPercent' | 'dayChange'>('pnl');

  const sorted = [...PNL_DATA].sort((a, b) => {
    if (sortBy === 'pnl') return b.pnl - a.pnl;
    if (sortBy === 'pnlPercent') return b.pnlPercent - a.pnlPercent;
    return b.dayChange - a.dayChange;
  });

  const totalPnL = PNL_DATA.reduce((sum, p) => sum + p.pnl, 0);
  const totalCost = PNL_DATA.reduce((sum, p) => sum + p.totalCost, 0);
  const totalValue = PNL_DATA.reduce((sum, p) => sum + p.currentValue, 0);
  const totalPnLPercent = (totalPnL / totalCost) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Profit & Loss</h1>
        <p className="mt-1 text-sm text-gray-500">Unrealized gains and losses by position</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-3.5 w-3.5 text-green-400" />
            <span className="text-[10px] text-gray-500 uppercase">Total P&L</span>
          </div>
          <p className={cn('text-lg font-bold font-mono', totalPnL >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
          </p>
          <p className={cn('text-xs font-mono', totalPnLPercent >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(1)}%
          </p>
        </Card>
        <Card className="!p-4">
          <span className="text-[10px] text-gray-500 uppercase">Total Cost</span>
          <p className="text-lg font-bold text-white">{formatCurrency(totalCost)}</p>
        </Card>
        <Card className="!p-4">
          <span className="text-[10px] text-gray-500 uppercase">Current Value</span>
          <p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p>
        </Card>
      </div>

      <div className="flex gap-2">
        {([
          { key: 'pnl' as const, label: 'P&L $' },
          { key: 'pnlPercent' as const, label: 'P&L %' },
          { key: 'dayChange' as const, label: 'Today' },
        ]).map(({ key, label }) => (
          <button key={key} onClick={() => setSortBy(key)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors', sortBy === key ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{label}</button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Shares</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Avg Cost</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Current</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">P&L</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">P&L %</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Today</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => (
                <tr key={item.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5 font-mono font-bold text-indigo-400">{item.symbol}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-400">{item.shares}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-400">{formatCurrency(item.avgCost)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-white">{formatCurrency(item.currentPrice)}</td>
                  <td className={cn('px-3 py-2.5 text-right font-mono font-medium', item.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {item.pnl >= 0 ? '+' : ''}{formatCurrency(item.pnl)}
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', item.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {item.pnlPercent >= 0 ? '+' : ''}{item.pnlPercent.toFixed(1)}%
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', item.dayChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {item.dayChange >= 0 ? '+' : ''}{item.dayChange.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
