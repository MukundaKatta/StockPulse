'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { ShoppingCart } from 'lucide-react';

interface ConsumerStaple {
  ticker: string;
  company: string;
  price: number;
  change: number;
  dividendYield: number;
  peRatio: number;
  marketCap: string;
  subsector: string;
  rating: 'Buy' | 'Hold' | 'Sell';
}

const STAPLES: ConsumerStaple[] = [
  { ticker: 'PG', company: 'Procter & Gamble', price: 162.40, change: 0.8, dividendYield: 2.4, peRatio: 25.8, marketCap: '$382B', subsector: 'Household', rating: 'Buy' },
  { ticker: 'KO', company: 'Coca-Cola', price: 58.90, change: 0.3, dividendYield: 3.1, peRatio: 23.2, marketCap: '$255B', subsector: 'Beverages', rating: 'Buy' },
  { ticker: 'PEP', company: 'PepsiCo', price: 172.50, change: -0.4, dividendYield: 2.9, peRatio: 24.5, marketCap: '$237B', subsector: 'Beverages', rating: 'Hold' },
  { ticker: 'COST', company: 'Costco', price: 685.20, change: 1.2, dividendYield: 0.6, peRatio: 48.5, marketCap: '$304B', subsector: 'Retail', rating: 'Hold' },
  { ticker: 'WMT', company: 'Walmart', price: 165.80, change: 0.5, dividendYield: 1.4, peRatio: 28.2, marketCap: '$445B', subsector: 'Retail', rating: 'Buy' },
  { ticker: 'CL', company: 'Colgate-Palmolive', price: 82.40, change: -0.2, dividendYield: 2.3, peRatio: 26.8, marketCap: '$68B', subsector: 'Household', rating: 'Hold' },
  { ticker: 'MDLZ', company: 'Mondelez', price: 72.50, change: 0.6, dividendYield: 2.2, peRatio: 22.1, marketCap: '$99B', subsector: 'Food', rating: 'Buy' },
];

const ratingVariant = (r: string) => r === 'Buy' ? 'success' : r === 'Sell' ? 'danger' : 'warning';

export default function ConsumerStaplesPage() {
  const avgYield = STAPLES.reduce((s, st) => s + st.dividendYield, 0) / STAPLES.length;
  const avgPE = STAPLES.reduce((s, st) => s + st.peRatio, 0) / STAPLES.length;
  const positive = STAPLES.filter(st => st.change > 0).length;
  const buyRated = STAPLES.filter(st => st.rating === 'Buy').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Consumer Staples</h1>
        <p className="mt-1 text-sm text-gray-500">Consumer staples sector tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg P/E</p><p className="text-lg font-bold text-indigo-400">{avgPE.toFixed(1)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Positive</p><p className="text-lg font-bold text-white">{positive}/{STAPLES.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Buy Rated</p><p className="text-lg font-bold text-green-400">{buyRated}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ShoppingCart className="h-4 w-4 text-indigo-400" /> Staples Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STAPLES.map((st) => (
            <div key={st.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{st.ticker} <span className="text-gray-500">{st.company}</span></p>
                <p className="text-xs text-gray-500">{st.subsector} &middot; {st.marketCap} &middot; P/E {st.peRatio} &middot; Yield {st.dividendYield}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(st.price)}</p>
                  <p className={cn('text-[10px] font-mono', st.change >= 0 ? 'text-green-400' : 'text-red-400')}>{st.change > 0 ? '+' : ''}{st.change}%</p>
                </div>
                <Badge variant={ratingVariant(st.rating)}>{st.rating}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
