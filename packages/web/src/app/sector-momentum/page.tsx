'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Zap } from 'lucide-react';

interface SectorMomentum {
  sector: string;
  ticker: string;
  return1W: number;
  return1M: number;
  return3M: number;
  momentum: number;
  rank: number;
}

const SECTORS: SectorMomentum[] = [
  { sector: 'Technology', ticker: 'XLK', return1W: 2.8, return1M: 8.5, return3M: 15.2, momentum: 88, rank: 1 },
  { sector: 'Communication', ticker: 'XLC', return1W: 1.9, return1M: 6.2, return3M: 12.8, momentum: 82, rank: 2 },
  { sector: 'Consumer Disc.', ticker: 'XLY', return1W: 1.5, return1M: 5.1, return3M: 10.4, momentum: 75, rank: 3 },
  { sector: 'Industrials', ticker: 'XLI', return1W: 0.8, return1M: 3.8, return3M: 8.6, momentum: 68, rank: 4 },
  { sector: 'Healthcare', ticker: 'XLV', return1W: 0.3, return1M: 2.1, return3M: 5.2, momentum: 55, rank: 5 },
  { sector: 'Financials', ticker: 'XLF', return1W: -0.2, return1M: 1.5, return3M: 6.8, momentum: 52, rank: 6 },
  { sector: 'Materials', ticker: 'XLB', return1W: -0.5, return1M: 0.8, return3M: 3.2, momentum: 42, rank: 7 },
  { sector: 'Consumer Staples', ticker: 'XLP', return1W: -0.8, return1M: -0.5, return3M: 2.1, momentum: 35, rank: 8 },
  { sector: 'Energy', ticker: 'XLE', return1W: -1.2, return1M: -2.8, return3M: -5.4, momentum: 22, rank: 9 },
  { sector: 'Utilities', ticker: 'XLU', return1W: -1.5, return1M: -3.2, return3M: -4.8, momentum: 18, rank: 10 },
  { sector: 'Real Estate', ticker: 'XLRE', return1W: -1.8, return1M: -4.1, return3M: -8.2, momentum: 12, rank: 11 },
];

export default function SectorMomentumPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Momentum</h1>
        <p className="mt-1 text-sm text-gray-500">Relative momentum rankings across GICS sectors</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-yellow-400" /> Momentum Rankings
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {SECTORS.map((s) => (
            <div key={s.ticker} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-6">#{s.rank}</span>
              <div className="w-28">
                <p className="text-xs font-bold text-white">{s.sector}</p>
                <p className="text-[10px] text-gray-500">{s.ticker}</p>
              </div>
              <span className={cn('text-xs font-mono w-14', s.return1W >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.return1W >= 0 ? '+' : ''}{s.return1W.toFixed(1)}% 1W
              </span>
              <span className={cn('text-xs font-mono w-14', s.return1M >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.return1M >= 0 ? '+' : ''}{s.return1M.toFixed(1)}% 1M
              </span>
              <span className={cn('text-xs font-mono w-14', s.return3M >= 0 ? 'text-green-400' : 'text-red-400')}>
                {s.return3M >= 0 ? '+' : ''}{s.return3M.toFixed(1)}% 3M
              </span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={cn('h-full rounded-full', s.momentum >= 60 ? 'bg-green-500/50' : s.momentum >= 40 ? 'bg-yellow-500/50' : 'bg-red-500/50')}
                  style={{ width: `${s.momentum}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-gray-500 w-8">{s.momentum}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
