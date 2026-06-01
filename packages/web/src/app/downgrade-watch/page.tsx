'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { TrendingDown } from 'lucide-react';

interface DowngradeAlert {
  symbol: string;
  company: string;
  analyst: string;
  from: string;
  to: string;
  priceTarget: number;
  currentPrice: number;
  downside: number;
  urgency: 'High' | 'Medium' | 'Low';
}

const ALERTS: DowngradeAlert[] = [
  { symbol: 'TSLA', company: 'Tesla', analyst: 'Goldman Sachs', from: 'Buy', to: 'Neutral', priceTarget: 200.00, currentPrice: 245.80, downside: -18.6, urgency: 'High' },
  { symbol: 'BA', company: 'Boeing', analyst: 'Morgan Stanley', from: 'Overweight', to: 'Equal Weight', priceTarget: 190.00, currentPrice: 218.50, downside: -13.0, urgency: 'High' },
  { symbol: 'DIS', company: 'Disney', analyst: 'JP Morgan', from: 'Buy', to: 'Hold', priceTarget: 95.00, currentPrice: 112.40, downside: -15.5, urgency: 'Medium' },
  { symbol: 'NFLX', company: 'Netflix', analyst: 'Barclays', from: 'Overweight', to: 'Neutral', priceTarget: 580.00, currentPrice: 628.50, downside: -7.7, urgency: 'Low' },
  { symbol: 'INTC', company: 'Intel', analyst: 'BofA', from: 'Neutral', to: 'Underperform', priceTarget: 28.00, currentPrice: 42.80, downside: -34.6, urgency: 'High' },
  { symbol: 'PFE', company: 'Pfizer', analyst: 'Citi', from: 'Buy', to: 'Neutral', priceTarget: 26.00, currentPrice: 28.50, downside: -8.8, urgency: 'Medium' },
  { symbol: 'NKE', company: 'Nike', analyst: 'UBS', from: 'Buy', to: 'Hold', priceTarget: 88.00, currentPrice: 98.20, downside: -10.4, urgency: 'Medium' },
];

const urgencyVariant = (u: string) => u === 'High' ? 'danger' : u === 'Medium' ? 'warning' : 'default';

export default function DowngradeWatchPage() {
  const highUrgency = ALERTS.filter(a => a.urgency === 'High').length;
  const avgDownside = ALERTS.reduce((s, a) => s + a.downside, 0) / ALERTS.length;
  const totalAlerts = ALERTS.length;
  const sellRatings = ALERTS.filter(a => a.to === 'Underperform' || a.to === 'Sell').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Downgrade Watchlist</h1>
        <p className="mt-1 text-sm text-gray-500">Recent analyst downgrades and price target cuts</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Alerts</p><p className="text-lg font-bold text-white">{totalAlerts}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Urgency</p><p className="text-lg font-bold text-red-400">{highUrgency}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Downside</p><p className="text-lg font-bold text-red-400">{avgDownside.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sell Ratings</p><p className="text-lg font-bold text-amber-400">{sellRatings}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingDown className="h-4 w-4 text-red-400" /> Downgrade Alerts</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ALERTS.map((a) => (
            <div key={a.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{a.symbol} <span className="text-gray-500">{a.company}</span></p>
                <p className="text-xs text-gray-500">{a.analyst} &middot; {a.from} &rarr; {a.to}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">PT {formatCurrency(a.priceTarget)}</p>
                  <p className="text-[10px] text-red-400">{a.downside}% downside</p>
                </div>
                <Badge variant={urgencyVariant(a.urgency)}>{a.urgency}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
