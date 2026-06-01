'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface PriceLevel {
  price: number;
  volume: number;
  tpo: number;
  type: 'Value' | 'Above VA' | 'Below VA' | 'POC';
}

const LEVELS: PriceLevel[] = [
  { price: 187.50, volume: 1200000, tpo: 2, type: 'Above VA' },
  { price: 187.00, volume: 2800000, tpo: 4, type: 'Above VA' },
  { price: 186.50, volume: 4500000, tpo: 6, type: 'Value' },
  { price: 186.25, volume: 6200000, tpo: 8, type: 'Value' },
  { price: 186.00, volume: 8500000, tpo: 12, type: 'POC' },
  { price: 185.75, volume: 7200000, tpo: 10, type: 'Value' },
  { price: 185.50, volume: 5800000, tpo: 8, type: 'Value' },
  { price: 185.25, volume: 4100000, tpo: 6, type: 'Value' },
  { price: 185.00, volume: 3200000, tpo: 4, type: 'Below VA' },
  { price: 184.75, volume: 2100000, tpo: 3, type: 'Below VA' },
  { price: 184.50, volume: 1500000, tpo: 2, type: 'Below VA' },
  { price: 184.25, volume: 800000, tpo: 1, type: 'Below VA' },
];

export default function MarketProfilePage() {
  const poc = LEVELS.find((l) => l.type === 'POC')!;
  const maxVol = Math.max(...LEVELS.map((l) => l.volume));
  const valueArea = LEVELS.filter((l) => l.type === 'Value' || l.type === 'POC');
  const vah = Math.max(...valueArea.map((l) => l.price));
  const val = Math.min(...valueArea.map((l) => l.price));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Profile</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL volume profile with TPO distribution</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">POC</p><p className="text-lg font-bold text-indigo-400">${poc.price.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Value High</p><p className="text-lg font-bold text-green-400">${vah.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Value Low</p><p className="text-lg font-bold text-red-400">${val.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">VA Width</p><p className="text-lg font-bold text-white">${(vah - val).toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-indigo-400" /> Volume Distribution</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {LEVELS.map((l) => (
            <div key={l.price} className="flex items-center gap-3 py-1 px-4">
              <span className={cn('text-xs font-mono w-14', l.type === 'POC' ? 'text-indigo-400 font-bold' : 'text-gray-400')}>${l.price.toFixed(2)}</span>
              <div className="flex-1 relative h-4">
                <div className={cn('h-full rounded', l.type === 'POC' ? 'bg-indigo-500/40' : l.type === 'Value' ? 'bg-blue-500/20' : 'bg-white/5')} style={{ width: `${(l.volume / maxVol) * 100}%` }} />
              </div>
              <span className="text-[10px] font-mono text-gray-500 w-10">{(l.volume / 1e6).toFixed(1)}M</span>
              <span className="text-[10px] font-mono text-gray-500 w-6">{l.tpo}</span>
              {l.type === 'POC' && <Badge variant="info">POC</Badge>}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
