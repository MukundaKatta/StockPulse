'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

const DIVIDEND_STOCKS = [
  'JNJ', 'PG', 'KO', 'PEP', 'MCD', 'XOM', 'ABBV', 'CVX',
  'HD', 'VZ', 'T', 'MO', 'PM', 'IBM', 'MMM', 'CAT',
];

interface DividendInfo {
  symbol: string;
  yield: number;
  price: number;
  changePercent: number;
}

export default function DividendsPage() {
  const [sortBy, setSortBy] = useState<'yield' | 'symbol'>('yield');

  const { data: stocks = [], isLoading } = useQuery({
    queryKey: ['dividend-stocks'],
    queryFn: async () => {
      const results: DividendInfo[] = [];
      const batchSize = 5;
      for (let i = 0; i < DIVIDEND_STOCKS.length; i += batchSize) {
        const batch = DIVIDEND_STOCKS.slice(i, i + batchSize);
        const batchResults = await Promise.allSettled(
          batch.map(async (symbol) => {
            const [quoteRes, overviewRes] = await Promise.allSettled([
              api.get(`/api/stocks/${symbol}/quote`),
              api.get(`/api/stocks/${symbol}/overview`),
            ]);
            const quote = quoteRes.status === 'fulfilled' ? quoteRes.value.data.quote : null;
            const overview = overviewRes.status === 'fulfilled' ? overviewRes.value.data.overview : null;
            const dividendYield = overview?.DividendYield ? parseFloat(overview.DividendYield) * 100 : 0;
            return {
              symbol,
              yield: dividendYield,
              price: quote?.price ?? 0,
              changePercent: quote?.changePercent ?? 0,
            };
          })
        );
        for (const r of batchResults) {
          if (r.status === 'fulfilled') results.push(r.value);
        }
      }
      return results;
    },
    staleTime: 300000,
  });

  const sorted = [...stocks].sort((a, b) => {
    if (sortBy === 'yield') return b.yield - a.yield;
    return a.symbol.localeCompare(b.symbol);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dividend Stocks</h1>
          <p className="mt-1 text-sm text-gray-500">High-yield dividend aristocrats</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('yield')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors',
              sortBy === 'yield' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/[0.06]'
            )}
          >
            By Yield
          </button>
          <button
            onClick={() => setSortBy('symbol')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors',
              sortBy === 'symbol' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/[0.06]'
            )}
          >
            A-Z
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sorted.map((stock) => (
            <Link key={stock.symbol} href={`/stock/${stock.symbol}`}>
              <Card hover>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-white">{stock.symbol}</span>
                  <Badge variant={stock.changePercent >= 0 ? 'success' : 'danger'}>
                    {formatPercent(stock.changePercent)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-sm font-mono text-gray-300">{formatCurrency(stock.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Yield</p>
                    <p className="text-sm font-mono font-bold text-green-400">{stock.yield.toFixed(2)}%</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
