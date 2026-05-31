'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

interface TradeIdea {
  id: string;
  symbol: string;
  direction: 'long' | 'short';
  entry: number;
  stopLoss: number;
  target: number;
  timeframe: string;
  confidence: 'high' | 'medium' | 'low';
  thesis: string;
  setup: string;
  riskReward: number;
}

const IDEAS: TradeIdea[] = [
  { id: '1', symbol: 'NVDA', direction: 'long', entry: 875, stopLoss: 845, target: 950, timeframe: '2-4 weeks', confidence: 'high', thesis: 'AI spending acceleration from cloud providers', setup: 'Breakout above consolidation with volume', riskReward: 2.5 },
  { id: '2', symbol: 'TSLA', direction: 'short', entry: 248, stopLoss: 265, target: 218, timeframe: '1-2 weeks', confidence: 'medium', thesis: 'Delivery numbers below expectations, competition intensifying', setup: 'Breakdown below 200 DMA with bearish RSI divergence', riskReward: 1.76 },
  { id: '3', symbol: 'AMZN', direction: 'long', entry: 178, stopLoss: 170, target: 200, timeframe: '3-6 weeks', confidence: 'high', thesis: 'AWS reacceleration + retail margin improvement', setup: 'Pullback to rising 20 EMA support', riskReward: 2.75 },
  { id: '4', symbol: 'DIS', direction: 'long', entry: 105, stopLoss: 98, target: 125, timeframe: '4-8 weeks', confidence: 'medium', thesis: 'Streaming profitability milestone ahead', setup: 'Double bottom at $100 support level', riskReward: 2.86 },
  { id: '5', symbol: 'XOM', direction: 'short', entry: 108, stopLoss: 114, target: 95, timeframe: '2-4 weeks', confidence: 'low', thesis: 'Oil demand concerns, refining margins compressing', setup: 'Head and shoulders pattern on daily chart', riskReward: 2.17 },
];

export default function TradeIdeasPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Trade Ideas</h1>
        <p className="mt-1 text-sm text-gray-500">Curated trade setups with defined risk/reward</p>
      </div>

      <div className="space-y-3">
        {IDEAS.map((idea) => (
          <Card key={idea.id} className="!p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', idea.direction === 'long' ? 'bg-green-500/10' : 'bg-red-500/10')}>
                  {idea.direction === 'long' ? <TrendingUp className="h-4 w-4 text-green-400" /> : <TrendingDown className="h-4 w-4 text-red-400" />}
                </div>
                <Link href={`/stock/${idea.symbol}`} className="font-mono font-bold text-indigo-400 hover:text-indigo-300">{idea.symbol}</Link>
                <Badge variant={idea.direction === 'long' ? 'success' : 'danger'}>{idea.direction}</Badge>
                <Badge variant={idea.confidence === 'high' ? 'success' : idea.confidence === 'medium' ? 'warning' : 'info'}>
                  {idea.confidence}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono text-gray-400">R:R {idea.riskReward.toFixed(2)}</p>
                <p className="text-[10px] text-gray-600">{idea.timeframe}</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 mb-2">{idea.thesis}</p>
            <p className="text-[10px] text-gray-500 mb-3">Setup: {idea.setup}</p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06]">
              <div className="text-center">
                <p className="text-[10px] text-gray-500">Entry</p>
                <p className="text-xs font-mono text-white">{formatCurrency(idea.entry)}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-500">Stop Loss</p>
                <p className="text-xs font-mono text-red-400">{formatCurrency(idea.stopLoss)}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-500">Target</p>
                <p className="text-xs font-mono text-green-400">{formatCurrency(idea.target)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
