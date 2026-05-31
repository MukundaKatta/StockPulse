'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface BenchmarkData {
  name: string;
  symbol: string;
  return1M: number;
  return3M: number;
  return1Y: number;
  returnYTD: number;
  sharpe: number;
  maxDrawdown: number;
}

const BENCHMARKS: BenchmarkData[] = [
  { name: 'Your Portfolio', symbol: 'PORT', return1M: 3.2, return3M: 8.5, return1Y: 22.4, returnYTD: 12.8, sharpe: 1.45, maxDrawdown: -8.2 },
  { name: 'S&P 500', symbol: 'SPY', return1M: 2.1, return3M: 6.8, return1Y: 18.5, returnYTD: 10.2, sharpe: 1.12, maxDrawdown: -10.5 },
  { name: 'Nasdaq 100', symbol: 'QQQ', return1M: 3.5, return3M: 9.2, return1Y: 28.3, returnYTD: 14.5, sharpe: 1.28, maxDrawdown: -12.8 },
  { name: 'Russell 2000', symbol: 'IWM', return1M: 1.2, return3M: 3.5, return1Y: 8.2, returnYTD: 4.8, sharpe: 0.65, maxDrawdown: -15.2 },
  { name: 'Total Bond', symbol: 'BND', return1M: 0.3, return3M: 1.2, return1Y: 3.8, returnYTD: 2.1, sharpe: 0.42, maxDrawdown: -4.5 },
  { name: '60/40 Portfolio', symbol: '60/40', return1M: 1.5, return3M: 4.8, return1Y: 12.8, returnYTD: 7.2, sharpe: 0.95, maxDrawdown: -7.8 },
];

export default function BenchmarkPage() {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '1Y' | 'YTD'>('YTD');

  const getReturn = (b: BenchmarkData) => {
    if (timeframe === '1M') return b.return1M;
    if (timeframe === '3M') return b.return3M;
    if (timeframe === '1Y') return b.return1Y;
    return b.returnYTD;
  };

  const portfolio = BENCHMARKS[0];
  const sorted = [...BENCHMARKS].sort((a, b) => getReturn(b) - getReturn(a));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Benchmark Comparison</h1>
          <p className="mt-1 text-sm text-gray-500">Compare your portfolio against major indices</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {(['1M', '3M', '1Y', 'YTD'] as const).map((t) => (
            <button key={t} onClick={() => setTimeframe(t)}
              className={cn('rounded-md px-3 py-1.5 text-xs font-medium transition-colors', timeframe === t ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Alpha Card */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase mb-1">Alpha vs S&P 500</p>
          <p className={cn('text-xl font-bold font-mono', getReturn(portfolio) - getReturn(BENCHMARKS[1]) >= 0 ? 'text-green-400' : 'text-red-400')}>
            {getReturn(portfolio) - getReturn(BENCHMARKS[1]) >= 0 ? '+' : ''}
            {(getReturn(portfolio) - getReturn(BENCHMARKS[1])).toFixed(2)}%
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase mb-1">Sharpe Ratio</p>
          <p className={cn('text-xl font-bold font-mono', portfolio.sharpe >= 1.0 ? 'text-green-400' : 'text-amber-400')}>
            {portfolio.sharpe.toFixed(2)}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase mb-1">Max Drawdown</p>
          <p className="text-xl font-bold font-mono text-red-400">{portfolio.maxDrawdown.toFixed(1)}%</p>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-indigo-400" />
            Performance Comparison
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Benchmark</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Return</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">vs Portfolio</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Sharpe</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Max DD</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => {
                const ret = getReturn(b);
                const diff = getReturn(portfolio) - ret;
                const isPortfolio = b.symbol === 'PORT';
                return (
                  <tr key={b.symbol} className={cn('border-b border-white/[0.03]', isPortfolio && 'bg-indigo-500/5')}>
                    <td className="px-3 py-2.5">
                      <span className={cn('font-medium text-sm', isPortfolio ? 'text-indigo-400' : 'text-white')}>{b.name}</span>
                      <span className="ml-2 text-[10px] text-gray-600 font-mono">{b.symbol}</span>
                    </td>
                    <td className={cn('px-3 py-2.5 text-right font-mono', ret >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {ret >= 0 ? '+' : ''}{ret.toFixed(2)}%
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-xs">
                      {!isPortfolio && (
                        <span className={cn(diff >= 0 ? 'text-green-400' : 'text-red-400')}>
                          {diff >= 0 ? '+' : ''}{diff.toFixed(2)}%
                        </span>
                      )}
                      {isPortfolio && <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-400">{b.sharpe.toFixed(2)}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-red-400/70">{b.maxDrawdown.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
