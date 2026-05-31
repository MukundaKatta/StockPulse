'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface BreadthData {
  advancing: number;
  declining: number;
  unchanged: number;
  newHighs: number;
  newLows: number;
  aboveSMA200: number;
}

const MOCK_BREADTH: BreadthData = {
  advancing: 287,
  declining: 198,
  unchanged: 18,
  newHighs: 42,
  newLows: 8,
  aboveSMA200: 62,
};

export function MarketBreadth() {
  const data = MOCK_BREADTH;
  const total = data.advancing + data.declining + data.unchanged;
  const advancePercent = total > 0 ? (data.advancing / total) * 100 : 50;
  const declinePercent = total > 0 ? (data.declining / total) * 100 : 50;
  const advanceDeclineRatio = data.declining > 0 ? data.advancing / data.declining : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Market Breadth (S&P 500)</CardTitle>
      </CardHeader>

      {/* Advance/Decline bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-green-400">{data.advancing} Advancing</span>
          <span className="text-red-400">{data.declining} Declining</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full">
          <div className="bg-green-500 transition-all" style={{ width: `${advancePercent}%` }} />
          <div className="bg-gray-700" style={{ width: `${100 - advancePercent - declinePercent}%` }} />
          <div className="bg-red-500 transition-all" style={{ width: `${declinePercent}%` }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between rounded-md bg-white/[0.02] px-2 py-1.5">
          <span className="text-gray-500">A/D Ratio</span>
          <span className={cn('font-mono font-medium', advanceDeclineRatio > 1 ? 'text-green-400' : 'text-red-400')}>
            {advanceDeclineRatio.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-white/[0.02] px-2 py-1.5">
          <span className="text-gray-500">Above 200 SMA</span>
          <span className={cn('font-mono font-medium', data.aboveSMA200 > 50 ? 'text-green-400' : 'text-red-400')}>
            {data.aboveSMA200}%
          </span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-white/[0.02] px-2 py-1.5">
          <span className="text-gray-500">New Highs</span>
          <span className="font-mono font-medium text-green-400">{data.newHighs}</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-white/[0.02] px-2 py-1.5">
          <span className="text-gray-500">New Lows</span>
          <span className="font-mono font-medium text-red-400">{data.newLows}</span>
        </div>
      </div>
    </Card>
  );
}
