'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Hash } from 'lucide-react';

interface BasisPointCalc {
  description: string;
  percentValue: number;
  basisPoints: number;
  onMillion: number;
  category: 'Fee' | 'Yield' | 'Spread' | 'Rate Change';
  impact: 'High' | 'Medium' | 'Low';
}

const CALCULATIONS: BasisPointCalc[] = [
  { description: 'Fund Expense Ratio', percentValue: 0.03, basisPoints: 3, onMillion: 300, category: 'Fee', impact: 'Low' },
  { description: 'Advisory Fee', percentValue: 0.75, basisPoints: 75, onMillion: 7500, category: 'Fee', impact: 'High' },
  { description: '10Y Treasury Change', percentValue: 0.25, basisPoints: 25, onMillion: 2500, category: 'Rate Change', impact: 'Medium' },
  { description: 'Corporate Bond Spread', percentValue: 1.45, basisPoints: 145, onMillion: 14500, category: 'Spread', impact: 'High' },
  { description: 'Dividend Yield Diff', percentValue: 0.52, basisPoints: 52, onMillion: 5200, category: 'Yield', impact: 'Medium' },
  { description: 'Bid-Ask Spread', percentValue: 0.08, basisPoints: 8, onMillion: 800, category: 'Spread', impact: 'Low' },
  { description: 'Fed Rate Hike', percentValue: 0.50, basisPoints: 50, onMillion: 5000, category: 'Rate Change', impact: 'High' },
  { description: 'Index Tracking Error', percentValue: 0.12, basisPoints: 12, onMillion: 1200, category: 'Fee', impact: 'Low' },
];

const impactVariant = (i: string) => i === 'Low' ? 'success' : i === 'High' ? 'danger' : 'warning';

export default function BasisPointsCalcPage() {
  const totalBps = CALCULATIONS.reduce((s, c) => s + c.basisPoints, 0);
  const avgBps = totalBps / CALCULATIONS.length;
  const totalCostOnMillion = CALCULATIONS.reduce((s, c) => s + c.onMillion, 0);
  const highImpact = CALCULATIONS.filter(c => c.impact === 'High').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Basis Points Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Convert between basis points and percentages</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total BPS</p><p className="text-lg font-bold text-white">{totalBps}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg BPS</p><p className="text-lg font-bold text-indigo-400">{avgBps.toFixed(0)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Cost per $1M</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalCostOnMillion)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">High Impact</p><p className="text-lg font-bold text-yellow-400">{highImpact}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Hash className="h-4 w-4 text-indigo-400" /> Basis Point Conversions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CALCULATIONS.map((c) => (
            <div key={c.description} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{c.description}</p>
                <p className="text-xs text-gray-500">{c.category} &middot; {c.percentValue}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{c.basisPoints} bps</p>
                  <p className="text-[10px] text-gray-500">{formatCurrency(c.onMillion)}/M</p>
                </div>
                <Badge variant={impactVariant(c.impact)}>{c.impact}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
