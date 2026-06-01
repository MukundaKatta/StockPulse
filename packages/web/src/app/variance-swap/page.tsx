'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Sigma } from 'lucide-react';

interface VarianceSwapRate {
  underlying: string;
  tenor: string;
  varSwapStrike: number;
  realizedVol: number;
  premium: number;
  notional: string;
  pnl: number;
}

const RATES: VarianceSwapRate[] = [
  { underlying: 'SPX', tenor: '1M', varSwapStrike: 15.2, realizedVol: 11.8, premium: 3.4, notional: '$50M', pnl: 2.8 },
  { underlying: 'SPX', tenor: '3M', varSwapStrike: 16.5, realizedVol: 12.5, premium: 4.0, notional: '$35M', pnl: 3.2 },
  { underlying: 'SPX', tenor: '6M', varSwapStrike: 17.8, realizedVol: 13.2, premium: 4.6, notional: '$20M', pnl: 4.1 },
  { underlying: 'NDX', tenor: '1M', varSwapStrike: 19.5, realizedVol: 16.8, premium: 2.7, notional: '$30M', pnl: 1.5 },
  { underlying: 'RUT', tenor: '1M', varSwapStrike: 22.1, realizedVol: 18.5, premium: 3.6, notional: '$15M', pnl: 2.0 },
  { underlying: 'EFA', tenor: '3M', varSwapStrike: 14.8, realizedVol: 12.0, premium: 2.8, notional: '$25M', pnl: 1.8 },
];

export default function VarianceSwapPage() {
  const avgPremium = RATES.reduce((s, r) => s + r.premium, 0) / RATES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Variance Swaps</h1>
        <p className="mt-1 text-sm text-gray-500">Variance swap rates and implied-realized spread</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Contracts</p>
          <p className="text-lg font-bold text-white">{RATES.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Premium</p>
          <p className="text-lg font-bold text-green-400">{avgPremium.toFixed(1)} pts</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">SPX 1M Strike</p>
          <p className="text-lg font-bold text-indigo-400">{RATES[0].varSwapStrike}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Sigma className="inline h-4 w-4 mr-1" />Variance Swap Rates</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {RATES.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{r.underlying} <span className="text-gray-500">{r.tenor}</span></p>
                <p className="text-xs text-gray-500">Strike {r.varSwapStrike}% &middot; RV {r.realizedVol}% &middot; {r.notional}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-green-400">+{r.premium} pts</p>
                  <p className={cn('text-[10px] font-mono', r.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                    P&L +{r.pnl} pts
                  </p>
                </div>
                <Badge variant={r.premium > 4 ? 'success' : r.premium > 2.5 ? 'warning' : 'danger'}>
                  {r.premium > 4 ? 'Rich' : r.premium > 2.5 ? 'Fair' : 'Cheap'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
