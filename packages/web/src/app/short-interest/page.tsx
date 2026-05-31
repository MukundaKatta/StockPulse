'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatLargeNumber, formatPercent, cn } from '@/lib/formatters';
import { Search, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

interface ShortData {
  symbol: string;
  name: string;
  shortInterest: number;
  shortPercent: number;
  daysToClose: number;
  change: number;
  fee: number;
}

const MOCK_SHORT: ShortData[] = [
  { symbol: 'GME', name: 'GameStop', shortInterest: 45000000, shortPercent: 24.5, daysToClose: 3.2, change: 5.3, fee: 8.5 },
  { symbol: 'AMC', name: 'AMC Entertainment', shortInterest: 89000000, shortPercent: 21.8, daysToClose: 2.8, change: -2.1, fee: 6.2 },
  { symbol: 'BBBY', name: 'Bed Bath & Beyond', shortInterest: 32000000, shortPercent: 42.1, daysToClose: 5.6, change: 12.4, fee: 45.0 },
  { symbol: 'CVNA', name: 'Carvana', shortInterest: 28000000, shortPercent: 32.5, daysToClose: 4.1, change: -8.3, fee: 12.8 },
  { symbol: 'BYND', name: 'Beyond Meat', shortInterest: 12000000, shortPercent: 38.2, daysToClose: 6.2, change: 3.7, fee: 15.4 },
  { symbol: 'UPST', name: 'Upstart Holdings', shortInterest: 18000000, shortPercent: 28.9, daysToClose: 3.5, change: -4.2, fee: 9.1 },
  { symbol: 'RIVN', name: 'Rivian Automotive', shortInterest: 65000000, shortPercent: 15.3, daysToClose: 2.1, change: 1.8, fee: 3.5 },
  { symbol: 'LCID', name: 'Lucid Group', shortInterest: 95000000, shortPercent: 18.7, daysToClose: 2.4, change: -6.1, fee: 4.2 },
  { symbol: 'SPCE', name: 'Virgin Galactic', shortInterest: 22000000, shortPercent: 35.4, daysToClose: 7.8, change: 8.9, fee: 22.1 },
  { symbol: 'MSTR', name: 'MicroStrategy', shortInterest: 8000000, shortPercent: 19.2, daysToClose: 2.9, change: 15.2, fee: 7.8 },
];

export default function ShortInterestPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'shortPercent' | 'daysToClose' | 'change'>('shortPercent');

  const filtered = MOCK_SHORT
    .filter((s) => !search || s.symbol.includes(search.toUpperCase()) || s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'change' ? Math.abs(b[sortBy]) - Math.abs(a[sortBy]) : b[sortBy] - a[sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Short Interest</h1>
          <p className="mt-1 text-sm text-gray-500">Stocks with highest short interest and squeeze potential</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 w-48" />
        </div>
      </div>

      {/* Sort options */}
      <div className="flex gap-2">
        {([
          { key: 'shortPercent', label: 'Short %' },
          { key: 'daysToClose', label: 'Days to Cover' },
          { key: 'change', label: 'SI Change' },
        ] as const).map(({ key, label }) => (
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
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Short Interest</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Short %</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Days to Cover</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">SI Change</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Borrow Fee</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Squeeze</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stock) => {
                const squeezeRisk = stock.shortPercent > 30 && stock.daysToClose > 4 ? 'high' : stock.shortPercent > 20 ? 'medium' : 'low';
                return (
                  <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-3 py-2.5">
                      <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                      <p className="text-[10px] text-gray-500">{stock.name}</p>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-300">{formatLargeNumber(stock.shortInterest)}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-medium text-white">{stock.shortPercent.toFixed(1)}%</td>
                    <td className="px-3 py-2.5 text-right font-mono text-gray-400">{stock.daysToClose.toFixed(1)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className={cn('font-mono text-xs', stock.change >= 0 ? 'text-red-400' : 'text-green-400')}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-amber-400 text-xs">{stock.fee.toFixed(1)}%</td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant={squeezeRisk === 'high' ? 'danger' : squeezeRisk === 'medium' ? 'warning' : 'info'}>
                        {squeezeRisk}
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
