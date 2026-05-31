'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface MAData {
  symbol: string;
  price: number;
  sma10: number;
  sma20: number;
  sma50: number;
  sma100: number;
  sma200: number;
  ema12: number;
  ema26: number;
}

const MA_DATA: MAData[] = [
  { symbol: 'AAPL', price: 189.45, sma10: 188.20, sma20: 186.50, sma50: 182.30, sma100: 178.80, sma200: 172.40, ema12: 188.90, ema26: 185.60 },
  { symbol: 'MSFT', price: 415.60, sma10: 413.50, sma20: 410.20, sma50: 402.80, sma100: 388.40, sma200: 365.20, ema12: 414.80, ema26: 408.50 },
  { symbol: 'TSLA', price: 245.80, sma10: 248.50, sma20: 252.30, sma50: 258.60, sma100: 248.20, sma200: 238.50, ema12: 247.20, ema26: 251.80 },
  { symbol: 'NVDA', price: 875.20, sma10: 862.40, sma20: 845.80, sma50: 785.30, sma100: 680.20, sma200: 545.80, ema12: 868.50, ema26: 838.20 },
  { symbol: 'AMZN', price: 178.90, sma10: 176.80, sma20: 174.50, sma50: 168.20, sma100: 155.80, sma200: 142.50, ema12: 177.90, ema26: 173.40 },
  { symbol: 'AMD', price: 172.60, sma10: 174.80, sma20: 176.20, sma50: 168.50, sma100: 158.20, sma200: 142.80, ema12: 173.50, ema26: 174.80 },
  { symbol: 'META', price: 485.30, sma10: 480.20, sma20: 475.50, sma50: 458.80, sma100: 420.50, sma200: 365.80, ema12: 483.20, ema26: 472.50 },
  { symbol: 'GOOGL', price: 155.80, sma10: 154.20, sma20: 152.80, sma50: 148.50, sma100: 140.20, sma200: 132.80, ema12: 155.20, ema26: 151.80 },
];

export default function MovingAveragesPage() {
  const [search, setSearch] = useState('');

  const filtered = MA_DATA.filter((s) => !search || s.symbol.includes(search.toUpperCase()));

  const getSignal = (price: number, ma: number) => price > ma ? 'above' : 'below';
  const countBullish = (stock: MAData) => {
    const mas = [stock.sma10, stock.sma20, stock.sma50, stock.sma100, stock.sma200];
    return mas.filter((ma) => stock.price > ma).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Moving Averages</h1>
          <p className="mt-1 text-sm text-gray-500">Price position relative to key moving averages</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 w-48" />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Price</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">SMA 10</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">SMA 20</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">SMA 50</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">SMA 200</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stock) => {
                const bullCount = countBullish(stock);
                return (
                  <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-3 py-2.5">
                      <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono font-medium text-white">{formatCurrency(stock.price)}</td>
                    <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.price > stock.sma10 ? 'text-green-400' : 'text-red-400')}>
                      {formatCurrency(stock.sma10)}
                    </td>
                    <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.price > stock.sma20 ? 'text-green-400' : 'text-red-400')}>
                      {formatCurrency(stock.sma20)}
                    </td>
                    <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.price > stock.sma50 ? 'text-green-400' : 'text-red-400')}>
                      {formatCurrency(stock.sma50)}
                    </td>
                    <td className={cn('px-3 py-2.5 text-right font-mono text-xs', stock.price > stock.sma200 ? 'text-green-400' : 'text-red-400')}>
                      {formatCurrency(stock.sma200)}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant={bullCount >= 4 ? 'success' : bullCount >= 2 ? 'warning' : 'danger'}>
                        {bullCount}/5
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
