'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Scale } from 'lucide-react';

interface CurrentRatioData {
  symbol: string;
  name: string;
  currentRatio: number;
  currentAssets: number;
  currentLiabilities: number;
  cashRatio: number;
  workingCapital: number;
  sector: string;
  health: 'Strong' | 'Adequate' | 'Weak';
}

const STOCKS: CurrentRatioData[] = [
  { symbol: 'AAPL', name: 'Apple', currentRatio: 0.99, currentAssets: 143.6, currentLiabilities: 145.3, cashRatio: 0.42, workingCapital: -1.7, sector: 'Tech', health: 'Adequate' },
  { symbol: 'MSFT', name: 'Microsoft', currentRatio: 1.77, currentAssets: 184.3, currentLiabilities: 104.1, cashRatio: 0.78, workingCapital: 80.2, sector: 'Tech', health: 'Strong' },
  { symbol: 'GOOGL', name: 'Alphabet', currentRatio: 2.09, currentAssets: 164.9, currentLiabilities: 78.9, cashRatio: 1.41, workingCapital: 86.0, sector: 'Tech', health: 'Strong' },
  { symbol: 'AMZN', name: 'Amazon', currentRatio: 1.05, currentAssets: 148.8, currentLiabilities: 141.7, cashRatio: 0.37, workingCapital: 7.1, sector: 'Consumer', health: 'Adequate' },
  { symbol: 'NVDA', name: 'NVIDIA', currentRatio: 4.17, currentAssets: 44.3, currentLiabilities: 10.6, cashRatio: 2.45, workingCapital: 33.7, sector: 'Semis', health: 'Strong' },
  { symbol: 'META', name: 'Meta', currentRatio: 2.67, currentAssets: 94.7, currentLiabilities: 35.5, cashRatio: 1.83, workingCapital: 59.2, sector: 'Social', health: 'Strong' },
  { symbol: 'TSLA', name: 'Tesla', currentRatio: 1.73, currentAssets: 49.6, currentLiabilities: 28.7, cashRatio: 1.01, workingCapital: 20.9, sector: 'Auto', health: 'Strong' },
  { symbol: 'F', name: 'Ford Motor', currentRatio: 1.18, currentAssets: 104.2, currentLiabilities: 88.3, cashRatio: 0.28, workingCapital: 15.9, sector: 'Auto', health: 'Adequate' },
];

export default function CurrentRatioPage() {
  const avgRatio = STOCKS.reduce((s, st) => s + st.currentRatio, 0) / STOCKS.length;
  const strong = STOCKS.filter((s) => s.health === 'Strong').length;
  const belowOne = STOCKS.filter((s) => s.currentRatio < 1.0).length;
  const totalWC = STOCKS.reduce((s, st) => s + st.workingCapital, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Current Ratio</h1>
        <p className="mt-1 text-sm text-gray-500">Current ratio liquidity screen and working capital analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Ratio</p>
          <p className="text-lg font-bold text-white">{avgRatio.toFixed(2)}x</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Strong Liquidity</p>
          <p className="text-lg font-bold text-green-400">{strong}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Below 1.0x</p>
          <p className="text-lg font-bold text-red-400">{belowOne}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Total Work Cap</p>
          <p className="text-lg font-bold text-indigo-400">{formatCurrency(totalWC)}B</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Scale className="h-4 w-4 text-indigo-400" /> Current Ratio Screen
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.currentRatio - a.currentRatio).map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <Badge variant={s.health === 'Strong' ? 'success' : s.health === 'Adequate' ? 'warning' : 'danger'}>
                {s.health}
              </Badge>
              <span className={cn('text-xs font-mono w-12', s.currentRatio >= 1.5 ? 'text-green-400' : s.currentRatio >= 1.0 ? 'text-amber-400' : 'text-red-400')}>
                {s.currentRatio.toFixed(2)}x
              </span>
              <span className="text-[10px] font-mono text-gray-400 w-16">CA: {formatCurrency(s.currentAssets)}B</span>
              <span className="text-[10px] font-mono text-gray-400 w-16">CL: {formatCurrency(s.currentLiabilities)}B</span>
              <span className="text-[10px] text-gray-500 ml-auto">WC: {formatCurrency(s.workingCapital)}B</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
