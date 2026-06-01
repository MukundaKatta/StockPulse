'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { HardHat } from 'lucide-react';

interface InfraStock {
  symbol: string;
  name: string;
  subsector: string;
  price: number;
  change: number;
  marketCap: string;
  divYield: number;
  peRatio: number;
  rating: 'Buy' | 'Hold' | 'Sell';
}

const STOCKS: InfraStock[] = [
  { symbol: 'NEE', name: 'NextEra Energy', subsector: 'Utilities', price: 78.50, change: 1.2, marketCap: '$158B', divYield: 2.8, peRatio: 22.4, rating: 'Buy' },
  { symbol: 'AMT', name: 'American Tower', subsector: 'Towers', price: 205.30, change: -0.8, marketCap: '$96B', divYield: 3.2, peRatio: 45.2, rating: 'Hold' },
  { symbol: 'ENB', name: 'Enbridge', subsector: 'Pipelines', price: 36.80, change: 0.5, marketCap: '$78B', divYield: 7.2, peRatio: 17.8, rating: 'Buy' },
  { symbol: 'SRE', name: 'Sempra', subsector: 'Utilities', price: 72.40, change: -1.5, marketCap: '$46B', divYield: 3.4, peRatio: 16.2, rating: 'Hold' },
  { symbol: 'CCI', name: 'Crown Castle', subsector: 'Towers', price: 112.80, change: 2.1, marketCap: '$49B', divYield: 5.5, peRatio: 38.5, rating: 'Sell' },
  { symbol: 'WM', name: 'Waste Management', subsector: 'Waste', price: 212.50, change: 0.3, marketCap: '$86B', divYield: 1.4, peRatio: 32.8, rating: 'Buy' },
  { symbol: 'VMC', name: 'Vulcan Materials', subsector: 'Materials', price: 265.20, change: 1.8, marketCap: '$35B', divYield: 0.7, peRatio: 42.1, rating: 'Hold' },
];

const ratingVariant = (r: string) => r === 'Buy' ? 'success' : r === 'Sell' ? 'danger' : 'default';

export default function InfrastructureStocksPage() {
  const avgYield = STOCKS.reduce((s, st) => s + st.divYield, 0) / STOCKS.length;
  const gainers = STOCKS.filter(s => s.change > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Infrastructure Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Infrastructure sector stock analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers</p><p className="text-lg font-bold text-indigo-400">{gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Buy Rated</p><p className="text-lg font-bold text-cyan-400">{STOCKS.filter(s => s.rating === 'Buy').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><HardHat className="h-4 w-4 text-indigo-400" /> Infrastructure Sector</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <span className="text-[10px] text-gray-400 w-16">{s.subsector}</span>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(s.price)}</span>
              <span className={cn('text-xs font-mono w-12', s.change >= 0 ? 'text-green-400' : 'text-red-400')}>{s.change >= 0 ? '+' : ''}{s.change}%</span>
              <span className="text-[10px] text-gray-500 w-12">{s.marketCap}</span>
              <span className="text-[10px] text-gray-400 w-14">Div {s.divYield}%</span>
              <Badge variant={ratingVariant(s.rating)} className="ml-auto">{s.rating}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
