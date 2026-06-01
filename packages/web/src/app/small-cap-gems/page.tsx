'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Gem } from 'lucide-react';

interface SmallCapData { symbol: string; name: string; price: number; marketCap: number; revenueGrowth: number; sector: string; rating: string; }
const STOCKS: SmallCapData[] = [
  { symbol: 'IONQ', name: 'IonQ', price: 12.80, marketCap: 2.8, revenueGrowth: 98.4, sector: 'Technology', rating: 'Strong Buy' },
  { symbol: 'SOUN', name: 'SoundHound', price: 4.20, marketCap: 1.4, revenueGrowth: 52.8, sector: 'AI/Tech', rating: 'Buy' },
  { symbol: 'ASTS', name: 'AST SpaceMobile', price: 5.80, marketCap: 1.8, revenueGrowth: 0, sector: 'Telecom', rating: 'Speculative' },
  { symbol: 'STEM', name: 'Stem Inc', price: 3.40, marketCap: 0.8, revenueGrowth: 28.4, sector: 'Energy', rating: 'Buy' },
  { symbol: 'JOBY', name: 'Joby Aviation', price: 6.20, marketCap: 3.2, revenueGrowth: 0, sector: 'Aerospace', rating: 'Speculative' },
  { symbol: 'CELH', name: 'Celsius', price: 58.40, marketCap: 4.2, revenueGrowth: 42.8, sector: 'Consumer', rating: 'Strong Buy' },
  { symbol: 'HIMS', name: 'Hims & Hers', price: 14.80, marketCap: 3.1, revenueGrowth: 48.2, sector: 'Healthcare', rating: 'Buy' },
];

export default function SmallCapGemsPage() {
  const strongBuys = STOCKS.filter((s) => s.rating === 'Strong Buy').length;
  const avgGrowth = STOCKS.filter((s) => s.revenueGrowth > 0).reduce((s, st) => s + st.revenueGrowth, 0) / STOCKS.filter((s) => s.revenueGrowth > 0).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Small Cap Gems</h1><p className="mt-1 text-sm text-gray-500">Promising small-cap stocks with growth potential</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong Buys</p><p className="text-lg font-bold text-green-400">{strongBuys}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Rev Growth</p><p className="text-lg font-bold text-indigo-400">{avgGrowth.toFixed(0)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Picks</p><p className="text-lg font-bold text-gray-400">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gem className="h-4 w-4 text-indigo-400" /> Small Cap Picks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant={s.rating === 'Strong Buy' ? 'success' : s.rating === 'Buy' ? 'info' : 'warning'}>{s.rating}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">${s.marketCap}B</span>
                <span className={cn('text-sm font-bold font-mono', s.revenueGrowth > 40 ? 'text-green-400' : s.revenueGrowth > 0 ? 'text-amber-400' : 'text-gray-400')}>{s.revenueGrowth > 0 ? `+${s.revenueGrowth}%` : 'Pre-Rev'}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
