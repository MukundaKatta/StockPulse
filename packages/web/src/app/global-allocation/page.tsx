'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Globe2 } from 'lucide-react';

interface GlobalAllocation {
  region: string;
  weight: number;
  benchmark: number;
  overUnder: number;
  returnYTD: number;
  value: number;
  outlook: 'Bullish' | 'Neutral' | 'Bearish';
}

const ALLOCATIONS: GlobalAllocation[] = [
  { region: 'US Equities', weight: 42.0, benchmark: 45.0, overUnder: -3.0, returnYTD: 12.4, value: 4200000, outlook: 'Bullish' },
  { region: 'European Equities', weight: 15.0, benchmark: 12.0, overUnder: 3.0, returnYTD: 8.2, value: 1500000, outlook: 'Neutral' },
  { region: 'Asia-Pacific', weight: 12.0, benchmark: 10.0, overUnder: 2.0, returnYTD: 5.8, value: 1200000, outlook: 'Bullish' },
  { region: 'Emerging Markets', weight: 8.0, benchmark: 8.0, overUnder: 0.0, returnYTD: 3.5, value: 800000, outlook: 'Neutral' },
  { region: 'Global Bonds', weight: 15.0, benchmark: 18.0, overUnder: -3.0, returnYTD: 1.8, value: 1500000, outlook: 'Bearish' },
  { region: 'Commodities', weight: 5.0, benchmark: 4.0, overUnder: 1.0, returnYTD: 6.2, value: 500000, outlook: 'Bullish' },
  { region: 'Real Estate', weight: 3.0, benchmark: 3.0, overUnder: 0.0, returnYTD: -2.5, value: 300000, outlook: 'Bearish' },
];

const outlookVariant = (o: string) => o === 'Bullish' ? 'success' : o === 'Bearish' ? 'danger' : 'default';

export default function GlobalAllocationPage() {
  const totalValue = ALLOCATIONS.reduce((s, a) => s + a.value, 0);
  const wtdReturn = ALLOCATIONS.reduce((s, a) => s + a.returnYTD * (a.weight / 100), 0);
  const bullish = ALLOCATIONS.filter(a => a.outlook === 'Bullish').length;
  const maxOverweight = ALLOCATIONS.reduce((m, a) => Math.abs(a.overUnder) > Math.abs(m.overUnder) ? a : m);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Global Allocation</h1>
        <p className="mt-1 text-sm text-gray-500">Multi-region global asset allocation model</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total AUM</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Wtd Return YTD</p><p className="text-lg font-bold text-green-400">{wtdReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish Regions</p><p className="text-lg font-bold text-indigo-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Max Active Bet</p><p className="text-lg font-bold text-amber-400">{Math.abs(maxOverweight.overUnder)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe2 className="h-4 w-4 text-indigo-400" /> Regional Allocation</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ALLOCATIONS.map((a) => (
            <div key={a.region} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{a.region}</p>
                <p className="text-xs text-gray-500">Weight {a.weight}% &middot; Bench {a.benchmark}% &middot; YTD {a.returnYTD >= 0 ? '+' : ''}{a.returnYTD}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(a.value)}</p>
                  <p className={cn('text-[10px] font-mono', a.overUnder > 0 ? 'text-green-400' : a.overUnder < 0 ? 'text-red-400' : 'text-gray-500')}>{a.overUnder >= 0 ? '+' : ''}{a.overUnder}% vs bench</p>
                </div>
                <Badge variant={outlookVariant(a.outlook)}>{a.outlook}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
