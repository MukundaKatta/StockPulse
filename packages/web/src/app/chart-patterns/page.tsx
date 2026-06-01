'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { LineChart } from 'lucide-react';

interface ChartPattern {
  ticker: string;
  company: string;
  pattern: string;
  price: number;
  breakoutTarget: number;
  direction: 'Bullish' | 'Bearish' | 'Neutral';
  completion: number;
  timeframe: string;
}

const CHART_PATTERNS: ChartPattern[] = [
  { ticker: 'AAPL', company: 'Apple', pattern: 'Cup & Handle', price: 185.20, breakoutTarget: 205.00, direction: 'Bullish', completion: 85, timeframe: '3 months' },
  { ticker: 'TSLA', company: 'Tesla', pattern: 'Head & Shoulders', price: 245.80, breakoutTarget: 200.00, direction: 'Bearish', completion: 92, timeframe: '2 months' },
  { ticker: 'MSFT', company: 'Microsoft', pattern: 'Ascending Triangle', price: 404.80, breakoutTarget: 440.00, direction: 'Bullish', completion: 78, timeframe: '6 weeks' },
  { ticker: 'NVDA', company: 'NVIDIA', pattern: 'Bull Flag', price: 878.35, breakoutTarget: 950.00, direction: 'Bullish', completion: 65, timeframe: '2 weeks' },
  { ticker: 'AMZN', company: 'Amazon', pattern: 'Double Bottom', price: 178.25, breakoutTarget: 198.00, direction: 'Bullish', completion: 88, timeframe: '1 month' },
  { ticker: 'NFLX', company: 'Netflix', pattern: 'Rising Wedge', price: 605.40, breakoutTarget: 560.00, direction: 'Bearish', completion: 72, timeframe: '3 weeks' },
  { ticker: 'META', company: 'Meta', pattern: 'Symmetrical Triangle', price: 484.10, breakoutTarget: 520.00, direction: 'Neutral', completion: 80, timeframe: '1 month' },
];

const dirVariant = (d: string) => d === 'Bullish' ? 'success' : d === 'Bearish' ? 'danger' : 'warning';

export default function ChartPatternsPage() {
  const bullish = CHART_PATTERNS.filter(p => p.direction === 'Bullish').length;
  const bearish = CHART_PATTERNS.filter(p => p.direction === 'Bearish').length;
  const avgCompletion = CHART_PATTERNS.reduce((s, p) => s + p.completion, 0) / CHART_PATTERNS.length;
  const nearComplete = CHART_PATTERNS.filter(p => p.completion >= 80).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Chart Patterns</h1>
        <p className="mt-1 text-sm text-gray-500">Chart pattern recognition</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Bullish</p><p className="text-lg font-bold text-green-400">{bullish}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Bearish</p><p className="text-lg font-bold text-red-400">{bearish}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Completion</p><p className="text-lg font-bold text-indigo-400">{avgCompletion.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Near Complete</p><p className="text-lg font-bold text-white">{nearComplete}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><LineChart className="h-4 w-4 text-indigo-400" /> Detected Patterns</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {CHART_PATTERNS.map((p) => (
            <div key={p.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{p.ticker} <span className="text-gray-500">{p.company}</span></p>
                <p className="text-xs text-gray-500">{p.pattern} &middot; {p.completion}% complete &middot; {p.timeframe}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(p.price)}</p>
                  <p className="text-[10px] text-gray-500">Target {formatCurrency(p.breakoutTarget)}</p>
                </div>
                <Badge variant={dirVariant(p.direction)}>{p.direction}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
