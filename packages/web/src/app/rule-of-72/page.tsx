'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Zap } from 'lucide-react';

export default function RuleOf72Page() {
  const [rate, setRate] = useState('8');
  const [amount, setAmount] = useState('10000');

  const r = parseFloat(rate) || 0;
  const amt = parseFloat(amount) || 0;
  const doublingYears = r > 0 ? 72 / r : Infinity;

  const doublings = Array.from({ length: 8 }, (_, i) => ({
    doubling: i + 1,
    years: doublingYears * (i + 1),
    value: amt * Math.pow(2, i + 1),
  }));

  const RATES = [2, 4, 6, 8, 10, 12, 15, 20];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Rule of 72</h1>
        <p className="mt-1 text-sm text-gray-500">Quick estimation of investment doubling time</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Annual Return (%)</label><Input type="number" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Starting Amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        </div>
      </Card>

      <Card className="!p-5 text-center ring-1 ring-indigo-500/20">
        <Zap className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
        <p className="text-xs text-gray-500">Your money doubles every</p>
        <p className="text-4xl font-bold text-indigo-400 mt-1">{doublingYears === Infinity ? '∞' : doublingYears.toFixed(1)} years</p>
        <p className="text-xs text-gray-500 mt-1">at {r}% annual return</p>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Doubling Timeline</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {doublings.filter((d) => d.years <= 100).map((d) => (
            <div key={d.doubling} className="flex items-center justify-between py-2 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-indigo-400 font-medium">×{Math.pow(2, d.doubling)}</span>
                <span className="text-xs text-gray-400">Year {d.years.toFixed(1)}</span>
              </div>
              <span className="text-sm font-mono text-green-400">{formatCurrency(d.value)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Quick Reference</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {RATES.map((rt) => (
            <div key={rt} className="flex items-center justify-between py-2 px-2">
              <span className="text-xs text-gray-400">{rt}% return</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-500/50" style={{ width: `${Math.min((rt / 20) * 100, 100)}%` }} />
                </div>
                <span className={cn('text-xs font-mono', rt === r ? 'text-indigo-400 font-bold' : 'text-gray-300')}>{(72 / rt).toFixed(1)} years</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
