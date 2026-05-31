'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Activity, Flame } from 'lucide-react';

interface OptionsFlow {
  time: string;
  symbol: string;
  expiry: string;
  strike: number;
  type: 'call' | 'put';
  side: 'buy' | 'sell';
  premium: number;
  volume: number;
  openInterest: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

const FLOWS: OptionsFlow[] = [
  { time: '15:42', symbol: 'AAPL', expiry: 'Jan 26', strike: 195, type: 'call', side: 'buy', premium: 2450000, volume: 12500, openInterest: 45000, sentiment: 'bullish' },
  { time: '15:38', symbol: 'NVDA', expiry: 'Feb 16', strike: 600, type: 'call', side: 'buy', premium: 5200000, volume: 8200, openInterest: 22000, sentiment: 'bullish' },
  { time: '15:35', symbol: 'TSLA', expiry: 'Jan 19', strike: 220, type: 'put', side: 'buy', premium: 1800000, volume: 15000, openInterest: 38000, sentiment: 'bearish' },
  { time: '15:31', symbol: 'META', expiry: 'Mar 15', strike: 400, type: 'call', side: 'buy', premium: 3100000, volume: 5400, openInterest: 12000, sentiment: 'bullish' },
  { time: '15:28', symbol: 'SPY', expiry: 'Jan 19', strike: 475, type: 'put', side: 'buy', premium: 4500000, volume: 32000, openInterest: 85000, sentiment: 'bearish' },
  { time: '15:22', symbol: 'AMD', expiry: 'Feb 16', strike: 160, type: 'call', side: 'buy', premium: 1900000, volume: 9800, openInterest: 28000, sentiment: 'bullish' },
  { time: '15:18', symbol: 'AMZN', expiry: 'Jan 26', strike: 155, type: 'call', side: 'buy', premium: 2100000, volume: 7200, openInterest: 19000, sentiment: 'bullish' },
  { time: '15:12', symbol: 'QQQ', expiry: 'Jan 19', strike: 400, type: 'put', side: 'sell', premium: 1200000, volume: 18000, openInterest: 62000, sentiment: 'neutral' },
  { time: '15:05', symbol: 'MSFT', expiry: 'Feb 16', strike: 400, type: 'call', side: 'buy', premium: 2800000, volume: 6100, openInterest: 15000, sentiment: 'bullish' },
  { time: '14:58', symbol: 'GOOGL', expiry: 'Jan 26', strike: 145, type: 'put', side: 'buy', premium: 1500000, volume: 11000, openInterest: 31000, sentiment: 'bearish' },
];

export default function OptionsFlowPage() {
  const totalPremium = FLOWS.reduce((s, f) => s + f.premium, 0);
  const bullishPremium = FLOWS.filter((f) => f.sentiment === 'bullish').reduce((s, f) => s + f.premium, 0);
  const bearishPremium = FLOWS.filter((f) => f.sentiment === 'bearish').reduce((s, f) => s + f.premium, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Options Flow</h1>
        <p className="mt-1 text-sm text-gray-500">Unusual options activity and large block trades</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Premium</p>
          <p className="text-lg font-bold text-white">{formatCurrency(totalPremium)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Bullish Flow</p>
          <p className="text-lg font-bold text-green-400">{formatCurrency(bullishPremium)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Bearish Flow</p>
          <p className="text-lg font-bold text-red-400">{formatCurrency(bearishPremium)}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Flame className="h-4 w-4 text-orange-400" /> Live Flow
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {FLOWS.map((flow, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 px-2">
              <span className="text-[10px] text-gray-600 font-mono w-10">{flow.time}</span>
              <span className="text-xs font-medium text-indigo-400 w-12">{flow.symbol}</span>
              <Badge variant={flow.type === 'call' ? 'success' : 'danger'} className="text-[9px] w-10 justify-center">
                {flow.type.toUpperCase()}
              </Badge>
              <span className="text-xs text-gray-400 w-16">{flow.expiry}</span>
              <span className="text-xs font-mono text-gray-300 w-12">${flow.strike}</span>
              <div className="flex-1" />
              <span className="text-xs font-mono text-white">{formatCurrency(flow.premium)}</span>
              <Badge variant={flow.sentiment === 'bullish' ? 'success' : flow.sentiment === 'bearish' ? 'danger' : 'info'} className="text-[9px] w-14 justify-center">
                {flow.sentiment}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
