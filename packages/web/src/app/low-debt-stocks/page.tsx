'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency, formatLargeNumber } from '@/lib/formatters';
import { ShieldCheck } from 'lucide-react';

interface LowDebtStock {
  symbol: string;
  name: string;
  price: number;
  debtToEquity: number;
  debtToAssets: number;
  interestCoverage: number;
  currentRatio: number;
  marketCap: number;
  sector: string;
  creditRating: string;
}

const STOCKS: LowDebtStock[] = [
  { symbol: 'GOOGL', name: 'Alphabet', price: 148.20, debtToEquity: 0.08, debtToAssets: 0.04, interestCoverage: 285.0, currentRatio: 2.94, marketCap: 1.85e12, sector: 'Technology', creditRating: 'AA+' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 195.80, debtToEquity: 1.76, debtToAssets: 0.32, interestCoverage: 29.5, currentRatio: 0.99, marketCap: 3.02e12, sector: 'Technology', creditRating: 'AA+' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 680.20, debtToEquity: 0.41, debtToAssets: 0.15, interestCoverage: 132.4, currentRatio: 4.17, marketCap: 1.68e12, sector: 'Technology', creditRating: 'A' },
  { symbol: 'GILD', name: 'Gilead Sciences', price: 82.50, debtToEquity: 1.12, debtToAssets: 0.42, interestCoverage: 8.2, currentRatio: 1.42, marketCap: 103e9, sector: 'Healthcare', creditRating: 'A-' },
  { symbol: 'INTU', name: 'Intuit', price: 620.40, debtToEquity: 0.32, debtToAssets: 0.12, interestCoverage: 42.8, currentRatio: 1.85, marketCap: 174e9, sector: 'Technology', creditRating: 'A' },
  { symbol: 'ADBE', name: 'Adobe Inc', price: 580.20, debtToEquity: 0.28, debtToAssets: 0.10, interestCoverage: 58.6, currentRatio: 1.24, marketCap: 260e9, sector: 'Technology', creditRating: 'A+' },
  { symbol: 'MNST', name: 'Monster Beverage', price: 55.80, debtToEquity: 0.00, debtToAssets: 0.00, interestCoverage: 0, currentRatio: 3.52, marketCap: 58e9, sector: 'Consumer Staples', creditRating: 'NR' },
  { symbol: 'KLAC', name: 'KLA Corp', price: 620.50, debtToEquity: 0.85, debtToAssets: 0.28, interestCoverage: 25.4, currentRatio: 2.28, marketCap: 84e9, sector: 'Technology', creditRating: 'A-' },
];

export default function LowDebtStocksPage() {
  const avgDE = STOCKS.reduce((s, st) => s + st.debtToEquity, 0) / STOCKS.length;
  const avgDA = STOCKS.reduce((s, st) => s + st.debtToAssets, 0) / STOCKS.length;
  const avgCR = STOCKS.reduce((s, st) => s + st.currentRatio, 0) / STOCKS.length;
  const debtFree = STOCKS.filter((s) => s.debtToEquity === 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Low Debt Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks with lowest debt ratios</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg D/E</p><p className="text-lg font-bold text-green-400">{avgDE.toFixed(2)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg D/A</p><p className="text-lg font-bold text-indigo-400">{avgDA.toFixed(2)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Current Ratio</p><p className="text-lg font-bold text-amber-400">{avgCR.toFixed(2)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Debt-Free</p><p className="text-lg font-bold text-white">{debtFree}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-indigo-400" /> Low Leverage Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => a.debtToEquity - b.debtToEquity).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2.5 px-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.debtToEquity === 0 ? 'success' : s.debtToEquity < 0.5 ? 'info' : 'warning'}>{s.creditRating}</Badge>
                </div>
                <p className="text-[10px] text-gray-500">{s.sector} - Mkt Cap {formatLargeNumber(s.marketCap)}</p>
              </div>
              <span className="text-xs font-mono text-white">{formatCurrency(s.price)}</span>
              <span className={cn('text-xs font-mono w-14 text-right', s.debtToEquity < 0.5 ? 'text-green-400' : 'text-amber-400')}>
                {s.debtToEquity.toFixed(2)} D/E
              </span>
              <span className="text-xs font-mono text-gray-400 w-14 text-right">{s.currentRatio.toFixed(2)} CR</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
