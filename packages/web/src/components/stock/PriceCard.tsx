'use client';

import { motion } from 'framer-motion';
import { useStockPrice } from '@/hooks/useStockPrice';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import Link from 'next/link';

interface PriceCardProps {
  symbol: string;
  name?: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

export function PriceCard({ symbol, name, price, change, changePercent }: PriceCardProps) {
  const { price: livePrice, flash } = useStockPrice(symbol);
  const currentPrice = livePrice?.price ?? price ?? 0;
  const isPositive = (change ?? 0) >= 0;

  return (
    <Link href={`/stock/${symbol}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className={cn(
          'rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#12121a] to-[#1a1a2e] p-4 transition-all duration-200',
          'hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5',
          flash === 'up' && 'border-green-500/30',
          flash === 'down' && 'border-red-500/30'
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-sm font-bold text-white">{symbol}</span>
            {name && <span className="ml-2 text-xs text-gray-500">{name}</span>}
          </div>
        </div>

        <div className="mt-2">
          <span className={cn(
            'font-mono text-xl font-bold',
            flash === 'up' ? 'text-green-400' : flash === 'down' ? 'text-red-400' : 'text-white'
          )}>
            {formatCurrency(currentPrice)}
          </span>
        </div>

        {change !== undefined && changePercent !== undefined && (
          <div className={cn('mt-1 flex items-center gap-1 text-xs font-medium', isPositive ? 'text-green-400' : 'text-red-400')}>
            <span>{isPositive ? '+' : ''}{formatCurrency(change)}</span>
            <span className={cn('rounded px-1 py-0.5', isPositive ? 'bg-green-500/10' : 'bg-red-500/10')}>
              {formatPercent(changePercent)}
            </span>
          </div>
        )}
      </motion.div>
    </Link>
  );
}
