'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Timer } from 'lucide-react';

interface ClockPhase {
  phase: string;
  economy: string;
  inflation: string;
  bestAssets: string;
  worstAssets: string;
  currentSignal: number;
  status: 'Current' | 'Approaching' | 'Passed' | 'Distant';
}

const PHASES: ClockPhase[] = [
  { phase: 'Recovery', economy: 'Growth rising', inflation: 'Falling', bestAssets: 'Equities, HY Bonds', worstAssets: 'Commodities', currentSignal: 85, status: 'Current' },
  { phase: 'Expansion', economy: 'Strong growth', inflation: 'Rising', bestAssets: 'Equities, Real Estate', worstAssets: 'Govt Bonds', currentSignal: 72, status: 'Approaching' },
  { phase: 'Overheating', economy: 'Peak growth', inflation: 'High', bestAssets: 'Commodities, TIPS', worstAssets: 'Bonds, Growth', currentSignal: 35, status: 'Distant' },
  { phase: 'Stagflation', economy: 'Slowing', inflation: 'High', bestAssets: 'Cash, Gold', worstAssets: 'Equities', currentSignal: 18, status: 'Distant' },
  { phase: 'Slowdown', economy: 'Contracting', inflation: 'Falling', bestAssets: 'Govt Bonds, Utilities', worstAssets: 'Cyclicals', currentSignal: 28, status: 'Passed' },
  { phase: 'Recession', economy: 'Contraction', inflation: 'Low', bestAssets: 'Bonds, Defensives', worstAssets: 'Equities, Commodities', currentSignal: 12, status: 'Passed' },
];

const statusVariant = (s: string) => s === 'Current' ? 'success' : s === 'Approaching' ? 'warning' : s === 'Passed' ? 'info' : 'default';

export default function InvestmentClockPage() {
  const currentPhase = PHASES.find(p => p.status === 'Current');
  const maxSignal = Math.max(...PHASES.map(p => p.currentSignal));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Investment Clock</h1>
        <p className="mt-1 text-sm text-gray-500">Economic cycle phase indicator and asset allocation</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Current Phase</p><p className="text-lg font-bold text-green-400">{currentPhase?.phase}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Signal Strength</p><p className="text-lg font-bold text-indigo-400">{maxSignal}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Economy</p><p className="text-lg font-bold text-white">{currentPhase?.economy}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Inflation</p><p className="text-lg font-bold text-yellow-400">{currentPhase?.inflation}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Timer className="h-4 w-4 text-indigo-400" /> Economic Cycle Phases</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PHASES.map((p) => (
            <div key={p.phase} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{p.phase}</p>
                <p className="text-[10px] text-gray-500">{p.economy}</p>
              </div>
              <span className="text-[10px] text-gray-400 w-14">Infl: {p.inflation}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-green-400 truncate">Best: {p.bestAssets}</p>
                <p className="text-[10px] text-red-400 truncate">Worst: {p.worstAssets}</p>
              </div>
              <span className={cn('text-xs font-mono w-10', p.currentSignal >= 60 ? 'text-green-400' : p.currentSignal >= 30 ? 'text-yellow-400' : 'text-gray-500')}>{p.currentSignal}%</span>
              <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
