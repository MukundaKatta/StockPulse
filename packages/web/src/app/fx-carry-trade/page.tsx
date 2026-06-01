'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { ArrowLeftRight } from 'lucide-react';

interface CarryTrade {
  pair: string;
  fundingRate: number;
  targetRate: number;
  carry: number;
  spotRate: number;
  change1M: number;
  totalReturn: number;
  risk: 'Low' | 'Medium' | 'High';
}

const TRADES: CarryTrade[] = [
  { pair: 'USD/JPY', fundingRate: 0.10, targetRate: 5.25, carry: 5.15, spotRate: 151.20, change1M: 1.8, totalReturn: 6.95, risk: 'Medium' },
  { pair: 'AUD/JPY', fundingRate: 0.10, targetRate: 4.35, carry: 4.25, spotRate: 98.40, change1M: -0.5, totalReturn: 3.75, risk: 'High' },
  { pair: 'NZD/JPY', fundingRate: 0.10, targetRate: 5.50, carry: 5.40, spotRate: 91.80, change1M: 0.8, totalReturn: 6.20, risk: 'High' },
  { pair: 'USD/CHF', fundingRate: 1.75, targetRate: 5.25, carry: 3.50, spotRate: 0.8820, change1M: 0.4, totalReturn: 3.90, risk: 'Low' },
  { pair: 'MXN/JPY', fundingRate: 0.10, targetRate: 11.25, carry: 11.15, spotRate: 8.85, change1M: -2.1, totalReturn: 9.05, risk: 'High' },
  { pair: 'GBP/JPY', fundingRate: 0.10, targetRate: 5.25, carry: 5.15, spotRate: 191.50, change1M: 1.2, totalReturn: 6.35, risk: 'Medium' },
  { pair: 'EUR/JPY', fundingRate: 0.10, targetRate: 4.50, carry: 4.40, spotRate: 163.80, change1M: 0.6, totalReturn: 5.00, risk: 'Medium' },
];

const riskVariant = (r: string) => r === 'Low' ? 'success' : r === 'Medium' ? 'warning' : 'danger';

export default function FXCarryTradePage() {
  const avgCarry = TRADES.reduce((s, t) => s + t.carry, 0) / TRADES.length;
  const avgTotalReturn = TRADES.reduce((s, t) => s + t.totalReturn, 0) / TRADES.length;
  const lowRisk = TRADES.filter(t => t.risk === 'Low').length;
  const positiveSpot = TRADES.filter(t => t.change1M > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">FX Carry Trade</h1>
        <p className="mt-1 text-sm text-gray-500">Currency carry trade analysis and signals</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Carry</p><p className="text-lg font-bold text-green-400">{avgCarry.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Total Return</p><p className="text-lg font-bold text-white">{avgTotalReturn.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Low Risk</p><p className="text-lg font-bold text-indigo-400">{lowRisk}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">FX Tailwind</p><p className="text-lg font-bold text-amber-400">{positiveSpot}/{TRADES.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowLeftRight className="h-4 w-4 text-indigo-400" /> Carry Trades</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {TRADES.map((t) => (
            <div key={t.pair} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{t.pair}</p>
                <p className="text-xs text-gray-500">Fund {t.fundingRate}% &rarr; Target {t.targetRate}% &middot; Spot {t.spotRate}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{t.carry}% carry</p>
                  <p className={cn('text-[10px] font-mono', t.change1M >= 0 ? 'text-green-400' : 'text-red-400')}>FX {t.change1M >= 0 ? '+' : ''}{t.change1M}%</p>
                </div>
                <Badge variant={riskVariant(t.risk)}>{t.risk}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
