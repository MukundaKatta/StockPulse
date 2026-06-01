'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Scale } from 'lucide-react';

interface NeutralStrategy {
  name: string;
  longLeg: string;
  shortLeg: string;
  spread: number;
  beta: number;
  sharpe: number;
  maxDrawdown: number;
  ytdReturn: number;
  status: 'Active' | 'Paused' | 'Closed';
}

const STRATEGIES: NeutralStrategy[] = [
  { name: 'Tech Pair Trade', longLeg: 'MSFT', shortLeg: 'ORCL', spread: 2.8, beta: 0.05, sharpe: 1.45, maxDrawdown: -3.2, ytdReturn: 5.8, status: 'Active' },
  { name: 'Energy Spread', longLeg: 'XOM', shortLeg: 'CVX', spread: 1.2, beta: -0.02, sharpe: 0.92, maxDrawdown: -5.8, ytdReturn: 3.2, status: 'Active' },
  { name: 'Bank Convergence', longLeg: 'JPM', shortLeg: 'BAC', spread: 3.5, beta: 0.08, sharpe: 1.15, maxDrawdown: -4.5, ytdReturn: 4.5, status: 'Active' },
  { name: 'Retail Arb', longLeg: 'WMT', shortLeg: 'TGT', spread: -1.8, beta: 0.12, sharpe: 0.68, maxDrawdown: -8.2, ytdReturn: -1.2, status: 'Paused' },
  { name: 'Pharma Pair', longLeg: 'LLY', shortLeg: 'PFE', spread: 8.5, beta: 0.03, sharpe: 1.82, maxDrawdown: -2.8, ytdReturn: 8.2, status: 'Active' },
  { name: 'Semi Spread', longLeg: 'NVDA', shortLeg: 'INTC', spread: 12.4, beta: 0.15, sharpe: 0.55, maxDrawdown: -12.5, ytdReturn: -2.5, status: 'Closed' },
  { name: 'Telecom Pair', longLeg: 'T', shortLeg: 'VZ', spread: 0.8, beta: 0.01, sharpe: 1.25, maxDrawdown: -2.1, ytdReturn: 2.8, status: 'Active' },
];

const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'Paused' ? 'warning' : 'danger';

export default function MarketNeutralPage() {
  const active = STRATEGIES.filter(s => s.status === 'Active');
  const avgSharpe = active.reduce((s, st) => s + st.sharpe, 0) / active.length;
  const avgBeta = active.reduce((s, st) => s + Math.abs(st.beta), 0) / active.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Neutral</h1>
        <p className="mt-1 text-sm text-gray-500">Market neutral pair trading strategies</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strategies</p><p className="text-lg font-bold text-white">{STRATEGIES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Active</p><p className="text-lg font-bold text-green-400">{active.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Sharpe</p><p className="text-lg font-bold text-indigo-400">{avgSharpe.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg |Beta|</p><p className="text-lg font-bold text-cyan-400">{avgBeta.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Scale className="h-4 w-4 text-indigo-400" /> Neutral Strategies</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STRATEGIES.map((s) => (
            <div key={s.name} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{s.name}</p>
                <p className="text-[10px] text-gray-500">{s.longLeg} / {s.shortLeg}</p>
              </div>
              <span className={cn('text-xs font-mono w-12', s.spread >= 0 ? 'text-green-400' : 'text-red-400')}>{s.spread >= 0 ? '+' : ''}{s.spread}%</span>
              <span className="text-[10px] text-gray-400 w-12">β {s.beta}</span>
              <span className="text-xs font-mono text-indigo-400 w-10">SR {s.sharpe}</span>
              <span className="text-[10px] text-red-400 w-12">DD {s.maxDrawdown}%</span>
              <Badge variant={statusVariant(s.status)} className="ml-auto">{s.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
