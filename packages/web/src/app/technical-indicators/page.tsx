'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/formatters';
import { Search, Activity } from 'lucide-react';
import Link from 'next/link';

interface IndicatorSignal {
  symbol: string;
  name: string;
  rsi: number;
  macd: 'bullish' | 'bearish' | 'neutral';
  sma20: 'above' | 'below';
  sma50: 'above' | 'below';
  sma200: 'above' | 'below';
  bollingerPosition: 'upper' | 'middle' | 'lower';
  overallSignal: 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
}

const SIGNALS: IndicatorSignal[] = [
  { symbol: 'AAPL', name: 'Apple', rsi: 58, macd: 'bullish', sma20: 'above', sma50: 'above', sma200: 'above', bollingerPosition: 'middle', overallSignal: 'buy' },
  { symbol: 'MSFT', name: 'Microsoft', rsi: 62, macd: 'bullish', sma20: 'above', sma50: 'above', sma200: 'above', bollingerPosition: 'upper', overallSignal: 'strong_buy' },
  { symbol: 'TSLA', name: 'Tesla', rsi: 42, macd: 'bearish', sma20: 'below', sma50: 'below', sma200: 'below', bollingerPosition: 'lower', overallSignal: 'sell' },
  { symbol: 'NVDA', name: 'NVIDIA', rsi: 72, macd: 'bullish', sma20: 'above', sma50: 'above', sma200: 'above', bollingerPosition: 'upper', overallSignal: 'strong_buy' },
  { symbol: 'AMZN', name: 'Amazon', rsi: 55, macd: 'neutral', sma20: 'above', sma50: 'above', sma200: 'above', bollingerPosition: 'middle', overallSignal: 'buy' },
  { symbol: 'META', name: 'Meta', rsi: 65, macd: 'bullish', sma20: 'above', sma50: 'above', sma200: 'above', bollingerPosition: 'upper', overallSignal: 'strong_buy' },
  { symbol: 'AMD', name: 'AMD', rsi: 48, macd: 'neutral', sma20: 'below', sma50: 'above', sma200: 'above', bollingerPosition: 'middle', overallSignal: 'neutral' },
  { symbol: 'GOOGL', name: 'Alphabet', rsi: 52, macd: 'bullish', sma20: 'above', sma50: 'above', sma200: 'above', bollingerPosition: 'middle', overallSignal: 'buy' },
  { symbol: 'COIN', name: 'Coinbase', rsi: 35, macd: 'bearish', sma20: 'below', sma50: 'below', sma200: 'above', bollingerPosition: 'lower', overallSignal: 'strong_sell' },
  { symbol: 'DIS', name: 'Disney', rsi: 44, macd: 'bearish', sma20: 'below', sma50: 'below', sma200: 'below', bollingerPosition: 'lower', overallSignal: 'sell' },
];

const signalLabels = { strong_buy: 'Strong Buy', buy: 'Buy', neutral: 'Neutral', sell: 'Sell', strong_sell: 'Strong Sell' };
const signalVariants = { strong_buy: 'success' as const, buy: 'success' as const, neutral: 'info' as const, sell: 'danger' as const, strong_sell: 'danger' as const };

function getRSIColor(rsi: number): string {
  if (rsi >= 70) return 'text-red-400';
  if (rsi <= 30) return 'text-green-400';
  return 'text-gray-300';
}

export default function TechnicalIndicatorsPage() {
  const [search, setSearch] = useState('');

  const filtered = SIGNALS.filter((s) => !search || s.symbol.includes(search.toUpperCase()) || s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Technical Indicators</h1>
          <p className="mt-1 text-sm text-gray-500">Multi-indicator signal summary</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 w-48" />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Symbol</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">RSI(14)</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">MACD</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">SMA 20</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">SMA 50</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">SMA 200</th>
                <th className="px-3 py-2.5 text-center text-xs font-medium uppercase text-gray-500">Signal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stock) => (
                <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                    <p className="text-[10px] text-gray-500">{stock.name}</p>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={cn('font-mono text-xs font-medium', getRSIColor(stock.rsi))}>
                      {stock.rsi}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={cn('text-xs', stock.macd === 'bullish' ? 'text-green-400' : stock.macd === 'bearish' ? 'text-red-400' : 'text-gray-500')}>
                      {stock.macd === 'bullish' ? '▲' : stock.macd === 'bearish' ? '▼' : '—'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={cn('text-xs', stock.sma20 === 'above' ? 'text-green-400' : 'text-red-400')}>
                      {stock.sma20 === 'above' ? '▲' : '▼'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={cn('text-xs', stock.sma50 === 'above' ? 'text-green-400' : 'text-red-400')}>
                      {stock.sma50 === 'above' ? '▲' : '▼'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={cn('text-xs', stock.sma200 === 'above' ? 'text-green-400' : 'text-red-400')}>
                      {stock.sma200 === 'above' ? '▲' : '▼'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <Badge variant={signalVariants[stock.overallSignal]}>
                      {signalLabels[stock.overallSignal]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
