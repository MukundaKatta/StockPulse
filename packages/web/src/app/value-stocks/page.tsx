'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Search } from 'lucide-react';

interface ValueStock {
  symbol: string;
  name: string;
  price: number;
  pe: number;
  pb: number;
  divYield: number;
  fcfYield: number;
  sector: string;
  score: number;
}

const STOCKS: ValueStock[] = [
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 408.50, pe: 8.2, pb: 1.5, divYield: 0, fcfYield: 8.5, sector: 'Financials', score: 92 },
  { symbol: 'GM', name: 'General Motors', price: 38.75, pe: 4.8, pb: 0.8, divYield: 1.2, fcfYield: 15.2, sector: 'Autos', score: 90 },
  { symbol: 'VICI', name: 'VICI Properties', price: 30.20, pe: 14.2, pb: 1.2, divYield: 5.6, fcfYield: 6.8, sector: 'REIT', score: 85 },
  { symbol: 'CVS', name: 'CVS Health', price: 72.40, pe: 9.5, pb: 1.4, divYield: 3.3, fcfYield: 10.4, sector: 'Healthcare', score: 83 },
  { symbol: 'ALLY', name: 'Ally Financial', price: 34.80, pe: 7.2, pb: 0.9, divYield: 3.4, fcfYield: 12.1, sector: 'Financials', score: 82 },
  { symbol: 'VZ', name: 'Verizon Comms', price: 40.15, pe: 8.8, pb: 1.6, divYield: 6.5, fcfYield: 11.8, sector: 'Telecom', score: 80 },
  { symbol: 'BMY', name: 'Bristol-Myers', price: 50.25, pe: 7.5, pb: 3.2, divYield: 4.8, fcfYield: 9.2, sector: 'Healthcare', score: 78 },
  { symbol: 'CI', name: 'Cigna Group', price: 312.80, pe: 12.4, pb: 2.8, divYield: 1.7, fcfYield: 7.5, sector: 'Healthcare', score: 75 },
];

export default function ValueStocksPage() {
  const avgPE = STOCKS.reduce((s, st) => s + st.pe, 0) / STOCKS.length;
  const avgYield = STOCKS.reduce((s, st) => s + st.divYield, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Value Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Undervalued stocks ranked by composite value score</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Avg P/E</p>
          <p className="text-lg font-bold text-green-400">{avgPE.toFixed(1)}x</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Avg Yield</p>
          <p className="text-lg font-bold text-indigo-400">{avgYield.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Screened</p>
          <p className="text-lg font-bold text-white">{STOCKS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Search className="h-4 w-4 text-indigo-400" /> Value Rankings
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s, i) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-6">#{i + 1}</span>
              <div className="w-24">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-gray-400 w-14">{s.pe.toFixed(1)}x PE</span>
              <span className="text-xs font-mono text-gray-400 w-14">{s.pb.toFixed(1)}x PB</span>
              <span className="text-xs font-mono text-green-400 w-12">{s.divYield.toFixed(1)}%</span>
              <Badge variant="info">{s.sector}</Badge>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="bg-green-500/40 h-full rounded-full" style={{ width: `${s.score}%` }} />
              </div>
              <span className="text-[10px] font-mono text-gray-500 w-6">{s.score}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
