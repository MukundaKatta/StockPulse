'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Flame } from 'lucide-react';

interface Gainer {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  relVolume: number;
  marketCap: string;
  catalyst: string;
  sector: string;
}

const GAINERS: Gainer[] = [
  { symbol: 'SMCI', name: 'Super Micro', price: 1008.50, change: 18.4, volume: '42.8M', relVolume: 4.2, marketCap: '$58B', catalyst: 'AI server demand', sector: 'Tech' },
  { symbol: 'SOFI', name: 'SoFi Tech', price: 8.45, change: 12.2, volume: '52.1M', relVolume: 1.83, marketCap: '$8.2B', catalyst: 'Earnings beat', sector: 'Finance' },
  { symbol: 'PLTR', name: 'Palantir', price: 22.40, change: 8.5, volume: '58.2M', relVolume: 1.36, marketCap: '$48B', catalyst: 'DoD contract', sector: 'Tech' },
  { symbol: 'AFRM', name: 'Affirm', price: 42.80, change: 7.8, volume: '18.4M', relVolume: 2.4, marketCap: '$13B', catalyst: 'Revenue growth', sector: 'Finance' },
  { symbol: 'NET', name: 'Cloudflare', price: 88.20, change: 6.5, volume: '12.8M', relVolume: 1.9, marketCap: '$30B', catalyst: 'AI edge compute', sector: 'Tech' },
  { symbol: 'ARM', name: 'ARM Holdings', price: 148.50, change: 5.8, volume: '22.4M', relVolume: 2.1, marketCap: '$153B', catalyst: 'Mobile chip dominance', sector: 'Tech' },
  { symbol: 'COIN', name: 'Coinbase', price: 162.40, change: 5.2, volume: '14.2M', relVolume: 1.5, marketCap: '$38B', catalyst: 'Crypto rally', sector: 'Finance' },
  { symbol: 'RKLB', name: 'Rocket Lab', price: 5.82, change: 4.8, volume: '28.5M', relVolume: 2.8, marketCap: '$2.8B', catalyst: 'Launch success', sector: 'Aerospace' },
];

export default function TopGainersPage() {
  const avgGain = GAINERS.reduce((s, g) => s + g.change, 0) / GAINERS.length;
  const highVol = GAINERS.filter((g) => g.relVolume > 2).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Top Gainers</h1>
        <p className="mt-1 text-sm text-gray-500">Today&apos;s best performing stocks</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Gain</p><p className="text-lg font-bold text-green-400">+{avgGain.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Volume</p><p className="text-lg font-bold text-amber-400">{highVol}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{GAINERS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Flame className="h-4 w-4 text-orange-400" /> Top Movers</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {GAINERS.map((g, i) => (
            <div key={g.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <span className="text-[10px] font-bold text-gray-500 w-4">{i + 1}</span>
              <div className="w-24"><p className="text-xs font-bold text-white">{g.symbol}</p><p className="text-[10px] text-gray-500 truncate">{g.name}</p></div>
              <Badge variant="info">{g.sector}</Badge>
              <span className="text-xs font-mono text-white w-16">${g.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-green-400 font-bold w-14">+{g.change.toFixed(1)}%</span>
              <span className={cn('text-[10px] font-mono', g.relVolume > 2 ? 'text-amber-400' : 'text-gray-400')}>{g.relVolume.toFixed(1)}x vol</span>
              <span className="text-[10px] text-gray-500 ml-auto italic">{g.catalyst}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
