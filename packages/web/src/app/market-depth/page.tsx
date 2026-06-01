'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface DepthLevel { price: number; bidSize: number; askSize: number; }
interface DepthData { symbol: string; name: string; mid: number; spread: number; levels: DepthLevel[]; bias: string; }
const BOOKS: DepthData[] = [
  { symbol: 'AAPL', name: 'Apple', mid: 186.05, spread: 0.01, levels: [{ price: 186.04, bidSize: 1200, askSize: 800 }, { price: 186.03, bidSize: 2400, askSize: 1100 }], bias: 'Bid Heavy' },
  { symbol: 'MSFT', name: 'Microsoft', mid: 404.87, spread: 0.02, levels: [{ price: 404.86, bidSize: 600, askSize: 900 }, { price: 404.85, bidSize: 800, askSize: 1400 }], bias: 'Ask Heavy' },
  { symbol: 'NVDA', name: 'NVIDIA', mid: 878.35, spread: 0.05, levels: [{ price: 878.33, bidSize: 300, askSize: 280 }, { price: 878.30, bidSize: 520, askSize: 490 }], bias: 'Balanced' },
  { symbol: 'TSLA', name: 'Tesla', mid: 188.20, spread: 0.02, levels: [{ price: 188.19, bidSize: 1800, askSize: 2400 }, { price: 188.18, bidSize: 2200, askSize: 3100 }], bias: 'Ask Heavy' },
  { symbol: 'GOOGL', name: 'Alphabet', mid: 141.80, spread: 0.01, levels: [{ price: 141.79, bidSize: 1400, askSize: 1200 }, { price: 141.78, bidSize: 2800, askSize: 1800 }], bias: 'Bid Heavy' },
  { symbol: 'META', name: 'Meta', mid: 484.10, spread: 0.03, levels: [{ price: 484.09, bidSize: 400, askSize: 420 }, { price: 484.07, bidSize: 680, askSize: 710 }], bias: 'Balanced' },
];

export default function MarketDepthPage() {
  const bidHeavy = BOOKS.filter((b) => b.bias === 'Bid Heavy').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Depth</h1><p className="mt-1 text-sm text-gray-500">Level 2 order book — bid/ask size visualization</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bid Heavy</p><p className="text-lg font-bold text-green-400">{bidHeavy}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Ask Heavy</p><p className="text-lg font-bold text-red-400">{BOOKS.filter((b) => b.bias === 'Ask Heavy').length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Symbols</p><p className="text-lg font-bold text-indigo-400">{BOOKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-indigo-400" /> Order Book</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {BOOKS.map((b) => (
            <div key={b.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{b.symbol}</span>
                  <span className="text-[10px] text-gray-500">{b.name}</span>
                  <Badge variant={b.bias === 'Bid Heavy' ? 'success' : b.bias === 'Ask Heavy' ? 'danger' : 'default'}>{b.bias}</Badge>
                </div>
                <span className="text-sm font-bold font-mono text-white">${b.mid.toFixed(2)}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>Spread: <span className="font-mono text-gray-400">${b.spread.toFixed(2)}</span></span>
                <span>Bid: <span className={cn('font-mono', 'text-green-400')}>{b.levels[0].bidSize.toLocaleString()}</span></span>
                <span>Ask: <span className={cn('font-mono', 'text-red-400')}>{b.levels[0].askSize.toLocaleString()}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
