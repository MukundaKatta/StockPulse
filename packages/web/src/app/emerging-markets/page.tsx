'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Globe } from 'lucide-react';

interface EmergingMarketIndex {
  name: string;
  country: string;
  value: number;
  change1D: number;
  changeYTD: number;
  peRatio: number;
  divYield: number;
  region: 'Asia' | 'LatAm' | 'EMEA' | 'Frontier';
}

const INDICES: EmergingMarketIndex[] = [
  { name: 'Shanghai Composite', country: 'China', value: 3088.50, change1D: -0.42, changeYTD: 2.8, peRatio: 12.4, divYield: 2.8, region: 'Asia' },
  { name: 'Nifty 50', country: 'India', value: 22450.00, change1D: 1.25, changeYTD: 8.5, peRatio: 22.8, divYield: 1.3, region: 'Asia' },
  { name: 'Bovespa', country: 'Brazil', value: 128500.00, change1D: -0.85, changeYTD: -4.2, peRatio: 8.1, divYield: 5.8, region: 'LatAm' },
  { name: 'KOSPI', country: 'South Korea', value: 2680.40, change1D: 0.68, changeYTD: 5.2, peRatio: 11.5, divYield: 2.1, region: 'Asia' },
  { name: 'Taiwan Weighted', country: 'Taiwan', value: 20150.00, change1D: 1.45, changeYTD: 12.4, peRatio: 15.8, divYield: 3.2, region: 'Asia' },
  { name: 'JSE Top 40', country: 'South Africa', value: 72400.00, change1D: -0.32, changeYTD: -1.8, peRatio: 10.2, divYield: 4.1, region: 'EMEA' },
  { name: 'Mexican IPC', country: 'Mexico', value: 56800.00, change1D: 0.55, changeYTD: -6.5, peRatio: 14.5, divYield: 2.5, region: 'LatAm' },
  { name: 'Vietnam VN-Index', country: 'Vietnam', value: 1245.00, change1D: 2.10, changeYTD: 10.2, peRatio: 13.8, divYield: 2.0, region: 'Frontier' },
];

const regionVariant = (r: string) => r === 'Asia' ? 'info' : r === 'LatAm' ? 'warning' : r === 'EMEA' ? 'success' : 'default';

export default function EmergingMarketsPage() {
  const gainers = INDICES.filter(i => i.change1D > 0).length;
  const avgYTD = INDICES.reduce((s, i) => s + i.changeYTD, 0) / INDICES.length;
  const avgPE = INDICES.reduce((s, i) => s + i.peRatio, 0) / INDICES.length;
  const avgDivYield = INDICES.reduce((s, i) => s + i.divYield, 0) / INDICES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Emerging Markets</h1>
        <p className="mt-1 text-sm text-gray-500">Emerging and frontier market index tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gainers Today</p><p className="text-lg font-bold text-green-400">{gainers}/{INDICES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg YTD</p><p className={cn('text-lg font-bold', avgYTD >= 0 ? 'text-green-400' : 'text-red-400')}>{avgYTD >= 0 ? '+' : ''}{avgYTD.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg P/E</p><p className="text-lg font-bold text-white">{avgPE.toFixed(1)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Div Yield</p><p className="text-lg font-bold text-indigo-400">{avgDivYield.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-indigo-400" /> EM Indices</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICES.map((i) => (
            <div key={i.name} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{i.name} <span className="text-gray-500">{i.country}</span></p>
                <p className="text-xs text-gray-500">P/E {i.peRatio} &middot; Div {i.divYield}% &middot; YTD {i.changeYTD >= 0 ? '+' : ''}{i.changeYTD}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{i.value.toLocaleString()}</p>
                  <p className={cn('text-[10px] font-mono', i.change1D >= 0 ? 'text-green-400' : 'text-red-400')}>{i.change1D >= 0 ? '+' : ''}{i.change1D}%</p>
                </div>
                <Badge variant={regionVariant(i.region)}>{i.region}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
