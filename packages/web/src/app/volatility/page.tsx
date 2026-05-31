'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';
import Link from 'next/link';

interface VolData {
  symbol: string;
  name: string;
  iv30: number;
  iv60: number;
  hv30: number;
  ivRank: number;
  ivPercentile: number;
  skew: number;
}

const VOL_DATA: VolData[] = [
  { symbol: 'TSLA', name: 'Tesla', iv30: 62.5, iv60: 58.2, hv30: 48.3, ivRank: 78, ivPercentile: 82, skew: -8.2 },
  { symbol: 'NVDA', name: 'NVIDIA', iv30: 48.2, iv60: 45.1, hv30: 42.5, ivRank: 65, ivPercentile: 72, skew: -5.4 },
  { symbol: 'AAPL', name: 'Apple', iv30: 22.8, iv60: 24.1, hv30: 18.5, ivRank: 35, ivPercentile: 42, skew: -3.1 },
  { symbol: 'MSFT', name: 'Microsoft', iv30: 25.4, iv60: 26.8, hv30: 20.2, ivRank: 42, ivPercentile: 48, skew: -2.8 },
  { symbol: 'AMD', name: 'AMD', iv30: 52.1, iv60: 48.9, hv30: 45.8, ivRank: 58, ivPercentile: 65, skew: -6.5 },
  { symbol: 'AMZN', name: 'Amazon', iv30: 32.4, iv60: 30.8, hv30: 28.1, ivRank: 45, ivPercentile: 52, skew: -4.2 },
  { symbol: 'META', name: 'Meta', iv30: 38.6, iv60: 35.2, hv30: 32.4, ivRank: 55, ivPercentile: 62, skew: -5.8 },
  { symbol: 'COIN', name: 'Coinbase', iv30: 78.4, iv60: 72.1, hv30: 65.2, ivRank: 88, ivPercentile: 92, skew: -12.5 },
  { symbol: 'MARA', name: 'Marathon Digital', iv30: 95.2, iv60: 88.4, hv30: 82.1, ivRank: 92, ivPercentile: 95, skew: -15.2 },
  { symbol: 'SPY', name: 'S&P 500 ETF', iv30: 14.2, iv60: 15.8, hv30: 12.1, ivRank: 22, ivPercentile: 28, skew: -2.5 },
];

export default function VolatilityPage() {
  const [sortBy, setSortBy] = useState<'iv30' | 'ivRank' | 'skew'>('ivRank');

  const sorted = [...VOL_DATA].sort((a, b) => {
    if (sortBy === 'skew') return a.skew - b.skew;
    return b[sortBy] - a[sortBy];
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Volatility Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Implied vs historical volatility analysis</p>
      </div>

      {/* VIX Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">VIX</p>
          <p className="text-xl font-bold text-amber-400">18.42</p>
          <p className="text-[10px] text-gray-600">Market fear gauge</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">VIX 9D</p>
          <p className="text-xl font-bold text-white">15.80</p>
          <p className="text-[10px] text-gray-600">Short-term vol</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">VIX Term Structure</p>
          <p className="text-xl font-bold text-green-400">Contango</p>
          <p className="text-[10px] text-gray-600">Normal conditions</p>
        </Card>
      </div>

      <div className="flex gap-2">
        {([
          { key: 'ivRank' as const, label: 'IV Rank' },
          { key: 'iv30' as const, label: 'IV 30' },
          { key: 'skew' as const, label: 'Skew' },
        ]).map(({ key, label }) => (
          <button key={key} onClick={() => setSortBy(key)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors', sortBy === key ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{label}</button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">IV 30</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">HV 30</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">IV-HV</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">IV Rank</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Skew</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Signal</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((stock) => {
                const ivHvDiff = stock.iv30 - stock.hv30;
                const signal = stock.ivRank > 70 ? 'sell' : stock.ivRank < 30 ? 'buy' : 'neutral';
                return (
                  <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-3 py-2.5">
                      <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                      <p className="text-[10px] text-gray-500">{stock.name}</p>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-white">{stock.iv30.toFixed(1)}%</td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-400">{stock.hv30.toFixed(1)}%</td>
                    <td className={cn('px-3 py-2.5 text-right font-mono text-xs', ivHvDiff > 0 ? 'text-amber-400' : 'text-green-400')}>
                      {ivHvDiff > 0 ? '+' : ''}{ivHvDiff.toFixed(1)}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className={cn('h-full rounded-full', stock.ivRank > 70 ? 'bg-red-500' : stock.ivRank > 40 ? 'bg-amber-500' : 'bg-green-500')}
                            style={{ width: `${stock.ivRank}%` }} />
                        </div>
                        <span className="font-mono text-xs text-gray-300">{stock.ivRank}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-400">{stock.skew.toFixed(1)}</td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant={signal === 'sell' ? 'danger' : signal === 'buy' ? 'success' : 'info'}>
                        {signal === 'sell' ? 'Sell Vol' : signal === 'buy' ? 'Buy Vol' : 'Neutral'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
