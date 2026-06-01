'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { BookOpen } from 'lucide-react';

interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

const BIDS: OrderLevel[] = [
  { price: 186.04, size: 1200, total: 1200 },
  { price: 186.03, size: 2500, total: 3700 },
  { price: 186.02, size: 1800, total: 5500 },
  { price: 186.01, size: 3200, total: 8700 },
  { price: 186.00, size: 5400, total: 14100 },
  { price: 185.99, size: 2100, total: 16200 },
  { price: 185.98, size: 4500, total: 20700 },
  { price: 185.97, size: 1500, total: 22200 },
  { price: 185.96, size: 3800, total: 26000 },
  { price: 185.95, size: 6200, total: 32200 },
];

const ASKS: OrderLevel[] = [
  { price: 186.05, size: 800, total: 800 },
  { price: 186.06, size: 2200, total: 3000 },
  { price: 186.07, size: 1500, total: 4500 },
  { price: 186.08, size: 2800, total: 7300 },
  { price: 186.09, size: 4100, total: 11400 },
  { price: 186.10, size: 1900, total: 13300 },
  { price: 186.11, size: 3500, total: 16800 },
  { price: 186.12, size: 2000, total: 18800 },
  { price: 186.13, size: 4200, total: 23000 },
  { price: 186.14, size: 5800, total: 28800 },
];

export default function OrderBookPage() {
  const maxTotal = Math.max(BIDS[BIDS.length - 1].total, ASKS[ASKS.length - 1].total);
  const spread = ASKS[0].price - BIDS[0].price;
  const bidDepth = BIDS[BIDS.length - 1].total;
  const askDepth = ASKS[ASKS.length - 1].total;
  const imbalance = ((bidDepth - askDepth) / (bidDepth + askDepth)) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Order Book</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL Level 2 market depth</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Spread</p><p className="text-lg font-bold text-white">${spread.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bid Depth</p><p className="text-lg font-bold text-green-400">{(bidDepth / 1000).toFixed(1)}K</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Ask Depth</p><p className="text-lg font-bold text-red-400">{(askDepth / 1000).toFixed(1)}K</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Imbalance</p><p className={cn('text-lg font-bold', imbalance > 0 ? 'text-green-400' : 'text-red-400')}>{imbalance > 0 ? '+' : ''}{imbalance.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4 text-indigo-400" /> Depth</CardTitle></CardHeader>
        <div className="grid grid-cols-2 gap-px bg-white/5">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#12121a]">
              <span className="text-[10px] text-gray-500 w-16">Price</span>
              <span className="text-[10px] text-gray-500 w-12 text-right">Size</span>
              <span className="text-[10px] text-gray-500 flex-1 text-right">Total</span>
            </div>
            {BIDS.map((b) => (
              <div key={b.price} className="relative flex items-center gap-2 px-3 py-0.5 bg-[#12121a]">
                <div className="absolute inset-0 bg-green-500/10" style={{ width: `${(b.total / maxTotal) * 100}%` }} />
                <span className="relative text-xs font-mono text-green-400 w-16">{b.price.toFixed(2)}</span>
                <span className="relative text-xs font-mono text-gray-400 w-12 text-right">{b.size.toLocaleString()}</span>
                <span className="relative text-xs font-mono text-gray-500 flex-1 text-right">{b.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#12121a]">
              <span className="text-[10px] text-gray-500 w-16">Price</span>
              <span className="text-[10px] text-gray-500 w-12 text-right">Size</span>
              <span className="text-[10px] text-gray-500 flex-1 text-right">Total</span>
            </div>
            {ASKS.map((a) => (
              <div key={a.price} className="relative flex items-center gap-2 px-3 py-0.5 bg-[#12121a]">
                <div className="absolute inset-0 bg-red-500/10" style={{ width: `${(a.total / maxTotal) * 100}%` }} />
                <span className="relative text-xs font-mono text-red-400 w-16">{a.price.toFixed(2)}</span>
                <span className="relative text-xs font-mono text-gray-400 w-12 text-right">{a.size.toLocaleString()}</span>
                <span className="relative text-xs font-mono text-gray-500 flex-1 text-right">{a.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
