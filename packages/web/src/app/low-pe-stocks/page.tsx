'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface LowPEStock {
  symbol: string;
  name: string;
  price: number;
  peRatio: number;
  forwardPe: number;
  earningsGrowth: number;
  divYield: number;
  sector: string;
  value: 'Deep Value' | 'Value' | 'Fair';
}

const STOCKS: LowPEStock[] = [
  { symbol: 'BRKB', name: 'Berkshire Hathaway', price: 412.50, peRatio: 10.2, forwardPe: 9.8, earningsGrowth: 12.5, divYield: 0, sector: 'Financials', value: 'Deep Value' },
  { symbol: 'GM', name: 'General Motors', price: 48.20, peRatio: 5.8, forwardPe: 5.2, earningsGrowth: 8.4, divYield: 1.0, sector: 'Auto', value: 'Deep Value' },
  { symbol: 'VTRS', name: 'Viatris', price: 11.80, peRatio: 4.2, forwardPe: 3.8, earningsGrowth: -2.5, divYield: 4.1, sector: 'Healthcare', value: 'Deep Value' },
  { symbol: 'CI', name: 'Cigna Group', price: 332.40, peRatio: 11.5, forwardPe: 10.8, earningsGrowth: 14.2, divYield: 1.6, sector: 'Healthcare', value: 'Value' },
  { symbol: 'MET', name: 'MetLife', price: 72.80, peRatio: 9.8, forwardPe: 8.5, earningsGrowth: 6.2, divYield: 2.8, sector: 'Financials', value: 'Value' },
  { symbol: 'CVS', name: 'CVS Health', price: 78.50, peRatio: 10.8, forwardPe: 9.2, earningsGrowth: 4.5, divYield: 3.4, sector: 'Healthcare', value: 'Value' },
  { symbol: 'HPQ', name: 'HP Inc', price: 32.40, peRatio: 12.2, forwardPe: 10.5, earningsGrowth: 3.8, divYield: 3.2, sector: 'Tech', value: 'Fair' },
  { symbol: 'DOW', name: 'Dow Inc', price: 55.80, peRatio: 13.5, forwardPe: 11.8, earningsGrowth: -5.2, divYield: 5.0, sector: 'Materials', value: 'Fair' },
];

const valueVariant = (v: string) => v === 'Deep Value' ? 'success' : v === 'Value' ? 'info' : 'default';

export default function LowPEStocksPage() {
  const avgPe = STOCKS.reduce((s, st) => s + st.peRatio, 0) / STOCKS.length;
  const avgYield = STOCKS.filter(s => s.divYield > 0).reduce((s, st) => s + st.divYield, 0) / STOCKS.filter(s => s.divYield > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Low P/E Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks with low price-to-earnings ratios</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg P/E</p><p className="text-lg font-bold text-indigo-400">{avgPe.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Div Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Deep Value</p><p className="text-lg font-bold text-cyan-400">{STOCKS.filter(s => s.value === 'Deep Value').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Low P/E Screener</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(s.price)}</span>
              <span className="text-xs font-mono text-indigo-400 w-12">P/E {s.peRatio}</span>
              <span className="text-[10px] text-gray-400 w-14">Fwd {s.forwardPe}</span>
              <span className={cn('text-xs font-mono w-12', s.earningsGrowth >= 0 ? 'text-green-400' : 'text-red-400')}>{s.earningsGrowth >= 0 ? '+' : ''}{s.earningsGrowth}%</span>
              <span className="text-[10px] text-gray-500 w-10">{s.sector}</span>
              <Badge variant={valueVariant(s.value)} className="ml-auto">{s.value}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
