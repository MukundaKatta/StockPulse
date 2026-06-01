'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface IndexFund {
  symbol: string;
  name: string;
  index: string;
  expenseRatio: number;
  aum: number;
  return1Y: number;
  return5Y: number;
  return10Y: number;
  minInvestment: number;
}

const FUNDS: IndexFund[] = [
  { symbol: 'VFIAX', name: 'Vanguard 500 Index', index: 'S&P 500', expenseRatio: 0.04, aum: 452e9, return1Y: 22.4, return5Y: 14.8, return10Y: 12.2, minInvestment: 3000 },
  { symbol: 'FXAIX', name: 'Fidelity 500 Index', index: 'S&P 500', expenseRatio: 0.015, aum: 420e9, return1Y: 22.5, return5Y: 14.9, return10Y: 12.3, minInvestment: 0 },
  { symbol: 'VTSAX', name: 'Vanguard Total Market', index: 'CRSP Total', expenseRatio: 0.04, aum: 380e9, return1Y: 21.8, return5Y: 14.2, return10Y: 11.8, minInvestment: 3000 },
  { symbol: 'VBTLX', name: 'Vanguard Total Bond', index: 'Bloomberg Agg', expenseRatio: 0.05, aum: 104e9, return1Y: 1.2, return5Y: 0.8, return10Y: 1.5, minInvestment: 3000 },
  { symbol: 'VTIAX', name: 'Vanguard Intl Index', index: 'FTSE AllWorld ex-US', expenseRatio: 0.11, aum: 68e9, return1Y: 8.5, return5Y: 6.2, return10Y: 4.8, minInvestment: 3000 },
  { symbol: 'VIGAX', name: 'Vanguard Growth', index: 'CRSP Growth', expenseRatio: 0.05, aum: 125e9, return1Y: 38.2, return5Y: 18.5, return10Y: 15.2, minInvestment: 3000 },
  { symbol: 'VVIAX', name: 'Vanguard Value', index: 'CRSP Value', expenseRatio: 0.05, aum: 82e9, return1Y: 8.5, return5Y: 10.2, return10Y: 9.8, minInvestment: 3000 },
  { symbol: 'VSMAX', name: 'Vanguard Small Cap', index: 'CRSP Small Cap', expenseRatio: 0.05, aum: 55e9, return1Y: -2.1, return5Y: 8.5, return10Y: 8.2, minInvestment: 3000 },
];

export default function IndexFundsPage() {
  const avgER = FUNDS.reduce((s, f) => s + f.expenseRatio, 0) / FUNDS.length;
  const totalAUM = FUNDS.reduce((s, f) => s + f.aum, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Index Funds</h1>
        <p className="mt-1 text-sm text-gray-500">Low-cost passive index fund comparison</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Expense</p><p className="text-lg font-bold text-green-400">{avgER.toFixed(3)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total AUM</p><p className="text-lg font-bold text-white">{formatLargeNumber(totalAUM)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Funds</p><p className="text-lg font-bold text-indigo-400">{FUNDS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Fund Comparison</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {FUNDS.map((f) => (
            <div key={f.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-28"><p className="text-xs font-bold text-white">{f.symbol}</p><p className="text-[10px] text-gray-500 truncate">{f.name}</p></div>
              <span className="text-[10px] text-gray-500 w-20 truncate">{f.index}</span>
              <span className="text-xs font-mono text-green-400 w-12">{f.expenseRatio.toFixed(3)}%</span>
              <span className={cn('text-xs font-mono w-12', f.return1Y >= 0 ? 'text-green-400' : 'text-red-400')}>{f.return1Y >= 0 ? '+' : ''}{f.return1Y.toFixed(1)}%</span>
              <span className={cn('text-xs font-mono w-12', f.return5Y >= 0 ? 'text-green-400' : 'text-red-400')}>{f.return5Y >= 0 ? '+' : ''}{f.return5Y.toFixed(1)}%</span>
              <span className="text-[10px] text-gray-500 w-14">{formatLargeNumber(f.aum)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
