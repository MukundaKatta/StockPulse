'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Building2 } from 'lucide-react';

interface LargeCapValue {
  symbol: string;
  name: string;
  price: number;
  peRatio: number;
  pbRatio: number;
  divYield: number;
  marketCap: string;
  ytdReturn: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
}

const STOCKS: LargeCapValue[] = [
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 412.50, peRatio: 10.2, pbRatio: 1.5, divYield: 0, marketCap: '$885B', ytdReturn: 15.2, rating: 'Strong Buy' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.40, peRatio: 11.8, pbRatio: 1.9, divYield: 2.4, marketCap: '$572B', ytdReturn: 18.5, rating: 'Buy' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.20, peRatio: 14.2, pbRatio: 5.8, divYield: 3.0, marketCap: '$381B', ytdReturn: 2.8, rating: 'Hold' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 108.60, peRatio: 12.5, pbRatio: 2.1, divYield: 3.4, marketCap: '$452B', ytdReturn: 8.4, rating: 'Buy' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 165.80, peRatio: 25.4, pbRatio: 7.8, divYield: 2.4, marketCap: '$390B', ytdReturn: 5.1, rating: 'Hold' },
  { symbol: 'CVX', name: 'Chevron', price: 162.30, peRatio: 13.8, pbRatio: 1.9, divYield: 3.8, marketCap: '$305B', ytdReturn: 4.2, rating: 'Buy' },
  { symbol: 'BAC', name: 'Bank of America', price: 38.50, peRatio: 12.1, pbRatio: 1.1, divYield: 2.5, marketCap: '$305B', ytdReturn: 14.8, rating: 'Strong Buy' },
];

const ratingVariant = (r: string) => r === 'Strong Buy' ? 'success' : r === 'Buy' ? 'info' : r === 'Hold' ? 'warning' : 'danger';

export default function LargeCapValuePage() {
  const avgPe = STOCKS.reduce((s, st) => s + st.peRatio, 0) / STOCKS.length;
  const avgYield = STOCKS.filter(s => s.divYield > 0).reduce((s, st) => s + st.divYield, 0) / STOCKS.filter(s => s.divYield > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Large Cap Value</h1>
        <p className="mt-1 text-sm text-gray-500">Large cap value stock screener and analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg P/E</p><p className="text-lg font-bold text-indigo-400">{avgPe.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Buy</p><p className="text-lg font-bold text-cyan-400">{STOCKS.filter(s => s.rating === 'Strong Buy').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-indigo-400" /> Large Cap Value Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(s.price)}</span>
              <span className="text-[10px] text-gray-400 w-12">P/E {s.peRatio}</span>
              <span className="text-[10px] text-gray-400 w-12">P/B {s.pbRatio}</span>
              <span className="text-xs font-mono text-green-400 w-10">{s.divYield}%</span>
              <span className={cn('text-xs font-mono w-12', s.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{s.ytdReturn >= 0 ? '+' : ''}{s.ytdReturn}%</span>
              <Badge variant={ratingVariant(s.rating)} className="ml-auto">{s.rating}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
