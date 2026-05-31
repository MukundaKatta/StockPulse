'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { Coins } from 'lucide-react';

interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  rank: number;
}

const ASSETS: CryptoAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 48250, change24h: 2.8, change7d: 8.5, marketCap: 945e9, volume24h: 28.5e9, rank: 1 },
  { symbol: 'ETH', name: 'Ethereum', price: 2520, change24h: 1.5, change7d: 5.2, marketCap: 303e9, volume24h: 14.2e9, rank: 2 },
  { symbol: 'BNB', name: 'Binance Coin', price: 310, change24h: -0.8, change7d: 2.1, marketCap: 47.5e9, volume24h: 1.2e9, rank: 3 },
  { symbol: 'SOL', name: 'Solana', price: 102.50, change24h: 5.2, change7d: 15.8, marketCap: 45.2e9, volume24h: 3.8e9, rank: 4 },
  { symbol: 'XRP', name: 'Ripple', price: 0.52, change24h: -1.2, change7d: -3.5, marketCap: 28.4e9, volume24h: 1.5e9, rank: 5 },
  { symbol: 'ADA', name: 'Cardano', price: 0.58, change24h: 3.1, change7d: 8.2, marketCap: 20.5e9, volume24h: 0.8e9, rank: 6 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.082, change24h: -2.5, change7d: -5.8, marketCap: 11.8e9, volume24h: 0.6e9, rank: 7 },
  { symbol: 'AVAX', name: 'Avalanche', price: 36.80, change24h: 4.5, change7d: 12.4, marketCap: 13.6e9, volume24h: 0.9e9, rank: 8 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.45, change24h: 1.8, change7d: 4.2, marketCap: 10.2e9, volume24h: 0.5e9, rank: 9 },
  { symbol: 'LINK', name: 'Chainlink', price: 18.20, change24h: 2.2, change7d: 6.8, marketCap: 10.8e9, volume24h: 0.7e9, rank: 10 },
];

export default function CryptoScreenerPage() {
  const totalMcap = ASSETS.reduce((s, a) => s + a.marketCap, 0);
  const gainers = ASSETS.filter((a) => a.change24h > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Top cryptocurrencies by market capitalization</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Total MCap</p>
          <p className="text-lg font-bold text-white">{formatLargeNumber(totalMcap)}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">BTC Dominance</p>
          <p className="text-lg font-bold text-yellow-400">{((ASSETS[0].marketCap / totalMcap) * 100).toFixed(1)}%</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">24h Gainers</p>
          <p className="text-lg font-bold text-green-400">{gainers}/{ASSETS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Coins className="h-4 w-4 text-yellow-400" /> Market Overview
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {ASSETS.map((a) => (
            <div key={a.symbol} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-6">#{a.rank}</span>
              <div className="w-20">
                <p className="text-xs font-bold text-white">{a.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{a.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-20">${a.price < 1 ? a.price.toFixed(4) : a.price.toLocaleString()}</span>
              <span className={cn('text-xs font-mono w-14', a.change24h >= 0 ? 'text-green-400' : 'text-red-400')}>
                {a.change24h >= 0 ? '+' : ''}{a.change24h.toFixed(1)}%
              </span>
              <span className={cn('text-xs font-mono w-14', a.change7d >= 0 ? 'text-green-400' : 'text-red-400')}>
                {a.change7d >= 0 ? '+' : ''}{a.change7d.toFixed(1)}%
              </span>
              <span className="text-[10px] text-gray-500 w-16 text-right">{formatLargeNumber(a.marketCap)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
