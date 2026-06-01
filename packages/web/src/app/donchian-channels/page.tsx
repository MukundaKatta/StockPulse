'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';
interface DonchianData { symbol: string; name: string; price: number; upper20: number; lower20: number; mid20: number; width: number; position: number; signal: string; }
const STOCKS: DonchianData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, upper20: 882.40, lower20: 752.80, mid20: 817.60, width: 17.2, position: 96.8, signal: 'Breakout' },
  { symbol: 'META', name: 'Meta', price: 484.10, upper20: 488.50, lower20: 432.20, mid20: 460.35, width: 13.0, position: 92.2, signal: 'Near High' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, upper20: 408.20, lower20: 378.40, mid20: 393.30, width: 7.9, position: 88.8, signal: 'Near High' },
  { symbol: 'AAPL', name: 'Apple', price: 186.05, upper20: 192.40, lower20: 178.20, mid20: 185.30, width: 8.0, position: 55.3, signal: 'Mid-Range' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, upper20: 148.20, lower20: 134.80, mid20: 141.50, width: 9.9, position: 52.2, signal: 'Mid-Range' },
  { symbol: 'TSLA', name: 'Tesla', price: 188.20, upper20: 225.80, lower20: 182.40, mid20: 204.10, width: 23.8, position: 13.4, signal: 'Near Low' },
  { symbol: 'INTC', name: 'Intel', price: 42.80, upper20: 48.80, lower20: 41.20, mid20: 45.00, width: 18.4, position: 21.1, signal: 'Near Low' },
  { symbol: 'BA', name: 'Boeing', price: 198.40, upper20: 218.20, lower20: 196.80, mid20: 207.50, width: 10.9, position: 7.5, signal: 'Breakdown' },
];
export default function DonchianChannelsPage() {
  const breakouts = STOCKS.filter((s) => s.position > 90).length;
  const breakdowns = STOCKS.filter((s) => s.position < 10).length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Donchian Channels</h1><p className="mt-1 text-sm text-gray-500">20-period Donchian channel breakout/breakdown analysis</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Breakouts</p><p className="text-lg font-bold text-green-400">{breakouts}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Mid-Range</p><p className="text-lg font-bold text-gray-400">{STOCKS.length - breakouts - breakdowns}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Breakdowns</p><p className="text-lg font-bold text-red-400">{breakdowns}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> Channel Positions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.position - a.position).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.position > 80 ? 'success' : s.position < 20 ? 'danger' : 'default'}>{s.signal}</Badge></div>
                <span className="text-xs font-mono text-white">${s.price.toFixed(2)}</span>
              </div>
              <div className="relative h-2 rounded bg-white/5">
                <div className="absolute top-0 bottom-0 w-1.5 rounded bg-white" style={{ left: `${s.position}%` }} />
              </div>
              <div className="flex justify-between text-[9px] text-gray-500">
                <span>${s.lower20.toFixed(0)}</span><span>Mid: ${s.mid20.toFixed(0)}</span><span>${s.upper20.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
