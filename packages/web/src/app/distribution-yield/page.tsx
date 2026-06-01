'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Wallet } from 'lucide-react';

interface DistributionFund {
  ticker: string;
  name: string;
  price: number;
  distRate: number;
  navYield: number;
  frequency: 'Monthly' | 'Quarterly' | 'Annual';
  lastDist: number;
  category: 'Equity' | 'Fixed Income' | 'Hybrid' | 'REIT';
}

const FUNDS: DistributionFund[] = [
  { ticker: 'JEPI', name: 'JPMorgan Equity Premium', price: 56.80, distRate: 7.4, navYield: 7.2, frequency: 'Monthly', lastDist: 0.35, category: 'Equity' },
  { ticker: 'SCHD', name: 'Schwab US Dividend', price: 78.40, distRate: 3.5, navYield: 3.4, frequency: 'Quarterly', lastDist: 0.68, category: 'Equity' },
  { ticker: 'O', name: 'Realty Income', price: 54.20, distRate: 5.8, navYield: 5.6, frequency: 'Monthly', lastDist: 0.26, category: 'REIT' },
  { ticker: 'PDI', name: 'PIMCO Dynamic Income', price: 18.90, distRate: 13.2, navYield: 11.8, frequency: 'Monthly', lastDist: 0.21, category: 'Fixed Income' },
  { ticker: 'QYLD', name: 'Global X NASDAQ Covered Call', price: 17.50, distRate: 11.8, navYield: 11.5, frequency: 'Monthly', lastDist: 0.17, category: 'Equity' },
  { ticker: 'GOF', name: 'Guggenheim Strategic Opp', price: 15.80, distRate: 14.5, navYield: 12.1, frequency: 'Monthly', lastDist: 0.19, category: 'Hybrid' },
  { ticker: 'VGIT', name: 'Vanguard Int-Term Treasury', price: 58.90, distRate: 3.2, navYield: 3.3, frequency: 'Monthly', lastDist: 0.16, category: 'Fixed Income' },
];

const catVariant = (c: string) => c === 'Equity' ? 'info' : c === 'Fixed Income' ? 'success' : c === 'REIT' ? 'warning' : 'default';

export default function DistributionYieldPage() {
  const avgDistRate = FUNDS.reduce((s, f) => s + f.distRate, 0) / FUNDS.length;
  const monthlyPayers = FUNDS.filter(f => f.frequency === 'Monthly').length;
  const highYield = FUNDS.filter(f => f.distRate >= 7).length;
  const totalFunds = FUNDS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Distribution Yield</h1>
        <p className="mt-1 text-sm text-gray-500">Fund distribution rates and yield tracking</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Funds</p><p className="text-lg font-bold text-white">{totalFunds}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Dist Rate</p><p className="text-lg font-bold text-green-400">{avgDistRate.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Monthly Payers</p><p className="text-lg font-bold text-indigo-400">{monthlyPayers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Yield</p><p className="text-lg font-bold text-amber-400">{highYield}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Wallet className="h-4 w-4 text-indigo-400" /> Distribution Tracker</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {FUNDS.map((f) => (
            <div key={f.ticker} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{f.ticker} <span className="text-gray-500">{f.name}</span></p>
                <p className="text-xs text-gray-500">{f.frequency} &middot; Last {formatCurrency(f.lastDist)}/share</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{f.distRate}%</p>
                  <p className="text-[10px] text-gray-500">{formatCurrency(f.price)}</p>
                </div>
                <Badge variant={catVariant(f.category)}>{f.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
