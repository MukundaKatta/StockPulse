'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Landmark } from 'lucide-react';

interface TreasuryRate {
  maturity: string;
  rate: number;
  priorDay: number;
  priorWeek: number;
  priorMonth: number;
}

const RATES: TreasuryRate[] = [
  { maturity: '1 Month', rate: 5.52, priorDay: 5.53, priorWeek: 5.50, priorMonth: 5.48 },
  { maturity: '3 Month', rate: 5.48, priorDay: 5.47, priorWeek: 5.45, priorMonth: 5.42 },
  { maturity: '6 Month', rate: 5.36, priorDay: 5.35, priorWeek: 5.33, priorMonth: 5.28 },
  { maturity: '1 Year', rate: 5.05, priorDay: 5.04, priorWeek: 5.00, priorMonth: 4.92 },
  { maturity: '2 Year', rate: 4.48, priorDay: 4.46, priorWeek: 4.42, priorMonth: 4.35 },
  { maturity: '5 Year', rate: 4.12, priorDay: 4.10, priorWeek: 4.08, priorMonth: 3.98 },
  { maturity: '10 Year', rate: 4.18, priorDay: 4.16, priorWeek: 4.14, priorMonth: 4.05 },
  { maturity: '20 Year', rate: 4.48, priorDay: 4.46, priorWeek: 4.44, priorMonth: 4.38 },
  { maturity: '30 Year', rate: 4.38, priorDay: 4.36, priorWeek: 4.34, priorMonth: 4.28 },
];

export default function TreasuryRatesPage() {
  const twoYear = RATES.find((r) => r.maturity === '2 Year')!;
  const tenYear = RATES.find((r) => r.maturity === '10 Year')!;
  const spread = tenYear.rate - twoYear.rate;
  const inverted = spread < 0;
  const maxRate = Math.max(...RATES.map((r) => r.rate));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Treasury Rates</h1>
        <p className="mt-1 text-sm text-gray-500">U.S. Treasury yield curve data</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">2Y Yield</p>
          <p className="text-lg font-bold text-white">{twoYear.rate.toFixed(2)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">10Y Yield</p>
          <p className="text-lg font-bold text-white">{tenYear.rate.toFixed(2)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">2s10s Spread</p>
          <p className={cn('text-lg font-bold', inverted ? 'text-red-400' : 'text-green-400')}>
            {spread >= 0 ? '+' : ''}{(spread * 100).toFixed(0)} bps
          </p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Curve</p>
          <Badge variant={inverted ? 'danger' : 'success'}>{inverted ? 'Inverted' : 'Normal'}</Badge>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Landmark className="h-4 w-4 text-indigo-400" /> Yield Curve
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {RATES.map((r) => {
            const dayChg = r.rate - r.priorDay;
            return (
              <div key={r.maturity} className="flex items-center gap-3 py-2 px-4">
                <span className="text-xs font-bold text-white w-16">{r.maturity}</span>
                <span className="text-xs font-mono text-indigo-400 w-14">{r.rate.toFixed(2)}%</span>
                <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                  <div className="bg-indigo-500/40 h-full rounded-full" style={{ width: `${(r.rate / maxRate) * 100}%` }} />
                </div>
                <span className={cn('text-[10px] font-mono w-14', dayChg >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {dayChg >= 0 ? '+' : ''}{(dayChg * 100).toFixed(1)} bps
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
