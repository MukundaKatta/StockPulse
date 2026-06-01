'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency, formatLargeNumber } from '@/lib/formatters';
import { Shield } from 'lucide-react';

interface BlueChip {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  peRatio: number;
  divYield: number;
  rating: string;
  sector: string;
  beta: number;
}

const STOCKS: BlueChip[] = [
  { symbol: 'AAPL', name: 'Apple Inc', price: 195.80, change: 1.24, marketCap: 3.02e12, peRatio: 30.2, divYield: 0.52, rating: 'AAA', sector: 'Technology', beta: 1.28 },
  { symbol: 'MSFT', name: 'Microsoft', price: 405.60, change: 0.85, marketCap: 3.01e12, peRatio: 35.8, divYield: 0.74, rating: 'AAA', sector: 'Technology', beta: 0.92 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.40, change: -0.32, marketCap: 382e9, peRatio: 18.5, divYield: 3.04, rating: 'AAA', sector: 'Healthcare', beta: 0.55 },
  { symbol: 'JPM', name: 'JP Morgan Chase', price: 192.80, change: 0.65, marketCap: 556e9, peRatio: 11.8, divYield: 2.18, rating: 'AA', sector: 'Financials', beta: 1.12 },
  { symbol: 'PG', name: 'Procter & Gamble', price: 162.50, change: 0.28, marketCap: 383e9, peRatio: 25.4, divYield: 2.45, rating: 'AA+', sector: 'Consumer Staples', beta: 0.42 },
  { symbol: 'V', name: 'Visa Inc', price: 280.20, change: 1.45, marketCap: 575e9, peRatio: 31.2, divYield: 0.75, rating: 'AA-', sector: 'Financials', beta: 0.95 },
  { symbol: 'UNH', name: 'UnitedHealth', price: 525.40, change: -0.15, marketCap: 485e9, peRatio: 22.4, divYield: 1.42, rating: 'A+', sector: 'Healthcare', beta: 0.68 },
  { symbol: 'WMT', name: 'Walmart Inc', price: 168.90, change: 0.52, marketCap: 455e9, peRatio: 28.6, divYield: 1.38, rating: 'AA', sector: 'Consumer Staples', beta: 0.52 },
];

export default function BlueChipStocksPage() {
  const totalMktCap = STOCKS.reduce((s, st) => s + st.marketCap, 0);
  const avgPE = STOCKS.reduce((s, st) => s + st.peRatio, 0) / STOCKS.length;
  const avgYield = STOCKS.reduce((s, st) => s + st.divYield, 0) / STOCKS.length;
  const avgBeta = STOCKS.reduce((s, st) => s + st.beta, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Blue Chip Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Blue chip quality stock list</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Mkt Cap</p><p className="text-lg font-bold text-white">{formatLargeNumber(totalMktCap)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg P/E</p><p className="text-lg font-bold text-indigo-400">{avgPE.toFixed(1)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Beta</p><p className="text-lg font-bold text-amber-400">{avgBeta.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-indigo-400" /> Quality Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.marketCap - a.marketCap).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2.5 px-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.rating.startsWith('AAA') ? 'success' : s.rating.startsWith('AA') ? 'info' : 'warning'}>{s.rating}</Badge>
                </div>
                <p className="text-[10px] text-gray-500">{s.sector} - Beta: {s.beta.toFixed(2)}</p>
              </div>
              <span className="text-xs font-mono text-white">{formatCurrency(s.price)}</span>
              <span className={cn('text-xs font-mono w-14 text-right', s.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
              </span>
              <span className="text-xs font-mono text-gray-400 w-14 text-right">{s.peRatio.toFixed(1)}x</span>
              <span className="text-xs font-mono text-green-400 w-14 text-right">{s.divYield.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
