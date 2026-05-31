'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface InternalMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  bullish: boolean;
}

const INTERNALS: InternalMetric[] = [
  { name: 'NYSE Advancing', value: 2145, max: 3500, unit: 'stocks', bullish: true },
  { name: 'NYSE Declining', value: 1285, max: 3500, unit: 'stocks', bullish: false },
  { name: 'NYSE New Highs', value: 285, max: 500, unit: 'stocks', bullish: true },
  { name: 'NYSE New Lows', value: 42, max: 500, unit: 'stocks', bullish: true },
  { name: 'Advance/Decline Ratio', value: 1.67, max: 4, unit: '', bullish: true },
  { name: 'Up Volume', value: 68, max: 100, unit: '%', bullish: true },
  { name: 'TICK', value: 425, max: 2000, unit: '', bullish: true },
  { name: 'TRIN (Arms)', value: 0.82, max: 2, unit: '', bullish: true },
  { name: '% Above 50 DMA', value: 62, max: 100, unit: '%', bullish: true },
  { name: '% Above 200 DMA', value: 58, max: 100, unit: '%', bullish: true },
  { name: 'McClellan Oscillator', value: 45, max: 200, unit: '', bullish: true },
  { name: 'Put/Call Ratio', value: 0.72, max: 2, unit: '', bullish: true },
];

export default function MarketInternalsPage() {
  const bullCount = INTERNALS.filter((m) => m.bullish).length;
  const breadth = (bullCount / INTERNALS.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Internals</h1>
          <p className="mt-1 text-sm text-gray-500">Real-time breadth and internal indicators</p>
        </div>
        <Badge variant={breadth >= 60 ? 'success' : breadth >= 40 ? 'warning' : 'danger'}>
          <Activity className="h-3 w-3 mr-1" />
          {breadth >= 60 ? 'Healthy' : breadth >= 40 ? 'Mixed' : 'Weak'}
        </Badge>
      </div>

      {/* Breadth Overview */}
      <Card className="!p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Market Breadth</span>
          <span className={cn('text-xs font-mono font-medium', breadth >= 60 ? 'text-green-400' : 'text-amber-400')}>
            {bullCount}/{INTERNALS.length} bullish
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden flex bg-white/5">
          <div className="h-full bg-green-500/60 transition-all" style={{ width: `${breadth}%` }} />
          <div className="h-full bg-red-500/60 transition-all" style={{ width: `${100 - breadth}%` }} />
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INTERNALS.map((metric) => (
          <Card key={metric.name} className="!p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-gray-500 uppercase truncate">{metric.name}</p>
              {metric.bullish ? <TrendingUp className="h-3 w-3 text-green-400 shrink-0" /> : <TrendingDown className="h-3 w-3 text-red-400 shrink-0" />}
            </div>
            <p className={cn('text-lg font-bold font-mono', metric.bullish ? 'text-green-400' : 'text-red-400')}>
              {metric.value.toLocaleString()}{metric.unit && <span className="text-xs text-gray-500 ml-0.5">{metric.unit}</span>}
            </p>
            <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className={cn('h-full rounded-full', metric.bullish ? 'bg-green-500/50' : 'bg-red-500/50')}
                style={{ width: `${(metric.value / metric.max) * 100}%` }}
              />
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
