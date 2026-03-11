'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEarnings } from '@/hooks/useFundamentals';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface EarningsPanelProps {
  symbol: string;
}

export function EarningsPanel({ symbol }: EarningsPanelProps) {
  const { data: earnings, isLoading } = useEarnings(symbol);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
        </CardHeader>
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-white/5" />
          ))}
        </div>
      </Card>
    );
  }

  if (!earnings || earnings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
        </CardHeader>
        <p className="py-8 text-center text-sm text-gray-500">No earnings data available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Earnings History */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Calendar className="mr-1 inline h-4 w-4" />
            Earnings History
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">EPS Est.</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">EPS Act.</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Surprise</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500 hidden sm:table-cell">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {earnings.slice(0, 8).map((e, i) => {
                const surprise = e.epsActual !== null && e.epsEstimate !== null
                  ? e.epsActual - e.epsEstimate
                  : null;
                const beat = surprise !== null && surprise > 0;

                return (
                  <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-3 py-2 text-gray-400">
                      <span className="font-mono text-xs">Q{e.quarter} {e.year}</span>
                      <span className="block text-[10px] text-gray-600">{e.date}</span>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-gray-400">
                      {e.epsEstimate !== null ? `$${e.epsEstimate.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-3 py-2 text-right font-mono font-medium text-white">
                      {e.epsActual !== null ? `$${e.epsActual.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {surprise !== null ? (
                        <Badge variant={beat ? 'success' : 'danger'}>
                          {beat ? '+' : ''}{surprise.toFixed(2)}
                        </Badge>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-gray-400 hidden sm:table-cell">
                      {e.revenueActual !== null ? formatLargeNumber(e.revenueActual) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
