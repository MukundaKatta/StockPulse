'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { CandlestickChart } from 'lucide-react';

interface CandlestickPattern {
  ticker: string;
  company: string;
  pattern: string;
  price: number;
  direction: 'Bullish' | 'Bearish' | 'Neutral';
  reliability: number;
  timeframe: string;
  confirmed: boolean;
}

const PATTERNS: CandlestickPattern[] = [
  { ticker: 'AAPL', company: 'Apple', pattern: 'Hammer', price: 185.20, direction: 'Bullish', reliability: 82, timeframe: 'Daily', confirmed: true },
  { ticker: 'TSLA', company: 'Tesla', pattern: 'Evening Star', price: 245.80, direction: 'Bearish', reliability: 78, timeframe: 'Daily', confirmed: true },
  { ticker: 'MSFT', company: 'Microsoft', pattern: 'Bullish Engulfing', price: 404.80, direction: 'Bullish', reliability: 88, timeframe: 'Weekly', confirmed: true },
  { ticker: 'GOOGL', company: 'Alphabet', pattern: 'Doji', price: 141.80, direction: 'Neutral', reliability: 62, timeframe: 'Daily', confirmed: false },
  { ticker: 'AMZN', company: 'Amazon', pattern: 'Three White Soldiers', price: 178.25, direction: 'Bullish', reliability: 85, timeframe: 'Daily', confirmed: true },
  { ticker: 'NFLX', company: 'Netflix', pattern: 'Shooting Star', price: 605.40, direction: 'Bearish', reliability: 74, timeframe: 'Daily', confirmed: false },
  { ticker: 'AMD', company: 'AMD', pattern: 'Morning Star', price: 177.52, direction: 'Bullish', reliability: 80, timeframe: 'Weekly', confirmed: true },
  { ticker: 'NVDA', company: 'NVIDIA', pattern: 'Harami', price: 878.35, direction: 'Bullish', reliability: 68, timeframe: 'Daily', confirmed: false },
];

const dirVariant = (d: string) => d === 'Bullish' ? 'success' : d === 'Bearish' ? 'danger' : 'warning';

export default function CandlestickScreenerPage() {
  const bullish = PATTERNS.filter(p => p.direction === 'Bullish').length;
  const bearish = PATTERNS.filter(p => p.direction === 'Bearish').length;
  const avgReliability = PATTERNS.reduce((s, p) => s + p.reliability, 0) / PATTERNS.length;
  const confirmed = PATTERNS.filter(p => p.confirmed).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Candlestick Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Candlestick pattern scanner</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Reliability</p><p className="text-lg font-bold text-indigo-400">{avgReliability.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Confirmed</p><p className="text-lg font-bold text-white">{confirmed}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><CandlestickChart className="h-4 w-4 text-indigo-400" /> Detected Patterns</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PATTERNS.map((p) => (
            <div key={p.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{p.ticker} <span className="text-gray-500">{p.company}</span></p>
                <p className="text-xs text-gray-500">{p.pattern} &middot; {p.timeframe} &middot; {p.reliability}% reliable {p.confirmed ? '(Confirmed)' : ''}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(p.price)}</p>
                </div>
                <Badge variant={dirVariant(p.direction)}>{p.direction}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
