'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Scissors } from 'lucide-react';

interface HarvestData { symbol: string; name: string; costBasis: number; current: number; loss: number; washSale: boolean; daysHeld: number; }
const POSITIONS: HarvestData[] = [
  { symbol: 'INTC', name: 'Intel', costBasis: 52.40, current: 42.80, loss: -1920, washSale: false, daysHeld: 180 },
  { symbol: 'BABA', name: 'Alibaba', costBasis: 88.20, current: 72.40, loss: -3160, washSale: false, daysHeld: 240 },
  { symbol: 'PYPL', name: 'PayPal', costBasis: 72.80, current: 62.40, loss: -2080, washSale: true, daysHeld: 45 },
  { symbol: 'DIS', name: 'Disney', costBasis: 104.20, current: 94.80, loss: -940, washSale: false, daysHeld: 120 },
  { symbol: 'NKE', name: 'Nike', costBasis: 112.40, current: 98.20, loss: -1420, washSale: false, daysHeld: 200 },
  { symbol: 'SNAP', name: 'Snap', costBasis: 14.80, current: 11.20, loss: -1080, washSale: true, daysHeld: 28 },
  { symbol: 'RIVN', name: 'Rivian', costBasis: 18.40, current: 12.80, loss: -2240, washSale: false, daysHeld: 310 },
];

export default function TaxLossHarvestPage() {
  const eligible = POSITIONS.filter((p) => !p.washSale);
  const totalSavings = eligible.reduce((s, p) => s + p.loss, 0);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Tax-Loss Harvesting</h1><p className="mt-1 text-sm text-gray-500">Identify positions with unrealized losses for tax savings</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Harvestable Loss</p><p className="text-lg font-bold text-green-400">${Math.abs(totalSavings).toLocaleString()}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Eligible</p><p className="text-lg font-bold text-indigo-400">{eligible.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Wash Sale</p><p className="text-lg font-bold text-red-400">{POSITIONS.length - eligible.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Scissors className="h-4 w-4 text-indigo-400" /> Harvest Opportunities</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {POSITIONS.sort((a, b) => a.loss - b.loss).map((p) => (
            <div key={p.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{p.symbol}</span>
                <span className="text-[10px] text-gray-500">{p.name}</span>
                {p.washSale && <Badge variant="danger">Wash Sale</Badge>}
                {!p.washSale && <Badge variant="success">Eligible</Badge>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">{p.daysHeld}d held</span>
                <span className={cn('text-sm font-bold font-mono text-red-400')}>${p.loss.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
