'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Brain, TrendingUp, TrendingDown } from 'lucide-react';

interface SentimentMetric {
  name: string;
  value: number;
  signal: 'bullish' | 'bearish' | 'neutral';
  description: string;
}

const METRICS: SentimentMetric[] = [
  { name: 'Put/Call Ratio', value: 0.72, signal: 'bullish', description: 'Below 0.8 indicates bullish sentiment' },
  { name: 'VIX Level', value: 18.4, signal: 'bullish', description: 'Low VIX suggests market complacency' },
  { name: 'AAII Bull/Bear', value: 42.5, signal: 'neutral', description: '42.5% bullish, 28.5% bearish' },
  { name: 'NYSE Advance/Decline', value: 1.85, signal: 'bullish', description: 'More advancing stocks than declining' },
  { name: 'New Highs vs Lows', value: 285, signal: 'bullish', description: '285 new highs vs 42 new lows' },
  { name: 'Margin Debt', value: -2.3, signal: 'bearish', description: 'Margin debt declining month-over-month' },
  { name: 'Fund Flows', value: 8.5, signal: 'bullish', description: '$8.5B net inflows into equity funds' },
  { name: 'Insider Activity', value: -0.8, signal: 'bearish', description: 'Net selling by corporate insiders' },
];

export default function MarketSentimentPage() {
  const bullish = METRICS.filter((m) => m.signal === 'bullish').length;
  const bearish = METRICS.filter((m) => m.signal === 'bearish').length;
  const overallScore = ((bullish / METRICS.length) * 100);
  const overall = overallScore >= 60 ? 'Bullish' : overallScore <= 40 ? 'Bearish' : 'Neutral';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Sentiment</h1>
        <p className="mt-1 text-sm text-gray-500">Composite sentiment indicators and market mood</p>
      </div>

      {/* Overall Gauge */}
      <Card className="!p-6">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase mb-2">Overall Sentiment</p>
          <div className="relative w-48 h-24 mx-auto">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round" />
              <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none"
                stroke={overallScore >= 60 ? '#22c55e' : overallScore <= 40 ? '#ef4444' : '#f59e0b'}
                strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${overallScore * 2.83} 283`}
              />
            </svg>
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <span className={cn('text-2xl font-bold', overallScore >= 60 ? 'text-green-400' : overallScore <= 40 ? 'text-red-400' : 'text-amber-400')}>
                {overall}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{bullish} bullish / {bearish} bearish / {METRICS.length - bullish - bearish} neutral</p>
        </div>
      </Card>

      {/* Individual Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {METRICS.map((metric) => (
          <Card key={metric.name} className="!p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{metric.name}</p>
                  <Badge variant={metric.signal === 'bullish' ? 'success' : metric.signal === 'bearish' ? 'danger' : 'info'}>
                    {metric.signal}
                  </Badge>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">{metric.description}</p>
              </div>
              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center', metric.signal === 'bullish' ? 'bg-green-500/10' : metric.signal === 'bearish' ? 'bg-red-500/10' : 'bg-gray-500/10')}>
                {metric.signal === 'bullish' ? <TrendingUp className="h-3.5 w-3.5 text-green-400" /> : metric.signal === 'bearish' ? <TrendingDown className="h-3.5 w-3.5 text-red-400" /> : <span className="text-gray-400 text-xs">—</span>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-indigo-400" />
            Interpretation
          </CardTitle>
        </CardHeader>
        <div className="space-y-2 text-xs text-gray-400">
          <p>Current readings show a moderately bullish market environment. Key observations:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li>Low put/call ratio and VIX suggest trader confidence</li>
            <li>Strong breadth with more new highs than lows</li>
            <li>Insider selling is a mild warning sign</li>
            <li>Fund inflows remain positive, supporting upside</li>
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}
