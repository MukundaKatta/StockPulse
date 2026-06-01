'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface CapTier {
  tier: string;
  range: string;
  count: number;
  allocation: number;
  performance: number;
  avgPE: number;
  examples: string[];
  color: string;
}

const TIERS: CapTier[] = [
  { tier: 'Mega Cap', range: '$200B+', count: 5, allocation: 52.4, performance: 28.5, avgPE: 32.1, examples: ['AAPL', 'MSFT', 'NVDA'], color: 'bg-indigo-500' },
  { tier: 'Large Cap', range: '$10B–$200B', count: 12, allocation: 28.6, performance: 14.2, avgPE: 24.8, examples: ['CRM', 'AMD', 'UBER'], color: 'bg-blue-500' },
  { tier: 'Mid Cap', range: '$2B–$10B', count: 8, allocation: 11.2, performance: 8.5, avgPE: 18.4, examples: ['CROX', 'DKNG', 'PATH'], color: 'bg-emerald-500' },
  { tier: 'Small Cap', range: '$300M–$2B', count: 6, allocation: 5.8, performance: -2.1, avgPE: 15.2, examples: ['CLOV', 'SOFI', 'OPEN'], color: 'bg-amber-500' },
  { tier: 'Micro Cap', range: '<$300M', count: 3, allocation: 2.0, performance: -8.4, avgPE: 0, examples: ['Various'], color: 'bg-red-500' },
];

export default function MarketCapTiersPage() {
  const totalCount = TIERS.reduce((s, t) => s + t.count, 0);
  const weightedPerf = TIERS.reduce((s, t) => s + t.allocation * t.performance, 0) / 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Cap Tiers</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio breakdown by market capitalization</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Holdings</p><p className="text-lg font-bold text-white">{totalCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Wtd Performance</p><p className={cn('text-lg font-bold', weightedPerf >= 0 ? 'text-green-400' : 'text-red-400')}>+{weightedPerf.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Tiers</p><p className="text-lg font-bold text-indigo-400">{TIERS.length}</p></Card>
      </div>

      <Card className="!p-4">
        <p className="text-[10px] text-gray-500 uppercase mb-2">Allocation by Tier</p>
        <div className="h-6 rounded bg-white/5 flex overflow-hidden">
          {TIERS.map((t) => (
            <div key={t.tier} className={cn(t.color, 'h-full flex items-center justify-center')} style={{ width: `${t.allocation}%` }}>
              {t.allocation > 8 && <span className="text-[9px] font-bold text-white/90">{t.allocation}%</span>}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {TIERS.map((t) => (
            <div key={t.tier} className="flex items-center gap-1">
              <span className={cn('h-1.5 w-1.5 rounded-full', t.color)} />
              <span className="text-[9px] text-gray-400">{t.tier}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-indigo-400" /> Tier Details</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {TIERS.map((t) => (
            <div key={t.tier} className="px-4 py-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full', t.color)} />
                  <span className="text-xs font-bold text-white">{t.tier}</span>
                  <span className="text-[10px] text-gray-500">{t.range}</span>
                </div>
                <Badge variant={t.performance >= 0 ? 'success' : 'danger'}>{t.performance >= 0 ? '+' : ''}{t.performance.toFixed(1)}%</Badge>
              </div>
              <div className="flex gap-4 text-[10px]">
                <span className="text-gray-400">Holdings: <span className="text-white font-mono">{t.count}</span></span>
                <span className="text-gray-400">Weight: <span className="text-white font-mono">{t.allocation}%</span></span>
                {t.avgPE > 0 && <span className="text-gray-400">Avg P/E: <span className="text-white font-mono">{t.avgPE.toFixed(1)}</span></span>}
                <span className="text-gray-400">Examples: <span className="text-indigo-400">{t.examples.join(', ')}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
