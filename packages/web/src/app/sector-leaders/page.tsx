'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/formatters';
import { Crown } from 'lucide-react';

interface Leader {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: string;
  pe: number;
  revenue: string;
}

const SECTORS: Record<string, Leader[]> = {
  Technology: [
    { symbol: 'AAPL', name: 'Apple', price: 186.05, change: 0.82, marketCap: '2.9T', pe: 29.4, revenue: '$383B' },
    { symbol: 'MSFT', name: 'Microsoft', price: 404.87, change: 0.50, marketCap: '3.0T', pe: 36.2, revenue: '$212B' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, change: 4.20, marketCap: '2.2T', pe: 68.5, revenue: '$61B' },
  ],
  Healthcare: [
    { symbol: 'UNH', name: 'UnitedHealth', price: 528.40, change: -0.40, marketCap: '490B', pe: 21.2, revenue: '$372B' },
    { symbol: 'JNJ', name: 'J&J', price: 156.80, change: 0.30, marketCap: '$378B', pe: 18.5, revenue: '$85B' },
    { symbol: 'LLY', name: 'Eli Lilly', price: 742.50, change: 1.80, marketCap: '$706B', pe: 108.2, revenue: '$34B' },
  ],
  Financials: [
    { symbol: 'BRK.B', name: 'Berkshire', price: 388.20, change: 0.60, marketCap: '$850B', pe: 9.8, revenue: '$302B' },
    { symbol: 'JPM', name: 'JP Morgan', price: 182.40, change: 0.30, marketCap: '$528B', pe: 11.4, revenue: '$158B' },
    { symbol: 'V', name: 'Visa', price: 278.90, change: 0.60, marketCap: '$572B', pe: 30.8, revenue: '$33B' },
  ],
  Energy: [
    { symbol: 'XOM', name: 'Exxon Mobil', price: 104.20, change: -1.20, marketCap: '$420B', pe: 11.8, revenue: '$345B' },
    { symbol: 'CVX', name: 'Chevron', price: 148.50, change: -0.80, marketCap: '$280B', pe: 12.4, revenue: '$197B' },
    { symbol: 'COP', name: 'ConocoPhillips', price: 112.40, change: -1.50, marketCap: '$135B', pe: 13.2, revenue: '$58B' },
  ],
};

const SECTOR_NAMES = Object.keys(SECTORS);

export default function SectorLeadersPage() {
  const [active, setActive] = useState(SECTOR_NAMES[0]);
  const leaders = SECTORS[active];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Leaders</h1>
        <p className="mt-1 text-sm text-gray-500">Top stocks by market cap in each sector</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SECTOR_NAMES.map((s) => (
          <Button key={s} variant={active === s ? 'primary' : 'ghost'} onClick={() => setActive(s)} className="text-xs">{s}</Button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Crown className="h-4 w-4 text-amber-400" /> {active} Leaders</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {leaders.map((l, i) => (
            <div key={l.symbol} className="px-4 py-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn('text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center', i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-gray-400/20 text-gray-300' : 'bg-orange-500/20 text-orange-400')}>
                    {i + 1}
                  </span>
                  <span className="text-xs font-bold text-white">{l.symbol}</span>
                  <span className="text-[10px] text-gray-500">{l.name}</span>
                  {i === 0 && <Badge variant="warning">Leader</Badge>}
                </div>
                <span className="text-xs font-mono text-white">${l.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                <span className={cn('font-mono', l.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {l.change >= 0 ? '+' : ''}{l.change.toFixed(2)}%
                </span>
                <span className="text-gray-400">MCap: <span className="text-white font-mono">{l.marketCap}</span></span>
                <span className="text-gray-400">P/E: <span className="text-white font-mono">{l.pe.toFixed(1)}</span></span>
                <span className="text-gray-400">Revenue: <span className="text-white font-mono">{l.revenue}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
