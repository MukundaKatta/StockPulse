'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Banknote } from 'lucide-react';

interface FixedIncomeHolding {
  name: string;
  type: string;
  yield: number;
  duration: number;
  coupon: number;
  price: number;
  change1W: number;
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'HY';
}

const HOLDINGS: FixedIncomeHolding[] = [
  { name: 'US Treasury 2Y', type: 'Government', yield: 4.62, duration: 1.9, coupon: 4.50, price: 99.75, change1W: -0.12, rating: 'AAA' },
  { name: 'US Treasury 10Y', type: 'Government', yield: 4.25, duration: 8.4, coupon: 4.00, price: 97.80, change1W: -0.35, rating: 'AAA' },
  { name: 'US Treasury 30Y', type: 'Government', yield: 4.45, duration: 18.2, coupon: 4.25, price: 95.50, change1W: -0.58, rating: 'AAA' },
  { name: 'Corp IG Aggregate', type: 'Investment Grade', yield: 5.10, duration: 6.8, coupon: 4.80, price: 98.20, change1W: -0.15, rating: 'A' },
  { name: 'MBS Pass-Through', type: 'Mortgage-Backed', yield: 5.25, duration: 4.5, coupon: 5.00, price: 99.10, change1W: 0.08, rating: 'AA' },
  { name: 'Municipal Bond Idx', type: 'Municipal', yield: 3.45, duration: 5.2, coupon: 3.80, price: 101.20, change1W: 0.15, rating: 'AA' },
  { name: 'HY Corporate', type: 'High Yield', yield: 7.85, duration: 3.8, coupon: 6.50, price: 94.50, change1W: 0.22, rating: 'HY' },
  { name: 'TIPS 10Y', type: 'Inflation-Protected', yield: 1.95, duration: 8.1, coupon: 1.50, price: 96.80, change1W: -0.18, rating: 'AAA' },
];

const ratingVariant = (r: string) => r === 'AAA' ? 'success' : r === 'AA' ? 'info' : r === 'A' ? 'default' : r === 'BBB' ? 'warning' : 'danger';

export default function FixedIncomePage() {
  const avgYield = HOLDINGS.reduce((s, h) => s + h.yield, 0) / HOLDINGS.length;
  const avgDuration = HOLDINGS.reduce((s, h) => s + h.duration, 0) / HOLDINGS.length;
  const positiveWeek = HOLDINGS.filter(h => h.change1W > 0).length;
  const yieldSpread = HOLDINGS.find(h => h.name.includes('HY'))!.yield - HOLDINGS.find(h => h.name.includes('10Y'))!.yield;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Fixed Income Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Bond market summary and fixed income holdings</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Duration</p><p className="text-lg font-bold text-white">{avgDuration.toFixed(1)}yr</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">HY Spread</p><p className="text-lg font-bold text-indigo-400">{(yieldSpread * 100).toFixed(0)}bps</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Up This Week</p><p className="text-lg font-bold text-amber-400">{positiveWeek}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Banknote className="h-4 w-4 text-indigo-400" /> Fixed Income Holdings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.map((h) => (
            <div key={h.name} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{h.name}</p>
                <p className="text-xs text-gray-500">{h.type} &middot; Coupon {h.coupon}% &middot; Duration {h.duration}yr</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{h.yield}% YTM</p>
                  <p className={cn('text-[10px] font-mono', h.change1W >= 0 ? 'text-green-400' : 'text-red-400')}>{h.change1W >= 0 ? '+' : ''}{h.change1W}% 1W</p>
                </div>
                <Badge variant={ratingVariant(h.rating)}>{h.rating}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
