'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Gem } from 'lucide-react';

interface PreciousMetal {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  dayHigh: number;
  dayLow: number;
  weekChange: number;
  monthChange: number;
  ytdChange: number;
  unit: string;
}

const METALS: PreciousMetal[] = [
  { name: 'Gold', symbol: 'XAU', price: 2345.80, change: 12.50, changePct: 0.54, dayHigh: 2358.20, dayLow: 2330.40, weekChange: 1.82, monthChange: 3.45, ytdChange: 8.92, unit: '/oz' },
  { name: 'Silver', symbol: 'XAG', price: 29.45, change: -0.23, changePct: -0.77, dayHigh: 29.85, dayLow: 29.10, weekChange: -1.20, monthChange: 5.28, ytdChange: 12.40, unit: '/oz' },
  { name: 'Platinum', symbol: 'XPT', price: 978.40, change: 4.20, changePct: 0.43, dayHigh: 985.60, dayLow: 970.20, weekChange: 0.85, monthChange: -2.10, ytdChange: -4.50, unit: '/oz' },
  { name: 'Palladium', symbol: 'XPD', price: 1023.50, change: -12.30, changePct: -1.19, dayHigh: 1042.80, dayLow: 1018.40, weekChange: -3.40, monthChange: -5.80, ytdChange: -12.20, unit: '/oz' },
  { name: 'Rhodium', symbol: 'XRHO', price: 4650.00, change: 25.00, changePct: 0.54, dayHigh: 4680.00, dayLow: 4610.00, weekChange: 1.10, monthChange: -1.50, ytdChange: -8.30, unit: '/oz' },
  { name: 'Iridium', symbol: 'XIRD', price: 4950.00, change: 0.00, changePct: 0.00, dayHigh: 4950.00, dayLow: 4950.00, weekChange: 0.00, monthChange: -2.00, ytdChange: 1.20, unit: '/oz' },
];

export default function PreciousMetalsPage() {
  const totalDayChange = METALS.reduce((s, m) => s + m.changePct, 0) / METALS.length;
  const gainers = METALS.filter((m) => m.changePct > 0).length;
  const bestPerformer = METALS.reduce((best, m) => m.ytdChange > best.ytdChange ? m : best);
  const goldSilverRatio = METALS[0].price / METALS[1].price;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Precious Metals</h1>
        <p className="mt-1 text-sm text-gray-500">Gold, silver, platinum and more</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gold</p><p className="text-lg font-bold text-amber-400">{formatCurrency(METALS[0].price)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Silver</p><p className="text-lg font-bold text-gray-300">{formatCurrency(METALS[1].price)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Au/Ag Ratio</p><p className="text-lg font-bold text-indigo-400">{goldSilverRatio.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">YTD Best</p><p className="text-lg font-bold text-green-400">{bestPerformer.name}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gem className="h-4 w-4 text-indigo-400" /> Metal Prices</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {METALS.map((m) => (
            <div key={m.symbol} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{m.name}</span>
                  <span className="text-[10px] text-gray-500">{m.symbol}</span>
                  <Badge variant={m.changePct > 0 ? 'success' : m.changePct < 0 ? 'danger' : 'default'}>
                    {m.changePct >= 0 ? '+' : ''}{m.changePct.toFixed(2)}%
                  </Badge>
                </div>
                <span className="text-sm font-mono font-bold text-white">{formatCurrency(m.price)}{m.unit}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[10px]">
                <div>
                  <span className="text-gray-500">Day Range: </span>
                  <span className="text-white font-mono">{formatCurrency(m.dayLow)} - {formatCurrency(m.dayHigh)}</span>
                </div>
                <div>
                  <span className="text-gray-500">1W: </span>
                  <span className={cn('font-mono', m.weekChange >= 0 ? 'text-green-400' : 'text-red-400')}>{m.weekChange >= 0 ? '+' : ''}{m.weekChange.toFixed(2)}%</span>
                </div>
                <div>
                  <span className="text-gray-500">1M: </span>
                  <span className={cn('font-mono', m.monthChange >= 0 ? 'text-green-400' : 'text-red-400')}>{m.monthChange >= 0 ? '+' : ''}{m.monthChange.toFixed(2)}%</span>
                </div>
                <div>
                  <span className="text-gray-500">YTD: </span>
                  <span className={cn('font-mono', m.ytdChange >= 0 ? 'text-green-400' : 'text-red-400')}>{m.ytdChange >= 0 ? '+' : ''}{m.ytdChange.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
