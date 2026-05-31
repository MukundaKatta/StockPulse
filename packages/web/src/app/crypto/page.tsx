'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sparkline } from '@/components/ui/sparkline';
import { formatCurrency, formatLargeNumber, formatPercent, cn } from '@/lib/formatters';
import { Bitcoin, Search, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
}

function generateCryptoSparkline(price: number, change: number): number[] {
  const points: number[] = [];
  const startPrice = price / (1 + change / 100);
  for (let i = 0; i <= 24; i++) {
    const progress = i / 24;
    const noise = (Math.random() - 0.5) * price * 0.005;
    points.push(startPrice + (price - startPrice) * progress + noise);
  }
  return points;
}

const CRYPTO_DATA: CryptoAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67430.25, change24h: 2.34, marketCap: 1324000000000, volume24h: 28500000000, sparkline: [] },
  { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change24h: 1.89, marketCap: 415000000000, volume24h: 14200000000, sparkline: [] },
  { symbol: 'SOL', name: 'Solana', price: 178.45, change24h: -1.23, marketCap: 79000000000, volume24h: 3200000000, sparkline: [] },
  { symbol: 'BNB', name: 'Binance Coin', price: 612.30, change24h: 0.45, marketCap: 91000000000, volume24h: 1800000000, sparkline: [] },
  { symbol: 'XRP', name: 'Ripple', price: 0.5234, change24h: -0.87, marketCap: 28000000000, volume24h: 1100000000, sparkline: [] },
  { symbol: 'ADA', name: 'Cardano', price: 0.4567, change24h: 3.21, marketCap: 16000000000, volume24h: 890000000, sparkline: [] },
  { symbol: 'AVAX', name: 'Avalanche', price: 38.92, change24h: -2.10, marketCap: 14500000000, volume24h: 650000000, sparkline: [] },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.1523, change24h: 5.67, marketCap: 21000000000, volume24h: 1500000000, sparkline: [] },
  { symbol: 'DOT', name: 'Polkadot', price: 7.34, change24h: -0.34, marketCap: 9800000000, volume24h: 420000000, sparkline: [] },
  { symbol: 'LINK', name: 'Chainlink', price: 14.89, change24h: 1.56, marketCap: 8700000000, volume24h: 380000000, sparkline: [] },
].map((c) => ({ ...c, sparkline: generateCryptoSparkline(c.price, c.change24h) }));

export default function CryptoPage() {
  const [search, setSearch] = useState('');

  const filtered = CRYPTO_DATA.filter((c) =>
    c.symbol.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalMarketCap = CRYPTO_DATA.reduce((sum, c) => sum + c.marketCap, 0);
  const totalVolume = CRYPTO_DATA.reduce((sum, c) => sum + c.volume24h, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Markets</h1>
          <p className="mt-1 text-sm text-gray-500">Track cryptocurrency prices and market data</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 w-48"
            />
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">Total Market Cap</p>
          <p className="mt-1 text-lg font-bold text-white">{formatLargeNumber(totalMarketCap)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">24h Volume</p>
          <p className="mt-1 text-lg font-bold text-white">{formatLargeNumber(totalVolume)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">BTC Dominance</p>
          <p className="mt-1 text-lg font-bold text-white">
            {((CRYPTO_DATA[0].marketCap / totalMarketCap) * 100).toFixed(1)}%
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">#</th>
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Asset</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">Price</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500">24h</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500 hidden sm:table-cell">Market Cap</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500 hidden md:table-cell">Volume</th>
                <th className="px-3 py-2.5 text-right text-xs font-medium uppercase text-gray-500 hidden lg:table-cell">7D Chart</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((crypto, idx) => (
                <tr key={crypto.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-3 text-xs text-gray-500">{idx + 1}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10">
                        <Bitcoin className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-white">{crypto.symbol}</span>
                        <p className="text-[10px] text-gray-500">{crypto.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-white">
                    {crypto.price < 1 ? `$${crypto.price.toFixed(4)}` : formatCurrency(crypto.price)}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={cn(
                      'inline-flex items-center gap-0.5 font-mono text-xs font-medium',
                      crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    )}>
                      {crypto.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(crypto.change24h).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-gray-400 hidden sm:table-cell">
                    {formatLargeNumber(crypto.marketCap)}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-gray-500 text-xs hidden md:table-cell">
                    {formatLargeNumber(crypto.volume24h)}
                  </td>
                  <td className="px-3 py-3 text-right hidden lg:table-cell">
                    <Sparkline data={crypto.sparkline} width={60} height={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
