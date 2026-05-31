'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Receipt, ArrowDown } from 'lucide-react';

interface Expense {
  date: string;
  description: string;
  amount: number;
  category: string;
}

const EXPENSES: Expense[] = [
  { date: '2024-01-15', description: 'Mortgage Payment', amount: 2100, category: 'Housing' },
  { date: '2024-01-15', description: 'Property Tax Escrow', amount: 450, category: 'Housing' },
  { date: '2024-01-14', description: 'Grocery Store', amount: 185, category: 'Food' },
  { date: '2024-01-13', description: 'Electric Bill', amount: 142, category: 'Utilities' },
  { date: '2024-01-12', description: 'Internet Service', amount: 79, category: 'Utilities' },
  { date: '2024-01-12', description: 'Gas Station', amount: 55, category: 'Transport' },
  { date: '2024-01-11', description: 'Restaurant Dinner', amount: 78, category: 'Food' },
  { date: '2024-01-10', description: 'Car Insurance', amount: 165, category: 'Insurance' },
  { date: '2024-01-10', description: 'Health Insurance', amount: 420, category: 'Insurance' },
  { date: '2024-01-09', description: 'Netflix', amount: 15.99, category: 'Entertainment' },
  { date: '2024-01-09', description: 'Spotify', amount: 10.99, category: 'Entertainment' },
  { date: '2024-01-08', description: 'Gym Membership', amount: 49, category: 'Health' },
  { date: '2024-01-07', description: 'Phone Bill', amount: 85, category: 'Utilities' },
  { date: '2024-01-05', description: 'Coffee Shop', amount: 12.50, category: 'Food' },
  { date: '2024-01-03', description: '401(k) Contribution', amount: 1500, category: 'Savings' },
];

const BUDGET: Record<string, number> = {
  Housing: 2800, Food: 600, Utilities: 350, Transport: 300, Insurance: 600, Entertainment: 150, Health: 100, Savings: 1500,
};

export default function ExpenseTrackerPage() {
  const totalExpenses = EXPENSES.reduce((s, e) => s + e.amount, 0);
  const totalBudget = Object.values(BUDGET).reduce((s, b) => s + b, 0);

  const byCategory = EXPENSES.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Expense Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Monthly spending vs budget</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Total Spent</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalExpenses)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Budget</p><p className="text-lg font-bold text-white">{formatCurrency(totalBudget)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Remaining</p><p className={cn('text-lg font-bold', totalBudget - totalExpenses >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(totalBudget - totalExpenses)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Budget vs Actual</CardTitle></CardHeader>
        <div className="space-y-3 px-2 pb-2">
          {categories.map(([cat, spent]) => {
            const budget = BUDGET[cat] || 0;
            const pct = budget > 0 ? (spent / budget) * 100 : 100;
            const over = pct > 100;
            return (
              <div key={cat} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{cat}</span>
                  <span className={cn('text-xs font-mono', over ? 'text-red-400' : 'text-gray-400')}>
                    {formatCurrency(spent)} / {formatCurrency(budget)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all', over ? 'bg-red-500/70' : 'bg-indigo-500/60')} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Receipt className="h-4 w-4 text-indigo-400" /> Recent Transactions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {EXPENSES.map((exp, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-2">
              <div>
                <p className="text-sm text-gray-300">{exp.description}</p>
                <p className="text-[10px] text-gray-500">{exp.date} · {exp.category}</p>
              </div>
              <span className="text-sm font-mono text-red-400">-{formatCurrency(exp.amount)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
