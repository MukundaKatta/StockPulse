'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Heart } from 'lucide-react';

interface FearGreedEntry {
  date: string;
  score: number;
  label: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  btcPrice: number;
  btcChange: number;
  volume: string;
  dominance: number;
}

const HISTORY: FearGreedEntry[] = [
  { date: 'Today', score: 72, label: 'Greed', btcPrice: 68420, btcChange: 2.4, volume: '$42.5B', dominance: 52.8 },
  { date: 'Yesterday', score: 68, label: 'Greed', btcPrice: 66820, btcChange: 1.2, volume: '$38.2B', dominance: 52.5 },
  { date: '2 days ago', score: 55, label: 'Neutral', btcPrice: 66030, btcChange: -0.8, volume: '$35.1B', dominance: 53.1 },
  { date: '1 week ago', score: 42, label: 'Fear', btcPrice: 64250, btcChange: -3.5, volume: '$28.4B', dominance: 53.8 },
  { date: '2 weeks ago', score: 28, label: 'Fear', btcPrice: 61800, btcChange: -5.2, volume: '$22.8B', dominance: 54.2 },
  { date: '1 month ago', score: 18, label: 'Extreme Fear', btcPrice: 58500, btcChange: -8.1, volume: '$18.5B', dominance: 55.1 },
  { date: '3 months ago', score: 85, label: 'Extreme Greed', btcPrice: 72400, btcChange: 12.5, volume: '$55.2B', dominance: 51.2 },
];

const labelVariant = (l: string) => l === 'Extreme Greed' ? 'danger' : l === 'Greed' ? 'warning' : l === 'Neutral' ? 'default' : l === 'Fear' ? 'info' : 'success';

export default function CryptoFearGreedPage() {
  const currentScore = HISTORY[0].score;
  const currentLabel = HISTORY[0].label;
  const avgScore = HISTORY.reduce((s, h) => s + h.score, 0) / HISTORY.length;
  const currentBtc = HISTORY[0].btcPrice;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Crypto Fear & Greed</h1>
        <p className="mt-1 text-sm text-gray-500">Crypto fear and greed index</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Current</p><p className="text-lg font-bold text-yellow-400">{currentScore} - {currentLabel}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Score</p><p className="text-lg font-bold text-indigo-400">{avgScore.toFixed(0)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">BTC Price</p><p className="text-lg font-bold text-white">{formatCurrency(currentBtc)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Volume</p><p className="text-lg font-bold text-green-400">{HISTORY[0].volume}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Heart className="h-4 w-4 text-red-400" /> Fear & Greed History</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HISTORY.map((h) => (
            <div key={h.date} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{h.date}</p>
                <p className="text-xs text-gray-500">Vol {h.volume} &middot; BTC Dom {h.dominance}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(h.btcPrice)}</p>
                  <p className={cn('text-[10px] font-mono', h.btcChange >= 0 ? 'text-green-400' : 'text-red-400')}>{h.btcChange > 0 ? '+' : ''}{h.btcChange}%</p>
                </div>
                <Badge variant={labelVariant(h.label)}>{h.score} - {h.label}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
