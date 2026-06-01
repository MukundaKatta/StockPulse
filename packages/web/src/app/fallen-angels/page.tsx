'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { ArrowDownCircle } from 'lucide-react';

interface FallenAngelBond {
  issuer: string;
  coupon: number;
  maturity: string;
  priorRating: string;
  currentRating: string;
  yield: number;
  spread: number;
  price: number;
  outlook: 'Stable' | 'Negative' | 'Positive';
}

const BONDS: FallenAngelBond[] = [
  { issuer: 'Ford Motor Co', coupon: 6.10, maturity: '2032', priorRating: 'BBB-', currentRating: 'BB+', yield: 5.85, spread: 160, price: 102.40, outlook: 'Stable' },
  { issuer: 'Kraft Heinz', coupon: 5.00, maturity: '2034', priorRating: 'BBB-', currentRating: 'BB+', yield: 5.42, spread: 118, price: 96.50, outlook: 'Positive' },
  { issuer: 'Occidental Petroleum', coupon: 6.45, maturity: '2030', priorRating: 'BBB-', currentRating: 'BB+', yield: 5.90, spread: 165, price: 104.20, outlook: 'Stable' },
  { issuer: 'Macy\'s Inc', coupon: 5.875, maturity: '2029', priorRating: 'BBB-', currentRating: 'BB', yield: 6.80, spread: 255, price: 94.80, outlook: 'Negative' },
  { issuer: 'FirstEnergy Corp', coupon: 4.15, maturity: '2031', priorRating: 'BBB-', currentRating: 'BB+', yield: 5.20, spread: 95, price: 92.40, outlook: 'Positive' },
  { issuer: 'Vodafone Group', coupon: 4.875, maturity: '2030', priorRating: 'BBB', currentRating: 'BBB-', yield: 5.10, spread: 85, price: 97.80, outlook: 'Stable' },
  { issuer: 'Rolls-Royce', coupon: 5.75, maturity: '2033', priorRating: 'BBB-', currentRating: 'BB+', yield: 6.15, spread: 190, price: 95.60, outlook: 'Positive' },
];

const outlookVariant = (o: string) => o === 'Positive' ? 'success' : o === 'Negative' ? 'danger' : 'warning';

export default function FallenAngelsPage() {
  const avgYield = BONDS.reduce((s, b) => s + b.yield, 0) / BONDS.length;
  const avgSpread = BONDS.reduce((s, b) => s + b.spread, 0) / BONDS.length;
  const positiveOutlook = BONDS.filter(b => b.outlook === 'Positive').length;
  const totalBonds = BONDS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Fallen Angel Bonds</h1>
        <p className="mt-1 text-sm text-gray-500">Recently downgraded investment-grade bonds</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bonds</p><p className="text-lg font-bold text-white">{totalBonds}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Spread</p><p className="text-lg font-bold text-indigo-400">{avgSpread.toFixed(0)}bps</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Positive Outlook</p><p className="text-lg font-bold text-amber-400">{positiveOutlook}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowDownCircle className="h-4 w-4 text-indigo-400" /> Fallen Angels</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BONDS.map((b) => (
            <div key={b.issuer} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{b.issuer}</p>
                <p className="text-xs text-gray-500">{b.coupon}% {b.maturity} &middot; {b.priorRating} &rarr; {b.currentRating} &middot; +{b.spread}bps</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{b.yield}% YTM</p>
                  <p className="text-[10px] text-gray-500">{formatCurrency(b.price)} price</p>
                </div>
                <Badge variant={outlookVariant(b.outlook)}>{b.outlook}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
