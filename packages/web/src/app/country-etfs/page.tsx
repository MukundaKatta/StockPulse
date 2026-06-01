'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Globe } from 'lucide-react';

interface CountryETF {
  ticker: string;
  country: string;
  price: number;
  ytdReturn: number;
  expenseRatio: number;
  aum: string;
  region: string;
  outlook: 'Bullish' | 'Neutral' | 'Bearish';
}

const ETFS: CountryETF[] = [
  { ticker: 'EWJ', country: 'Japan', price: 68.40, ytdReturn: 18.5, expenseRatio: 0.50, aum: '$14.2B', region: 'Asia Pacific', outlook: 'Bullish' },
  { ticker: 'EWG', country: 'Germany', price: 32.80, ytdReturn: 12.4, expenseRatio: 0.50, aum: '$2.8B', region: 'Europe', outlook: 'Neutral' },
  { ticker: 'FXI', country: 'China', price: 28.50, ytdReturn: -8.2, expenseRatio: 0.74, aum: '$6.5B', region: 'Asia Pacific', outlook: 'Bearish' },
  { ticker: 'EWU', country: 'United Kingdom', price: 34.20, ytdReturn: 5.8, expenseRatio: 0.50, aum: '$3.1B', region: 'Europe', outlook: 'Neutral' },
  { ticker: 'INDA', country: 'India', price: 52.40, ytdReturn: 22.1, expenseRatio: 0.65, aum: '$8.4B', region: 'Asia Pacific', outlook: 'Bullish' },
  { ticker: 'EWZ', country: 'Brazil', price: 32.80, ytdReturn: 15.2, expenseRatio: 0.58, aum: '$5.2B', region: 'Latin America', outlook: 'Bullish' },
  { ticker: 'EWY', country: 'South Korea', price: 62.50, ytdReturn: 8.4, expenseRatio: 0.57, aum: '$4.8B', region: 'Asia Pacific', outlook: 'Neutral' },
  { ticker: 'EWA', country: 'Australia', price: 24.80, ytdReturn: 4.2, expenseRatio: 0.50, aum: '$1.8B', region: 'Asia Pacific', outlook: 'Neutral' },
];

const outlookVariant = (o: string) => o === 'Bullish' ? 'success' : o === 'Bearish' ? 'danger' : 'warning';

export default function CountryETFsPage() {
  const avgReturn = ETFS.reduce((s, e) => s + e.ytdReturn, 0) / ETFS.length;
  const positive = ETFS.filter(e => e.ytdReturn > 0).length;
  const avgExpense = ETFS.reduce((s, e) => s + e.expenseRatio, 0) / ETFS.length;
  const bullish = ETFS.filter(e => e.outlook === 'Bullish').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Country ETFs</h1>
        <p className="mt-1 text-sm text-gray-500">Country-specific ETF tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg YTD</p><p className={cn('text-lg font-bold', avgReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Positive</p><p className="text-lg font-bold text-white">{positive}/{ETFS.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Expense</p><p className="text-lg font-bold text-indigo-400">{avgExpense.toFixed(2)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-indigo-400" /> Country ETFs</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ETFS.map((e) => (
            <div key={e.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{e.ticker} <span className="text-gray-500">{e.country}</span></p>
                <p className="text-xs text-gray-500">{e.region} &middot; AUM {e.aum} &middot; ER {e.expenseRatio}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(e.price)}</p>
                  <p className={cn('text-[10px] font-mono', e.ytdReturn >= 0 ? 'text-green-400' : 'text-red-400')}>{e.ytdReturn > 0 ? '+' : ''}{e.ytdReturn}% YTD</p>
                </div>
                <Badge variant={outlookVariant(e.outlook)}>{e.outlook}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
