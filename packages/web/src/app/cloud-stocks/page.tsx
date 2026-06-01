'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Cloud } from 'lucide-react';

interface CloudStock {
  ticker: string;
  company: string;
  price: number;
  change: number;
  revenueGrowth: number;
  grossMargin: number;
  marketCap: string;
  segment: string;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
}

const STOCKS: CloudStock[] = [
  { ticker: 'MSFT', company: 'Microsoft Azure', price: 404.80, change: 2.1, revenueGrowth: 29, grossMargin: 72, marketCap: '$3.0T', segment: 'IaaS/PaaS', rating: 'Strong Buy' },
  { ticker: 'AMZN', company: 'Amazon AWS', price: 178.25, change: 1.5, revenueGrowth: 17, grossMargin: 68, marketCap: '$1.9T', segment: 'IaaS/PaaS', rating: 'Buy' },
  { ticker: 'GOOGL', company: 'Google Cloud', price: 141.80, change: 0.8, revenueGrowth: 26, grossMargin: 58, marketCap: '$1.8T', segment: 'IaaS/PaaS', rating: 'Buy' },
  { ticker: 'CRM', company: 'Salesforce', price: 282.40, change: -0.5, revenueGrowth: 11, grossMargin: 76, marketCap: '$275B', segment: 'SaaS', rating: 'Hold' },
  { ticker: 'NOW', company: 'ServiceNow', price: 742.50, change: 3.2, revenueGrowth: 24, grossMargin: 81, marketCap: '$153B', segment: 'SaaS', rating: 'Strong Buy' },
  { ticker: 'SNOW', company: 'Snowflake', price: 168.20, change: -1.8, revenueGrowth: 32, grossMargin: 67, marketCap: '$56B', segment: 'Data Cloud', rating: 'Buy' },
  { ticker: 'DDOG', company: 'Datadog', price: 122.40, change: 2.4, revenueGrowth: 26, grossMargin: 80, marketCap: '$40B', segment: 'Observability', rating: 'Buy' },
  { ticker: 'NET', company: 'Cloudflare', price: 82.50, change: 1.1, revenueGrowth: 33, grossMargin: 78, marketCap: '$28B', segment: 'Edge Cloud', rating: 'Hold' },
];

const ratingVariant = (r: string) => r === 'Strong Buy' ? 'success' : r === 'Buy' ? 'info' : r === 'Hold' ? 'warning' : 'danger';

export default function CloudStocksPage() {
  const avgGrowth = STOCKS.reduce((s, st) => s + st.revenueGrowth, 0) / STOCKS.length;
  const avgMargin = STOCKS.reduce((s, st) => s + st.grossMargin, 0) / STOCKS.length;
  const positive = STOCKS.filter(st => st.change > 0).length;
  const strongBuys = STOCKS.filter(st => st.rating === 'Strong Buy').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cloud Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Cloud computing stocks tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Growth</p><p className="text-lg font-bold text-green-400">{avgGrowth.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Margin</p><p className="text-lg font-bold text-indigo-400">{avgMargin.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Positive</p><p className="text-lg font-bold text-white">{positive}/{STOCKS.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Strong Buys</p><p className="text-lg font-bold text-green-400">{strongBuys}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Cloud className="h-4 w-4 text-indigo-400" /> Cloud Computing</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((st) => (
            <div key={st.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{st.ticker} <span className="text-gray-500">{st.company}</span></p>
                <p className="text-xs text-gray-500">{st.segment} &middot; {st.marketCap} &middot; Rev +{st.revenueGrowth}% &middot; GM {st.grossMargin}%</p>
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
