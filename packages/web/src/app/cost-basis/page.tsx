'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface TaxLot {
  date: string;
  shares: number;
  costBasis: number;
  currentPrice: number;
  holdingPeriod: 'short' | 'long';
}

interface Position {
  symbol: string;
  name: string;
  totalShares: number;
  avgCost: number;
  currentPrice: number;
  lots: TaxLot[];
}

const POSITIONS: Position[] = [
  {
    symbol: 'AAPL', name: 'Apple', totalShares: 150, avgCost: 142.50, currentPrice: 185.92,
    lots: [
      { date: '2022-03-15', shares: 50, costBasis: 165.20, currentPrice: 185.92, holdingPeriod: 'long' },
      { date: '2022-10-28', shares: 50, costBasis: 142.80, currentPrice: 185.92, holdingPeriod: 'long' },
      { date: '2023-06-12', shares: 50, costBasis: 119.50, currentPrice: 185.92, holdingPeriod: 'long' },
    ],
  },
  {
    symbol: 'NVDA', name: 'NVIDIA', totalShares: 40, avgCost: 285.00, currentPrice: 547.10,
    lots: [
      { date: '2023-01-20', shares: 20, costBasis: 195.50, currentPrice: 547.10, holdingPeriod: 'long' },
      { date: '2023-08-15', shares: 10, costBasis: 425.80, currentPrice: 547.10, holdingPeriod: 'short' },
      { date: '2023-11-02', shares: 10, costBasis: 418.70, currentPrice: 547.10, holdingPeriod: 'short' },
    ],
  },
  {
    symbol: 'MSFT', name: 'Microsoft', totalShares: 30, avgCost: 310.50, currentPrice: 388.47,
    lots: [
      { date: '2022-06-10', shares: 15, costBasis: 265.20, currentPrice: 388.47, holdingPeriod: 'long' },
      { date: '2023-04-22', shares: 15, costBasis: 355.80, currentPrice: 388.47, holdingPeriod: 'long' },
    ],
  },
];

export default function CostBasisPage() {
  const totalCost = POSITIONS.reduce((s, p) => s + p.avgCost * p.totalShares, 0);
  const totalValue = POSITIONS.reduce((s, p) => s + p.currentPrice * p.totalShares, 0);
  const totalGain = totalValue - totalCost;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cost Basis & Tax Lots</h1>
        <p className="mt-1 text-sm text-gray-500">Track purchase lots and holding periods for tax reporting</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Total Cost</p><p className="text-lg font-bold text-white">{formatCurrency(totalCost)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Market Value</p><p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Unrealized Gain</p><p className={cn('text-lg font-bold', totalGain >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(totalGain)}</p></Card>
      </div>

      {POSITIONS.map((pos) => {
        const posGain = (pos.currentPrice - pos.avgCost) * pos.totalShares;
        const posGainPct = ((pos.currentPrice - pos.avgCost) / pos.avgCost) * 100;
        return (
          <Card key={pos.symbol}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="text-indigo-400">{pos.symbol}</span> <span className="text-gray-500 font-normal">{pos.name}</span>
              </CardTitle>
              <div className="text-right">
                <p className="text-sm font-mono text-white">{formatCurrency(pos.currentPrice * pos.totalShares)}</p>
                <p className={cn('text-[10px] font-mono', posGain >= 0 ? 'text-green-400' : 'text-red-400')}>{posGain >= 0 ? '+' : ''}{formatCurrency(posGain)} ({posGainPct.toFixed(1)}%)</p>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="text-gray-500 border-b border-white/5">
                  <th className="text-left py-1.5 px-2 font-medium">Date</th>
                  <th className="text-right py-1.5 px-2 font-medium">Shares</th>
                  <th className="text-right py-1.5 px-2 font-medium">Cost</th>
                  <th className="text-right py-1.5 px-2 font-medium">Gain</th>
                  <th className="text-center py-1.5 px-2 font-medium">Term</th>
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {pos.lots.map((lot, i) => {
                    const lotGain = (lot.currentPrice - lot.costBasis) * lot.shares;
                    return (
                      <tr key={i}>
                        <td className="py-1.5 px-2 text-gray-300">{lot.date}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-white">{lot.shares}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-gray-400">${lot.costBasis.toFixed(2)}</td>
                        <td className={cn('py-1.5 px-2 text-right font-mono', lotGain >= 0 ? 'text-green-400' : 'text-red-400')}>{formatCurrency(lotGain)}</td>
                        <td className="py-1.5 px-2 text-center"><Badge variant={lot.holdingPeriod === 'long' ? 'success' : 'warning'} className="text-[8px]">{lot.holdingPeriod === 'long' ? 'LTCG' : 'STCG'}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        );
      })}
    </motion.div>
  );
}
