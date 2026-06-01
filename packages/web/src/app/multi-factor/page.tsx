'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Boxes } from 'lucide-react';

interface FactorExposure {
  symbol: string;
  name: string;
  price: number;
  valueFactor: number;
  momentumFactor: number;
  qualityFactor: number;
  sizeFactor: number;
  volatilityFactor: number;
  compositeScore: number;
  ranking: 'Top' | 'Above Avg' | 'Average' | 'Below Avg';
}

const STOCKS: FactorExposure[] = [
  { symbol: 'AAPL', name: 'Apple', price: 192.50, valueFactor: 0.45, momentumFactor: 0.82, qualityFactor: 0.95, sizeFactor: -0.90, volatilityFactor: 0.72, compositeScore: 85, ranking: 'Top' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 135.20, valueFactor: -0.85, momentumFactor: 0.95, qualityFactor: 0.88, sizeFactor: -0.82, volatilityFactor: -0.45, compositeScore: 72, ranking: 'Above Avg' },
  { symbol: 'JPM', name: 'JPMorgan', price: 198.40, valueFactor: 0.82, momentumFactor: 0.65, qualityFactor: 0.78, sizeFactor: -0.75, volatilityFactor: 0.55, compositeScore: 78, ranking: 'Above Avg' },
  { symbol: 'TSLA', name: 'Tesla', price: 248.30, valueFactor: -0.92, momentumFactor: 0.35, qualityFactor: 0.42, sizeFactor: -0.68, volatilityFactor: -0.85, compositeScore: 35, ranking: 'Below Avg' },
  { symbol: 'JNJ', name: 'J&J', price: 158.20, valueFactor: 0.72, momentumFactor: -0.25, qualityFactor: 0.92, sizeFactor: -0.72, volatilityFactor: 0.88, compositeScore: 68, ranking: 'Average' },
  { symbol: 'META', name: 'Meta', price: 505.10, valueFactor: 0.55, momentumFactor: 0.88, qualityFactor: 0.85, sizeFactor: -0.85, volatilityFactor: 0.32, compositeScore: 82, ranking: 'Top' },
  { symbol: 'XOM', name: 'Exxon', price: 108.60, valueFactor: 0.88, momentumFactor: 0.42, qualityFactor: 0.65, sizeFactor: -0.62, volatilityFactor: 0.45, compositeScore: 62, ranking: 'Average' },
];

const rankVariant = (r: string) => r === 'Top' ? 'success' : r === 'Above Avg' ? 'info' : r === 'Average' ? 'default' : 'danger';

export default function MultiFactorPage() {
  const avgScore = STOCKS.reduce((s, st) => s + st.compositeScore, 0) / STOCKS.length;
  const topCount = STOCKS.filter(s => s.ranking === 'Top').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Multi-Factor Model</h1>
        <p className="mt-1 text-sm text-gray-500">Multi-factor exposure and composite scoring</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Score</p><p className="text-lg font-bold text-indigo-400">{avgScore.toFixed(0)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Top Ranked</p><p className="text-lg font-bold text-green-400">{topCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Factors</p><p className="text-lg font-bold text-cyan-400">5</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Boxes className="h-4 w-4 text-indigo-400" /> Factor Exposures</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.compositeScore - a.compositeScore).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <span className={cn('text-[10px] font-mono w-8', s.valueFactor >= 0 ? 'text-green-400' : 'text-red-400')}>V{s.valueFactor > 0 ? '+' : ''}{s.valueFactor.toFixed(1)}</span>
              <span className={cn('text-[10px] font-mono w-8', s.momentumFactor >= 0 ? 'text-green-400' : 'text-red-400')}>M{s.momentumFactor > 0 ? '+' : ''}{s.momentumFactor.toFixed(1)}</span>
              <span className={cn('text-[10px] font-mono w-8', s.qualityFactor >= 0 ? 'text-green-400' : 'text-red-400')}>Q{s.qualityFactor > 0 ? '+' : ''}{s.qualityFactor.toFixed(1)}</span>
              <span className="text-xs font-mono text-indigo-400 w-10">SC {s.compositeScore}</span>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(s.price)}</span>
              <Badge variant={rankVariant(s.ranking)} className="ml-auto">{s.ranking}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
