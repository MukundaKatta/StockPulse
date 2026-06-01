'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface AnnualizedReturn {
  fund: string;
  ticker: string;
  oneYear: number;
  threeYear: number;
  fiveYear: number;
  tenYear: number;
  totalReturn: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Underperform';
}

const RETURNS: AnnualizedReturn[] = [
  { fund: 'S&P 500 Index', ticker: 'SPY', oneYear: 24.5, threeYear: 10.2, fiveYear: 15.1, tenYear: 12.8, totalReturn: 245000, rating: 'Strong Buy' },
  { fund: 'Nasdaq 100', ticker: 'QQQ', oneYear: 31.2, threeYear: 12.8, fiveYear: 19.4, tenYear: 18.2, totalReturn: 312000, rating: 'Strong Buy' },
  { fund: 'Total Bond Market', ticker: 'BND', oneYear: 2.8, threeYear: -1.2, fiveYear: 1.1, tenYear: 2.4, totalReturn: 28000, rating: 'Hold' },
  { fund: 'International Dev', ticker: 'EFA', oneYear: 12.4, threeYear: 5.6, fiveYear: 7.2, tenYear: 5.8, totalReturn: 124000, rating: 'Buy' },
  { fund: 'Emerging Markets', ticker: 'VWO', oneYear: 8.1, threeYear: -2.4, fiveYear: 3.5, tenYear: 3.2, totalReturn: 81000, rating: 'Hold' },
  { fund: 'Real Estate', ticker: 'VNQ', oneYear: 6.5, threeYear: 1.8, fiveYear: 4.2, tenYear: 6.1, totalReturn: 65000, rating: 'Underperform' },
  { fund: 'Small Cap Value', ticker: 'VBR', oneYear: 15.8, threeYear: 8.4, fiveYear: 10.6, tenYear: 9.2, totalReturn: 158000, rating: 'Buy' },
];

const ratingVariant = (r: string) => r === 'Strong Buy' ? 'success' : r === 'Buy' ? 'info' : r === 'Hold' ? 'warning' : 'danger';

export default function AnnualizedReturnsPage() {
  const avgOneYear = RETURNS.reduce((s, r) => s + r.oneYear, 0) / RETURNS.length;
  const avgFiveYear = RETURNS.reduce((s, r) => s + r.fiveYear, 0) / RETURNS.length;
  const bestPerformer = RETURNS.reduce((best, r) => r.oneYear > best.oneYear ? r : best);
  const totalInvested = RETURNS.reduce((s, r) => s + r.totalReturn, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Annualized Returns</h1>
        <p className="mt-1 text-sm text-gray-500">Annualized return calculations across funds</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg 1Y Return</p><p className="text-lg font-bold text-green-400">{avgOneYear.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg 5Y Return</p><p className="text-lg font-bold text-indigo-400">{avgFiveYear.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Best 1Y</p><p className="text-lg font-bold text-white">{bestPerformer.ticker}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Returns</p><p className="text-lg font-bold text-white">{formatCurrency(totalInvested)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-indigo-400" /> Annualized Performance</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {RETURNS.map((r) => (
            <div key={r.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{r.ticker} <span className="text-gray-500">{r.fund}</span></p>
                <p className="text-xs text-gray-500">3Y {r.threeYear}% &middot; 5Y {r.fiveYear}% &middot; 10Y {r.tenYear}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', r.oneYear >= 0 ? 'text-green-400' : 'text-red-400')}>{r.oneYear > 0 ? '+' : ''}{r.oneYear}% 1Y</p>
                  <p className="text-[10px] text-gray-500">{formatCurrency(r.totalReturn)}</p>
                </div>
                <Badge variant={ratingVariant(r.rating)}>{r.rating}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
