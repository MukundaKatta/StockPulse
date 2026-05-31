'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3, Clock } from 'lucide-react';

interface FuturesContract {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  openInterest: string;
  category: 'index' | 'energy' | 'metals' | 'agriculture' | 'crypto';
}

const FUTURES: FuturesContract[] = [
  { symbol: 'ES', name: 'E-mini S&P 500', price: 4785.25, change: 12.50, changePercent: 0.26, volume: '1.2M', openInterest: '2.8M', category: 'index' },
  { symbol: 'NQ', name: 'E-mini Nasdaq', price: 16892.50, change: 85.75, changePercent: 0.51, volume: '680K', openInterest: '340K', category: 'index' },
  { symbol: 'YM', name: 'E-mini Dow', price: 37520, change: 45, changePercent: 0.12, volume: '95K', openInterest: '110K', category: 'index' },
  { symbol: 'RTY', name: 'E-mini Russell', price: 2015.30, change: -5.20, changePercent: -0.26, volume: '250K', openInterest: '520K', category: 'index' },
  { symbol: 'CL', name: 'Crude Oil', price: 72.45, change: -0.85, changePercent: -1.16, volume: '890K', openInterest: '1.5M', category: 'energy' },
  { symbol: 'NG', name: 'Natural Gas', price: 2.68, change: 0.12, changePercent: 4.69, volume: '450K', openInterest: '1.1M', category: 'energy' },
  { symbol: 'GC', name: 'Gold', price: 2048.60, change: 8.30, changePercent: 0.41, volume: '210K', openInterest: '480K', category: 'metals' },
  { symbol: 'SI', name: 'Silver', price: 23.15, change: -0.22, changePercent: -0.94, volume: '78K', openInterest: '140K', category: 'metals' },
  { symbol: 'HG', name: 'Copper', price: 3.82, change: 0.04, changePercent: 1.06, volume: '65K', openInterest: '200K', category: 'metals' },
  { symbol: 'ZC', name: 'Corn', price: 458.50, change: -3.25, changePercent: -0.70, volume: '320K', openInterest: '1.4M', category: 'agriculture' },
  { symbol: 'ZS', name: 'Soybeans', price: 1245.75, change: 8.50, changePercent: 0.69, volume: '180K', openInterest: '720K', category: 'agriculture' },
  { symbol: 'BTC', name: 'Bitcoin', price: 43250, change: 1250, changePercent: 2.98, volume: '45K', openInterest: '28K', category: 'crypto' },
];

const CATEGORIES = ['all', 'index', 'energy', 'metals', 'agriculture', 'crypto'] as const;

export default function FuturesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Futures Markets</h1>
          <p className="mt-1 text-sm text-gray-500">Real-time futures quotes across asset classes</p>
        </div>
        <Badge variant="info" className="text-[10px]">
          <Clock className="h-3 w-3 mr-1" /> Live
        </Badge>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-white/5">
                <th className="text-left py-2.5 px-2 font-medium">Contract</th>
                <th className="text-left py-2.5 px-2 font-medium">Name</th>
                <th className="text-right py-2.5 px-2 font-medium">Price</th>
                <th className="text-right py-2.5 px-2 font-medium">Change</th>
                <th className="text-right py-2.5 px-2 font-medium">%</th>
                <th className="text-right py-2.5 px-2 font-medium">Volume</th>
                <th className="text-right py-2.5 px-2 font-medium">Open Int.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {FUTURES.map((f) => (
                <tr key={f.symbol} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-2">
                    <span className="font-medium text-indigo-400">{f.symbol}</span>
                  </td>
                  <td className="py-2.5 px-2 text-gray-300">{f.name}</td>
                  <td className="py-2.5 px-2 text-right font-mono text-white">{f.price.toLocaleString()}</td>
                  <td className={cn('py-2.5 px-2 text-right font-mono', f.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {f.change >= 0 ? '+' : ''}{f.change.toFixed(2)}
                  </td>
                  <td className={cn('py-2.5 px-2 text-right font-mono', f.changePercent >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {f.changePercent >= 0 ? '+' : ''}{f.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-2 text-right text-gray-500">{f.volume}</td>
                  <td className="py-2.5 px-2 text-right text-gray-500">{f.openInterest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
