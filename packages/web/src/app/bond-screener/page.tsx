'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Search } from 'lucide-react';

interface Bond {
  issuer: string;
  coupon: number;
  maturity: string;
  yield: number;
  duration: number;
  rating: string;
  price: number;
}

const BONDS: Bond[] = [
  { issuer: 'US Treasury 10Y', coupon: 4.0, maturity: '2034', yield: 4.12, duration: 8.2, rating: 'AAA', price: 98.5 },
  { issuer: 'Apple Inc', coupon: 3.25, maturity: '2029', yield: 3.85, duration: 4.5, rating: 'AA+', price: 97.2 },
  { issuer: 'Microsoft Corp', coupon: 3.50, maturity: '2031', yield: 3.95, duration: 6.1, rating: 'AAA', price: 96.8 },
  { issuer: 'JPMorgan Chase', coupon: 4.50, maturity: '2030', yield: 4.82, duration: 5.0, rating: 'A+', price: 98.1 },
  { issuer: 'Goldman Sachs', coupon: 5.00, maturity: '2028', yield: 5.15, duration: 3.4, rating: 'A', price: 99.4 },
  { issuer: 'AT&T Inc', coupon: 5.25, maturity: '2033', yield: 5.60, duration: 7.1, rating: 'BBB', price: 95.2 },
  { issuer: 'Ford Motor', coupon: 6.00, maturity: '2029', yield: 6.45, duration: 4.2, rating: 'BB+', price: 97.8 },
];

const ratingVariant = (r: string) => r.startsWith('AA') ? 'success' : r.startsWith('A') ? 'info' : r.startsWith('BBB') ? 'warning' : 'danger';

export default function BondScreenerPage() {
  const avgYield = BONDS.reduce((s, b) => s + b.yield, 0) / BONDS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bond Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Screen bonds by yield, duration and rating</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Bonds</p>
          <p className="text-lg font-bold text-white">{BONDS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Yield</p>
          <p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Highest Yield</p>
          <p className="text-lg font-bold text-amber-400">{Math.max(...BONDS.map(b => b.yield)).toFixed(2)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Search className="inline h-4 w-4 mr-1" />Bond Screener</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {BONDS.map((b) => (
            <div key={b.issuer} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{b.issuer}</p>
                <p className="text-xs text-gray-500">{b.coupon}% coupon &middot; Mat. {b.maturity} &middot; Dur. {b.duration}y</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-green-400">{b.yield.toFixed(2)}%</p>
                  <p className="text-[10px] text-gray-500">${b.price}</p>
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
