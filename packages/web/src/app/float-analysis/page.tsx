'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface FloatData {
  symbol: string;
  name: string;
  sharesOut: number;
  floatShares: number;
  insiderPct: number;
  institutionalPct: number;
  shortPct: number;
  shortRatio: number;
  avgVolume: number;
}

const STOCKS: FloatData[] = [
  { symbol: 'GME', name: 'GameStop', sharesOut: 305, floatShares: 228, insiderPct: 12.1, institutionalPct: 27.8, shortPct: 24.1, shortRatio: 3.2, avgVolume: 8.4 },
  { symbol: 'AMC', name: 'AMC Entertainment', sharesOut: 519, floatShares: 468, insiderPct: 0.4, institutionalPct: 32.5, shortPct: 18.7, shortRatio: 1.8, avgVolume: 22.1 },
  { symbol: 'TSLA', name: 'Tesla Inc', sharesOut: 3190, floatShares: 2680, insiderPct: 13.0, institutionalPct: 44.2, shortPct: 3.1, shortRatio: 1.1, avgVolume: 112.5 },
  { symbol: 'AAPL', name: 'Apple Inc', sharesOut: 15460, floatShares: 15350, insiderPct: 0.07, institutionalPct: 60.8, shortPct: 0.7, shortRatio: 1.0, avgVolume: 54.2 },
  { symbol: 'RIVN', name: 'Rivian Auto', sharesOut: 978, floatShares: 820, insiderPct: 8.2, institutionalPct: 51.4, shortPct: 14.2, shortRatio: 2.4, avgVolume: 28.6 },
  { symbol: 'PLTR', name: 'Palantir', sharesOut: 2170, floatShares: 1840, insiderPct: 10.5, institutionalPct: 35.2, shortPct: 5.8, shortRatio: 1.6, avgVolume: 42.8 },
  { symbol: 'SNAP', name: 'Snap Inc', sharesOut: 1590, floatShares: 1180, insiderPct: 3.2, institutionalPct: 52.1, shortPct: 8.4, shortRatio: 2.1, avgVolume: 18.2 },
  { symbol: 'CVNA', name: 'Carvana', sharesOut: 197, floatShares: 105, insiderPct: 42.5, institutionalPct: 38.2, shortPct: 32.4, shortRatio: 4.8, avgVolume: 6.4 },
];

function fmtM(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}B` : `${n.toFixed(0)}M`;
}

export default function FloatAnalysisPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Float Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Share float, short interest, and ownership breakdown</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Float & Short Interest</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => {
            const floatPct = (s.floatShares / s.sharesOut) * 100;
            return (
              <div key={s.symbol} className="px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{s.symbol}</span>
                    <span className="text-[10px] text-gray-500">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.shortPct > 15 && <Badge variant="danger">High Short</Badge>}
                    {s.insiderPct > 10 && <Badge variant="warning">Insider Heavy</Badge>}
                  </div>
                </div>
                <div className="h-3 rounded bg-white/5 flex overflow-hidden">
                  <div className="bg-indigo-500/80 h-full" style={{ width: `${s.insiderPct}%` }} />
                  <div className="bg-blue-500/80 h-full" style={{ width: `${s.institutionalPct}%` }} />
                  <div className="bg-gray-600/80 h-full" style={{ width: `${100 - s.insiderPct - s.institutionalPct}%` }} />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                  <span className="text-gray-400">Shares: <span className="text-white font-mono">{fmtM(s.sharesOut)}</span></span>
                  <span className="text-gray-400">Float: <span className="text-white font-mono">{fmtM(s.floatShares)}</span> ({floatPct.toFixed(0)}%)</span>
                  <span className="text-gray-400">Insider: <span className="text-indigo-400 font-mono">{s.insiderPct}%</span></span>
                  <span className="text-gray-400">Inst: <span className="text-blue-400 font-mono">{s.institutionalPct}%</span></span>
                  <span className="text-gray-400">Short: <span className={cn('font-mono', s.shortPct > 15 ? 'text-red-400' : 'text-gray-300')}>{s.shortPct}%</span></span>
                  <span className="text-gray-400">Days to Cover: <span className="text-white font-mono">{s.shortRatio}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
