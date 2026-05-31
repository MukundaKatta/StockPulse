'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { LayoutGrid } from 'lucide-react';

interface TreemapStock {
  symbol: string;
  sector: string;
  marketCap: number;
  change: number;
}

const STOCKS: TreemapStock[] = [
  { symbol: 'AAPL', sector: 'Tech', marketCap: 2890, change: 0.65 },
  { symbol: 'MSFT', sector: 'Tech', marketCap: 2890, change: 1.09 },
  { symbol: 'GOOGL', sector: 'Tech', marketCap: 1780, change: 1.07 },
  { symbol: 'AMZN', sector: 'Tech', marketCap: 1600, change: 0.82 },
  { symbol: 'NVDA', sector: 'Tech', marketCap: 1350, change: 2.40 },
  { symbol: 'META', sector: 'Tech', marketCap: 950, change: 1.25 },
  { symbol: 'TSLA', sector: 'Cons.D', marketCap: 790, change: -0.42 },
  { symbol: 'BRK.B', sector: 'Finance', marketCap: 780, change: 0.15 },
  { symbol: 'JPM', sector: 'Finance', marketCap: 490, change: 0.28 },
  { symbol: 'V', sector: 'Finance', marketCap: 550, change: 0.55 },
  { symbol: 'UNH', sector: 'Health', marketCap: 480, change: -0.18 },
  { symbol: 'JNJ', sector: 'Health', marketCap: 382, change: -0.32 },
  { symbol: 'LLY', sector: 'Health', marketCap: 650, change: 1.85 },
  { symbol: 'XOM', sector: 'Energy', marketCap: 420, change: -0.95 },
  { symbol: 'CVX', sector: 'Energy', marketCap: 290, change: -0.78 },
  { symbol: 'PG', sector: 'Cons.S', marketCap: 355, change: -0.12 },
  { symbol: 'KO', sector: 'Cons.S', marketCap: 255, change: -0.25 },
  { symbol: 'HD', sector: 'Cons.D', marketCap: 365, change: 0.42 },
  { symbol: 'MA', sector: 'Finance', marketCap: 385, change: 0.68 },
  { symbol: 'AVGO', sector: 'Tech', marketCap: 520, change: 1.92 },
];

function getCellColor(change: number): string {
  if (change >= 2) return 'bg-green-600';
  if (change >= 1) return 'bg-green-600/70';
  if (change >= 0.5) return 'bg-green-600/50';
  if (change >= 0) return 'bg-green-600/30';
  if (change >= -0.5) return 'bg-red-600/30';
  if (change >= -1) return 'bg-red-600/50';
  return 'bg-red-600/70';
}

export default function FinvizMapPage() {
  const totalMC = STOCKS.reduce((s, st) => s + st.marketCap, 0);

  const sectors = [...new Set(STOCKS.map((s) => s.sector))];
  const sectorData = sectors.map((sector) => {
    const stocks = STOCKS.filter((s) => s.sector === sector).sort((a, b) => b.marketCap - a.marketCap);
    const sectorMC = stocks.reduce((s, st) => s + st.marketCap, 0);
    return { sector, stocks, sectorMC, weight: (sectorMC / totalMC) * 100 };
  }).sort((a, b) => b.sectorMC - a.sectorMC);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Treemap</h1>
        <p className="mt-1 text-sm text-gray-500">Size by market cap, color by daily change</p>
      </div>

      <Card className="!p-3">
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
          {STOCKS.sort((a, b) => b.marketCap - a.marketCap).map((stock) => {
            const size = Math.max(1, Math.round((stock.marketCap / totalMC) * 24));
            return (
              <div
                key={stock.symbol}
                className={cn('rounded-md p-1.5 flex flex-col items-center justify-center', getCellColor(stock.change))}
                style={{ gridColumn: `span ${Math.min(size, 3)}`, gridRow: `span ${Math.max(1, Math.round(size / 3))}` }}
              >
                <span className="text-[10px] font-bold text-white">{stock.symbol}</span>
                <span className={cn('text-[9px] font-mono', stock.change >= 0 ? 'text-white/80' : 'text-white/80')}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><LayoutGrid className="h-4 w-4 text-indigo-400" /> By Sector</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {sectorData.map((sd) => (
            <div key={sd.sector} className="py-2.5 px-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-gray-300">{sd.sector}</span>
                <span className="text-[10px] text-gray-500">{sd.weight.toFixed(1)}% of map</span>
              </div>
              <div className="flex gap-1">
                {sd.stocks.map((st) => (
                  <div key={st.symbol} className={cn('rounded px-1.5 py-0.5 text-[9px]', getCellColor(st.change))}>
                    <span className="font-medium text-white">{st.symbol}</span>{' '}
                    <span className="text-white/70">{st.change >= 0 ? '+' : ''}{st.change.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
