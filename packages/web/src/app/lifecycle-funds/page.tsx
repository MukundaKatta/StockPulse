'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface LifecycleFund {
  name: string;
  ticker: string;
  targetDate: number;
  equityPct: number;
  bondPct: number;
  expenseRatio: number;
  ytdReturn: number;
  fiveYrReturn: number;
  aum: string;
  glidePhase: 'Growth' | 'Transition' | 'Income';
}

const FUNDS: LifecycleFund[] = [
  { name: 'Vanguard Target 2060', ticker: 'VTTSX', targetDate: 2060, equityPct: 90, bondPct: 10, expenseRatio: 0.08, ytdReturn: 12.8, fiveYrReturn: 10.2, aum: '$18.5B', glidePhase: 'Growth' },
  { name: 'Fidelity Freedom 2050', ticker: 'FFFHX', targetDate: 2050, equityPct: 85, bondPct: 15, expenseRatio: 0.12, ytdReturn: 11.4, fiveYrReturn: 9.8, aum: '$22.1B', glidePhase: 'Growth' },
  { name: 'Vanguard Target 2040', ticker: 'VFORX', targetDate: 2040, equityPct: 78, bondPct: 22, expenseRatio: 0.08, ytdReturn: 9.8, fiveYrReturn: 8.5, aum: '$32.4B', glidePhase: 'Transition' },
  { name: 'T. Rowe Price 2035', ticker: 'TRRJX', targetDate: 2035, equityPct: 72, bondPct: 28, expenseRatio: 0.56, ytdReturn: 8.5, fiveYrReturn: 7.8, aum: '$15.2B', glidePhase: 'Transition' },
  { name: 'Vanguard Target 2030', ticker: 'VTHRX', targetDate: 2030, equityPct: 65, bondPct: 35, expenseRatio: 0.08, ytdReturn: 7.2, fiveYrReturn: 6.9, aum: '$42.8B', glidePhase: 'Transition' },
  { name: 'Fidelity Freedom 2025', ticker: 'FFEDX', targetDate: 2025, equityPct: 48, bondPct: 52, expenseRatio: 0.12, ytdReturn: 4.8, fiveYrReturn: 5.2, aum: '$28.5B', glidePhase: 'Income' },
  { name: 'Vanguard Target Income', ticker: 'VTINX', targetDate: 2020, equityPct: 30, bondPct: 70, expenseRatio: 0.08, ytdReturn: 2.5, fiveYrReturn: 3.8, aum: '$18.2B', glidePhase: 'Income' },
];

const phaseVariant = (p: string) => p === 'Growth' ? 'success' : p === 'Transition' ? 'warning' : 'info';

export default function LifecycleFundsPage() {
  const avgReturn = FUNDS.reduce((s, f) => s + f.ytdReturn, 0) / FUNDS.length;
  const avgExpense = FUNDS.reduce((s, f) => s + f.expenseRatio, 0) / FUNDS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Lifecycle Funds</h1>
        <p className="mt-1 text-sm text-gray-500">Target-date fund comparison and glide path analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Funds</p><p className="text-lg font-bold text-white">{FUNDS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg YTD</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Expense</p><p className="text-lg font-bold text-indigo-400">{avgExpense.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Growth Phase</p><p className="text-lg font-bold text-cyan-400">{FUNDS.filter(f => f.glidePhase === 'Growth').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-indigo-400" /> Target-Date Funds</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {FUNDS.map((f) => (
            <div key={f.ticker} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-32">
                <p className="text-xs font-bold text-white">{f.ticker}</p>
                <p className="text-[10px] text-gray-500 truncate">{f.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-10">{f.targetDate}</span>
              <span className="text-[10px] text-green-400 w-14">Eq {f.equityPct}%</span>
              <span className="text-[10px] text-blue-400 w-14">Bd {f.bondPct}%</span>
              <span className={cn('text-xs font-mono w-12', f.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>+{f.ytdReturn}%</span>
              <span className="text-[10px] text-gray-400 w-12">ER {f.expenseRatio}%</span>
              <Badge variant={phaseVariant(f.glidePhase)} className="ml-auto">{f.glidePhase}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
