'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

interface TaxLot {
  symbol: string;
  name: string;
  unrealizedGain: number;
  holdingPeriod: 'Short-Term' | 'Long-Term';
  taxRate: number;
  taxOwed: number;
  daysHeld: number;
  costBasis: number;
  marketValue: number;
}

const LOTS: TaxLot[] = [
  { symbol: 'NVDA', name: 'NVIDIA', unrealizedGain: 12825, holdingPeriod: 'Long-Term', taxRate: 15, taxOwed: 1924, daysHeld: 420, costBasis: 13524, marketValue: 26349 },
  { symbol: 'AAPL', name: 'Apple', unrealizedGain: 5678, holdingPeriod: 'Long-Term', taxRate: 15, taxOwed: 852, daysHeld: 680, costBasis: 22230, marketValue: 27908 },
  { symbol: 'META', name: 'Meta', unrealizedGain: 4968, holdingPeriod: 'Short-Term', taxRate: 32, taxOwed: 1590, daysHeld: 145, costBasis: 7135, marketValue: 12103 },
  { symbol: 'MSFT', name: 'Microsoft', unrealizedGain: 4247, holdingPeriod: 'Long-Term', taxRate: 15, taxOwed: 637, daysHeld: 510, costBasis: 13973, marketValue: 18219 },
  { symbol: 'AMZN', name: 'Amazon', unrealizedGain: 2961, holdingPeriod: 'Long-Term', taxRate: 15, taxOwed: 444, daysHeld: 390, costBasis: 7734, marketValue: 10695 },
  { symbol: 'TSLA', name: 'Tesla', unrealizedGain: -2840, holdingPeriod: 'Short-Term', taxRate: 32, taxOwed: -909, daysHeld: 85, costBasis: 11620, marketValue: 8780 },
  { symbol: 'BND', name: 'Vanguard Bond', unrealizedGain: -270, holdingPeriod: 'Long-Term', taxRate: 15, taxOwed: -41, daysHeld: 365, costBasis: 14760, marketValue: 14490 },
];

export default function TaxEfficiencyPage() {
  const totalGains = LOTS.filter((l) => l.unrealizedGain > 0).reduce((s, l) => s + l.unrealizedGain, 0);
  const totalLosses = LOTS.filter((l) => l.unrealizedGain < 0).reduce((s, l) => s + l.unrealizedGain, 0);
  const totalTax = LOTS.reduce((s, l) => s + l.taxOwed, 0);
  const shortTerm = LOTS.filter((l) => l.holdingPeriod === 'Short-Term');
  const harvestable = LOTS.filter((l) => l.unrealizedGain < 0).reduce((s, l) => s + Math.abs(l.unrealizedGain), 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Tax Efficiency</h1>
        <p className="mt-1 text-sm text-gray-500">Unrealized gains, tax-loss harvesting, and holding period analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Unrealized Gains</p><p className="text-lg font-bold text-green-400">{formatCurrency(totalGains)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Unrealized Losses</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalLosses)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Est. Tax Liability</p><p className="text-lg font-bold text-amber-400">{formatCurrency(totalTax)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Harvestable</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(harvestable)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> Tax Lot Details</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {LOTS.sort((a, b) => b.unrealizedGain - a.unrealizedGain).map((l) => (
            <div key={`${l.symbol}-${l.daysHeld}`} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{l.symbol}</span>
                  <span className="text-[10px] text-gray-500">{l.name}</span>
                  <Badge variant={l.holdingPeriod === 'Long-Term' ? 'success' : 'warning'}>{l.holdingPeriod}</Badge>
                  {l.unrealizedGain < 0 && <Badge variant="info">Harvest</Badge>}
                </div>
                <span className={cn('text-xs font-mono font-bold', l.unrealizedGain >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {l.unrealizedGain >= 0 ? '+' : ''}{formatCurrency(l.unrealizedGain)}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                <span className="text-gray-400">Basis: <span className="font-mono text-white">{formatCurrency(l.costBasis)}</span></span>
                <span className="text-gray-400">Value: <span className="font-mono text-white">{formatCurrency(l.marketValue)}</span></span>
                <span className="text-gray-400">Rate: <span className="font-mono text-white">{l.taxRate}%</span></span>
                <span className="text-gray-400">Tax: <span className={cn('font-mono', l.taxOwed >= 0 ? 'text-amber-400' : 'text-green-400')}>{formatCurrency(Math.abs(l.taxOwed))}</span></span>
                <span className="text-gray-400">Held: <span className="font-mono text-white">{l.daysHeld}d</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
