'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { CircleDot } from 'lucide-react';

interface RatioDataPoint {
  period: string;
  goldPrice: number;
  silverPrice: number;
  ratio: number;
  avgRatio: number;
  deviation: number;
  signal: 'Buy Silver' | 'Buy Gold' | 'Neutral';
}

const DATA: RatioDataPoint[] = [
  { period: 'Current', goldPrice: 2345.80, silverPrice: 27.50, ratio: 85.3, avgRatio: 68.0, deviation: 25.4, signal: 'Buy Silver' },
  { period: '1 Month Ago', goldPrice: 2280.40, silverPrice: 26.80, ratio: 85.1, avgRatio: 68.0, deviation: 25.1, signal: 'Buy Silver' },
  { period: '3 Months Ago', goldPrice: 2150.20, silverPrice: 24.20, ratio: 88.8, avgRatio: 68.0, deviation: 30.6, signal: 'Buy Silver' },
  { period: '6 Months Ago', goldPrice: 2020.50, silverPrice: 23.10, ratio: 87.5, avgRatio: 68.0, deviation: 28.7, signal: 'Buy Silver' },
  { period: '1 Year Ago', goldPrice: 1985.30, silverPrice: 24.80, ratio: 80.1, avgRatio: 68.0, deviation: 17.8, signal: 'Neutral' },
  { period: '2 Years Ago', goldPrice: 1842.00, silverPrice: 22.50, ratio: 81.9, avgRatio: 68.0, deviation: 20.4, signal: 'Buy Silver' },
  { period: '5 Years Ago', goldPrice: 1780.00, silverPrice: 26.20, ratio: 67.9, avgRatio: 68.0, deviation: -0.1, signal: 'Neutral' },
  { period: '10 Years Ago', goldPrice: 1285.00, silverPrice: 19.50, ratio: 65.9, avgRatio: 68.0, deviation: -3.1, signal: 'Buy Gold' },
];

const signalVariant = (s: string) => s === 'Buy Silver' ? 'info' : s === 'Buy Gold' ? 'warning' : 'default';

export default function GoldSilverRatioPage() {
  const currentRatio = DATA[0].ratio;
  const avgRatio = DATA[0].avgRatio;
  const currentGold = DATA[0].goldPrice;
  const currentSilver = DATA[0].silverPrice;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Gold-to-Silver Ratio</h1>
        <p className="mt-1 text-sm text-gray-500">Historical gold/silver ratio with trade signals</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Current Ratio</p><p className="text-lg font-bold text-white">{currentRatio}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Historical Avg</p><p className="text-lg font-bold text-indigo-400">{avgRatio}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gold</p><p className="text-lg font-bold text-amber-400">{formatCurrency(currentGold)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Silver</p><p className="text-lg font-bold text-gray-300">{formatCurrency(currentSilver)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><CircleDot className="h-4 w-4 text-amber-400" /> Ratio History</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.map((d) => (
            <div key={d.period} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{d.period}</p>
                <p className="text-xs text-gray-500">Gold {formatCurrency(d.goldPrice)} &middot; Silver {formatCurrency(d.silverPrice)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{d.ratio}x</p>
                  <p className={cn('text-[10px] font-mono', d.deviation > 10 ? 'text-red-400' : d.deviation < -10 ? 'text-green-400' : 'text-gray-500')}>{d.deviation >= 0 ? '+' : ''}{d.deviation.toFixed(1)}% dev</p>
                </div>
                <Badge variant={signalVariant(d.signal)}>{d.signal}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
