'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/formatters';
import { ArrowUpDown } from 'lucide-react';

interface HighLow {
  symbol: string;
  name: string;
  price: number;
  change: number;
  high52: number;
  low52: number;
  type: 'high' | 'low';
  distFromExtreme: number;
  volume: string;
  sector: string;
}

const DATA: HighLow[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, change: 4.2, high52: 882.20, low52: 222.97, type: 'high', distFromExtreme: -0.4, volume: '42.1M', sector: 'Tech' },
  { symbol: 'META', name: 'Meta', price: 484.10, change: 1.9, high52: 488.50, low52: 167.92, type: 'high', distFromExtreme: -0.9, volume: '18.5M', sector: 'Tech' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, change: 0.5, high52: 408.42, low52: 275.37, type: 'high', distFromExtreme: -0.9, volume: '22.8M', sector: 'Tech' },
  { symbol: 'CRM', name: 'Salesforce', price: 292.40, change: 2.1, high52: 295.80, low52: 155.69, type: 'high', distFromExtreme: -1.1, volume: '8.4M', sector: 'Tech' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 742.50, change: 1.8, high52: 748.20, low52: 411.22, type: 'high', distFromExtreme: -0.8, volume: '3.2M', sector: 'Health' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, change: -2.4, high52: 51.28, low52: 41.20, type: 'low', distFromExtreme: 3.9, volume: '38.1M', sector: 'Tech' },
  { symbol: 'PFE', name: 'Pfizer', price: 27.10, change: -1.2, high52: 43.08, low52: 26.82, type: 'low', distFromExtreme: 1.0, volume: '28.4M', sector: 'Health' },
  { symbol: 'NKE', name: 'Nike', price: 98.50, change: -1.8, high52: 131.42, low52: 97.20, type: 'low', distFromExtreme: 1.3, volume: '12.1M', sector: 'Consumer' },
  { symbol: 'BA', name: 'Boeing', price: 198.40, change: -2.8, high52: 267.54, low52: 196.80, type: 'low', distFromExtreme: 0.8, volume: '8.2M', sector: 'Industrial' },
  { symbol: 'DIS', name: 'Disney', price: 95.20, change: -1.4, high52: 118.19, low52: 93.42, type: 'low', distFromExtreme: 1.9, volume: '14.5M', sector: 'Media' },
];

export default function NewHighsLowsPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'low'>('all');
  const filtered = filter === 'all' ? DATA : DATA.filter((d) => d.type === filter);
  const highs = DATA.filter((d) => d.type === 'high').length;
  const lows = DATA.filter((d) => d.type === 'low').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">52-Week Highs & Lows</h1>
        <p className="mt-1 text-sm text-gray-500">Stocks at or near 52-week extremes</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">New Highs</p><p className="text-lg font-bold text-green-400">{highs}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">New Lows</p><p className="text-lg font-bold text-red-400">{lows}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">H/L Ratio</p><p className={cn('text-lg font-bold', highs > lows ? 'text-green-400' : 'text-red-400')}>{lows > 0 ? (highs / lows).toFixed(1) : highs}</p></Card>
      </div>

      <div className="flex gap-2">
        {(['all', 'high', 'low'] as const).map((f) => (
          <Button key={f} variant={filter === f ? 'primary' : 'ghost'} onClick={() => setFilter(f)} className="text-xs capitalize">{f === 'all' ? 'All' : f === 'high' ? 'New Highs' : 'New Lows'}</Button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowUpDown className="h-4 w-4 text-indigo-400" /> 52-Week Extremes</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {filtered.map((d) => (
            <div key={d.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-20"><p className="text-xs font-bold text-white">{d.symbol}</p><p className="text-[10px] text-gray-500 truncate">{d.name}</p></div>
              <Badge variant={d.type === 'high' ? 'success' : 'danger'}>{d.type === 'high' ? '52W High' : '52W Low'}</Badge>
              <span className="text-xs font-mono text-white w-16">${d.price.toFixed(2)}</span>
              <span className={cn('text-xs font-mono w-12', d.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                {d.change >= 0 ? '+' : ''}{d.change.toFixed(1)}%
              </span>
              <span className="text-[10px] font-mono text-gray-400">{d.distFromExtreme.toFixed(1)}% from {d.type}</span>
              <span className="text-[10px] text-gray-500 ml-auto">{d.volume}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
