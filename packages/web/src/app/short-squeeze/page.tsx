'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Zap } from 'lucide-react';

interface ShortSqueezeCandidate {
  ticker: string;
  company: string;
  shortInterest: number;
  daysToCover: number;
  floatShorted: number;
  price: number;
  change5d: number;
  ctbRate: number;
}

const CANDIDATES: ShortSqueezeCandidate[] = [
  { ticker: 'GME', company: 'GameStop', shortInterest: 21.5, daysToCover: 2.8, floatShorted: 24.2, price: 15.80, change5d: 12.5, ctbRate: 8.2 },
  { ticker: 'AMC', company: 'AMC Entmt', shortInterest: 18.2, daysToCover: 1.9, floatShorted: 22.1, price: 5.20, change5d: -3.4, ctbRate: 12.5 },
  { ticker: 'CVNA', company: 'Carvana', shortInterest: 15.8, daysToCover: 3.2, floatShorted: 18.5, price: 195.00, change5d: 8.7, ctbRate: 5.1 },
  { ticker: 'UPST', company: 'Upstart', shortInterest: 32.1, daysToCover: 4.5, floatShorted: 35.2, price: 42.30, change5d: 15.2, ctbRate: 18.4 },
  { ticker: 'BYND', company: 'Beyond Meat', shortInterest: 38.5, daysToCover: 6.1, floatShorted: 42.0, price: 8.50, change5d: -5.8, ctbRate: 22.1 },
  { ticker: 'FFIE', company: 'Faraday Future', shortInterest: 45.2, daysToCover: 1.2, floatShorted: 48.0, price: 0.85, change5d: 28.4, ctbRate: 95.0 },
];

export default function ShortSqueezePage() {
  const avgSI = CANDIDATES.reduce((s, c) => s + c.floatShorted, 0) / CANDIDATES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Short Squeeze</h1>
        <p className="mt-1 text-sm text-gray-500">Potential short squeeze candidates</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Candidates</p>
          <p className="text-lg font-bold text-white">{CANDIDATES.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg SI %</p>
          <p className="text-lg font-bold text-amber-400">{avgSI.toFixed(1)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Highest SI</p>
          <p className="text-lg font-bold text-red-400">{Math.max(...CANDIDATES.map(c => c.floatShorted))}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Zap className="inline h-4 w-4 mr-1" />Squeeze Candidates</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {CANDIDATES.map((c) => (
            <div key={c.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{c.ticker} <span className="text-gray-500">{c.company}</span></p>
                <p className="text-xs text-gray-500">SI {c.shortInterest}% &middot; DTC {c.daysToCover} &middot; CTB {c.ctbRate}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">${c.price}</p>
                  <p className={cn('text-[10px] font-mono', c.change5d >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {c.change5d > 0 ? '+' : ''}{c.change5d}% 5d
                  </p>
                </div>
                <Badge variant={c.floatShorted > 30 ? 'danger' : c.floatShorted > 20 ? 'warning' : 'info'}>{c.floatShorted}%</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
