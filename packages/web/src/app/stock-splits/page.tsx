'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Scissors, Calendar } from 'lucide-react';
import Link from 'next/link';

interface StockSplit {
  symbol: string;
  name: string;
  ratio: string;
  exDate: string;
  type: 'forward' | 'reverse';
  preSplitPrice: number;
  postSplitPrice: number;
  status: 'upcoming' | 'completed' | 'announced';
}

const SPLITS: StockSplit[] = [
  { symbol: 'NVDA', name: 'NVIDIA', ratio: '10:1', exDate: 'Jun 10, 2024', type: 'forward', preSplitPrice: 1200, postSplitPrice: 120, status: 'upcoming' },
  { symbol: 'AMZN', name: 'Amazon', ratio: '20:1', exDate: 'Jun 6, 2022', type: 'forward', preSplitPrice: 2447, postSplitPrice: 122.35, status: 'completed' },
  { symbol: 'GOOGL', name: 'Alphabet', ratio: '20:1', exDate: 'Jul 18, 2022', type: 'forward', preSplitPrice: 2255, postSplitPrice: 112.75, status: 'completed' },
  { symbol: 'TSLA', name: 'Tesla', ratio: '3:1', exDate: 'Aug 25, 2022', type: 'forward', preSplitPrice: 891, postSplitPrice: 297, status: 'completed' },
  { symbol: 'SHOP', name: 'Shopify', ratio: '10:1', exDate: 'Jun 29, 2022', type: 'forward', preSplitPrice: 395, postSplitPrice: 39.50, status: 'completed' },
  { symbol: 'GE', name: 'General Electric', ratio: '1:8', exDate: 'Aug 2, 2021', type: 'reverse', preSplitPrice: 12.95, postSplitPrice: 103.60, status: 'completed' },
];

export default function StockSplitsPage() {
  const upcoming = SPLITS.filter((s) => s.status === 'upcoming');
  const completed = SPLITS.filter((s) => s.status === 'completed');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Splits</h1>
        <p className="mt-1 text-sm text-gray-500">Upcoming and recent stock split activity</p>
      </div>

      {upcoming.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-400" />
              Upcoming Splits
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {upcoming.map((split) => (
              <div key={split.symbol} className="flex items-center justify-between p-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-3">
                  <Scissors className="h-4 w-4 text-amber-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/stock/${split.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{split.symbol}</Link>
                      <Badge variant="warning">{split.ratio}</Badge>
                    </div>
                    <p className="text-[10px] text-gray-500">{split.name} • Ex-date: {split.exDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-white">{formatCurrency(split.preSplitPrice)} → {formatCurrency(split.postSplitPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="h-4 w-4 text-indigo-400" />
            Recent Splits
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Ratio</th>
                <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Type</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Pre-Split</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Post-Split</th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((split) => (
                <tr key={split.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <Link href={`/stock/${split.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{split.symbol}</Link>
                    <p className="text-[10px] text-gray-500">{split.name}</p>
                  </td>
                  <td className="px-3 py-2.5 text-center font-mono text-white">{split.ratio}</td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={split.type === 'forward' ? 'success' : 'warning'}>{split.type}</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-400">{formatCurrency(split.preSplitPrice)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-white">{formatCurrency(split.postSplitPrice)}</td>
                  <td className="px-3 py-2.5 text-right text-xs text-gray-500">{split.exDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
