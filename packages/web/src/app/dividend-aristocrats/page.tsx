'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Crown } from 'lucide-react';

interface Aristocrat {
  symbol: string;
  name: string;
  years: number;
  yield: number;
  sector: string;
  price: number;
  change5Y: number;
}

const ARISTOCRATS: Aristocrat[] = [
  { symbol: 'JNJ', name: 'Johnson & Johnson', years: 62, yield: 3.05, sector: 'Healthcare', price: 157.40, change5Y: 12.4 },
  { symbol: 'PG', name: 'Procter & Gamble', years: 68, yield: 2.45, sector: 'Consumer Staples', price: 162.85, change5Y: 28.6 },
  { symbol: 'KO', name: 'Coca-Cola Co', years: 62, yield: 3.10, sector: 'Consumer Staples', price: 60.20, change5Y: 15.2 },
  { symbol: 'MMM', name: '3M Company', years: 66, yield: 5.52, sector: 'Industrials', price: 92.75, change5Y: -48.3 },
  { symbol: 'EMR', name: 'Emerson Electric', years: 67, yield: 2.08, sector: 'Industrials', price: 100.45, change5Y: 42.1 },
  { symbol: 'CL', name: 'Colgate-Palmolive', years: 61, yield: 2.28, sector: 'Consumer Staples', price: 82.30, change5Y: 18.7 },
  { symbol: 'ABT', name: 'Abbott Labs', years: 52, yield: 1.88, sector: 'Healthcare', price: 112.60, change5Y: 35.4 },
  { symbol: 'T', name: 'AT&T Inc', years: 40, yield: 6.45, sector: 'Communication', price: 17.10, change5Y: -55.2 },
  { symbol: 'XOM', name: 'Exxon Mobil', years: 41, yield: 3.38, sector: 'Energy', price: 104.85, change5Y: 68.9 },
  { symbol: 'WMT', name: 'Walmart Inc', years: 51, yield: 1.42, sector: 'Consumer Staples', price: 168.50, change5Y: 52.3 },
];

export default function DividendAristocratsPage() {
  const avgYield = ARISTOCRATS.reduce((s, a) => s + a.yield, 0) / ARISTOCRATS.length;
  const avgYears = Math.round(ARISTOCRATS.reduce((s, a) => s + a.years, 0) / ARISTOCRATS.length);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dividend Aristocrats</h1>
        <p className="mt-1 text-sm text-gray-500">S&P 500 stocks with 25+ years of consecutive dividend increases</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Avg Yield</p>
          <p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Avg Streak</p>
          <p className="text-lg font-bold text-indigo-400">{avgYears} yrs</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Count</p>
          <p className="text-lg font-bold text-white">{ARISTOCRATS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Crown className="h-4 w-4 text-yellow-400" /> Aristocrats
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {ARISTOCRATS.sort((a, b) => b.years - a.years).map((a) => (
            <div key={a.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{a.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{a.name}</p>
              </div>
              <Badge variant="info">{a.sector}</Badge>
              <span className="text-xs font-mono text-yellow-400 w-14">{a.years} yrs</span>
              <span className="text-xs font-mono text-green-400 w-14">{a.yield.toFixed(2)}%</span>
              <span className="text-xs font-mono text-gray-400 w-16">${a.price.toFixed(2)}</span>
              <span className={cn('text-xs font-mono w-16 text-right', a.change5Y >= 0 ? 'text-green-400' : 'text-red-400')}>
                {a.change5Y >= 0 ? '+' : ''}{a.change5Y.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
