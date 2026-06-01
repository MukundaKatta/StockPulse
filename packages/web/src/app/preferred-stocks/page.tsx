'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Star } from 'lucide-react';

interface PreferredStock {
  symbol: string;
  issuer: string;
  price: number;
  parValue: number;
  coupon: number;
  currentYield: number;
  callable: boolean;
  callDate: string | null;
  rating: string;
  cumulative: boolean;
}

const PREFERRED: PreferredStock[] = [
  { symbol: 'BAC-PB', issuer: 'Bank of America', price: 24.85, parValue: 25, coupon: 6.0, currentYield: 6.04, callable: true, callDate: '2025-03-15', rating: 'BBB+', cumulative: true },
  { symbol: 'JPM-PD', issuer: 'JP Morgan', price: 25.15, parValue: 25, coupon: 5.75, currentYield: 5.71, callable: true, callDate: '2026-06-01', rating: 'A-', cumulative: true },
  { symbol: 'WFC-PL', issuer: 'Wells Fargo', price: 23.80, parValue: 25, coupon: 5.85, currentYield: 6.14, callable: true, callDate: '2025-09-15', rating: 'BBB+', cumulative: true },
  { symbol: 'C-PJ', issuer: 'Citigroup', price: 24.50, parValue: 25, coupon: 7.125, currentYield: 7.27, callable: false, callDate: null, rating: 'BBB-', cumulative: false },
  { symbol: 'USB-PA', issuer: 'US Bancorp', price: 25.20, parValue: 25, coupon: 6.5, currentYield: 6.45, callable: true, callDate: '2027-01-15', rating: 'A-', cumulative: true },
  { symbol: 'PSA-PH', issuer: 'Public Storage', price: 24.60, parValue: 25, coupon: 5.6, currentYield: 5.69, callable: true, callDate: '2026-03-01', rating: 'A', cumulative: true },
  { symbol: 'T-PA', issuer: 'AT&T Inc', price: 22.40, parValue: 25, coupon: 5.0, currentYield: 5.58, callable: false, callDate: null, rating: 'BBB', cumulative: true },
  { symbol: 'GS-PA', issuer: 'Goldman Sachs', price: 25.30, parValue: 25, coupon: 3.75, currentYield: 3.71, callable: true, callDate: '2025-05-10', rating: 'BBB+', cumulative: false },
];

export default function PreferredStocksPage() {
  const avgYield = PREFERRED.reduce((s, p) => s + p.currentYield, 0) / PREFERRED.length;
  const callableCount = PREFERRED.filter((p) => p.callable).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Preferred Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Fixed-income preferred equity securities</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(2)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Callable</p><p className="text-lg font-bold text-yellow-400">{callableCount}/{PREFERRED.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Issues</p><p className="text-lg font-bold text-white">{PREFERRED.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 text-yellow-400" /> Preferred Issues</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {PREFERRED.sort((a, b) => b.currentYield - a.currentYield).map((p) => (
            <div key={p.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20"><p className="text-xs font-bold text-white">{p.symbol}</p><p className="text-[10px] text-gray-500 truncate">{p.issuer}</p></div>
              <span className="text-xs font-mono text-white w-14">${p.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-green-400 w-12">{p.currentYield.toFixed(2)}%</span>
              <span className="text-xs font-mono text-gray-400 w-12">{p.coupon.toFixed(2)}%</span>
              <Badge variant="info">{p.rating}</Badge>
              {p.cumulative && <Badge variant="success">Cum</Badge>}
              {p.callable && <span className="text-[10px] text-yellow-400">{p.callDate}</span>}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
