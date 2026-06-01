'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber, formatCurrency } from '@/lib/formatters';
import { Fish } from 'lucide-react';

interface WhaleTrade {
  symbol: string;
  side: 'Buy' | 'Sell';
  shares: number;
  value: number;
  price: number;
  institution: string;
  time: string;
  darkPool: boolean;
}

const TRADES: WhaleTrade[] = [
  { symbol: 'NVDA', side: 'Buy', shares: 250000, value: 219.6e6, price: 878.35, institution: 'Citadel', time: '14:45', darkPool: false },
  { symbol: 'AAPL', side: 'Sell', shares: 1500000, value: 279.1e6, price: 186.05, institution: 'Vanguard', time: '14:32', darkPool: true },
  { symbol: 'META', side: 'Buy', shares: 300000, value: 145.2e6, price: 484.10, institution: 'BlackRock', time: '14:18', darkPool: false },
  { symbol: 'TSLA', side: 'Sell', shares: 800000, value: 150.9e6, price: 188.70, institution: 'Unknown', time: '13:55', darkPool: true },
  { symbol: 'MSFT', side: 'Buy', shares: 200000, value: 81.0e6, price: 404.87, institution: 'State Street', time: '13:42', darkPool: false },
  { symbol: 'AMD', side: 'Buy', shares: 500000, value: 88.8e6, price: 177.52, institution: 'Two Sigma', time: '13:28', darkPool: true },
  { symbol: 'AMZN', side: 'Buy', shares: 450000, value: 80.2e6, price: 178.25, institution: 'Fidelity', time: '13:10', darkPool: false },
  { symbol: 'GOOGL', side: 'Sell', shares: 600000, value: 85.1e6, price: 141.80, institution: 'Renaissance', time: '12:55', darkPool: true },
  { symbol: 'AVGO', side: 'Buy', shares: 60000, value: 77.1e6, price: 1285.40, institution: 'Citadel', time: '12:38', darkPool: false },
  { symbol: 'CRM', side: 'Sell', shares: 350000, value: 98.8e6, price: 282.40, institution: 'Bridgewater', time: '12:22', darkPool: true },
];

export default function WhaleTrackerPage() {
  const totalBuyVal = TRADES.filter((t) => t.side === 'Buy').reduce((s, t) => s + t.value, 0);
  const totalSellVal = TRADES.filter((t) => t.side === 'Sell').reduce((s, t) => s + t.value, 0);
  const darkPoolPct = (TRADES.filter((t) => t.darkPool).length / TRADES.length) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Whale Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Large institutional block trades today</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Buy Flow</p><p className="text-lg font-bold text-green-400">{formatLargeNumber(totalBuyVal)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sell Flow</p><p className="text-lg font-bold text-red-400">{formatLargeNumber(totalSellVal)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Net Flow</p><p className={cn('text-lg font-bold', totalBuyVal > totalSellVal ? 'text-green-400' : 'text-red-400')}>{formatLargeNumber(totalBuyVal - totalSellVal)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Dark Pool</p><p className="text-lg font-bold text-indigo-400">{darkPoolPct.toFixed(0)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Fish className="h-4 w-4 text-indigo-400" /> Block Trades</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {TRADES.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-10">{t.time}</span>
              <span className="text-xs font-bold text-white w-12">{t.symbol}</span>
              <Badge variant={t.side === 'Buy' ? 'success' : 'danger'}>{t.side}</Badge>
              <span className="text-xs font-mono text-gray-400 w-16">{(t.shares / 1000).toFixed(0)}K sh</span>
              <span className="text-xs font-mono text-white w-16">{formatLargeNumber(t.value)}</span>
              <span className="text-[10px] text-gray-400 w-20 truncate">{t.institution}</span>
              {t.darkPool && <Badge variant="info">Dark Pool</Badge>}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
