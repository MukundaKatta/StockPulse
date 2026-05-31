'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

interface PremarketStock {
  symbol: string;
  name: string;
  lastClose: number;
  premarketPrice: number;
  change: number;
  volume: number;
  catalyst: string;
}

const PREMARKET: PremarketStock[] = [
  { symbol: 'NVDA', name: 'NVIDIA', lastClose: 875.20, premarketPrice: 892.50, change: 1.98, volume: 2800000, catalyst: 'AI chip demand' },
  { symbol: 'TSLA', name: 'Tesla', lastClose: 245.80, premarketPrice: 238.40, change: -3.01, volume: 4200000, catalyst: 'Delivery miss' },
  { symbol: 'AAPL', name: 'Apple', lastClose: 189.45, premarketPrice: 191.20, change: 0.92, volume: 1500000, catalyst: 'Upgrade by JPM' },
  { symbol: 'SMCI', name: 'Super Micro', lastClose: 285.50, premarketPrice: 298.80, change: 4.66, volume: 3100000, catalyst: 'Server revenue' },
  { symbol: 'PLTR', name: 'Palantir', lastClose: 22.80, premarketPrice: 23.95, change: 5.04, volume: 8500000, catalyst: 'DoD contract' },
  { symbol: 'AMD', name: 'AMD', lastClose: 172.60, premarketPrice: 175.40, change: 1.62, volume: 1800000, catalyst: 'MI300 orders' },
  { symbol: 'META', name: 'Meta', lastClose: 485.30, premarketPrice: 478.60, change: -1.38, volume: 950000, catalyst: 'EU regulation' },
  { symbol: 'COIN', name: 'Coinbase', lastClose: 145.20, premarketPrice: 152.80, change: 5.23, volume: 2200000, catalyst: 'BTC rally' },
];

export default function PremarketPage() {
  const gainers = PREMARKET.filter((s) => s.change > 0).sort((a, b) => b.change - a.change);
  const losers = PREMARKET.filter((s) => s.change < 0).sort((a, b) => a.change - b.change);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Pre-Market Movers</h1>
          <p className="mt-1 text-sm text-gray-500">Stocks moving in pre-market trading (4:00-9:30 AM ET)</p>
        </div>
        <Badge variant="warning">
          <Clock className="h-3 w-3 mr-1" /> Pre-Market
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gainers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-4 w-4" /> Gainers
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {gainers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between px-1 py-1.5 rounded hover:bg-white/[0.02]">
                <div>
                  <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                  <p className="text-[10px] text-gray-500">{stock.catalyst}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(stock.premarketPrice)}</p>
                  <p className="text-xs font-mono text-green-400">+{stock.change.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Losers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <TrendingDown className="h-4 w-4" /> Losers
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {losers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between px-1 py-1.5 rounded hover:bg-white/[0.02]">
                <div>
                  <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                  <p className="text-[10px] text-gray-500">{stock.catalyst}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(stock.premarketPrice)}</p>
                  <p className="text-xs font-mono text-red-400">{stock.change.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Volume Leaders */}
      <Card>
        <CardHeader>
          <CardTitle>Volume Leaders</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-4 gap-2">
          {[...PREMARKET].sort((a, b) => b.volume - a.volume).slice(0, 4).map((stock) => (
            <div key={stock.symbol} className="text-center p-2 rounded-lg bg-white/[0.02]">
              <p className="font-mono font-bold text-xs text-indigo-400">{stock.symbol}</p>
              <p className="text-sm font-mono text-white mt-1">{formatLargeNumber(stock.volume)}</p>
              <p className={cn('text-[10px] font-mono', stock.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
