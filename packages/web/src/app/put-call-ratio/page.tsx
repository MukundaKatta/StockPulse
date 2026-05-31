'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface PCRData {
  date: string;
  putVolume: number;
  callVolume: number;
  ratio: number;
}

const DATA: PCRData[] = [
  { date: '2024-02-09', putVolume: 18200000, callVolume: 22400000, ratio: 0.81 },
  { date: '2024-02-08', putVolume: 19500000, callVolume: 21800000, ratio: 0.89 },
  { date: '2024-02-07', putVolume: 20100000, callVolume: 20500000, ratio: 0.98 },
  { date: '2024-02-06', putVolume: 21800000, callVolume: 19200000, ratio: 1.14 },
  { date: '2024-02-05', putVolume: 17600000, callVolume: 23100000, ratio: 0.76 },
  { date: '2024-02-02', putVolume: 19800000, callVolume: 21400000, ratio: 0.93 },
  { date: '2024-02-01', putVolume: 22400000, callVolume: 18900000, ratio: 1.19 },
  { date: '2024-01-31', putVolume: 20600000, callVolume: 20100000, ratio: 1.02 },
  { date: '2024-01-30', putVolume: 18900000, callVolume: 22800000, ratio: 0.83 },
  { date: '2024-01-29', putVolume: 17200000, callVolume: 24500000, ratio: 0.70 },
];

function sentiment(ratio: number) {
  if (ratio > 1.0) return { label: 'Bearish', variant: 'danger' as const };
  if (ratio < 0.8) return { label: 'Bullish', variant: 'success' as const };
  return { label: 'Neutral', variant: 'default' as const };
}

export default function PutCallRatioPage() {
  const latest = DATA[0];
  const avg = DATA.reduce((s, d) => s + d.ratio, 0) / DATA.length;
  const maxRatio = Math.max(...DATA.map((d) => d.ratio));
  const s = sentiment(latest.ratio);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Put/Call Ratio</h1>
        <p className="mt-1 text-sm text-gray-500">CBOE equity options put/call ratio</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Current P/C</p>
          <p className="text-lg font-bold text-white">{latest.ratio.toFixed(2)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">10-Day Avg</p>
          <p className="text-lg font-bold text-indigo-400">{avg.toFixed(2)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Sentiment</p>
          <Badge variant={s.variant}>{s.label}</Badge>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Put Volume</p>
          <p className="text-lg font-bold text-red-400">{(latest.putVolume / 1e6).toFixed(1)}M</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-indigo-400" /> 10-Day History
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.map((d) => {
            const ds = sentiment(d.ratio);
            return (
              <div key={d.date} className="flex items-center gap-3 py-2 px-4">
                <span className="text-xs font-mono text-gray-500 w-20">{d.date}</span>
                <div className="flex-1 flex gap-1 items-center">
                  <div className="flex-1 h-3 rounded bg-white/5 overflow-hidden flex">
                    <div className="bg-red-500/40 h-full" style={{ width: `${(d.putVolume / (d.putVolume + d.callVolume)) * 100}%` }} />
                    <div className="bg-green-500/40 h-full flex-1" />
                  </div>
                </div>
                <span className={cn('text-xs font-mono font-bold w-10 text-right', d.ratio > 1 ? 'text-red-400' : d.ratio < 0.8 ? 'text-green-400' : 'text-gray-400')}>
                  {d.ratio.toFixed(2)}
                </span>
                <Badge variant={ds.variant}>{ds.label}</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
