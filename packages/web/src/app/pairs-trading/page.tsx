'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { GitBranch } from 'lucide-react';

interface TradePair {
  stockA: string;
  stockB: string;
  correlation: number;
  spread: number;
  zScore: number;
  signal: 'Long A / Short B' | 'Short A / Long B' | 'No Signal';
  halfLife: number;
}

const PAIRS: TradePair[] = [
  { stockA: 'KO', stockB: 'PEP', correlation: 0.92, spread: 1.24, zScore: 2.15, signal: 'Short A / Long B', halfLife: 12 },
  { stockA: 'V', stockB: 'MA', correlation: 0.94, spread: 0.85, zScore: -1.82, signal: 'Long A / Short B', halfLife: 8 },
  { stockA: 'XOM', stockB: 'CVX', correlation: 0.91, spread: 1.05, zScore: 0.45, signal: 'No Signal', halfLife: 15 },
  { stockA: 'MSFT', stockB: 'GOOGL', correlation: 0.88, spread: 2.85, zScore: 1.95, signal: 'Short A / Long B', halfLife: 18 },
  { stockA: 'HD', stockB: 'LOW', correlation: 0.90, spread: 1.42, zScore: -0.32, signal: 'No Signal', halfLife: 10 },
  { stockA: 'JPM', stockB: 'BAC', correlation: 0.93, spread: 3.15, zScore: -2.08, signal: 'Long A / Short B', halfLife: 7 },
  { stockA: 'UNH', stockB: 'CI', correlation: 0.86, spread: 1.65, zScore: 0.88, signal: 'No Signal', halfLife: 22 },
  { stockA: 'DIS', stockB: 'NFLX', correlation: 0.72, spread: 4.28, zScore: 2.45, signal: 'Short A / Long B', halfLife: 25 },
];

export default function PairsTradingPage() {
  const activeSignals = PAIRS.filter((p) => p.signal !== 'No Signal').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Pairs Trading</h1>
        <p className="mt-1 text-sm text-gray-500">Statistical arbitrage pair signals based on cointegration</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Pairs Tracked</p>
          <p className="text-lg font-bold text-white">{PAIRS.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Active Signals</p>
          <p className="text-lg font-bold text-indigo-400">{activeSignals}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Z-Score Threshold</p>
          <p className="text-lg font-bold text-yellow-400">&pm;1.5</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <GitBranch className="h-4 w-4 text-indigo-400" /> Pair Signals
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {PAIRS.map((p) => (
            <div key={`${p.stockA}-${p.stockB}`} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-bold text-white w-20">{p.stockA} / {p.stockB}</span>
              <span className="text-xs font-mono text-gray-400 w-12">r={p.correlation.toFixed(2)}</span>
              <span className={cn(
                'text-xs font-mono w-14',
                Math.abs(p.zScore) >= 2 ? 'text-red-400' : Math.abs(p.zScore) >= 1.5 ? 'text-yellow-400' : 'text-gray-400'
              )}>
                z={p.zScore >= 0 ? '+' : ''}{p.zScore.toFixed(2)}
              </span>
              <span className="text-[10px] text-gray-500 w-14">{p.halfLife}d HL</span>
              <Badge variant={p.signal !== 'No Signal' ? 'success' : 'default'}>
                {p.signal}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
