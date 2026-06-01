'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Briefcase } from 'lucide-react';

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  current: number;
  weight: number;
  dayChange: number;
  totalReturn: number;
  sector: string;
}

const HOLDINGS: Holding[] = [
  { symbol: 'AAPL', name: 'Apple Inc', shares: 150, avgCost: 148.20, current: 186.05, weight: 18.8, dayChange: 0.82, totalReturn: 25.5, sector: 'Tech' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', shares: 30, avgCost: 450.80, current: 878.35, weight: 17.8, dayChange: 4.2, totalReturn: 94.8, sector: 'Tech' },
  { symbol: 'MSFT', name: 'Microsoft', shares: 45, avgCost: 310.50, current: 404.87, weight: 12.3, dayChange: 0.5, totalReturn: 30.4, sector: 'Tech' },
  { symbol: 'META', name: 'Meta Platforms', shares: 25, avgCost: 285.40, current: 484.10, weight: 8.2, dayChange: 1.9, totalReturn: 69.7, sector: 'Tech' },
  { symbol: 'AMZN', name: 'Amazon.com', shares: 60, avgCost: 128.90, current: 178.25, weight: 7.2, dayChange: 1.2, totalReturn: 38.3, sector: 'Consumer' },
  { symbol: 'GOOGL', name: 'Alphabet', shares: 80, avgCost: 108.50, current: 141.80, weight: 7.6, dayChange: -0.8, totalReturn: 30.7, sector: 'Tech' },
  { symbol: 'JPM', name: 'JP Morgan', shares: 40, avgCost: 145.20, current: 182.40, weight: 4.9, dayChange: 0.3, totalReturn: 25.6, sector: 'Finance' },
  { symbol: 'V', name: 'Visa Inc', shares: 35, avgCost: 228.50, current: 278.90, weight: 6.6, dayChange: 0.6, totalReturn: 22.1, sector: 'Finance' },
  { symbol: 'UNH', name: 'UnitedHealth', shares: 15, avgCost: 485.20, current: 528.40, weight: 5.3, dayChange: -0.4, totalReturn: 8.9, sector: 'Health' },
  { symbol: 'BND', name: 'Vanguard Bond', shares: 200, avgCost: 73.80, current: 72.45, weight: 9.8, dayChange: 0.1, totalReturn: -1.8, sector: 'Fixed Inc' },
];

export default function PortfolioSummaryPage() {
  const totalValue = HOLDINGS.reduce((s, h) => s + h.shares * h.current, 0);
  const totalCost = HOLDINGS.reduce((s, h) => s + h.shares * h.avgCost, 0);
  const totalGain = totalValue - totalCost;
  const totalRetPct = (totalGain / totalCost) * 100;
  const dayGain = HOLDINGS.reduce((s, h) => s + h.shares * h.current * h.dayChange / 100, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Summary</h1>
        <p className="mt-1 text-sm text-gray-500">Complete portfolio overview with allocations</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Value</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Gain</p><p className={cn('text-lg font-bold', totalGain >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(totalGain)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Return</p><p className="text-lg font-bold text-green-400">+{totalRetPct.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Day Change</p><p className={cn('text-lg font-bold', dayGain >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(dayGain)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-indigo-400" /> Holdings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.sort((a, b) => b.weight - a.weight).map((h) => (
            <div key={h.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20"><p className="text-xs font-bold text-white">{h.symbol}</p><p className="text-[10px] text-gray-500 truncate">{h.name}</p></div>
              <Badge variant="info">{h.sector}</Badge>
              <span className="text-xs font-mono text-gray-400 w-12">{h.weight.toFixed(1)}%</span>
              <span className="text-xs font-mono text-white w-14">${h.current.toFixed(2)}</span>
              <span className={cn('text-xs font-mono w-12', h.dayChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                {h.dayChange >= 0 ? '+' : ''}{h.dayChange.toFixed(1)}%
              </span>
              <span className={cn('text-xs font-mono w-14', h.totalReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                {h.totalReturn >= 0 ? '+' : ''}{h.totalReturn.toFixed(1)}%
              </span>
              <span className="text-xs font-mono text-gray-400 ml-auto">{h.shares} sh</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
