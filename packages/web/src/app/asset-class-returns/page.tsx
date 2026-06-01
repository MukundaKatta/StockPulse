'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface AssetClassReturn {
  assetClass: string;
  ytdReturn: number;
  oneYearReturn: number;
  volatility: number;
  sharpe: number;
  benchmark: string;
  trend: 'Outperform' | 'In Line' | 'Underperform';
}

const CLASSES: AssetClassReturn[] = [
  { assetClass: 'US Equities', ytdReturn: 18.4, oneYearReturn: 24.5, volatility: 16.2, sharpe: 1.42, benchmark: 'S&P 500', trend: 'Outperform' },
  { assetClass: 'International Equities', ytdReturn: 8.2, oneYearReturn: 12.4, volatility: 14.8, sharpe: 0.78, benchmark: 'MSCI EAFE', trend: 'In Line' },
  { assetClass: 'Fixed Income', ytdReturn: 1.5, oneYearReturn: 2.8, volatility: 5.4, sharpe: 0.32, benchmark: 'Bloomberg Agg', trend: 'Underperform' },
  { assetClass: 'Real Estate', ytdReturn: 4.2, oneYearReturn: 6.5, volatility: 18.5, sharpe: 0.28, benchmark: 'FTSE NAREIT', trend: 'Underperform' },
  { assetClass: 'Commodities', ytdReturn: 12.8, oneYearReturn: 15.2, volatility: 22.1, sharpe: 0.62, benchmark: 'Bloomberg Commodity', trend: 'Outperform' },
  { assetClass: 'Crypto Assets', ytdReturn: 45.2, oneYearReturn: 82.5, volatility: 65.4, sharpe: 1.18, benchmark: 'Bitcoin', trend: 'Outperform' },
  { assetClass: 'Private Equity', ytdReturn: 10.5, oneYearReturn: 14.8, volatility: 12.2, sharpe: 1.08, benchmark: 'Cambridge PE', trend: 'In Line' },
];

const trendVariant = (t: string) => t === 'Outperform' ? 'success' : t === 'Underperform' ? 'danger' : 'default';

export default function AssetClassReturnsPage() {
  const avgYtd = CLASSES.reduce((s, c) => s + c.ytdReturn, 0) / CLASSES.length;
  const bestClass = CLASSES.reduce((b, c) => c.ytdReturn > b.ytdReturn ? c : b);
  const avgSharpe = CLASSES.reduce((s, c) => s + c.sharpe, 0) / CLASSES.length;
  const outperformers = CLASSES.filter(c => c.trend === 'Outperform').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Asset Class Returns</h1>
        <p className="mt-1 text-sm text-gray-500">Returns by asset class comparison</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg YTD</p><p className="text-lg font-bold text-green-400">{avgYtd.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Top Class</p><p className="text-lg font-bold text-white">{bestClass.assetClass}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Sharpe</p><p className="text-lg font-bold text-indigo-400">{avgSharpe.toFixed(2)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Outperform</p><p className="text-lg font-bold text-green-400">{outperformers}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Asset Class Performance</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CLASSES.map((c) => (
            <div key={c.assetClass} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{c.assetClass}</p>
                <p className="text-xs text-gray-500">{c.benchmark} &middot; Vol {c.volatility}% &middot; Sharpe {c.sharpe}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', c.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{c.ytdReturn > 0 ? '+' : ''}{c.ytdReturn}% YTD</p>
                  <p className="text-[10px] text-gray-500">1Y: {c.oneYearReturn > 0 ? '+' : ''}{c.oneYearReturn}%</p>
                </div>
                <Badge variant={trendVariant(c.trend)}>{c.trend}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
