'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { LineChart } from 'lucide-react';

interface TermStructurePoint {
  ticker: string;
  expiry: string;
  days: number;
  iv: number;
  hv: number;
  spread: number;
}

const TERM_DATA: TermStructurePoint[] = [
  { ticker: 'SPY', expiry: '7d', days: 7, iv: 12.5, hv: 11.2, spread: 1.3 },
  { ticker: 'SPY', expiry: '14d', days: 14, iv: 13.8, hv: 11.2, spread: 2.6 },
  { ticker: 'SPY', expiry: '30d', days: 30, iv: 14.5, hv: 11.2, spread: 3.3 },
  { ticker: 'SPY', expiry: '60d', days: 60, iv: 15.8, hv: 11.2, spread: 4.6 },
  { ticker: 'SPY', expiry: '90d', days: 90, iv: 16.2, hv: 11.2, spread: 5.0 },
  { ticker: 'SPY', expiry: '180d', days: 180, iv: 17.0, hv: 11.2, spread: 5.8 },
  { ticker: 'SPY', expiry: '365d', days: 365, iv: 17.8, hv: 11.2, spread: 6.6 },
];

export default function TermStructurePage() {
  const isContango = TERM_DATA[0].iv < TERM_DATA[TERM_DATA.length - 1].iv;
  const frontBack = TERM_DATA[TERM_DATA.length - 1].iv - TERM_DATA[0].iv;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Term Structure</h1>
        <p className="mt-1 text-sm text-gray-500">Volatility term structure across expirations</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Structure</p>
          <p className={cn('text-lg font-bold', isContango ? 'text-green-400' : 'text-red-400')}>
            {isContango ? 'Contango' : 'Backwardation'}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Front IV</p>
          <p className="text-lg font-bold text-white">{TERM_DATA[0].iv}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Front-Back Spread</p>
          <p className="text-lg font-bold text-indigo-400">{frontBack.toFixed(1)} pts</p>
        </Card>
      </div>

      {/* Term Structure Visualization */}
      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-3">IV Term Structure (SPY)</p>
        <div className="flex items-end gap-2 h-32">
          {TERM_DATA.map((pt) => {
            const height = ((pt.iv - 10) / 10) * 100;
            return (
              <div key={pt.expiry} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-500 font-mono">{pt.iv}%</span>
                <div className="w-full rounded-t bg-indigo-500/60" style={{ height: `${Math.max(height, 5)}%` }} />
                <span className="text-[8px] text-gray-600">{pt.expiry}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><LineChart className="inline h-4 w-4 mr-1" />Term Structure Detail</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {TERM_DATA.map((pt) => (
            <div key={pt.expiry} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{pt.expiry} <span className="text-gray-500">({pt.days}d)</span></p>
                <p className="text-xs text-gray-500">HV {pt.hv}% &middot; Spread {pt.spread.toFixed(1)} pts</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-mono text-white">{pt.iv}% IV</p>
                <Badge variant={pt.spread > 4 ? 'danger' : pt.spread > 2 ? 'warning' : 'success'}>
                  {pt.spread > 4 ? 'Rich' : pt.spread > 2 ? 'Fair' : 'Cheap'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
