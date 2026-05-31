'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, cn } from '@/lib/formatters';
import { Clock, TrendingUp } from 'lucide-react';

interface PortfolioSnapshot {
  date: string;
  value: number;
  change: number;
  changePct: number;
}

function generateHistory(): PortfolioSnapshot[] {
  const snapshots: PortfolioSnapshot[] = [];
  let value = 85000;
  const days = 90;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dailyChange = (Math.random() - 0.48) * 2000;
    value = Math.max(value + dailyChange, 50000);
    const prevValue = i === days ? value : snapshots[snapshots.length - 1]?.value || value;
    const change = value - prevValue;
    const changePct = prevValue > 0 ? (change / prevValue) * 100 : 0;
    snapshots.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value,
      change,
      changePct,
    });
  }
  return snapshots;
}

export default function PortfolioHistoryPage() {
  const history = useMemo(() => generateHistory(), []);
  const current = history[history.length - 1];
  const first = history[0];
  const totalReturn = current.value - first.value;
  const totalReturnPct = (totalReturn / first.value) * 100;

  const best = history.reduce((best, s) => s.changePct > best.changePct ? s : best, history[0]);
  const worst = history.reduce((worst, s) => s.changePct < worst.changePct ? s : worst, history[0]);
  const peak = history.reduce((peak, s) => s.value > peak.value ? s : peak, history[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio History</h1>
        <p className="mt-1 text-sm text-gray-500">90-day portfolio value timeline</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Current Value</p>
          <p className="text-sm font-bold text-white">{formatCurrency(current.value)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">90D Return</p>
          <p className={cn('text-sm font-bold font-mono', totalReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalReturn >= 0 ? '+' : ''}{formatCurrency(totalReturn)} ({totalReturnPct >= 0 ? '+' : ''}{totalReturnPct.toFixed(1)}%)
          </p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Best Day</p>
          <p className="text-sm font-bold text-green-400">+{best.changePct.toFixed(2)}%</p>
          <p className="text-[10px] text-gray-600">{best.date}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Peak</p>
          <p className="text-sm font-bold text-indigo-400">{formatCurrency(peak.value)}</p>
          <p className="text-[10px] text-gray-600">{peak.date}</p>
        </Card>
      </div>

      {/* Simplified chart using bars */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            Daily Changes (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <div className="flex items-end gap-0.5 h-32">
          {history.slice(-30).map((day, i) => {
            const maxChange = Math.max(...history.slice(-30).map((d) => Math.abs(d.changePct)));
            const height = maxChange > 0 ? (Math.abs(day.changePct) / maxChange) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full" title={`${day.date}: ${day.changePct >= 0 ? '+' : ''}${day.changePct.toFixed(2)}%`}>
                <div
                  className={cn('w-full rounded-t', day.changePct >= 0 ? 'bg-green-500/60' : 'bg-red-500/60')}
                  style={{ height: `${height}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-gray-600">
          <span>{history[history.length - 30]?.date}</span>
          <span>Today</span>
        </div>
      </Card>

      {/* Recent days */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-400" />
            Recent Days
          </CardTitle>
        </CardHeader>
        <div className="space-y-1">
          {history.slice(-7).reverse().map((day, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/[0.02]">
              <span className="text-xs text-gray-400 w-20">{day.date}</span>
              <span className="text-xs font-mono text-white">{formatCurrency(day.value)}</span>
              <span className={cn('text-xs font-mono w-20 text-right', day.changePct >= 0 ? 'text-green-400' : 'text-red-400')}>
                {day.changePct >= 0 ? '+' : ''}{day.changePct.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
