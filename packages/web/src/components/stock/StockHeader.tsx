'use client';

import { motion } from 'framer-motion';
import { useStockPrice } from '@/hooks/useStockPrice';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { Badge } from '@/components/ui/badge';
import type { StockQuote, CompanyOverview } from '@/types';

interface StockHeaderProps {
  quote: StockQuote;
  overview?: CompanyOverview | null;
}

export function StockHeader({ quote, overview }: StockHeaderProps) {
  const { flash } = useStockPrice(quote.symbol);
  const isPositive = quote.change >= 0;

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">{quote.symbol}</h1>
        {overview && (
          <span className="text-sm text-gray-500">{overview.Name}</span>
        )}
        {overview && (
          <Badge variant="info">{overview.Sector}</Badge>
        )}
      </div>

      <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
        <motion.span
          key={quote.price}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className={cn(
            'font-mono text-2xl sm:text-3xl font-bold text-white',
            flash === 'up' && 'text-green-400',
            flash === 'down' && 'text-red-400'
          )}
        >
          {formatCurrency(quote.price)}
        </motion.span>

        <span className={cn('font-mono text-base sm:text-lg font-semibold', isPositive ? 'text-green-400' : 'text-red-400')}>
          {isPositive ? '+' : ''}{formatCurrency(quote.change)}
        </span>

        <Badge variant={isPositive ? 'success' : 'danger'}>
          {formatPercent(quote.changePercent)}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
        <span>Open: <span className="font-mono text-gray-400">{formatCurrency(quote.open)}</span></span>
        <span>High: <span className="font-mono text-gray-400">{formatCurrency(quote.high)}</span></span>
        <span>Low: <span className="font-mono text-gray-400">{formatCurrency(quote.low)}</span></span>
        <span className="hidden sm:inline">Vol: <span className="font-mono text-gray-400">{quote.volume.toLocaleString()}</span></span>
        <span className="hidden sm:inline">Prev: <span className="font-mono text-gray-400">{formatCurrency(quote.previousClose)}</span></span>
      </div>
    </div>
  );
}
