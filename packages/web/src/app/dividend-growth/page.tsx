'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface DivGrowth {
  symbol: string;
  name: string;
  yield: number;
  annualDiv: number;
  growth1y: number;
  growth3y: number;
  growth5y: number;
  growth10y: number;
  streakYears: number;
  payoutRatio: number;
}

const STOCKS: DivGrowth[] = [
  { symbol: 'JNJ', name: 'Johnson & Johnson', yield: 3.04, annualDiv: 4.76, growth1y: 5.3, growth3y: 5.8, growth5y: 6.1, growth10y: 6.4, streakYears: 61, payoutRatio: 44 },
  { symbol: 'PG', name: 'Procter & Gamble', yield: 2.45, annualDiv: 3.76, growth1y: 3.0, growth3y: 5.2, growth5y: 5.8, growth10y: 4.8, streakYears: 67, payoutRatio: 62 },
  { symbol: 'KO', name: 'Coca-Cola', yield: 3.12, annualDiv: 1.84, growth1y: 5.4, growth3y: 3.8, growth5y: 3.4, growth10y: 4.2, streakYears: 61, payoutRatio: 72 },
  { symbol: 'MSFT', name: 'Microsoft', yield: 0.74, annualDiv: 3.00, growth1y: 10.3, growth3y: 10.8, growth5y: 10.2, growth10y: 11.5, streakYears: 21, payoutRatio: 25 },
  { symbol: 'AAPL', name: 'Apple', yield: 0.52, annualDiv: 0.96, growth1y: 4.3, growth3y: 5.2, growth5y: 6.8, growth10y: 8.4, streakYears: 12, payoutRatio: 15 },
  { symbol: 'ABBV', name: 'AbbVie', yield: 3.82, annualDiv: 6.20, growth1y: 4.8, growth3y: 8.2, growth5y: 10.4, growth10y: 14.2, streakYears: 51, payoutRatio: 48 },
  { symbol: 'HD', name: 'Home Depot', yield: 2.38, annualDiv: 8.36, growth1y: 7.7, growth3y: 12.5, growth5y: 14.8, growth10y: 18.2, streakYears: 14, payoutRatio: 52 },
  { symbol: 'LOW', name: "Lowe's", yield: 1.92, annualDiv: 4.40, growth1y: 4.5, growth3y: 18.2, growth5y: 20.5, growth10y: 18.8, streakYears: 60, payoutRatio: 35 },
];

export default function DividendGrowthPage() {
  const avgGrowth5y = STOCKS.reduce((s, st) => s + st.growth5y, 0) / STOCKS.length;
  const avgYield = STOCKS.reduce((s, st) => s + st.yield, 0) / STOCKS.length;
  const maxStreak = Math.max(...STOCKS.map((s) => s.streakYears));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dividend Growth</h1>
        <p className="mt-1 text-sm text-gray-500">Dividend growth rates and streak analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg 5Y Growth</p><p className="text-lg font-bold text-green-400">{avgGrowth5y.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-indigo-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Longest Streak</p><p className="text-lg font-bold text-amber-400">{maxStreak} yrs</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-indigo-400" /> Growth Rates</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.growth5y - a.growth5y).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  {s.streakYears >= 50 && <Badge variant="success">King</Badge>}
                  {s.streakYears >= 25 && s.streakYears < 50 && <Badge variant="info">Aristocrat</Badge>}
                </div>
                <span className="text-xs font-mono text-indigo-400">{s.yield.toFixed(2)}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '1Y', val: s.growth1y },
                  { label: '3Y', val: s.growth3y },
                  { label: '5Y', val: s.growth5y },
                  { label: '10Y', val: s.growth10y },
                ].map((g) => (
                  <div key={g.label} className="text-center">
                    <p className="text-[9px] text-gray-500">{g.label}</p>
                    <p className={cn('text-[10px] font-mono', g.val >= 10 ? 'text-green-400' : g.val >= 5 ? 'text-yellow-400' : 'text-gray-300')}>{g.val.toFixed(1)}%</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 text-[10px] text-gray-400">
                <span>Streak: <span className="text-white font-mono">{s.streakYears}y</span></span>
                <span>Payout: <span className={cn('font-mono', s.payoutRatio > 60 ? 'text-amber-400' : 'text-green-400')}>{s.payoutRatio}%</span></span>
                <span>Annual: <span className="text-white font-mono">${s.annualDiv.toFixed(2)}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
