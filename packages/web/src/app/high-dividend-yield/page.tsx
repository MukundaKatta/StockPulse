'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Percent } from 'lucide-react';

interface HighYieldStock {
  symbol: string;
  name: string;
  price: number;
  yield: number;
  annualDiv: number;
  payoutRatio: number;
  exDivDate: string;
  sector: string;
  streakYears: number;
}

const STOCKS: HighYieldStock[] = [
  { symbol: 'MO', name: 'Altria Group', price: 42.80, yield: 9.35, annualDiv: 4.00, payoutRatio: 78, exDivDate: '2024-03-14', sector: 'Consumer Staples', streakYears: 54 },
  { symbol: 'VZ', name: 'Verizon Comm', price: 40.25, yield: 6.57, annualDiv: 2.66, payoutRatio: 57, exDivDate: '2024-04-09', sector: 'Communication', streakYears: 19 },
  { symbol: 'T', name: 'AT&T Inc', price: 17.20, yield: 6.51, annualDiv: 1.11, payoutRatio: 48, exDivDate: '2024-04-08', sector: 'Communication', streakYears: 2 },
  { symbol: 'WBA', name: 'Walgreens Boots', price: 20.50, yield: 5.85, annualDiv: 1.20, payoutRatio: 85, exDivDate: '2024-02-20', sector: 'Healthcare', streakYears: 47 },
  { symbol: 'BMY', name: 'Bristol-Myers', price: 50.30, yield: 5.05, annualDiv: 2.40, payoutRatio: 62, exDivDate: '2024-03-29', sector: 'Healthcare', streakYears: 17 },
  { symbol: 'PM', name: 'Philip Morris', price: 92.40, yield: 5.63, annualDiv: 5.20, payoutRatio: 82, exDivDate: '2024-03-21', sector: 'Consumer Staples', streakYears: 16 },
  { symbol: 'IBM', name: 'IBM Corp', price: 188.50, yield: 3.52, annualDiv: 6.64, payoutRatio: 68, exDivDate: '2024-02-08', sector: 'Technology', streakYears: 28 },
  { symbol: 'DOW', name: 'Dow Inc', price: 55.80, yield: 5.02, annualDiv: 2.80, payoutRatio: 92, exDivDate: '2024-02-28', sector: 'Materials', streakYears: 5 },
];

export default function HighDividendYieldPage() {
  const avgYield = STOCKS.reduce((s, st) => s + st.yield, 0) / STOCKS.length;
  const avgPayout = STOCKS.reduce((s, st) => s + st.payoutRatio, 0) / STOCKS.length;
  const maxYield = Math.max(...STOCKS.map((s) => s.yield));
  const avgStreak = STOCKS.reduce((s, st) => s + st.streakYears, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">High Dividend Yield</h1>
        <p className="mt-1 text-sm text-gray-500">High dividend yield stock screener</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Max Yield</p><p className="text-lg font-bold text-amber-400">{maxYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Payout</p><p className={cn('text-lg font-bold', avgPayout > 70 ? 'text-amber-400' : 'text-green-400')}>{avgPayout.toFixed(0)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Streak</p><p className="text-lg font-bold text-indigo-400">{avgStreak.toFixed(0)} yrs</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Percent className="h-4 w-4 text-indigo-400" /> Yield Screener</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.yield - a.yield).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2.5 px-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.payoutRatio > 80 ? 'danger' : s.payoutRatio > 60 ? 'warning' : 'success'}>
                    {s.payoutRatio}% payout
                  </Badge>
                </div>
                <p className="text-[10px] text-gray-500">{s.sector} - Ex-Div: {s.exDivDate}</p>
              </div>
              <span className="text-xs font-mono text-gray-400">{formatCurrency(s.price)}</span>
              <span className="text-sm font-mono font-bold text-green-400 w-16 text-right">{s.yield.toFixed(2)}%</span>
              <span className="text-xs font-mono text-indigo-400 w-14 text-right">{s.streakYears}y</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
