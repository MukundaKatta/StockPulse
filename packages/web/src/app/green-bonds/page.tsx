'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Leaf } from 'lucide-react';

interface GreenBond {
  issuer: string;
  amount: string;
  coupon: number;
  yield: number;
  maturity: string;
  useOfProceeds: string;
  greenium: number;
  certification: 'CBI Certified' | 'Self-Labeled' | 'ICMA Aligned';
}

const BONDS: GreenBond[] = [
  { issuer: 'European Investment Bank', amount: '$5B', coupon: 3.50, yield: 3.65, maturity: '2034', useOfProceeds: 'Renewable Energy', greenium: -8, certification: 'CBI Certified' },
  { issuer: 'Apple Inc', amount: '$2.5B', coupon: 3.25, yield: 3.40, maturity: '2032', useOfProceeds: 'Clean Energy', greenium: -5, certification: 'ICMA Aligned' },
  { issuer: 'France (OAT)', amount: '$10B', coupon: 2.00, yield: 3.10, maturity: '2039', useOfProceeds: 'Climate Adaptation', greenium: -12, certification: 'CBI Certified' },
  { issuer: 'NextEra Energy', amount: '$1.5B', coupon: 4.10, yield: 4.25, maturity: '2031', useOfProceeds: 'Wind/Solar', greenium: -3, certification: 'Self-Labeled' },
  { issuer: 'World Bank', amount: '$3B', coupon: 3.00, yield: 3.15, maturity: '2033', useOfProceeds: 'Sustainable Dev.', greenium: -10, certification: 'CBI Certified' },
  { issuer: 'Toyota Motor', amount: '$1.8B', coupon: 3.75, yield: 3.90, maturity: '2030', useOfProceeds: 'EV Manufacturing', greenium: -4, certification: 'ICMA Aligned' },
  { issuer: 'Iberdrola', amount: '$1.2B', coupon: 4.25, yield: 4.40, maturity: '2035', useOfProceeds: 'Offshore Wind', greenium: -6, certification: 'CBI Certified' },
];

const certVariant = (c: string) => c === 'CBI Certified' ? 'success' : c === 'ICMA Aligned' ? 'info' : 'warning';

export default function GreenBondsPage() {
  const avgYield = BONDS.reduce((s, b) => s + b.yield, 0) / BONDS.length;
  const avgGreenium = BONDS.reduce((s, b) => s + b.greenium, 0) / BONDS.length;
  const certified = BONDS.filter(b => b.certification === 'CBI Certified').length;
  const totalBonds = BONDS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Green Bonds</h1>
        <p className="mt-1 text-sm text-gray-500">ESG-certified green bond marketplace</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bonds</p><p className="text-lg font-bold text-white">{totalBonds}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Greenium</p><p className="text-lg font-bold text-indigo-400">{avgGreenium.toFixed(0)}bps</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">CBI Certified</p><p className="text-lg font-bold text-amber-400">{certified}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Leaf className="h-4 w-4 text-green-400" /> Green Bond Listings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BONDS.map((b) => (
            <div key={b.issuer} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{b.issuer}</p>
                <p className="text-xs text-gray-500">{b.coupon}% {b.maturity} &middot; {b.amount} &middot; {b.useOfProceeds}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{b.yield}% YTM</p>
                  <p className="text-[10px] text-gray-500">{b.greenium}bps greenium</p>
                </div>
                <Badge variant={certVariant(b.certification)}>{b.certification}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
