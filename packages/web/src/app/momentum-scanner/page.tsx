'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Rocket } from 'lucide-react';

interface MomentumStock {
  symbol: string;
  name: string;
  price: number;
  change1D: number;
  change1W: number;
  change1M: number;
  relStrength: number;
  volume: number;
}

const STOCKS: MomentumStock[] = [
  { symbol: 'SMCI', name: 'Super Micro', price: 1012.50, change1D: 8.2, change1W: 22.5, change1M: 85.4, relStrength: 99, volume: 28500000 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, change1D: 4.2, change1W: 12.8, change1M: 32.5, relStrength: 97, volume: 42100000 },
  { symbol: 'ARM', name: 'Arm Holdings', price: 148.90, change1D: 3.5, change1W: 15.2, change1M: 45.8, relStrength: 95, volume: 18200000 },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, change1D: 1.9, change1W: 8.4, change1M: 28.6, relStrength: 92, volume: 15800000 },
  { symbol: 'AVGO', name: 'Broadcom Inc', price: 1285.40, change1D: 2.8, change1W: 9.6, change1M: 22.1, relStrength: 90, volume: 8200000 },
  { symbol: 'LLY', name: 'Eli Lilly', price: 752.80, change1D: 1.5, change1W: 6.2, change1M: 18.4, relStrength: 88, volume: 5400000 },
  { symbol: 'CRWD', name: 'CrowdStrike', price: 312.45, change1D: 2.1, change1W: 7.8, change1M: 15.2, relStrength: 85, volume: 6100000 },
  { symbol: 'PANW', name: 'Palo Alto', price: 352.10, change1D: 1.8, change1W: 5.4, change1M: 12.8, relStrength: 82, volume: 4800000 },
];

export default function MomentumScannerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Momentum Scanner</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks with strongest price momentum across timeframes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Rocket className="h-4 w-4 text-indigo-400" /> Top Momentum
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-16">${s.price.toFixed(2)}</span>
              <span className={cn('text-xs font-mono w-12', s.change1D >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.change1D >= 0 ? '+' : ''}{s.change1D.toFixed(1)}%
              </span>
              <span className={cn('text-xs font-mono w-12', s.change1W >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.change1W >= 0 ? '+' : ''}{s.change1W.toFixed(1)}%
              </span>
              <span className={cn('text-xs font-mono w-12', s.change1M >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.change1M >= 0 ? '+' : ''}{s.change1M.toFixed(1)}%
              </span>
              <Badge variant={s.relStrength >= 90 ? 'success' : s.relStrength >= 70 ? 'info' : 'default'}>
                RS {s.relStrength}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
