'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { Gem } from 'lucide-react';

interface Commodity {
  name: string;
  symbol: string;
  price: number;
  unit: string;
  change: number;
  category: 'energy' | 'metals' | 'agriculture' | 'livestock';
}

const COMMODITIES: Commodity[] = [
  { name: 'Crude Oil (WTI)', symbol: 'CL', price: 72.45, unit: '/bbl', change: -1.16, category: 'energy' },
  { name: 'Brent Crude', symbol: 'BZ', price: 77.82, unit: '/bbl', change: -0.95, category: 'energy' },
  { name: 'Natural Gas', symbol: 'NG', price: 2.68, unit: '/MMBtu', change: 4.69, category: 'energy' },
  { name: 'RBOB Gasoline', symbol: 'RB', price: 2.15, unit: '/gal', change: -0.82, category: 'energy' },
  { name: 'Gold', symbol: 'GC', price: 2048.60, unit: '/oz', change: 0.41, category: 'metals' },
  { name: 'Silver', symbol: 'SI', price: 23.15, unit: '/oz', change: -0.94, category: 'metals' },
  { name: 'Platinum', symbol: 'PL', price: 915.20, unit: '/oz', change: 0.22, category: 'metals' },
  { name: 'Copper', symbol: 'HG', price: 3.82, unit: '/lb', change: 1.06, category: 'metals' },
  { name: 'Palladium', symbol: 'PA', price: 1005.50, unit: '/oz', change: -1.85, category: 'metals' },
  { name: 'Corn', symbol: 'ZC', price: 458.50, unit: '¢/bu', change: -0.70, category: 'agriculture' },
  { name: 'Soybeans', symbol: 'ZS', price: 1245.75, unit: '¢/bu', change: 0.69, category: 'agriculture' },
  { name: 'Wheat', symbol: 'ZW', price: 612.25, unit: '¢/bu', change: 1.25, category: 'agriculture' },
  { name: 'Coffee', symbol: 'KC', price: 185.40, unit: '¢/lb', change: 2.15, category: 'agriculture' },
  { name: 'Sugar', symbol: 'SB', price: 22.85, unit: '¢/lb', change: -0.45, category: 'agriculture' },
  { name: 'Live Cattle', symbol: 'LE', price: 172.50, unit: '¢/lb', change: 0.35, category: 'livestock' },
  { name: 'Lean Hogs', symbol: 'HE', price: 72.80, unit: '¢/lb', change: -1.20, category: 'livestock' },
];

const categoryLabels = { energy: 'Energy', metals: 'Precious & Base Metals', agriculture: 'Agriculture', livestock: 'Livestock' };

export default function CommoditiesDashboardPage() {
  const categories = ['energy', 'metals', 'agriculture', 'livestock'] as const;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Commodities</h1>
        <p className="mt-1 text-sm text-gray-500">Real-time commodity prices across sectors</p>
      </div>

      {categories.map((cat) => (
        <Card key={cat}>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gem className="h-4 w-4 text-yellow-400" /> {categoryLabels[cat]}</CardTitle></CardHeader>
          <div className="divide-y divide-white/5">
            {COMMODITIES.filter((c) => c.category === cat).map((commodity) => (
              <div key={commodity.symbol} className="flex items-center gap-3 py-2 px-2">
                <span className="text-xs font-medium text-indigo-400 w-8 font-mono">{commodity.symbol}</span>
                <div className="flex-1"><p className="text-sm text-white">{commodity.name}</p></div>
                <span className="text-sm font-mono text-white">${commodity.price.toLocaleString()}<span className="text-[10px] text-gray-500">{commodity.unit}</span></span>
                <span className={cn('text-xs font-mono w-16 text-right', commodity.change >= 0 ? 'text-green-400' : 'text-red-400')}>{commodity.change >= 0 ? '+' : ''}{commodity.change.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
