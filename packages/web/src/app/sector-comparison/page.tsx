'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface SectorData {
  sector: string;
  pe: number;
  divYield: number;
  returnYTD: number;
  return1Y: number;
  beta: number;
  weight: number;
}

const SECTORS: SectorData[] = [
  { sector: 'Technology', pe: 32.5, divYield: 0.8, returnYTD: 8.2, return1Y: 52.4, beta: 1.25, weight: 30.2 },
  { sector: 'Healthcare', pe: 18.4, divYield: 1.5, returnYTD: 3.8, return1Y: 8.2, beta: 0.78, weight: 12.8 },
  { sector: 'Financials', pe: 14.2, divYield: 1.8, returnYTD: 5.5, return1Y: 18.5, beta: 1.10, weight: 12.5 },
  { sector: 'Consumer Disc.', pe: 26.8, divYield: 0.9, returnYTD: 2.1, return1Y: 28.4, beta: 1.15, weight: 10.8 },
  { sector: 'Communication', pe: 20.5, divYield: 1.0, returnYTD: 10.5, return1Y: 45.8, beta: 1.05, weight: 8.5 },
  { sector: 'Industrials', pe: 22.1, divYield: 1.4, returnYTD: 3.2, return1Y: 15.2, beta: 1.02, weight: 8.2 },
  { sector: 'Consumer Staples', pe: 21.8, divYield: 2.6, returnYTD: -1.5, return1Y: 2.8, beta: 0.62, weight: 6.2 },
  { sector: 'Energy', pe: 11.5, divYield: 3.2, returnYTD: -2.8, return1Y: -5.4, beta: 0.95, weight: 4.0 },
  { sector: 'Utilities', pe: 16.2, divYield: 3.5, returnYTD: -4.2, return1Y: -8.5, beta: 0.45, weight: 2.5 },
  { sector: 'Materials', pe: 19.8, divYield: 1.8, returnYTD: -0.8, return1Y: 5.2, beta: 0.90, weight: 2.4 },
  { sector: 'Real Estate', pe: 35.2, divYield: 3.8, returnYTD: -5.5, return1Y: -12.4, beta: 0.85, weight: 2.3 },
];

export default function SectorComparisonPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Comparison</h1>
        <p className="mt-1 text-sm text-gray-500">S&P 500 sector fundamentals and performance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Layers className="h-4 w-4 text-indigo-400" /> Sector Metrics
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex items-center gap-2 px-4 py-1.5 border-b border-white/5">
              <span className="text-[10px] text-gray-500 w-28">Sector</span>
              <span className="text-[10px] text-gray-500 w-12 text-right">P/E</span>
              <span className="text-[10px] text-gray-500 w-12 text-right">Yield</span>
              <span className="text-[10px] text-gray-500 w-14 text-right">YTD</span>
              <span className="text-[10px] text-gray-500 w-14 text-right">1Y</span>
              <span className="text-[10px] text-gray-500 w-12 text-right">Beta</span>
              <span className="text-[10px] text-gray-500 w-14 text-right">Weight</span>
              <span className="text-[10px] text-gray-500 flex-1">Allocation</span>
            </div>
            <div className="divide-y divide-white/5">
              {SECTORS.map((s) => (
                <div key={s.sector} className="flex items-center gap-2 px-4 py-1.5">
                  <span className="text-xs text-white w-28 truncate">{s.sector}</span>
                  <span className="text-xs font-mono text-gray-400 w-12 text-right">{s.pe.toFixed(1)}x</span>
                  <span className="text-xs font-mono text-green-400 w-12 text-right">{s.divYield.toFixed(1)}%</span>
                  <span className={cn('text-xs font-mono w-14 text-right', s.returnYTD >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {s.returnYTD >= 0 ? '+' : ''}{s.returnYTD.toFixed(1)}%
                  </span>
                  <span className={cn('text-xs font-mono w-14 text-right', s.return1Y >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {s.return1Y >= 0 ? '+' : ''}{s.return1Y.toFixed(1)}%
                  </span>
                  <span className="text-xs font-mono text-gray-400 w-12 text-right">{s.beta.toFixed(2)}</span>
                  <span className="text-xs font-mono text-indigo-400 w-14 text-right">{s.weight.toFixed(1)}%</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="bg-indigo-500/40 h-full rounded-full" style={{ width: `${(s.weight / 30.2) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
