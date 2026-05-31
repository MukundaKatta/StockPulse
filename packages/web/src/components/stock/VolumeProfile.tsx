'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';
import type { OHLCV } from '@/types';

interface VolumeProfileProps {
  data: OHLCV[] | undefined;
  currentPrice?: number;
}

export function VolumeProfile({ data, currentPrice }: VolumeProfileProps) {
  const profile = useMemo(() => {
    if (!data || data.length < 10) return null;

    const prices = data.map((d) => d.close);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    if (range <= 0) return null;

    const bucketCount = 15;
    const bucketSize = range / bucketCount;
    const buckets: { price: number; volume: number }[] = [];

    for (let i = 0; i < bucketCount; i++) {
      buckets.push({ price: min + bucketSize * (i + 0.5), volume: 0 });
    }

    for (const bar of data) {
      const bucketIdx = Math.min(Math.floor((bar.close - min) / bucketSize), bucketCount - 1);
      buckets[bucketIdx].volume += bar.volume;
    }

    const maxVol = Math.max(...buckets.map((b) => b.volume));
    return { buckets, maxVol, min, max };
  }, [data]);

  if (!profile) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <BarChart3 className="h-4 w-4 text-indigo-400" />
          Volume Profile
        </CardTitle>
      </CardHeader>
      <div className="space-y-1">
        {[...profile.buckets].reverse().map((bucket, idx) => {
          const width = profile.maxVol > 0 ? (bucket.volume / profile.maxVol) * 100 : 0;
          const isCurrentLevel = currentPrice && Math.abs(bucket.price - currentPrice) < (profile.max - profile.min) / 15;
          return (
            <div key={idx} className="flex items-center gap-2">
              <span className={cn(
                'w-14 text-right text-[10px] font-mono',
                isCurrentLevel ? 'text-indigo-400 font-bold' : 'text-gray-600'
              )}>
                ${bucket.price.toFixed(0)}
              </span>
              <div className="flex-1 h-3 rounded-sm overflow-hidden bg-white/[0.02]">
                <div
                  className={cn(
                    'h-full rounded-sm transition-all',
                    isCurrentLevel ? 'bg-indigo-500/60' : 'bg-indigo-500/30'
                  )}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
