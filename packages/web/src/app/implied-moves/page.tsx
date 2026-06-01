'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface ImpliedMove {
  symbol: string;
  event: string;
  eventDate: string;
  currentPrice: number;
  impliedMove: number;
  impliedUp: number;
  impliedDown: number;
  iv: number;
  signal: 'Bullish' | 'Bearish' | 'Neutral';
}

const MOVES: ImpliedMove[] = [
  { symbol: 'AAPL', event: 'Earnings Q2', eventDate: 'Jul 25', currentPrice: 192.50, impliedMove: 4.8, impliedUp: 201.74, impliedDown: 183.26, iv: 38.2, signal: 'Bullish' },
  { symbol: 'NVDA', event: 'Earnings Q2', eventDate: 'Aug 21', currentPrice: 135.20, impliedMove: 9.2, impliedUp: 147.64, impliedDown: 122.76, iv: 62.5, signal: 'Bullish' },
  { symbol: 'TSLA', event: 'Earnings Q2', eventDate: 'Jul 18', currentPrice: 248.30, impliedMove: 11.5, impliedUp: 276.85, impliedDown: 219.75, iv: 72.1, signal: 'Bearish' },
  { symbol: 'META', event: 'Earnings Q2', eventDate: 'Jul 24', currentPrice: 505.10, impliedMove: 7.1, impliedUp: 540.96, impliedDown: 469.24, iv: 44.8, signal: 'Neutral' },
  { symbol: 'AMZN', event: 'Earnings Q2', eventDate: 'Jul 31', currentPrice: 191.80, impliedMove: 6.5, impliedUp: 204.27, impliedDown: 179.33, iv: 40.2, signal: 'Bullish' },
  { symbol: 'CRM', event: 'Earnings Q1', eventDate: 'Jun 5', currentPrice: 282.40, impliedMove: 8.3, impliedUp: 305.84, impliedDown: 258.96, iv: 48.6, signal: 'Neutral' },
  { symbol: 'AVGO', event: 'Earnings Q2', eventDate: 'Jun 12', currentPrice: 1685.00, impliedMove: 7.8, impliedUp: 1816.43, impliedDown: 1553.57, iv: 52.0, signal: 'Bullish' },
];

const signalVariant = (s: string) => s === 'Bullish' ? 'success' : s === 'Bearish' ? 'danger' : 'default';

export default function ImpliedMovesPage() {
  const avgMove = MOVES.reduce((s, m) => s + m.impliedMove, 0) / MOVES.length;
  const avgIv = MOVES.reduce((s, m) => s + m.iv, 0) / MOVES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Implied Moves</h1>
        <p className="mt-1 text-sm text-gray-500">Options-implied price moves around events</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Events</p><p className="text-lg font-bold text-white">{MOVES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Move</p><p className="text-lg font-bold text-indigo-400">{avgMove.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg IV</p><p className="text-lg font-bold text-yellow-400">{avgIv.toFixed(0)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{MOVES.filter(m => m.signal === 'Bullish').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-indigo-400" /> Implied Move Calculator</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {MOVES.map((m) => (
            <div key={m.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-20">
                <p className="text-xs font-bold text-white">{m.symbol}</p>
                <p className="text-[10px] text-gray-500">{m.event}</p>
              </div>
              <span className="text-[10px] text-gray-400 w-12">{m.eventDate}</span>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(m.currentPrice)}</span>
              <span className="text-xs font-mono text-indigo-400 w-10">{cn('±' + m.impliedMove + '%')}</span>
              <span className="text-[10px] text-green-400 w-14">↑{formatCurrency(m.impliedUp)}</span>
              <span className="text-[10px] text-red-400 w-14">↓{formatCurrency(m.impliedDown)}</span>
              <span className="text-[10px] text-gray-500 w-10">IV {m.iv}%</span>
              <Badge variant={signalVariant(m.signal)} className="ml-auto">{m.signal}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
