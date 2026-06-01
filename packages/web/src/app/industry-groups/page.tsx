'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Factory } from 'lucide-react';

interface IndustryGroup {
  name: string;
  sector: string;
  stocks: number;
  avgReturn: number;
  marketCap: string;
  peRatio: number;
  momentum: 'Strong' | 'Moderate' | 'Weak';
  trend: 'Up' | 'Down' | 'Flat';
}

const GROUPS: IndustryGroup[] = [
  { name: 'Semiconductors', sector: 'Technology', stocks: 42, avgReturn: 28.5, marketCap: '$4.2T', peRatio: 35.2, momentum: 'Strong', trend: 'Up' },
  { name: 'Software - Infrastructure', sector: 'Technology', stocks: 68, avgReturn: 15.8, marketCap: '$3.8T', peRatio: 42.5, momentum: 'Moderate', trend: 'Up' },
  { name: 'Drug Manufacturers', sector: 'Healthcare', stocks: 35, avgReturn: 8.2, marketCap: '$2.1T', peRatio: 18.4, momentum: 'Moderate', trend: 'Flat' },
  { name: 'Oil & Gas E&P', sector: 'Energy', stocks: 58, avgReturn: -4.2, marketCap: '$1.5T', peRatio: 12.8, momentum: 'Weak', trend: 'Down' },
  { name: 'Banks - Regional', sector: 'Financials', stocks: 120, avgReturn: 12.1, marketCap: '$0.8T', peRatio: 10.5, momentum: 'Moderate', trend: 'Up' },
  { name: 'Aerospace & Defense', sector: 'Industrials', stocks: 28, avgReturn: 18.6, marketCap: '$1.2T', peRatio: 24.8, momentum: 'Strong', trend: 'Up' },
  { name: 'REITs - Residential', sector: 'Real Estate', stocks: 22, avgReturn: -2.8, marketCap: '$0.3T', peRatio: 35.0, momentum: 'Weak', trend: 'Down' },
];

const momentumVariant = (m: string) => m === 'Strong' ? 'success' : m === 'Moderate' ? 'warning' : 'danger';

export default function IndustryGroupsPage() {
  const totalStocks = GROUPS.reduce((s, g) => s + g.stocks, 0);
  const avgReturn = GROUPS.reduce((s, g) => s + g.avgReturn, 0) / GROUPS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Industry Groups</h1>
        <p className="mt-1 text-sm text-gray-500">Industry group performance and momentum analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Groups</p><p className="text-lg font-bold text-white">{GROUPS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Stocks</p><p className="text-lg font-bold text-indigo-400">{totalStocks}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Return</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong</p><p className="text-lg font-bold text-cyan-400">{GROUPS.filter(g => g.momentum === 'Strong').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Factory className="h-4 w-4 text-indigo-400" /> Industry Group Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {GROUPS.map((g) => (
            <div key={g.name} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-40">
                <p className="text-xs font-bold text-white">{g.name}</p>
                <p className="text-[10px] text-gray-500">{g.sector} &middot; {g.stocks} stocks</p>
              </div>
              <span className={cn('text-xs font-mono w-14', g.avgReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{g.avgReturn >= 0 ? '+' : ''}{g.avgReturn}%</span>
              <span className="text-xs font-mono text-white w-12">{g.marketCap}</span>
              <span className="text-[10px] text-gray-400 w-14">P/E {g.peRatio}</span>
              <Badge variant={momentumVariant(g.momentum)} className="ml-auto">{g.momentum}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
