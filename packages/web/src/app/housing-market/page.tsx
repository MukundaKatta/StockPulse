'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Home } from 'lucide-react';

interface HousingMetric {
  metro: string;
  state: string;
  medianPrice: number;
  priceChangeYoY: number;
  inventory: number;
  daysOnMarket: number;
  mortgageRate: number;
  status: 'Hot' | 'Warm' | 'Cool' | 'Cold';
}

const MARKETS: HousingMetric[] = [
  { metro: 'San Francisco', state: 'CA', medianPrice: 1285000, priceChangeYoY: -2.4, inventory: 2800, daysOnMarket: 28, mortgageRate: 6.85, status: 'Cool' },
  { metro: 'Austin', state: 'TX', medianPrice: 485000, priceChangeYoY: -5.1, inventory: 8200, daysOnMarket: 62, mortgageRate: 6.85, status: 'Cold' },
  { metro: 'Miami', state: 'FL', medianPrice: 615000, priceChangeYoY: 8.2, inventory: 4100, daysOnMarket: 35, mortgageRate: 6.85, status: 'Hot' },
  { metro: 'Nashville', state: 'TN', medianPrice: 435000, priceChangeYoY: 3.8, inventory: 5600, daysOnMarket: 42, mortgageRate: 6.85, status: 'Warm' },
  { metro: 'Phoenix', state: 'AZ', medianPrice: 410000, priceChangeYoY: 1.2, inventory: 9800, daysOnMarket: 55, mortgageRate: 6.85, status: 'Cool' },
  { metro: 'Denver', state: 'CO', medianPrice: 555000, priceChangeYoY: -1.8, inventory: 6100, daysOnMarket: 38, mortgageRate: 6.85, status: 'Cool' },
  { metro: 'New York', state: 'NY', medianPrice: 785000, priceChangeYoY: 5.4, inventory: 3200, daysOnMarket: 45, mortgageRate: 6.85, status: 'Hot' },
  { metro: 'Charlotte', state: 'NC', medianPrice: 385000, priceChangeYoY: 6.1, inventory: 4800, daysOnMarket: 30, mortgageRate: 6.85, status: 'Warm' },
];

export default function HousingMarketPage() {
  const avgPrice = MARKETS.reduce((s, m) => s + m.medianPrice, 0) / MARKETS.length;
  const avgDom = Math.round(MARKETS.reduce((s, m) => s + m.daysOnMarket, 0) / MARKETS.length);
  const hotMarkets = MARKETS.filter((m) => m.status === 'Hot').length;
  const avgChange = MARKETS.reduce((s, m) => s + m.priceChangeYoY, 0) / MARKETS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Housing Market</h1>
        <p className="mt-1 text-sm text-gray-500">Median prices, inventory, and market conditions by metro</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Median Price</p>
          <p className="text-lg font-bold text-white">{formatCurrency(avgPrice)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Days on Mkt</p>
          <p className="text-lg font-bold text-indigo-400">{avgDom}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Hot Markets</p>
          <p className="text-lg font-bold text-red-400">{hotMarkets}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg YoY Change</p>
          <p className={cn('text-lg font-bold', avgChange >= 0 ? 'text-green-400' : 'text-red-400')}>{avgChange >= 0 ? '+' : ''}{avgChange.toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-indigo-400" /> Metro Area Indicators
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {MARKETS.sort((a, b) => b.medianPrice - a.medianPrice).map((m) => (
            <div key={m.metro} className="flex items-center gap-3 py-2 px-4">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{m.metro}</p>
                <p className="text-[10px] text-gray-500">{m.state}</p>
              </div>
              <Badge variant={m.status === 'Hot' ? 'danger' : m.status === 'Warm' ? 'warning' : m.status === 'Cool' ? 'info' : 'default'}>
                {m.status}
              </Badge>
              <span className="text-xs font-mono text-white w-20">{formatCurrency(m.medianPrice)}</span>
              <span className={cn('text-xs font-mono w-14', m.priceChangeYoY >= 0 ? 'text-green-400' : 'text-red-400')}>
                {m.priceChangeYoY >= 0 ? '+' : ''}{m.priceChangeYoY}%
              </span>
              <span className="text-[10px] text-gray-400 w-16">{m.inventory.toLocaleString()} units</span>
              <span className="text-[10px] text-gray-500 ml-auto">{m.daysOnMarket}d on mkt</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
