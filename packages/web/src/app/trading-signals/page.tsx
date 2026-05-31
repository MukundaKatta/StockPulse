'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Radio } from 'lucide-react';

interface Signal {
  symbol: string;
  type: 'Buy' | 'Sell' | 'Hold';
  indicator: string;
  strength: number;
  price: number;
  target: number;
  stop: number;
  time: string;
}

const SIGNALS: Signal[] = [
  { symbol: 'NVDA', type: 'Buy', indicator: 'MACD Crossover', strength: 92, price: 878.35, target: 950, stop: 840, time: '14:32' },
  { symbol: 'AAPL', type: 'Hold', indicator: 'Range Bound', strength: 50, price: 186.05, target: 195, stop: 178, time: '14:15' },
  { symbol: 'TSLA', type: 'Sell', indicator: 'RSI Divergence', strength: 78, price: 188.70, target: 165, stop: 198, time: '13:45' },
  { symbol: 'META', type: 'Buy', indicator: 'Golden Cross', strength: 85, price: 484.10, target: 520, stop: 460, time: '13:20' },
  { symbol: 'AMD', type: 'Buy', indicator: 'Breakout', strength: 88, price: 177.52, target: 195, stop: 168, time: '12:55' },
  { symbol: 'MSFT', type: 'Hold', indicator: 'Consolidating', strength: 45, price: 404.87, target: 420, stop: 390, time: '12:30' },
  { symbol: 'GOOGL', type: 'Buy', indicator: 'Support Bounce', strength: 72, price: 141.80, target: 155, stop: 135, time: '11:45' },
  { symbol: 'BA', type: 'Sell', indicator: 'Death Cross', strength: 82, price: 204.15, target: 180, stop: 215, time: '11:20' },
];

export default function TradingSignalsPage() {
  const buys = SIGNALS.filter((s) => s.type === 'Buy').length;
  const sells = SIGNALS.filter((s) => s.type === 'Sell').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Trading Signals</h1>
        <p className="mt-1 text-sm text-gray-500">Technical analysis signals with entry/exit levels</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Buy Signals</p>
          <p className="text-lg font-bold text-green-400">{buys}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Sell Signals</p>
          <p className="text-lg font-bold text-red-400">{sells}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Hold</p>
          <p className="text-lg font-bold text-gray-400">{SIGNALS.length - buys - sells}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Radio className="h-4 w-4 text-indigo-400" /> Active Signals
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {SIGNALS.map((s) => (
            <div key={`${s.symbol}-${s.time}`} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-10">{s.time}</span>
              <span className="text-xs font-bold text-white w-12">{s.symbol}</span>
              <Badge variant={s.type === 'Buy' ? 'success' : s.type === 'Sell' ? 'danger' : 'default'}>
                {s.type}
              </Badge>
              <span className="text-[10px] text-gray-400 w-24 truncate">{s.indicator}</span>
              <span className="text-xs font-mono text-white w-16">${s.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-green-400 w-14">T: ${s.target}</span>
              <span className="text-xs font-mono text-red-400 w-14">S: ${s.stop}</span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={cn('h-full rounded-full', s.strength >= 80 ? 'bg-green-500/50' : s.strength >= 60 ? 'bg-yellow-500/50' : 'bg-gray-500/30')}
                  style={{ width: `${s.strength}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
