'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface PriceTargetsProps {
  currentPrice: number;
  targets?: {
    low: number;
    median: number;
    high: number;
    consensus: number;
    numAnalysts: number;
  };
}

export function PriceTargets({ currentPrice, targets }: PriceTargetsProps) {
  if (!targets) return null;

  const min = Math.min(targets.low, currentPrice) * 0.95;
  const max = Math.max(targets.high, currentPrice) * 1.05;
  const range = max - min;

  const getPosition = (price: number) => ((price - min) / range) * 100;

  const upside = ((targets.consensus - currentPrice) / currentPrice) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-4 w-4 text-indigo-400" />
          Price Targets
        </CardTitle>
      </CardHeader>

      {/* Visual range */}
      <div className="relative h-8 rounded-full bg-white/5 mx-2 mb-4">
        {/* Target range bar */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-indigo-500/30"
          style={{
            left: `${getPosition(targets.low)}%`,
            width: `${getPosition(targets.high) - getPosition(targets.low)}%`,
          }}
        />

        {/* Low marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-px bg-red-400"
          style={{ left: `${getPosition(targets.low)}%` }}
        />

        {/* Median marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-px bg-amber-400"
          style={{ left: `${getPosition(targets.median)}%` }}
        />

        {/* High marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-px bg-green-400"
          style={{ left: `${getPosition(targets.high)}%` }}
        />

        {/* Current price marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-indigo-500 -ml-2.5"
          style={{ left: `${getPosition(currentPrice)}%` }}
        />
      </div>

      {/* Labels */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-[10px] text-gray-600">Low</p>
          <p className="text-xs font-mono text-red-400">${targets.low.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-600">Median</p>
          <p className="text-xs font-mono text-amber-400">${targets.median.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-600">High</p>
          <p className="text-xs font-mono text-green-400">${targets.high.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-600">Consensus</p>
          <p className="text-xs font-mono text-indigo-400">${targets.consensus.toFixed(0)}</p>
        </div>
      </div>

      {/* Upside/Downside */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.02] border border-white/[0.06] px-3 py-2">
        <span className="text-xs text-gray-500">{targets.numAnalysts} analysts</span>
        <span className={cn('text-sm font-mono font-bold', upside >= 0 ? 'text-green-400' : 'text-red-400')}>
          {upside >= 0 ? '+' : ''}{upside.toFixed(1)}% upside
        </span>
      </div>
    </Card>
  );
}
