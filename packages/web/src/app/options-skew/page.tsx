'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { GitBranch } from 'lucide-react';

interface SkewData {
  ticker: string;
  expiry: string;
  put25d: number;
  atm: number;
  call25d: number;
  skew: number;
  skewChange: number;
}

const SKEW_DATA: SkewData[] = [
  { ticker: 'SPY', expiry: '30d', put25d: 18.2, atm: 14.5, call25d: 12.8, skew: 5.4, skewChange: 0.8 },
  { ticker: 'SPY', expiry: '60d', put25d: 19.5, atm: 15.8, call25d: 13.5, skew: 6.0, skewChange: 0.3 },
  { ticker: 'QQQ', expiry: '30d', put25d: 20.1, atm: 16.2, call25d: 14.0, skew: 6.1, skewChange: 1.2 },
  { ticker: 'AAPL', expiry: '30d', put25d: 22.5, atm: 18.0, call25d: 15.2, skew: 7.3, skewChange: -0.5 },
  { ticker: 'NVDA', expiry: '30d', put25d: 35.8, atm: 28.5, call25d: 25.0, skew: 10.8, skewChange: 2.1 },
  { ticker: 'TSLA', expiry: '30d', put25d: 42.0, atm: 38.2, call25d: 35.5, skew: 6.5, skewChange: -1.8 },
];

export default function OptionsSkewPage() {
  const avgSkew = SKEW_DATA.reduce((s, d) => s + d.skew, 0) / SKEW_DATA.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Options Skew</h1>
        <p className="mt-1 text-sm text-gray-500">Volatility skew analysis across strikes</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Surfaces</p>
          <p className="text-lg font-bold text-white">{SKEW_DATA.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Skew</p>
          <p className="text-lg font-bold text-indigo-400">{avgSkew.toFixed(1)} pts</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Steepest</p>
          <p className="text-lg font-bold text-amber-400">{Math.max(...SKEW_DATA.map(d => d.skew)).toFixed(1)} pts</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><GitBranch className="inline h-4 w-4 mr-1" />Volatility Skew</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {SKEW_DATA.map((d, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{d.ticker} <span className="text-gray-500">{d.expiry}</span></p>
                <p className="text-xs text-gray-500">25dP {d.put25d}% &middot; ATM {d.atm}% &middot; 25dC {d.call25d}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{d.skew} pts</p>
                  <p className={cn('text-[10px] font-mono', d.skewChange >= 0 ? 'text-red-400' : 'text-green-400')}>
                    {d.skewChange > 0 ? '+' : ''}{d.skewChange}
                  </p>
                </div>
                <Badge variant={d.skew > 8 ? 'danger' : d.skew > 5 ? 'warning' : 'success'}>{d.skew > 8 ? 'Steep' : d.skew > 5 ? 'Normal' : 'Flat'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
