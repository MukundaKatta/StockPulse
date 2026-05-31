'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

interface ReturnPeriod {
  period: string;
  return_pct: number;
  spReturn: number;
  alpha: number;
}

const RETURNS: ReturnPeriod[] = [
  { period: '1 Day', return_pct: 0.82, spReturn: 0.65, alpha: 0.17 },
  { period: '1 Week', return_pct: 2.45, spReturn: 1.80, alpha: 0.65 },
  { period: '1 Month', return_pct: 5.12, spReturn: 3.85, alpha: 1.27 },
  { period: '3 Months', return_pct: 12.80, spReturn: 8.50, alpha: 4.30 },
  { period: '6 Months', return_pct: 18.50, spReturn: 14.20, alpha: 4.30 },
  { period: 'YTD', return_pct: 8.25, spReturn: 5.40, alpha: 2.85 },
  { period: '1 Year', return_pct: 28.60, spReturn: 22.40, alpha: 6.20 },
  { period: '3 Years', return_pct: 42.50, spReturn: 32.80, alpha: 9.70 },
  { period: '5 Years', return_pct: 85.40, spReturn: 68.20, alpha: 17.20 },
];

export default function InvestmentReturnsPage() {
  const portfolioValue = 248500;
  const costBasis = 185200;
  const totalReturn = ((portfolioValue - costBasis) / costBasis) * 100;
  const totalGain = portfolioValue - costBasis;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Investment Returns</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio performance vs S&P 500 benchmark</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Portfolio Value</p>
          <p className="text-lg font-bold text-white">{formatCurrency(portfolioValue)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total Gain</p>
          <p className="text-lg font-bold text-green-400">{formatCurrency(totalGain)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total Return</p>
          <p className="text-lg font-bold text-green-400">+{totalReturn.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Cost Basis</p>
          <p className="text-lg font-bold text-gray-400">{formatCurrency(costBasis)}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Calculator className="h-4 w-4 text-indigo-400" /> Period Returns
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {RETURNS.map((r) => (
            <div key={r.period} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs text-gray-400 w-16">{r.period}</span>
              <span className={cn('text-xs font-mono w-16', r.return_pct >= 0 ? 'text-green-400' : 'text-red-400')}>
                {r.return_pct >= 0 ? '+' : ''}{r.return_pct.toFixed(2)}%
              </span>
              <span className="text-xs font-mono text-gray-400 w-16">
                S&P: {r.spReturn >= 0 ? '+' : ''}{r.spReturn.toFixed(2)}%
              </span>
              <span className={cn('text-xs font-mono w-16', r.alpha >= 0 ? 'text-indigo-400' : 'text-red-400')}>
                a: {r.alpha >= 0 ? '+' : ''}{r.alpha.toFixed(2)}%
              </span>
              <div className="flex-1 flex items-center gap-1">
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="bg-green-500/40 h-full rounded-full" style={{ width: `${Math.min(r.return_pct, 100)}%` }} />
                </div>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="bg-gray-500/30 h-full rounded-full" style={{ width: `${Math.min(r.spReturn, 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
