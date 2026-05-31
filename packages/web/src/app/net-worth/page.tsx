'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/formatters';
import { Wallet, TrendingUp, Home, Car, CreditCard, Plus } from 'lucide-react';

interface Asset {
  name: string;
  category: 'investment' | 'property' | 'cash' | 'other';
  value: number;
}

interface Liability {
  name: string;
  category: 'mortgage' | 'loan' | 'credit' | 'other';
  balance: number;
}

const INITIAL_ASSETS: Asset[] = [
  { name: 'Stock Portfolio', category: 'investment', value: 125000 },
  { name: '401(k)', category: 'investment', value: 85000 },
  { name: 'Roth IRA', category: 'investment', value: 42000 },
  { name: 'Savings Account', category: 'cash', value: 35000 },
  { name: 'Checking Account', category: 'cash', value: 8500 },
  { name: 'Home', category: 'property', value: 450000 },
  { name: 'Car', category: 'other', value: 28000 },
  { name: 'Crypto', category: 'investment', value: 15000 },
];

const INITIAL_LIABILITIES: Liability[] = [
  { name: 'Mortgage', category: 'mortgage', balance: 320000 },
  { name: 'Student Loans', category: 'loan', balance: 25000 },
  { name: 'Auto Loan', category: 'loan', balance: 18000 },
  { name: 'Credit Card', category: 'credit', balance: 3500 },
];

export default function NetWorthPage() {
  const [assets] = useState(INITIAL_ASSETS);
  const [liabilities] = useState(INITIAL_LIABILITIES);

  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.balance, 0);
  const netWorth = totalAssets - totalLiabilities;

  const assetsByCategory = {
    investment: assets.filter((a) => a.category === 'investment'),
    property: assets.filter((a) => a.category === 'property'),
    cash: assets.filter((a) => a.category === 'cash'),
    other: assets.filter((a) => a.category === 'other'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Net Worth Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Complete financial snapshot</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Assets</p>
          <p className="text-lg font-bold text-green-400">{formatCurrency(totalAssets)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Liabilities</p>
          <p className="text-lg font-bold text-red-400">{formatCurrency(totalLiabilities)}</p>
        </Card>
        <Card className="!p-4 ring-1 ring-indigo-500/20">
          <p className="text-[10px] text-gray-500 uppercase">Net Worth</p>
          <p className={cn('text-lg font-bold', netWorth >= 0 ? 'text-indigo-400' : 'text-red-400')}>{formatCurrency(netWorth)}</p>
        </Card>
      </div>

      {/* Breakdown Bar */}
      <Card className="!p-4">
        <div className="h-6 rounded-full overflow-hidden flex">
          <div className="h-full bg-green-500/60" style={{ width: `${(totalAssets / (totalAssets + totalLiabilities)) * 100}%` }} title="Assets" />
          <div className="h-full bg-red-500/60" style={{ width: `${(totalLiabilities / (totalAssets + totalLiabilities)) * 100}%` }} title="Liabilities" />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          <span>Assets ({((totalAssets / (totalAssets + totalLiabilities)) * 100).toFixed(0)}%)</span>
          <span>Liabilities ({((totalLiabilities / (totalAssets + totalLiabilities)) * 100).toFixed(0)}%)</span>
        </div>
      </Card>

      {/* Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-4 w-4" /> Assets
          </CardTitle>
        </CardHeader>
        <div className="space-y-1">
          {assets.map((asset, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/[0.02]">
              <span className="text-sm text-gray-300">{asset.name}</span>
              <span className="text-sm font-mono text-green-400">{formatCurrency(asset.value)}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Liabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <CreditCard className="h-4 w-4" /> Liabilities
          </CardTitle>
        </CardHeader>
        <div className="space-y-1">
          {liabilities.map((liability, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/[0.02]">
              <span className="text-sm text-gray-300">{liability.name}</span>
              <span className="text-sm font-mono text-red-400">-{formatCurrency(liability.balance)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
