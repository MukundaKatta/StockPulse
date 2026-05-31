'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface Forecast {
  firm: string;
  rating: 'Buy' | 'Outperform' | 'Hold' | 'Underperform' | 'Sell';
  target: number;
  date: string;
}

const FORECASTS: Forecast[] = [
  { firm: 'Goldman Sachs', rating: 'Buy', target: 210, date: '2024-02-08' },
  { firm: 'Morgan Stanley', rating: 'Outperform', target: 205, date: '2024-02-06' },
  { firm: 'JP Morgan', rating: 'Buy', target: 215, date: '2024-02-05' },
  { firm: 'Bank of America', rating: 'Buy', target: 208, date: '2024-02-02' },
  { firm: 'Citi', rating: 'Hold', target: 190, date: '2024-01-30' },
  { firm: 'Barclays', rating: 'Outperform', target: 200, date: '2024-01-29' },
  { firm: 'Wells Fargo', rating: 'Hold', target: 185, date: '2024-01-25' },
  { firm: 'UBS', rating: 'Buy', target: 212, date: '2024-01-22' },
  { firm: 'Deutsche Bank', rating: 'Hold', target: 188, date: '2024-01-18' },
  { firm: 'Raymond James', rating: 'Outperform', target: 202, date: '2024-01-15' },
];

const currentPrice = 186.05;

function ratingVariant(r: string): 'success' | 'danger' | 'warning' | 'default' | 'info' {
  if (r === 'Buy') return 'success';
  if (r === 'Outperform') return 'info';
  if (r === 'Hold') return 'warning';
  if (r === 'Underperform' || r === 'Sell') return 'danger';
  return 'default';
}

export default function StockForecastPage() {
  const avgTarget = FORECASTS.reduce((s, f) => s + f.target, 0) / FORECASTS.length;
  const upside = ((avgTarget - currentPrice) / currentPrice) * 100;
  const buys = FORECASTS.filter((f) => f.rating === 'Buy' || f.rating === 'Outperform').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Forecast</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL analyst price targets and ratings</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Current</p>
          <p className="text-lg font-bold text-white">${currentPrice.toFixed(2)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Target</p>
          <p className="text-lg font-bold text-indigo-400">${avgTarget.toFixed(2)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Upside</p>
          <p className={cn('text-lg font-bold', upside >= 0 ? 'text-green-400' : 'text-red-400')}>
            {upside >= 0 ? '+' : ''}{upside.toFixed(1)}%
          </p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Buy Ratings</p>
          <p className="text-lg font-bold text-green-400">{buys}/{FORECASTS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-indigo-400" /> Analyst Forecasts
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {FORECASTS.map((f) => {
            const diff = ((f.target - currentPrice) / currentPrice) * 100;
            return (
              <div key={f.firm} className="flex items-center gap-3 py-2 px-4">
                <span className="text-xs text-white w-28 truncate">{f.firm}</span>
                <Badge variant={ratingVariant(f.rating)}>{f.rating}</Badge>
                <span className="text-xs font-mono text-indigo-400 w-14">${f.target}</span>
                <span className={cn('text-xs font-mono w-14', diff >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%
                </span>
                <span className="text-[10px] text-gray-500 ml-auto">{f.date}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
