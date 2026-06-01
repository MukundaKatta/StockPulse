'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowUpDown } from 'lucide-react';

interface Zone {
  symbol: string;
  name: string;
  price: number;
  type: 'Supply' | 'Demand';
  zoneHigh: number;
  zoneLow: number;
  strength: 'Strong' | 'Moderate' | 'Weak';
  touches: number;
  freshness: 'Fresh' | 'Tested' | 'Broken';
  distance: number;
}

const ZONES: Zone[] = [
  { symbol: 'AAPL', name: 'Apple', price: 186.05, type: 'Supply', zoneHigh: 198.50, zoneLow: 195.20, strength: 'Strong', touches: 2, freshness: 'Fresh', distance: 6.7 },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, type: 'Demand', zoneHigh: 172.80, zoneLow: 169.50, strength: 'Strong', touches: 1, freshness: 'Fresh', distance: -7.1 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, type: 'Supply', zoneHigh: 920.00, zoneLow: 905.40, strength: 'Moderate', touches: 3, freshness: 'Tested', distance: 4.7 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, type: 'Demand', zoneHigh: 810.20, zoneLow: 790.50, strength: 'Strong', touches: 1, freshness: 'Fresh', distance: -7.8 },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, type: 'Supply', zoneHigh: 425.80, zoneLow: 420.10, strength: 'Weak', touches: 4, freshness: 'Tested', distance: 5.2 },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, type: 'Demand', zoneHigh: 388.50, zoneLow: 382.20, strength: 'Strong', touches: 2, freshness: 'Tested', distance: -4.0 },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, type: 'Supply', zoneHigh: 210.40, zoneLow: 205.80, strength: 'Moderate', touches: 2, freshness: 'Fresh', distance: 11.8 },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, type: 'Demand', zoneHigh: 168.50, zoneLow: 162.40, strength: 'Strong', touches: 1, freshness: 'Fresh', distance: -10.5 },
  { symbol: 'META', name: 'Meta', price: 484.10, type: 'Supply', zoneHigh: 510.20, zoneLow: 502.80, strength: 'Strong', touches: 1, freshness: 'Fresh', distance: 5.4 },
  { symbol: 'META', name: 'Meta', price: 484.10, type: 'Demand', zoneHigh: 452.40, zoneLow: 445.20, strength: 'Moderate', touches: 3, freshness: 'Tested', distance: -6.5 },
];

export default function SupplyDemandPage() {
  const supplyZones = ZONES.filter((z) => z.type === 'Supply');
  const demandZones = ZONES.filter((z) => z.type === 'Demand');
  const freshCount = ZONES.filter((z) => z.freshness === 'Fresh').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Supply & Demand Zones</h1>
        <p className="mt-1 text-sm text-gray-500">Key institutional order blocks and imbalance zones</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Supply Zones</p><p className="text-lg font-bold text-red-400">{supplyZones.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Demand Zones</p><p className="text-lg font-bold text-green-400">{demandZones.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Fresh Zones</p><p className="text-lg font-bold text-indigo-400">{freshCount}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowUpDown className="h-4 w-4 text-indigo-400" /> Active Zones</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ZONES.map((z, i) => {
            const strengthColor = z.strength === 'Strong' ? 'success' : z.strength === 'Moderate' ? 'warning' : 'default';
            return (
              <div key={`${z.symbol}-${z.type}-${i}`} className="px-4 py-2.5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{z.symbol}</span>
                    <Badge variant={z.type === 'Supply' ? 'danger' : 'success'}>{z.type}</Badge>
                    <Badge variant={strengthColor}>{z.strength}</Badge>
                    <span className={cn('text-[9px] px-1 rounded', z.freshness === 'Fresh' ? 'bg-indigo-500/20 text-indigo-400' : z.freshness === 'Tested' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-400')}>{z.freshness}</span>
                  </div>
                  <span className="text-xs font-mono text-white">${z.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 text-[10px]">
                  <span className="text-gray-400">Zone: <span className="font-mono text-white">${z.zoneLow.toFixed(2)} – ${z.zoneHigh.toFixed(2)}</span></span>
                  <span className="text-gray-400">Touches: <span className="font-mono text-white">{z.touches}</span></span>
                  <span className={cn('font-mono', z.distance >= 0 ? 'text-red-400' : 'text-green-400')}>
                    {z.distance >= 0 ? '+' : ''}{z.distance.toFixed(1)}% away
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
