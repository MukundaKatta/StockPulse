'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { RefreshCw } from 'lucide-react';

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  targetWeight: number;
}

const HOLDINGS: Holding[] = [
  { symbol: 'VTI', name: 'Total US Stock', shares: 85, price: 238.50, targetWeight: 40 },
  { symbol: 'VXUS', name: 'Intl Stocks', shares: 60, price: 56.80, targetWeight: 20 },
  { symbol: 'BND', name: 'Total Bond', shares: 120, price: 72.40, targetWeight: 20 },
  { symbol: 'VNQ', name: 'Real Estate', shares: 25, price: 82.30, targetWeight: 10 },
  { symbol: 'GLD', name: 'Gold', shares: 10, price: 190.50, targetWeight: 5 },
  { symbol: 'VTIP', name: 'TIPS', shares: 30, price: 48.60, targetWeight: 5 },
];

export default function PortfolioRebalancePage() {
  const portfolio = HOLDINGS.map((h) => {
    const value = h.shares * h.price;
    return { ...h, value };
  });

  const totalValue = portfolio.reduce((s, h) => s + h.value, 0);
  const withWeights = portfolio.map((h) => ({
    ...h,
    currentWeight: (h.value / totalValue) * 100,
    targetValue: totalValue * (h.targetWeight / 100),
    drift: (h.value / totalValue) * 100 - h.targetWeight,
  }));

  const trades = withWeights.map((h) => {
    const diff = h.targetValue - h.value;
    const sharesNeeded = Math.round(diff / h.price);
    return { ...h, diff, sharesNeeded, action: diff > 0 ? 'BUY' as const : diff < 0 ? 'SELL' as const : 'HOLD' as const };
  });

  const maxDrift = Math.max(...withWeights.map((h) => Math.abs(h.drift)));
  const needsRebalance = maxDrift > 3;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Rebalance Tool</h1>
          <p className="mt-1 text-sm text-gray-500">Calculate trades to reach target allocation</p>
        </div>
        <Badge variant={needsRebalance ? 'warning' : 'success'}>{needsRebalance ? 'Drift Detected' : 'Balanced'}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Portfolio Value</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Max Drift</p><p className={cn('text-lg font-bold', maxDrift > 5 ? 'text-red-400' : maxDrift > 3 ? 'text-yellow-400' : 'text-green-400')}>{maxDrift.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><RefreshCw className="h-4 w-4 text-indigo-400" /> Rebalance Trades</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2">Symbol</th>
              <th className="text-right py-2 px-2">Current</th>
              <th className="text-right py-2 px-2">Target</th>
              <th className="text-right py-2 px-2">Drift</th>
              <th className="text-right py-2 px-2">Action</th>
              <th className="text-right py-2 px-2">Shares</th>
              <th className="text-right py-2 px-2">Amount</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {trades.map((t) => (
                <tr key={t.symbol} className="hover:bg-white/[0.02]">
                  <td className="py-2 px-2"><span className="text-indigo-400 font-medium">{t.symbol}</span><span className="text-gray-500 ml-1">{t.name}</span></td>
                  <td className="py-2 px-2 text-right font-mono text-gray-300">{t.currentWeight.toFixed(1)}%</td>
                  <td className="py-2 px-2 text-right font-mono text-white">{t.targetWeight}%</td>
                  <td className={cn('py-2 px-2 text-right font-mono', t.drift > 0 ? 'text-red-400' : t.drift < 0 ? 'text-green-400' : 'text-gray-500')}>{t.drift > 0 ? '+' : ''}{t.drift.toFixed(1)}%</td>
                  <td className="py-2 px-2 text-right"><Badge variant={t.action === 'BUY' ? 'success' : t.action === 'SELL' ? 'danger' : 'default'} className="text-[9px]">{t.action}</Badge></td>
                  <td className="py-2 px-2 text-right font-mono text-white">{Math.abs(t.sharesNeeded)}</td>
                  <td className={cn('py-2 px-2 text-right font-mono', t.diff > 0 ? 'text-green-400' : t.diff < 0 ? 'text-red-400' : 'text-gray-500')}>{formatCurrency(Math.abs(t.diff))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
