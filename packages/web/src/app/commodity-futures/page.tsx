'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Package } from 'lucide-react';

interface FuturesData { commodity: string; contract: string; price: number; change: number; volume: number; openInterest: number; structure: string; }
const FUTURES: FuturesData[] = [
  { commodity: 'Crude Oil', contract: 'CL May 24', price: 82.40, change: 1.2, volume: 842000, openInterest: 1284000, structure: 'Backwardation' },
  { commodity: 'Gold', contract: 'GC Jun 24', price: 2184.20, change: 0.4, volume: 248000, openInterest: 482000, structure: 'Contango' },
  { commodity: 'Natural Gas', contract: 'NG May 24', price: 1.82, change: -3.4, volume: 442000, openInterest: 824000, structure: 'Contango' },
  { commodity: 'Copper', contract: 'HG May 24', price: 4.08, change: 2.1, volume: 128000, openInterest: 284000, structure: 'Backwardation' },
  { commodity: 'Silver', contract: 'SI May 24', price: 24.80, change: 0.8, volume: 98000, openInterest: 182000, structure: 'Contango' },
  { commodity: 'Corn', contract: 'ZC May 24', price: 4.32, change: -1.2, volume: 284000, openInterest: 542000, structure: 'Contango' },
  { commodity: 'Soybeans', contract: 'ZS May 24', price: 11.84, change: -0.8, volume: 184000, openInterest: 382000, structure: 'Backwardation' },
  { commodity: 'Wheat', contract: 'ZW May 24', price: 5.48, change: 0.6, volume: 142000, openInterest: 284000, structure: 'Contango' },
];

export default function CommodityFuturesPage() {
  const gainers = FUTURES.filter((f) => f.change > 0).length;
  const backwardation = FUTURES.filter((f) => f.structure === 'Backwardation').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Commodity Futures</h1><p className="mt-1 text-sm text-gray-500">Active futures contracts — prices, volume, and term structure</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers</p><p className="text-lg font-bold text-green-400">{gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Losers</p><p className="text-lg font-bold text-red-400">{FUTURES.length - gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Backwardation</p><p className="text-lg font-bold text-amber-400">{backwardation}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Package className="h-4 w-4 text-indigo-400" /> Futures Contracts</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {FUTURES.map((f) => (
            <div key={f.commodity} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{f.commodity}</span>
                <span className="text-[10px] text-gray-500">{f.contract}</span>
                <Badge variant={f.structure === 'Backwardation' ? 'warning' : 'default'}>{f.structure}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Vol: {(f.volume / 1000).toFixed(0)}K</span>
                <span className={cn('text-sm font-bold font-mono', f.change > 0 ? 'text-green-400' : 'text-red-400')}>{f.change > 0 ? '+' : ''}{f.change.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
