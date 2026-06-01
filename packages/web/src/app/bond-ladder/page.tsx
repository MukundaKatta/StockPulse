'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface BondLadderRung {
  maturityYear: number;
  bondType: string;
  faceValue: number;
  couponRate: number;
  yieldToMaturity: number;
  annualIncome: number;
  status: 'Active' | 'Maturing Soon' | 'Reinvest';
}

const LADDER: BondLadderRung[] = [
  { maturityYear: 2025, bondType: 'US Treasury', faceValue: 25000, couponRate: 3.75, yieldToMaturity: 4.82, annualIncome: 937.50, status: 'Maturing Soon' },
  { maturityYear: 2026, bondType: 'US Treasury', faceValue: 25000, couponRate: 4.25, yieldToMaturity: 4.65, annualIncome: 1062.50, status: 'Active' },
  { maturityYear: 2027, bondType: 'Corporate IG', faceValue: 25000, couponRate: 5.10, yieldToMaturity: 5.25, annualIncome: 1275.00, status: 'Active' },
  { maturityYear: 2028, bondType: 'Municipal', faceValue: 25000, couponRate: 3.50, yieldToMaturity: 3.62, annualIncome: 875.00, status: 'Active' },
  { maturityYear: 2029, bondType: 'US Treasury', faceValue: 25000, couponRate: 4.50, yieldToMaturity: 4.35, annualIncome: 1125.00, status: 'Active' },
  { maturityYear: 2030, bondType: 'Corporate IG', faceValue: 25000, couponRate: 5.40, yieldToMaturity: 5.50, annualIncome: 1350.00, status: 'Active' },
  { maturityYear: 2031, bondType: 'US Treasury', faceValue: 25000, couponRate: 4.00, yieldToMaturity: 4.18, annualIncome: 1000.00, status: 'Active' },
  { maturityYear: 2032, bondType: 'Municipal', faceValue: 25000, couponRate: 3.25, yieldToMaturity: 3.40, annualIncome: 812.50, status: 'Active' },
];

const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'Maturing Soon' ? 'warning' : 'info';

export default function BondLadderPage() {
  const totalFace = LADDER.reduce((s, l) => s + l.faceValue, 0);
  const totalIncome = LADDER.reduce((s, l) => s + l.annualIncome, 0);
  const avgYield = LADDER.reduce((s, l) => s + l.yieldToMaturity, 0) / LADDER.length;
  const maturingSoon = LADDER.filter(l => l.status === 'Maturing Soon').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bond Ladder</h1>
        <p className="mt-1 text-sm text-gray-500">Bond ladder strategy builder</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Face</p><p className="text-lg font-bold text-white">{formatCurrency(totalFace)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Annual Income</p><p className="text-lg font-bold text-green-400">{formatCurrency(totalIncome)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg YTM</p><p className="text-lg font-bold text-indigo-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Maturing Soon</p><p className="text-lg font-bold text-yellow-400">{maturingSoon}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-indigo-400" /> Ladder Rungs</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {LADDER.map((l) => (
            <div key={l.maturityYear} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{l.maturityYear} &middot; {l.bondType}</p>
                <p className="text-xs text-gray-500">{l.couponRate}% coupon &middot; YTM {l.yieldToMaturity}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(l.faceValue)}</p>
                  <p className="text-[10px] text-green-400">{formatCurrency(l.annualIncome)}/yr</p>
                </div>
                <Badge variant={statusVariant(l.status)}>{l.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
