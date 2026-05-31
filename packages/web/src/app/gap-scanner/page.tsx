'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';
import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

interface GapData {
  symbol: string;
  name: string;
  prevClose: number;
  openPrice: number;
  gapPercent: number;
  volume: number;
  avgVolume: number;
  catalyst: string;
  filled: boolean;
}

const MOCK_GAPS: GapData[] = [
  { symbol: 'SMCI', name: 'Super Micro Computer', prevClose: 285.50, openPrice: 312.40, gapPercent: 9.4, volume: 42000000, avgVolume: 18000000, catalyst: 'AI server demand surge', filled: false },
  { symbol: 'PLTR', name: 'Palantir', prevClose: 22.80, openPrice: 25.10, gapPercent: 10.1, volume: 85000000, avgVolume: 45000000, catalyst: 'Government contract win', filled: false },
  { symbol: 'ROKU', name: 'Roku Inc', prevClose: 68.40, openPrice: 62.10, gapPercent: -9.2, volume: 28000000, avgVolume: 12000000, catalyst: 'Weak ad revenue guidance', filled: false },
  { symbol: 'SNAP', name: 'Snap Inc', prevClose: 15.20, openPrice: 12.80, gapPercent: -15.8, volume: 95000000, avgVolume: 35000000, catalyst: 'Missed EPS estimates', filled: true },
  { symbol: 'CRWD', name: 'CrowdStrike', prevClose: 315.00, openPrice: 332.50, gapPercent: 5.6, volume: 15000000, avgVolume: 8000000, catalyst: 'Raised FY guidance', filled: false },
  { symbol: 'COIN', name: 'Coinbase', prevClose: 145.20, openPrice: 158.60, gapPercent: 9.2, volume: 32000000, avgVolume: 15000000, catalyst: 'BTC breakout', filled: false },
  { symbol: 'SNOW', name: 'Snowflake', prevClose: 185.40, openPrice: 168.20, gapPercent: -9.3, volume: 22000000, avgVolume: 10000000, catalyst: 'Deceleration in growth', filled: true },
  { symbol: 'NET', name: 'Cloudflare', prevClose: 82.50, openPrice: 88.90, gapPercent: 7.8, volume: 18000000, avgVolume: 8000000, catalyst: 'Strong enterprise deals', filled: false },
];

export default function GapScannerPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'up' | 'down'>('all');

  const filtered = MOCK_GAPS
    .filter((g) => !search || g.symbol.includes(search.toUpperCase()))
    .filter((g) => filter === 'all' || (filter === 'up' ? g.gapPercent > 0 : g.gapPercent < 0))
    .sort((a, b) => Math.abs(b.gapPercent) - Math.abs(a.gapPercent));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Gap Scanner</h1>
          <p className="mt-1 text-sm text-gray-500">Stocks gapping up or down on unusual volume</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter..." className="pl-9 w-48" />
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'up', 'down'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f === 'up' ? 'Gap Up' : f === 'down' ? 'Gap Down' : 'All'}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((gap) => (
          <Card key={gap.symbol} className="!p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', gap.gapPercent >= 0 ? 'bg-green-500/10' : 'bg-red-500/10')}>
                  {gap.gapPercent >= 0 ? <ArrowUpRight className="h-4 w-4 text-green-400" /> : <ArrowDownRight className="h-4 w-4 text-red-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/stock/${gap.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{gap.symbol}</Link>
                    <span className={cn('text-sm font-bold font-mono', gap.gapPercent >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {gap.gapPercent >= 0 ? '+' : ''}{gap.gapPercent.toFixed(1)}%
                    </span>
                    {gap.filled && <Badge variant="warning">Filled</Badge>}
                  </div>
                  <p className="text-[10px] text-gray-500">{gap.catalyst}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono text-gray-300">{formatCurrency(gap.openPrice)}</p>
                <p className="text-[10px] text-gray-600">Vol: {formatLargeNumber(gap.volume)} ({(gap.volume / gap.avgVolume).toFixed(1)}x avg)</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
