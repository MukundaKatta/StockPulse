'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Repeat } from 'lucide-react';

interface ConvertibleBond {
  issuer: string;
  coupon: number;
  maturity: string;
  conversionPrice: number;
  stockPrice: number;
  premium: number;
  size: string;
}

const CONVERTIBLES: ConvertibleBond[] = [
  { issuer: 'MicroStrategy', coupon: 0.625, maturity: '2028', conversionPrice: 232, stockPrice: 198, premium: 17.2, size: '$1.8B' },
  { issuer: 'Airbnb', coupon: 0.0, maturity: '2026', conversionPrice: 195, stockPrice: 155, premium: 25.8, size: '$2.0B' },
  { issuer: 'Palo Alto Networks', coupon: 0.375, maturity: '2025', conversionPrice: 310, stockPrice: 285, premium: 8.8, size: '$1.5B' },
  { issuer: 'Snap Inc', coupon: 0.75, maturity: '2028', conversionPrice: 18.50, stockPrice: 12.40, premium: 49.2, size: '$1.1B' },
  { issuer: 'Shopify', coupon: 0.125, maturity: '2027', conversionPrice: 85, stockPrice: 72, premium: 18.1, size: '$900M' },
  { issuer: 'Block (Square)', coupon: 0.25, maturity: '2027', conversionPrice: 95, stockPrice: 68, premium: 39.7, size: '$1.2B' },
];

export default function ConvertibleBondsPage() {
  const avgPremium = CONVERTIBLES.reduce((s, c) => s + c.premium, 0) / CONVERTIBLES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Convertible Bonds</h1>
        <p className="mt-1 text-sm text-gray-500">Track convertible bond issues and conversion premiums</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Issues</p>
          <p className="text-lg font-bold text-white">{CONVERTIBLES.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Premium</p>
          <p className="text-lg font-bold text-amber-400">{avgPremium.toFixed(1)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Lowest Premium</p>
          <p className="text-lg font-bold text-green-400">{Math.min(...CONVERTIBLES.map(c => c.premium)).toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Repeat className="inline h-4 w-4 mr-1" />Convertible Bond Issues</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {CONVERTIBLES.map((c) => (
            <div key={c.issuer} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{c.issuer}</p>
                <p className="text-xs text-gray-500">{c.coupon}% coupon &middot; Mat. {c.maturity} &middot; {c.size}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">${c.conversionPrice} conv</p>
                  <p className="text-[10px] text-gray-500">Stock ${c.stockPrice}</p>
                </div>
                <Badge variant={c.premium < 15 ? 'success' : c.premium < 30 ? 'warning' : 'danger'}>{c.premium}% prem</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
