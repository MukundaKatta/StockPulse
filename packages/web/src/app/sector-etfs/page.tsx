'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface SectorETF {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  day: number;
  week: number;
  month: number;
  ytd: number;
  year: number;
}

const SECTOR_ETFS: SectorETF[] = [
  { symbol: 'XLK', name: 'Technology Select SPDR', sector: 'Technology', price: 198.50, day: 0.85, week: 2.1, month: 5.8, ytd: 56.2, year: 52.1 },
  { symbol: 'XLC', name: 'Communication Services', sector: 'Communication', price: 72.40, day: 0.42, week: 1.5, month: 4.2, ytd: 52.8, year: 48.5 },
  { symbol: 'XLY', name: 'Consumer Discretionary', sector: 'Consumer Disc.', price: 180.20, day: 0.65, week: 1.8, month: 3.5, ytd: 38.5, year: 35.2 },
  { symbol: 'XLI', name: 'Industrials Select SPDR', sector: 'Industrials', price: 112.80, day: 0.32, week: 0.8, month: 2.1, ytd: 16.5, year: 14.8 },
  { symbol: 'XLF', name: 'Financial Select SPDR', sector: 'Financials', price: 38.90, day: 0.28, week: 0.5, month: 1.8, ytd: 11.2, year: 9.5 },
  { symbol: 'XLV', name: 'Health Care Select SPDR', sector: 'Healthcare', price: 142.60, day: 0.15, week: -0.3, month: 1.2, ytd: 2.8, year: 1.5 },
  { symbol: 'XLB', name: 'Materials Select SPDR', sector: 'Materials', price: 84.30, day: -0.12, week: -0.5, month: 0.8, ytd: 8.5, year: 6.2 },
  { symbol: 'XLRE', name: 'Real Estate Select SPDR', sector: 'Real Estate', price: 38.50, day: -0.35, week: -1.2, month: -0.5, ytd: 5.2, year: 3.8 },
  { symbol: 'XLP', name: 'Consumer Staples SPDR', sector: 'Consumer Stap.', price: 73.80, day: -0.18, week: -0.8, month: -1.2, ytd: -1.5, year: -2.1 },
  { symbol: 'XLE', name: 'Energy Select SPDR', sector: 'Energy', price: 85.20, day: -0.95, week: -2.5, month: -3.8, ytd: -2.1, year: -5.2 },
  { symbol: 'XLU', name: 'Utilities Select SPDR', sector: 'Utilities', price: 65.90, day: -0.42, week: -1.5, month: -2.1, ytd: -8.5, year: -10.2 },
];

export default function SectorETFsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector ETFs</h1>
        <p className="mt-1 text-sm text-gray-500">SPDR sector fund performance comparison</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2.5 px-2 font-medium">ETF</th>
              <th className="text-left py-2.5 px-2 font-medium">Sector</th>
              <th className="text-right py-2.5 px-2 font-medium">Price</th>
              <th className="text-right py-2.5 px-2 font-medium">1D</th>
              <th className="text-right py-2.5 px-2 font-medium">1W</th>
              <th className="text-right py-2.5 px-2 font-medium">1M</th>
              <th className="text-right py-2.5 px-2 font-medium">YTD</th>
              <th className="text-right py-2.5 px-2 font-medium">1Y</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {SECTOR_ETFS.map((etf) => (
                <tr key={etf.symbol} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-2 font-medium text-indigo-400">{etf.symbol}</td>
                  <td className="py-2.5 px-2 text-gray-300">{etf.sector}</td>
                  <td className="py-2.5 px-2 text-right font-mono text-white">${etf.price.toFixed(2)}</td>
                  {[etf.day, etf.week, etf.month, etf.ytd, etf.year].map((val, i) => (
                    <td key={i} className={cn('py-2.5 px-2 text-right font-mono', val >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {val >= 0 ? '+' : ''}{val.toFixed(1)}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">YTD Performance</CardTitle></CardHeader>
        <div className="space-y-2 px-2 pb-3">
          {[...SECTOR_ETFS].sort((a, b) => b.ytd - a.ytd).map((etf) => (
            <div key={etf.symbol} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-28 truncate">{etf.sector}</span>
              <div className="flex-1 h-4 relative">
                {etf.ytd >= 0 ? (
                  <div className="absolute inset-y-0 left-0 bg-green-500/40 rounded-r" style={{ width: `${(etf.ytd / 60) * 100}%` }} />
                ) : (
                  <div className="absolute inset-y-0 right-full bg-red-500/40 rounded-l" style={{ width: `${(Math.abs(etf.ytd) / 60) * 100}%`, right: 'auto', left: `${100 - (Math.abs(etf.ytd) / 60) * 100}%` }} />
                )}
              </div>
              <span className={cn('text-xs font-mono w-14 text-right', etf.ytd >= 0 ? 'text-green-400' : 'text-red-400')}>{etf.ytd >= 0 ? '+' : ''}{etf.ytd.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
