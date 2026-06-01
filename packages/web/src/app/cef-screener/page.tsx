'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Search } from 'lucide-react';

interface ClosedEndFund {
  ticker: string;
  name: string;
  nav: number;
  marketPrice: number;
  discountPremium: number;
  distributionRate: number;
  leverage: number;
  category: string;
  rating: 'Buy' | 'Hold' | 'Sell';
}

const FUNDS: ClosedEndFund[] = [
  { ticker: 'PDI', name: 'PIMCO Dynamic Income', nav: 21.45, marketPrice: 19.82, discountPremium: -7.6, distributionRate: 13.2, leverage: 38, category: 'Fixed Income', rating: 'Buy' },
  { ticker: 'UTF', name: 'Cohen & Steers Infra', nav: 24.80, marketPrice: 23.15, discountPremium: -6.7, distributionRate: 7.8, leverage: 28, category: 'Infrastructure', rating: 'Buy' },
  { ticker: 'GOF', name: 'Guggenheim Strategic', nav: 16.20, marketPrice: 17.85, discountPremium: 10.2, distributionRate: 14.5, leverage: 32, category: 'Multi-Sector', rating: 'Sell' },
  { ticker: 'RNP', name: 'Cohen & Steers REIT', nav: 22.10, marketPrice: 20.45, discountPremium: -7.5, distributionRate: 6.9, leverage: 25, category: 'Real Estate', rating: 'Buy' },
  { ticker: 'EOS', name: 'Eaton Vance Opportunities', nav: 25.60, marketPrice: 24.20, discountPremium: -5.5, distributionRate: 8.4, leverage: 0, category: 'Equity', rating: 'Hold' },
  { ticker: 'HTD', name: 'John Hancock Tax-Adv', nav: 23.90, marketPrice: 22.50, discountPremium: -5.9, distributionRate: 7.5, leverage: 20, category: 'Equity Income', rating: 'Hold' },
  { ticker: 'BIGZ', name: 'BlackRock Innovation', nav: 8.50, marketPrice: 7.20, discountPremium: -15.3, distributionRate: 11.2, leverage: 0, category: 'Technology', rating: 'Buy' },
];

const ratingVariant = (r: string) => r === 'Buy' ? 'success' : r === 'Sell' ? 'danger' : 'warning';

export default function CEFScreenerPage() {
  const avgDiscount = FUNDS.reduce((s, f) => s + f.discountPremium, 0) / FUNDS.length;
  const avgDistRate = FUNDS.reduce((s, f) => s + f.distributionRate, 0) / FUNDS.length;
  const deepDiscounts = FUNDS.filter(f => f.discountPremium < -10).length;
  const buyRated = FUNDS.filter(f => f.rating === 'Buy').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">CEF Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Closed-end fund screener</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Discount</p><p className="text-lg font-bold text-green-400">{avgDiscount.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Dist Rate</p><p className="text-lg font-bold text-indigo-400">{avgDistRate.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Deep Discount</p><p className="text-lg font-bold text-yellow-400">{deepDiscounts}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Buy Rated</p><p className="text-lg font-bold text-white">{buyRated}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Search className="h-4 w-4 text-indigo-400" /> Closed-End Funds</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {FUNDS.map((f) => (
            <div key={f.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{f.ticker} <span className="text-gray-500">{f.name}</span></p>
                <p className="text-xs text-gray-500">{f.category} &middot; NAV {formatCurrency(f.nav)} &middot; {f.leverage}% leverage</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(f.marketPrice)}</p>
                  <p className={cn('text-[10px] font-mono', f.discountPremium < 0 ? 'text-green-400' : 'text-red-400')}>{f.discountPremium > 0 ? '+' : ''}{f.discountPremium}% &middot; {f.distributionRate}% dist</p>
                </div>
                <Badge variant={ratingVariant(f.rating)}>{f.rating}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
