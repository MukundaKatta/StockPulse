'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface MarketStat {
  label: string;
  value: string;
  change: string;
  category: string;
}

const STATS: MarketStat[] = [
  { label: 'S&P 500', value: '5,026.61', change: '+0.82%', category: 'Indices' },
  { label: 'DJIA', value: '38,726.33', change: '+0.35%', category: 'Indices' },
  { label: 'Nasdaq', value: '15,793.72', change: '+1.15%', category: 'Indices' },
  { label: 'Russell 2000', value: '2,002.15', change: '-0.42%', category: 'Indices' },
  { label: 'VIX', value: '13.85', change: '-5.2%', category: 'Volatility' },
  { label: 'NYSE Advance', value: '1,842', change: '', category: 'Breadth' },
  { label: 'NYSE Decline', value: '1,158', change: '', category: 'Breadth' },
  { label: 'New Highs', value: '248', change: '', category: 'Breadth' },
  { label: 'New Lows', value: '32', change: '', category: 'Breadth' },
  { label: 'NYSE Volume', value: '4.2B', change: '+12%', category: 'Volume' },
  { label: 'Up Volume %', value: '68.5%', change: '', category: 'Volume' },
  { label: 'TRIN (Arms)', value: '0.85', change: '', category: 'Volume' },
  { label: '10Y Treasury', value: '4.18%', change: '+2 bps', category: 'Rates' },
  { label: 'Fed Funds', value: '5.50%', change: 'unch', category: 'Rates' },
  { label: 'Dollar Index', value: '104.28', change: '+0.15%', category: 'FX' },
  { label: 'Gold', value: '$2,038.50', change: '-0.32%', category: 'Commodities' },
  { label: 'WTI Crude', value: '$76.84', change: '+1.45%', category: 'Commodities' },
  { label: 'Bitcoin', value: '$48,250', change: '+2.8%', category: 'Crypto' },
];

export default function MarketStatisticsPage() {
  const categories = [...new Set(STATS.map((s) => s.category))];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Statistics</h1>
        <p className="mt-1 text-sm text-gray-500">Real-time market data dashboard</p>
      </div>

      {categories.map((cat) => (
        <Card key={cat}>
          <CardHeader>
            <CardTitle className="text-sm text-indigo-400">{cat}</CardTitle>
          </CardHeader>
          <div className="divide-y divide-white/5">
            {STATS.filter((s) => s.category === cat).map((s) => {
              const isPositive = s.change.startsWith('+');
              const isNegative = s.change.startsWith('-');
              return (
                <div key={s.label} className="flex items-center justify-between py-1.5 px-4">
                  <span className="text-xs text-gray-400">{s.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white">{s.value}</span>
                    {s.change && (
                      <span className={cn('text-[10px] font-mono w-16 text-right', isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-500')}>
                        {s.change}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
