'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

interface HeatmapStock {
  symbol: string;
  name: string;
  change: number;
  marketCap: number;
}

const STOCKS: HeatmapStock[] = [
  { symbol: 'AAPL', name: 'Apple', change: 1.2, marketCap: 2950 },
  { symbol: 'MSFT', name: 'Microsoft', change: 0.8, marketCap: 3100 },
  { symbol: 'GOOGL', name: 'Alphabet', change: -0.5, marketCap: 1960 },
  { symbol: 'AMZN', name: 'Amazon', change: 2.1, marketCap: 1850 },
  { symbol: 'NVDA', name: 'NVIDIA', change: 3.5, marketCap: 2150 },
  { symbol: 'TSLA', name: 'Tesla', change: -2.8, marketCap: 780 },
  { symbol: 'META', name: 'Meta', change: 1.5, marketCap: 1250 },
  { symbol: 'JPM', name: 'JPMorgan', change: 0.3, marketCap: 580 },
  { symbol: 'V', name: 'Visa', change: 0.6, marketCap: 540 },
  { symbol: 'JNJ', name: 'J&J', change: -0.2, marketCap: 420 },
  { symbol: 'WMT', name: 'Walmart', change: 1.1, marketCap: 520 },
  { symbol: 'PG', name: 'P&G', change: -0.4, marketCap: 380 },
  { symbol: 'UNH', name: 'UnitedHealth', change: -1.5, marketCap: 480 },
  { symbol: 'HD', name: 'Home Depot', change: 0.9, marketCap: 370 },
  { symbol: 'BAC', name: 'Bank of America', change: 0.4, marketCap: 295 },
  { symbol: 'XOM', name: 'Exxon', change: -1.8, marketCap: 450 },
  { symbol: 'DIS', name: 'Disney', change: 2.2, marketCap: 210 },
  { symbol: 'NFLX', name: 'Netflix', change: 1.8, marketCap: 245 },
  { symbol: 'AMD', name: 'AMD', change: 2.8, marketCap: 280 },
  { symbol: 'CRM', name: 'Salesforce', change: -0.6, marketCap: 260 },
];

function getCellBg(change: number): string {
  if (change >= 3) return 'bg-green-600/80';
  if (change >= 2) return 'bg-green-600/60';
  if (change >= 1) return 'bg-green-600/40';
  if (change >= 0) return 'bg-green-600/20';
  if (change >= -1) return 'bg-red-600/20';
  if (change >= -2) return 'bg-red-600/40';
  if (change >= -3) return 'bg-red-600/60';
  return 'bg-red-600/80';
}

export default function WatchlistHeatmapPage() {
  const totalCap = useMemo(() => STOCKS.reduce((s, st) => s + st.marketCap, 0), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Heatmap</h1>
        <p className="mt-1 text-sm text-gray-500">Visual overview of market performance by market cap</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-indigo-400" />
            S&P 500 Heatmap
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-1">
          {STOCKS.map((stock) => {
            const relativeSize = stock.marketCap / totalCap;
            const minHeight = 60;
            const maxHeight = 120;
            const height = minHeight + relativeSize * (maxHeight - minHeight) * 10;
            return (
              <Link
                key={stock.symbol}
                href={`/stock/${stock.symbol}`}
                className={cn('rounded-lg p-2 flex flex-col items-center justify-center text-center transition-transform hover:scale-105', getCellBg(stock.change))}
                style={{ minHeight: `${Math.min(height, maxHeight)}px` }}
              >
                <span className="font-mono font-bold text-xs text-white">{stock.symbol}</span>
                <span className={cn('font-mono text-[11px] font-medium', stock.change >= 0 ? 'text-green-200' : 'text-red-200')}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-600/60" /><span>{`< -2%`}</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-600/20" /><span>-1%</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600/20" /><span>+1%</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600/60" /><span>{`> +2%`}</span></div>
        </div>
      </Card>
    </motion.div>
  );
}
