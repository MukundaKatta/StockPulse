'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Beaker } from 'lucide-react';

interface QuickRatioData {
  symbol: string;
  name: string;
  quickRatio: number;
  cash: number;
  receivables: number;
  shortTermInvestments: number;
  currentLiabilities: number;
  inventory: number;
  sector: string;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

const STOCKS: QuickRatioData[] = [
  { symbol: 'GOOGL', name: 'Alphabet', quickRatio: 2.05, cash: 30.7, receivables: 40.3, shortTermInvestments: 80.9, currentLiabilities: 78.9, inventory: 0, sector: 'Tech', rating: 'Excellent' },
  { symbol: 'NVDA', name: 'NVIDIA', quickRatio: 3.52, cash: 7.3, receivables: 10.8, shortTermInvestments: 18.7, currentLiabilities: 10.6, inventory: 5.3, sector: 'Semis', rating: 'Excellent' },
  { symbol: 'META', name: 'Meta', quickRatio: 2.61, cash: 41.9, receivables: 14.5, shortTermInvestments: 23.5, currentLiabilities: 35.5, inventory: 0, sector: 'Social', rating: 'Excellent' },
  { symbol: 'MSFT', name: 'Microsoft', quickRatio: 1.54, cash: 34.7, receivables: 48.7, shortTermInvestments: 76.6, currentLiabilities: 104.1, inventory: 1.2, sector: 'Tech', rating: 'Good' },
  { symbol: 'AAPL', name: 'Apple', quickRatio: 0.84, cash: 29.9, receivables: 29.5, shortTermInvestments: 62.7, currentLiabilities: 145.3, inventory: 6.3, sector: 'Tech', rating: 'Fair' },
  { symbol: 'AMZN', name: 'Amazon', quickRatio: 0.72, cash: 54.3, receivables: 32.5, shortTermInvestments: 16.2, currentLiabilities: 141.7, inventory: 35.7, sector: 'Consumer', rating: 'Poor' },
  { symbol: 'TSLA', name: 'Tesla', quickRatio: 1.25, cash: 16.4, receivables: 3.5, shortTermInvestments: 12.7, currentLiabilities: 28.7, inventory: 13.6, sector: 'Auto', rating: 'Good' },
  { symbol: 'F', name: 'Ford Motor', quickRatio: 0.85, cash: 25.2, receivables: 8.4, shortTermInvestments: 41.5, currentLiabilities: 88.3, inventory: 16.4, sector: 'Auto', rating: 'Fair' },
];

export default function QuickRatioPage() {
  const avgRatio = STOCKS.reduce((s, st) => s + st.quickRatio, 0) / STOCKS.length;
  const excellent = STOCKS.filter((s) => s.rating === 'Excellent').length;
  const belowOne = STOCKS.filter((s) => s.quickRatio < 1.0).length;
  const highest = Math.max(...STOCKS.map((s) => s.quickRatio));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Quick Ratio</h1>
        <p className="mt-1 text-sm text-gray-500">Acid test ratio analysis excluding inventory</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Quick Ratio</p>
          <p className="text-lg font-bold text-white">{avgRatio.toFixed(2)}x</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Excellent</p>
          <p className="text-lg font-bold text-green-400">{excellent}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Below 1.0x</p>
          <p className="text-lg font-bold text-red-400">{belowOne}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Highest</p>
          <p className="text-lg font-bold text-indigo-400">{highest.toFixed(2)}x</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Beaker className="h-4 w-4 text-indigo-400" /> Acid Test Analysis
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.quickRatio - a.quickRatio).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <Badge variant={s.rating === 'Excellent' ? 'success' : s.rating === 'Good' ? 'info' : s.rating === 'Fair' ? 'warning' : 'danger'}>
                {s.rating}
              </Badge>
              <span className={cn('text-xs font-mono w-12', s.quickRatio >= 1.5 ? 'text-green-400' : s.quickRatio >= 1.0 ? 'text-amber-400' : 'text-red-400')}>
                {s.quickRatio.toFixed(2)}x
              </span>
              <span className="text-[10px] font-mono text-gray-400 w-16">Cash: {formatCurrency(s.cash)}B</span>
              <span className="text-[10px] font-mono text-gray-400 w-14">A/R: {formatCurrency(s.receivables)}B</span>
              <span className="text-[10px] text-gray-500 ml-auto">Inv: {formatCurrency(s.inventory)}B</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
