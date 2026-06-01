'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface Signal {
  ticker: string;
  company: string;
  price: number;
  signalType: 'Strong Buy' | 'Buy' | 'Sell' | 'Strong Sell' | 'Hold';
  indicator: string;
  strength: number;
  targetPrice: number;
  timeframe: string;
}

const SIGNALS: Signal[] = [
  { ticker: 'NVDA', company: 'NVIDIA', price: 878.35, signalType: 'Strong Buy', indicator: 'MACD Crossover', strength: 92, targetPrice: 950.00, timeframe: '2 weeks' },
  { ticker: 'AAPL', company: 'Apple', price: 185.20, signalType: 'Buy', indicator: 'RSI Oversold Bounce', strength: 78, targetPrice: 198.00, timeframe: '1 month' },
  { ticker: 'TSLA', company: 'Tesla', price: 245.80, signalType: 'Sell', indicator: 'Death Cross', strength: 85, targetPrice: 210.00, timeframe: '3 weeks' },
  { ticker: 'META', company: 'Meta', price: 484.10, signalType: 'Strong Buy', indicator: 'Golden Cross', strength: 88, targetPrice: 540.00, timeframe: '1 month' },
  { ticker: 'AMD', company: 'AMD', price: 177.52, signalType: 'Hold', indicator: 'Bollinger Squeeze', strength: 55, targetPrice: 180.00, timeframe: '1 week' },
  { ticker: 'AMZN', company: 'Amazon', price: 178.25, signalType: 'Buy', indicator: 'Support Bounce', strength: 72, targetPrice: 195.00, timeframe: '2 weeks' },
  { ticker: 'INTC', company: 'Intel', price: 42.80, signalType: 'Strong Sell', indicator: 'Head & Shoulders', strength: 90, targetPrice: 35.00, timeframe: '1 month' },
];

const signalVariant = (s: string) => s === 'Strong Buy' ? 'success' : s === 'Buy' ? 'info' : s === 'Hold' ? 'warning' : 'danger';

export default function BuySellSignalsPage() {
  const buySignals = SIGNALS.filter(s => s.signalType.includes('Buy')).length;
  const sellSignals = SIGNALS.filter(s => s.signalType.includes('Sell')).length;
  const avgStrength = SIGNALS.reduce((s, sig) => s + sig.strength, 0) / SIGNALS.length;
  const strongSignals = SIGNALS.filter(s => s.strength >= 80).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Buy/Sell Signals</h1>
        <p className="mt-1 text-sm text-gray-500">Technical buy/sell signal scanner</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Buy Signals</p><p className="text-lg font-bold text-green-400">{buySignals}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Sell Signals</p><p className="text-lg font-bold text-red-400">{sellSignals}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Strength</p><p className="text-lg font-bold text-indigo-400">{avgStrength.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Strong</p><p className="text-lg font-bold text-white">{strongSignals}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-indigo-400" /> Active Signals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SIGNALS.map((s) => (
            <div key={s.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{s.ticker} <span className="text-gray-500">{s.company}</span></p>
                <p className="text-xs text-gray-500">{s.indicator} &middot; {s.timeframe} &middot; {s.strength}% strength</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(s.price)}</p>
                  <p className="text-[10px] text-gray-500">Target {formatCurrency(s.targetPrice)}</p>
                </div>
                <Badge variant={signalVariant(s.signalType)}>{s.signalType}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
