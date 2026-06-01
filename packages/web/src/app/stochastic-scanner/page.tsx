'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Gauge } from 'lucide-react';

interface StochStock {
  symbol: string;
  name: string;
  price: number;
  kLine: number;
  dLine: number;
  signal: 'Overbought' | 'Oversold' | 'Bullish Cross' | 'Bearish Cross' | 'Neutral';
}

const STOCKS: StochStock[] = [
  { symbol: 'SMCI', name: 'Super Micro', price: 1012.50, kLine: 92.5, dLine: 88.4, signal: 'Overbought' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, kLine: 85.2, dLine: 80.1, signal: 'Overbought' },
  { symbol: 'AMD', name: 'Advanced Micro', price: 177.52, kLine: 72.8, dLine: 68.5, signal: 'Bullish Cross' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, kLine: 65.4, dLine: 62.1, signal: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 186.05, kLine: 48.2, dLine: 52.5, signal: 'Bearish Cross' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, kLine: 55.8, dLine: 54.2, signal: 'Neutral' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, kLine: 38.5, dLine: 42.8, signal: 'Bearish Cross' },
  { symbol: 'BA', name: 'Boeing Co', price: 204.15, kLine: 15.2, dLine: 18.8, signal: 'Oversold' },
  { symbol: 'PFE', name: 'Pfizer Inc', price: 26.45, kLine: 12.8, dLine: 15.5, signal: 'Oversold' },
  { symbol: 'INTC', name: 'Intel Corp', price: 42.18, kLine: 22.4, dLine: 25.8, signal: 'Oversold' },
];

function sigVariant(s: string): 'danger' | 'success' | 'info' | 'warning' | 'default' {
  if (s === 'Overbought') return 'danger';
  if (s === 'Oversold') return 'success';
  if (s === 'Bullish Cross') return 'info';
  if (s === 'Bearish Cross') return 'warning';
  return 'default';
}

export default function StochasticScannerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stochastic Scanner</h1>
        <p className="mt-1 text-sm text-gray-500">Stochastic Oscillator (14,3,3) signals</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gauge className="h-4 w-4 text-indigo-400" /> Stochastic Readings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.kLine - a.kLine).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20"><p className="text-xs font-bold text-white">{s.symbol}</p><p className="text-[10px] text-gray-500 truncate">{s.name}</p></div>
              <div className="flex-1 relative h-4 rounded bg-white/5">
                <div className="absolute top-0 left-[20%] h-full w-px bg-green-500/20" />
                <div className="absolute top-0 left-[80%] h-full w-px bg-red-500/20" />
                <div className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-indigo-400" style={{ left: `${s.kLine}%` }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-yellow-400" style={{ left: `${s.dLine}%` }} />
              </div>
              <span className="text-xs font-mono text-indigo-400 w-10">%K {s.kLine.toFixed(0)}</span>
              <span className="text-xs font-mono text-yellow-400 w-10">%D {s.dLine.toFixed(0)}</span>
              <Badge variant={sigVariant(s.signal)}>{s.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
