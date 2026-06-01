'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { PhoneCall } from 'lucide-react';

interface CoveredCall {
  symbol: string;
  price: number;
  strike: number;
  premium: number;
  expiry: string;
  dte: number;
  annualReturn: number;
  downProtection: number;
  maxGain: number;
  itm: boolean;
}

const CALLS: CoveredCall[] = [
  { symbol: 'AAPL', price: 186.05, strike: 190, premium: 3.20, expiry: '2024-03-15', dte: 35, annualReturn: 22.4, downProtection: 1.7, maxGain: 7.15, itm: false },
  { symbol: 'MSFT', price: 404.87, strike: 420, premium: 8.50, expiry: '2024-03-15', dte: 35, annualReturn: 28.8, downProtection: 2.1, maxGain: 23.63, itm: false },
  { symbol: 'NVDA', price: 878.35, strike: 900, premium: 28.50, expiry: '2024-03-15', dte: 35, annualReturn: 42.2, downProtection: 3.2, maxGain: 50.15, itm: false },
  { symbol: 'META', price: 484.10, strike: 500, premium: 12.40, expiry: '2024-03-15', dte: 35, annualReturn: 33.5, downProtection: 2.6, maxGain: 28.30, itm: false },
  { symbol: 'GOOGL', price: 141.80, strike: 145, premium: 3.50, expiry: '2024-03-15', dte: 35, annualReturn: 32.1, downProtection: 2.5, maxGain: 6.70, itm: false },
  { symbol: 'AMD', price: 177.52, strike: 185, premium: 5.80, expiry: '2024-03-15', dte: 35, annualReturn: 42.5, downProtection: 3.3, maxGain: 13.28, itm: false },
  { symbol: 'AMZN', price: 178.25, strike: 180, premium: 5.20, expiry: '2024-03-15', dte: 35, annualReturn: 38.0, downProtection: 2.9, maxGain: 6.95, itm: false },
  { symbol: 'TSLA', price: 188.70, strike: 195, premium: 8.40, expiry: '2024-03-15', dte: 35, annualReturn: 58.0, downProtection: 4.5, maxGain: 14.70, itm: false },
];

export default function CoveredCallsPage() {
  const avgReturn = CALLS.reduce((s, c) => s + c.annualReturn, 0) / CALLS.length;
  const avgProtection = CALLS.reduce((s, c) => s + c.downProtection, 0) / CALLS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Covered Calls</h1>
        <p className="mt-1 text-sm text-gray-500">Income-generating covered call opportunities</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Ann. Return</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Protection</p><p className="text-lg font-bold text-indigo-400">{avgProtection.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Opportunities</p><p className="text-lg font-bold text-white">{CALLS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PhoneCall className="h-4 w-4 text-green-400" /> Best Covered Calls</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CALLS.sort((a, b) => b.annualReturn - a.annualReturn).map((c) => (
            <div key={c.symbol} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-bold text-white w-12">{c.symbol}</span>
              <span className="text-xs font-mono text-gray-400 w-16">${c.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-indigo-400 w-10">${c.strike}</span>
              <span className="text-xs font-mono text-green-400 w-12">${c.premium.toFixed(2)}</span>
              <span className="text-[10px] text-gray-500 w-10">{c.dte}d</span>
              <span className="text-xs font-mono font-bold text-green-400 w-14">{c.annualReturn.toFixed(1)}% yr</span>
              <span className="text-xs font-mono text-indigo-400 w-14">-{c.downProtection.toFixed(1)}% prot</span>
              <span className="text-xs font-mono text-gray-400 w-14">+${c.maxGain.toFixed(2)} max</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
