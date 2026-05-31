'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';
import { cn } from '@/lib/formatters';
import Link from 'next/link';

interface HeatmapStock {
  symbol: string;
  name: string;
  change: number;
  marketCap: number;
  sector: string;
}

const SECTORS: Record<string, string[]> = {
  Technology: ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META', 'AVGO', 'ORCL', 'CRM'],
  'Consumer': ['AMZN', 'TSLA', 'HD', 'NKE', 'MCD', 'SBUX', 'TGT', 'COST'],
  Healthcare: ['UNH', 'JNJ', 'LLY', 'PFE', 'ABBV', 'MRK', 'TMO', 'ABT'],
  Financials: ['JPM', 'V', 'MA', 'BAC', 'GS', 'MS', 'BLK', 'AXP'],
  Energy: ['XOM', 'CVX', 'COP', 'SLB', 'EOG', 'MPC', 'VLO', 'PSX'],
};

function getChangeColor(change: number): string {
  if (change >= 3) return 'bg-green-500';
  if (change >= 2) return 'bg-green-500/80';
  if (change >= 1) return 'bg-green-500/60';
  if (change >= 0.5) return 'bg-green-500/40';
  if (change > 0) return 'bg-green-500/20';
  if (change === 0) return 'bg-gray-700';
  if (change > -0.5) return 'bg-red-500/20';
  if (change > -1) return 'bg-red-500/40';
  if (change > -2) return 'bg-red-500/60';
  if (change > -3) return 'bg-red-500/80';
  return 'bg-red-500';
}

export default function HeatmapPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const { data: stocks = [], isLoading } = useQuery({
    queryKey: ['heatmap-data'],
    queryFn: async () => {
      const allSymbols = Object.entries(SECTORS).flatMap(([sector, syms]) =>
        syms.map((s) => ({ symbol: s, sector }))
      );
      const batchSize = 5;
      const results: HeatmapStock[] = [];

      for (let i = 0; i < allSymbols.length; i += batchSize) {
        const batch = allSymbols.slice(i, i + batchSize);
        const batchResults = await Promise.allSettled(
          batch.map(async ({ symbol, sector }) => {
            const { data } = await api.get(`/api/stocks/${symbol}/quote`);
            const q = data.quote;
            return {
              symbol,
              name: symbol,
              change: q?.changePercent || 0,
              marketCap: 0,
              sector,
            } as HeatmapStock;
          })
        );
        for (const r of batchResults) {
          if (r.status === 'fulfilled') results.push(r.value);
        }
      }
      return results;
    },
    staleTime: 60000,
  });

  const filteredStocks = selectedSector
    ? stocks.filter((s) => s.sector === selectedSector)
    : stocks;

  const sectors = Object.keys(SECTORS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Heatmap</h1>
        <p className="mt-1 text-sm text-gray-500">Visual overview of market performance by sector</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedSector(null)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-medium transition-all border',
            !selectedSector
              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
              : 'bg-white/5 text-gray-500 border-white/[0.06] hover:text-gray-300'
          )}
        >
          All Sectors
        </button>
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all border',
              selectedSector === sector
                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                : 'bg-white/5 text-gray-500 border-white/[0.06] hover:text-gray-300'
            )}
          >
            {sector}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1.5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1.5">
          {filteredStocks.map((stock) => (
            <Link key={stock.symbol} href={`/stock/${stock.symbol}`}>
              <div
                className={cn(
                  'aspect-square rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:z-10 relative',
                  getChangeColor(stock.change)
                )}
              >
                <span className="text-xs font-bold text-white">{stock.symbol}</span>
                <span className={cn(
                  'text-[10px] font-mono font-medium',
                  stock.change >= 0 ? 'text-white/90' : 'text-white/90'
                )}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="flex items-center justify-center gap-1">
          <span className="text-xs text-gray-600">-3%</span>
          <div className="flex gap-0.5">
            {['bg-red-500', 'bg-red-500/60', 'bg-red-500/30', 'bg-gray-700', 'bg-green-500/30', 'bg-green-500/60', 'bg-green-500'].map((c) => (
              <div key={c} className={cn('h-3 w-6 rounded-sm', c)} />
            ))}
          </div>
          <span className="text-xs text-gray-600">+3%</span>
        </div>
      )}
    </motion.div>
  );
}
