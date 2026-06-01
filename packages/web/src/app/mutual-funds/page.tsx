'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { PieChart } from 'lucide-react';

interface MutualFund {
  name: string;
  ticker: string;
  expense: number;
  ytdReturn: number;
  aum: string;
  rating: number;
  category: string;
}

const FUNDS: MutualFund[] = [
  { name: 'Vanguard 500 Index', ticker: 'VFIAX', expense: 0.04, ytdReturn: 12.3, aum: '$820B', rating: 5, category: 'Large Blend' },
  { name: 'Fidelity Contrafund', ticker: 'FCNTX', expense: 0.39, ytdReturn: 15.1, aum: '$130B', rating: 4, category: 'Large Growth' },
  { name: 'T. Rowe Price Growth', ticker: 'PRGFX', expense: 0.52, ytdReturn: 14.8, aum: '$65B', rating: 4, category: 'Large Growth' },
  { name: 'Dodge & Cox Stock', ticker: 'DODGX', expense: 0.51, ytdReturn: 8.2, aum: '$80B', rating: 4, category: 'Large Value' },
  { name: 'Vanguard Total Bond', ticker: 'VBTLX', expense: 0.05, ytdReturn: 1.9, aum: '$310B', rating: 4, category: 'Bonds' },
  { name: 'American Funds Growth', ticker: 'AGTHX', expense: 0.62, ytdReturn: 16.5, aum: '$240B', rating: 5, category: 'Large Growth' },
];

export default function MutualFundsPage() {
  const avgExpense = FUNDS.reduce((s, f) => s + f.expense, 0) / FUNDS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Mutual Funds</h1>
        <p className="mt-1 text-sm text-gray-500">Compare top mutual funds</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Funds</p>
          <p className="text-lg font-bold text-white">{FUNDS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Expense</p>
          <p className="text-lg font-bold text-amber-400">{avgExpense.toFixed(2)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Best YTD</p>
          <p className="text-lg font-bold text-green-400">+{Math.max(...FUNDS.map(f => f.ytdReturn))}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><PieChart className="inline h-4 w-4 mr-1" />Fund Comparison</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {FUNDS.map((f) => (
            <div key={f.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{f.name}</p>
                <p className="text-xs text-gray-500">{f.ticker} &middot; ER {f.expense}% &middot; {'★'.repeat(f.rating)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', f.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {f.ytdReturn > 0 ? '+' : ''}{f.ytdReturn}%
                  </p>
                  <p className="text-[10px] text-gray-500">AUM {f.aum}</p>
                </div>
                <Badge variant="info">{f.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
