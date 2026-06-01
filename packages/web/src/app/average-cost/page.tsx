'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

interface DCAPosition {
  ticker: string;
  company: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  totalInvested: number;
  currentValue: number;
  gainLoss: number;
  status: 'Profit' | 'Loss' | 'Break Even';
}

const POSITIONS: DCAPosition[] = [
  { ticker: 'AAPL', company: 'Apple Inc', shares: 52, avgCost: 162.40, currentPrice: 185.20, totalInvested: 8444.80, currentValue: 9630.40, gainLoss: 14.03, status: 'Profit' },
  { ticker: 'MSFT', company: 'Microsoft', shares: 28, avgCost: 345.20, currentPrice: 404.80, totalInvested: 9665.60, currentValue: 11334.40, gainLoss: 17.27, status: 'Profit' },
  { ticker: 'GOOGL', company: 'Alphabet', shares: 65, avgCost: 138.50, currentPrice: 141.80, totalInvested: 9002.50, currentValue: 9217.00, gainLoss: 2.38, status: 'Profit' },
  { ticker: 'AMZN', company: 'Amazon', shares: 45, avgCost: 185.60, currentPrice: 178.25, totalInvested: 8352.00, currentValue: 8021.25, gainLoss: -3.96, status: 'Loss' },
  { ticker: 'NVDA', company: 'NVIDIA', shares: 18, avgCost: 485.20, currentPrice: 878.35, totalInvested: 8733.60, currentValue: 15810.30, gainLoss: 81.03, status: 'Profit' },
  { ticker: 'META', company: 'Meta Platforms', shares: 22, avgCost: 320.40, currentPrice: 484.10, totalInvested: 7048.80, currentValue: 10650.20, gainLoss: 51.09, status: 'Profit' },
  { ticker: 'TSLA', company: 'Tesla', shares: 35, avgCost: 248.50, currentPrice: 245.80, totalInvested: 8697.50, currentValue: 8603.00, gainLoss: -1.09, status: 'Loss' },
];

const statusVariant = (s: string) => s === 'Profit' ? 'success' : s === 'Loss' ? 'danger' : 'warning';

export default function AverageCostPage() {
  const totalInvested = POSITIONS.reduce((s, p) => s + p.totalInvested, 0);
  const totalValue = POSITIONS.reduce((s, p) => s + p.currentValue, 0);
  const overallGain = ((totalValue - totalInvested) / totalInvested) * 100;
  const profitCount = POSITIONS.filter(p => p.status === 'Profit').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Average Cost Basis</h1>
        <p className="mt-1 text-sm text-gray-500">Dollar cost averaging analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Invested</p><p className="text-lg font-bold text-white">{formatCurrency(totalInvested)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Current Value</p><p className="text-lg font-bold text-green-400">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Overall Gain</p><p className={cn('text-lg font-bold', overallGain >= 0 ? 'text-green-400' : 'text-red-400')}>{overallGain.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">In Profit</p><p className="text-lg font-bold text-indigo-400">{profitCount}/{POSITIONS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> Cost Basis Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {POSITIONS.map((p) => (
            <div key={p.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{p.ticker} <span className="text-gray-500">{p.company}</span></p>
                <p className="text-xs text-gray-500">{p.shares} shares &middot; Avg {formatCurrency(p.avgCost)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(p.currentPrice)}</p>
                  <p className={cn('text-[10px] font-mono', p.gainLoss >= 0 ? 'text-green-400' : 'text-red-400')}>{p.gainLoss > 0 ? '+' : ''}{p.gainLoss.toFixed(2)}%</p>
                </div>
                <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
