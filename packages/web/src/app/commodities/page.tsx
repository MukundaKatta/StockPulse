'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkline } from '@/components/ui/sparkline';
import { formatCurrency, cn } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Flame, Wheat, Gem, Droplets } from 'lucide-react';

interface Commodity {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
  category: string;
  sparkline: number[];
}

function genSparkline(price: number, change: number): number[] {
  const pts: number[] = [];
  const start = price - change;
  for (let i = 0; i <= 20; i++) {
    pts.push(start + change * (i / 20) + (Math.random() - 0.5) * price * 0.005);
  }
  return pts;
}

const COMMODITIES: Commodity[] = [
  { name: 'Gold', symbol: 'GC', price: 2345.80, change: 12.50, changePercent: 0.54, unit: '/oz', category: 'Metals' },
  { name: 'Silver', symbol: 'SI', price: 29.45, change: -0.23, changePercent: -0.77, unit: '/oz', category: 'Metals' },
  { name: 'Crude Oil (WTI)', symbol: 'CL', price: 78.92, change: 1.34, changePercent: 1.73, unit: '/bbl', category: 'Energy' },
  { name: 'Natural Gas', symbol: 'NG', price: 2.34, change: -0.08, changePercent: -3.31, unit: '/MMBtu', category: 'Energy' },
  { name: 'Copper', symbol: 'HG', price: 4.52, change: 0.06, changePercent: 1.35, unit: '/lb', category: 'Metals' },
  { name: 'Corn', symbol: 'ZC', price: 445.50, change: -3.25, changePercent: -0.72, unit: '/bu', category: 'Agriculture' },
  { name: 'Wheat', symbol: 'ZW', price: 568.75, change: 8.50, changePercent: 1.52, unit: '/bu', category: 'Agriculture' },
  { name: 'Soybeans', symbol: 'ZS', price: 1182.25, change: -5.50, changePercent: -0.46, unit: '/bu', category: 'Agriculture' },
  { name: 'Platinum', symbol: 'PL', price: 978.40, change: 4.20, changePercent: 0.43, unit: '/oz', category: 'Metals' },
  { name: 'Palladium', symbol: 'PA', price: 1023.50, change: -12.30, changePercent: -1.19, unit: '/oz', category: 'Metals' },
].map((c) => ({ ...c, sparkline: genSparkline(c.price, c.change) }));

const categoryIcons: Record<string, typeof Flame> = {
  'Metals': Gem,
  'Energy': Flame,
  'Agriculture': Wheat,
};

export default function CommoditiesPage() {
  const categories = [...new Set(COMMODITIES.map((c) => c.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Commodities</h1>
        <p className="mt-1 text-sm text-gray-500">Track commodity prices across metals, energy, and agriculture</p>
      </div>

      {categories.map((category) => {
        const Icon = categoryIcons[category] || Droplets;
        const items = COMMODITIES.filter((c) => c.category === category);

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-indigo-400" />
                {category}
              </CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {items.map((commodity) => (
                <div key={commodity.symbol} className="flex items-center gap-4 rounded-lg border border-white/[0.03] p-3 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{commodity.name}</p>
                    <p className="text-[10px] text-gray-500">{commodity.symbol} • {commodity.unit}</p>
                  </div>
                  <Sparkline data={commodity.sparkline} width={60} height={20} className="hidden sm:block" />
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-white">{formatCurrency(commodity.price)}</p>
                    <div className="flex items-center justify-end gap-1">
                      {commodity.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                      <span className={cn('text-xs font-mono', commodity.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                        {commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </motion.div>
  );
}
