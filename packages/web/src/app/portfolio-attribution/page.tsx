'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { PieChart } from 'lucide-react';

interface Attribution {
  symbol: string;
  name: string;
  weight: number;
  stockReturn: number;
  contribution: number;
  allocation: number;
  selection: number;
}

const ATTRIBUTIONS: Attribution[] = [
  { symbol: 'NVDA', name: 'NVIDIA', weight: 12, stockReturn: 42.5, contribution: 5.10, allocation: 1.2, selection: 3.9 },
  { symbol: 'META', name: 'Meta', weight: 8, stockReturn: 28.2, contribution: 2.26, allocation: 0.5, selection: 1.76 },
  { symbol: 'AAPL', name: 'Apple', weight: 10, stockReturn: 18.5, contribution: 1.85, allocation: 0.3, selection: 1.55 },
  { symbol: 'MSFT', name: 'Microsoft', weight: 9, stockReturn: 15.2, contribution: 1.37, allocation: 0.2, selection: 1.17 },
  { symbol: 'GOOGL', name: 'Alphabet', weight: 7, stockReturn: 12.8, contribution: 0.90, allocation: 0.1, selection: 0.80 },
  { symbol: 'JPM', name: 'JPMorgan', weight: 6, stockReturn: 8.5, contribution: 0.51, allocation: -0.1, selection: 0.61 },
  { symbol: 'VTI', name: 'Total Market', weight: 25, stockReturn: 22.5, contribution: 5.63, allocation: 0, selection: 0 },
  { symbol: 'BND', name: 'Total Bond', weight: 15, stockReturn: 4.2, contribution: 0.63, allocation: -0.5, selection: 0.2 },
  { symbol: 'XLE', name: 'Energy ETF', weight: 4, stockReturn: -5.8, contribution: -0.23, allocation: 0.1, selection: -0.33 },
  { symbol: 'CASH', name: 'Cash', weight: 4, stockReturn: 5.2, contribution: 0.21, allocation: -0.2, selection: 0 },
];

export default function PortfolioAttributionPage() {
  const totalReturn = ATTRIBUTIONS.reduce((s, a) => s + a.contribution, 0);
  const benchmarkReturn = 22.5;
  const activeReturn = totalReturn - benchmarkReturn;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Performance Attribution</h1>
        <p className="mt-1 text-sm text-gray-500">Brinson attribution analysis vs S&P 500</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Portfolio Return</p><p className="text-lg font-bold text-green-400">+{totalReturn.toFixed(2)}%</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Benchmark</p><p className="text-lg font-bold text-white">+{benchmarkReturn.toFixed(2)}%</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Active Return</p><p className={cn('text-lg font-bold', activeReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{activeReturn >= 0 ? '+' : ''}{activeReturn.toFixed(2)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><PieChart className="h-4 w-4 text-indigo-400" /> Contribution Breakdown</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2 font-medium">Holding</th>
              <th className="text-right py-2 px-2 font-medium">Weight</th>
              <th className="text-right py-2 px-2 font-medium">Return</th>
              <th className="text-right py-2 px-2 font-medium">Contribution</th>
              <th className="text-right py-2 px-2 font-medium">Allocation</th>
              <th className="text-right py-2 px-2 font-medium">Selection</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {[...ATTRIBUTIONS].sort((a, b) => b.contribution - a.contribution).map((a) => (
                <tr key={a.symbol} className="hover:bg-white/[0.02]">
                  <td className="py-2 px-2"><span className="text-indigo-400 font-medium">{a.symbol}</span> <span className="text-gray-500">{a.name}</span></td>
                  <td className="py-2 px-2 text-right font-mono text-gray-300">{a.weight}%</td>
                  <td className={cn('py-2 px-2 text-right font-mono', a.stockReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{a.stockReturn >= 0 ? '+' : ''}{a.stockReturn.toFixed(1)}%</td>
                  <td className={cn('py-2 px-2 text-right font-mono font-medium', a.contribution >= 0 ? 'text-green-400' : 'text-red-400')}>{a.contribution >= 0 ? '+' : ''}{a.contribution.toFixed(2)}%</td>
                  <td className={cn('py-2 px-2 text-right font-mono', a.allocation >= 0 ? 'text-green-400' : 'text-red-400')}>{a.allocation >= 0 ? '+' : ''}{a.allocation.toFixed(2)}%</td>
                  <td className={cn('py-2 px-2 text-right font-mono', a.selection >= 0 ? 'text-green-400' : 'text-red-400')}>{a.selection >= 0 ? '+' : ''}{a.selection.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
