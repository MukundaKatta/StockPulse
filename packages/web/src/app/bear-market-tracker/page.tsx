'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { TrendingDown } from 'lucide-react';

interface BearMarket {
  name: string;
  startDate: string;
  endDate: string;
  peakToTrough: number;
  durationMonths: number;
  recoveryMonths: number;
  triggerEvent: string;
  status: 'Recovered' | 'Extended' | 'Historic';
}

const BEAR_MARKETS: BearMarket[] = [
  { name: 'COVID Crash', startDate: 'Feb 2020', endDate: 'Mar 2020', peakToTrough: -33.9, durationMonths: 1, recoveryMonths: 5, triggerEvent: 'Pandemic', status: 'Recovered' },
  { name: 'Trade War Dip', startDate: 'Sep 2018', endDate: 'Dec 2018', peakToTrough: -19.8, durationMonths: 3, recoveryMonths: 4, triggerEvent: 'Trade Tensions', status: 'Recovered' },
  { name: 'Financial Crisis', startDate: 'Oct 2007', endDate: 'Mar 2009', peakToTrough: -56.8, durationMonths: 17, recoveryMonths: 49, triggerEvent: 'Housing Bubble', status: 'Historic' },
  { name: 'Dot-Com Bust', startDate: 'Mar 2000', endDate: 'Oct 2002', peakToTrough: -49.1, durationMonths: 31, recoveryMonths: 56, triggerEvent: 'Tech Bubble', status: 'Historic' },
  { name: '2022 Bear Market', startDate: 'Jan 2022', endDate: 'Oct 2022', peakToTrough: -25.4, durationMonths: 10, recoveryMonths: 14, triggerEvent: 'Inflation/Rates', status: 'Recovered' },
  { name: 'Black Monday', startDate: 'Aug 1987', endDate: 'Dec 1987', peakToTrough: -33.5, durationMonths: 4, recoveryMonths: 20, triggerEvent: 'Market Panic', status: 'Historic' },
];

const statusVariant = (s: string) => s === 'Recovered' ? 'success' : s === 'Historic' ? 'default' : 'danger';

export default function BearMarketTrackerPage() {
  const avgDrop = BEAR_MARKETS.reduce((s, b) => s + b.peakToTrough, 0) / BEAR_MARKETS.length;
  const avgDuration = BEAR_MARKETS.reduce((s, b) => s + b.durationMonths, 0) / BEAR_MARKETS.length;
  const avgRecovery = BEAR_MARKETS.reduce((s, b) => s + b.recoveryMonths, 0) / BEAR_MARKETS.length;
  const worstDrop = Math.min(...BEAR_MARKETS.map(b => b.peakToTrough));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bear Market Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Bear market history and recovery analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Drop</p><p className="text-lg font-bold text-red-400">{avgDrop.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Worst Drop</p><p className="text-lg font-bold text-red-400">{worstDrop.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Duration</p><p className="text-lg font-bold text-yellow-400">{avgDuration.toFixed(0)}mo</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Recovery</p><p className="text-lg font-bold text-indigo-400">{avgRecovery.toFixed(0)}mo</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingDown className="h-4 w-4 text-red-400" /> Bear Market History</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BEAR_MARKETS.map((b) => (
            <div key={b.name} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{b.name}</p>
                <p className="text-xs text-gray-500">{b.startDate} - {b.endDate} &middot; {b.triggerEvent}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-red-400">{b.peakToTrough}%</p>
                  <p className="text-[10px] text-gray-500">{b.durationMonths}mo down &middot; {b.recoveryMonths}mo recovery</p>
                </div>
                <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
