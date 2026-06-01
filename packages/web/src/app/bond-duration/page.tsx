'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Clock } from 'lucide-react';

interface BondDurationEntry {
  bondName: string;
  coupon: number;
  maturity: string;
  yieldToMaturity: number;
  duration: number;
  convexity: number;
  priceChange1pct: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const BONDS: BondDurationEntry[] = [
  { bondName: 'US 2Y Treasury', coupon: 4.75, maturity: '2026', yieldToMaturity: 4.82, duration: 1.92, convexity: 4.8, priceChange1pct: -1.87, riskLevel: 'Low' },
  { bondName: 'US 5Y Treasury', coupon: 4.25, maturity: '2029', yieldToMaturity: 4.35, duration: 4.52, convexity: 22.4, priceChange1pct: -4.30, riskLevel: 'Medium' },
  { bondName: 'US 10Y Treasury', coupon: 4.00, maturity: '2034', yieldToMaturity: 4.18, duration: 8.15, convexity: 75.2, priceChange1pct: -7.77, riskLevel: 'High' },
  { bondName: 'US 30Y Treasury', coupon: 4.50, maturity: '2054', yieldToMaturity: 4.42, duration: 16.82, convexity: 382.5, priceChange1pct: -15.91, riskLevel: 'High' },
  { bondName: 'IG Corporate 5Y', coupon: 5.10, maturity: '2029', yieldToMaturity: 5.25, duration: 4.28, convexity: 20.8, priceChange1pct: -4.07, riskLevel: 'Medium' },
  { bondName: 'HY Corporate 7Y', coupon: 7.50, maturity: '2031', yieldToMaturity: 8.20, duration: 5.15, convexity: 32.1, priceChange1pct: -4.83, riskLevel: 'High' },
  { bondName: 'Municipal 10Y', coupon: 3.25, maturity: '2034', yieldToMaturity: 3.40, duration: 8.42, convexity: 80.5, priceChange1pct: -8.02, riskLevel: 'Medium' },
];

const riskVariant = (r: string) => r === 'Low' ? 'success' : r === 'High' ? 'danger' : 'warning';

export default function BondDurationPage() {
  const avgDuration = BONDS.reduce((s, b) => s + b.duration, 0) / BONDS.length;
  const avgConvexity = BONDS.reduce((s, b) => s + b.convexity, 0) / BONDS.length;
  const avgYield = BONDS.reduce((s, b) => s + b.yieldToMaturity, 0) / BONDS.length;
  const highRisk = BONDS.filter(b => b.riskLevel === 'High').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bond Duration</h1>
        <p className="mt-1 text-sm text-gray-500">Bond duration and convexity analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Duration</p><p className="text-lg font-bold text-white">{avgDuration.toFixed(2)}yr</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Convexity</p><p className="text-lg font-bold text-indigo-400">{avgConvexity.toFixed(1)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg YTM</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">High Risk</p><p className="text-lg font-bold text-red-400">{highRisk}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-indigo-400" /> Duration & Convexity</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BONDS.map((b) => (
            <div key={b.bondName} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{b.bondName}</p>
                <p className="text-xs text-gray-500">{b.coupon}% coupon &middot; Mat {b.maturity} &middot; YTM {b.yieldToMaturity}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">Dur {b.duration.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-500">Conv {b.convexity} &middot; {b.priceChange1pct}%/1%</p>
                </div>
                <Badge variant={riskVariant(b.riskLevel)}>{b.riskLevel}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
