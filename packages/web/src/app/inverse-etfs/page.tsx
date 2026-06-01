'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { ArrowDownUp } from 'lucide-react';

interface InverseETF {
  ticker: string;
  name: string;
  underlying: string;
  leverage: string;
  price: number;
  dayChange: number;
  ytdReturn: number;
  aum: string;
  expenseRatio: number;
  status: 'Active' | 'Decaying' | 'Caution';
}

const ETFS: InverseETF[] = [
  { ticker: 'SH', name: 'Short S&P 500', underlying: 'S&P 500', leverage: '-1x', price: 12.85, dayChange: -0.8, ytdReturn: -12.4, aum: '$1.8B', expenseRatio: 0.89, status: 'Active' },
  { ticker: 'SDS', name: 'UltraShort S&P 500', underlying: 'S&P 500', leverage: '-2x', price: 34.20, dayChange: -1.6, ytdReturn: -28.5, aum: '$0.9B', expenseRatio: 0.90, status: 'Decaying' },
  { ticker: 'SQQQ', name: 'UltraPro Short QQQ', underlying: 'Nasdaq 100', leverage: '-3x', price: 8.42, dayChange: -2.4, ytdReturn: -52.1, aum: '$3.2B', expenseRatio: 0.95, status: 'Caution' },
  { ticker: 'PSQ', name: 'Short QQQ', underlying: 'Nasdaq 100', leverage: '-1x', price: 9.85, dayChange: -0.9, ytdReturn: -15.8, aum: '$1.1B', expenseRatio: 0.95, status: 'Active' },
  { ticker: 'DOG', name: 'Short Dow 30', underlying: 'Dow Jones', leverage: '-1x', price: 28.50, dayChange: -0.5, ytdReturn: -8.2, aum: '$0.4B', expenseRatio: 0.95, status: 'Active' },
  { ticker: 'TBF', name: 'Short 20+ Year Treasury', underlying: '20Y Treasury', leverage: '-1x', price: 22.10, dayChange: 0.3, ytdReturn: 4.5, aum: '$0.5B', expenseRatio: 0.90, status: 'Active' },
  { ticker: 'SPXU', name: 'UltraPro Short S&P', underlying: 'S&P 500', leverage: '-3x', price: 7.85, dayChange: -2.5, ytdReturn: -48.2, aum: '$1.4B', expenseRatio: 0.90, status: 'Caution' },
];

const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'Decaying' ? 'warning' : 'danger';

export default function InverseETFsPage() {
  const avgReturn = ETFS.reduce((s, e) => s + e.ytdReturn, 0) / ETFS.length;
  const cautionCount = ETFS.filter(e => e.status === 'Caution').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Inverse ETFs</h1>
        <p className="mt-1 text-sm text-gray-500">Inverse and short ETF tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">ETFs</p><p className="text-lg font-bold text-white">{ETFS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg YTD</p><p className="text-lg font-bold text-red-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Active</p><p className="text-lg font-bold text-green-400">{ETFS.filter(e => e.status === 'Active').length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Caution</p><p className="text-lg font-bold text-yellow-400">{cautionCount}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowDownUp className="h-4 w-4 text-indigo-400" /> Inverse ETF Tracker</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ETFS.map((e) => (
            <div key={e.ticker} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{e.ticker}</p>
                <p className="text-[10px] text-gray-500 truncate">{e.name}</p>
              </div>
              <span className="text-[10px] text-gray-400 w-12">{e.leverage}</span>
              <span className="text-xs font-mono text-white w-14">{formatCurrency(e.price)}</span>
              <span className={cn('text-xs font-mono w-12', e.dayChange >= 0 ? 'text-green-400' : 'text-red-400')}>{e.dayChange >= 0 ? '+' : ''}{e.dayChange}%</span>
              <span className={cn('text-xs font-mono w-14', e.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{e.ytdReturn}% YTD</span>
              <span className="text-[10px] text-gray-500 w-10">{e.aum}</span>
              <Badge variant={statusVariant(e.status)} className="ml-auto">{e.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
