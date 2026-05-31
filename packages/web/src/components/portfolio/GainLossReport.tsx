'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Holding } from '@/types';

interface GainLossReportProps {
  holdings: Holding[];
  quotes: Record<string, { price: number } | undefined>;
}

export function GainLossReport({ holdings, quotes }: GainLossReportProps) {
  const report = useMemo(() => {
    return holdings.map((h) => {
      const price = quotes[h.symbol]?.price ?? h.avgCost;
      const marketValue = price * h.quantity;
      const gainLoss = marketValue - h.totalCost;
      const gainLossPercent = h.totalCost > 0 ? (gainLoss / h.totalCost) * 100 : 0;
      return { ...h, price, marketValue, gainLoss, gainLossPercent };
    }).sort((a, b) => b.gainLoss - a.gainLoss);
  }, [holdings, quotes]);

  const totalGain = report.reduce((sum, r) => sum + r.gainLoss, 0);
  const totalCost = report.reduce((sum, r) => sum + r.totalCost, 0);
  const totalPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

  const winners = report.filter((r) => r.gainLoss > 0);
  const losers = report.filter((r) => r.gainLoss < 0);

  if (holdings.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gain/Loss Report</CardTitle>
          <div className={cn('text-sm font-mono font-bold', totalGain >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)} ({totalPercent >= 0 ? '+' : ''}{totalPercent.toFixed(2)}%)
          </div>
        </div>
      </CardHeader>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg bg-green-500/5 border border-green-500/10 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Winners</span>
          </div>
          <p className="text-lg font-bold text-green-400">{winners.length}</p>
          <p className="text-xs text-gray-500">
            +{formatCurrency(winners.reduce((s, w) => s + w.gainLoss, 0))}
          </p>
        </div>
        <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingDown className="h-3.5 w-3.5 text-red-400" />
            <span className="text-xs text-red-400 font-medium">Losers</span>
          </div>
          <p className="text-lg font-bold text-red-400">{losers.length}</p>
          <p className="text-xs text-gray-500">
            {formatCurrency(losers.reduce((s, l) => s + l.gainLoss, 0))}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        {report.map((item) => (
          <div key={item.symbol} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-medium text-white">{item.symbol}</span>
              <span className="text-xs text-gray-500">{item.quantity.toFixed(2)} shares</span>
            </div>
            <div className="text-right">
              <span className={cn('text-sm font-mono font-medium', item.gainLoss >= 0 ? 'text-green-400' : 'text-red-400')}>
                {item.gainLoss >= 0 ? '+' : ''}{formatCurrency(item.gainLoss)}
              </span>
              <span className={cn('ml-2 text-xs', item.gainLossPercent >= 0 ? 'text-green-400/70' : 'text-red-400/70')}>
                ({item.gainLossPercent >= 0 ? '+' : ''}{item.gainLossPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
