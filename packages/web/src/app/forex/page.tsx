'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkline } from '@/components/ui/sparkline';
import { cn } from '@/lib/formatters';
import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface CurrencyPair {
  pair: string;
  base: string;
  quote: string;
  rate: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

function genSparkline(rate: number, change: number): number[] {
  const pts: number[] = [];
  const start = rate - change;
  for (let i = 0; i <= 24; i++) {
    pts.push(start + (change) * (i / 24) + (Math.random() - 0.5) * rate * 0.001);
  }
  return pts;
}

const PAIRS: CurrencyPair[] = [
  { pair: 'EUR/USD', base: 'EUR', quote: 'USD', rate: 1.0856, change: 0.0023, changePercent: 0.21 },
  { pair: 'GBP/USD', base: 'GBP', quote: 'USD', rate: 1.2734, change: -0.0012, changePercent: -0.09 },
  { pair: 'USD/JPY', base: 'USD', quote: 'JPY', rate: 157.42, change: 0.45, changePercent: 0.29 },
  { pair: 'USD/CHF', base: 'USD', quote: 'CHF', rate: 0.9012, change: -0.0034, changePercent: -0.38 },
  { pair: 'AUD/USD', base: 'AUD', quote: 'USD', rate: 0.6523, change: 0.0015, changePercent: 0.23 },
  { pair: 'USD/CAD', base: 'USD', quote: 'CAD', rate: 1.3645, change: -0.0023, changePercent: -0.17 },
  { pair: 'NZD/USD', base: 'NZD', quote: 'USD', rate: 0.6089, change: 0.0008, changePercent: 0.13 },
  { pair: 'EUR/GBP', base: 'EUR', quote: 'GBP', rate: 0.8525, change: 0.0018, changePercent: 0.21 },
].map((p) => ({ ...p, sparkline: genSparkline(p.rate, p.change) }));

export default function ForexPage() {
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const conversionRate = (() => {
    const pair = PAIRS.find((p) => p.base === fromCurrency && p.quote === toCurrency);
    if (pair) return pair.rate;
    const inverse = PAIRS.find((p) => p.base === toCurrency && p.quote === fromCurrency);
    if (inverse) return 1 / inverse.rate;
    return 1;
  })();

  const convertedAmount = parseFloat(amount || '0') * conversionRate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Forex Markets</h1>
        <p className="mt-1 text-sm text-gray-500">Major currency pairs and exchange rates</p>
      </div>

      {/* Currency converter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-indigo-400" />
            Currency Converter
          </CardTitle>
        </CardHeader>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              label="Amount"
            />
          </div>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="rounded-lg border border-white/[0.06] bg-[#0a0a0f] px-3 py-2.5 text-sm text-white"
          >
            {['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ArrowRightLeft className="h-4 w-4 text-gray-500" />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="rounded-lg border border-white/[0.06] bg-[#0a0a0f] px-3 py-2.5 text-sm text-white"
          >
            {['EUR', 'USD', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="text-right">
            <p className="text-xs text-gray-500">Result</p>
            <p className="text-lg font-mono font-bold text-white">
              {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          </div>
        </div>
      </Card>

      {/* Pairs table */}
      <Card>
        <CardHeader>
          <CardTitle>Major Pairs</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Pair</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Rate</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Change</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">%</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500 hidden sm:table-cell">Chart</th>
              </tr>
            </thead>
            <tbody>
              {PAIRS.map((pair) => (
                <tr key={pair.pair} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-3">
                    <span className="font-mono font-bold text-white">{pair.pair}</span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-white">
                    {pair.rate < 10 ? pair.rate.toFixed(4) : pair.rate.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={cn('font-mono text-xs', pair.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {pair.change >= 0 ? '+' : ''}{pair.change < 10 ? pair.change.toFixed(4) : pair.change.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={cn(
                      'inline-flex items-center gap-0.5 font-mono text-xs',
                      pair.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    )}>
                      {pair.changePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(pair.changePercent).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right hidden sm:table-cell">
                    <Sparkline data={pair.sparkline} width={60} height={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
