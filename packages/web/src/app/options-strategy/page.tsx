'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface OptionLeg {
  strike: number;
  type: 'Call' | 'Put';
  action: 'Buy' | 'Sell';
  premium: number;
  expiry: string;
  delta: number;
  iv: number;
}

interface Strategy {
  name: string;
  legs: OptionLeg[];
  maxProfit: string;
  maxLoss: string;
  breakeven: string;
  outlook: string;
}

const STRATEGIES: Strategy[] = [
  {
    name: 'Bull Call Spread',
    legs: [
      { strike: 185, type: 'Call', action: 'Buy', premium: 4.50, expiry: '2024-03-15', delta: 0.55, iv: 22.4 },
      { strike: 195, type: 'Call', action: 'Sell', premium: 1.80, expiry: '2024-03-15', delta: 0.28, iv: 21.8 },
    ],
    maxProfit: '$730', maxLoss: '$270', breakeven: '$187.70', outlook: 'Moderately Bullish',
  },
  {
    name: 'Iron Condor',
    legs: [
      { strike: 175, type: 'Put', action: 'Buy', premium: 1.20, expiry: '2024-03-15', delta: -0.15, iv: 24.2 },
      { strike: 180, type: 'Put', action: 'Sell', premium: 2.40, expiry: '2024-03-15', delta: -0.25, iv: 23.5 },
      { strike: 195, type: 'Call', action: 'Sell', premium: 1.80, expiry: '2024-03-15', delta: 0.28, iv: 21.8 },
      { strike: 200, type: 'Call', action: 'Buy', premium: 0.90, expiry: '2024-03-15', delta: 0.15, iv: 21.2 },
    ],
    maxProfit: '$210', maxLoss: '$290', breakeven: '$177.90-$197.10', outlook: 'Neutral / Low Vol',
  },
  {
    name: 'Protective Put',
    legs: [
      { strike: 180, type: 'Put', action: 'Buy', premium: 2.40, expiry: '2024-03-15', delta: -0.25, iv: 23.5 },
    ],
    maxProfit: 'Unlimited', maxLoss: '$840', breakeven: '$183.60', outlook: 'Bullish with Protection',
  },
];

export default function OptionsStrategyPage() {
  const [active, setActive] = useState(0);
  const strat = STRATEGIES[active];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Options Strategy Builder</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL multi-leg options strategies</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {STRATEGIES.map((s, i) => (
          <button key={s.name} onClick={() => setActive(i)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', i === active ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10')}>
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Max Profit</p>
          <p className="text-sm font-bold text-green-400">{strat.maxProfit}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Max Loss</p>
          <p className="text-sm font-bold text-red-400">{strat.maxLoss}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Breakeven</p>
          <p className="text-sm font-bold text-white">{strat.breakeven}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Outlook</p>
          <p className="text-sm font-bold text-indigo-400">{strat.outlook}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Layers className="h-4 w-4 text-indigo-400" /> {strat.name} Legs
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {strat.legs.map((leg, i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-4">
              <Badge variant={leg.action === 'Buy' ? 'success' : 'danger'}>{leg.action}</Badge>
              <span className="text-xs font-bold text-white w-12">${leg.strike}</span>
              <Badge variant={leg.type === 'Call' ? 'info' : 'warning'}>{leg.type}</Badge>
              <span className="text-xs font-mono text-gray-400 w-14">${leg.premium.toFixed(2)}</span>
              <span className="text-xs font-mono text-gray-400 w-14">Δ {leg.delta.toFixed(2)}</span>
              <span className="text-xs font-mono text-gray-400 w-14">IV {leg.iv.toFixed(1)}%</span>
              <span className="text-[10px] text-gray-500 ml-auto">{leg.expiry}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
