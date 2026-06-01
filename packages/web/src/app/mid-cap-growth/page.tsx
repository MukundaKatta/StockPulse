'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Rocket } from 'lucide-react';

interface MidCapGrowth {
  symbol: string;
  name: string;
  price: number;
  marketCap: string;
  revenueGrowth: number;
  earningsGrowth: number;
  peRatio: number;
  pegRatio: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
}

const STOCKS: MidCapGrowth[] = [
  { symbol: 'DECK', name: 'Deckers Outdoor', price: 685.20, marketCap: '$18.2B', revenueGrowth: 18.5, earningsGrowth: 24.8, peRatio: 28.5, pegRatio: 1.15, rating: 'Strong Buy' },
  { symbol: 'AXON', name: 'Axon Enterprise', price: 312.40, marketCap: '$23.5B', revenueGrowth: 32.4, earningsGrowth: 45.2, peRatio: 85.2, pegRatio: 1.88, rating: 'Buy' },
  { symbol: 'GDDY', name: 'GoDaddy', price: 118.50, marketCap: '$18.8B', revenueGrowth: 8.2, earningsGrowth: 35.8, peRatio: 32.4, pegRatio: 0.90, rating: 'Strong Buy' },
  { symbol: 'FIX', name: 'Comfort Systems', price: 285.60, marketCap: '$10.2B', revenueGrowth: 22.8, earningsGrowth: 28.5, peRatio: 25.8, pegRatio: 0.91, rating: 'Buy' },
  { symbol: 'WDAY', name: 'Workday', price: 262.80, marketCap: '$68.5B', revenueGrowth: 15.8, earningsGrowth: 42.5, peRatio: 45.2, pegRatio: 1.06, rating: 'Buy' },
  { symbol: 'TOST', name: 'Toast Inc', price: 28.50, marketCap: '$15.8B', revenueGrowth: 28.5, earningsGrowth: 125.0, peRatio: 142.5, pegRatio: 1.14, rating: 'Hold' },
  { symbol: 'DUOL', name: 'Duolingo', price: 215.40, marketCap: '$9.2B', revenueGrowth: 42.5, earningsGrowth: 180.0, peRatio: 215.0, pegRatio: 1.19, rating: 'Buy' },
];

const ratingVariant = (r: string) => r === 'Strong Buy' ? 'success' : r === 'Buy' ? 'info' : r === 'Hold' ? 'warning' : 'danger';

export default function MidCapGrowthPage() {
  const avgRevGrowth = STOCKS.reduce((s, st) => s + st.revenueGrowth, 0) / STOCKS.length;
  const avgPeg = STOCKS.reduce((s, st) => s + st.pegRatio, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Mid-Cap Growth</h1>
        <p className="mt-1 text-sm text-gray-500">Mid-cap growth stock screener and analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Rev Growth</p><p className="text-lg font-bold text-green-400">{avgRevGrowth.toFixed(0)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg PEG</p><p className="text-lg font-bold text-indigo-400">{avgPeg.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Buy</p><p className="text-lg font-bold text-cyan-400">{STOCKS.filter(s => s.rating === 'Strong Buy').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Rocket className="h-4 w-4 text-indigo-400" /> Mid-Cap Growth Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(s.price)}</span>
              <span className="text-xs font-mono text-green-400 w-12">Rev +{s.revenueGrowth}%</span>
              <span className="text-[10px] text-gray-400 w-14">P/E {s.peRatio}</span>
              <span className="text-[10px] text-indigo-400 w-14">PEG {s.pegRatio}</span>
              <span className="text-[10px] text-gray-500 w-12">{s.marketCap}</span>
              <Badge variant={ratingVariant(s.rating)} className="ml-auto">{s.rating}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
