'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';

interface FearGreedProps {
  value?: number;
}

function getLabel(value: number): { text: string; color: string } {
  if (value <= 20) return { text: 'Extreme Fear', color: 'text-red-500' };
  if (value <= 40) return { text: 'Fear', color: 'text-red-400' };
  if (value <= 60) return { text: 'Neutral', color: 'text-gray-400' };
  if (value <= 80) return { text: 'Greed', color: 'text-green-400' };
  return { text: 'Extreme Greed', color: 'text-green-500' };
}

export function FearGreedIndex({ value = 58 }: FearGreedProps) {
  const { text, color } = getLabel(value);
  const rotation = (value / 100) * 180 - 90;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Fear & Greed Index</CardTitle>
      </CardHeader>

      <div className="flex flex-col items-center">
        {/* Gauge */}
        <div className="relative w-32 h-16 overflow-hidden">
          <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20" />
          <div className="absolute bottom-0 left-1/2 w-0.5 h-14 bg-white origin-bottom" style={{ transform: `rotate(${rotation}deg)` }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" />
        </div>

        <div className="mt-2 text-center">
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className={cn('text-xs font-medium', color)}>{text}</p>
        </div>

        {/* Scale */}
        <div className="mt-3 flex w-full justify-between text-[10px] text-gray-600 px-2">
          <span>0 Fear</span>
          <span>50 Neutral</span>
          <span>100 Greed</span>
        </div>
      </div>
    </Card>
  );
}
