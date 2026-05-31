'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sparkline } from '@/components/ui/sparkline';
import { formatCurrency, formatLargeNumber, formatPercent, cn } from '@/lib/formatters';
import { Search, Layers } from 'lucide-react';
import Link from 'next/link';

interface ETF {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  aum: number;
  expenseRatio: number;
  category: string;
  sparkline: number[];
}

function genSparkline(price: number, change: number): number[] {
  const pts: number[] = [];
  const start = price / (1 + change / 100);
  for (let i = 0; i <= 20; i++) {
    pts.push(start + (price - start) * (i / 20) + (Math.random() - 0.5) * price * 0.003);
  }
  return pts;
}

const ETFS: ETF[] = [
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 528.45, change: 2.34, changePercent: 0.44, aum: 562000000000, expenseRatio: 0.09, category: 'Large Cap' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 451.23, change: 4.12, changePercent: 0.92, aum: 245000000000, expenseRatio: 0.20, category: 'Tech' },
  { symbol: 'IWM', name: 'iShares Russell 2000', price: 208.67, change: -1.23, changePercent: -0.59, aum: 67000000000, expenseRatio: 0.19, category: 'Small Cap' },
  { symbol: 'VTI', name: 'Vanguard Total Stock', price: 270.89, change: 1.56, changePercent: 0.58, aum: 380000000000, expenseRatio: 0.03, category: 'Total Market' },
  { symbol: 'ARKK', name: 'ARK Innovation', price: 48.92, change: 1.89, changePercent: 4.02, aum: 7500000000, expenseRatio: 0.75, category: 'Growth' },
  { symbol: 'XLF', name: 'Financial Select SPDR', price: 42.15, change: 0.34, changePercent: 0.81, aum: 35000000000, expenseRatio: 0.10, category: 'Financials' },
  { symbol: 'XLE', name: 'Energy Select SPDR', price: 89.34, change: -0.67, changePercent: -0.75, aum: 37000000000, expenseRatio: 0.10, category: 'Energy' },
  { symbol: 'GLD', name: 'SPDR Gold Shares', price: 221.45, change: 0.89, changePercent: 0.40, aum: 57000000000, expenseRatio: 0.40, category: 'Commodity' },
  { symbol: 'TLT', name: 'iShares 20+ Year Treasury', price: 92.78, change: 0.45, changePercent: 0.49, aum: 46000000000, expenseRatio: 0.15, category: 'Bonds' },
  { symbol: 'VWO', name: 'Vanguard Emerging Markets', price: 42.56, change: -0.23, changePercent: -0.54, aum: 78000000000, expenseRatio: 0.08, category: 'Intl' },
].map((e) => ({ ...e, sparkline: genSparkline(e.price, e.changePercent) }));

export default function ETFPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = ['all', ...new Set(ETFS.map((e) => e.category))];

  const filtered = ETFS.filter((etf) => {
    if (search && !etf.symbol.toLowerCase().includes(search.toLowerCase()) && !etf.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'all' && etf.category !== category) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">ETF Explorer</h1>
          <p className="mt-1 text-sm text-gray-500">Browse and compare exchange-traded funds</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ETFs..." className="pl-9 w-48" />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              category === cat ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-500 border border-white/[0.06] hover:text-gray-300'
            )}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">ETF</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Price</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Change</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500 hidden sm:table-cell">AUM</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500 hidden md:table-cell">Expense</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500 hidden sm:table-cell">Category</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500 hidden lg:table-cell">Chart</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((etf) => (
                <tr key={etf.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-3">
                    <Link href={`/stock/${etf.symbol}`} className="block">
                      <span className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{etf.symbol}</span>
                      <p className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[180px]">{etf.name}</p>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-white">{formatCurrency(etf.price)}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={cn('font-mono text-xs', etf.changePercent >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {etf.changePercent >= 0 ? '+' : ''}{etf.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-gray-400 hidden sm:table-cell">{formatLargeNumber(etf.aum)}</td>
                  <td className="px-3 py-3 text-right font-mono text-gray-400 hidden md:table-cell">{etf.expenseRatio.toFixed(2)}%</td>
                  <td className="px-3 py-3 text-center hidden sm:table-cell">
                    <Badge variant="info">{etf.category}</Badge>
                  </td>
                  <td className="px-3 py-3 text-right hidden lg:table-cell">
                    <Sparkline data={etf.sparkline} width={60} height={20} />
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
