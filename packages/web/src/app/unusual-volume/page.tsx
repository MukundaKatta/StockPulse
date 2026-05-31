'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatLargeNumber, formatCurrency, cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

interface UnusualVolumeStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  avgVolume: number;
  ratio: number;
  catalyst: string;
}

const UV_DATA: UnusualVolumeStock[] = [
  { symbol: 'SMCI', name: 'Super Micro', price: 312.40, change: 9.4, volume: 42000000, avgVolume: 18000000, ratio: 2.33, catalyst: 'AI data center demand' },
  { symbol: 'PLTR', name: 'Palantir', price: 25.10, change: 10.1, volume: 185000000, avgVolume: 45000000, ratio: 4.11, catalyst: 'Government contract' },
  { symbol: 'SNAP', name: 'Snap Inc', price: 12.80, change: -15.8, volume: 195000000, avgVolume: 35000000, ratio: 5.57, catalyst: 'Earnings miss' },
  { symbol: 'ARM', name: 'ARM Holdings', price: 148.50, change: 12.5, volume: 58000000, avgVolume: 15000000, ratio: 3.87, catalyst: 'AI chip guidance' },
  { symbol: 'RIVN', name: 'Rivian', price: 18.20, change: -8.5, volume: 82000000, avgVolume: 28000000, ratio: 2.93, catalyst: 'Production warning' },
  { symbol: 'COIN', name: 'Coinbase', price: 158.60, change: 5.2, volume: 32000000, avgVolume: 15000000, ratio: 2.13, catalyst: 'BTC breakout' },
  { symbol: 'SOFI', name: 'SoFi Technologies', price: 8.45, change: 18.2, volume: 125000000, avgVolume: 42000000, ratio: 2.98, catalyst: 'Banking license' },
  { symbol: 'MARA', name: 'Marathon Digital', price: 22.80, change: 15.5, volume: 65000000, avgVolume: 22000000, ratio: 2.95, catalyst: 'BTC mining output' },
];

export default function UnusualVolumePage() {
  const [minRatio, setMinRatio] = useState(2);

  const filtered = UV_DATA
    .filter((s) => s.ratio >= minRatio)
    .sort((a, b) => b.ratio - a.ratio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Unusual Volume</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks trading at multiples of average daily volume</p>
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-500">Min ratio:</span>
        {[2, 3, 4, 5].map((r) => (
          <button key={r} onClick={() => setMinRatio(r)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors', minRatio === r ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{r}x+</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((stock) => (
          <Card key={stock.symbol} className="!p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                    <Badge variant={stock.ratio >= 4 ? 'danger' : stock.ratio >= 3 ? 'warning' : 'info'}>
                      {stock.ratio.toFixed(1)}x vol
                    </Badge>
                    <span className={cn('text-xs font-mono', stock.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">{stock.name} • {stock.catalyst}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-white">{formatCurrency(stock.price)}</p>
                <p className="text-[10px] text-gray-500">
                  Vol: {formatLargeNumber(stock.volume)} / Avg: {formatLargeNumber(stock.avgVolume)}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-500/60" style={{ width: `${Math.min((stock.ratio / 6) * 100, 100)}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
