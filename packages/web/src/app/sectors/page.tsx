'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

interface SectorData {
  name: string;
  etf: string;
  stocks: string[];
  performance: number;
}

const SECTORS: SectorData[] = [
  { name: 'Technology', etf: 'XLK', stocks: ['AAPL', 'MSFT', 'NVDA', 'AVGO'] },
  { name: 'Healthcare', etf: 'XLV', stocks: ['UNH', 'JNJ', 'LLY', 'ABBV'] },
  { name: 'Financials', etf: 'XLF', stocks: ['JPM', 'V', 'MA', 'BAC'] },
  { name: 'Consumer Disc.', etf: 'XLY', stocks: ['AMZN', 'TSLA', 'HD', 'MCD'] },
  { name: 'Communication', etf: 'XLC', stocks: ['META', 'GOOGL', 'NFLX', 'DIS'] },
  { name: 'Industrials', etf: 'XLI', stocks: ['CAT', 'GE', 'HON', 'UPS'] },
  { name: 'Energy', etf: 'XLE', stocks: ['XOM', 'CVX', 'COP', 'SLB'] },
  { name: 'Consumer Staples', etf: 'XLP', stocks: ['PG', 'KO', 'PEP', 'WMT'] },
].map((s) => ({ ...s, performance: 0 }));

export default function SectorsPage() {
  const { data: sectors = SECTORS, isLoading } = useQuery({
    queryKey: ['sector-performance'],
    queryFn: async () => {
      const results = await Promise.allSettled(
        SECTORS.map(async (sector) => {
          const { data } = await api.get(`/api/stocks/${sector.etf}/quote`);
          return { ...sector, performance: data.quote?.changePercent || 0 };
        })
      );
      return results.map((r, i) =>
        r.status === 'fulfilled' ? r.value : SECTORS[i]
      );
    },
    staleTime: 60000,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sectors</h1>
        <p className="mt-1 text-sm text-gray-500">Market performance by sector</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sectors.map((sector) => {
          const isPositive = sector.performance >= 0;
          return (
            <Card key={sector.name} hover>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-white">{sector.name}</h3>
                <Badge variant={isPositive ? 'success' : 'danger'}>
                  {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                  {formatPercent(sector.performance)}
                </Badge>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <Link href={`/stock/${sector.etf}`} className="text-xs text-indigo-400 hover:text-indigo-300 font-mono">
                  {sector.etf}
                </Link>
              </div>
              <div className="flex flex-wrap gap-1">
                {sector.stocks.map((sym) => (
                  <Link
                    key={sym}
                    href={`/stock/${sym}`}
                    className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 hover:bg-white/10 hover:text-gray-200 transition-colors"
                  >
                    {sym}
                  </Link>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
