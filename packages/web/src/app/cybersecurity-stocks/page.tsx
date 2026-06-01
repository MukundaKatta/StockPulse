'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { ShieldCheck } from 'lucide-react';

interface CyberStock {
  ticker: string;
  company: string;
  price: number;
  change: number;
  revenueGrowth: number;
  arr: number;
  marketCap: string;
  focus: string;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
}

const STOCKS: CyberStock[] = [
  { ticker: 'PANW', company: 'Palo Alto Networks', price: 312.40, change: 2.8, revenueGrowth: 20, arr: 3800, marketCap: '$102B', focus: 'Network Security', rating: 'Strong Buy' },
  { ticker: 'CRWD', company: 'CrowdStrike', price: 285.60, change: 3.5, revenueGrowth: 33, arr: 3400, marketCap: '$68B', focus: 'Endpoint Security', rating: 'Strong Buy' },
  { ticker: 'FTNT', company: 'Fortinet', price: 68.20, change: -1.2, revenueGrowth: 10, arr: 920, marketCap: '$52B', focus: 'Firewall/UTM', rating: 'Hold' },
  { ticker: 'ZS', company: 'Zscaler', price: 215.80, change: 1.8, revenueGrowth: 35, arr: 2100, marketCap: '$31B', focus: 'Zero Trust', rating: 'Buy' },
  { ticker: 'S', company: 'SentinelOne', price: 22.40, change: -2.5, revenueGrowth: 40, arr: 680, marketCap: '$7B', focus: 'AI Security', rating: 'Buy' },
  { ticker: 'CYBR', company: 'CyberArk Software', price: 248.50, change: 1.4, revenueGrowth: 28, arr: 820, marketCap: '$11B', focus: 'Identity Security', rating: 'Buy' },
  { ticker: 'OKTA', company: 'Okta Inc', price: 98.40, change: -0.8, revenueGrowth: 18, arr: 2400, marketCap: '$16B', focus: 'Identity/Access', rating: 'Hold' },
  { ticker: 'NET', company: 'Cloudflare', price: 82.50, change: 2.2, revenueGrowth: 33, arr: 1500, marketCap: '$28B', focus: 'Edge Security', rating: 'Buy' },
];

const ratingVariant = (r: string) => r === 'Strong Buy' ? 'success' : r === 'Buy' ? 'info' : r === 'Hold' ? 'warning' : 'danger';

export default function CybersecurityStocksPage() {
  const avgGrowth = STOCKS.reduce((s, st) => s + st.revenueGrowth, 0) / STOCKS.length;
  const positive = STOCKS.filter(st => st.change > 0).length;
  const totalArr = STOCKS.reduce((s, st) => s + st.arr, 0);
  const strongBuys = STOCKS.filter(st => st.rating === 'Strong Buy').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Cybersecurity Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Cybersecurity sector stocks</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Growth</p><p className="text-lg font-bold text-green-400">{avgGrowth.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Positive</p><p className="text-lg font-bold text-white">{positive}/{STOCKS.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Total ARR</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(totalArr * 1e6)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Strong Buys</p><p className="text-lg font-bold text-green-400">{strongBuys}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-indigo-400" /> Cybersecurity Sector</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((st) => (
            <div key={st.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{st.ticker} <span className="text-gray-500">{st.company}</span></p>
                <p className="text-xs text-gray-500">{st.focus} &middot; {st.marketCap} &middot; Rev +{st.revenueGrowth}% &middot; ARR {formatCurrency(st.arr * 1e6)}</p>
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
