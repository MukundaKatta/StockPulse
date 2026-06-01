'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { RefreshCw } from 'lucide-react';

interface BuybackProgram {
  company: string;
  ticker: string;
  authorized: string;
  remaining: string;
  percentBought: number;
  announcedDate: string;
  yieldPercent: number;
}

const BUYBACKS: BuybackProgram[] = [
  { company: 'Apple Inc', ticker: 'AAPL', authorized: '$110B', remaining: '$42B', percentBought: 62, announcedDate: 'May 2024', yieldPercent: 3.8 },
  { company: 'Alphabet', ticker: 'GOOGL', authorized: '$70B', remaining: '$55B', percentBought: 21, announcedDate: 'Apr 2024', yieldPercent: 3.5 },
  { company: 'Meta Platforms', ticker: 'META', authorized: '$50B', remaining: '$35B', percentBought: 30, announcedDate: 'Feb 2024', yieldPercent: 4.1 },
  { company: 'Microsoft', ticker: 'MSFT', authorized: '$60B', remaining: '$48B', percentBought: 20, announcedDate: 'Sep 2024', yieldPercent: 2.2 },
  { company: 'Chevron', ticker: 'CVX', authorized: '$75B', remaining: '$30B', percentBought: 60, announcedDate: 'Jan 2023', yieldPercent: 5.1 },
  { company: 'Bank of America', ticker: 'BAC', authorized: '$25B', remaining: '$18B', percentBought: 28, announcedDate: 'Jul 2024', yieldPercent: 3.0 },
];

export default function StockBuybacksPage() {
  const totalAuth = 110 + 70 + 50 + 60 + 75 + 25;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Buybacks</h1>
        <p className="mt-1 text-sm text-gray-500">Active stock buyback programs</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Programs</p>
          <p className="text-lg font-bold text-white">{BUYBACKS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Authorized</p>
          <p className="text-lg font-bold text-indigo-400">${totalAuth}B</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Highest Yield</p>
          <p className="text-lg font-bold text-green-400">{Math.max(...BUYBACKS.map(b => b.yieldPercent))}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><RefreshCw className="inline h-4 w-4 mr-1" />Active Buyback Programs</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {BUYBACKS.map((b) => (
            <div key={b.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{b.company} <span className="text-gray-500">{b.ticker}</span></p>
                <p className="text-xs text-gray-500">Auth {b.authorized} &middot; Rem {b.remaining} &middot; {b.announcedDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{b.percentBought}% done</p>
                  <p className="text-[10px] text-green-400">Yield {b.yieldPercent}%</p>
                </div>
                <Badge variant={b.percentBought > 50 ? 'warning' : 'success'}>{b.percentBought > 50 ? 'Maturing' : 'Active'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
