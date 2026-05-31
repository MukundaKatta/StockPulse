'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Zap } from 'lucide-react';
import Link from 'next/link';

interface RSData {
  symbol: string;
  name: string;
  rsRating: number;
  rsVsSpy1M: number;
  rsVsSpy3M: number;
  rsVsSpy6M: number;
  trend: 'up' | 'down' | 'flat';
}

const RS_DATA: RSData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', rsRating: 99, rsVsSpy1M: 12.5, rsVsSpy3M: 28.4, rsVsSpy6M: 85.2, trend: 'up' },
  { symbol: 'SMCI', name: 'Super Micro', rsRating: 98, rsVsSpy1M: 18.2, rsVsSpy3M: 42.1, rsVsSpy6M: 120.5, trend: 'up' },
  { symbol: 'META', name: 'Meta', rsRating: 95, rsVsSpy1M: 8.4, rsVsSpy3M: 15.8, rsVsSpy6M: 32.4, trend: 'up' },
  { symbol: 'AVGO', name: 'Broadcom', rsRating: 94, rsVsSpy1M: 6.2, rsVsSpy3M: 14.2, rsVsSpy6M: 28.5, trend: 'up' },
  { symbol: 'LLY', name: 'Eli Lilly', rsRating: 92, rsVsSpy1M: 5.8, rsVsSpy3M: 12.5, rsVsSpy6M: 35.2, trend: 'up' },
  { symbol: 'MSFT', name: 'Microsoft', rsRating: 88, rsVsSpy1M: 3.2, rsVsSpy3M: 8.5, rsVsSpy6M: 15.8, trend: 'up' },
  { symbol: 'AAPL', name: 'Apple', rsRating: 72, rsVsSpy1M: -1.2, rsVsSpy3M: 2.4, rsVsSpy6M: 8.5, trend: 'flat' },
  { symbol: 'TSLA', name: 'Tesla', rsRating: 28, rsVsSpy1M: -8.5, rsVsSpy3M: -15.2, rsVsSpy6M: -22.4, trend: 'down' },
  { symbol: 'DIS', name: 'Disney', rsRating: 22, rsVsSpy1M: -5.2, rsVsSpy3M: -12.8, rsVsSpy6M: -18.5, trend: 'down' },
  { symbol: 'PYPL', name: 'PayPal', rsRating: 15, rsVsSpy1M: -10.2, rsVsSpy3M: -18.5, rsVsSpy6M: -32.1, trend: 'down' },
];

export default function RelativeStrengthPage() {
  const [minRS, setMinRS] = useState(0);

  const filtered = RS_DATA.filter((s) => s.rsRating >= minRS).sort((a, b) => b.rsRating - a.rsRating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Relative Strength</h1>
        <p className="mt-1 text-sm text-gray-500">Stock performance relative to S&P 500</p>
      </div>

      <div className="flex gap-2">
        {[0, 50, 70, 90].map((min) => (
          <button key={min} onClick={() => setMinRS(min)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors', minRS === min ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{min === 0 ? 'All' : `RS ≥ ${min}`}</button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">RS Rating</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">vs SPY 1M</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">vs SPY 3M</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">vs SPY 6M</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stock) => (
                <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                    <p className="text-[10px] text-gray-500">{stock.name}</p>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className={cn('h-full rounded-full', stock.rsRating >= 80 ? 'bg-green-500' : stock.rsRating >= 50 ? 'bg-amber-500' : 'bg-red-500')}
                          style={{ width: `${stock.rsRating}%` }} />
                      </div>
                      <span className={cn('font-mono text-xs font-medium', stock.rsRating >= 80 ? 'text-green-400' : stock.rsRating >= 50 ? 'text-amber-400' : 'text-red-400')}>
                        {stock.rsRating}
                      </span>
                    </div>
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.rsVsSpy1M >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {stock.rsVsSpy1M >= 0 ? '+' : ''}{stock.rsVsSpy1M.toFixed(1)}%
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.rsVsSpy3M >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {stock.rsVsSpy3M >= 0 ? '+' : ''}{stock.rsVsSpy3M.toFixed(1)}%
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.rsVsSpy6M >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {stock.rsVsSpy6M >= 0 ? '+' : ''}{stock.rsVsSpy6M.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={stock.trend === 'up' ? 'success' : stock.trend === 'down' ? 'danger' : 'info'}>
                      {stock.trend}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
