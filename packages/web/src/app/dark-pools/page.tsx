'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatLargeNumber, formatCurrency, cn } from '@/lib/formatters';
import { Search, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface DarkPoolTrade {
  symbol: string;
  price: number;
  size: number;
  time: string;
  exchange: string;
  side: 'buy' | 'sell' | 'unknown';
  premium: number;
}

const MOCK_TRADES: DarkPoolTrade[] = [
  { symbol: 'AAPL', price: 189.45, size: 250000, time: '14:32:15', exchange: 'FINRA ADF', side: 'buy', premium: 0.12 },
  { symbol: 'TSLA', price: 245.80, size: 180000, time: '14:30:42', exchange: 'IEX', side: 'sell', premium: -0.08 },
  { symbol: 'NVDA', price: 875.20, size: 95000, time: '14:29:58', exchange: 'FINRA ADF', side: 'buy', premium: 0.25 },
  { symbol: 'MSFT', price: 415.60, size: 120000, time: '14:28:33', exchange: 'CBOE BYX', side: 'unknown', premium: 0.03 },
  { symbol: 'AMZN', price: 178.90, size: 300000, time: '14:27:11', exchange: 'FINRA ADF', side: 'buy', premium: 0.18 },
  { symbol: 'META', price: 485.30, size: 85000, time: '14:26:45', exchange: 'IEX', side: 'sell', premium: -0.15 },
  { symbol: 'JPM', price: 195.40, size: 200000, time: '14:25:22', exchange: 'CBOE BYX', side: 'buy', premium: 0.09 },
  { symbol: 'GOOGL', price: 155.80, size: 350000, time: '14:24:18', exchange: 'FINRA ADF', side: 'buy', premium: 0.22 },
  { symbol: 'SPY', price: 502.15, size: 500000, time: '14:23:55', exchange: 'FINRA ADF', side: 'unknown', premium: 0.01 },
  { symbol: 'AMD', price: 172.60, size: 150000, time: '14:22:30', exchange: 'IEX', side: 'sell', premium: -0.11 },
  { symbol: 'QQQ', price: 435.20, size: 280000, time: '14:21:08', exchange: 'CBOE BYX', side: 'buy', premium: 0.14 },
  { symbol: 'BAC', price: 35.80, size: 450000, time: '14:20:44', exchange: 'FINRA ADF', side: 'buy', premium: 0.06 },
];

export default function DarkPoolsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');

  const filtered = MOCK_TRADES
    .filter((t) => !search || t.symbol.includes(search.toUpperCase()))
    .filter((t) => filter === 'all' || t.side === filter);

  const totalVolume = MOCK_TRADES.reduce((sum, t) => sum + t.size * t.price, 0);
  const buyVolume = MOCK_TRADES.filter((t) => t.side === 'buy').reduce((sum, t) => sum + t.size * t.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dark Pool Activity</h1>
          <p className="mt-1 text-sm text-gray-500">Large institutional block trades on dark venues</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter symbol..." className="pl-9 w-48" />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total Volume</p>
          <p className="text-sm font-bold text-white">{formatCurrency(totalVolume)}</p>
          <p className="text-[10px] text-gray-600">{MOCK_TRADES.length} prints</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Buy Pressure</p>
          <p className="text-sm font-bold text-green-400">{((buyVolume / totalVolume) * 100).toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Block Size</p>
          <p className="text-sm font-bold text-white">{formatLargeNumber(MOCK_TRADES.reduce((s, t) => s + t.size, 0) / MOCK_TRADES.length)}</p>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'buy', 'sell'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f}</button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Time</th>
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Price</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Size</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Notional</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Side</th>
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Venue</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((trade, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5 font-mono text-xs text-gray-500">{trade.time}</td>
                  <td className="px-3 py-2.5">
                    <Link href={`/stock/${trade.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{trade.symbol}</Link>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-300">${trade.price.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-400">{formatLargeNumber(trade.size)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-white font-medium">{formatCurrency(trade.price * trade.size)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={trade.side === 'buy' ? 'success' : trade.side === 'sell' ? 'danger' : 'info'}>
                      {trade.side}
                    </Badge>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{trade.exchange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
