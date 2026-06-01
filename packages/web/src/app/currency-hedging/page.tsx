'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Shield } from 'lucide-react';

interface HedgingStrategy {
  currencyPair: string;
  exposure: number;
  hedgeRatio: number;
  hedgeCost: number;
  forwardRate: number;
  spotRate: number;
  maturity: string;
  instrument: string;
  status: 'Active' | 'Expiring' | 'Unhedged';
}

const STRATEGIES: HedgingStrategy[] = [
  { currencyPair: 'EUR/USD', exposure: 2500000, hedgeRatio: 75, hedgeCost: 8750, forwardRate: 1.0820, spotRate: 1.0850, maturity: '3 months', instrument: 'Forward', status: 'Active' },
  { currencyPair: 'GBP/USD', exposure: 1800000, hedgeRatio: 50, hedgeCost: 5400, forwardRate: 1.2640, spotRate: 1.2680, maturity: '6 months', instrument: 'Option', status: 'Active' },
  { currencyPair: 'USD/JPY', exposure: 3200000, hedgeRatio: 80, hedgeCost: 12800, forwardRate: 154.20, spotRate: 155.50, maturity: '1 month', instrument: 'Forward', status: 'Expiring' },
  { currencyPair: 'USD/CHF', exposure: 950000, hedgeRatio: 60, hedgeCost: 2850, forwardRate: 0.8820, spotRate: 0.8850, maturity: '3 months', instrument: 'Forward', status: 'Active' },
  { currencyPair: 'AUD/USD', exposure: 1200000, hedgeRatio: 0, hedgeCost: 0, forwardRate: 0, spotRate: 0.6580, maturity: 'N/A', instrument: 'None', status: 'Unhedged' },
  { currencyPair: 'USD/CAD', exposure: 1500000, hedgeRatio: 40, hedgeCost: 3000, forwardRate: 1.3620, spotRate: 1.3650, maturity: '2 months', instrument: 'Option', status: 'Active' },
  { currencyPair: 'EUR/GBP', exposure: 800000, hedgeRatio: 90, hedgeCost: 3600, forwardRate: 0.8560, spotRate: 0.8580, maturity: '4 months', instrument: 'Forward', status: 'Active' },
];

const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'Expiring' ? 'warning' : 'danger';

export default function CurrencyHedgingPage() {
  const totalExposure = STRATEGIES.reduce((s, st) => s + st.exposure, 0);
  const totalHedgeCost = STRATEGIES.reduce((s, st) => s + st.hedgeCost, 0);
  const avgHedgeRatio = STRATEGIES.reduce((s, st) => s + st.hedgeRatio, 0) / STRATEGIES.length;
  const unhedged = STRATEGIES.filter(st => st.status === 'Unhedged').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Currency Hedging</h1>
        <p className="mt-1 text-sm text-gray-500">Currency hedging strategies</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Exposure</p><p className="text-lg font-bold text-white">{formatCurrency(totalExposure)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Hedge Cost</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalHedgeCost)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Hedge %</p><p className="text-lg font-bold text-indigo-400">{avgHedgeRatio.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Unhedged</p><p className="text-lg font-bold text-yellow-400">{unhedged}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-indigo-400" /> Hedging Positions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STRATEGIES.map((st) => (
            <div key={st.currencyPair} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{st.currencyPair}</p>
                <p className="text-xs text-gray-500">{st.instrument} &middot; {st.maturity} &middot; Spot {st.spotRate}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(st.exposure)}</p>
                  <p className="text-[10px] text-gray-500">{st.hedgeRatio}% hedged &middot; Cost {formatCurrency(st.hedgeCost)}</p>
                </div>
                <Badge variant={statusVariant(st.status)}>{st.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
