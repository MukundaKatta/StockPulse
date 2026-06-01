'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Sunrise } from 'lucide-react';

interface EarlyMover {
  symbol: string;
  company: string;
  preMarketPrice: number;
  prevClose: number;
  change: number;
  volume: string;
  catalyst: string;
  direction: 'Up' | 'Down';
}

const MOVERS: EarlyMover[] = [
  { symbol: 'SMCI', company: 'Super Micro Computer', preMarketPrice: 892.50, prevClose: 845.20, change: 5.6, volume: '1.2M', catalyst: 'Earnings Beat', direction: 'Up' },
  { symbol: 'RIVN', company: 'Rivian Automotive', preMarketPrice: 12.80, prevClose: 14.50, change: -11.7, volume: '3.5M', catalyst: 'Delivery Miss', direction: 'Down' },
  { symbol: 'CRWD', company: 'CrowdStrike', preMarketPrice: 342.60, prevClose: 328.40, change: 4.3, volume: '850K', catalyst: 'Analyst Upgrade', direction: 'Up' },
  { symbol: 'MRNA', company: 'Moderna', preMarketPrice: 98.40, prevClose: 108.20, change: -9.1, volume: '2.1M', catalyst: 'Trial Data', direction: 'Down' },
  { symbol: 'PLTR', company: 'Palantir', preMarketPrice: 24.80, prevClose: 23.10, change: 7.4, volume: '4.8M', catalyst: 'Gov Contract', direction: 'Up' },
  { symbol: 'COIN', company: 'Coinbase', preMarketPrice: 225.40, prevClose: 218.60, change: 3.1, volume: '680K', catalyst: 'Crypto Rally', direction: 'Up' },
  { symbol: 'SNAP', company: 'Snap Inc', preMarketPrice: 11.20, prevClose: 12.80, change: -12.5, volume: '5.2M', catalyst: 'Revenue Warning', direction: 'Down' },
  { symbol: 'ARM', company: 'ARM Holdings', preMarketPrice: 158.90, prevClose: 148.50, change: 7.0, volume: '1.8M', catalyst: 'AI Partnership', direction: 'Up' },
];

const dirVariant = (d: string) => d === 'Up' ? 'success' : 'danger';

export default function EarlyMoversPage() {
  const gainers = MOVERS.filter(m => m.direction === 'Up').length;
  const losers = MOVERS.filter(m => m.direction === 'Down').length;
  const avgMove = MOVERS.reduce((s, m) => s + Math.abs(m.change), 0) / MOVERS.length;
  const biggestMove = Math.max(...MOVERS.map(m => Math.abs(m.change)));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Pre-Market Early Movers</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks with significant pre-market activity</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers</p><p className="text-lg font-bold text-green-400">{gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Losers</p><p className="text-lg font-bold text-red-400">{losers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Move</p><p className="text-lg font-bold text-white">{avgMove.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Biggest Move</p><p className="text-lg font-bold text-indigo-400">{biggestMove.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Sunrise className="h-4 w-4 text-indigo-400" /> Pre-Market Movers</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {MOVERS.map((m) => (
            <div key={m.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{m.symbol} <span className="text-gray-500">{m.company}</span></p>
                <p className="text-xs text-gray-500">{m.catalyst} &middot; Vol {m.volume}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(m.preMarketPrice)}</p>
                  <p className={cn('text-[10px] font-mono', m.change >= 0 ? 'text-green-400' : 'text-red-400')}>{m.change >= 0 ? '+' : ''}{m.change}%</p>
                </div>
                <Badge variant={dirVariant(m.direction)}>{m.direction}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
