'use client';

import { useState } from 'react';
import { formatCurrency, cn } from '@/lib/formatters';
import Link from 'next/link';
import type { Holding } from '@/types';
import { ArrowUpDown } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Holding[];
}

type SortKey = 'symbol' | 'quantity' | 'avgCost' | 'totalCost';

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('totalCost');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...holdings].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortKey === 'symbol') return a.symbol.localeCompare(b.symbol) * mul;
    return (a[sortKey] - b[sortKey]) * mul;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const totalValue = holdings.reduce((sum, h) => sum + h.totalCost, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {[
              { key: 'symbol' as SortKey, label: 'Symbol' },
              { key: 'quantity' as SortKey, label: 'Shares' },
              { key: 'avgCost' as SortKey, label: 'Avg Cost' },
              { key: 'totalCost' as SortKey, label: 'Market Value' },
            ].map(({ key, label }) => (
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
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">% Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((holding) => (
            <tr key={holding.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-3">
                <Link href={`/stock/${holding.symbol}`} className="font-mono font-medium text-indigo-400 hover:text-indigo-300">
                  {holding.symbol}
                </Link>
              </td>
              <td className="px-4 py-3 font-mono text-gray-300">{holding.quantity.toFixed(2)}</td>
              <td className="px-4 py-3 font-mono text-gray-300">{formatCurrency(holding.avgCost)}</td>
              <td className="px-4 py-3 font-mono font-medium text-white">{formatCurrency(holding.totalCost)}</td>
              <td className="px-4 py-3 text-right font-mono text-gray-400">
                {totalValue > 0 ? `${((holding.totalCost / totalValue) * 100).toFixed(1)}%` : '-'}
              </td>
            </tr>
          ))}
          {holdings.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                No holdings yet. Add your first trade to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
