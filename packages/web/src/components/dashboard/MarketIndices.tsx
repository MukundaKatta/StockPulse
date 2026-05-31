'use client';

import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Sparkline } from '@/components/ui/sparkline';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';
import api from '@/lib/api';

interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

const INDICES: { symbol: string; name: string; short: string }[] = [
  { symbol: 'SPY', name: 'S&P 500', short: 'SPX' },
  { symbol: 'QQQ', name: 'Nasdaq 100', short: 'NDX' },
  { symbol: 'DIA', name: 'Dow Jones', short: 'DJI' },
  { symbol: 'IWM', name: 'Russell 2000', short: 'RUT' },
];

function generateSparkline(basePrice: number, changePercent: number): number[] {
  const points: number[] = [];
  const steps = 20;
  const startPrice = basePrice / (1 + changePercent / 100);
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const noise = (Math.random() - 0.5) * basePrice * 0.002;
    points.push(startPrice + (basePrice - startPrice) * progress + noise);
  }
  return points;
}

export function MarketIndices() {
  const { data: indices } = useQuery({
    queryKey: ['market-indices'],
    queryFn: async () => {
      try {
        const { data } = await api.post('/api/stocks/batch/quotes', {
          symbols: INDICES.map((i) => i.symbol),
        });
        return INDICES.map((idx) => {
          const quote = data.quotes?.[idx.symbol];
          if (!quote) return null;
          return {
            symbol: idx.symbol,
            name: idx.name,
            short: idx.short,
            price: quote.price,
            change: quote.change,
            changePercent: quote.changePercent,
            sparkline: generateSparkline(quote.price, quote.changePercent),
          };
        }).filter(Boolean) as (IndexData & { short: string })[];
      } catch {
        return INDICES.map((idx) => ({
          symbol: idx.symbol,
          name: idx.name,
          short: idx.short,
          price: 0,
          change: 0,
          changePercent: 0,
          sparkline: [],
        }));
      }
    },
    staleTime: 60000,
    refetchInterval: 60000,
  });

  if (!indices || indices.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {indices.map((idx) => {
        const positive = idx.change >= 0;
        return (
          <Card key={idx.symbol} className="!p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">{idx.short}</p>
                <p className="mt-0.5 font-mono text-sm font-bold text-white">
                  {idx.price > 0 ? formatCurrency(idx.price) : '—'}
                </p>
              </div>
              {idx.sparkline.length > 2 && (
                <Sparkline data={idx.sparkline} width={48} height={20} />
              )}
            </div>
            <div className="mt-1.5 flex items-center gap-1">
              {positive ? (
                <TrendingUp className="h-3 w-3 text-green-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={cn('text-xs font-mono font-medium', positive ? 'text-green-400' : 'text-red-400')}>
                {positive ? '+' : ''}{formatPercent(idx.changePercent)}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
