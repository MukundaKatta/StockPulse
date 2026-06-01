'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { ArrowDownLeft } from 'lucide-react';

interface Buyback {
  symbol: string;
  name: string;
  authorized: number;
  remaining: number;
  executed: number;
  pctFloat: number;
  announcedDate: string;
}

const BUYBACKS: Buyback[] = [
  { symbol: 'AAPL', name: 'Apple Inc', authorized: 90e9, remaining: 42e9, executed: 48e9, pctFloat: 3.8, announcedDate: '2023-05-04' },
  { symbol: 'GOOGL', name: 'Alphabet', authorized: 70e9, remaining: 35e9, executed: 35e9, pctFloat: 2.5, announcedDate: '2023-04-25' },
  { symbol: 'META', name: 'Meta Platforms', authorized: 40e9, remaining: 28e9, executed: 12e9, pctFloat: 1.8, announcedDate: '2023-10-25' },
  { symbol: 'MSFT', name: 'Microsoft', authorized: 60e9, remaining: 38e9, executed: 22e9, pctFloat: 1.2, announcedDate: '2021-09-14' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', authorized: 25e9, remaining: 18e9, executed: 7e9, pctFloat: 0.8, announcedDate: '2023-08-21' },
  { symbol: 'JPM', name: 'JP Morgan', authorized: 30e9, remaining: 20e9, executed: 10e9, pctFloat: 2.2, announcedDate: '2023-06-28' },
  { symbol: 'WMT', name: 'Walmart Inc', authorized: 20e9, remaining: 14e9, executed: 6e9, pctFloat: 1.5, announcedDate: '2023-11-08' },
  { symbol: 'V', name: 'Visa Inc', authorized: 25e9, remaining: 16e9, executed: 9e9, pctFloat: 1.9, announcedDate: '2023-10-24' },
];

export default function BuybackTrackerPage() {
  const totalAuth = BUYBACKS.reduce((s, b) => s + b.authorized, 0);
  const totalExec = BUYBACKS.reduce((s, b) => s + b.executed, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Buyback Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Active share repurchase programs</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Authorized</p><p className="text-lg font-bold text-white">{formatLargeNumber(totalAuth)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Executed</p><p className="text-lg font-bold text-green-400">{formatLargeNumber(totalExec)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Programs</p><p className="text-lg font-bold text-indigo-400">{BUYBACKS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowDownLeft className="h-4 w-4 text-indigo-400" /> Active Programs</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BUYBACKS.sort((a, b) => b.authorized - a.authorized).map((b) => {
            const pctDone = (b.executed / b.authorized) * 100;
            return (
              <div key={b.symbol} className="flex items-center gap-3 py-2 px-4">
                <div className="w-20"><p className="text-xs font-bold text-white">{b.symbol}</p><p className="text-[10px] text-gray-500 truncate">{b.name}</p></div>
                <span className="text-xs font-mono text-white w-14">{formatLargeNumber(b.authorized)}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden"><div className="bg-green-500/40 h-full rounded-full" style={{ width: `${pctDone}%` }} /></div>
                <span className="text-[10px] font-mono text-gray-500 w-10">{pctDone.toFixed(0)}%</span>
                <span className="text-xs font-mono text-indigo-400 w-14">{b.pctFloat.toFixed(1)}% flt</span>
                <span className="text-[10px] text-gray-500">{b.announcedDate}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
