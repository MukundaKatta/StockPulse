'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { AlertTriangle } from 'lucide-react';

interface MarketAnomaly {
  name: string;
  type: string;
  symbol: string;
  deviation: number;
  zScore: number;
  historicalFreq: number;
  duration: string;
  severity: 'High' | 'Medium' | 'Low';
}

const ANOMALIES: MarketAnomaly[] = [
  { name: 'VIX-Realized Vol Spread', type: 'Volatility', symbol: 'VIX', deviation: 8.5, zScore: 2.8, historicalFreq: 5, duration: '3 days', severity: 'High' },
  { name: 'Put/Call Ratio Extreme', type: 'Sentiment', symbol: 'CBOE', deviation: -32.5, zScore: -2.4, historicalFreq: 8, duration: '1 day', severity: 'Medium' },
  { name: 'Sector Dispersion Spike', type: 'Correlation', symbol: 'SPX', deviation: 15.2, zScore: 1.9, historicalFreq: 12, duration: '5 days', severity: 'Medium' },
  { name: 'Treasury Curve Inversion', type: 'Rates', symbol: '2Y-10Y', deviation: -42.0, zScore: -3.1, historicalFreq: 3, duration: '180 days', severity: 'High' },
  { name: 'Breadth Divergence', type: 'Breadth', symbol: 'NYSE', deviation: -18.5, zScore: -2.1, historicalFreq: 10, duration: '8 days', severity: 'Medium' },
  { name: 'After-Hours Vol Surge', type: 'Volume', symbol: 'AAPL', deviation: 245.0, zScore: 3.5, historicalFreq: 2, duration: '1 day', severity: 'High' },
  { name: 'Cross-Asset Correlation', type: 'Correlation', symbol: 'Multi', deviation: 22.4, zScore: 1.6, historicalFreq: 15, duration: '12 days', severity: 'Low' },
];

const sevVariant = (s: string) => s === 'High' ? 'danger' : s === 'Medium' ? 'warning' : 'default';

export default function MarketAnomaliesPage() {
  const highCount = ANOMALIES.filter(a => a.severity === 'High').length;
  const avgZScore = ANOMALIES.reduce((s, a) => s + Math.abs(a.zScore), 0) / ANOMALIES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Anomalies</h1>
        <p className="mt-1 text-sm text-gray-500">Unusual market conditions and statistical outliers</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Anomalies</p><p className="text-lg font-bold text-white">{ANOMALIES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Severity</p><p className="text-lg font-bold text-red-400">{highCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg |Z-Score|</p><p className="text-lg font-bold text-indigo-400">{avgZScore.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Active</p><p className="text-lg font-bold text-yellow-400">{ANOMALIES.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><AlertTriangle className="h-4 w-4 text-indigo-400" /> Detected Anomalies</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ANOMALIES.map((a) => (
            <div key={a.name} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-36">
                <p className="text-xs font-bold text-white">{a.name}</p>
                <p className="text-[10px] text-gray-500">{a.type} &middot; {a.symbol}</p>
              </div>
              <span className={cn('text-xs font-mono w-14', a.zScore >= 0 ? 'text-green-400' : 'text-red-400')}>Z: {a.zScore >= 0 ? '+' : ''}{a.zScore}</span>
              <span className="text-[10px] text-gray-400 w-14">{a.historicalFreq}% freq</span>
              <span className="text-[10px] text-gray-500 w-14">{a.duration}</span>
              <Badge variant={sevVariant(a.severity)} className="ml-auto">{a.severity}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
