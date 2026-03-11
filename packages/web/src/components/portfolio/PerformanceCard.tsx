'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import type { Holding, StockQuote } from '@/types';

interface PerformanceCardProps {
  holdings: Holding[];
  quotes?: Record<string, StockQuote>;
}

export function PerformanceCard({ holdings, quotes = {} }: PerformanceCardProps) {
  const totalCostBasis = holdings.reduce((sum, h) => sum + h.totalCost, 0);
  const totalFees = holdings.reduce((sum, h) => sum + h.totalFees, 0);

  const totalMarketValue = holdings.reduce((sum, h) => {
    const quote = quotes[h.symbol];
    return sum + (quote ? quote.price * h.quantity : h.totalCost);
  }, 0);

  const unrealizedPL = totalMarketValue - totalCostBasis;
  const unrealizedPLPercent = totalCostBasis > 0 ? (unrealizedPL / totalCostBasis) * 100 : 0;
  const isPositive = unrealizedPL >= 0;

  const todayChange = holdings.reduce((sum, h) => {
    const quote = quotes[h.symbol];
    return sum + (quote ? quote.change * h.quantity : 0);
  }, 0);
  const todayPositive = todayChange >= 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <Card hover>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-indigo-400" />
            Market Value
          </CardTitle>
        </CardHeader>
        <div className="font-mono text-xl sm:text-2xl font-bold text-white">
          {formatCurrency(totalMarketValue)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Cost: {formatCurrency(totalCostBasis)}
        </div>
      </Card>

      <Card hover>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            {isPositive
              ? <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              : <TrendingDown className="h-3.5 w-3.5 text-red-400" />}
            Total P&L
          </CardTitle>
        </CardHeader>
        <div className={cn('font-mono text-xl sm:text-2xl font-bold', isPositive ? 'text-green-400' : 'text-red-400')}>
          {isPositive ? '+' : ''}{formatCurrency(unrealizedPL)}
        </div>
        <div className={cn('text-xs font-mono mt-1', isPositive ? 'text-green-400/70' : 'text-red-400/70')}>
          {formatPercent(unrealizedPLPercent)}
        </div>
      </Card>

      <Card hover>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            {todayPositive
              ? <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              : <TrendingDown className="h-3.5 w-3.5 text-red-400" />}
            Today
          </CardTitle>
        </CardHeader>
        <div className={cn('font-mono text-xl sm:text-2xl font-bold', todayPositive ? 'text-green-400' : 'text-red-400')}>
          {todayPositive ? '+' : ''}{formatCurrency(todayChange)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {holdings.length} position{holdings.length !== 1 ? 's' : ''}
        </div>
      </Card>

      <Card hover>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            <Receipt className="h-3.5 w-3.5 text-amber-400" />
            Total Fees
          </CardTitle>
        </CardHeader>
        <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">
          {formatCurrency(totalFees)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          across all trades
        </div>
      </Card>
    </div>
  );
}
