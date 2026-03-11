'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import api from '@/lib/api';

interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const INDICES = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'QQQ', name: 'NASDAQ 100' },
  { symbol: 'DIA', name: 'Dow Jones' },
  { symbol: 'IWM', name: 'Russell 2000' },
];

export function MarketOverview() {
  const { data: indices, isLoading } = useQuery({
    queryKey: ['market-indices'],
    queryFn: async () => {
      const results: MarketIndex[] = [];
      const settled = await Promise.allSettled(
        INDICES.map(async (idx) => {
          const { data } = await api.get(`/api/stocks/${idx.symbol}/quote`);
          return {
            symbol: idx.symbol,
            name: idx.name,
            price: data.quote.price,
            change: data.quote.change,
            changePercent: data.quote.changePercent,
          };
        })
      );
      for (const result of settled) {
        if (result.status === 'fulfilled') results.push(result.value);
      }
      return results;
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {INDICES.map((idx) => (
          <div key={idx.symbol} className="rounded-xl border border-white/[0.06] bg-[#12121a] p-4 animate-pulse">
            <div className="h-3 w-16 rounded bg-white/5 mb-2" />
            <div className="h-5 w-20 rounded bg-white/5 mb-1" />
            <div className="h-3 w-12 rounded bg-white/5" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-400">
        <Activity className="h-4 w-4" />
        Market Overview
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(indices || []).map((idx) => {
          const isPositive = idx.change >= 0;
          return (
            <Card key={idx.symbol} className="!p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">{idx.name}</span>
                {isPositive
                  ? <TrendingUp className="h-3 w-3 text-green-400" />
                  : <TrendingDown className="h-3 w-3 text-red-400" />
                }
              </div>
              <div className="font-mono text-base font-bold text-white">
                {formatCurrency(idx.price)}
              </div>
              <div className={cn('font-mono text-xs font-medium mt-0.5', isPositive ? 'text-green-400' : 'text-red-400')}>
                {isPositive ? '+' : ''}{formatPercent(idx.changePercent)}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
