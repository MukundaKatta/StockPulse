'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { FileText } from 'lucide-react';

interface DailyIndex {
  name: string;
  value: number;
  change: number;
  changePct: number;
  volume: string;
}

interface DailySector {
  sector: string;
  changePct: number;
  topGainer: string;
  topLoser: string;
}

const INDICES: DailyIndex[] = [
  { name: 'S&P 500', value: 5224.62, change: 42.18, changePct: 0.81, volume: '3.8B' },
  { name: 'Dow Jones', value: 39512.84, change: 125.08, changePct: 0.32, volume: '312M' },
  { name: 'Nasdaq', value: 16340.87, change: 183.02, changePct: 1.13, volume: '5.1B' },
  { name: 'Russell 2000', value: 2075.80, change: -12.45, changePct: -0.60, volume: '1.2B' },
];

const SECTORS: DailySector[] = [
  { sector: 'Technology', changePct: 1.85, topGainer: 'NVDA +4.2%', topLoser: 'INTC -1.8%' },
  { sector: 'Healthcare', changePct: 0.42, topGainer: 'LLY +2.1%', topLoser: 'PFE -1.2%' },
  { sector: 'Financials', changePct: 0.65, topGainer: 'GS +1.8%', topLoser: 'WFC -0.5%' },
  { sector: 'Energy', changePct: -0.82, topGainer: 'OXY +0.8%', topLoser: 'XOM -1.6%' },
  { sector: 'Consumer Disc.', changePct: 1.12, topGainer: 'AMZN +2.4%', topLoser: 'NKE -1.1%' },
  { sector: 'Industrials', changePct: 0.28, topGainer: 'CAT +1.5%', topLoser: 'BA -2.3%' },
  { sector: 'Materials', changePct: -0.45, topGainer: 'FCX +1.2%', topLoser: 'NEM -2.0%' },
  { sector: 'Utilities', changePct: -0.18, topGainer: 'NEE +0.6%', topLoser: 'DUK -0.9%' },
];

export default function DailyReportPage() {
  const advancingSectors = SECTORS.filter((s) => s.changePct > 0).length;
  const bestSector = SECTORS.reduce((best, s) => s.changePct > best.changePct ? s : best);
  const worstSector = SECTORS.reduce((worst, s) => s.changePct < worst.changePct ? s : worst);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Daily Report</h1>
        <p className="mt-1 text-sm text-gray-500">Daily market summary report - March 15, 2024</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {INDICES.map((idx) => (
          <Card key={idx.name} className="!p-3">
            <p className="text-[10px] text-gray-500 uppercase">{idx.name}</p>
            <p className="text-lg font-bold text-white">{idx.value.toLocaleString()}</p>
            <p className={cn('text-xs font-mono', idx.changePct >= 0 ? 'text-green-400' : 'text-red-400')}>
              {idx.changePct >= 0 ? '+' : ''}{idx.changePct.toFixed(2)}%
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-indigo-400" /> Sector Performance</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SECTORS.sort((a, b) => b.changePct - a.changePct).map((s) => (
            <div key={s.sector} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.sector}</span>
                  <Badge variant={s.changePct >= 0 ? 'success' : 'danger'}>
                    {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                  </Badge>
                </div>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-500">
                <span>Top Gainer: <span className="text-green-400 font-mono">{s.topGainer}</span></span>
                <span>Top Loser: <span className="text-red-400 font-mono">{s.topLoser}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
