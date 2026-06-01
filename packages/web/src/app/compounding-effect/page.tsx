'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Repeat } from 'lucide-react';

interface CompoundingScenario {
  label: string;
  principal: number;
  monthlyAdd: number;
  annualRate: number;
  years: number;
  futureValue: number;
  totalContributed: number;
  interestEarned: number;
  impact: 'High' | 'Medium' | 'Low';
}

const SCENARIOS: CompoundingScenario[] = [
  { label: 'Aggressive Growth', principal: 10000, monthlyAdd: 500, annualRate: 12, years: 30, futureValue: 1764925, totalContributed: 190000, interestEarned: 1574925, impact: 'High' },
  { label: 'Balanced Portfolio', principal: 10000, monthlyAdd: 500, annualRate: 8, years: 30, futureValue: 793421, totalContributed: 190000, interestEarned: 603421, impact: 'High' },
  { label: 'Conservative Mix', principal: 10000, monthlyAdd: 500, annualRate: 5, years: 30, futureValue: 428675, totalContributed: 190000, interestEarned: 238675, impact: 'Medium' },
  { label: 'High Savings Rate', principal: 50000, monthlyAdd: 2000, annualRate: 7, years: 20, futureValue: 1248320, totalContributed: 530000, interestEarned: 718320, impact: 'High' },
  { label: 'Early Start (Age 25)', principal: 5000, monthlyAdd: 300, annualRate: 9, years: 40, futureValue: 1412580, totalContributed: 149000, interestEarned: 1263580, impact: 'High' },
  { label: 'Late Start (Age 45)', principal: 50000, monthlyAdd: 1000, annualRate: 9, years: 20, futureValue: 938240, totalContributed: 290000, interestEarned: 648240, impact: 'Medium' },
  { label: 'Savings Account', principal: 10000, monthlyAdd: 500, annualRate: 2, years: 30, futureValue: 256210, totalContributed: 190000, interestEarned: 66210, impact: 'Low' },
];

const impactVariant = (i: string) => i === 'High' ? 'success' : i === 'Low' ? 'danger' : 'warning';

export default function CompoundingEffectPage() {
  const bestScenario = SCENARIOS.reduce((b, s) => s.futureValue > b.futureValue ? s : b);
  const avgMultiplier = SCENARIOS.reduce((s, sc) => s + sc.futureValue / sc.totalContributed, 0) / SCENARIOS.length;
  const totalInterest = SCENARIOS.reduce((s, sc) => s + sc.interestEarned, 0);
  const highImpact = SCENARIOS.filter(s => s.impact === 'High').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Compounding Effect</h1>
        <p className="mt-1 text-sm text-gray-500">Power of compounding visualizer</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Best Outcome</p><p className="text-lg font-bold text-green-400">{formatCurrency(bestScenario.futureValue)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Multiplier</p><p className="text-lg font-bold text-indigo-400">{avgMultiplier.toFixed(1)}x</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Interest</p><p className="text-lg font-bold text-white">{formatCurrency(totalInterest)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">High Impact</p><p className="text-lg font-bold text-green-400">{highImpact}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Repeat className="h-4 w-4 text-indigo-400" /> Compounding Scenarios</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SCENARIOS.map((s) => (
            <div key={s.label} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{s.label}</p>
                <p className="text-xs text-gray-500">{formatCurrency(s.principal)} + {formatCurrency(s.monthlyAdd)}/mo &middot; {s.annualRate}% &middot; {s.years}yr</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-green-400">{formatCurrency(s.futureValue)}</p>
                  <p className="text-[10px] text-gray-500">{formatCurrency(s.interestEarned)} interest</p>
                </div>
                <Badge variant={impactVariant(s.impact)}>{s.impact}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
