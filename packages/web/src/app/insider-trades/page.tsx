'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { UserCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface InsiderTrade {
  date: string;
  insider: string;
  title: string;
  symbol: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  value: number;
}

const TRADES: InsiderTrade[] = [
  { date: '2024-01-12', insider: 'Jensen Huang', title: 'CEO', symbol: 'NVDA', type: 'sell', shares: 29000, price: 547.1, value: 15865900 },
  { date: '2024-01-11', insider: 'Mark Zuckerberg', title: 'CEO', symbol: 'META', type: 'sell', shares: 18500, price: 370.45, value: 6853325 },
  { date: '2024-01-10', insider: 'Jamie Dimon', title: 'CEO', symbol: 'JPM', type: 'sell', shares: 33000, price: 172.3, value: 5685900 },
  { date: '2024-01-10', insider: 'Satya Nadella', title: 'CEO', symbol: 'MSFT', type: 'sell', shares: 10000, price: 388.47, value: 3884700 },
  { date: '2024-01-09', insider: 'Lisa Su', title: 'CEO', symbol: 'AMD', type: 'sell', shares: 20000, price: 141.25, value: 2825000 },
  { date: '2024-01-08', insider: 'Peter Kern', title: 'VP', symbol: 'EXPE', type: 'buy', shares: 50000, price: 152.3, value: 7615000 },
  { date: '2024-01-08', insider: 'John Stankey', title: 'CEO', symbol: 'T', type: 'buy', shares: 100000, price: 17.12, value: 1712000 },
  { date: '2024-01-07', insider: 'Warren Buffett', title: 'CEO', symbol: 'BRK.B', type: 'buy', shares: 5000, price: 362.15, value: 1810750 },
  { date: '2024-01-05', insider: 'Tim Cook', title: 'CEO', symbol: 'AAPL', type: 'sell', shares: 8000, price: 185.56, value: 1484480 },
  { date: '2024-01-04', insider: 'David Solomon', title: 'CEO', symbol: 'GS', type: 'buy', shares: 3000, price: 384.22, value: 1152660 },
];

export default function InsiderTradesPage() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'buy' | 'sell'>('all');

  const filtered = typeFilter === 'all' ? TRADES : TRADES.filter((t) => t.type === typeFilter);
  const totalBuys = TRADES.filter((t) => t.type === 'buy').reduce((s, t) => s + t.value, 0);
  const totalSells = TRADES.filter((t) => t.type === 'sell').reduce((s, t) => s + t.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Insider Trades</h1>
          <p className="mt-1 text-sm text-gray-500">SEC Form 4 filings from company executives</p>
        </div>
        <div className="flex gap-1">
          {(['all', 'buy', 'sell'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs capitalize transition-colors',
                typeFilter === t ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
              )}
            >
              {t === 'all' ? 'All' : t === 'buy' ? 'Buys' : 'Sells'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Buying</p>
          <p className="text-lg font-bold text-green-400">{formatCurrency(totalBuys)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Selling</p>
          <p className="text-lg font-bold text-red-400">{formatCurrency(totalSells)}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-indigo-400" /> Recent Filings
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {filtered.map((trade, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 px-2">
              <div className={cn('rounded-full p-1.5', trade.type === 'buy' ? 'bg-green-500/10' : 'bg-red-500/10')}>
                {trade.type === 'buy' ? <ArrowUpRight className="h-3.5 w-3.5 text-green-400" /> : <ArrowDownRight className="h-3.5 w-3.5 text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{trade.insider}</span>
                  <Badge variant={trade.type === 'buy' ? 'success' : 'danger'} className="text-[10px]">{trade.type.toUpperCase()}</Badge>
                </div>
                <p className="text-[11px] text-gray-500">{trade.title} · {trade.symbol} · {trade.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-white">{formatCurrency(trade.value)}</p>
                <p className="text-[10px] text-gray-500">{trade.shares.toLocaleString()} shares @ ${trade.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
