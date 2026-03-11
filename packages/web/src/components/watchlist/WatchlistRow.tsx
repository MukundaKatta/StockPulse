'use client';

import Link from 'next/link';
import { useStockPrice } from '@/hooks/useStockPrice';
import { formatCurrency, cn } from '@/lib/formatters';

interface WatchlistRowProps {
  symbol: string;
}

export function WatchlistRow({ symbol }: WatchlistRowProps) {
  const { price, flash } = useStockPrice(symbol);

  return (
    <Link
      href={`/stock/${symbol}`}
      className="flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-white/5"
    >
      <span className="font-mono text-sm font-medium text-gray-200">{symbol}</span>
      <span
        className={cn(
          'font-mono text-sm',
          flash === 'up' ? 'text-green-400' : flash === 'down' ? 'text-red-400' : 'text-gray-400'
        )}
      >
        {price ? formatCurrency(price.price) : '—'}
      </span>
    </Link>
  );
}
