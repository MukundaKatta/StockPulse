'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BondYield {
  maturity: string;
  yield: number;
  change: number;
  weekAgo: number;
  monthAgo: number;
}

const YIELDS: BondYield[] = [
  { maturity: '1 Month', yield: 5.53, change: 0.01, weekAgo: 5.52, monthAgo: 5.50 },
  { maturity: '3 Month', yield: 5.40, change: -0.02, weekAgo: 5.42, monthAgo: 5.38 },
  { maturity: '6 Month', yield: 5.27, change: -0.01, weekAgo: 5.30, monthAgo: 5.25 },
  { maturity: '1 Year', yield: 4.89, change: -0.03, weekAgo: 4.95, monthAgo: 5.01 },
  { maturity: '2 Year', yield: 4.38, change: -0.05, weekAgo: 4.45, monthAgo: 4.60 },
  { maturity: '5 Year', yield: 4.05, change: -0.04, weekAgo: 4.12, monthAgo: 4.28 },
  { maturity: '7 Year', yield: 4.09, change: -0.03, weekAgo: 4.15, monthAgo: 4.30 },
  { maturity: '10 Year', yield: 4.12, change: -0.02, weekAgo: 4.18, monthAgo: 4.33 },
  { maturity: '20 Year', yield: 4.42, change: -0.01, weekAgo: 4.46, monthAgo: 4.55 },
  { maturity: '30 Year', yield: 4.32, change: 0.00, weekAgo: 4.35, monthAgo: 4.48 },
];

export default function BondYieldsPage() {
  const spread2s10s = YIELDS.find((y) => y.maturity === '10 Year')!.yield - YIELDS.find((y) => y.maturity === '2 Year')!.yield;
  const isInverted = spread2s10s < 0;

  const maxYield = Math.max(...YIELDS.map((y) => y.yield));
  const minYield = Math.min(...YIELDS.map((y) => y.yield));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bond Yields</h1>
        <p className="mt-1 text-sm text-gray-500">US Treasury yield curve and spreads</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">10Y Yield</p>
          <p className="text-lg font-bold text-white">4.12%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">2s10s Spread</p>
          <p className={cn('text-lg font-bold', isInverted ? 'text-red-400' : 'text-green-400')}>
            {spread2s10s > 0 ? '+' : ''}{(spread2s10s * 100).toFixed(0)} bps
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Curve Status</p>
          <p className={cn('text-lg font-bold', isInverted ? 'text-red-400' : 'text-green-400')}>
            {isInverted ? 'Inverted' : 'Normal'}
          </p>
        </Card>
      </div>

      {/* Yield Curve Visualization */}
      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-3">Yield Curve</p>
        <div className="flex items-end gap-1 h-32">
          {YIELDS.map((bond) => {
            const height = ((bond.yield - minYield) / (maxYield - minYield)) * 100;
            return (
              <div key={bond.maturity} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-500 font-mono">{bond.yield.toFixed(2)}</span>
                <div
                  className="w-full rounded-t bg-indigo-500/60"
                  style={{ height: `${Math.max(height, 5)}%` }}
                />
                <span className="text-[8px] text-gray-600 truncate w-full text-center">{bond.maturity.replace(' Month', 'M').replace(' Year', 'Y')}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Treasury Yields Detail</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-white/5">
                <th className="text-left py-2 px-2 font-medium">Maturity</th>
                <th className="text-right py-2 px-2 font-medium">Yield</th>
                <th className="text-right py-2 px-2 font-medium">Change</th>
                <th className="text-right py-2 px-2 font-medium">1W Ago</th>
                <th className="text-right py-2 px-2 font-medium">1M Ago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {YIELDS.map((bond) => (
                <tr key={bond.maturity} className="hover:bg-white/[0.02]">
                  <td className="py-2 px-2 text-gray-300">{bond.maturity}</td>
                  <td className="py-2 px-2 text-right font-mono text-white">{bond.yield.toFixed(2)}%</td>
                  <td className={cn('py-2 px-2 text-right font-mono', bond.change > 0 ? 'text-red-400' : bond.change < 0 ? 'text-green-400' : 'text-gray-500')}>
                    {bond.change > 0 ? '+' : ''}{bond.change.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-gray-500">{bond.weekAgo.toFixed(2)}%</td>
                  <td className="py-2 px-2 text-right font-mono text-gray-500">{bond.monthAgo.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
