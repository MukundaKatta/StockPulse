'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { GitCompare } from 'lucide-react';

interface ArbOpportunity {
  index: string;
  future: string;
  spotPrice: number;
  futurePrice: number;
  basis: number;
  basisPct: number;
  expiry: string;
  signal: 'Buy Basis' | 'Sell Basis' | 'Fair';
}

const OPPORTUNITIES: ArbOpportunity[] = [
  { index: 'S&P 500', future: 'ES Jun', spotPrice: 5420.50, futurePrice: 5435.25, basis: 14.75, basisPct: 0.27, expiry: 'Jun 20', signal: 'Buy Basis' },
  { index: 'Nasdaq 100', future: 'NQ Jun', spotPrice: 19250.80, futurePrice: 19312.50, basis: 61.70, basisPct: 0.32, expiry: 'Jun 20', signal: 'Buy Basis' },
  { index: 'Russell 2000', future: 'RTY Jun', spotPrice: 2085.40, futurePrice: 2078.60, basis: -6.80, basisPct: -0.33, expiry: 'Jun 20', signal: 'Sell Basis' },
  { index: 'Dow Jones', future: 'YM Jun', spotPrice: 39850.00, futurePrice: 39882.00, basis: 32.00, basisPct: 0.08, expiry: 'Jun 20', signal: 'Fair' },
  { index: 'S&P 500', future: 'ES Sep', spotPrice: 5420.50, futurePrice: 5462.00, basis: 41.50, basisPct: 0.77, expiry: 'Sep 19', signal: 'Buy Basis' },
  { index: 'Nasdaq 100', future: 'NQ Sep', spotPrice: 19250.80, futurePrice: 19410.00, basis: 159.20, basisPct: 0.83, expiry: 'Sep 19', signal: 'Buy Basis' },
  { index: 'FTSE 100', future: 'Z Jun', spotPrice: 8245.30, futurePrice: 8232.00, basis: -13.30, basisPct: -0.16, expiry: 'Jun 20', signal: 'Sell Basis' },
];

const signalVariant = (s: string) => s === 'Buy Basis' ? 'success' : s === 'Sell Basis' ? 'danger' : 'default';

export default function IndexArbitragePage() {
  const avgBasis = OPPORTUNITIES.reduce((s, o) => s + Math.abs(o.basisPct), 0) / OPPORTUNITIES.length;
  const actionable = OPPORTUNITIES.filter(o => o.signal !== 'Fair').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Index Arbitrage</h1>
        <p className="mt-1 text-sm text-gray-500">Index vs futures basis arbitrage opportunities</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Pairs</p><p className="text-lg font-bold text-white">{OPPORTUNITIES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Basis</p><p className="text-lg font-bold text-indigo-400">{avgBasis.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Actionable</p><p className="text-lg font-bold text-green-400">{actionable}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sell Basis</p><p className="text-lg font-bold text-red-400">{OPPORTUNITIES.filter(o => o.signal === 'Sell Basis').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><GitCompare className="h-4 w-4 text-indigo-400" /> Arbitrage Opportunities</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {OPPORTUNITIES.map((o, i) => (
            <div key={i} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{o.index}</p>
                <p className="text-[10px] text-gray-500">{o.future}</p>
              </div>
              <span className="text-xs font-mono text-white w-20">{formatCurrency(o.spotPrice)}</span>
              <span className="text-xs font-mono text-gray-400 w-20">{formatCurrency(o.futurePrice)}</span>
              <span className={cn('text-xs font-mono w-16', o.basis >= 0 ? 'text-green-400' : 'text-red-400')}>{o.basis >= 0 ? '+' : ''}{o.basis.toFixed(2)}</span>
              <span className="text-[10px] text-gray-500 w-12">{o.expiry}</span>
              <Badge variant={signalVariant(o.signal)} className="ml-auto">{o.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
