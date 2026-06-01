'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Sliders } from 'lucide-react';

interface IndexComponent {
  ticker: string;
  company: string;
  weight: number;
  price: number;
  contribution: number;
  sector: string;
  performance: number;
  status: 'Overweight' | 'Target' | 'Underweight';
}

const COMPONENTS: IndexComponent[] = [
  { ticker: 'NVDA', company: 'NVIDIA', weight: 18.5, price: 878.35, contribution: 4.82, sector: 'Technology', performance: 28.4, status: 'Overweight' },
  { ticker: 'AAPL', company: 'Apple', weight: 15.0, price: 185.20, contribution: 2.15, sector: 'Technology', performance: 12.5, status: 'Target' },
  { ticker: 'MSFT', company: 'Microsoft', weight: 14.0, price: 404.80, contribution: 3.42, sector: 'Technology', performance: 18.2, status: 'Target' },
  { ticker: 'AMZN', company: 'Amazon', weight: 12.0, price: 178.25, contribution: -0.85, sector: 'Consumer', performance: -3.8, status: 'Underweight' },
  { ticker: 'LLY', company: 'Eli Lilly', weight: 10.0, price: 780.50, contribution: 3.20, sector: 'Healthcare', performance: 32.0, status: 'Target' },
  { ticker: 'JPM', company: 'JPMorgan Chase', weight: 8.5, price: 195.40, contribution: 1.28, sector: 'Financials', performance: 15.1, status: 'Underweight' },
  { ticker: 'XOM', company: 'Exxon Mobil', weight: 7.0, price: 108.20, contribution: 0.42, sector: 'Energy', performance: 6.0, status: 'Target' },
  { ticker: 'V', company: 'Visa Inc', weight: 15.0, price: 278.50, contribution: 2.85, sector: 'Financials', performance: 19.0, status: 'Overweight' },
];

const statusVariant = (s: string) => s === 'Target' ? 'success' : s === 'Overweight' ? 'warning' : 'info';

export default function CustomIndexPage() {
  const totalReturn = COMPONENTS.reduce((s, c) => s + c.contribution, 0);
  const totalWeight = COMPONENTS.reduce((s, c) => s + c.weight, 0);
  const avgPerf = COMPONENTS.reduce((s, c) => s + c.performance, 0) / COMPONENTS.length;
  const onTarget = COMPONENTS.filter(c => c.status === 'Target').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Custom Index</h1>
        <p className="mt-1 text-sm text-gray-500">Custom index builder</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Index Return</p><p className={cn('text-lg font-bold', totalReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{totalReturn.toFixed(2)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Components</p><p className="text-lg font-bold text-white">{COMPONENTS.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Perf</p><p className="text-lg font-bold text-indigo-400">{avgPerf.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">On Target</p><p className="text-lg font-bold text-green-400">{onTarget}/{COMPONENTS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Sliders className="h-4 w-4 text-indigo-400" /> Index Components</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {COMPONENTS.map((c) => (
            <div key={c.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{c.ticker} <span className="text-gray-500">{c.company}</span></p>
                <p className="text-xs text-gray-500">{c.sector} &middot; Weight {c.weight}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(c.price)}</p>
                  <p className={cn('text-[10px] font-mono', c.performance >= 0 ? 'text-green-400' : 'text-red-400')}>{c.performance > 0 ? '+' : ''}{c.performance}% &middot; {c.contribution > 0 ? '+' : ''}{c.contribution.toFixed(2)}% contrib</p>
                </div>
                <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
