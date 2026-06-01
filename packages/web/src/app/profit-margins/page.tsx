'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Percent } from 'lucide-react';

interface MarginData {
  symbol: string;
  name: string;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  ebitdaMargin: number;
  sector: string;
}

const STOCKS: MarginData[] = [
  { symbol: 'MSFT', name: 'Microsoft', grossMargin: 69.4, operatingMargin: 44.2, netMargin: 36.4, ebitdaMargin: 52.8, sector: 'Tech' },
  { symbol: 'NVDA', name: 'NVIDIA', grossMargin: 72.7, operatingMargin: 54.1, netMargin: 48.8, ebitdaMargin: 58.2, sector: 'Tech' },
  { symbol: 'AAPL', name: 'Apple', grossMargin: 45.0, operatingMargin: 30.7, netMargin: 25.3, ebitdaMargin: 34.2, sector: 'Tech' },
  { symbol: 'META', name: 'Meta', grossMargin: 80.3, operatingMargin: 35.0, netMargin: 28.2, ebitdaMargin: 48.5, sector: 'Tech' },
  { symbol: 'GOOGL', name: 'Alphabet', grossMargin: 56.1, operatingMargin: 28.8, netMargin: 24.0, ebitdaMargin: 36.4, sector: 'Tech' },
  { symbol: 'JPM', name: 'JP Morgan', grossMargin: 0, operatingMargin: 38.2, netMargin: 32.4, ebitdaMargin: 0, sector: 'Finance' },
  { symbol: 'AMZN', name: 'Amazon', grossMargin: 46.8, operatingMargin: 7.8, netMargin: 5.3, ebitdaMargin: 14.2, sector: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla', grossMargin: 18.2, operatingMargin: 8.2, netMargin: 7.9, ebitdaMargin: 12.4, sector: 'Auto' },
];

export default function ProfitMarginsPage() {
  const avg = (key: keyof MarginData) => {
    const vals = STOCKS.map((s) => s[key] as number).filter((v) => v > 0);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Profit Margins</h1>
        <p className="mt-1 text-sm text-gray-500">Gross, operating, net, and EBITDA margin comparison</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Gross</p><p className="text-lg font-bold text-green-400">{avg('grossMargin').toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Operating</p><p className="text-lg font-bold text-blue-400">{avg('operatingMargin').toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Net</p><p className="text-lg font-bold text-indigo-400">{avg('netMargin').toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg EBITDA</p><p className="text-lg font-bold text-amber-400">{avg('ebitdaMargin').toFixed(1)}%</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Percent className="h-4 w-4 text-indigo-400" /> Margin Comparison</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.netMargin - a.netMargin).map((s) => (
            <div key={s.symbol} className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span><Badge variant="info">{s.sector}</Badge></div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[{ l: 'Gross', v: s.grossMargin, c: 'bg-green-500' }, { l: 'Operating', v: s.operatingMargin, c: 'bg-blue-500' }, { l: 'Net', v: s.netMargin, c: 'bg-indigo-500' }, { l: 'EBITDA', v: s.ebitdaMargin, c: 'bg-amber-500' }].map((m) => (
                  <div key={m.l} className="space-y-0.5">
                    <div className="flex justify-between text-[9px]"><span className="text-gray-500">{m.l}</span><span className="text-white font-mono">{m.v > 0 ? `${m.v}%` : 'N/A'}</span></div>
                    <div className="h-1 rounded bg-white/5"><div className={cn('h-full rounded', m.c)} style={{ width: `${Math.min(100, m.v)}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
