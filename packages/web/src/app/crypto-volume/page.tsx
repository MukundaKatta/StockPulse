'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { BarChart2 } from 'lucide-react';

interface CryptoVolumeEntry {
  coin: string;
  symbol: string;
  price: number;
  volume24h: number;
  volumeChange: number;
  marketCap: number;
  volMcapRatio: number;
  trend: 'Surging' | 'Rising' | 'Stable' | 'Declining';
}

const VOLUMES: CryptoVolumeEntry[] = [
  { coin: 'Bitcoin', symbol: 'BTC', price: 68420, volume24h: 32.5e9, volumeChange: 18.4, marketCap: 1340e9, volMcapRatio: 2.42, trend: 'Surging' },
  { coin: 'Ethereum', symbol: 'ETH', price: 3680, volume24h: 18.2e9, volumeChange: 12.1, marketCap: 442e9, volMcapRatio: 4.12, trend: 'Rising' },
  { coin: 'Solana', symbol: 'SOL', price: 148.50, volume24h: 4.8e9, volumeChange: 25.8, marketCap: 65e9, volMcapRatio: 7.38, trend: 'Surging' },
  { coin: 'XRP', symbol: 'XRP', price: 0.58, volume24h: 2.1e9, volumeChange: -8.2, marketCap: 31.5e9, volMcapRatio: 6.67, trend: 'Declining' },
  { coin: 'Dogecoin', symbol: 'DOGE', price: 0.142, volume24h: 1.8e9, volumeChange: 42.5, marketCap: 20.2e9, volMcapRatio: 8.91, trend: 'Surging' },
  { coin: 'Cardano', symbol: 'ADA', price: 0.62, volume24h: 850e6, volumeChange: -2.4, marketCap: 22e9, volMcapRatio: 3.86, trend: 'Stable' },
  { coin: 'Avalanche', symbol: 'AVAX', price: 38.20, volume24h: 620e6, volumeChange: 8.5, marketCap: 14.2e9, volMcapRatio: 4.37, trend: 'Rising' },
];

const trendVariant = (t: string) => t === 'Surging' ? 'success' : t === 'Declining' ? 'danger' : t === 'Stable' ? 'default' : 'info';

export default function CryptoVolumePage() {
  const totalVolume = VOLUMES.reduce((s, v) => s + v.volume24h, 0);
  const avgChange = VOLUMES.reduce((s, v) => s + v.volumeChange, 0) / VOLUMES.length;
  const surging = VOLUMES.filter(v => v.trend === 'Surging').length;
  const avgRatio = VOLUMES.reduce((s, v) => s + v.volMcapRatio, 0) / VOLUMES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Volume</h1>
        <p className="mt-1 text-sm text-gray-500">Crypto volume analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total 24h Vol</p><p className="text-lg font-bold text-white">{formatCurrency(totalVolume)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Change</p><p className={cn('text-lg font-bold', avgChange >= 0 ? 'text-green-400' : 'text-red-400')}>{avgChange.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Surging</p><p className="text-lg font-bold text-green-400">{surging}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Vol/MCap</p><p className="text-lg font-bold text-indigo-400">{avgRatio.toFixed(2)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart2 className="h-4 w-4 text-indigo-400" /> Volume Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {VOLUMES.map((v) => (
            <div key={v.symbol} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{v.symbol} <span className="text-gray-500">{v.coin}</span></p>
                <p className="text-xs text-gray-500">MCap {formatCurrency(v.marketCap)} &middot; Vol/MCap {v.volMcapRatio}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(v.volume24h)}</p>
                  <p className={cn('text-[10px] font-mono', v.volumeChange >= 0 ? 'text-green-400' : 'text-red-400')}>{v.volumeChange > 0 ? '+' : ''}{v.volumeChange}%</p>
                </div>
                <Badge variant={trendVariant(v.trend)}>{v.trend}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
