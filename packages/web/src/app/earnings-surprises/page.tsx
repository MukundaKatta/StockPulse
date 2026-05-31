'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

interface EarningsSurprise {
  symbol: string;
  name: string;
  reportDate: string;
  epsEstimate: number;
  epsActual: number;
  surprise: number;
  revenueEstimate: number;
  revenueActual: number;
  afterHoursMove: number;
}

const SURPRISES: EarningsSurprise[] = [
  { symbol: 'NVDA', name: 'NVIDIA', reportDate: 'Feb 21', epsEstimate: 4.52, epsActual: 5.16, surprise: 14.2, revenueEstimate: 20100000000, revenueActual: 22100000000, afterHoursMove: 8.5 },
  { symbol: 'META', name: 'Meta', reportDate: 'Feb 1', epsEstimate: 4.82, epsActual: 5.33, surprise: 10.6, revenueEstimate: 38900000000, revenueActual: 40100000000, afterHoursMove: 15.2 },
  { symbol: 'AMZN', name: 'Amazon', reportDate: 'Feb 1', epsEstimate: 0.78, epsActual: 1.00, surprise: 28.2, revenueEstimate: 166000000000, revenueActual: 170000000000, afterHoursMove: 7.8 },
  { symbol: 'MSFT', name: 'Microsoft', reportDate: 'Jan 30', epsEstimate: 2.75, epsActual: 2.93, surprise: 6.5, revenueEstimate: 61000000000, revenueActual: 62000000000, afterHoursMove: 3.2 },
  { symbol: 'AAPL', name: 'Apple', reportDate: 'Feb 1', epsEstimate: 2.09, epsActual: 2.18, surprise: 4.3, revenueEstimate: 117000000000, revenueActual: 119000000000, afterHoursMove: 2.1 },
  { symbol: 'TSLA', name: 'Tesla', reportDate: 'Jan 24', epsEstimate: 0.72, epsActual: 0.71, surprise: -1.4, revenueEstimate: 25000000000, revenueActual: 25200000000, afterHoursMove: -5.8 },
  { symbol: 'SNAP', name: 'Snap', reportDate: 'Feb 6', epsEstimate: 0.05, epsActual: -0.02, surprise: -140, revenueEstimate: 1380000000, revenueActual: 1360000000, afterHoursMove: -12.4 },
  { symbol: 'NFLX', name: 'Netflix', reportDate: 'Jan 23', epsEstimate: 2.12, epsActual: 2.11, surprise: -0.5, revenueEstimate: 8710000000, revenueActual: 8830000000, afterHoursMove: 12.8 },
];

export default function EarningsSurprisesPage() {
  const [filter, setFilter] = useState<'all' | 'beat' | 'miss'>('all');

  const filtered = SURPRISES
    .filter((s) => filter === 'all' || (filter === 'beat' ? s.surprise > 0 : s.surprise < 0))
    .sort((a, b) => Math.abs(b.surprise) - Math.abs(a.surprise));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Earnings Surprises</h1>
        <p className="mt-1 text-sm text-gray-500">Recent earnings beats and misses with price reactions</p>
      </div>

      <div className="flex gap-2">
        {(['all', 'beat', 'miss'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f === 'beat' ? 'Beats' : f === 'miss' ? 'Misses' : 'All'}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((s) => (
          <Card key={s.symbol} className="!p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', s.surprise > 0 ? 'bg-green-500/10' : 'bg-red-500/10')}>
                  {s.surprise > 0 ? <TrendingUp className="h-4 w-4 text-green-400" /> : <TrendingDown className="h-4 w-4 text-red-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/stock/${s.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{s.symbol}</Link>
                    <Badge variant={s.surprise > 0 ? 'success' : 'danger'}>
                      {s.surprise > 0 ? 'Beat' : 'Miss'}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-gray-500">{s.name} • {s.reportDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-right">
                <div>
                  <p className="text-[10px] text-gray-500">EPS Surprise</p>
                  <p className={cn('text-xs font-mono font-medium', s.surprise > 0 ? 'text-green-400' : 'text-red-400')}>
                    {s.surprise > 0 ? '+' : ''}{s.surprise.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">EPS</p>
                  <p className="text-xs font-mono text-white">${s.epsActual.toFixed(2)} vs ${s.epsEstimate.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">AH Move</p>
                  <p className={cn('text-xs font-mono font-medium', s.afterHoursMove >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {s.afterHoursMove >= 0 ? '+' : ''}{s.afterHoursMove.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
