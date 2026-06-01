'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Crown } from 'lucide-react';

interface MegaCapData { symbol: string; name: string; price: number; marketCap: number; peRatio: number; ytdReturn: number; sector: string; }
const STOCKS: MegaCapData[] = [
  { symbol: 'AAPL', name: 'Apple', price: 186.05, marketCap: 2880, peRatio: 28.4, ytdReturn: 8.2, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, marketCap: 3010, peRatio: 34.2, ytdReturn: 12.4, sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, marketCap: 2160, peRatio: 68.4, ytdReturn: 82.4, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, marketCap: 1780, peRatio: 24.8, ytdReturn: 14.2, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon', price: 178.25, marketCap: 1840, peRatio: 58.2, ytdReturn: 18.8, sector: 'Consumer' },
  { symbol: 'META', name: 'Meta', price: 484.10, marketCap: 1240, peRatio: 28.8, ytdReturn: 42.4, sector: 'Technology' },
  { symbol: 'BRK.B', name: 'Berkshire', price: 408.20, marketCap: 882, peRatio: 10.2, ytdReturn: 14.8, sector: 'Financials' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 782.40, marketCap: 742, peRatio: 124.8, ytdReturn: 28.4, sector: 'Healthcare' },
];

export default function MegaCapStocksPage() {
  const totalMktCap = STOCKS.reduce((s, st) => s + st.marketCap, 0);
  const avgReturn = STOCKS.reduce((s, st) => s + st.ytdReturn, 0) / STOCKS.length;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Mega Cap Stocks</h1><p className="mt-1 text-sm text-gray-500">Companies with market cap above $500B</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Total Mkt Cap</p><p className="text-lg font-bold text-indigo-400">${(totalMktCap / 1000).toFixed(1)}T</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg YTD Return</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Companies</p><p className="text-lg font-bold text-gray-400">{STOCKS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Crown className="h-4 w-4 text-indigo-400" /> Mega Caps</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.marketCap - a.marketCap).map((s) => (
            <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.symbol}</span>
                <span className="text-[10px] text-gray-500">{s.name}</span>
                <Badge variant="default">{s.sector}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">${s.marketCap}B</span>
                <span className="text-[10px] text-gray-500">P/E: {s.peRatio}</span>
                <span className={cn('text-sm font-bold font-mono', s.ytdReturn > 20 ? 'text-green-400' : 'text-amber-400')}>+{s.ytdReturn}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
