'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, formatLargeNumber, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Volume2, Zap } from 'lucide-react';
import Link from 'next/link';

interface Mover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

const GAINERS: Mover[] = [
  { symbol: 'SMCI', name: 'Super Micro Computer', price: 892.45, change: 89.24, changePercent: 11.12, volume: 45000000 },
  { symbol: 'MARA', name: 'Marathon Digital', price: 24.67, change: 2.15, changePercent: 9.54, volume: 32000000 },
  { symbol: 'RIOT', name: 'Riot Platforms', price: 15.89, change: 1.23, changePercent: 8.41, volume: 28000000 },
  { symbol: 'UPST', name: 'Upstart Holdings', price: 34.56, change: 2.45, changePercent: 7.63, volume: 18000000 },
  { symbol: 'SOFI', name: 'SoFi Technologies', price: 9.87, change: 0.67, changePercent: 7.29, volume: 52000000 },
];

const LOSERS: Mover[] = [
  { symbol: 'SNAP', name: 'Snap Inc', price: 11.23, change: -1.89, changePercent: -14.41, volume: 67000000 },
  { symbol: 'PINS', name: 'Pinterest', price: 28.45, change: -3.12, changePercent: -9.88, volume: 25000000 },
  { symbol: 'ZM', name: 'Zoom Video', price: 62.34, change: -5.67, changePercent: -8.34, volume: 12000000 },
  { symbol: 'DOCU', name: 'DocuSign', price: 45.67, change: -3.45, changePercent: -7.02, volume: 8500000 },
  { symbol: 'LYFT', name: 'Lyft Inc', price: 12.34, change: -0.89, changePercent: -6.73, volume: 22000000 },
];

const MOST_ACTIVE: Mover[] = [
  { symbol: 'TSLA', name: 'Tesla Inc', price: 245.67, change: 12.34, changePercent: 5.29, volume: 180000000 },
  { symbol: 'AAPL', name: 'Apple Inc', price: 189.45, change: 2.34, changePercent: 1.25, volume: 95000000 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 925.00, change: 15.67, changePercent: 1.72, volume: 82000000 },
  { symbol: 'AMD', name: 'AMD Inc', price: 178.23, change: -3.45, changePercent: -1.90, volume: 75000000 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 185.40, change: 1.23, changePercent: 0.67, volume: 68000000 },
];

type Tab = 'gainers' | 'losers' | 'active';

function MoverRow({ mover, rank }: { mover: Mover; rank: number }) {
  const positive = mover.change >= 0;
  return (
    <Link
      href={`/stock/${mover.symbol}`}
      className="flex items-center gap-3 rounded-lg border border-white/[0.03] p-3 hover:bg-white/[0.02] transition-colors"
    >
      <span className="text-xs font-mono text-gray-600 w-5">{rank}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-white">{mover.symbol}</span>
          <span className="text-xs text-gray-500 truncate">{mover.name}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm text-white">{formatCurrency(mover.price)}</p>
        <p className={cn('text-xs font-mono', positive ? 'text-green-400' : 'text-red-400')}>
          {positive ? '+' : ''}{mover.changePercent.toFixed(2)}%
        </p>
      </div>
      <div className="hidden sm:block text-right">
        <p className="text-[10px] text-gray-500">Volume</p>
        <p className="text-xs font-mono text-gray-400">{formatLargeNumber(mover.volume)}</p>
      </div>
    </Link>
  );
}

export default function MarketMoversPage() {
  const [tab, setTab] = useState<Tab>('gainers');

  const tabs: { key: Tab; label: string; icon: typeof TrendingUp }[] = [
    { key: 'gainers', label: 'Top Gainers', icon: TrendingUp },
    { key: 'losers', label: 'Top Losers', icon: TrendingDown },
    { key: 'active', label: 'Most Active', icon: Zap },
  ];

  const movers = tab === 'gainers' ? GAINERS : tab === 'losers' ? LOSERS : MOST_ACTIVE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Movers</h1>
        <p className="mt-1 text-sm text-gray-500">Today's biggest movers by percentage change and volume</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              tab === key
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                : 'text-gray-500 border border-white/[0.06] hover:text-gray-300'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Movers list */}
      <Card>
        <div className="space-y-2">
          {movers.map((mover, idx) => (
            <MoverRow key={mover.symbol} mover={mover} rank={idx + 1} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
