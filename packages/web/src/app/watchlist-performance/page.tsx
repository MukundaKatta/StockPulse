'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Eye } from 'lucide-react';

interface WatchlistData { symbol: string; name: string; addedPrice: number; currentPrice: number; changeSinceAdded: number; alert: string; list: string; }
const ITEMS: WatchlistData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', addedPrice: 620.00, currentPrice: 878.35, changeSinceAdded: 41.7, alert: 'Above Target', list: 'Tech Momentum' },
  { symbol: 'PLTR', name: 'Palantir', addedPrice: 18.40, currentPrice: 24.80, changeSinceAdded: 34.8, alert: 'Above Target', list: 'AI Plays' },
  { symbol: 'INTC', name: 'Intel', addedPrice: 48.20, currentPrice: 42.80, changeSinceAdded: -11.2, alert: 'Below Stop', list: 'Turnaround' },
  { symbol: 'SOFI', name: 'SoFi', addedPrice: 7.80, currentPrice: 8.40, changeSinceAdded: 7.7, alert: 'None', list: 'Fintech' },
  { symbol: 'AMD', name: 'AMD', addedPrice: 142.80, currentPrice: 172.40, changeSinceAdded: 20.7, alert: 'Near Target', list: 'Tech Momentum' },
  { symbol: 'COIN', name: 'Coinbase', addedPrice: 148.20, currentPrice: 242.80, changeSinceAdded: 63.8, alert: 'Above Target', list: 'Crypto' },
  { symbol: 'RIVN', name: 'Rivian', addedPrice: 14.80, currentPrice: 12.80, changeSinceAdded: -13.5, alert: 'Below Stop', list: 'EV' },
];

export default function WatchlistPerformancePage() {
  const gainers = ITEMS.filter((i) => i.changeSinceAdded > 0).length;
  const alerts = ITEMS.filter((i) => i.alert !== 'None').length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Watchlist Performance</h1><p className="mt-1 text-sm text-gray-500">Track performance of stocks on your watchlists</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers</p><p className="text-lg font-bold text-green-400">{gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Losers</p><p className="text-lg font-bold text-red-400">{ITEMS.length - gainers}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Active Alerts</p><p className="text-lg font-bold text-amber-400">{alerts}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Eye className="h-4 w-4 text-indigo-400" /> Watchlist Items</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ITEMS.sort((a, b) => b.changeSinceAdded - a.changeSinceAdded).map((i) => (
            <div key={i.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{i.symbol}</span>
                <span className="text-[10px] text-gray-500">{i.name}</span>
                <Badge variant="default">{i.list}</Badge>
                {i.alert !== 'None' && <Badge variant={i.alert.includes('Above') || i.alert.includes('Near') ? 'success' : 'danger'}>{i.alert}</Badge>}
              </div>
              <span className={cn('text-sm font-bold font-mono', i.changeSinceAdded > 0 ? 'text-green-400' : 'text-red-400')}>{i.changeSinceAdded > 0 ? '+' : ''}{i.changeSinceAdded.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
