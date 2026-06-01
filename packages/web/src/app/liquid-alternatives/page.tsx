'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Droplets } from 'lucide-react';

interface LiquidAlt {
  name: string;
  ticker: string;
  strategy: string;
  ytdReturn: number;
  sharpe: number;
  maxDrawdown: number;
  correlation: number;
  expenseRatio: number;
  aum: string;
  rating: 'Strong' | 'Average' | 'Weak';
}

const ALTS: LiquidAlt[] = [
  { name: 'AQR Managed Futures', ticker: 'AQMIX', strategy: 'Managed Futures', ytdReturn: 8.5, sharpe: 0.92, maxDrawdown: -8.2, correlation: 0.05, expenseRatio: 1.15, aum: '$12.5B', rating: 'Strong' },
  { name: 'PIMCO Trends', ticker: 'PQTIX', strategy: 'Trend Following', ytdReturn: 6.2, sharpe: 0.78, maxDrawdown: -12.5, correlation: -0.10, expenseRatio: 1.29, aum: '$4.8B', rating: 'Average' },
  { name: 'Blackstone Alt Multi', ticker: 'BXMIX', strategy: 'Multi-Strategy', ytdReturn: 4.8, sharpe: 1.15, maxDrawdown: -4.5, correlation: 0.22, expenseRatio: 1.85, aum: '$8.2B', rating: 'Strong' },
  { name: 'JPM Hedged Equity', ticker: 'JHEQX', strategy: 'Hedged Equity', ytdReturn: 7.2, sharpe: 0.88, maxDrawdown: -6.8, correlation: 0.65, expenseRatio: 0.60, aum: '$18.5B', rating: 'Strong' },
  { name: 'Merger Fund', ticker: 'MERFX', strategy: 'Merger Arb', ytdReturn: 3.5, sharpe: 0.65, maxDrawdown: -3.2, correlation: 0.15, expenseRatio: 1.28, aum: '$2.1B', rating: 'Average' },
  { name: 'Gateway Fund', ticker: 'GATEX', strategy: 'Options Overlay', ytdReturn: 5.1, sharpe: 0.72, maxDrawdown: -7.5, correlation: 0.55, expenseRatio: 0.94, aum: '$7.5B', rating: 'Average' },
  { name: 'IQ Hedge Multi', ticker: 'QAI', strategy: 'Multi-Strategy', ytdReturn: 2.8, sharpe: 0.45, maxDrawdown: -5.8, correlation: 0.35, expenseRatio: 0.75, aum: '$0.8B', rating: 'Weak' },
];

const ratingVariant = (r: string) => r === 'Strong' ? 'success' : r === 'Average' ? 'warning' : 'danger';

export default function LiquidAlternativesPage() {
  const avgSharpe = ALTS.reduce((s, a) => s + a.sharpe, 0) / ALTS.length;
  const avgReturn = ALTS.reduce((s, a) => s + a.ytdReturn, 0) / ALTS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Liquid Alternatives</h1>
        <p className="mt-1 text-sm text-gray-500">Liquid alternative fund analysis and comparison</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Funds</p><p className="text-lg font-bold text-white">{ALTS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Return</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Sharpe</p><p className="text-lg font-bold text-indigo-400">{avgSharpe.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Rated</p><p className="text-lg font-bold text-cyan-400">{ALTS.filter(a => a.rating === 'Strong').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Droplets className="h-4 w-4 text-indigo-400" /> Liquid Alt Strategies</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ALTS.map((a) => (
            <div key={a.ticker} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{a.ticker}</p>
                <p className="text-[10px] text-gray-500 truncate">{a.strategy}</p>
              </div>
              <span className={cn('text-xs font-mono w-12', a.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>+{a.ytdReturn}%</span>
              <span className="text-xs font-mono text-indigo-400 w-10">SR {a.sharpe}</span>
              <span className="text-xs font-mono text-red-400 w-12">{a.maxDrawdown}%</span>
              <span className="text-[10px] text-gray-400 w-10">r={a.correlation}</span>
              <span className="text-[10px] text-gray-500 w-10">{a.aum}</span>
              <Badge variant={ratingVariant(a.rating)} className="ml-auto">{a.rating}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
