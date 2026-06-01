'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Flame } from 'lucide-react';

interface GasContract {
  contract: string;
  expiry: string;
  price: number;
  change: number;
  volume: string;
  openInterest: string;
  contango: number;
  signal: 'Bullish' | 'Bearish' | 'Neutral';
}

const CONTRACTS: GasContract[] = [
  { contract: 'NG Jul 2026', expiry: 'Jun 26', price: 2.85, change: 3.2, volume: '185K', openInterest: '342K', contango: 0, signal: 'Bullish' },
  { contract: 'NG Aug 2026', expiry: 'Jul 28', price: 2.92, change: 2.8, volume: '142K', openInterest: '285K', contango: 2.5, signal: 'Bullish' },
  { contract: 'NG Sep 2026', expiry: 'Aug 26', price: 2.98, change: 1.5, volume: '98K', openInterest: '210K', contango: 4.6, signal: 'Neutral' },
  { contract: 'NG Oct 2026', expiry: 'Sep 28', price: 3.15, change: -0.5, volume: '72K', openInterest: '165K', contango: 10.5, signal: 'Neutral' },
  { contract: 'NG Nov 2026', expiry: 'Oct 27', price: 3.45, change: -1.2, volume: '55K', openInterest: '128K', contango: 21.1, signal: 'Bearish' },
  { contract: 'NG Dec 2026', expiry: 'Nov 24', price: 3.62, change: -0.8, volume: '48K', openInterest: '105K', contango: 27.0, signal: 'Bearish' },
  { contract: 'NG Jan 2027', expiry: 'Dec 28', price: 3.78, change: 0.2, volume: '35K', openInterest: '82K', contango: 32.6, signal: 'Neutral' },
  { contract: 'NG Feb 2027', expiry: 'Jan 27', price: 3.72, change: -0.4, volume: '22K', openInterest: '55K', contango: 30.5, signal: 'Bearish' },
];

const signalVariant = (s: string) => s === 'Bullish' ? 'success' : s === 'Bearish' ? 'danger' : 'default';

export default function NaturalGasPage() {
  const spotPrice = CONTRACTS[0].price;
  const avgContango = CONTRACTS.slice(1).reduce((s, c) => s + c.contango, 0) / (CONTRACTS.length - 1);
  const bullish = CONTRACTS.filter(c => c.signal === 'Bullish').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Natural Gas</h1>
        <p className="mt-1 text-sm text-gray-500">Natural gas futures curve and analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Spot Price</p><p className="text-lg font-bold text-white">{formatCurrency(spotPrice)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Contracts</p><p className="text-lg font-bold text-indigo-400">{CONTRACTS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Contango</p><p className="text-lg font-bold text-yellow-400">{avgContango.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Flame className="h-4 w-4 text-indigo-400" /> Futures Curve</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CONTRACTS.map((c) => (
            <div key={c.contract} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{c.contract}</p>
                <p className="text-[10px] text-gray-500">Exp: {c.expiry}</p>
              </div>
              <span className="text-xs font-mono text-white w-14">{formatCurrency(c.price)}</span>
              <span className={cn('text-xs font-mono w-12', c.change >= 0 ? 'text-green-400' : 'text-red-400')}>{c.change >= 0 ? '+' : ''}{c.change}%</span>
              <span className="text-[10px] text-gray-400 w-12">Vol {c.volume}</span>
              <span className="text-[10px] text-gray-500 w-12">OI {c.openInterest}</span>
              {c.contango > 0 && <span className="text-[10px] text-yellow-400 w-14">+{c.contango}% ctgo</span>}
              <Badge variant={signalVariant(c.signal)} className="ml-auto">{c.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
