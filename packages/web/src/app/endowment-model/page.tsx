'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Landmark } from 'lucide-react';

interface EndowmentAllocation {
  assetClass: string;
  allocation: number;
  returnYTD: number;
  return3Y: number;
  volatility: number;
  value: number;
  tier: 'Core' | 'Satellite' | 'Alternative';
}

const ALLOCATIONS: EndowmentAllocation[] = [
  { assetClass: 'Public Equities', allocation: 25.0, returnYTD: 11.2, return3Y: 9.8, volatility: 15.2, value: 12500000, tier: 'Core' },
  { assetClass: 'Private Equity', allocation: 20.0, returnYTD: 14.5, return3Y: 16.2, volatility: 18.5, value: 10000000, tier: 'Alternative' },
  { assetClass: 'Hedge Funds', allocation: 15.0, returnYTD: 6.8, return3Y: 7.5, volatility: 8.2, value: 7500000, tier: 'Alternative' },
  { assetClass: 'Real Assets', allocation: 12.0, returnYTD: 3.5, return3Y: 8.1, volatility: 12.4, value: 6000000, tier: 'Satellite' },
  { assetClass: 'Fixed Income', allocation: 10.0, returnYTD: 2.1, return3Y: -1.2, volatility: 6.8, value: 5000000, tier: 'Core' },
  { assetClass: 'Natural Resources', allocation: 8.0, returnYTD: 5.4, return3Y: 12.5, volatility: 20.1, value: 4000000, tier: 'Satellite' },
  { assetClass: 'Venture Capital', allocation: 5.0, returnYTD: -2.5, return3Y: 18.4, volatility: 28.5, value: 2500000, tier: 'Alternative' },
  { assetClass: 'Cash & Short-Term', allocation: 5.0, returnYTD: 4.8, return3Y: 3.2, volatility: 0.5, value: 2500000, tier: 'Core' },
];

const tierVariant = (t: string) => t === 'Core' ? 'info' : t === 'Alternative' ? 'warning' : 'success';

export default function EndowmentModelPage() {
  const totalValue = ALLOCATIONS.reduce((s, a) => s + a.value, 0);
  const wtdReturn = ALLOCATIONS.reduce((s, a) => s + a.returnYTD * (a.allocation / 100), 0);
  const wtdVol = ALLOCATIONS.reduce((s, a) => s + a.volatility * (a.allocation / 100), 0);
  const altAlloc = ALLOCATIONS.filter(a => a.tier === 'Alternative').reduce((s, a) => s + a.allocation, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Endowment Model</h1>
        <p className="mt-1 text-sm text-gray-500">Yale-style endowment investment allocation</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total AUM</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Wtd Return YTD</p><p className="text-lg font-bold text-green-400">{wtdReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Wtd Volatility</p><p className="text-lg font-bold text-amber-400">{wtdVol.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Alt Allocation</p><p className="text-lg font-bold text-indigo-400">{altAlloc}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Landmark className="h-4 w-4 text-indigo-400" /> Endowment Allocation</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ALLOCATIONS.map((a) => (
            <div key={a.assetClass} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{a.assetClass}</p>
                <p className="text-xs text-gray-500">{a.allocation}% alloc &middot; 3Y {a.return3Y >= 0 ? '+' : ''}{a.return3Y}% &middot; Vol {a.volatility}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(a.value)}</p>
                  <p className={cn('text-[10px] font-mono', a.returnYTD >= 0 ? 'text-green-400' : 'text-red-400')}>YTD {a.returnYTD >= 0 ? '+' : ''}{a.returnYTD}%</p>
                </div>
                <Badge variant={tierVariant(a.tier)}>{a.tier}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
