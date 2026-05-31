'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { usePortfolioQuotes } from '@/hooks/usePortfolioQuotes';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { BarChart3, TrendingUp, TrendingDown, Activity, Target, Shield } from 'lucide-react';

export default function AnalyticsPage() {
  const { holdings, trades } = usePortfolioStore();
  const { quotes } = usePortfolioQuotes(holdings);

  const metrics = useMemo(() => {
    if (holdings.length === 0) return null;

    let totalCost = 0;
    let totalValue = 0;
    let totalFees = 0;
    const returns: number[] = [];

    for (const h of holdings) {
      const price = quotes[h.symbol]?.price ?? h.avgCost;
      const value = price * h.quantity;
      const gain = value - h.totalCost;
      const ret = h.totalCost > 0 ? gain / h.totalCost : 0;

      totalCost += h.totalCost;
      totalValue += value;
      totalFees += h.totalFees;
      returns.push(ret);
    }

    const totalReturn = totalCost > 0 ? (totalValue - totalCost) / totalCost : 0;
    const avgReturn = returns.length > 0 ? returns.reduce((a, b) => a + b, 0) / returns.length : 0;
    const winRate = returns.filter((r) => r > 0).length / returns.length;

    // Simplified Sharpe-like ratio
    const mean = avgReturn;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);
    const sharpe = stdDev > 0 ? mean / stdDev : 0;

    // Max drawdown (simplified)
    let maxDrawdown = 0;
    for (const r of returns) {
      if (r < maxDrawdown) maxDrawdown = r;
    }

    return {
      totalCost,
      totalValue,
      totalReturn,
      totalFees,
      avgReturn,
      winRate,
      sharpe,
      maxDrawdown,
      numPositions: holdings.length,
      numTrades: trades.length,
    };
  }, [holdings, trades, quotes]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Performance metrics and risk analysis</p>
      </div>

      {!metrics ? (
        <Card>
          <div className="py-12 text-center">
            <BarChart3 className="mx-auto h-8 w-8 text-gray-600" />
            <p className="mt-3 text-sm text-gray-500">No holdings to analyze</p>
            <p className="mt-1 text-xs text-gray-600">Add trades to your portfolio to see analytics</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-medium text-gray-500">Total Return</span>
              </div>
              <p className={cn('text-xl font-bold', metrics.totalReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                {(metrics.totalReturn * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {metrics.totalReturn >= 0 ? '+' : ''}{formatCurrency(metrics.totalValue - metrics.totalCost)}
              </p>
            </Card>
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-400" />
                <span className="text-xs font-medium text-gray-500">Win Rate</span>
              </div>
              <p className="text-xl font-bold text-white">{(metrics.winRate * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {Math.round(metrics.winRate * metrics.numPositions)}/{metrics.numPositions} positions
              </p>
            </Card>
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium text-gray-500">Sharpe Ratio</span>
              </div>
              <p className={cn('text-xl font-bold', metrics.sharpe > 1 ? 'text-green-400' : metrics.sharpe > 0 ? 'text-amber-400' : 'text-red-400')}>
                {metrics.sharpe.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {metrics.sharpe > 1 ? 'Good' : metrics.sharpe > 0 ? 'Fair' : 'Poor'}
              </p>
            </Card>
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-red-400" />
                <span className="text-xs font-medium text-gray-500">Max Drawdown</span>
              </div>
              <p className="text-xl font-bold text-red-400">
                {(metrics.maxDrawdown * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Worst position</p>
            </Card>
          </div>

          {/* Detail cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Summary</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {[
                  { label: 'Total Invested', value: formatCurrency(metrics.totalCost) },
                  { label: 'Current Value', value: formatCurrency(metrics.totalValue) },
                  { label: 'Total Fees Paid', value: formatCurrency(metrics.totalFees) },
                  { label: 'Active Positions', value: String(metrics.numPositions) },
                  { label: 'Total Trades', value: String(metrics.numTrades) },
                  { label: 'Avg Return/Position', value: `${(metrics.avgReturn * 100).toFixed(2)}%` },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
                    <span className="text-sm text-gray-400">{row.label}</span>
                    <span className="text-sm font-mono font-medium text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Concentration Risk</span>
                    <span className="text-gray-400">
                      {holdings.length < 5 ? 'High' : holdings.length < 10 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        holdings.length < 5 ? 'bg-red-500 w-4/5' : holdings.length < 10 ? 'bg-amber-500 w-1/2' : 'bg-green-500 w-1/4'
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Volatility</span>
                    <span className="text-gray-400">
                      {Math.abs(metrics.maxDrawdown) > 0.2 ? 'High' : Math.abs(metrics.maxDrawdown) > 0.1 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        Math.abs(metrics.maxDrawdown) > 0.2 ? 'bg-red-500 w-3/4' : Math.abs(metrics.maxDrawdown) > 0.1 ? 'bg-amber-500 w-1/2' : 'bg-green-500 w-1/4'
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Win Rate Quality</span>
                    <span className="text-gray-400">
                      {metrics.winRate > 0.6 ? 'Strong' : metrics.winRate > 0.4 ? 'Average' : 'Weak'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        metrics.winRate > 0.6 ? 'bg-green-500' : metrics.winRate > 0.4 ? 'bg-amber-500' : 'bg-red-500'
                      )}
                      style={{ width: `${metrics.winRate * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </motion.div>
  );
}
