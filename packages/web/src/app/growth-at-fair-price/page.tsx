'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Scale } from 'lucide-react';

interface GARPStock {
  symbol: string;
  name: string;
  price: number;
  pe: number;
  epsGrowth: number;
  pegRatio: number;
  roe: number;
  debtEquity: number;
  garpScore: number;
  rating: 'Top Pick' | 'Attractive' | 'Fair Value' | 'Expensive';
}

const STOCKS: GARPStock[] = [
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, pe: 24.8, epsGrowth: 28.2, pegRatio: 0.88, roe: 26.5, debtEquity: 0.1, garpScore: 92, rating: 'Top Pick' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, pe: 26.1, epsGrowth: 35.8, pegRatio: 0.73, roe: 28.5, debtEquity: 0.3, garpScore: 95, rating: 'Top Pick' },
  { symbol: 'AVGO', name: 'Broadcom', price: 1285.40, pe: 35.2, epsGrowth: 28.5, pegRatio: 1.24, roe: 55.2, debtEquity: 1.6, garpScore: 78, rating: 'Attractive' },
  { symbol: 'UNH', name: 'UnitedHealth', price: 528.40, pe: 19.2, epsGrowth: 12.5, pegRatio: 1.54, roe: 24.8, debtEquity: 0.7, garpScore: 72, rating: 'Attractive' },
  { symbol: 'CRM', name: 'Salesforce', price: 282.40, pe: 45.5, epsGrowth: 42.8, pegRatio: 1.06, roe: 10.2, debtEquity: 0.2, garpScore: 68, rating: 'Fair Value' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.80, pe: 34.2, epsGrowth: 18.4, pegRatio: 1.86, roe: 38.4, debtEquity: 0.4, garpScore: 65, rating: 'Fair Value' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 132.40, pe: 65.8, epsGrowth: 544.0, pegRatio: 0.12, roe: 82.4, debtEquity: 0.4, garpScore: 88, rating: 'Attractive' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 782.40, pe: 108.5, epsGrowth: 52.4, pegRatio: 2.07, roe: 55.8, debtEquity: 2.1, garpScore: 45, rating: 'Expensive' },
];

const ratingVariant = (r: string) => r === 'Top Pick' ? 'success' : r === 'Attractive' ? 'info' : r === 'Fair Value' ? 'warning' : 'danger';

export default function GrowthAtFairPricePage() {
  const topPicks = STOCKS.filter(s => s.rating === 'Top Pick').length;
  const avgPEG = STOCKS.reduce((s, st) => s + st.pegRatio, 0) / STOCKS.length;
  const avgGarpScore = STOCKS.reduce((s, st) => s + st.garpScore, 0) / STOCKS.length;
  const avgGrowth = STOCKS.reduce((s, st) => s + st.epsGrowth, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">GARP Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Growth at a reasonable price stock screener</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Top Picks</p><p className="text-lg font-bold text-green-400">{topPicks}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg PEG</p><p className="text-lg font-bold text-white">{avgPEG.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg GARP Score</p><p className="text-lg font-bold text-indigo-400">{avgGarpScore.toFixed(0)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg EPS Growth</p><p className="text-lg font-bold text-amber-400">{avgGrowth.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Scale className="h-4 w-4 text-indigo-400" /> GARP Rankings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.garpScore - a.garpScore).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{s.symbol} <span className="text-gray-500">{s.name}</span></p>
                <p className="text-xs text-gray-500">P/E {s.pe} &middot; PEG {s.pegRatio} &middot; ROE {s.roe}% &middot; Score {s.garpScore}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(s.price)}</p>
                  <p className="text-[10px] text-gray-500">EPS +{s.epsGrowth}%</p>
                </div>
                <Badge variant={ratingVariant(s.rating)}>{s.rating}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
