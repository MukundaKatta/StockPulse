'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { GitBranch } from 'lucide-react';

interface DispersionSignal {
  index: string;
  indexIV: number;
  avgComponentIV: number;
  correlation: number;
  dispersion: number;
  signal: 'Long Dispersion' | 'Short Dispersion' | 'Neutral';
  pnl: number;
}

const SIGNALS: DispersionSignal[] = [
  { index: 'S&P 500', indexIV: 14.2, avgComponentIV: 28.5, correlation: 0.35, dispersion: 14.3, signal: 'Long Dispersion', pnl: 8450.00 },
  { index: 'NASDAQ 100', indexIV: 18.5, avgComponentIV: 32.1, correlation: 0.42, dispersion: 13.6, signal: 'Long Dispersion', pnl: 6280.00 },
  { index: 'Russell 2000', indexIV: 22.8, avgComponentIV: 35.4, correlation: 0.55, dispersion: 12.6, signal: 'Neutral', pnl: -1250.00 },
  { index: 'Euro Stoxx 50', indexIV: 16.4, avgComponentIV: 25.8, correlation: 0.48, dispersion: 9.4, signal: 'Short Dispersion', pnl: 3120.00 },
  { index: 'Nikkei 225', indexIV: 19.1, avgComponentIV: 30.2, correlation: 0.40, dispersion: 11.1, signal: 'Long Dispersion', pnl: 4580.00 },
  { index: 'FTSE 100', indexIV: 13.8, avgComponentIV: 22.5, correlation: 0.52, dispersion: 8.7, signal: 'Short Dispersion', pnl: 2890.00 },
  { index: 'DAX 40', indexIV: 15.6, avgComponentIV: 27.3, correlation: 0.44, dispersion: 11.7, signal: 'Long Dispersion', pnl: 5640.00 },
];

const signalVariant = (s: string) => s === 'Long Dispersion' ? 'success' : s === 'Short Dispersion' ? 'danger' : 'default';

export default function DispersionTradingPage() {
  const avgDispersion = SIGNALS.reduce((s, t) => s + t.dispersion, 0) / SIGNALS.length;
  const totalPnl = SIGNALS.reduce((s, t) => s + t.pnl, 0);
  const longSignals = SIGNALS.filter(s => s.signal === 'Long Dispersion').length;
  const avgCorrelation = SIGNALS.reduce((s, t) => s + t.correlation, 0) / SIGNALS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dispersion Trading</h1>
        <p className="mt-1 text-sm text-gray-500">Index vs component volatility dispersion signals</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Dispersion</p><p className="text-lg font-bold text-white">{avgDispersion.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total P&L</p><p className={cn('text-lg font-bold', totalPnl >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(totalPnl)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Long Signals</p><p className="text-lg font-bold text-indigo-400">{longSignals}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Correlation</p><p className="text-lg font-bold text-amber-400">{avgCorrelation.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><GitBranch className="h-4 w-4 text-indigo-400" /> Dispersion Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SIGNALS.map((s) => (
            <div key={s.index} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{s.index}</p>
                <p className="text-xs text-gray-500">Index IV {s.indexIV}% &middot; Comp IV {s.avgComponentIV}% &middot; Corr {s.correlation}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{s.dispersion.toFixed(1)} disp</p>
                  <p className={cn('text-[10px] font-mono', s.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(s.pnl)}</p>
                </div>
                <Badge variant={signalVariant(s.signal)}>{s.signal}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
