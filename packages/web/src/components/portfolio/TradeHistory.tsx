'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate, cn } from '@/lib/formatters';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Trade } from '@/types';

interface TradeHistoryProps {
  trades: Trade[];
  portfolioId: string;
}

export function TradeHistory({ trades, portfolioId }: TradeHistoryProps) {
  const { deleteTrade } = usePortfolioStore();
  const [expanded, setExpanded] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (tradeId: string) => {
    setDeleting(tradeId);
    try {
      await deleteTrade(portfolioId, tradeId);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between"
        >
          <CardTitle>Trade History ({trades.length})</CardTitle>
          {expanded
            ? <ChevronUp className="h-4 w-4 text-gray-500" />
            : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
      </CardHeader>
      {expanded && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Symbol</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Qty</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
                <th className="hidden sm:table-cell px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fee</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium uppercase tracking-wider text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5 text-gray-400 text-xs whitespace-nowrap">
                    {formatDate(trade.date)}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={cn(
                      'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold',
                      trade.type === 'BUY'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    )}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono font-medium text-white">{trade.symbol}</td>
                  <td className="px-4 py-2.5 font-mono text-gray-300">{trade.quantity}</td>
                  <td className="px-4 py-2.5 font-mono text-gray-300">{formatCurrency(trade.price)}</td>
                  <td className="px-4 py-2.5 font-mono font-medium text-white">
                    {formatCurrency(trade.quantity * trade.price)}
                  </td>
                  <td className="hidden sm:table-cell px-4 py-2.5 font-mono text-gray-500">
                    {trade.fee > 0 ? formatCurrency(trade.fee) : '-'}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => handleDelete(trade.id)}
                      disabled={deleting === trade.id}
                      className="rounded p-1 text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                      aria-label="Delete trade"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {trades.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No trades recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
