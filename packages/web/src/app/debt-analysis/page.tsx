'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { Landmark } from 'lucide-react';

interface DebtIssue {
  description: string;
  amount: number;
  rate: number;
  maturity: string;
  type: 'Fixed' | 'Float';
}

const DEBT: DebtIssue[] = [
  { description: '2.65% Notes 2030', amount: 12.5e9, rate: 2.65, maturity: '2030-05-11', type: 'Fixed' },
  { description: '3.45% Notes 2045', amount: 10.0e9, rate: 3.45, maturity: '2045-02-09', type: 'Fixed' },
  { description: '1.25% Notes 2028', amount: 8.5e9, rate: 1.25, maturity: '2028-08-20', type: 'Fixed' },
  { description: '4.10% Notes 2062', amount: 7.0e9, rate: 4.10, maturity: '2062-08-08', type: 'Fixed' },
  { description: '3.85% Notes 2043', amount: 9.0e9, rate: 3.85, maturity: '2043-08-04', type: 'Fixed' },
  { description: '0.70% Notes 2026', amount: 6.5e9, rate: 0.70, maturity: '2026-02-08', type: 'Fixed' },
  { description: 'Commercial Paper', amount: 6.0e9, rate: 5.35, maturity: '2024-05-15', type: 'Float' },
  { description: '2.40% Notes 2050', amount: 8.0e9, rate: 2.40, maturity: '2050-05-03', type: 'Fixed' },
];

export default function DebtAnalysisPage() {
  const totalDebt = DEBT.reduce((s, d) => s + d.amount, 0);
  const weightedRate = DEBT.reduce((s, d) => s + d.rate * (d.amount / totalDebt), 0);
  const shortTerm = DEBT.filter((d) => new Date(d.maturity) < new Date('2027-01-01')).reduce((s, d) => s + d.amount, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Debt Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL debt structure and maturity profile</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Debt</p><p className="text-lg font-bold text-white">{formatLargeNumber(totalDebt)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Rate</p><p className="text-lg font-bold text-yellow-400">{weightedRate.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Short-Term</p><p className="text-lg font-bold text-red-400">{formatLargeNumber(shortTerm)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Issues</p><p className="text-lg font-bold text-indigo-400">{DEBT.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Landmark className="h-4 w-4 text-indigo-400" /> Debt Issues</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DEBT.sort((a, b) => a.maturity.localeCompare(b.maturity)).map((d) => {
            const pct = d.amount / totalDebt * 100;
            return (
              <div key={d.description} className="flex items-center gap-3 py-2 px-4">
                <span className="text-xs text-white w-36 truncate">{d.description}</span>
                <span className="text-xs font-mono text-white w-14">{formatLargeNumber(d.amount)}</span>
                <span className="text-xs font-mono text-yellow-400 w-12">{d.rate.toFixed(2)}%</span>
                <Badge variant={d.type === 'Fixed' ? 'info' : 'warning'}>{d.type}</Badge>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden"><div className="bg-indigo-500/40 h-full rounded-full" style={{ width: `${pct}%` }} /></div>
                <span className="text-[10px] text-gray-500 w-16">{d.maturity.slice(0, 7)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
