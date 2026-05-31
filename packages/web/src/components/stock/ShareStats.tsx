'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatLargeNumber, formatCurrency } from '@/lib/formatters';
import type { CompanyOverview } from '@/types';

interface ShareStatsProps {
  overview: CompanyOverview | undefined;
  quote: { price: number; volume: number } | undefined;
}

export function ShareStats({ overview, quote }: ShareStatsProps) {
  if (!overview) return null;

  const shares = parseFloat(overview.SharesOutstanding);
  const marketCap = parseFloat(overview.MarketCapitalization);
  const high52 = parseFloat(overview['52WeekHigh']);
  const low52 = parseFloat(overview['52WeekLow']);
  const sma50 = parseFloat(overview['50DayMovingAverage']);
  const sma200 = parseFloat(overview['200DayMovingAverage']);

  const items = [
    { label: 'Market Cap', value: isNaN(marketCap) ? '—' : formatLargeNumber(marketCap) },
    { label: 'Shares Outstanding', value: isNaN(shares) ? '—' : formatLargeNumber(shares) },
    { label: '52-Week High', value: isNaN(high52) ? '—' : formatCurrency(high52) },
    { label: '52-Week Low', value: isNaN(low52) ? '—' : formatCurrency(low52) },
    { label: '50-Day MA', value: isNaN(sma50) ? '—' : formatCurrency(sma50) },
    { label: '200-Day MA', value: isNaN(sma200) ? '—' : formatCurrency(sma200) },
    { label: 'Avg Volume', value: quote?.volume ? formatLargeNumber(quote.volume) : '—' },
    { label: 'Beta', value: overview.Beta || '—' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Statistics</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
            <span className="text-xs text-gray-500">{item.label}</span>
            <span className="text-xs font-mono text-gray-300">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
