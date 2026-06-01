'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/formatters';
import { Users } from 'lucide-react';

interface Executive {
  name: string;
  title: string;
  salary: number;
  bonus: number;
  stockAwards: number;
  optionAwards: number;
  other: number;
  total: number;
}

const EXECS: Executive[] = [
  { name: 'Tim Cook', title: 'CEO', salary: 3e6, bonus: 0, stockAwards: 40.8e6, optionAwards: 0, other: 1.5e6, total: 49.0e6 },
  { name: 'Luca Maestri', title: 'CFO', salary: 1e6, bonus: 0, stockAwards: 21.2e6, optionAwards: 0, other: 0.8e6, total: 26.9e6 },
  { name: 'Jeff Williams', title: 'COO', salary: 1e6, bonus: 0, stockAwards: 21.2e6, optionAwards: 0, other: 0.8e6, total: 26.9e6 },
  { name: 'Deirdre O\'Brien', title: 'SVP Retail', salary: 1e6, bonus: 0, stockAwards: 21.2e6, optionAwards: 0, other: 0.5e6, total: 26.6e6 },
  { name: 'Craig Federighi', title: 'SVP Software', salary: 1e6, bonus: 0, stockAwards: 21.2e6, optionAwards: 0, other: 0.5e6, total: 26.6e6 },
];

export default function ExecutiveCompPage() {
  const totalComp = EXECS.reduce((s, e) => s + e.total, 0);
  const ceoPayRatio = 1551;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Executive Compensation</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL named executive officer compensation</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total NEO Comp</p><p className="text-lg font-bold text-white">{formatCurrency(totalComp)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">CEO Pay</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(EXECS[0].total)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">CEO Pay Ratio</p><p className="text-lg font-bold text-yellow-400">{ceoPayRatio}:1</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-indigo-400" /> Compensation Breakdown</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {EXECS.map((e) => {
            const stockPct = (e.stockAwards / e.total) * 100;
            return (
              <div key={e.name} className="py-2 px-4 space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-32"><p className="text-xs font-bold text-white">{e.name}</p><p className="text-[10px] text-gray-500">{e.title}</p></div>
                  <span className="text-xs font-mono text-gray-400 w-16">Sal: {formatCurrency(e.salary)}</span>
                  <span className="text-xs font-mono text-indigo-400 w-16">Stk: {formatCurrency(e.stockAwards)}</span>
                  <span className="text-xs font-mono text-gray-400 w-16">Oth: {formatCurrency(e.other)}</span>
                  <span className="text-xs font-mono font-bold text-white ml-auto">{formatCurrency(e.total)}</span>
                </div>
                <div className="flex h-1.5 rounded-full overflow-hidden bg-white/5">
                  <div className="bg-gray-500/50 h-full" style={{ width: `${(e.salary / e.total) * 100}%` }} />
                  <div className="bg-indigo-500/50 h-full" style={{ width: `${stockPct}%` }} />
                  <div className="bg-yellow-500/50 h-full" style={{ width: `${(e.other / e.total) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
