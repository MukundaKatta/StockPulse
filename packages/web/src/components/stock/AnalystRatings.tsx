'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';
import type { CompanyOverview } from '@/types';

interface AnalystRatingsProps {
  overview: CompanyOverview;
}

export function AnalystRatings({ overview }: AnalystRatingsProps) {
  const targetPrice = parseFloat(overview['AnalystTargetPrice'] || '0');
  const currentPrice = parseFloat(overview['50DayMovingAverage'] || '0');

  if (!targetPrice || !currentPrice) return null;

  const upside = ((targetPrice - currentPrice) / currentPrice) * 100;
  const rating = overview['AnalystRating'] || (upside > 20 ? 'Strong Buy' : upside > 10 ? 'Buy' : upside > -5 ? 'Hold' : 'Sell');

  const ratingColor = rating.includes('Buy')
    ? 'text-green-400 bg-green-500/10'
    : rating === 'Hold'
    ? 'text-amber-400 bg-amber-500/10'
    : 'text-red-400 bg-red-500/10';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <BarChart3 className="mr-1 inline h-4 w-4" />
          Analyst Consensus
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Rating</p>
          <span className={cn('inline-block rounded-lg px-3 py-1 text-sm font-medium', ratingColor)}>
            {rating}
          </span>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Target Price</p>
          <p className="text-lg font-mono font-bold text-white">${targetPrice.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Upside</p>
          <p className={cn('text-lg font-mono font-bold', upside >= 0 ? 'text-green-400' : 'text-red-400')}>
            {upside >= 0 ? '+' : ''}{upside.toFixed(1)}%
          </p>
        </div>
      </div>
    </Card>
  );
}
