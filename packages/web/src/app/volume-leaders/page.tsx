'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface VolumeLeader {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  avgVolume: number;
  relVolume: number;
  dollarVolume: number;
  catalyst: string;
}

const LEADERS: VolumeLeader[] = [
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, change: -2.1, volume: 184200000, avgVolume: 98400000, relVolume: 1.87, dollarVolume: 34670000000, catalyst: 'Earnings miss' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, change: 4.2, volume: 82400000, avgVolume: 42100000, relVolume: 1.96, dollarVolume: 72370000000, catalyst: 'AI demand surge' },
  { symbol: 'AMD', name: 'AMD', price: 172.40, change: 2.8, volume: 78500000, avgVolume: 54200000, relVolume: 1.45, dollarVolume: 13529000000, catalyst: 'Competitor upgrade' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, change: 0.82, volume: 62800000, avgVolume: 54200000, relVolume: 1.16, dollarVolume: 11684000000, catalyst: 'Buyback news' },
  { symbol: 'PLTR', name: 'Palantir', price: 22.40, change: 8.5, volume: 58200000, avgVolume: 42800000, relVolume: 1.36, dollarVolume: 1304000000, catalyst: 'Contract win' },
  { symbol: 'SOFI', name: 'SoFi Tech', price: 8.45, change: 12.2, volume: 52100000, avgVolume: 28500000, relVolume: 1.83, dollarVolume: 440000000, catalyst: 'Earnings beat' },
  { symbol: 'BAC', name: 'Bank of America', price: 34.20, change: -0.8, volume: 48500000, avgVolume: 38200000, relVolume: 1.27, dollarVolume: 1659000000, catalyst: 'Rate concerns' },
  { symbol: 'F', name: 'Ford Motor', price: 12.10, change: -3.4, volume: 45800000, avgVolume: 42100000, relVolume: 1.09, dollarVolume: 554000000, catalyst: 'EV slowdown' },
];

function fmtVol(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  return `${(n / 1e3).toFixed(0)}K`;
}

export default function VolumeLeadersPage() {
  const totalVol = LEADERS.reduce((s, l) => s + l.volume, 0);
  const avgRel = LEADERS.reduce((s, l) => s + l.relVolume, 0) / LEADERS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Volume Leaders</h1>
        <p className="mt-1 text-sm text-gray-500">Most actively traded stocks by volume</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Volume</p><p className="text-lg font-bold text-white">{fmtVol(totalVol)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Rel Volume</p><p className="text-lg font-bold text-indigo-400">{avgRel.toFixed(2)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{LEADERS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Today&apos;s Leaders</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {LEADERS.map((l) => (
            <div key={l.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{l.symbol}</span>
                  <span className="text-[10px] text-gray-500">{l.name}</span>
                  {l.relVolume >= 1.5 && <Badge variant="warning">Unusual</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white">${l.price.toFixed(2)}</span>
                  <span className={cn('text-xs font-mono', l.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {l.change >= 0 ? '+' : ''}{l.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                <span className="text-gray-400">Volume: <span className="text-white font-mono">{fmtVol(l.volume)}</span></span>
                <span className="text-gray-400">Avg: <span className="text-white font-mono">{fmtVol(l.avgVolume)}</span></span>
                <span className="text-gray-400">Rel: <span className={cn('font-mono', l.relVolume >= 1.5 ? 'text-amber-400' : 'text-gray-300')}>{l.relVolume.toFixed(2)}x</span></span>
                <span className="text-gray-400">$ Vol: <span className="text-white font-mono">{fmtVol(l.dollarVolume)}</span></span>
                <span className="text-gray-500 italic">{l.catalyst}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
