'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Flame } from 'lucide-react';

interface EnergyFuture {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  contract: string;
  expiry: string;
  dayHigh: number;
  dayLow: number;
  volume: string;
  openInterest: string;
}

const FUTURES: EnergyFuture[] = [
  { name: 'Crude Oil (WTI)', symbol: 'CL', price: 78.92, change: 1.34, changePct: 1.73, contract: 'Apr 2024', expiry: '2024-03-20', dayHigh: 79.45, dayLow: 77.50, volume: '485K', openInterest: '1.82M' },
  { name: 'Brent Crude', symbol: 'BZ', price: 83.18, change: 1.12, changePct: 1.37, contract: 'May 2024', expiry: '2024-04-29', dayHigh: 83.55, dayLow: 81.90, volume: '312K', openInterest: '1.45M' },
  { name: 'Natural Gas', symbol: 'NG', price: 1.78, change: -0.08, changePct: -4.30, contract: 'Apr 2024', expiry: '2024-03-26', dayHigh: 1.88, dayLow: 1.74, volume: '520K', openInterest: '1.12M' },
  { name: 'RBOB Gasoline', symbol: 'RB', price: 2.65, change: 0.04, changePct: 1.53, contract: 'Apr 2024', expiry: '2024-03-28', dayHigh: 2.68, dayLow: 2.60, volume: '142K', openInterest: '320K' },
  { name: 'Heating Oil', symbol: 'HO', price: 2.58, change: 0.03, changePct: 1.18, contract: 'Apr 2024', expiry: '2024-03-28', dayHigh: 2.61, dayLow: 2.54, volume: '98K', openInterest: '245K' },
  { name: 'Ethanol', symbol: 'EH', price: 1.62, change: -0.02, changePct: -1.22, contract: 'Apr 2024', expiry: '2024-04-03', dayHigh: 1.65, dayLow: 1.60, volume: '12K', openInterest: '45K' },
  { name: 'Coal (Newcastle)', symbol: 'NCF', price: 128.50, change: -2.30, changePct: -1.76, contract: 'Apr 2024', expiry: '2024-03-28', dayHigh: 131.20, dayLow: 127.80, volume: '8K', openInterest: '28K' },
  { name: 'Uranium', symbol: 'UX', price: 88.75, change: 3.25, changePct: 3.80, contract: 'Spot', expiry: 'N/A', dayHigh: 89.50, dayLow: 85.00, volume: '2K', openInterest: '15K' },
];

export default function EnergyFuturesPage() {
  const gainers = FUTURES.filter((f) => f.changePct > 0).length;
  const losers = FUTURES.filter((f) => f.changePct < 0).length;
  const biggestMover = FUTURES.reduce((best, f) => Math.abs(f.changePct) > Math.abs(best.changePct) ? f : best);
  const avgChange = FUTURES.reduce((s, f) => s + f.changePct, 0) / FUTURES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Energy Futures</h1>
        <p className="mt-1 text-sm text-gray-500">Crude oil, natural gas and energy futures</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">WTI Crude</p><p className="text-lg font-bold text-white">{formatCurrency(FUTURES[0].price)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Nat Gas</p><p className="text-lg font-bold text-red-400">{formatCurrency(FUTURES[2].price)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers/Losers</p><p className="text-lg font-bold text-white"><span className="text-green-400">{gainers}</span>/<span className="text-red-400">{losers}</span></p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Biggest Mover</p><p className="text-lg font-bold text-amber-400">{biggestMover.symbol}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Flame className="h-4 w-4 text-indigo-400" /> Futures Contracts</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {FUTURES.map((f) => (
            <div key={f.symbol} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{f.name}</span>
                  <span className="text-[10px] text-gray-500">{f.symbol}</span>
                  <Badge variant={f.changePct > 0 ? 'success' : f.changePct < 0 ? 'danger' : 'default'}>
                    {f.changePct >= 0 ? '+' : ''}{f.changePct.toFixed(2)}%
                  </Badge>
                </div>
                <span className="text-sm font-mono font-bold text-white">{formatCurrency(f.price)}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>Contract: <span className="text-white font-mono">{f.contract}</span></span>
                <span>Range: <span className="text-white font-mono">{formatCurrency(f.dayLow)} - {formatCurrency(f.dayHigh)}</span></span>
                <span>Vol: <span className="text-indigo-400 font-mono">{f.volume}</span></span>
                <span>OI: <span className="text-gray-400 font-mono">{f.openInterest}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
