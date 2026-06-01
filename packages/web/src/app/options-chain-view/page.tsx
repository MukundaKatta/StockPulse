'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { LayoutGrid } from 'lucide-react';

interface OptionsContract {
  strike: number;
  expiry: string;
  type: 'Call' | 'Put';
  bid: number;
  ask: number;
  last: number;
  volume: number;
  openInterest: number;
  iv: number;
  delta: number;
  moneyness: 'ITM' | 'ATM' | 'OTM';
}

const CHAIN: OptionsContract[] = [
  { strike: 180, expiry: 'Jul 19', type: 'Call', bid: 14.20, ask: 14.45, last: 14.35, volume: 12500, openInterest: 45200, iv: 28.5, delta: 0.82, moneyness: 'ITM' },
  { strike: 185, expiry: 'Jul 19', type: 'Call', bid: 10.50, ask: 10.70, last: 10.60, volume: 18200, openInterest: 62500, iv: 26.8, delta: 0.72, moneyness: 'ITM' },
  { strike: 190, expiry: 'Jul 19', type: 'Call', bid: 7.20, ask: 7.40, last: 7.30, volume: 28500, openInterest: 85400, iv: 25.5, delta: 0.58, moneyness: 'ATM' },
  { strike: 195, expiry: 'Jul 19', type: 'Call', bid: 4.50, ask: 4.65, last: 4.55, volume: 22800, openInterest: 72100, iv: 25.2, delta: 0.42, moneyness: 'OTM' },
  { strike: 190, expiry: 'Jul 19', type: 'Put', bid: 4.80, ask: 4.95, last: 4.85, volume: 15800, openInterest: 58200, iv: 26.2, delta: -0.42, moneyness: 'ATM' },
  { strike: 185, expiry: 'Jul 19', type: 'Put', bid: 2.85, ask: 3.00, last: 2.90, volume: 12400, openInterest: 42800, iv: 27.5, delta: -0.28, moneyness: 'OTM' },
  { strike: 180, expiry: 'Jul 19', type: 'Put', bid: 1.55, ask: 1.65, last: 1.60, volume: 8500, openInterest: 35200, iv: 29.2, delta: -0.18, moneyness: 'OTM' },
  { strike: 200, expiry: 'Jul 19', type: 'Call', bid: 2.40, ask: 2.55, last: 2.48, volume: 32500, openInterest: 98500, iv: 25.8, delta: 0.28, moneyness: 'OTM' },
];

const moneyVariant = (m: string) => m === 'ITM' ? 'success' : m === 'ATM' ? 'warning' : 'default';

export default function OptionsChainViewPage() {
  const totalVolume = CHAIN.reduce((s, c) => s + c.volume, 0);
  const totalOI = CHAIN.reduce((s, c) => s + c.openInterest, 0);
  const avgIv = CHAIN.reduce((s, c) => s + c.iv, 0) / CHAIN.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Options Chain</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL options chain viewer &middot; Spot: $192.50</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Contracts</p><p className="text-lg font-bold text-white">{CHAIN.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Volume</p><p className="text-lg font-bold text-indigo-400">{(totalVolume / 1000).toFixed(1)}K</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Open Interest</p><p className="text-lg font-bold text-green-400">{(totalOI / 1000).toFixed(0)}K</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg IV</p><p className="text-lg font-bold text-yellow-400">{avgIv.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><LayoutGrid className="h-4 w-4 text-indigo-400" /> Options Chain</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CHAIN.map((c, i) => (
            <div key={i} className="px-4 py-2.5 flex items-center gap-3">
              <Badge variant={c.type === 'Call' ? 'success' : 'danger'}>{c.type}</Badge>
              <span className="text-xs font-mono text-white w-12">${c.strike}</span>
              <span className="text-[10px] text-gray-400 w-12">{c.expiry}</span>
              <span className="text-xs font-mono text-white w-14">{formatCurrency(c.last)}</span>
              <span className="text-[10px] text-gray-400 w-20">{formatCurrency(c.bid)}/{formatCurrency(c.ask)}</span>
              <span className="text-[10px] text-gray-500 w-12">Vol {(c.volume / 1000).toFixed(1)}K</span>
              <span className="text-[10px] text-indigo-400 w-10">IV {c.iv}%</span>
              <span className="text-[10px] text-gray-400 w-10">Δ {c.delta}</span>
              <Badge variant={moneyVariant(c.moneyness)} className="ml-auto">{c.moneyness}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
