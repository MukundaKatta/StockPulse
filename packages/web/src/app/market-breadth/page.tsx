'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface BreadthIndicator {
  name: string;
  value: number;
  signal: 'bullish' | 'bearish' | 'neutral';
  description: string;
}

const INDICATORS: BreadthIndicator[] = [
  { name: 'Advance/Decline Ratio', value: 1.85, signal: 'bullish', description: 'More stocks advancing than declining' },
  { name: 'New Highs - New Lows', value: 142, signal: 'bullish', description: 'Net new 52-week highs on NYSE' },
  { name: '% Above 200 SMA', value: 62.5, signal: 'neutral', description: 'Stocks trading above 200-day moving average' },
  { name: '% Above 50 SMA', value: 54.2, signal: 'neutral', description: 'Stocks trading above 50-day moving average' },
  { name: 'McClellan Oscillator', value: 45.8, signal: 'bullish', description: 'Breadth momentum oscillator' },
  { name: 'McClellan Summation', value: 1250, signal: 'bullish', description: 'Cumulative breadth indicator' },
  { name: 'Up Volume Ratio', value: 0.68, signal: 'bullish', description: 'Proportion of volume in advancing stocks' },
  { name: 'Arms Index (TRIN)', value: 0.85, signal: 'bullish', description: 'Below 1 = bullish, above 1 = bearish' },
  { name: 'VIX', value: 13.45, signal: 'bullish', description: 'Market fear gauge - low = complacent' },
  { name: 'Put/Call Ratio', value: 0.72, signal: 'neutral', description: 'Options sentiment - low = bullish' },
];

const EXCHANGE_DATA = [
  { exchange: 'NYSE', advances: 2150, declines: 1180, unchanged: 85, newHighs: 98, newLows: 12 },
  { exchange: 'NASDAQ', advances: 2580, declines: 1420, unchanged: 120, newHighs: 125, newLows: 28 },
  { exchange: 'AMEX', advances: 185, declines: 95, unchanged: 15, newHighs: 8, newLows: 3 },
];

export default function MarketBreadthPage() {
  const bullish = INDICATORS.filter((i) => i.signal === 'bullish').length;
  const total = INDICATORS.length;
  const score = Math.round((bullish / total) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Breadth</h1>
        <p className="mt-1 text-sm text-gray-500">Participation and internals dashboard</p>
      </div>

      <Card className="!p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-500">Overall Breadth Score</p>
          <span className={cn('text-sm font-bold', score >= 60 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400')}>{score}% Bullish</span>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <div className={cn('h-full rounded-full', score >= 60 ? 'bg-green-500/60' : score >= 40 ? 'bg-yellow-500/60' : 'bg-red-500/60')} style={{ width: `${score}%` }} />
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Activity className="h-4 w-4 text-indigo-400" /> Breadth Indicators</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICATORS.map((ind) => (
            <div key={ind.name} className="flex items-center gap-3 py-2.5 px-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{ind.name}</p>
                <p className="text-[10px] text-gray-600">{ind.description}</p>
              </div>
              <span className="text-sm font-mono text-gray-300">{ind.value}</span>
              <Badge variant={ind.signal === 'bullish' ? 'success' : ind.signal === 'bearish' ? 'danger' : 'warning'} className="text-[9px] w-14 justify-center capitalize">{ind.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Exchange Breadth</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2 font-medium">Exchange</th>
              <th className="text-right py-2 px-2 font-medium text-green-400">Advances</th>
              <th className="text-right py-2 px-2 font-medium text-red-400">Declines</th>
              <th className="text-right py-2 px-2 font-medium">Unch.</th>
              <th className="text-right py-2 px-2 font-medium">New Hi</th>
              <th className="text-right py-2 px-2 font-medium">New Lo</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {EXCHANGE_DATA.map((ex) => (
                <tr key={ex.exchange} className="hover:bg-white/[0.02]">
                  <td className="py-2 px-2 text-gray-300 font-medium">{ex.exchange}</td>
                  <td className="py-2 px-2 text-right font-mono text-green-400">{ex.advances.toLocaleString()}</td>
                  <td className="py-2 px-2 text-right font-mono text-red-400">{ex.declines.toLocaleString()}</td>
                  <td className="py-2 px-2 text-right font-mono text-gray-500">{ex.unchanged}</td>
                  <td className="py-2 px-2 text-right font-mono text-green-400">{ex.newHighs}</td>
                  <td className="py-2 px-2 text-right font-mono text-red-400">{ex.newLows}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
