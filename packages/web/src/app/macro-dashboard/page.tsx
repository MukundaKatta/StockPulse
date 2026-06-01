'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Globe } from 'lucide-react';

interface MacroIndicator {
  name: string;
  category: string;
  current: number;
  previous: number;
  unit: string;
  trend: 'Rising' | 'Falling' | 'Stable';
  impact: 'Bullish' | 'Bearish' | 'Neutral';
  lastUpdate: string;
}

const INDICATORS: MacroIndicator[] = [
  { name: 'GDP Growth (QoQ)', category: 'Growth', current: 2.8, previous: 3.4, unit: '%', trend: 'Falling', impact: 'Neutral', lastUpdate: 'May 2026' },
  { name: 'CPI (YoY)', category: 'Inflation', current: 3.2, previous: 3.5, unit: '%', trend: 'Falling', impact: 'Bullish', lastUpdate: 'May 2026' },
  { name: 'Unemployment Rate', category: 'Labor', current: 3.9, previous: 3.8, unit: '%', trend: 'Rising', impact: 'Bearish', lastUpdate: 'May 2026' },
  { name: 'Fed Funds Rate', category: 'Rates', current: 5.25, previous: 5.25, unit: '%', trend: 'Stable', impact: 'Neutral', lastUpdate: 'May 2026' },
  { name: 'ISM Manufacturing', category: 'Activity', current: 51.2, previous: 49.8, unit: '', trend: 'Rising', impact: 'Bullish', lastUpdate: 'May 2026' },
  { name: '10Y Treasury Yield', category: 'Rates', current: 4.35, previous: 4.42, unit: '%', trend: 'Falling', impact: 'Bullish', lastUpdate: 'Jun 2026' },
  { name: 'Consumer Confidence', category: 'Sentiment', current: 102.5, previous: 98.7, unit: '', trend: 'Rising', impact: 'Bullish', lastUpdate: 'May 2026' },
  { name: 'PMI Services', category: 'Activity', current: 53.8, previous: 52.4, unit: '', trend: 'Rising', impact: 'Bullish', lastUpdate: 'May 2026' },
];

const impactVariant = (i: string) => i === 'Bullish' ? 'success' : i === 'Bearish' ? 'danger' : 'default';
const trendVariant = (t: string) => t === 'Rising' ? 'info' : t === 'Falling' ? 'warning' : 'default';

export default function MacroDashboardPage() {
  const bullish = INDICATORS.filter(i => i.impact === 'Bullish').length;
  const bearish = INDICATORS.filter(i => i.impact === 'Bearish').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Macro Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Key macroeconomic indicators and trends</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Indicators</p><p className="text-lg font-bold text-white">{INDICATORS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">GDP</p><p className="text-lg font-bold text-indigo-400">2.8%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-indigo-400" /> Economic Indicators</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {INDICATORS.map((ind) => (
            <div key={ind.name} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-36">
                <p className="text-xs font-bold text-white">{ind.name}</p>
                <p className="text-[10px] text-gray-500">{ind.category} &middot; {ind.lastUpdate}</p>
              </div>
              <span className="text-xs font-mono text-white w-14">{ind.current}{ind.unit}</span>
              <span className="text-[10px] text-gray-400 w-14">Prev: {ind.previous}{ind.unit}</span>
              <Badge variant={trendVariant(ind.trend)}>{ind.trend}</Badge>
              <Badge variant={impactVariant(ind.impact)} className="ml-auto">{ind.impact}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
