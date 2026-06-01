'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Link2 } from 'lucide-react';

interface CryptoCorrelation {
  pair: string;
  assetA: string;
  assetB: string;
  correlation: number;
  rolling7d: number;
  rolling30d: number;
  change: number;
  relationship: 'Strong' | 'Moderate' | 'Weak' | 'Inverse';
}

const CORRELATIONS: CryptoCorrelation[] = [
  { pair: 'BTC/ETH', assetA: 'Bitcoin', assetB: 'Ethereum', correlation: 0.88, rolling7d: 0.91, rolling30d: 0.85, change: 0.03, relationship: 'Strong' },
  { pair: 'BTC/SOL', assetA: 'Bitcoin', assetB: 'Solana', correlation: 0.72, rolling7d: 0.78, rolling30d: 0.68, change: 0.06, relationship: 'Moderate' },
  { pair: 'ETH/SOL', assetA: 'Ethereum', assetB: 'Solana', correlation: 0.80, rolling7d: 0.84, rolling30d: 0.76, change: 0.04, relationship: 'Strong' },
  { pair: 'BTC/XRP', assetA: 'Bitcoin', assetB: 'Ripple', correlation: 0.58, rolling7d: 0.62, rolling30d: 0.54, change: 0.04, relationship: 'Moderate' },
  { pair: 'BTC/DOGE', assetA: 'Bitcoin', assetB: 'Dogecoin', correlation: 0.45, rolling7d: 0.52, rolling30d: 0.40, change: 0.07, relationship: 'Weak' },
  { pair: 'ETH/AVAX', assetA: 'Ethereum', assetB: 'Avalanche', correlation: 0.82, rolling7d: 0.85, rolling30d: 0.78, change: 0.03, relationship: 'Strong' },
  { pair: 'BTC/USDT', assetA: 'Bitcoin', assetB: 'Tether', correlation: -0.15, rolling7d: -0.12, rolling30d: -0.18, change: 0.03, relationship: 'Inverse' },
];

const relVariant = (r: string) => r === 'Strong' ? 'success' : r === 'Inverse' ? 'danger' : r === 'Weak' ? 'warning' : 'info';

export default function CryptoCorrelationPage() {
  const avgCorr = CORRELATIONS.reduce((s, c) => s + Math.abs(c.correlation), 0) / CORRELATIONS.length;
  const strongPairs = CORRELATIONS.filter(c => Math.abs(c.correlation) > 0.75).length;
  const weakPairs = CORRELATIONS.filter(c => Math.abs(c.correlation) < 0.5).length;
  const totalPairs = CORRELATIONS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Correlation</h1>
        <p className="mt-1 text-sm text-gray-500">Crypto cross-correlation analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg |Corr|</p><p className="text-lg font-bold text-white">{avgCorr.toFixed(2)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Strong</p><p className="text-lg font-bold text-green-400">{strongPairs}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Weak</p><p className="text-lg font-bold text-yellow-400">{weakPairs}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Pairs</p><p className="text-lg font-bold text-indigo-400">{totalPairs}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Link2 className="h-4 w-4 text-indigo-400" /> Correlation Pairs</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CORRELATIONS.map((c) => (
            <div key={c.pair} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{c.pair}</p>
                <p className="text-xs text-gray-500">{c.assetA} vs {c.assetB} &middot; 7d: {c.rolling7d.toFixed(2)} &middot; 30d: {c.rolling30d.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', c.correlation >= 0 ? 'text-green-400' : 'text-red-400')}>{c.correlation.toFixed(2)}</p>
                  <p className={cn('text-[10px] font-mono', c.change >= 0 ? 'text-green-400' : 'text-red-400')}>{c.change > 0 ? '+' : ''}{c.change.toFixed(2)}</p>
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
