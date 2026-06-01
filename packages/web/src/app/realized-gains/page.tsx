'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Receipt } from 'lucide-react';

interface GainData { symbol: string; name: string; buyPrice: number; sellPrice: number; shares: number; gain: number; term: string; date: string; }
const TRADES: GainData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', buyPrice: 420.00, sellPrice: 878.35, shares: 20, gain: 9167, term: 'Long', date: '2024-01-15' },
  { symbol: 'META', name: 'Meta', buyPrice: 280.40, sellPrice: 484.10, shares: 15, gain: 3056, term: 'Long', date: '2024-02-20' },
  { symbol: 'AAPL', name: 'Apple', buyPrice: 178.20, sellPrice: 186.05, shares: 50, gain: 393, term: 'Short', date: '2024-03-10' },
  { symbol: 'TSLA', name: 'Tesla', buyPrice: 242.80, sellPrice: 188.20, shares: 30, gain: -1638, term: 'Short', date: '2024-03-22' },
  { symbol: 'GOOGL', name: 'Alphabet', buyPrice: 122.40, sellPrice: 141.80, shares: 40, gain: 776, term: 'Long', date: '2024-02-05' },
  { symbol: 'INTC', name: 'Intel', buyPrice: 48.20, sellPrice: 42.80, shares: 100, gain: -540, term: 'Short', date: '2024-03-28' },
];

export default function RealizedGainsPage() {
  const totalGain = TRADES.reduce((s, t) => s + t.gain, 0);
  const longTerm = TRADES.filter((t) => t.term === 'Long').reduce((s, t) => s + t.gain, 0);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Realized Gains</h1><p className="mt-1 text-sm text-gray-500">Closed positions — realized gains and losses summary</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Realized</p><p className={cn('text-lg font-bold', totalGain >= 0 ? 'text-green-400' : 'text-red-400')}>${totalGain.toLocaleString()}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Long-Term</p><p className="text-lg font-bold text-green-400">${longTerm.toLocaleString()}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Trades</p><p className="text-lg font-bold text-indigo-400">{TRADES.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Receipt className="h-4 w-4 text-indigo-400" /> Closed Positions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {TRADES.sort((a, b) => b.gain - a.gain).map((t) => (
            <div key={t.symbol + t.date} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{t.symbol}</span>
                <span className="text-[10px] text-gray-500">{t.name}</span>
                <Badge variant={t.term === 'Long' ? 'info' : 'warning'}>{t.term}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">{t.shares} shares</span>
                <span className="text-[10px] text-gray-500">{t.date}</span>
                <span className={cn('text-sm font-bold font-mono', t.gain >= 0 ? 'text-green-400' : 'text-red-400')}>{t.gain >= 0 ? '+' : ''}${t.gain.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
