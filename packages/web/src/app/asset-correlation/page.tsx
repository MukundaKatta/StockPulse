'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Waypoints } from 'lucide-react';

interface AssetCorrelation {
  pair: string;
  assetA: string;
  assetB: string;
  correlation: number;
  rolling30d: number;
  change: number;
  relationship: 'Strong Positive' | 'Moderate Positive' | 'Low' | 'Negative';
}

const CORRELATIONS: AssetCorrelation[] = [
  { pair: 'SPY/QQQ', assetA: 'S&P 500', assetB: 'Nasdaq 100', correlation: 0.92, rolling30d: 0.95, change: 0.03, relationship: 'Strong Positive' },
  { pair: 'SPY/TLT', assetA: 'S&P 500', assetB: 'Long-Term Bonds', correlation: -0.35, rolling30d: -0.28, change: 0.07, relationship: 'Negative' },
  { pair: 'GLD/TLT', assetA: 'Gold', assetB: 'Long-Term Bonds', correlation: 0.42, rolling30d: 0.38, change: -0.04, relationship: 'Moderate Positive' },
  { pair: 'SPY/VWO', assetA: 'S&P 500', assetB: 'Emerging Markets', correlation: 0.68, rolling30d: 0.72, change: 0.04, relationship: 'Moderate Positive' },
  { pair: 'BTC/SPY', assetA: 'Bitcoin', assetB: 'S&P 500', correlation: 0.25, rolling30d: 0.31, change: 0.06, relationship: 'Low' },
  { pair: 'USO/XLE', assetA: 'Crude Oil', assetB: 'Energy Sector', correlation: 0.85, rolling30d: 0.88, change: 0.03, relationship: 'Strong Positive' },
  { pair: 'VNQ/TLT', assetA: 'Real Estate', assetB: 'Long-Term Bonds', correlation: 0.18, rolling30d: 0.12, change: -0.06, relationship: 'Low' },
  { pair: 'GLD/UUP', assetA: 'Gold', assetB: 'US Dollar', correlation: -0.62, rolling30d: -0.58, change: 0.04, relationship: 'Negative' },
];

const relVariant = (r: string) => r === 'Strong Positive' ? 'success' : r === 'Negative' ? 'danger' : r === 'Low' ? 'warning' : 'info';

export default function AssetCorrelationPage() {
  const avgCorr = CORRELATIONS.reduce((s, c) => s + Math.abs(c.correlation), 0) / CORRELATIONS.length;
  const strongPairs = CORRELATIONS.filter(c => Math.abs(c.correlation) > 0.7).length;
  const negativePairs = CORRELATIONS.filter(c => c.correlation < 0).length;
  const totalPairs = CORRELATIONS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Asset Correlation</h1>
        <p className="mt-1 text-sm text-gray-500">Cross-asset correlation matrix</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg |Corr|</p><p className="text-lg font-bold text-white">{avgCorr.toFixed(2)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Strong Pairs</p><p className="text-lg font-bold text-green-400">{strongPairs}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Negative</p><p className="text-lg font-bold text-red-400">{negativePairs}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Pairs</p><p className="text-lg font-bold text-indigo-400">{totalPairs}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Waypoints className="h-4 w-4 text-indigo-400" /> Correlation Pairs</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CORRELATIONS.map((c) => (
            <div key={c.pair} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{c.pair}</p>
                <p className="text-xs text-gray-500">{c.assetA} vs {c.assetB}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', c.correlation >= 0 ? 'text-green-400' : 'text-red-400')}>{c.correlation.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-500">30d: {c.rolling30d.toFixed(2)}</p>
                </div>
                <Badge variant={relVariant(c.relationship)}>{c.relationship}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
