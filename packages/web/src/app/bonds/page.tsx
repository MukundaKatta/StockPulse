'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkline } from '@/components/ui/sparkline';
import { formatPercent, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Landmark } from 'lucide-react';

interface TreasuryYield {
  maturity: string;
  yield: number;
  change: number;
  sparkline: number[];
}

function genSparkline(val: number, change: number): number[] {
  const pts: number[] = [];
  const start = val - change;
  for (let i = 0; i <= 20; i++) {
    pts.push(start + change * (i / 20) + (Math.random() - 0.5) * 0.01);
  }
  return pts;
}

const YIELDS: TreasuryYield[] = [
  { maturity: '1 Month', yield: 5.32, change: -0.02 },
  { maturity: '3 Month', yield: 5.28, change: -0.01 },
  { maturity: '6 Month', yield: 5.18, change: 0.01 },
  { maturity: '1 Year', yield: 4.98, change: 0.03 },
  { maturity: '2 Year', yield: 4.72, change: 0.05 },
  { maturity: '5 Year', yield: 4.34, change: 0.04 },
  { maturity: '10 Year', yield: 4.42, change: 0.06 },
  { maturity: '20 Year', yield: 4.68, change: 0.05 },
  { maturity: '30 Year', yield: 4.56, change: 0.04 },
].map((y) => ({ ...y, sparkline: genSparkline(y.yield, y.change) }));

export default function BondsPage() {
  const spread2s10s = YIELDS.find((y) => y.maturity === '10 Year')!.yield - YIELDS.find((y) => y.maturity === '2 Year')!.yield;
  const isInverted = spread2s10s < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bond Market</h1>
        <p className="mt-1 text-sm text-gray-500">US Treasury yields and yield curve</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">10Y Yield</p>
          <p className="text-lg font-bold font-mono text-white">{YIELDS.find((y) => y.maturity === '10 Year')!.yield.toFixed(2)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">2Y Yield</p>
          <p className="text-lg font-bold font-mono text-white">{YIELDS.find((y) => y.maturity === '2 Year')!.yield.toFixed(2)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">2s10s Spread</p>
          <p className={cn('text-lg font-bold font-mono', isInverted ? 'text-red-400' : 'text-green-400')}>
            {spread2s10s >= 0 ? '+' : ''}{(spread2s10s * 100).toFixed(0)}bp
          </p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Curve Status</p>
          <Badge variant={isInverted ? 'danger' : 'success'} className="mt-1">
            {isInverted ? 'Inverted' : 'Normal'}
          </Badge>
        </Card>
      </div>

      {/* Yield Curve */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-indigo-400" />
            Yield Curve
          </CardTitle>
        </CardHeader>
        <div className="h-48 flex items-end gap-1 px-2">
          {YIELDS.map((y) => {
            const height = ((y.yield - 3.5) / 2.5) * 100;
            return (
              <div key={y.maturity} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-gray-400">{y.yield.toFixed(2)}%</span>
                <div
                  className="w-full rounded-t bg-indigo-500/60 hover:bg-indigo-500/80 transition-colors min-h-[4px]"
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
                <span className="text-[9px] text-gray-600 truncate w-full text-center">{y.maturity.replace(' Year', 'Y').replace(' Month', 'M')}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Yields table */}
      <Card>
        <CardHeader>
          <CardTitle>Treasury Yields</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {YIELDS.map((y) => (
            <div key={y.maturity} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
              <span className="text-sm text-gray-300">{y.maturity}</span>
              <div className="flex items-center gap-4">
                <Sparkline data={y.sparkline} width={50} height={16} className="hidden sm:block" />
                <span className="font-mono text-sm font-bold text-white w-14 text-right">{y.yield.toFixed(2)}%</span>
                <span className={cn('font-mono text-xs w-16 text-right', y.change >= 0 ? 'text-red-400' : 'text-green-400')}>
                  {y.change >= 0 ? '+' : ''}{(y.change * 100).toFixed(0)}bp
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
