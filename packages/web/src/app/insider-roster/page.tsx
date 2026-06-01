'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { UserCheck } from 'lucide-react';

interface InsiderHolding {
  name: string;
  title: string;
  company: string;
  ticker: string;
  shares: string;
  value: string;
  percentOwnership: number;
  lastTransaction: string;
  transactionType: 'Buy' | 'Sell' | 'Exercise';
}

const INSIDERS: InsiderHolding[] = [
  { name: 'Elon Musk', title: 'CEO', company: 'Tesla', ticker: 'TSLA', shares: '411M', value: '$100B', percentOwnership: 13.0, lastTransaction: 'Dec 2024', transactionType: 'Sell' },
  { name: 'Tim Cook', title: 'CEO', company: 'Apple', ticker: 'AAPL', shares: '3.3M', value: '$610M', percentOwnership: 0.02, lastTransaction: 'Nov 2024', transactionType: 'Sell' },
  { name: 'Jamie Dimon', title: 'CEO', company: 'JPMorgan', ticker: 'JPM', shares: '8.5M', value: '$1.6B', percentOwnership: 0.3, lastTransaction: 'Feb 2024', transactionType: 'Sell' },
  { name: 'Mark Zuckerberg', title: 'CEO', company: 'Meta', ticker: 'META', shares: '350M', value: '$165B', percentOwnership: 13.6, lastTransaction: 'Jan 2025', transactionType: 'Sell' },
  { name: 'Jensen Huang', title: 'CEO', company: 'NVIDIA', ticker: 'NVDA', shares: '86M', value: '$11.3B', percentOwnership: 3.5, lastTransaction: 'Dec 2024', transactionType: 'Sell' },
  { name: 'Warren Buffett', title: 'CEO', company: 'Berkshire', ticker: 'BRK.A', shares: '229K', value: '$130B', percentOwnership: 15.2, lastTransaction: 'Nov 2024', transactionType: 'Buy' },
];

const txVariant = (t: string) => t === 'Buy' ? 'success' : t === 'Sell' ? 'danger' : 'info';

export default function InsiderRosterPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Insider Roster</h1>
        <p className="mt-1 text-sm text-gray-500">Insider ownership and recent transactions</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Insiders</p>
          <p className="text-lg font-bold text-white">{INSIDERS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Buyers</p>
          <p className="text-lg font-bold text-green-400">{INSIDERS.filter(i => i.transactionType === 'Buy').length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Sellers</p>
          <p className="text-lg font-bold text-red-400">{INSIDERS.filter(i => i.transactionType === 'Sell').length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><UserCheck className="inline h-4 w-4 mr-1" />Insider Holdings</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {INSIDERS.map((ins) => (
            <div key={ins.name} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{ins.name} <span className="text-gray-500">&middot; {ins.title}</span></p>
                <p className="text-xs text-gray-500">{ins.company} ({ins.ticker}) &middot; {ins.shares} shares &middot; {ins.percentOwnership}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{ins.value}</p>
                  <p className="text-[10px] text-gray-500">{ins.lastTransaction}</p>
                </div>
                <Badge variant={txVariant(ins.transactionType)}>{ins.transactionType}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
