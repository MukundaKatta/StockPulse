'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Layers, TrendingUp, TrendingDown } from 'lucide-react';

interface SectorDetail {
  sector: string;
  marketCap: string;
  peRatio: number;
  divYield: number;
  performance1M: number;
  performance3M: number;
  performanceYTD: number;
  momentum: 'strong' | 'moderate' | 'weak';
  relativeStrength: number;
}

const SECTORS: SectorDetail[] = [
  { sector: 'Technology', marketCap: '$14.2T', peRatio: 35.2, divYield: 0.72, performance1M: 5.8, performance3M: 12.5, performanceYTD: 56.2, momentum: 'strong', relativeStrength: 92 },
  { sector: 'Healthcare', marketCap: '$7.8T', peRatio: 18.5, divYield: 1.65, performance1M: 1.2, performance3M: 3.5, performanceYTD: 2.8, momentum: 'weak', relativeStrength: 38 },
  { sector: 'Financials', marketCap: '$8.2T', peRatio: 12.8, divYield: 2.15, performance1M: 1.8, performance3M: 5.2, performanceYTD: 11.2, momentum: 'moderate', relativeStrength: 58 },
  { sector: 'Consumer Disc.', marketCap: '$5.9T', peRatio: 28.5, divYield: 0.85, performance1M: 3.5, performance3M: 8.2, performanceYTD: 38.5, momentum: 'strong', relativeStrength: 82 },
  { sector: 'Communication', marketCap: '$4.5T', peRatio: 20.5, divYield: 0.95, performance1M: 4.2, performance3M: 10.8, performanceYTD: 52.8, momentum: 'strong', relativeStrength: 88 },
  { sector: 'Industrials', marketCap: '$5.1T', peRatio: 22.1, divYield: 1.45, performance1M: 2.1, performance3M: 4.8, performanceYTD: 16.5, momentum: 'moderate', relativeStrength: 62 },
  { sector: 'Energy', marketCap: '$2.8T', peRatio: 11.2, divYield: 3.52, performance1M: -3.8, performance3M: -5.2, performanceYTD: -2.1, momentum: 'weak', relativeStrength: 25 },
  { sector: 'Utilities', marketCap: '$1.5T', peRatio: 16.8, divYield: 3.25, performance1M: -2.1, performance3M: -4.5, performanceYTD: -8.5, momentum: 'weak', relativeStrength: 15 },
  { sector: 'Materials', marketCap: '$2.1T', peRatio: 18.2, divYield: 1.85, performance1M: 0.8, performance3M: 2.5, performanceYTD: 8.5, momentum: 'moderate', relativeStrength: 48 },
  { sector: 'Real Estate', marketCap: '$1.2T', peRatio: 32.5, divYield: 3.85, performance1M: -0.5, performance3M: -1.2, performanceYTD: 5.2, momentum: 'weak', relativeStrength: 32 },
  { sector: 'Consumer Stap.', marketCap: '$3.8T', peRatio: 21.5, divYield: 2.65, performance1M: -1.2, performance3M: -2.8, performanceYTD: -1.5, momentum: 'weak', relativeStrength: 22 },
];

export default function SectorAnalysisPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Fundamental and momentum analysis by sector</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2.5 px-2 font-medium">Sector</th>
              <th className="text-right py-2.5 px-2 font-medium">Mkt Cap</th>
              <th className="text-right py-2.5 px-2 font-medium">P/E</th>
              <th className="text-right py-2.5 px-2 font-medium">Div %</th>
              <th className="text-right py-2.5 px-2 font-medium">1M</th>
              <th className="text-right py-2.5 px-2 font-medium">YTD</th>
              <th className="text-right py-2.5 px-2 font-medium">RS</th>
              <th className="text-center py-2.5 px-2 font-medium">Momentum</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {SECTORS.map((s) => (
                <tr key={s.sector} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-2 text-gray-300 font-medium">{s.sector}</td>
                  <td className="py-2.5 px-2 text-right text-gray-400">{s.marketCap}</td>
                  <td className="py-2.5 px-2 text-right font-mono text-gray-300">{s.peRatio}</td>
                  <td className="py-2.5 px-2 text-right font-mono text-yellow-400">{s.divYield.toFixed(2)}%</td>
                  <td className={cn('py-2.5 px-2 text-right font-mono', s.performance1M >= 0 ? 'text-green-400' : 'text-red-400')}>{s.performance1M >= 0 ? '+' : ''}{s.performance1M.toFixed(1)}%</td>
                  <td className={cn('py-2.5 px-2 text-right font-mono', s.performanceYTD >= 0 ? 'text-green-400' : 'text-red-400')}>{s.performanceYTD >= 0 ? '+' : ''}{s.performanceYTD.toFixed(1)}%</td>
                  <td className="py-2.5 px-2 text-right"><span className={cn('font-mono', s.relativeStrength >= 70 ? 'text-green-400' : s.relativeStrength >= 40 ? 'text-yellow-400' : 'text-red-400')}>{s.relativeStrength}</span></td>
                  <td className="py-2.5 px-2 text-center"><Badge variant={s.momentum === 'strong' ? 'success' : s.momentum === 'moderate' ? 'warning' : 'danger'} className="text-[9px] capitalize">{s.momentum}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
