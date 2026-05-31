'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Crown } from 'lucide-react';
import Link from 'next/link';

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  weight: number;
  dayChange: number;
  totalReturn: number;
  sector: string;
}

const HOLDINGS: Holding[] = [
  { symbol: 'NVDA', name: 'NVIDIA', shares: 15, avgCost: 450, currentPrice: 875.20, weight: 22.1, dayChange: 3.5, totalReturn: 94.5, sector: 'Technology' },
  { symbol: 'AAPL', name: 'Apple', shares: 50, avgCost: 155, currentPrice: 189.45, weight: 15.9, dayChange: 1.2, totalReturn: 22.2, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', shares: 20, avgCost: 340, currentPrice: 415.60, weight: 14.0, dayChange: 0.8, totalReturn: 22.2, sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla', shares: 25, avgCost: 280, currentPrice: 245.80, weight: 10.3, dayChange: -2.8, totalReturn: -12.2, sector: 'Consumer' },
  { symbol: 'AMZN', name: 'Amazon', shares: 30, avgCost: 145, currentPrice: 178.90, weight: 9.0, dayChange: 2.1, totalReturn: 23.4, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', shares: 40, avgCost: 130, currentPrice: 155.80, weight: 10.5, dayChange: -0.5, totalReturn: 19.8, sector: 'Technology' },
  { symbol: 'META', name: 'Meta', shares: 10, avgCost: 320, currentPrice: 485.30, weight: 8.2, dayChange: 1.5, totalReturn: 51.7, sector: 'Technology' },
  { symbol: 'AMD', name: 'AMD', shares: 35, avgCost: 160, currentPrice: 172.60, weight: 10.0, dayChange: -1.2, totalReturn: 7.9, sector: 'Technology' },
];

export default function TopHoldingsPage() {
  const totalValue = HOLDINGS.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Top Holdings</h1>
        <p className="mt-1 text-sm text-gray-500">Your largest portfolio positions by weight</p>
      </div>

      {/* Weight visualization */}
      <Card className="!p-4">
        <div className="h-8 rounded-full overflow-hidden flex">
          {HOLDINGS.map((h) => (
            <div key={h.symbol} className={cn('h-full transition-all', h.totalReturn >= 0 ? 'bg-green-500/60' : 'bg-red-500/60')}
              style={{ width: `${h.weight}%` }}
              title={`${h.symbol}: ${h.weight}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {HOLDINGS.slice(0, 5).map((h) => (
            <div key={h.symbol} className="flex items-center gap-1.5">
              <div className={cn('w-2.5 h-2.5 rounded-sm', h.totalReturn >= 0 ? 'bg-green-500/60' : 'bg-red-500/60')} />
              <span className="text-[10px] text-gray-400">{h.symbol} ({h.weight}%)</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Holdings List */}
      <div className="space-y-2">
        {HOLDINGS.map((h, i) => (
          <Card key={h.symbol} className="!p-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                {i === 0 ? <Crown className="h-3.5 w-3.5 text-amber-400" /> : <span className="text-xs font-mono text-gray-500">{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link href={`/stock/${h.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{h.symbol}</Link>
                  <span className="text-xs text-gray-500">{h.name}</span>
                  <Badge variant="info">{h.weight.toFixed(1)}%</Badge>
                </div>
                <p className="text-[10px] text-gray-600">{h.shares} shares @ avg {formatCurrency(h.avgCost)} • {h.sector}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-mono text-white">{formatCurrency(h.shares * h.currentPrice)}</p>
                <div className="flex items-center gap-2 justify-end">
                  <span className={cn('text-[10px] font-mono', h.dayChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {h.dayChange >= 0 ? '+' : ''}{h.dayChange.toFixed(1)}% today
                  </span>
                  <span className={cn('text-[10px] font-mono', h.totalReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {h.totalReturn >= 0 ? '+' : ''}{h.totalReturn.toFixed(1)}% total
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
