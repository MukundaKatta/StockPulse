'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { DollarSign, Repeat, TrendingUp } from 'lucide-react';

interface IncomeStream {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annual';
  category: 'dividend' | 'interest' | 'rental' | 'salary' | 'side';
  active: boolean;
}

const STREAMS: IncomeStream[] = [
  { id: '1', name: 'Software Engineer Salary', amount: 12500, frequency: 'monthly', category: 'salary', active: true },
  { id: '2', name: 'VTI Dividends', amount: 850, frequency: 'quarterly', category: 'dividend', active: true },
  { id: '3', name: 'SCHD Dividends', amount: 620, frequency: 'quarterly', category: 'dividend', active: true },
  { id: '4', name: 'Rental Property #1', amount: 2200, frequency: 'monthly', category: 'rental', active: true },
  { id: '5', name: 'High-Yield Savings', amount: 180, frequency: 'monthly', category: 'interest', active: true },
  { id: '6', name: 'Bond ETF Interest', amount: 320, frequency: 'monthly', category: 'interest', active: true },
  { id: '7', name: 'Freelance Consulting', amount: 3000, frequency: 'monthly', category: 'side', active: true },
  { id: '8', name: 'AAPL Dividends', amount: 96, frequency: 'quarterly', category: 'dividend', active: true },
];

const freqMultiplier = { monthly: 12, quarterly: 4, annual: 1 };
const categoryColors = { dividend: 'text-green-400', interest: 'text-blue-400', rental: 'text-yellow-400', salary: 'text-indigo-400', side: 'text-purple-400' };

export default function IncomeTrackerPage() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? STREAMS : STREAMS.filter((s) => s.category === filter);
  const annualTotal = STREAMS.reduce((s, i) => s + i.amount * freqMultiplier[i.frequency], 0);
  const monthlyTotal = annualTotal / 12;
  const passiveAnnual = STREAMS.filter((s) => s.category !== 'salary' && s.category !== 'side').reduce((s, i) => s + i.amount * freqMultiplier[i.frequency], 0);

  const byCategory = Object.entries(
    STREAMS.reduce<Record<string, number>>((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + s.amount * freqMultiplier[s.frequency];
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Income Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">All income streams in one view</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Annual Income</p><p className="text-lg font-bold text-green-400">{formatCurrency(annualTotal)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Monthly Average</p><p className="text-lg font-bold text-white">{formatCurrency(monthlyTotal)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Passive Income</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(passiveAnnual)}</p><p className="text-[10px] text-gray-500">{((passiveAnnual / annualTotal) * 100).toFixed(0)}% of total</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">By Category</CardTitle></CardHeader>
        <div className="space-y-2 px-2 pb-2">
          {byCategory.map(([cat, amount]) => (
            <div key={cat} className="flex items-center gap-2">
              <span className={cn('text-xs capitalize w-20', categoryColors[cat as keyof typeof categoryColors])}>{cat}</span>
              <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-indigo-500/50 rounded-full" style={{ width: `${(amount / annualTotal) * 100}%` }} />
              </div>
              <span className="text-xs font-mono text-gray-300 w-20 text-right">{formatCurrency(amount)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-green-400" /> Income Streams</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {filtered.map((stream) => (
            <div key={stream.id} className="flex items-center gap-3 py-2.5 px-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{stream.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="info" className="text-[9px] capitalize">{stream.category}</Badge>
                  <span className="text-[10px] text-gray-500 capitalize">{stream.frequency}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-green-400">{formatCurrency(stream.amount)}</p>
                <p className="text-[10px] text-gray-500">{formatCurrency(stream.amount * freqMultiplier[stream.frequency])}/yr</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
