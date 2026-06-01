'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Search } from 'lucide-react';

interface ScreenerResult {
  symbol: string;
  name: string;
  price: number;
  pe: number;
  pegRatio: number;
  revenueGrowth: number;
  epsGrowth: number;
  marketCap: string;
  score: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
}

const RESULTS: ScreenerResult[] = [
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, pe: 24.8, pegRatio: 0.85, revenueGrowth: 15.4, epsGrowth: 28.2, marketCap: '$1.78T', score: 'Strong Buy' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, pe: 26.1, pegRatio: 0.92, revenueGrowth: 22.1, epsGrowth: 35.8, marketCap: '$1.24T', score: 'Strong Buy' },
  { symbol: 'AMZN', name: 'Amazon', price: 190.30, pe: 52.4, pegRatio: 1.15, revenueGrowth: 12.5, epsGrowth: 48.0, marketCap: '$1.98T', score: 'Buy' },
  { symbol: 'UNH', name: 'UnitedHealth', price: 528.40, pe: 19.2, pegRatio: 1.42, revenueGrowth: 14.8, epsGrowth: 12.5, marketCap: '$488B', score: 'Buy' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.20, pe: 10.8, pegRatio: 2.15, revenueGrowth: 4.2, epsGrowth: 5.8, marketCap: '$381B', score: 'Hold' },
  { symbol: 'PFE', name: 'Pfizer', price: 28.50, pe: 45.2, pegRatio: 3.80, revenueGrowth: -42.0, epsGrowth: -65.0, marketCap: '$161B', score: 'Sell' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 782.40, pe: 108.5, pegRatio: 1.85, revenueGrowth: 28.5, epsGrowth: 52.4, marketCap: '$742B', score: 'Buy' },
  { symbol: 'AVGO', name: 'Broadcom', price: 1285.40, pe: 35.2, pegRatio: 1.05, revenueGrowth: 34.2, epsGrowth: 28.5, marketCap: '$598B', score: 'Strong Buy' },
];

const scoreVariant = (s: string) => s === 'Strong Buy' ? 'success' : s === 'Buy' ? 'info' : s === 'Hold' ? 'warning' : 'danger';

export default function FundamentalScreenerPage() {
  const strongBuys = RESULTS.filter(r => r.score === 'Strong Buy').length;
  const avgPEG = RESULTS.reduce((s, r) => s + r.pegRatio, 0) / RESULTS.length;
  const avgRevGrowth = RESULTS.reduce((s, r) => s + r.revenueGrowth, 0) / RESULTS.length;
  const totalResults = RESULTS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Fundamental Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Screen stocks by fundamental criteria</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Results</p><p className="text-lg font-bold text-white">{totalResults}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Buys</p><p className="text-lg font-bold text-green-400">{strongBuys}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg PEG</p><p className="text-lg font-bold text-indigo-400">{avgPEG.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Rev Growth</p><p className="text-lg font-bold text-amber-400">{avgRevGrowth.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Search className="h-4 w-4 text-indigo-400" /> Screener Results</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {RESULTS.map((r) => (
            <div key={r.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{r.symbol} <span className="text-gray-500">{r.name}</span></p>
                <p className="text-xs text-gray-500">P/E {r.pe} &middot; PEG {r.pegRatio} &middot; {r.marketCap}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(r.price)}</p>
                  <p className="text-[10px] text-gray-500">Rev {r.revenueGrowth >= 0 ? '+' : ''}{r.revenueGrowth}% EPS {r.epsGrowth >= 0 ? '+' : ''}{r.epsGrowth}%</p>
                </div>
                <Badge variant={scoreVariant(r.score)}>{r.score}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
