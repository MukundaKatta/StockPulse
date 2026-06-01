'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { Box } from 'lucide-react';

interface BlockTrade {
  time: string;
  symbol: string;
  shares: number;
  price: number;
  value: number;
  venue: string;
  condition: 'Block' | 'Cross' | 'Sweep';
  aboveVwap: boolean;
}

const TRADES: BlockTrade[] = [
  { time: '15:28', symbol: 'NVDA', shares: 185000, price: 878.35, value: 162.5e6, venue: 'NYSE', condition: 'Block', aboveVwap: true },
  { time: '15:15', symbol: 'META', shares: 220000, price: 484.10, value: 106.5e6, venue: 'NASDAQ', condition: 'Cross', aboveVwap: true },
  { time: '14:52', symbol: 'AAPL', shares: 480000, price: 186.02, value: 89.3e6, venue: 'ARCA', condition: 'Block', aboveVwap: false },
  { time: '14:38', symbol: 'TSLA', shares: 350000, price: 188.70, value: 66.0e6, venue: 'NASDAQ', condition: 'Sweep', aboveVwap: false },
  { time: '14:22', symbol: 'MSFT', shares: 125000, price: 404.87, value: 50.6e6, venue: 'NYSE', condition: 'Block', aboveVwap: true },
  { time: '14:05', symbol: 'AMD', shares: 280000, price: 177.52, value: 49.7e6, venue: 'NASDAQ', condition: 'Block', aboveVwap: true },
  { time: '13:48', symbol: 'AMZN', shares: 265000, price: 178.25, value: 47.2e6, venue: 'ARCA', condition: 'Cross', aboveVwap: false },
  { time: '13:32', symbol: 'GOOGL', shares: 310000, price: 141.80, value: 44.0e6, venue: 'NASDAQ', condition: 'Block', aboveVwap: true },
  { time: '13:15', symbol: 'AVGO', shares: 32000, price: 1285.40, value: 41.1e6, venue: 'NASDAQ', condition: 'Block', aboveVwap: true },
  { time: '12:58', symbol: 'CRM', shares: 140000, price: 282.40, value: 39.5e6, venue: 'NYSE', condition: 'Sweep', aboveVwap: false },
];

export default function BlockTradesPage() {
  const totalValue = TRADES.reduce((s, t) => s + t.value, 0);
  const aboveVwap = TRADES.filter((t) => t.aboveVwap).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Block Trades</h1>
        <p className="mt-1 text-sm text-gray-500">Large institutional block trades (&gt;$10M)</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total Value</p><p className="text-lg font-bold text-white">{formatLargeNumber(totalValue)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Above VWAP</p><p className="text-lg font-bold text-green-400">{aboveVwap}/{TRADES.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Trades</p><p className="text-lg font-bold text-indigo-400">{TRADES.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Box className="h-4 w-4 text-indigo-400" /> Recent Blocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {TRADES.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-10">{t.time}</span>
              <span className="text-xs font-bold text-white w-12">{t.symbol}</span>
              <span className="text-xs font-mono text-gray-400 w-14">{(t.shares / 1000).toFixed(0)}K sh</span>
              <span className="text-xs font-mono text-white w-16">${t.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-indigo-400 w-16">{formatLargeNumber(t.value)}</span>
              <Badge variant={t.condition === 'Block' ? 'default' : t.condition === 'Cross' ? 'info' : 'warning'}>{t.condition}</Badge>
              <span className="text-[10px] text-gray-500 w-12">{t.venue}</span>
              <span className={cn('text-[10px] font-mono', t.aboveVwap ? 'text-green-400' : 'text-red-400')}>{t.aboveVwap ? '↑ VWAP' : '↓ VWAP'}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
