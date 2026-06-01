'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Clock } from 'lucide-react';

interface DurationMatch {
  liability: string;
  targetDuration: number;
  currentDuration: number;
  mismatch: number;
  allocation: number;
  bondHolding: string;
  status: 'Matched' | 'Overweight' | 'Underweight';
}

const MATCHES: DurationMatch[] = [
  { liability: 'Pension 2030', targetDuration: 5.2, currentDuration: 5.1, mismatch: -0.1, allocation: 850000, bondHolding: 'UST 5Y', status: 'Matched' },
  { liability: 'Pension 2035', targetDuration: 8.4, currentDuration: 7.8, mismatch: -0.6, allocation: 1250000, bondHolding: 'UST 10Y', status: 'Underweight' },
  { liability: 'Insurance Reserves', targetDuration: 12.5, currentDuration: 13.2, mismatch: 0.7, allocation: 2100000, bondHolding: 'UST 20Y', status: 'Overweight' },
  { liability: 'Annuity Pool A', targetDuration: 15.8, currentDuration: 15.5, mismatch: -0.3, allocation: 3400000, bondHolding: 'UST 30Y', status: 'Matched' },
  { liability: 'Short-Term Oblig.', targetDuration: 1.8, currentDuration: 2.1, mismatch: 0.3, allocation: 500000, bondHolding: 'UST 2Y', status: 'Overweight' },
  { liability: 'Pension 2040', targetDuration: 10.2, currentDuration: 9.5, mismatch: -0.7, allocation: 1800000, bondHolding: 'UST 10Y', status: 'Underweight' },
  { liability: 'Endowment Fund', targetDuration: 7.0, currentDuration: 7.1, mismatch: 0.1, allocation: 960000, bondHolding: 'Corp IG 7Y', status: 'Matched' },
];

const statusVariant = (s: string) => s === 'Matched' ? 'success' : s === 'Overweight' ? 'warning' : 'danger';

export default function DurationMatchingPage() {
  const matched = MATCHES.filter(m => m.status === 'Matched').length;
  const avgMismatch = MATCHES.reduce((s, m) => s + Math.abs(m.mismatch), 0) / MATCHES.length;
  const totalAllocation = MATCHES.reduce((s, m) => s + m.allocation, 0);
  const avgDuration = MATCHES.reduce((s, m) => s + m.targetDuration, 0) / MATCHES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Duration Matching</h1>
        <p className="mt-1 text-sm text-gray-500">Asset-liability duration matching tool</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Matched</p><p className="text-lg font-bold text-green-400">{matched}/{MATCHES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Mismatch</p><p className="text-lg font-bold text-amber-400">{avgMismatch.toFixed(2)}yr</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Alloc</p><p className="text-lg font-bold text-white">{formatCurrency(totalAllocation)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Duration</p><p className="text-lg font-bold text-indigo-400">{avgDuration.toFixed(1)}yr</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-indigo-400" /> Duration Matches</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {MATCHES.map((m) => (
            <div key={m.liability} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{m.liability}</p>
                <p className="text-xs text-gray-500">{m.bondHolding} &middot; Target {m.targetDuration}yr &middot; Current {m.currentDuration}yr</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(m.allocation)}</p>
                  <p className={cn('text-[10px] font-mono', Math.abs(m.mismatch) <= 0.2 ? 'text-green-400' : 'text-amber-400')}>{m.mismatch >= 0 ? '+' : ''}{m.mismatch}yr gap</p>
                </div>
                <Badge variant={statusVariant(m.status)}>{m.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
