'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Coins } from 'lucide-react';

interface DigitalAsset {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  allocation: number;
  category: 'Layer 1' | 'DeFi' | 'Stablecoin' | 'NFT/Gaming';
}

const ASSETS: DigitalAsset[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: 67250.00, change24h: 2.45, marketCap: '$1.32T', volume24h: '$28.5B', allocation: 45, category: 'Layer 1' },
  { name: 'Ethereum', symbol: 'ETH', price: 3520.80, change24h: 1.82, marketCap: '$423B', volume24h: '$14.2B', allocation: 25, category: 'Layer 1' },
  { name: 'Solana', symbol: 'SOL', price: 148.60, change24h: -3.15, marketCap: '$65B', volume24h: '$3.8B', allocation: 10, category: 'Layer 1' },
  { name: 'Chainlink', symbol: 'LINK', price: 18.42, change24h: 4.20, marketCap: '$10.8B', volume24h: '$820M', allocation: 5, category: 'DeFi' },
  { name: 'Aave', symbol: 'AAVE', price: 112.30, change24h: -1.05, marketCap: '$1.6B', volume24h: '$210M', allocation: 5, category: 'DeFi' },
  { name: 'USDC', symbol: 'USDC', price: 1.00, change24h: 0.01, marketCap: '$34B', volume24h: '$6.2B', allocation: 8, category: 'Stablecoin' },
  { name: 'Immutable X', symbol: 'IMX', price: 2.85, change24h: 5.60, marketCap: '$4.2B', volume24h: '$180M', allocation: 2, category: 'NFT/Gaming' },
];

const catVariant = (c: string) => c === 'Layer 1' ? 'info' : c === 'DeFi' ? 'success' : c === 'Stablecoin' ? 'default' : 'warning';

export default function DigitalAssetsPage() {
  const totalAllocation = ASSETS.reduce((s, a) => s + a.allocation, 0);
  const portfolioChange = ASSETS.reduce((s, a) => s + a.change24h * (a.allocation / 100), 0);
  const gainers = ASSETS.filter(a => a.change24h > 0).length;
  const categories = new Set(ASSETS.map(a => a.category)).size;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Digital Assets</h1>
        <p className="mt-1 text-sm text-gray-500">Digital asset portfolio and allocation</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Assets</p><p className="text-lg font-bold text-white">{ASSETS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">24h Change</p><p className={cn('text-lg font-bold', portfolioChange >= 0 ? 'text-green-400' : 'text-red-400')}>{portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers</p><p className="text-lg font-bold text-green-400">{gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Categories</p><p className="text-lg font-bold text-indigo-400">{categories}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Coins className="h-4 w-4 text-indigo-400" /> Portfolio Holdings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ASSETS.map((a) => (
            <div key={a.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{a.symbol} <span className="text-gray-500">{a.name}</span></p>
                <p className="text-xs text-gray-500">MCap {a.marketCap} &middot; Vol {a.volume24h}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(a.price)}</p>
                  <p className={cn('text-[10px] font-mono', a.change24h >= 0 ? 'text-green-400' : 'text-red-400')}>{a.change24h >= 0 ? '+' : ''}{a.change24h}%</p>
                </div>
                <Badge variant={catVariant(a.category)}>{a.allocation}%</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
