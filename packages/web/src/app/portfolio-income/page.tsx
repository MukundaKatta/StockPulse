'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Wallet } from 'lucide-react';

interface IncomeSource {
  symbol: string;
  name: string;
  type: 'Dividend' | 'Interest' | 'Distribution';
  shares: number;
  annualPerShare: number;
  frequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';
  nextPayDate: string;
  yield: number;
}

const INCOME: IncomeSource[] = [
  { symbol: 'SCHD', name: 'Schwab US Div', type: 'Dividend', shares: 200, annualPerShare: 2.68, frequency: 'Quarterly', nextPayDate: '2024-03-25', yield: 3.42 },
  { symbol: 'O', name: 'Realty Income', type: 'Distribution', shares: 150, annualPerShare: 3.07, frequency: 'Monthly', nextPayDate: '2024-02-15', yield: 5.65 },
  { symbol: 'VZ', name: 'Verizon', type: 'Dividend', shares: 300, annualPerShare: 2.66, frequency: 'Quarterly', nextPayDate: '2024-02-01', yield: 6.62 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'Dividend', shares: 50, annualPerShare: 4.76, frequency: 'Quarterly', nextPayDate: '2024-03-12', yield: 3.02 },
  { symbol: 'BND', name: 'Vanguard Bond', type: 'Interest', shares: 400, annualPerShare: 2.15, frequency: 'Monthly', nextPayDate: '2024-02-07', yield: 2.97 },
  { symbol: 'T', name: 'AT&T Inc', type: 'Dividend', shares: 500, annualPerShare: 1.11, frequency: 'Quarterly', nextPayDate: '2024-02-01', yield: 6.49 },
  { symbol: 'PG', name: 'Procter & Gamble', type: 'Dividend', shares: 80, annualPerShare: 3.76, frequency: 'Quarterly', nextPayDate: '2024-02-15', yield: 2.31 },
  { symbol: 'XOM', name: 'Exxon Mobil', type: 'Dividend', shares: 120, annualPerShare: 3.80, frequency: 'Quarterly', nextPayDate: '2024-03-11', yield: 3.62 },
];

export default function PortfolioIncomePage() {
  const totalAnnual = INCOME.reduce((s, i) => s + i.shares * i.annualPerShare, 0);
  const totalMonthly = totalAnnual / 12;
  const sources = new Set(INCOME.map((i) => i.type)).size;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Income</h1>
        <p className="mt-1 text-sm text-gray-500">Dividend and interest income from holdings</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Annual Income</p>
          <p className="text-lg font-bold text-green-400">{formatCurrency(totalAnnual)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Monthly Avg</p>
          <p className="text-lg font-bold text-indigo-400">{formatCurrency(totalMonthly)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Positions</p>
          <p className="text-lg font-bold text-white">{INCOME.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Income Types</p>
          <p className="text-lg font-bold text-white">{sources}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Wallet className="h-4 w-4 text-green-400" /> Income Sources
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {INCOME.sort((a, b) => (b.shares * b.annualPerShare) - (a.shares * a.annualPerShare)).map((i) => {
            const annual = i.shares * i.annualPerShare;
            return (
              <div key={i.symbol} className="flex items-center gap-3 py-2 px-4">
                <div className="w-20">
                  <p className="text-xs font-bold text-white">{i.symbol}</p>
                  <p className="text-[10px] text-gray-500 truncate">{i.name}</p>
                </div>
                <Badge variant={i.type === 'Dividend' ? 'success' : i.type === 'Interest' ? 'info' : 'warning'}>
                  {i.type}
                </Badge>
                <span className="text-xs font-mono text-gray-400 w-14">{i.shares} sh</span>
                <span className="text-xs font-mono text-green-400 w-16">{formatCurrency(annual)}/yr</span>
                <span className="text-xs font-mono text-indigo-400 w-12">{i.yield.toFixed(1)}%</span>
                <span className="text-[10px] text-gray-500 w-16">{i.frequency}</span>
                <span className="text-[10px] text-gray-500 ml-auto">{i.nextPayDate}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
