'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoHolding {
  symbol: string;
  name: string;
  amount: number;
  avgCost: number;
  currentPrice: number;
  change24h: number;
  allocation: number;
}

const HOLDINGS: CryptoHolding[] = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.85, avgCost: 28500, currentPrice: 43250, change24h: 2.98, allocation: 42 },
  { symbol: 'ETH', name: 'Ethereum', amount: 8.5, avgCost: 1800, currentPrice: 2280, change24h: 1.52, allocation: 22 },
  { symbol: 'SOL', name: 'Solana', amount: 120, avgCost: 25, currentPrice: 98.5, change24h: 5.2, allocation: 14 },
  { symbol: 'LINK', name: 'Chainlink', amount: 350, avgCost: 7.5, currentPrice: 15.8, change24h: -1.3, allocation: 6 },
  { symbol: 'DOT', name: 'Polkadot', amount: 500, avgCost: 5.2, currentPrice: 7.85, change24h: -0.8, allocation: 4 },
  { symbol: 'AVAX', name: 'Avalanche', amount: 80, avgCost: 15, currentPrice: 38.2, change24h: 3.1, allocation: 3 },
  { symbol: 'MATIC', name: 'Polygon', amount: 3000, avgCost: 0.85, currentPrice: 0.92, change24h: -2.1, allocation: 3 },
  { symbol: 'UNI', name: 'Uniswap', amount: 200, avgCost: 5.5, currentPrice: 7.15, change24h: 0.8, allocation: 2 },
];

export default function CryptoPortfolioPage() {
  const totalValue = HOLDINGS.reduce((s, h) => s + h.amount * h.currentPrice, 0);
  const totalCost = HOLDINGS.reduce((s, h) => s + h.amount * h.avgCost, 0);
  const totalPnL = totalValue - totalCost;
  const totalPnLPercent = (totalPnL / totalCost) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Portfolio</h1>
        <p className="mt-1 text-sm text-gray-500">Digital asset holdings and performance</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Portfolio Value</p>
          <p className="text-lg font-bold text-white">{formatCurrency(totalValue)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total P&L</p>
          <p className={cn('text-lg font-bold', totalPnL >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Return</p>
          <p className={cn('text-lg font-bold', totalPnLPercent >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(1)}%
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bitcoin className="h-4 w-4 text-yellow-500" /> Holdings
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.map((h) => {
            const value = h.amount * h.currentPrice;
            const cost = h.amount * h.avgCost;
            const pnl = value - cost;
            const pnlPercent = (pnl / cost) * 100;
            return (
              <div key={h.symbol} className="flex items-center gap-3 py-2.5 px-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-indigo-400">
                  {h.symbol.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{h.name}</span>
                    <span className="text-[10px] text-gray-500">{h.amount} {h.symbol}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-500">Avg: ${h.avgCost.toLocaleString()}</span>
                    <span className={cn('text-[10px]', h.change24h >= 0 ? 'text-green-400' : 'text-red-400')}>
                      24h: {h.change24h >= 0 ? '+' : ''}{h.change24h.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(value)}</p>
                  <p className={cn('text-[10px] font-mono', pnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
