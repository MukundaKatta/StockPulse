'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { Eye } from 'lucide-react';

interface InsiderActivity {
  symbol: string;
  name: string;
  buyCount: number;
  sellCount: number;
  netValue: number;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  lastTrade: string;
}

const ACTIVITY: InsiderActivity[] = [
  { symbol: 'JPM', name: 'JP Morgan', buyCount: 8, sellCount: 2, netValue: 12.5e6, sentiment: 'Bullish', lastTrade: '2024-02-05' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', buyCount: 1, sellCount: 12, netValue: -85.2e6, sentiment: 'Bearish', lastTrade: '2024-02-08' },
  { symbol: 'META', name: 'Meta Platforms', buyCount: 0, sellCount: 8, netValue: -42.8e6, sentiment: 'Bearish', lastTrade: '2024-02-06' },
  { symbol: 'AAPL', name: 'Apple Inc', buyCount: 2, sellCount: 5, netValue: -18.5e6, sentiment: 'Bearish', lastTrade: '2024-02-04' },
  { symbol: 'BAC', name: 'Bank of America', buyCount: 6, sellCount: 1, netValue: 8.2e6, sentiment: 'Bullish', lastTrade: '2024-02-07' },
  { symbol: 'WMT', name: 'Walmart Inc', buyCount: 4, sellCount: 3, netValue: 2.1e6, sentiment: 'Neutral', lastTrade: '2024-02-03' },
  { symbol: 'AMZN', name: 'Amazon.com', buyCount: 0, sellCount: 6, netValue: -32.4e6, sentiment: 'Bearish', lastTrade: '2024-02-08' },
  { symbol: 'GS', name: 'Goldman Sachs', buyCount: 5, sellCount: 0, netValue: 15.8e6, sentiment: 'Bullish', lastTrade: '2024-02-06' },
  { symbol: 'DIS', name: 'Walt Disney', buyCount: 3, sellCount: 1, netValue: 4.5e6, sentiment: 'Bullish', lastTrade: '2024-02-02' },
  { symbol: 'TSLA', name: 'Tesla Inc', buyCount: 0, sellCount: 10, netValue: -125.4e6, sentiment: 'Bearish', lastTrade: '2024-02-07' },
];

export default function InsiderSentimentPage() {
  const bullish = ACTIVITY.filter((a) => a.sentiment === 'Bullish').length;
  const bearish = ACTIVITY.filter((a) => a.sentiment === 'Bearish').length;
  const netFlow = ACTIVITY.reduce((s, a) => s + a.netValue, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Insider Sentiment</h1>
        <p className="mt-1 text-sm text-gray-500">Corporate insider buying and selling activity (30-day)</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Net Flow</p><p className={cn('text-lg font-bold', netFlow >= 0 ? 'text-green-400' : 'text-red-400')}>{formatLargeNumber(netFlow)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Tracked</p><p className="text-lg font-bold text-white">{ACTIVITY.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Eye className="h-4 w-4 text-indigo-400" /> Insider Activity</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ACTIVITY.sort((a, b) => b.netValue - a.netValue).map((a) => (
            <div key={a.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20"><p className="text-xs font-bold text-white">{a.symbol}</p><p className="text-[10px] text-gray-500 truncate">{a.name}</p></div>
              <span className="text-xs font-mono text-green-400 w-10">{a.buyCount} buy</span>
              <span className="text-xs font-mono text-red-400 w-10">{a.sellCount} sell</span>
              <span className={cn('text-xs font-mono w-16', a.netValue >= 0 ? 'text-green-400' : 'text-red-400')}>{formatLargeNumber(a.netValue)}</span>
              <Badge variant={a.sentiment === 'Bullish' ? 'success' : a.sentiment === 'Bearish' ? 'danger' : 'default'}>{a.sentiment}</Badge>
              <span className="text-[10px] text-gray-500 ml-auto">{a.lastTrade}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
