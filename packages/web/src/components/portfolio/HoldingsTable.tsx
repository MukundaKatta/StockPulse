'use client';

import { useState } from 'react';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import Link from 'next/link';
import type { Holding, StockQuote } from '@/types';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Holding[];
  quotes?: Record<string, StockQuote>;
}

type SortKey = 'symbol' | 'quantity' | 'avgCost' | 'marketValue' | 'pl';

export function HoldingsTable({ holdings, quotes = {} }: HoldingsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('marketValue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const enriched = holdings.map((h) => {
    const quote = quotes[h.symbol];
    const currentPrice = quote?.price ?? h.avgCost;
    const marketValue = currentPrice * h.quantity;
    const pl = marketValue - h.totalCost;
    const plPercent = h.totalCost > 0 ? (pl / h.totalCost) * 100 : 0;
    const dayChange = quote ? quote.change * h.quantity : 0;
    return { ...h, currentPrice, marketValue, pl, plPercent, dayChange, hasQuote: !!quote };
  });

  const sorted = [...enriched].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortKey === 'symbol') return a.symbol.localeCompare(b.symbol) * mul;
    if (sortKey === 'pl') return (a.pl - b.pl) * mul;
    if (sortKey === 'marketValue') return (a.marketValue - b.marketValue) * mul;
    return (a[sortKey] - b[sortKey]) * mul;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const totalMarketValue = enriched.reduce((sum, h) => sum + h.marketValue, 0);

  const columns: { key: SortKey; label: string }[] = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'quantity', label: 'Shares' },
    { key: 'avgCost', label: 'Avg Cost' },
    { key: 'marketValue', label: 'Mkt Value' },
    { key: 'pl', label: 'P&L' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {columns.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => toggleSort(key)}
                className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-400"
              >
                <span className="flex items-center gap-1">
                  {label}
                  <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
            ))}
            <th className="hidden sm:table-cell px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              % Portfolio
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((h) => {
            const plPositive = h.pl >= 0;
            return (
              <tr key={h.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/stock/${h.symbol}`} className="font-mono font-medium text-indigo-400 hover:text-indigo-300">
                    {h.symbol}
                  </Link>
                  {h.hasQuote && (
                    <div className="font-mono text-xs text-gray-500 mt-0.5">
                      {formatCurrency(h.currentPrice)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-gray-300">{h.quantity.toFixed(2)}</td>
                <td className="px-4 py-3 font-mono text-gray-300">{formatCurrency(h.avgCost)}</td>
                <td className="px-4 py-3 font-mono font-medium text-white">{formatCurrency(h.marketValue)}</td>
                <td className="px-4 py-3">
                  <div className={cn('font-mono font-medium', plPositive ? 'text-green-400' : 'text-red-400')}>
                    {plPositive ? '+' : ''}{formatCurrency(h.pl)}
                  </div>
                  <div className={cn('font-mono text-xs', plPositive ? 'text-green-400/70' : 'text-red-400/70')}>
                    {formatPercent(h.plPercent)}
                  </div>
                </td>
                <td className="hidden sm:table-cell px-4 py-3 text-right font-mono text-gray-400">
                  {totalMarketValue > 0 ? `${((h.marketValue / totalMarketValue) * 100).toFixed(1)}%` : '-'}
                </td>
              </tr>
            );
          })}
          {holdings.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                No holdings yet. Add your first trade to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
