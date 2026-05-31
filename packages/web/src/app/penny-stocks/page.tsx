'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface PennyStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  sector: string;
}

const STOCKS: PennyStock[] = [
  { symbol: 'SNDL', name: 'SNDL Inc', price: 1.82, change: 12.3, volume: 48200000, avgVolume: 22000000, marketCap: 480e6, sector: 'Cannabis' },
  { symbol: 'PLTR', name: 'Palantir Tech', price: 4.95, change: 5.8, volume: 35100000, avgVolume: 28000000, marketCap: 10.5e9, sector: 'Tech' },
  { symbol: 'SOFI', name: 'SoFi Technologies', price: 7.85, change: 3.2, volume: 25600000, avgVolume: 18000000, marketCap: 7.2e9, sector: 'FinTech' },
  { symbol: 'CLOV', name: 'Clover Health', price: 0.98, change: -4.5, volume: 18400000, avgVolume: 12000000, marketCap: 420e6, sector: 'Healthcare' },
  { symbol: 'BBIG', name: 'Vinco Ventures', price: 0.45, change: 22.1, volume: 52300000, avgVolume: 15000000, marketCap: 85e6, sector: 'Media' },
  { symbol: 'MVIS', name: 'MicroVision', price: 2.15, change: -2.8, volume: 8900000, avgVolume: 6000000, marketCap: 350e6, sector: 'Tech' },
  { symbol: 'TLRY', name: 'Tilray Brands', price: 2.30, change: 8.5, volume: 22100000, avgVolume: 14000000, marketCap: 1.4e9, sector: 'Cannabis' },
  { symbol: 'WISH', name: 'ContextLogic', price: 0.32, change: -6.2, volume: 15200000, avgVolume: 8000000, marketCap: 95e6, sector: 'E-Commerce' },
];

export default function PennyStocksPage() {
  const gainers = STOCKS.filter((s) => s.change > 0).length;
  const highVol = STOCKS.filter((s) => s.volume > s.avgVolume * 1.5).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Penny Stocks</h1>
          <p className="mt-1 text-sm text-gray-500">High-volume stocks under $5</p>
        </div>
        <Badge variant="warning"><AlertTriangle className="h-3 w-3 mr-1" /> High Risk</Badge>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Gainers</p>
          <p className="text-lg font-bold text-green-400">{gainers}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Losers</p>
          <p className="text-lg font-bold text-red-400">{STOCKS.length - gainers}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">High Volume</p>
          <p className="text-lg font-bold text-yellow-400">{highVol}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-indigo-400" /> Active Penny Stocks
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.volume - a.volume).map((s) => {
            const volRatio = s.volume / s.avgVolume;
            return (
              <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
                <div className="w-20">
                  <p className="text-xs font-bold text-white">{s.symbol}</p>
                  <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
                </div>
                <span className="text-xs font-mono text-white w-12">${s.price.toFixed(2)}</span>
                <span className={cn('text-xs font-mono w-14', s.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {s.change >= 0 ? '+' : ''}{s.change.toFixed(1)}%
                </span>
                <span className="text-xs font-mono text-gray-400 w-14">{(s.volume / 1e6).toFixed(1)}M</span>
                <Badge variant={volRatio > 2 ? 'warning' : 'default'}>
                  {volRatio.toFixed(1)}x avg
                </Badge>
                <span className="text-[10px] text-gray-500">{s.sector}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
