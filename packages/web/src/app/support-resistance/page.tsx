'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';
import Link from 'next/link';

interface LevelData {
  symbol: string;
  price: number;
  levels: { price: number; type: 'support' | 'resistance'; strength: 'strong' | 'moderate' | 'weak'; touches: number }[];
}

const LEVEL_DATA: LevelData[] = [
  {
    symbol: 'AAPL', price: 189.45,
    levels: [
      { price: 195.00, type: 'resistance', strength: 'strong', touches: 5 },
      { price: 192.50, type: 'resistance', strength: 'moderate', touches: 3 },
      { price: 186.00, type: 'support', strength: 'strong', touches: 4 },
      { price: 182.50, type: 'support', strength: 'moderate', touches: 2 },
      { price: 178.00, type: 'support', strength: 'weak', touches: 2 },
    ],
  },
  {
    symbol: 'TSLA', price: 245.80,
    levels: [
      { price: 265.00, type: 'resistance', strength: 'strong', touches: 4 },
      { price: 255.00, type: 'resistance', strength: 'moderate', touches: 3 },
      { price: 240.00, type: 'support', strength: 'strong', touches: 5 },
      { price: 230.00, type: 'support', strength: 'moderate', touches: 3 },
      { price: 218.00, type: 'support', strength: 'weak', touches: 2 },
    ],
  },
  {
    symbol: 'NVDA', price: 875.20,
    levels: [
      { price: 920.00, type: 'resistance', strength: 'strong', touches: 3 },
      { price: 900.00, type: 'resistance', strength: 'moderate', touches: 4 },
      { price: 850.00, type: 'support', strength: 'strong', touches: 6 },
      { price: 820.00, type: 'support', strength: 'moderate', touches: 3 },
      { price: 780.00, type: 'support', strength: 'weak', touches: 2 },
    ],
  },
  {
    symbol: 'MSFT', price: 415.60,
    levels: [
      { price: 425.00, type: 'resistance', strength: 'strong', touches: 4 },
      { price: 420.00, type: 'resistance', strength: 'weak', touches: 2 },
      { price: 410.00, type: 'support', strength: 'moderate', touches: 3 },
      { price: 400.00, type: 'support', strength: 'strong', touches: 5 },
      { price: 385.00, type: 'support', strength: 'weak', touches: 2 },
    ],
  },
];

export default function SupportResistancePage() {
  const [selected, setSelected] = useState(LEVEL_DATA[0].symbol);
  const data = LEVEL_DATA.find((d) => d.symbol === selected) || LEVEL_DATA[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Support & Resistance</h1>
        <p className="mt-1 text-sm text-gray-500">Key price levels with strength indicators</p>
      </div>

      <div className="flex gap-2">
        {LEVEL_DATA.map((d) => (
          <button key={d.symbol} onClick={() => setSelected(d.symbol)}
            className={cn('rounded-lg px-3 py-1.5 text-xs font-mono font-bold transition-colors', selected === d.symbol ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
          >{d.symbol}</button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-400" />
            {data.symbol} - Current: {formatCurrency(data.price)}
          </CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {data.levels.map((level, i) => {
            const dist = ((level.price - data.price) / data.price * 100);
            const isNearby = Math.abs(dist) < 3;
            return (
              <div key={i} className={cn('flex items-center gap-3 py-2 px-3 rounded-lg', isNearby && 'bg-white/[0.02] ring-1 ring-white/[0.06]')}>
                <div className={cn('w-2 h-8 rounded-full', level.type === 'resistance' ? 'bg-red-500' : 'bg-green-500')} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-sm font-mono font-medium', level.type === 'resistance' ? 'text-red-400' : 'text-green-400')}>
                      {formatCurrency(level.price)}
                    </span>
                    <Badge variant={level.type === 'resistance' ? 'danger' : 'success'}>{level.type}</Badge>
                    <Badge variant={level.strength === 'strong' ? 'warning' : 'info'}>{level.strength}</Badge>
                  </div>
                  <p className="text-[10px] text-gray-600">{level.touches} touches • {dist >= 0 ? '+' : ''}{dist.toFixed(1)}% from current</p>
                </div>
                <div className="w-20">
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={cn('h-full rounded-full', level.strength === 'strong' ? 'bg-amber-500' : level.strength === 'moderate' ? 'bg-amber-500/60' : 'bg-amber-500/30')}
                      style={{ width: `${(level.touches / 6) * 100}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-[10px] text-gray-600">Nearest support: {formatCurrency(data.levels.filter((l) => l.type === 'support')[0]?.price || 0)}</p>
          <p className="text-[10px] text-gray-600">Nearest resistance: {formatCurrency(data.levels.filter((l) => l.type === 'resistance').reverse()[0]?.price || 0)}</p>
        </div>
      </Card>
    </motion.div>
  );
}
