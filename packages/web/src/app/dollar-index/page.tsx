'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { DollarSign } from 'lucide-react';

interface DXYComponent {
  currency: string;
  name: string;
  weight: number;
  rate: number;
  change: number;
}

const DXY_COMPONENTS: DXYComponent[] = [
  { currency: 'EUR', name: 'Euro', weight: 57.6, rate: 1.0870, change: -0.15 },
  { currency: 'JPY', name: 'Japanese Yen', weight: 13.6, rate: 149.50, change: 0.22 },
  { currency: 'GBP', name: 'British Pound', weight: 11.9, rate: 1.2640, change: -0.08 },
  { currency: 'CAD', name: 'Canadian Dollar', weight: 9.1, rate: 1.3580, change: 0.12 },
  { currency: 'SEK', name: 'Swedish Krona', weight: 4.2, rate: 10.52, change: 0.35 },
  { currency: 'CHF', name: 'Swiss Franc', weight: 3.6, rate: 0.8780, change: -0.18 },
];

const HISTORY = [
  { period: '1D', value: 0.08 },
  { period: '1W', value: -0.32 },
  { period: '1M', value: -1.15 },
  { period: '3M', value: 0.85 },
  { period: '6M', value: 2.10 },
  { period: 'YTD', value: 1.45 },
  { period: '1Y', value: -2.80 },
];

export default function DollarIndexPage() {
  const dxyValue = 103.42;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">US Dollar Index (DXY)</h1>
        <p className="mt-1 text-sm text-gray-500">Dollar strength vs major currencies basket</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4 ring-1 ring-indigo-500/20"><p className="text-[10px] text-gray-500 uppercase">DXY</p><p className="text-2xl font-bold text-white">{dxyValue}</p><p className="text-xs text-green-400">+0.08 (+0.08%)</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">52W High</p><p className="text-lg font-bold text-white">107.35</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">52W Low</p><p className="text-lg font-bold text-white">99.58</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Performance</CardTitle></CardHeader>
        <div className="flex items-center gap-3 px-2 pb-3 flex-wrap">
          {HISTORY.map((h) => (
            <div key={h.period} className="text-center">
              <p className="text-[10px] text-gray-500">{h.period}</p>
              <p className={cn('text-xs font-mono font-medium', h.value >= 0 ? 'text-green-400' : 'text-red-400')}>{h.value >= 0 ? '+' : ''}{h.value.toFixed(2)}%</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-green-400" /> Basket Components</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DXY_COMPONENTS.map((comp) => (
            <div key={comp.currency} className="flex items-center gap-3 py-2.5 px-2">
              <span className="text-sm font-medium text-indigo-400 w-10">{comp.currency}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300">{comp.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-indigo-500/50 rounded-full" style={{ width: `${comp.weight}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500">{comp.weight}%</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-white">{comp.rate}</p>
                <p className={cn('text-[10px] font-mono', comp.change >= 0 ? 'text-green-400' : 'text-red-400')}>{comp.change >= 0 ? '+' : ''}{comp.change.toFixed(2)}%</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
