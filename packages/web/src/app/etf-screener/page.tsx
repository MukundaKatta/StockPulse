'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Search, Filter } from 'lucide-react';

interface ETF {
  symbol: string;
  name: string;
  category: string;
  aum: number;
  expenseRatio: number;
  ytdReturn: number;
  dividend: number;
  holdings: number;
}

const ETFS: ETF[] = [
  { symbol: 'SPY', name: 'SPDR S&P 500', category: 'Large Blend', aum: 500e9, expenseRatio: 0.09, ytdReturn: 24.5, dividend: 1.35, holdings: 503 },
  { symbol: 'QQQ', name: 'Invesco QQQ', category: 'Large Growth', aum: 220e9, expenseRatio: 0.20, ytdReturn: 54.8, dividend: 0.55, holdings: 101 },
  { symbol: 'VTI', name: 'Vanguard Total Market', category: 'Total Market', aum: 380e9, expenseRatio: 0.03, ytdReturn: 25.1, dividend: 1.42, holdings: 3945 },
  { symbol: 'IWM', name: 'iShares Russell 2000', category: 'Small Blend', aum: 60e9, expenseRatio: 0.19, ytdReturn: 15.8, dividend: 1.28, holdings: 1973 },
  { symbol: 'EFA', name: 'iShares MSCI EAFE', category: 'Foreign Large', aum: 55e9, expenseRatio: 0.32, ytdReturn: 15.2, dividend: 2.95, holdings: 783 },
  { symbol: 'AGG', name: 'iShares Core Agg Bond', category: 'Bond', aum: 100e9, expenseRatio: 0.03, ytdReturn: 4.8, dividend: 3.45, holdings: 11532 },
  { symbol: 'GLD', name: 'SPDR Gold Shares', category: 'Commodities', aum: 58e9, expenseRatio: 0.40, ytdReturn: 12.4, dividend: 0, holdings: 1 },
  { symbol: 'XLK', name: 'Technology Select SPDR', category: 'Technology', aum: 55e9, expenseRatio: 0.10, ytdReturn: 56.2, dividend: 0.72, holdings: 65 },
  { symbol: 'VNQ', name: 'Vanguard Real Estate', category: 'Real Estate', aum: 35e9, expenseRatio: 0.12, ytdReturn: 9.3, dividend: 3.85, holdings: 164 },
  { symbol: 'XLE', name: 'Energy Select SPDR', category: 'Energy', aum: 38e9, expenseRatio: 0.10, ytdReturn: -2.1, dividend: 3.52, holdings: 23 },
];

export default function ETFScreenerPage() {
  const [sortBy, setSortBy] = useState<'aum' | 'ytdReturn' | 'expenseRatio' | 'dividend'>('aum');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...ETFS].sort((a, b) => {
    const mul = sortDir === 'desc' ? -1 : 1;
    return (a[sortBy] - b[sortBy]) * mul;
  });

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else { setSortBy(col); setSortDir('desc'); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">ETF Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Compare top ETFs by category, returns, and costs</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-white/5">
                <th className="text-left py-2.5 px-2 font-medium">Symbol</th>
                <th className="text-left py-2.5 px-2 font-medium">Name</th>
                <th className="text-left py-2.5 px-2 font-medium">Category</th>
                <th className="text-right py-2.5 px-2 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('aum')}>
                  AUM {sortBy === 'aum' && (sortDir === 'desc' ? '↓' : '↑')}
                </th>
                <th className="text-right py-2.5 px-2 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('expenseRatio')}>
                  Exp. Ratio {sortBy === 'expenseRatio' && (sortDir === 'desc' ? '↓' : '↑')}
                </th>
                <th className="text-right py-2.5 px-2 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('ytdReturn')}>
                  YTD {sortBy === 'ytdReturn' && (sortDir === 'desc' ? '↓' : '↑')}
                </th>
                <th className="text-right py-2.5 px-2 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('dividend')}>
                  Div Yield {sortBy === 'dividend' && (sortDir === 'desc' ? '↓' : '↑')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sorted.map((etf) => (
                <tr key={etf.symbol} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-2 font-medium text-indigo-400">{etf.symbol}</td>
                  <td className="py-2.5 px-2 text-gray-300 max-w-[140px] truncate">{etf.name}</td>
                  <td className="py-2.5 px-2">
                    <Badge variant="info" className="text-[9px]">{etf.category}</Badge>
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-gray-300">
                    ${(etf.aum / 1e9).toFixed(0)}B
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-gray-300">{etf.expenseRatio.toFixed(2)}%</td>
                  <td className={cn('py-2.5 px-2 text-right font-mono', etf.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {etf.ytdReturn >= 0 ? '+' : ''}{etf.ytdReturn.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-yellow-400">{etf.dividend.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
