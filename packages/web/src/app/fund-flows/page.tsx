'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatLargeNumber, cn } from '@/lib/formatters';
import { ArrowUpRight, ArrowDownRight, Banknote } from 'lucide-react';

interface FundFlow {
  name: string;
  ticker: string;
  category: string;
  weeklyFlow: number;
  monthlyFlow: number;
  aum: number;
  streak: number;
}

const FLOWS: FundFlow[] = [
  { name: 'SPDR S&P 500 ETF', ticker: 'SPY', category: 'US Equity', weeklyFlow: 8500000000, monthlyFlow: 28000000000, aum: 520000000000, streak: 5 },
  { name: 'Invesco QQQ', ticker: 'QQQ', category: 'US Equity', weeklyFlow: 4200000000, monthlyFlow: 12000000000, aum: 250000000000, streak: 3 },
  { name: 'iShares Core Bond', ticker: 'AGG', category: 'Fixed Income', weeklyFlow: -2100000000, monthlyFlow: -5800000000, aum: 95000000000, streak: -4 },
  { name: 'Vanguard Total Stock', ticker: 'VTI', category: 'US Equity', weeklyFlow: 3200000000, monthlyFlow: 9500000000, aum: 380000000000, streak: 8 },
  { name: 'iShares MSCI EM', ticker: 'EEM', category: 'International', weeklyFlow: -1500000000, monthlyFlow: -4200000000, aum: 28000000000, streak: -6 },
  { name: 'ARK Innovation', ticker: 'ARKK', category: 'Thematic', weeklyFlow: -850000000, monthlyFlow: -2100000000, aum: 8500000000, streak: -12 },
  { name: 'GLD Gold Trust', ticker: 'GLD', category: 'Commodities', weeklyFlow: 1800000000, monthlyFlow: 5200000000, aum: 62000000000, streak: 4 },
  { name: 'Vanguard S&P 500', ticker: 'VOO', category: 'US Equity', weeklyFlow: 5500000000, monthlyFlow: 18000000000, aum: 420000000000, streak: 10 },
  { name: 'iShares Russell 2000', ticker: 'IWM', category: 'US Equity', weeklyFlow: -900000000, monthlyFlow: -2800000000, aum: 62000000000, streak: -3 },
  { name: 'Vanguard Int\'l', ticker: 'VXUS', category: 'International', weeklyFlow: 1200000000, monthlyFlow: 4500000000, aum: 85000000000, streak: 2 },
];

export default function FundFlowsPage() {
  const [filter, setFilter] = useState<'all' | 'inflows' | 'outflows'>('all');
  const [sortBy, setSortBy] = useState<'weeklyFlow' | 'monthlyFlow' | 'aum'>('weeklyFlow');

  const filtered = FLOWS
    .filter((f) => filter === 'all' || (filter === 'inflows' ? f.weeklyFlow > 0 : f.weeklyFlow < 0))
    .sort((a, b) => sortBy === 'aum' ? b.aum - a.aum : Math.abs(b[sortBy]) - Math.abs(a[sortBy]));

  const totalInflows = FLOWS.filter((f) => f.weeklyFlow > 0).reduce((s, f) => s + f.weeklyFlow, 0);
  const totalOutflows = FLOWS.filter((f) => f.weeklyFlow < 0).reduce((s, f) => s + f.weeklyFlow, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Fund Flows</h1>
        <p className="mt-1 text-sm text-gray-500">ETF capital flows and investor positioning</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Net Inflows</p>
          <p className="text-sm font-bold text-green-400">+{formatLargeNumber(totalInflows)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Net Outflows</p>
          <p className="text-sm font-bold text-red-400">{formatLargeNumber(totalOutflows)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Net</p>
          <p className={cn('text-sm font-bold', totalInflows + totalOutflows >= 0 ? 'text-green-400' : 'text-red-400')}>
            {formatLargeNumber(totalInflows + totalOutflows)}
          </p>
        </Card>
      </div>

      <div className="flex gap-2">
        {(['all', 'inflows', 'outflows'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', filter === f ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{f}</button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Fund</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">1W Flow</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">1M Flow</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">AUM</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Streak</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fund) => (
                <tr key={fund.ticker} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-indigo-400">{fund.ticker}</span>
                      <span className="text-xs text-gray-300">{fund.name}</span>
                    </div>
                    <p className="text-[10px] text-gray-600">{fund.category}</p>
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', fund.weeklyFlow >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {fund.weeklyFlow >= 0 ? '+' : ''}{formatLargeNumber(fund.weeklyFlow)}
                  </td>
                  <td className={cn('px-3 py-2.5 text-right font-mono text-xs', fund.monthlyFlow >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {fund.monthlyFlow >= 0 ? '+' : ''}{formatLargeNumber(fund.monthlyFlow)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-400">{formatLargeNumber(fund.aum)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={fund.streak > 0 ? 'success' : 'danger'}>
                      {fund.streak > 0 ? '+' : ''}{fund.streak}w
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
