'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface ATRStock {
  symbol: string;
  name: string;
  price: number;
  atr14: number;
  atrPct: number;
  avgAtr: number;
  volatility: 'High' | 'Normal' | 'Low';
}

const STOCKS: ATRStock[] = [
  { symbol: 'SMCI', name: 'Super Micro', price: 1012.50, atr14: 65.20, atrPct: 6.44, avgAtr: 42.80, volatility: 'High' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 188.70, atr14: 8.85, atrPct: 4.69, avgAtr: 7.20, volatility: 'High' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, atr14: 28.50, atrPct: 3.24, avgAtr: 22.40, volatility: 'High' },
  { symbol: 'AMD', name: 'Advanced Micro', price: 177.52, atr14: 5.45, atrPct: 3.07, avgAtr: 4.80, volatility: 'Normal' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, atr14: 12.80, atrPct: 2.64, avgAtr: 11.50, volatility: 'Normal' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 186.05, atr14: 3.25, atrPct: 1.75, avgAtr: 3.10, volatility: 'Normal' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, atr14: 6.80, atrPct: 1.68, avgAtr: 6.50, volatility: 'Normal' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 157.40, atr14: 2.15, atrPct: 1.37, avgAtr: 2.25, volatility: 'Low' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 162.85, atr14: 2.05, atrPct: 1.26, avgAtr: 2.10, volatility: 'Low' },
  { symbol: 'KO', name: 'Coca-Cola', price: 60.20, atr14: 0.72, atrPct: 1.20, avgAtr: 0.75, volatility: 'Low' },
];

export default function ATRCalculatorPage() {
  const avgATRPct = STOCKS.reduce((s, st) => s + st.atrPct, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">ATR Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Average True Range (14-period) volatility measure</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Activity className="h-4 w-4 text-yellow-400" /> ATR Rankings</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.atrPct - a.atrPct).map((s) => {
            const vsAvg = ((s.atr14 - s.avgAtr) / s.avgAtr) * 100;
            return (
              <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
                <div className="w-20"><p className="text-xs font-bold text-white">{s.symbol}</p><p className="text-[10px] text-gray-500 truncate">{s.name}</p></div>
                <span className="text-xs font-mono text-white w-14">${s.atr14.toFixed(2)}</span>
                <span className={cn('text-xs font-mono w-12', s.atrPct >= 3 ? 'text-red-400' : s.atrPct >= 2 ? 'text-yellow-400' : 'text-green-400')}>
                  {s.atrPct.toFixed(2)}%
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className={cn('h-full rounded-full', s.volatility === 'High' ? 'bg-red-500/40' : s.volatility === 'Normal' ? 'bg-yellow-500/30' : 'bg-green-500/30')} style={{ width: `${Math.min(s.atrPct * 15, 100)}%` }} />
                </div>
                <span className={cn('text-[10px] font-mono w-12', vsAvg > 0 ? 'text-red-400' : 'text-green-400')}>
                  {vsAvg >= 0 ? '+' : ''}{vsAvg.toFixed(0)}% avg
                </span>
                <Badge variant={s.volatility === 'High' ? 'danger' : s.volatility === 'Low' ? 'success' : 'default'}>{s.volatility}</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
