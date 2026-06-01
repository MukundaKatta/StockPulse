'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Ear } from 'lucide-react';

interface WhisperData {
  symbol: string;
  name: string;
  reportDate: string;
  consensusEPS: number;
  whisperEPS: number;
  actualEPS: number | null;
  surprise: number | null;
  whisperVsConsensus: number;
  impliedMove: number;
  sentiment: 'Very Bullish' | 'Bullish' | 'Neutral' | 'Bearish';
}

const WHISPERS: WhisperData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', reportDate: '2024-02-21', consensusEPS: 4.59, whisperEPS: 4.78, actualEPS: 5.16, surprise: 12.4, whisperVsConsensus: 4.1, impliedMove: 8.2, sentiment: 'Very Bullish' },
  { symbol: 'META', name: 'Meta', reportDate: '2024-02-01', consensusEPS: 4.96, whisperEPS: 5.18, actualEPS: 5.33, surprise: 7.5, whisperVsConsensus: 4.4, impliedMove: 6.5, sentiment: 'Bullish' },
  { symbol: 'AMZN', name: 'Amazon', reportDate: '2024-02-01', consensusEPS: 0.80, whisperEPS: 0.88, actualEPS: 1.00, surprise: 25.0, whisperVsConsensus: 10.0, impliedMove: 5.8, sentiment: 'Bullish' },
  { symbol: 'GOOGL', name: 'Alphabet', reportDate: '2024-01-30', consensusEPS: 1.59, whisperEPS: 1.65, actualEPS: 1.64, surprise: 3.1, whisperVsConsensus: 3.8, impliedMove: 5.2, sentiment: 'Bullish' },
  { symbol: 'MSFT', name: 'Microsoft', reportDate: '2024-01-30', consensusEPS: 2.78, whisperEPS: 2.85, actualEPS: 2.93, surprise: 5.4, whisperVsConsensus: 2.5, impliedMove: 4.1, sentiment: 'Neutral' },
  { symbol: 'AAPL', name: 'Apple', reportDate: '2024-02-01', consensusEPS: 2.10, whisperEPS: 2.12, actualEPS: 2.18, surprise: 3.8, whisperVsConsensus: 1.0, impliedMove: 3.5, sentiment: 'Neutral' },
  { symbol: 'TSLA', name: 'Tesla', reportDate: '2024-01-24', consensusEPS: 0.74, whisperEPS: 0.68, actualEPS: 0.71, surprise: -4.1, whisperVsConsensus: -8.1, impliedMove: 9.8, sentiment: 'Bearish' },
  { symbol: 'AMD', name: 'AMD', reportDate: '2024-01-30', consensusEPS: 0.77, whisperEPS: 0.82, actualEPS: 0.77, surprise: 0.0, whisperVsConsensus: 6.5, impliedMove: 7.2, sentiment: 'Bullish' },
];

export default function EarningsWhisperPage() {
  const beatRate = WHISPERS.filter((w) => w.actualEPS !== null && w.surprise !== null && w.surprise > 0).length;
  const total = WHISPERS.filter((w) => w.actualEPS !== null).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Earnings Whisper</h1>
        <p className="mt-1 text-sm text-gray-500">Whisper numbers vs consensus estimates</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Beat Rate</p><p className="text-lg font-bold text-green-400">{total > 0 ? ((beatRate / total) * 100).toFixed(0) : 0}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Reported</p><p className="text-lg font-bold text-white">{total}/{WHISPERS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Surprise</p><p className="text-lg font-bold text-indigo-400">{(WHISPERS.filter((w) => w.surprise !== null).reduce((s, w) => s + (w.surprise ?? 0), 0) / total).toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Ear className="h-4 w-4 text-indigo-400" /> Whisper Numbers</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {WHISPERS.map((w) => {
            const sentimentColor = w.sentiment === 'Very Bullish' ? 'success' : w.sentiment === 'Bullish' ? 'success' : w.sentiment === 'Bearish' ? 'danger' : 'default';
            return (
              <div key={w.symbol} className="px-4 py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{w.symbol}</span>
                    <span className="text-[10px] text-gray-500">{w.name}</span>
                    <Badge variant={sentimentColor}>{w.sentiment}</Badge>
                  </div>
                  <span className="text-[10px] text-gray-500">{w.reportDate}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                  <span className="text-gray-400">Consensus: <span className="font-mono text-white">${w.consensusEPS.toFixed(2)}</span></span>
                  <span className="text-gray-400">Whisper: <span className="font-mono text-indigo-400">${w.whisperEPS.toFixed(2)}</span></span>
                  {w.actualEPS !== null && (
                    <span className="text-gray-400">Actual: <span className={cn('font-mono', (w.surprise ?? 0) >= 0 ? 'text-green-400' : 'text-red-400')}>${w.actualEPS.toFixed(2)}</span></span>
                  )}
                  {w.surprise !== null && (
                    <span className={cn('font-mono', w.surprise >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {w.surprise >= 0 ? '+' : ''}{w.surprise.toFixed(1)}% surprise
                    </span>
                  )}
                  <span className="text-gray-400">Implied Move: <span className="font-mono text-amber-400">&plusmn;{w.impliedMove}%</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
