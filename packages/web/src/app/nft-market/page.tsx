'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Image } from 'lucide-react';

interface NftCollection {
  name: string;
  floorPrice: number;
  volume24h: number;
  change24h: number;
  owners: number;
  items: number;
}

const COLLECTIONS: NftCollection[] = [
  { name: 'Bored Ape YC', floorPrice: 28.5, volume24h: 420, change24h: 5.2, owners: 5400, items: 10000 },
  { name: 'CryptoPunks', floorPrice: 45.2, volume24h: 310, change24h: -2.1, owners: 3500, items: 10000 },
  { name: 'Mutant Apes', floorPrice: 5.8, volume24h: 180, change24h: 8.3, owners: 12000, items: 20000 },
  { name: 'Azuki', floorPrice: 6.9, volume24h: 95, change24h: -1.5, owners: 4800, items: 10000 },
  { name: 'Pudgy Penguins', floorPrice: 11.2, volume24h: 150, change24h: 12.4, owners: 4300, items: 8888 },
  { name: 'Doodles', floorPrice: 2.4, volume24h: 30, change24h: -4.8, owners: 4600, items: 10000 },
];

export default function NftMarketPage() {
  const totalVolume = COLLECTIONS.reduce((s, c) => s + c.volume24h, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">NFT Market</h1>
        <p className="mt-1 text-sm text-gray-500">Top collections and marketplace stats</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Collections</p>
          <p className="text-lg font-bold text-white">{COLLECTIONS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">24h Volume</p>
          <p className="text-lg font-bold text-white">{totalVolume} ETH</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Top Floor</p>
          <p className="text-lg font-bold text-indigo-400">{Math.max(...COLLECTIONS.map(c => c.floorPrice))} ETH</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Image className="inline h-4 w-4 mr-1" />Top Collections</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {COLLECTIONS.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{c.name}</p>
                <p className="text-xs text-gray-500">{c.owners.toLocaleString()} owners &middot; {c.items.toLocaleString()} items</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{c.floorPrice} ETH</p>
                  <p className="text-[10px] text-gray-500">{c.volume24h} ETH vol</p>
                </div>
                <Badge variant={c.change24h >= 0 ? 'success' : 'danger'}>{c.change24h > 0 ? '+' : ''}{c.change24h}%</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
