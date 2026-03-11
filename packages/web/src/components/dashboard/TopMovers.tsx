'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

interface StockMover {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const MOVER_SYMBOLS = ['NVDA', 'META', 'AMD', 'TSLA', 'NFLX', 'COIN', 'PLTR', 'SOFI'];

export function TopMovers() {
  const { data: movers, isLoading } = useQuery({
    queryKey: ['top-movers'],
    queryFn: async () => {
      const results: StockMover[] = [];
      const settled = await Promise.allSettled(
        MOVER_SYMBOLS.map(async (symbol) => {
          const { data } = await api.get(`/api/stocks/${symbol}/quote`);
          return {
            symbol,
            price: data.quote.price,
            change: data.quote.change,
            changePercent: data.quote.changePercent,
          };
        })
      );
      for (const result of settled) {
        if (result.status === 'fulfilled') results.push(result.value);
      }
      return results.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
    },
    staleTime: 60000,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Flame className="mr-1 inline h-4 w-4 text-amber-400" />
          Top Movers
        </CardTitle>
      </CardHeader>
      <div className="space-y-1">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 animate-pulse">
              <div className="h-3 w-12 rounded bg-white/5" />
              <div className="h-3 w-16 rounded bg-white/5" />
            </div>
          ))
        ) : (
          movers?.slice(0, 6).map((stock) => {
            const isPositive = stock.change >= 0;
            return (
              <Link
                key={stock.symbol}
                href={`/stock/${stock.symbol}`}
                className="flex items-center justify-between rounded-lg px-2 py-2 transition-all hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  {isPositive
                    ? <TrendingUp className="h-3 w-3 text-green-400" />
                    : <TrendingDown className="h-3 w-3 text-red-400" />
                  }
                  <span className="font-mono text-sm font-medium text-white">{stock.symbol}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-gray-400">{formatCurrency(stock.price)}</span>
                  <span className={cn(
                    'font-mono text-xs font-medium rounded px-1.5 py-0.5',
                    isPositive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
                  )}>
                    {formatPercent(stock.changePercent)}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </Card>
  );
}
