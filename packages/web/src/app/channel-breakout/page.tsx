'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowRightLeft } from 'lucide-react';

interface Breakout {
  symbol: string;
  name: string;
  price: number;
  channelHigh: number;
  channelLow: number;
  direction: 'Bullish Breakout' | 'Bearish Breakdown' | 'Testing Upper' | 'Testing Lower' | 'In Channel';
  channelDays: number;
  volume: string;
  relVolume: number;
  priorRange: number;
}

const BREAKOUTS: Breakout[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, channelHigh: 860.00, channelLow: 780.00, direction: 'Bullish Breakout', channelDays: 28, volume: '42.1M', relVolume: 1.96, priorRange: 10.3 },
  { symbol: 'META', name: 'Meta', price: 484.10, channelHigh: 480.00, channelLow: 440.00, direction: 'Testing Upper', channelDays: 18, volume: '18.5M', relVolume: 1.22, priorRange: 9.1 },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, channelHigh: 192.00, channelLow: 178.00, direction: 'In Channel', channelDays: 35, volume: '54.2M', relVolume: 1.05, priorRange: 7.8 },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, channelHigh: 220.00, channelLow: 190.00, direction: 'Testing Lower', channelDays: 22, volume: '98.4M', relVolume: 1.45, priorRange: 15.8 },
  { symbol: 'AMD', name: 'AMD', price: 172.40, channelHigh: 170.00, channelLow: 148.00, direction: 'Bullish Breakout', channelDays: 32, volume: '54.2M', relVolume: 1.68, priorRange: 14.9 },
  { symbol: 'CRM', name: 'Salesforce', price: 292.40, channelHigh: 285.00, channelLow: 260.00, direction: 'Bullish Breakout', channelDays: 25, volume: '8.4M', relVolume: 1.82, priorRange: 9.6 },
  { symbol: 'INTC', name: 'Intel', price: 42.80, channelHigh: 48.00, channelLow: 43.50, direction: 'Bearish Breakdown', channelDays: 40, volume: '38.1M', relVolume: 1.55, priorRange: 10.3 },
  { symbol: 'NFLX', name: 'Netflix', price: 565.20, channelHigh: 560.00, channelLow: 510.00, direction: 'Bullish Breakout', channelDays: 15, volume: '8.2M', relVolume: 1.42, priorRange: 9.8 },
];

export default function ChannelBreakoutPage() {
  const breakouts = BREAKOUTS.filter((b) => b.direction.includes('Breakout')).length;
  const breakdowns = BREAKOUTS.filter((b) => b.direction.includes('Breakdown')).length;
  const testing = BREAKOUTS.filter((b) => b.direction.includes('Testing')).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Channel Breakouts</h1>
        <p className="mt-1 text-sm text-gray-500">Price channel breakouts and breakdowns with volume confirmation</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Breakouts</p><p className="text-lg font-bold text-green-400">{breakouts}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Breakdowns</p><p className="text-lg font-bold text-red-400">{breakdowns}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Testing</p><p className="text-lg font-bold text-amber-400">{testing}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Scanned</p><p className="text-lg font-bold text-white">{BREAKOUTS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowRightLeft className="h-4 w-4 text-indigo-400" /> Channel Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BREAKOUTS.map((b) => {
            const dirColor = b.direction.includes('Bullish') ? 'success' : b.direction.includes('Bearish') ? 'danger' : b.direction.includes('Testing') ? 'warning' : 'default';
            const channelPct = ((b.channelHigh - b.channelLow) / b.channelLow) * 100;
            return (
              <div key={b.symbol} className="px-4 py-2.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{b.symbol}</span>
                    <span className="text-[10px] text-gray-500">{b.name}</span>
                    <Badge variant={dirColor}>{b.direction}</Badge>
                    {b.relVolume > 1.5 && <Badge variant="info">Vol Confirm</Badge>}
                  </div>
                  <span className="text-xs font-mono text-white">${b.price.toFixed(2)}</span>
                </div>
                <div className="relative h-3 rounded bg-white/5">
                  <div className="absolute inset-y-0 bg-indigo-500/20 rounded" style={{ left: `${((b.channelLow - b.channelLow * 0.95) / (b.channelHigh * 1.05 - b.channelLow * 0.95)) * 100}%`, right: `${((b.channelHigh * 1.05 - b.channelHigh) / (b.channelHigh * 1.05 - b.channelLow * 0.95)) * 100}%` }} />
                  <div className="absolute top-0 bottom-0 w-1.5 rounded bg-white" style={{ left: `${((b.price - b.channelLow * 0.95) / (b.channelHigh * 1.05 - b.channelLow * 0.95)) * 100}%` }} />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                  <span className="text-gray-400">Range: <span className="font-mono text-white">${b.channelLow} – ${b.channelHigh}</span></span>
                  <span className="text-gray-400">Width: <span className="font-mono text-white">{channelPct.toFixed(1)}%</span></span>
                  <span className="text-gray-400">Days: <span className="font-mono text-white">{b.channelDays}</span></span>
                  <span className="text-gray-400">Rel Vol: <span className={cn('font-mono', b.relVolume > 1.5 ? 'text-amber-400' : 'text-gray-300')}>{b.relVolume.toFixed(2)}x</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
