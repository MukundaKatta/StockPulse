'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Shield } from 'lucide-react';

interface DefenseStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: string;
  peRatio: number;
  divYield: number;
  sector: 'Aerospace' | 'Defense' | 'Cybersecurity' | 'Space';
}

const STOCKS: DefenseStock[] = [
  { symbol: 'LMT', name: 'Lockheed Martin', price: 482.30, change: 1.85, marketCap: '$118B', peRatio: 16.8, divYield: 2.6, sector: 'Defense' },
  { symbol: 'RTX', name: 'RTX Corp', price: 108.45, change: -0.42, marketCap: '$145B', peRatio: 34.2, divYield: 2.3, sector: 'Aerospace' },
  { symbol: 'NOC', name: 'Northrop Grumman', price: 478.90, change: 2.14, marketCap: '$72B', peRatio: 18.4, divYield: 1.5, sector: 'Defense' },
  { symbol: 'GD', name: 'General Dynamics', price: 282.70, change: 0.68, marketCap: '$77B', peRatio: 20.1, divYield: 2.0, sector: 'Aerospace' },
  { symbol: 'BA', name: 'Boeing', price: 218.50, change: -1.25, marketCap: '$135B', peRatio: 0, divYield: 0, sector: 'Aerospace' },
  { symbol: 'LDOS', name: 'Leidos Holdings', price: 132.80, change: 0.95, marketCap: '$18B', peRatio: 19.5, divYield: 1.1, sector: 'Cybersecurity' },
  { symbol: 'RKLB', name: 'Rocket Lab USA', price: 18.40, change: 4.20, marketCap: '$9B', peRatio: 0, divYield: 0, sector: 'Space' },
];

const sectorVariant = (s: string) => s === 'Defense' ? 'danger' : s === 'Aerospace' ? 'info' : s === 'Cybersecurity' ? 'warning' : 'success';

export default function DefenseStocksPage() {
  const avgChange = STOCKS.reduce((s, t) => s + t.change, 0) / STOCKS.length;
  const gainers = STOCKS.filter(s => s.change > 0).length;
  const avgDivYield = STOCKS.filter(s => s.divYield > 0).reduce((s, t) => s + t.divYield, 0) / STOCKS.filter(s => s.divYield > 0).length;
  const totalStocks = STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Defense & Aerospace Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Defense, aerospace, and military contractor equities</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{totalStocks}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Change</p><p className={cn('text-lg font-bold', avgChange >= 0 ? 'text-green-400' : 'text-red-400')}>{avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers</p><p className="text-lg font-bold text-green-400">{gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Div Yield</p><p className="text-lg font-bold text-indigo-400">{avgDivYield.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-indigo-400" /> Defense Holdings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{s.symbol} <span className="text-gray-500">{s.name}</span></p>
                <p className="text-xs text-gray-500">{s.marketCap} &middot; P/E {s.peRatio || 'N/A'}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(s.price)}</p>
                  <p className={cn('text-[10px] font-mono', s.change >= 0 ? 'text-green-400' : 'text-red-400')}>{s.change >= 0 ? '+' : ''}{s.change}%</p>
                </div>
                <Badge variant={sectorVariant(s.sector)}>{s.sector}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
