'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { usePortfolioQuotes } from '@/hooks/usePortfolioQuotes';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import type { Trade } from '@/types';

interface TaxLot {
  symbol: string;
  buyDate: string;
  quantity: number;
  costBasis: number;
  currentPrice: number;
  gainLoss: number;
  gainLossPercent: number;
  holdingPeriod: 'short' | 'long';
  daysHeld: number;
}

export default function TaxLotsPage() {
  const { holdings, trades } = usePortfolioStore();
  const { quotes } = usePortfolioQuotes(holdings);

  const taxLots = useMemo(() => {
    const buyTrades = trades.filter((t) => t.type === 'BUY');
    const lots: TaxLot[] = [];

    for (const trade of buyTrades) {
      const price = quotes[trade.symbol]?.price ?? trade.price;
      const costBasis = trade.price * trade.quantity;
      const currentValue = price * trade.quantity;
      const gainLoss = currentValue - costBasis;
      const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
      const buyDate = new Date(trade.date);
      const daysHeld = Math.floor((Date.now() - buyDate.getTime()) / (1000 * 60 * 60 * 24));
      const holdingPeriod = daysHeld >= 365 ? 'long' : 'short';

      lots.push({
        symbol: trade.symbol,
        buyDate: trade.date,
        quantity: trade.quantity,
        costBasis,
        currentPrice: price,
        gainLoss,
        gainLossPercent,
        holdingPeriod,
        daysHeld,
      });
    }

    return lots.sort((a, b) => b.gainLoss - a.gainLoss);
  }, [trades, quotes]);

  const totalShortTermGain = taxLots.filter((l) => l.holdingPeriod === 'short').reduce((s, l) => s + l.gainLoss, 0);
  const totalLongTermGain = taxLots.filter((l) => l.holdingPeriod === 'long').reduce((s, l) => s + l.gainLoss, 0);
  const totalGain = totalShortTermGain + totalLongTermGain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Tax Lot Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Capital gains breakdown by holding period</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-xs text-gray-500 uppercase">Short-Term Gains</p>
          <p className={cn('text-lg font-bold font-mono', totalShortTermGain >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalShortTermGain >= 0 ? '+' : ''}{formatCurrency(totalShortTermGain)}
          </p>
          <p className="text-[10px] text-gray-600">Held &lt; 1 year (taxed as income)</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-gray-500 uppercase">Long-Term Gains</p>
          <p className={cn('text-lg font-bold font-mono', totalLongTermGain >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalLongTermGain >= 0 ? '+' : ''}{formatCurrency(totalLongTermGain)}
          </p>
          <p className="text-[10px] text-gray-600">Held &gt; 1 year (capital gains rate)</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-gray-500 uppercase">Total Unrealized</p>
          <p className={cn('text-lg font-bold font-mono', totalGain >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
          </p>
          <p className="text-[10px] text-gray-600">{taxLots.length} tax lots</p>
        </Card>
      </div>

      {/* Table */}
      {taxLots.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <Calculator className="mx-auto h-8 w-8 text-gray-600" />
            <p className="mt-3 text-sm text-gray-500">No tax lots to display</p>
            <p className="mt-1 text-xs text-gray-600">Add buy trades to see tax lot analysis</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                  <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Date</th>
                  <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Shares</th>
                  <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Cost Basis</th>
                  <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Gain/Loss</th>
                  <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Period</th>
                  <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Days</th>
                </tr>
              </thead>
              <tbody>
                {taxLots.map((lot, idx) => (
                  <tr key={idx} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-3 py-2.5">
                      <Link href={`/stock/${lot.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">
                        {lot.symbol}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-center text-xs text-gray-400">
                      {new Date(lot.buyDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-300">{lot.quantity.toFixed(2)}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-300">{formatCurrency(lot.costBasis)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className={cn('font-mono font-medium', lot.gainLoss >= 0 ? 'text-green-400' : 'text-red-400')}>
                        {lot.gainLoss >= 0 ? '+' : ''}{formatCurrency(lot.gainLoss)}
                      </span>
                      <span className={cn('ml-1 text-xs', lot.gainLossPercent >= 0 ? 'text-green-400/60' : 'text-red-400/60')}>
                        ({lot.gainLossPercent >= 0 ? '+' : ''}{lot.gainLossPercent.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant={lot.holdingPeriod === 'long' ? 'success' : 'warning'}>
                        {lot.holdingPeriod === 'long' ? 'Long' : 'Short'}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-center text-xs text-gray-500">{lot.daysHeld}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
