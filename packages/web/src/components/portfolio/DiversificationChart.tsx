'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import type { Holding } from '@/types';

interface DiversificationChartProps {
  holdings: Holding[];
  quotes: Record<string, { price: number } | undefined>;
}

const COLORS = [
  'bg-indigo-500', 'bg-purple-500', 'bg-blue-500', 'bg-cyan-500',
  'bg-green-500', 'bg-amber-500', 'bg-rose-500', 'bg-orange-500',
  'bg-teal-500', 'bg-pink-500',
];

export function DiversificationChart({ holdings, quotes }: DiversificationChartProps) {
  const data = useMemo(() => {
    if (holdings.length === 0) return [];

    const items = holdings.map((h) => {
      const price = quotes[h.symbol]?.price ?? h.avgCost;
      return { symbol: h.symbol, value: price * h.quantity };
    }).sort((a, b) => b.value - a.value);

    const total = items.reduce((sum, i) => sum + i.value, 0);
    if (total <= 0) return [];

    return items.map((item, idx) => ({
      ...item,
      percent: (item.value / total) * 100,
      color: COLORS[idx % COLORS.length],
    }));
  }, [holdings, quotes]);

  if (data.length === 0) return null;

  const topHolding = data[0];
  const isConcentrated = topHolding && topHolding.percent > 40;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diversification</CardTitle>
      </CardHeader>

      {/* Bar chart */}
      <div className="flex h-4 overflow-hidden rounded-full">
        {data.map((item) => (
          <div
            key={item.symbol}
            className={cn(item.color, 'transition-all')}
            style={{ width: `${item.percent}%` }}
            title={`${item.symbol}: ${item.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {data.slice(0, 9).map((item) => (
          <div key={item.symbol} className="flex items-center gap-2">
            <div className={cn('h-2.5 w-2.5 rounded-full', item.color)} />
            <span className="text-xs text-gray-400">
              <span className="font-mono font-medium text-gray-300">{item.symbol}</span>{' '}
              {item.percent.toFixed(1)}%
            </span>
          </div>
        ))}
        {data.length > 9 && (
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-gray-600" />
            <span className="text-xs text-gray-500">
              +{data.length - 9} more
            </span>
          </div>
        )}
      </div>

      {/* Concentration warning */}
      {isConcentrated && (
        <div className="mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2">
          <p className="text-xs text-amber-400">
            High concentration: {topHolding.symbol} represents {topHolding.percent.toFixed(0)}% of your portfolio
          </p>
        </div>
      )}
    </Card>
  );
}
