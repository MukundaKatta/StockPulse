'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { EyeOff } from 'lucide-react';

interface DarkPoolTrade {
  ticker: string;
  company: string;
  dpVolume: string;
  totalVolume: string;
  dpPercent: number;
  avgPrice: number;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  notional: string;
}

const TRADES: DarkPoolTrade[] = [
  { ticker: 'AAPL', company: 'Apple', dpVolume: '18.2M', totalVolume: '45.5M', dpPercent: 40, avgPrice: 185.20, sentiment: 'Bullish', notional: '$3.4B' },
  { ticker: 'TSLA', company: 'Tesla', dpVolume: '22.5M', totalVolume: '52.1M', dpPercent: 43, avgPrice: 245.80, sentiment: 'Bearish', notional: '$5.5B' },
  { ticker: 'NVDA', company: 'NVIDIA', dpVolume: '15.8M', totalVolume: '38.2M', dpPercent: 41, avgPrice: 132.40, sentiment: 'Bullish', notional: '$2.1B' },
  { ticker: 'AMD', company: 'AMD', dpVolume: '12.1M', totalVolume: '32.5M', dpPercent: 37, avgPrice: 145.60, sentiment: 'Neutral', notional: '$1.8B' },
  { ticker: 'AMZN', company: 'Amazon', dpVolume: '8.5M', totalVolume: '22.0M', dpPercent: 39, avgPrice: 190.30, sentiment: 'Bullish', notional: '$1.6B' },
  { ticker: 'SPY', company: 'SPDR S&P 500', dpVolume: '42.0M', totalVolume: '85.0M', dpPercent: 49, avgPrice: 480.50, sentiment: 'Neutral', notional: '$20.2B' },
];

const sentVariant = (s: string) => s === 'Bullish' ? 'success' : s === 'Bearish' ? 'danger' : 'default';

export default function DarkPoolVolumePage() {
  const avgDpPct = TRADES.reduce((s, t) => s + t.dpPercent, 0) / TRADES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dark Pool Volume</h1>
        <p className="mt-1 text-sm text-gray-500">Off-exchange trading activity</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Tickers</p>
          <p className="text-lg font-bold text-white">{TRADES.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg DP %</p>
          <p className="text-lg font-bold text-indigo-400">{avgDpPct.toFixed(0)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Bullish</p>
          <p className="text-lg font-bold text-green-400">{TRADES.filter(t => t.sentiment === 'Bullish').length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><EyeOff className="inline h-4 w-4 mr-1" />Dark Pool Activity</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {TRADES.map((t) => (
            <div key={t.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{t.ticker} <span className="text-gray-500">{t.company}</span></p>
                <p className="text-xs text-gray-500">DP Vol {t.dpVolume} / {t.totalVolume} &middot; {t.notional}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{t.dpPercent}% DP</p>
                  <p className="text-[10px] text-gray-500">${t.avgPrice}</p>
                </div>
                <Badge variant={sentVariant(t.sentiment)}>{t.sentiment}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
