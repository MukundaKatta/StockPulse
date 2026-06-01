'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface BBStock {
  symbol: string;
  name: string;
  price: number;
  upper: number;
  middle: number;
  lower: number;
  bandwidth: number;
  position: 'Above Upper' | 'Near Upper' | 'Middle' | 'Near Lower' | 'Below Lower';
}

const STOCKS: BBStock[] = [
  { symbol: 'SMCI', name: 'Super Micro', price: 1012.50, upper: 980.20, middle: 820.40, lower: 660.60, bandwidth: 38.9, position: 'Above Upper' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, upper: 860.50, middle: 785.20, lower: 709.90, bandwidth: 19.2, position: 'Above Upper' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, upper: 490.80, middle: 465.30, lower: 439.80, bandwidth: 10.9, position: 'Near Upper' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 186.05, upper: 194.20, middle: 188.40, lower: 182.60, bandwidth: 6.2, position: 'Middle' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, upper: 415.50, middle: 398.60, lower: 381.70, bandwidth: 8.5, position: 'Middle' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 141.80, upper: 148.50, middle: 142.20, lower: 135.90, bandwidth: 8.9, position: 'Middle' },
  { symbol: 'PFE', name: 'Pfizer Inc', price: 26.45, upper: 29.80, middle: 28.10, lower: 26.40, bandwidth: 12.1, position: 'Near Lower' },
  { symbol: 'NKE', name: 'Nike Inc', price: 93.20, upper: 105.40, middle: 98.60, lower: 91.80, bandwidth: 13.8, position: 'Near Lower' },
  { symbol: 'BA', name: 'Boeing Co', price: 204.15, upper: 232.50, middle: 218.40, lower: 204.30, bandwidth: 12.9, position: 'Below Lower' },
  { symbol: 'INTC', name: 'Intel Corp', price: 42.18, upper: 47.20, middle: 44.80, lower: 42.40, bandwidth: 10.7, position: 'Near Lower' },
];

function posVariant(pos: string): 'danger' | 'warning' | 'default' | 'info' | 'success' {
  if (pos === 'Above Upper') return 'danger';
  if (pos === 'Near Upper') return 'warning';
  if (pos === 'Below Lower') return 'success';
  if (pos === 'Near Lower') return 'info';
  return 'default';
}

export default function BollingerBandsPage() {
  const aboveUpper = STOCKS.filter((s) => s.position === 'Above Upper').length;
  const belowLower = STOCKS.filter((s) => s.position === 'Below Lower' || s.position === 'Near Lower').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Bollinger Bands</h1>
        <p className="mt-1 text-sm text-gray-500">20-period Bollinger Band analysis with 2σ bands</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Above Upper</p>
          <p className="text-lg font-bold text-red-400">{aboveUpper}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">In Range</p>
          <p className="text-lg font-bold text-gray-400">{STOCKS.length - aboveUpper - belowLower}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Near/Below Lower</p>
          <p className="text-lg font-bold text-green-400">{belowLower}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-indigo-400" /> Band Positions
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => {
            const range = s.upper - s.lower;
            const pct = range > 0 ? ((s.price - s.lower) / range) * 100 : 50;
            return (
              <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
                <div className="w-20">
                  <p className="text-xs font-bold text-white">{s.symbol}</p>
                  <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
                </div>
                <span className="text-xs font-mono text-white w-16">${s.price.toFixed(2)}</span>
                <div className="flex-1 relative h-4 rounded bg-white/5">
                  <div className="absolute top-0 left-0 right-0 h-full flex items-center">
                    <div className="absolute h-full w-px bg-yellow-500/40 left-0" title="Lower" />
                    <div className="absolute h-full w-px bg-indigo-500/40 left-1/2" title="SMA" />
                    <div className="absolute h-full w-px bg-yellow-500/40 right-0" title="Upper" />
                  </div>
                  <div className={cn('absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full', pct > 100 ? 'bg-red-400' : pct < 0 ? 'bg-green-400' : 'bg-indigo-400')} style={{ left: `${Math.min(Math.max(pct, 0), 100)}%` }} />
                </div>
                <span className="text-[10px] font-mono text-gray-500 w-12">BW {s.bandwidth.toFixed(1)}%</span>
                <Badge variant={posVariant(s.position)}>{s.position}</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
