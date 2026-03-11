'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatLargeNumber, formatVolume } from '@/lib/formatters';
import type { StockQuote, CompanyOverview } from '@/types';

interface KeyMetricsProps {
  quote: StockQuote;
  overview?: CompanyOverview | null;
}

export function KeyMetrics({ quote, overview }: KeyMetricsProps) {
  const weekHigh = overview ? parseFloat(overview['52WeekHigh']) : null;
  const weekLow = overview ? parseFloat(overview['52WeekLow']) : null;
  const positionPct = weekHigh && weekLow ? ((quote.price - weekLow) / (weekHigh - weekLow)) * 100 : 50;

  return (
    <Card hover>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>

      <div className="space-y-3">
        {/* 52 Week Range */}
        {weekHigh && weekLow && (
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>52W Low: <span className="font-mono text-gray-400">{formatCurrency(weekLow)}</span></span>
              <span>52W High: <span className="font-mono text-gray-400">{formatCurrency(weekHigh)}</span></span>
            </div>
            <div className="relative h-2 rounded-full bg-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"
                style={{ width: `${Math.min(Math.max(positionPct, 0), 100)}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-1 rounded bg-white shadow-lg"
                style={{ left: `${Math.min(Math.max(positionPct, 0), 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Open</span>
            <span className="font-mono text-gray-300">{formatCurrency(quote.open)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Prev Close</span>
            <span className="font-mono text-gray-300">{formatCurrency(quote.previousClose)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Day High</span>
            <span className="font-mono text-gray-300">{formatCurrency(quote.high)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Day Low</span>
            <span className="font-mono text-gray-300">{formatCurrency(quote.low)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Volume</span>
            <span className="font-mono text-gray-300">{formatVolume(quote.volume)}</span>
          </div>
          {overview && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-500">Market Cap</span>
                <span className="font-mono text-gray-300">{formatLargeNumber(parseFloat(overview.MarketCapitalization || '0'))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">P/E Ratio</span>
                <span className="font-mono text-gray-300">{overview.PERatio || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">EPS</span>
                <span className="font-mono text-gray-300">{overview.EPS || '-'}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
