'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Scale } from 'lucide-react';

interface Etf {
  ticker: string;
  name: string;
  expense: number;
  aum: string;
  ytdReturn: number;
  yield: number;
  category: string;
}

const ETFS: Etf[] = [
  { ticker: 'SPY', name: 'SPDR S&P 500', expense: 0.09, aum: '$510B', ytdReturn: 12.4, yield: 1.3, category: 'Large Cap' },
  { ticker: 'QQQ', name: 'Invesco Nasdaq 100', expense: 0.20, aum: '$250B', ytdReturn: 18.2, yield: 0.5, category: 'Tech' },
  { ticker: 'VTI', name: 'Vanguard Total Market', expense: 0.03, aum: '$380B', ytdReturn: 11.8, yield: 1.4, category: 'Total Market' },
  { ticker: 'IWM', name: 'iShares Russell 2000', expense: 0.19, aum: '$60B', ytdReturn: 4.2, yield: 1.2, category: 'Small Cap' },
  { ticker: 'VEA', name: 'Vanguard Intl Dev', expense: 0.05, aum: '$110B', ytdReturn: 8.1, yield: 3.1, category: 'International' },
  { ticker: 'AGG', name: 'iShares Core Bond', expense: 0.03, aum: '$100B', ytdReturn: 1.8, yield: 4.5, category: 'Bonds' },
];

export default function EtfComparisonPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">ETF Comparison</h1>
        <p className="mt-1 text-sm text-gray-500">Compare ETFs across categories</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">ETFs</p>
          <p className="text-lg font-bold text-white">{ETFS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Best YTD</p>
          <p className="text-lg font-bold text-green-400">+{Math.max(...ETFS.map(e => e.ytdReturn))}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Lowest Expense</p>
          <p className="text-lg font-bold text-indigo-400">{Math.min(...ETFS.map(e => e.expense))}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Scale className="inline h-4 w-4 mr-1" />ETF Comparison</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {ETFS.map((e) => (
            <div key={e.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{e.ticker} <span className="text-gray-500">{e.name}</span></p>
                <p className="text-xs text-gray-500">AUM {e.aum} &middot; ER {e.expense}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', e.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {e.ytdReturn > 0 ? '+' : ''}{e.ytdReturn}%
                  </p>
                  <p className="text-[10px] text-gray-500">Yield {e.yield}%</p>
                </div>
                <Badge variant="info">{e.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
