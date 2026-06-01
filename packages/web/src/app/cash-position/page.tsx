'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/formatters';
import { Wallet } from 'lucide-react';

interface CashAccount {
  name: string;
  type: 'Checking' | 'Savings' | 'Money Market' | 'Brokerage' | 'T-Bills';
  balance: number;
  apy: number;
  available: boolean;
}

const ACCOUNTS: CashAccount[] = [
  { name: 'Main Checking', type: 'Checking', balance: 12450.82, apy: 0.01, available: true },
  { name: 'Emergency Fund', type: 'Savings', balance: 45000.00, apy: 4.85, available: true },
  { name: 'Fidelity MM', type: 'Money Market', balance: 28750.00, apy: 5.02, available: true },
  { name: 'Brokerage Cash', type: 'Brokerage', balance: 8420.50, apy: 0.35, available: true },
  { name: 'T-Bill Ladder', type: 'T-Bills', balance: 50000.00, apy: 5.28, available: false },
  { name: 'Trading Account', type: 'Brokerage', balance: 3200.00, apy: 0.10, available: true },
];

export default function CashPositionPage() {
  const totalCash = ACCOUNTS.reduce((s, a) => s + a.balance, 0);
  const liquid = ACCOUNTS.filter((a) => a.available).reduce((s, a) => s + a.balance, 0);
  const weightedApy = ACCOUNTS.reduce((s, a) => s + a.balance * a.apy, 0) / totalCash;
  const annualIncome = ACCOUNTS.reduce((s, a) => s + a.balance * (a.apy / 100), 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cash Position</h1>
        <p className="mt-1 text-sm text-gray-500">Cash and cash equivalent holdings</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Cash</p><p className="text-lg font-bold text-white">{formatCurrency(totalCash)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Liquid</p><p className="text-lg font-bold text-green-400">{formatCurrency(liquid)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Blended APY</p><p className="text-lg font-bold text-indigo-400">{weightedApy.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Annual Income</p><p className="text-lg font-bold text-emerald-400">{formatCurrency(annualIncome)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Wallet className="h-4 w-4 text-indigo-400" /> Accounts</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ACCOUNTS.sort((a, b) => b.balance - a.balance).map((a) => (
            <div key={a.name} className="flex items-center justify-between py-2.5 px-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-medium text-white">{a.name}</p>
                  <p className="text-[10px] text-gray-500">{a.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded', a.available ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400')}>
                  {a.available ? 'Liquid' : 'Locked'}
                </span>
                <span className="text-xs font-mono text-indigo-400 w-12 text-right">{a.apy.toFixed(2)}%</span>
                <span className="text-xs font-mono text-white w-24 text-right">{formatCurrency(a.balance)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="!p-4">
        <p className="text-[10px] text-gray-500 uppercase mb-2">Allocation</p>
        <div className="h-4 rounded bg-white/5 flex overflow-hidden">
          {ACCOUNTS.sort((a, b) => b.balance - a.balance).map((a, i) => {
            const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-violet-500', 'bg-cyan-500'];
            return <div key={a.name} className={cn(colors[i % colors.length], 'h-full')} style={{ width: `${(a.balance / totalCash) * 100}%` }} />;
          })}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {ACCOUNTS.sort((a, b) => b.balance - a.balance).map((a, i) => {
            const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-violet-500', 'bg-cyan-500'];
            return (
              <div key={a.name} className="flex items-center gap-1">
                <span className={cn('h-1.5 w-1.5 rounded-full', colors[i % colors.length])} />
                <span className="text-[9px] text-gray-400">{a.name} ({((a.balance / totalCash) * 100).toFixed(0)}%)</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
