'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { BookOpen } from 'lucide-react';

interface BookValueData {
  symbol: string;
  name: string;
  bookValuePerShare: number;
  price: number;
  priceToBook: number;
  tangibleBVPS: number;
  totalEquity: number;
  roe: number;
  sector: string;
}

const STOCKS: BookValueData[] = [
  { symbol: 'BRK.B', name: 'Berkshire', bookValuePerShare: 235.42, price: 412.80, priceToBook: 1.75, tangibleBVPS: 220.18, totalEquity: 561.2, roe: 15.8, sector: 'Conglom' },
  { symbol: 'JPM', name: 'JP Morgan', bookValuePerShare: 106.82, price: 188.50, priceToBook: 1.76, tangibleBVPS: 86.41, totalEquity: 308.4, roe: 17.2, sector: 'Finance' },
  { symbol: 'BAC', name: 'Bank of America', bookValuePerShare: 33.48, price: 34.20, priceToBook: 1.02, tangibleBVPS: 24.88, totalEquity: 264.8, roe: 10.4, sector: 'Finance' },
  { symbol: 'XOM', name: 'Exxon Mobil', bookValuePerShare: 54.18, price: 104.60, priceToBook: 1.93, tangibleBVPS: 48.52, totalEquity: 218.5, roe: 18.6, sector: 'Energy' },
  { symbol: 'INTC', name: 'Intel', bookValuePerShare: 24.15, price: 43.80, priceToBook: 1.81, tangibleBVPS: 14.82, totalEquity: 100.2, roe: 1.8, sector: 'Tech' },
  { symbol: 'GM', name: 'General Motors', bookValuePerShare: 46.25, price: 38.40, priceToBook: 0.83, tangibleBVPS: 32.10, totalEquity: 64.8, roe: 12.4, sector: 'Auto' },
  { symbol: 'F', name: 'Ford Motor', bookValuePerShare: 13.52, price: 12.10, priceToBook: 0.89, tangibleBVPS: 8.24, totalEquity: 54.2, roe: 8.2, sector: 'Auto' },
  { symbol: 'WFC', name: 'Wells Fargo', bookValuePerShare: 44.68, price: 52.40, priceToBook: 1.17, tangibleBVPS: 37.25, totalEquity: 164.8, roe: 12.8, sector: 'Finance' },
];

export default function BookValuePage() {
  const avgPB = STOCKS.reduce((s, st) => s + st.priceToBook, 0) / STOCKS.length;
  const belowBook = STOCKS.filter((s) => s.priceToBook < 1.0).length;
  const avgRoe = STOCKS.reduce((s, st) => s + st.roe, 0) / STOCKS.length;
  const totalEquity = STOCKS.reduce((s, st) => s + st.totalEquity, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Book Value</h1>
        <p className="mt-1 text-sm text-gray-500">Book value per share and price-to-book analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg P/B Ratio</p>
          <p className="text-lg font-bold text-white">{avgPB.toFixed(2)}x</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Below Book</p>
          <p className="text-lg font-bold text-green-400">{belowBook}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg ROE</p>
          <p className="text-lg font-bold text-indigo-400">{avgRoe.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total Equity</p>
          <p className="text-lg font-bold text-white">${(totalEquity / 1000).toFixed(1)}T</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-indigo-400" /> Book Value per Share
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => a.priceToBook - b.priceToBook).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <Badge variant={s.sector === 'Finance' ? 'info' : s.sector === 'Energy' ? 'warning' : s.sector === 'Auto' ? 'success' : 'default'}>
                {s.sector}
              </Badge>
              <span className="text-xs font-mono text-white w-16">BVPS: {formatCurrency(s.bookValuePerShare)}</span>
              <span className="text-xs font-mono text-gray-400 w-16">Price: {formatCurrency(s.price)}</span>
              <span className={cn('text-xs font-mono w-12', s.priceToBook < 1 ? 'text-green-400' : s.priceToBook < 1.5 ? 'text-amber-400' : 'text-white')}>
                {s.priceToBook.toFixed(2)}x
              </span>
              <span className="text-[10px] text-gray-500 ml-auto">ROE: {s.roe}%</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
