'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { TrendingDown } from 'lucide-react';

interface DilutionData {
  year: string;
  sharesOutstanding: number;
  change: number;
  sbc: number;
  buyback: number;
  netDilution: number;
}

const DATA: DilutionData[] = [
  { year: '2019', sharesOutstanding: 17.528e9, change: -5.8, sbc: 6.1e9, buyback: 67.1e9, netDilution: -5.8 },
  { year: '2020', sharesOutstanding: 16.976e9, change: -3.1, sbc: 6.8e9, buyback: 72.5e9, netDilution: -3.1 },
  { year: '2021', sharesOutstanding: 16.426e9, change: -3.2, sbc: 7.9e9, buyback: 85.5e9, netDilution: -3.2 },
  { year: '2022', sharesOutstanding: 15.943e9, change: -2.9, sbc: 9.0e9, buyback: 89.4e9, netDilution: -2.9 },
  { year: '2023', sharesOutstanding: 15.461e9, change: -3.0, sbc: 10.8e9, buyback: 77.6e9, netDilution: -3.0 },
];

export default function ShareDilutionPage() {
  const firstShares = DATA[0].sharesOutstanding;
  const lastShares = DATA[DATA.length - 1].sharesOutstanding;
  const totalReduction = ((lastShares - firstShares) / firstShares) * 100;
  const totalBuyback = DATA.reduce((s, d) => s + d.buyback, 0);
  const totalSBC = DATA.reduce((s, d) => s + d.sbc, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Share Dilution</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL share count changes over time</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Current Shares</p><p className="text-lg font-bold text-white">{formatLargeNumber(lastShares)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">5Y Change</p><p className="text-lg font-bold text-green-400">{totalReduction.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Buybacks</p><p className="text-lg font-bold text-indigo-400">{formatLargeNumber(totalBuyback)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total SBC</p><p className="text-lg font-bold text-yellow-400">{formatLargeNumber(totalSBC)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingDown className="h-4 w-4 text-green-400" /> Annual Share Count</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.map((d) => (
            <div key={d.year} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-bold text-white w-10">{d.year}</span>
              <span className="text-xs font-mono text-white w-16">{formatLargeNumber(d.sharesOutstanding)}</span>
              <span className={cn('text-xs font-mono w-12', d.change < 0 ? 'text-green-400' : 'text-red-400')}>
                {d.change > 0 ? '+' : ''}{d.change.toFixed(1)}%
              </span>
              <span className="text-xs font-mono text-yellow-400 w-14">SBC {formatLargeNumber(d.sbc)}</span>
              <span className="text-xs font-mono text-indigo-400 w-14">BB {formatLargeNumber(d.buyback)}</span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="bg-green-500/40 h-full rounded-full" style={{ width: `${(d.sharesOutstanding / firstShares) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
