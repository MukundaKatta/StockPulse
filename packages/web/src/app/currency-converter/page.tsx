'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/formatters';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.5 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.36 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.53 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', rate: 0.88 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.1 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', rate: 1320 },
];

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const fromRate = CURRENCIES.find((c) => c.code === fromCurrency)?.rate || 1;
  const toRate = CURRENCIES.find((c) => c.code === toCurrency)?.rate || 1;
  const convertedAmount = (parseFloat(amount) || 0) * (toRate / fromRate);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Currency Converter</h1>
        <p className="mt-1 text-sm text-gray-500">Real-time forex conversion rates</p>
      </div>

      <Card className="!p-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 uppercase mb-1 block">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-xl font-mono"
            />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase mb-1 block">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <Button variant="ghost" onClick={swap} className="mt-5">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            <div>
              <label className="text-xs text-gray-500 uppercase mb-1 block">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-lg bg-white/5 p-4 text-center">
            <p className="text-xs text-gray-500">Converted Amount</p>
            <p className="text-3xl font-bold text-white mt-1 font-mono">
              {CURRENCIES.find((c) => c.code === toCurrency)?.symbol}
              {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              1 {fromCurrency} = {(toRate / fromRate).toFixed(4)} {toCurrency}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Conversion Table</CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {[1, 10, 100, 1000, 10000].map((val) => (
            <div key={val} className="flex items-center justify-between py-2 px-2">
              <span className="text-sm text-gray-400">{val.toLocaleString()} {fromCurrency}</span>
              <span className="text-sm font-mono text-white">
                {(val * (toRate / fromRate)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
