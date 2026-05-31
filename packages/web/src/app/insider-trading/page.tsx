'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';
import { Users, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

interface InsiderTrade {
  id: string;
  symbol: string;
  insiderName: string;
  title: string;
  type: 'BUY' | 'SELL';
  shares: number;
  price: number;
  value: number;
  date: string;
}

const MOCK_INSIDER_TRADES: InsiderTrade[] = [
  { id: '1', symbol: 'AAPL', insiderName: 'Tim Cook', title: 'CEO', type: 'SELL', shares: 75000, price: 189.25, value: 14193750, date: '2026-05-28' },
  { id: '2', symbol: 'MSFT', insiderName: 'Satya Nadella', title: 'CEO', type: 'SELL', shares: 50000, price: 425.50, value: 21275000, date: '2026-05-27' },
  { id: '3', symbol: 'NVDA', insiderName: 'Jensen Huang', title: 'CEO', type: 'SELL', shares: 120000, price: 925.00, value: 111000000, date: '2026-05-26' },
  { id: '4', symbol: 'JPM', insiderName: 'Jamie Dimon', title: 'CEO', type: 'SELL', shares: 33000, price: 198.75, value: 6558750, date: '2026-05-25' },
  { id: '5', symbol: 'PLTR', insiderName: 'Peter Thiel', title: 'Director', type: 'BUY', shares: 500000, price: 24.50, value: 12250000, date: '2026-05-24' },
  { id: '6', symbol: 'CRWD', insiderName: 'George Kurtz', title: 'CEO', type: 'BUY', shares: 15000, price: 340.00, value: 5100000, date: '2026-05-23' },
  { id: '7', symbol: 'SNOW', insiderName: 'Frank Slootman', title: 'Director', type: 'BUY', shares: 25000, price: 165.20, value: 4130000, date: '2026-05-22' },
  { id: '8', symbol: 'AMZN', insiderName: 'Andy Jassy', title: 'CEO', type: 'SELL', shares: 18000, price: 185.40, value: 3337200, date: '2026-05-21' },
];

export default function InsiderTradingPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'buys' | 'sells'>('all');

  const filtered = MOCK_INSIDER_TRADES.filter((t) => {
    if (search && !t.symbol.includes(search.toUpperCase()) && !t.insiderName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'buys' && t.type !== 'BUY') return false;
    if (filter === 'sells' && t.type !== 'SELL') return false;
    return true;
  });

  const totalBuyValue = MOCK_INSIDER_TRADES.filter((t) => t.type === 'BUY').reduce((s, t) => s + t.value, 0);
  const totalSellValue = MOCK_INSIDER_TRADES.filter((t) => t.type === 'SELL').reduce((s, t) => s + t.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Insider Trading</h1>
          <p className="mt-1 text-sm text-gray-500">Track corporate insider buying and selling activity</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-9 w-48"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-green-400" />
            <div>
              <p className="text-xs text-gray-500">Insider Buys</p>
              <p className="text-sm font-bold text-green-400">{formatLargeNumber(totalBuyValue)}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <ArrowDownRight className="h-4 w-4 text-red-400" />
            <div>
              <p className="text-xs text-gray-500">Insider Sells</p>
              <p className="text-sm font-bold text-red-400">{formatLargeNumber(totalSellValue)}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-400" />
            <div>
              <p className="text-xs text-gray-500">Buy/Sell Ratio</p>
              <p className="text-sm font-bold text-white">
                {totalSellValue > 0 ? (totalBuyValue / totalSellValue).toFixed(2) : '—'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'buys', 'sells'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300'
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Insider</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Type</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Shares</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Price</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Value</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((trade) => (
                <tr key={trade.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <Link href={`/stock/${trade.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">
                      {trade.symbol}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5">
                    <div>
                      <p className="text-white text-xs font-medium">{trade.insiderName}</p>
                      <p className="text-[10px] text-gray-500">{trade.title}</p>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={trade.type === 'BUY' ? 'success' : 'danger'}>{trade.type}</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-300">{trade.shares.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-gray-300">{formatCurrency(trade.price)}</td>
                  <td className="px-3 py-2.5 text-right font-mono font-medium text-white">{formatLargeNumber(trade.value)}</td>
                  <td className="px-3 py-2.5 text-center text-xs text-gray-400">
                    {new Date(trade.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
