'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface VolumeLevel {
  priceRange: string;
  volume: number;
  buyVolume: number;
  sellVolume: number;
  isHighVolume: boolean;
  isPOC: boolean;
}

const LEVELS: VolumeLevel[] = [
  { priceRange: '192-194', volume: 2500000, buyVolume: 1400000, sellVolume: 1100000, isHighVolume: false, isPOC: false },
  { priceRange: '190-192', volume: 4200000, buyVolume: 2100000, sellVolume: 2100000, isHighVolume: true, isPOC: false },
  { priceRange: '188-190', volume: 6800000, buyVolume: 3800000, sellVolume: 3000000, isHighVolume: true, isPOC: false },
  { priceRange: '186-188', volume: 8500000, buyVolume: 4800000, sellVolume: 3700000, isHighVolume: true, isPOC: true },
  { priceRange: '184-186', volume: 7200000, buyVolume: 3500000, sellVolume: 3700000, isHighVolume: true, isPOC: false },
  { priceRange: '182-184', volume: 5100000, buyVolume: 2300000, sellVolume: 2800000, isHighVolume: true, isPOC: false },
  { priceRange: '180-182', volume: 3800000, buyVolume: 1900000, sellVolume: 1900000, isHighVolume: false, isPOC: false },
  { priceRange: '178-180', volume: 2200000, buyVolume: 1000000, sellVolume: 1200000, isHighVolume: false, isPOC: false },
  { priceRange: '176-178', volume: 1500000, buyVolume: 800000, sellVolume: 700000, isHighVolume: false, isPOC: false },
  { priceRange: '174-176', volume: 900000, buyVolume: 400000, sellVolume: 500000, isHighVolume: false, isPOC: false },
];

export default function VolumeProfilePage() {
  const maxVolume = Math.max(...LEVELS.map((l) => l.volume));
  const totalVolume = LEVELS.reduce((s, l) => s + l.volume, 0);
  const totalBuy = LEVELS.reduce((s, l) => s + l.buyVolume, 0);
  const poc = LEVELS.find((l) => l.isPOC);
  const valueArea = LEVELS.filter((l) => l.isHighVolume);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Volume Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Price-based volume distribution (AAPL)</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">POC (Point of Control)</p><p className="text-lg font-bold text-indigo-400">${poc?.priceRange.split('-')[0]}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Value Area</p><p className="text-lg font-bold text-white">{valueArea.length > 0 ? `$${valueArea[valueArea.length - 1].priceRange.split('-')[0]}–$${valueArea[0].priceRange.split('-')[1]}` : '—'}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Buy/Sell Ratio</p><p className={cn('text-lg font-bold', totalBuy > totalVolume / 2 ? 'text-green-400' : 'text-red-400')}>{((totalBuy / totalVolume) * 100).toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Volume at Price</CardTitle></CardHeader>
        <div className="space-y-1.5 px-2 pb-3">
          {LEVELS.map((level) => {
            const buyPct = (level.buyVolume / level.volume) * 100;
            const width = (level.volume / maxVolume) * 100;
            return (
              <div key={level.priceRange} className="flex items-center gap-2">
                <span className={cn('text-xs font-mono w-16 text-right', level.isPOC ? 'text-indigo-400 font-bold' : 'text-gray-400')}>{level.priceRange}</span>
                <div className="flex-1 h-5 relative rounded overflow-hidden" style={{ width: `${width}%` }}>
                  <div className="absolute inset-y-0 left-0 bg-green-500/40" style={{ width: `${buyPct}%` }} />
                  <div className="absolute inset-y-0 right-0 bg-red-500/40" style={{ width: `${100 - buyPct}%` }} />
                  {level.isPOC && <div className="absolute inset-0 ring-1 ring-indigo-400/50 rounded" />}
                </div>
                <span className="text-[10px] text-gray-500 w-12 text-right">{(level.volume / 1e6).toFixed(1)}M</span>
                {level.isPOC && <Badge variant="info" className="text-[8px]">POC</Badge>}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 px-2 pb-2 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500/40" /> Buy Volume</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500/40" /> Sell Volume</span>
        </div>
      </Card>
    </motion.div>
  );
}
