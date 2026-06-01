'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface HighBetaStock {
  symbol: string;
  name: string;
  price: number;
  beta: number;
  change1D: number;
  changeYTD: number;
  volatility30D: number;
  marketCap: string;
  momentum: 'Bullish' | 'Bearish' | 'Neutral';
}

const STOCKS: HighBetaStock[] = [
  { symbol: 'COIN', name: 'Coinbase', price: 225.40, beta: 3.45, change1D: 4.2, changeYTD: 28.5, volatility30D: 65.2, marketCap: '$54B', momentum: 'Bullish' },
  { symbol: 'MARA', name: 'Marathon Digital', price: 22.80, beta: 4.85, change1D: 6.8, changeYTD: 45.2, volatility30D: 82.4, marketCap: '$6.5B', momentum: 'Bullish' },
  { symbol: 'RIVN', name: 'Rivian', price: 14.50, beta: 2.95, change1D: -5.2, changeYTD: -32.5, volatility30D: 58.8, marketCap: '$14B', momentum: 'Bearish' },
  { symbol: 'UPST', name: 'Upstart Holdings', price: 28.40, beta: 3.12, change1D: 3.5, changeYTD: 12.8, volatility30D: 72.1, marketCap: '$2.4B', momentum: 'Neutral' },
  { symbol: 'SOFI', name: 'SoFi Technologies', price: 8.20, beta: 2.68, change1D: -2.1, changeYTD: -15.4, volatility30D: 48.5, marketCap: '$8.5B', momentum: 'Bearish' },
  { symbol: 'SNOW', name: 'Snowflake', price: 165.20, beta: 2.42, change1D: 1.8, changeYTD: -18.2, volatility30D: 45.2, marketCap: '$55B', momentum: 'Neutral' },
  { symbol: 'PLTR', name: 'Palantir', price: 24.80, beta: 2.55, change1D: 5.4, changeYTD: 42.8, volatility30D: 52.8, marketCap: '$52B', momentum: 'Bullish' },
  { symbol: 'SMCI', name: 'Super Micro', price: 892.50, beta: 3.28, change1D: 8.2, changeYTD: 225.0, volatility30D: 78.5, marketCap: '$52B', momentum: 'Bullish' },
];

const momVariant = (m: string) => m === 'Bullish' ? 'success' : m === 'Bearish' ? 'danger' : 'warning';

export default function HighBetaPage() {
  const avgBeta = STOCKS.reduce((s, st) => s + st.beta, 0) / STOCKS.length;
  const avgVol = STOCKS.reduce((s, st) => s + st.volatility30D, 0) / STOCKS.length;
  const bullish = STOCKS.filter(s => s.momentum === 'Bullish').length;
  const avgChange = STOCKS.reduce((s, st) => s + st.change1D, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">High Beta Screener</h1>
        <p className="mt-1 text-sm text-gray-500">High beta stocks with elevated volatility</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Beta</p><p className="text-lg font-bold text-white">{avgBeta.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Vol (30D)</p><p className="text-lg font-bold text-amber-400">{avgVol.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg 1D Change</p><p className={cn('text-lg font-bold', avgChange >= 0 ? 'text-green-400' : 'text-red-400')}>{avgChange >= 0 ? '+' : ''}{avgChange.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Activity className="h-4 w-4 text-indigo-400" /> High Beta Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.beta - a.beta).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{s.symbol} <span className="text-gray-500">{s.name}</span></p>
                <p className="text-xs text-gray-500">Beta {s.beta} &middot; Vol {s.volatility30D}% &middot; {s.marketCap}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(s.price)}</p>
                  <p className={cn('text-[10px] font-mono', s.change1D >= 0 ? 'text-green-400' : 'text-red-400')}>{s.change1D >= 0 ? '+' : ''}{s.change1D}% today</p>
                </div>
                <Badge variant={momVariant(s.momentum)}>{s.momentum}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
