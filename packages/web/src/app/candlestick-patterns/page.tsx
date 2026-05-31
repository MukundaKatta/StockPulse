'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/formatters';
import { Search, CandlestickChart } from 'lucide-react';

interface PatternDetection {
  symbol: string;
  pattern: string;
  type: 'bullish' | 'bearish' | 'neutral';
  reliability: 'high' | 'medium' | 'low';
  timeframe: string;
  detectedAt: string;
  description: string;
}

const PATTERNS: PatternDetection[] = [
  { symbol: 'AAPL', pattern: 'Bullish Engulfing', type: 'bullish', reliability: 'high', timeframe: 'Daily', detectedAt: '2 hours ago', description: 'Large green candle fully engulfs prior red candle' },
  { symbol: 'MSFT', pattern: 'Morning Star', type: 'bullish', reliability: 'high', timeframe: 'Daily', detectedAt: '4 hours ago', description: 'Three-candle reversal pattern at support' },
  { symbol: 'TSLA', pattern: 'Bearish Harami', type: 'bearish', reliability: 'medium', timeframe: '4H', detectedAt: '1 hour ago', description: 'Small candle contained within prior large candle' },
  { symbol: 'NVDA', pattern: 'Hammer', type: 'bullish', reliability: 'medium', timeframe: 'Daily', detectedAt: '6 hours ago', description: 'Long lower shadow with small body at top' },
  { symbol: 'AMZN', pattern: 'Shooting Star', type: 'bearish', reliability: 'medium', timeframe: 'Daily', detectedAt: '3 hours ago', description: 'Long upper shadow at resistance level' },
  { symbol: 'META', pattern: 'Three White Soldiers', type: 'bullish', reliability: 'high', timeframe: 'Weekly', detectedAt: '1 day ago', description: 'Three consecutive strong green candles' },
  { symbol: 'JPM', pattern: 'Doji', type: 'neutral', reliability: 'low', timeframe: '4H', detectedAt: '30 mins ago', description: 'Indecision candle with equal open/close' },
  { symbol: 'GOOGL', pattern: 'Evening Star', type: 'bearish', reliability: 'high', timeframe: 'Daily', detectedAt: '5 hours ago', description: 'Three-candle reversal at resistance' },
  { symbol: 'AMD', pattern: 'Piercing Line', type: 'bullish', reliability: 'medium', timeframe: 'Daily', detectedAt: '7 hours ago', description: 'Green candle opens below and closes above midpoint of prior red' },
  { symbol: 'V', pattern: 'Dark Cloud Cover', type: 'bearish', reliability: 'medium', timeframe: '4H', detectedAt: '2 hours ago', description: 'Red candle opens above and closes below midpoint of prior green' },
  { symbol: 'SPY', pattern: 'Spinning Top', type: 'neutral', reliability: 'low', timeframe: '1H', detectedAt: '15 mins ago', description: 'Small body with equal upper and lower shadows' },
  { symbol: 'DIS', pattern: 'Bullish Abandoned Baby', type: 'bullish', reliability: 'high', timeframe: 'Daily', detectedAt: '8 hours ago', description: 'Gap down doji followed by gap up green candle' },
];

export default function CandlestickPatternsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'bullish' | 'bearish' | 'neutral'>('all');

  const filtered = PATTERNS
    .filter((p) => !search || p.symbol.includes(search.toUpperCase()) || p.pattern.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => typeFilter === 'all' || p.type === typeFilter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Candlestick Patterns</h1>
          <p className="mt-1 text-sm text-gray-500">Automated pattern recognition across your watchlist</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 w-48" />
        </div>
      </div>

      {/* Type filter */}
      <div className="flex gap-2">
        {(['all', 'bullish', 'bearish', 'neutral'] as const).map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', typeFilter === t ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{t}</button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Bullish</p>
          <p className="text-lg font-bold text-green-400">{PATTERNS.filter((p) => p.type === 'bullish').length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Bearish</p>
          <p className="text-lg font-bold text-red-400">{PATTERNS.filter((p) => p.type === 'bearish').length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Neutral</p>
          <p className="text-lg font-bold text-gray-400">{PATTERNS.filter((p) => p.type === 'neutral').length}</p>
        </Card>
      </div>

      <div className="space-y-2">
        {filtered.map((p, i) => (
          <Card key={i} className="!p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', p.type === 'bullish' ? 'bg-green-500/10' : p.type === 'bearish' ? 'bg-red-500/10' : 'bg-gray-500/10')}>
                  <CandlestickChart className={cn('h-4 w-4', p.type === 'bullish' ? 'text-green-400' : p.type === 'bearish' ? 'text-red-400' : 'text-gray-400')} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-indigo-400">{p.symbol}</span>
                    <span className="text-sm font-medium text-white">{p.pattern}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{p.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={p.type === 'bullish' ? 'success' : p.type === 'bearish' ? 'danger' : 'info'}>
                  {p.type}
                </Badge>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500">{p.timeframe} • {p.detectedAt}</p>
                  <p className={cn('text-[10px]', p.reliability === 'high' ? 'text-green-400' : p.reliability === 'medium' ? 'text-amber-400' : 'text-gray-500')}>
                    {p.reliability} reliability
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
