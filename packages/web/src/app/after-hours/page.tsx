'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Moon } from 'lucide-react';

interface AHMover {
  symbol: string;
  name: string;
  closePrice: number;
  ahPrice: number;
  ahChange: number;
  ahVolume: number;
  catalyst: string;
}

const MOVERS: AHMover[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', closePrice: 878.35, ahPrice: 895.20, ahChange: 1.92, ahVolume: 4200000, catalyst: 'AI partnership announced' },
  { symbol: 'SNAP', name: 'Snap Inc', closePrice: 15.80, ahPrice: 18.45, ahChange: 16.77, ahVolume: 8500000, catalyst: 'Earnings beat' },
  { symbol: 'NFLX', name: 'Netflix Inc', closePrice: 562.40, ahPrice: 548.20, ahChange: -2.52, ahVolume: 3100000, catalyst: 'Subscriber miss' },
  { symbol: 'COIN', name: 'Coinbase', closePrice: 152.80, ahPrice: 165.40, ahChange: 8.25, ahVolume: 5800000, catalyst: 'Revenue beat' },
  { symbol: 'LYFT', name: 'Lyft Inc', closePrice: 14.20, ahPrice: 15.85, ahChange: 11.62, ahVolume: 6200000, catalyst: 'Profitability guidance' },
  { symbol: 'ROKU', name: 'Roku Inc', closePrice: 82.50, ahPrice: 76.40, ahChange: -7.39, ahVolume: 4800000, catalyst: 'Weak guidance' },
  { symbol: 'AFRM', name: 'Affirm Holdings', closePrice: 42.30, ahPrice: 45.80, ahChange: 8.27, ahVolume: 3500000, catalyst: 'GMV growth' },
  { symbol: 'DASH', name: 'DoorDash Inc', closePrice: 118.60, ahPrice: 112.40, ahChange: -5.23, ahVolume: 2800000, catalyst: 'Operating loss' },
];

export default function AfterHoursPage() {
  const gainers = MOVERS.filter((m) => m.ahChange > 0);
  const losers = MOVERS.filter((m) => m.ahChange < 0);
  const totalVolume = MOVERS.reduce((s, m) => s + m.ahVolume, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">After Hours</h1>
          <p className="mt-1 text-sm text-gray-500">Extended hours movers and earnings reactions</p>
        </div>
        <Badge variant="warning" className="ml-auto"><Moon className="h-3 w-3 mr-1" /> AH Trading</Badge>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Gainers</p>
          <p className="text-lg font-bold text-green-400">{gainers.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Losers</p>
          <p className="text-lg font-bold text-red-400">{losers.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">AH Volume</p>
          <p className="text-lg font-bold text-white">{(totalVolume / 1e6).toFixed(1)}M</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Moon className="h-4 w-4 text-indigo-400" /> After Hours Movers
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {MOVERS.sort((a, b) => Math.abs(b.ahChange) - Math.abs(a.ahChange)).map((m) => (
            <div key={m.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{m.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{m.name}</p>
              </div>
              <span className="text-xs font-mono text-gray-400 w-14">${m.closePrice.toFixed(2)}</span>
              <span className="text-xs text-gray-500">→</span>
              <span className={cn('text-xs font-mono font-bold w-14', m.ahChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                ${m.ahPrice.toFixed(2)}
              </span>
              <span className={cn('text-xs font-mono w-14', m.ahChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                {m.ahChange >= 0 ? '+' : ''}{m.ahChange.toFixed(2)}%
              </span>
              <span className="text-[10px] text-gray-500 flex-1 truncate">{m.catalyst}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
