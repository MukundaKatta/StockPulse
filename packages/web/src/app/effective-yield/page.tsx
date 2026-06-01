'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface BondYield {
  name: string;
  coupon: number;
  price: number;
  parValue: number;
  maturity: string;
  nominalYield: number;
  effectiveYield: number;
  yieldSpread: number;
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB';
}

const BONDS: BondYield[] = [
  { name: 'US Treasury 10Y', coupon: 4.25, price: 98.50, parValue: 100, maturity: '2034', nominalYield: 4.25, effectiveYield: 4.42, yieldSpread: 0, rating: 'AAA' },
  { name: 'Apple 2032', coupon: 3.85, price: 96.20, parValue: 100, maturity: '2032', nominalYield: 3.85, effectiveYield: 4.38, yieldSpread: -4, rating: 'AA' },
  { name: 'Microsoft 2033', coupon: 3.50, price: 94.80, parValue: 100, maturity: '2033', nominalYield: 3.50, effectiveYield: 4.15, yieldSpread: -27, rating: 'AAA' },
  { name: 'JPMorgan 2031', coupon: 4.60, price: 101.20, parValue: 100, maturity: '2031', nominalYield: 4.60, effectiveYield: 4.42, yieldSpread: 0, rating: 'A' },
  { name: 'AT&T 2035', coupon: 5.25, price: 102.80, parValue: 100, maturity: '2035', nominalYield: 5.25, effectiveYield: 4.98, yieldSpread: 56, rating: 'BBB' },
  { name: 'Ford Motor 2030', coupon: 6.10, price: 104.50, parValue: 100, maturity: '2030', nominalYield: 6.10, effectiveYield: 5.42, yieldSpread: 100, rating: 'BB' },
  { name: 'Verizon 2033', coupon: 4.80, price: 99.50, parValue: 100, maturity: '2033', nominalYield: 4.80, effectiveYield: 4.86, yieldSpread: 44, rating: 'BBB' },
];

const ratingVariant = (r: string) => r === 'AAA' ? 'success' : r === 'AA' ? 'info' : r === 'A' ? 'default' : r === 'BBB' ? 'warning' : 'danger';

export default function EffectiveYieldPage() {
  const avgEffYield = BONDS.reduce((s, b) => s + b.effectiveYield, 0) / BONDS.length;
  const avgSpread = BONDS.filter(b => b.yieldSpread !== 0).reduce((s, b) => s + b.yieldSpread, 0) / BONDS.filter(b => b.yieldSpread !== 0).length;
  const igBonds = BONDS.filter(b => ['AAA', 'AA', 'A', 'BBB'].includes(b.rating)).length;
  const totalBonds = BONDS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Effective Yield Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Nominal vs effective yield comparison across bonds</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bonds</p><p className="text-lg font-bold text-white">{totalBonds}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Eff. Yield</p><p className="text-lg font-bold text-green-400">{avgEffYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Spread</p><p className="text-lg font-bold text-indigo-400">{avgSpread.toFixed(0)}bps</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">IG Bonds</p><p className="text-lg font-bold text-amber-400">{igBonds}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-indigo-400" /> Yield Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BONDS.map((b) => (
            <div key={b.name} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{b.name}</p>
                <p className="text-xs text-gray-500">Coupon {b.coupon}% &middot; Price {formatCurrency(b.price)} &middot; Mat {b.maturity}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{b.effectiveYield}% eff</p>
                  <p className="text-[10px] text-gray-500">{b.yieldSpread >= 0 ? '+' : ''}{b.yieldSpread}bps spread</p>
                </div>
                <Badge variant={ratingVariant(b.rating)}>{b.rating}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
