'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { LayoutGrid } from 'lucide-react';

interface SectorStock {
  symbol: string;
  change: number;
  weight: number;
}

interface SectorGroup {
  name: string;
  change: number;
  stocks: SectorStock[];
}

const SECTORS: SectorGroup[] = [
  { name: 'Technology', change: 1.8, stocks: [
    { symbol: 'AAPL', change: 1.2, weight: 25 }, { symbol: 'MSFT', change: 0.8, weight: 22 },
    { symbol: 'NVDA', change: 3.5, weight: 18 }, { symbol: 'GOOGL', change: -0.5, weight: 15 },
    { symbol: 'META', change: 1.5, weight: 10 }, { symbol: 'AVGO', change: 2.1, weight: 10 },
  ]},
  { name: 'Healthcare', change: -0.3, stocks: [
    { symbol: 'UNH', change: -1.5, weight: 30 }, { symbol: 'JNJ', change: -0.2, weight: 25 },
    { symbol: 'LLY', change: 2.8, weight: 25 }, { symbol: 'PFE', change: -1.2, weight: 20 },
  ]},
  { name: 'Financials', change: 0.8, stocks: [
    { symbol: 'JPM', change: 0.3, weight: 30 }, { symbol: 'BAC', change: 0.4, weight: 20 },
    { symbol: 'GS', change: 1.2, weight: 25 }, { symbol: 'V', change: 0.6, weight: 25 },
  ]},
  { name: 'Energy', change: -1.2, stocks: [
    { symbol: 'XOM', change: -1.8, weight: 35 }, { symbol: 'CVX', change: -1.5, weight: 30 },
    { symbol: 'COP', change: -0.8, weight: 20 }, { symbol: 'SLB', change: -2.2, weight: 15 },
  ]},
  { name: 'Consumer', change: 0.5, stocks: [
    { symbol: 'AMZN', change: 2.1, weight: 35 }, { symbol: 'TSLA', change: -2.8, weight: 25 },
    { symbol: 'HD', change: 0.9, weight: 20 }, { symbol: 'NKE', change: 0.4, weight: 20 },
  ]},
];

function getHeatColor(change: number): string {
  if (change >= 3) return 'bg-green-600/80 text-white';
  if (change >= 2) return 'bg-green-600/60 text-white';
  if (change >= 1) return 'bg-green-600/40 text-white';
  if (change >= 0) return 'bg-green-600/20 text-green-200';
  if (change >= -1) return 'bg-red-600/20 text-red-200';
  if (change >= -2) return 'bg-red-600/40 text-white';
  return 'bg-red-600/60 text-white';
}

export default function SectorHeatmapPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Heatmap</h1>
        <p className="mt-1 text-sm text-gray-500">Visual sector breakdown by constituent performance</p>
      </div>

      <div className="space-y-4">
        {SECTORS.map((sector) => (
          <Card key={sector.name} className="!p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">{sector.name}</span>
              <span className={cn('text-xs font-mono font-medium', sector.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(1)}%
              </span>
            </div>
            <div className="flex gap-1 h-12">
              {sector.stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={cn('rounded flex flex-col items-center justify-center transition-transform hover:scale-105', getHeatColor(stock.change))}
                  style={{ width: `${stock.weight}%` }}
                  title={`${stock.symbol}: ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(1)}%`}
                >
                  <span className="text-[10px] font-mono font-bold">{stock.symbol}</span>
                  <span className="text-[9px] font-mono">{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
