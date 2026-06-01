'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Shield } from 'lucide-react';

interface InflationHedge {
  name: string;
  ticker: string;
  assetClass: string;
  ytdReturn: number;
  realReturn: number;
  inflationBeta: number;
  yield: number;
  rating: 'Strong' | 'Moderate' | 'Weak';
}

const HEDGES: InflationHedge[] = [
  { name: 'TIPS ETF', ticker: 'TIP', assetClass: 'Bonds', ytdReturn: 2.8, realReturn: 0.5, inflationBeta: 0.92, yield: 4.8, rating: 'Strong' },
  { name: 'Gold ETF', ticker: 'GLD', assetClass: 'Commodity', ytdReturn: 14.2, realReturn: 11.9, inflationBeta: 0.78, yield: 0, rating: 'Strong' },
  { name: 'Real Estate ETF', ticker: 'VNQ', assetClass: 'Real Estate', ytdReturn: -1.5, realReturn: -3.8, inflationBeta: 0.65, yield: 3.9, rating: 'Moderate' },
  { name: 'Commodity ETF', ticker: 'DJP', assetClass: 'Commodity', ytdReturn: 5.2, realReturn: 2.9, inflationBeta: 0.85, yield: 0, rating: 'Moderate' },
  { name: 'Energy Stocks', ticker: 'XLE', assetClass: 'Equity', ytdReturn: 8.4, realReturn: 6.1, inflationBeta: 0.72, yield: 3.2, rating: 'Moderate' },
  { name: 'I-Bonds', ticker: 'I-BOND', assetClass: 'Bonds', ytdReturn: 3.5, realReturn: 1.2, inflationBeta: 1.00, yield: 5.27, rating: 'Strong' },
  { name: 'Farmland REIT', ticker: 'FPI', assetClass: 'Real Estate', ytdReturn: 4.8, realReturn: 2.5, inflationBeta: 0.58, yield: 1.8, rating: 'Weak' },
  { name: 'Infrastructure', ticker: 'PAVE', assetClass: 'Equity', ytdReturn: 12.5, realReturn: 10.2, inflationBeta: 0.52, yield: 0.8, rating: 'Moderate' },
];

const ratingVariant = (r: string) => r === 'Strong' ? 'success' : r === 'Moderate' ? 'warning' : 'danger';

export default function InflationHedgesPage() {
  const avgBeta = HEDGES.reduce((s, h) => s + h.inflationBeta, 0) / HEDGES.length;
  const avgReal = HEDGES.reduce((s, h) => s + h.realReturn, 0) / HEDGES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Inflation Hedges</h1>
        <p className="mt-1 text-sm text-gray-500">Inflation-protected investment analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Hedges</p><p className="text-lg font-bold text-white">{HEDGES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Beta</p><p className="text-lg font-bold text-indigo-400">{avgBeta.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Real Return</p><p className="text-lg font-bold text-green-400">{avgReal.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong</p><p className="text-lg font-bold text-cyan-400">{HEDGES.filter(h => h.rating === 'Strong').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-indigo-400" /> Inflation Hedge Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HEDGES.map((h) => (
            <div key={h.ticker} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{h.ticker}</p>
                <p className="text-[10px] text-gray-500">{h.name}</p>
              </div>
              <span className="text-[10px] text-gray-400 w-16">{h.assetClass}</span>
              <span className={cn('text-xs font-mono w-12', h.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{h.ytdReturn >= 0 ? '+' : ''}{h.ytdReturn}%</span>
              <span className="text-xs font-mono text-indigo-400 w-10">β {h.inflationBeta}</span>
              <span className="text-[10px] text-gray-500 w-12">Yield {h.yield}%</span>
              <Badge variant={ratingVariant(h.rating)} className="ml-auto">{h.rating}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
