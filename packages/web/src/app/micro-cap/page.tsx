'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Atom } from 'lucide-react';

interface MicroCapStock {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  change: number;
  volume: string;
  sector: string;
  peRatio: number;
  risk: 'High' | 'Very High' | 'Extreme';
}

const STOCKS: MicroCapStock[] = [
  { symbol: 'GEVO', name: 'Gevo Inc', price: 2.85, marketCap: 680e6, change: 12.5, volume: '8.2M', sector: 'Energy', peRatio: -5.2, risk: 'Extreme' },
  { symbol: 'ATER', name: 'Aterian Inc', price: 1.45, marketCap: 85e6, change: -8.2, volume: '4.5M', sector: 'Consumer', peRatio: -2.8, risk: 'Extreme' },
  { symbol: 'HIMS', name: 'Hims & Hers', price: 12.80, marketCap: 2.8e9, change: 5.8, volume: '12.4M', sector: 'Healthcare', peRatio: 85.2, risk: 'High' },
  { symbol: 'RDDT', name: 'Reddit Inc', price: 58.20, marketCap: 10.5e9, change: 3.2, volume: '6.8M', sector: 'Tech', peRatio: -42.5, risk: 'High' },
  { symbol: 'VERB', name: 'Verb Technology', price: 0.85, marketCap: 42e6, change: -15.2, volume: '2.1M', sector: 'Tech', peRatio: -1.5, risk: 'Extreme' },
  { symbol: 'SNDL', name: 'SNDL Inc', price: 2.15, marketCap: 580e6, change: 4.5, volume: '18.5M', sector: 'Cannabis', peRatio: -8.4, risk: 'Very High' },
  { symbol: 'OPEN', name: 'Opendoor Tech', price: 3.20, marketCap: 2.1e9, change: -6.8, volume: '15.2M', sector: 'Real Estate', peRatio: -4.2, risk: 'Very High' },
  { symbol: 'BBIG', name: 'Vinco Ventures', price: 0.42, marketCap: 28e6, change: 22.5, volume: '32.5M', sector: 'Media', peRatio: -0.8, risk: 'Extreme' },
];

const riskVariant = (r: string) => r === 'High' ? 'warning' : r === 'Very High' ? 'danger' : 'danger';

export default function MicroCapPage() {
  const gainers = STOCKS.filter(s => s.change > 0).length;
  const avgChange = STOCKS.reduce((s, st) => s + st.change, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Micro-Cap Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Micro-cap and nano-cap stock analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks</p><p className="text-lg font-bold text-white">{STOCKS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers</p><p className="text-lg font-bold text-green-400">{gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Change</p><p className="text-lg font-bold text-indigo-400">{avgChange.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Extreme Risk</p><p className="text-lg font-bold text-red-400">{STOCKS.filter(s => s.risk === 'Extreme').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Atom className="h-4 w-4 text-indigo-400" /> Micro-Cap Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-white w-14">{formatCurrency(s.price)}</span>
              <span className={cn('text-xs font-mono w-12', s.change >= 0 ? 'text-green-400' : 'text-red-400')}>{s.change >= 0 ? '+' : ''}{s.change}%</span>
              <span className="text-[10px] text-gray-400 w-12">{s.volume}</span>
              <span className="text-[10px] text-gray-500 w-14">{s.sector}</span>
              <Badge variant={riskVariant(s.risk)} className="ml-auto">{s.risk}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
