'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { AlertTriangle, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import Link from 'next/link';

interface WatchAlert {
  symbol: string;
  name: string;
  price: number;
  change: number;
  alerts: string[];
  priority: 'high' | 'medium' | 'low';
}

const WATCH_ALERTS: WatchAlert[] = [
  { symbol: 'TSLA', name: 'Tesla', price: 245.80, change: -2.8, alerts: ['Below 200 DMA', 'RSI oversold approaching'], priority: 'high' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 875.20, change: 3.5, alerts: ['New 52-week high', 'RSI overbought (72)'], priority: 'high' },
  { symbol: 'AAPL', name: 'Apple', price: 189.45, change: 1.2, alerts: ['Approaching resistance at $192'], priority: 'medium' },
  { symbol: 'AMD', name: 'AMD', price: 172.60, change: -1.2, alerts: ['Death cross forming (50/200 DMA)'], priority: 'high' },
  { symbol: 'META', name: 'Meta', price: 485.30, change: 1.5, alerts: ['Earnings in 3 days'], priority: 'medium' },
  { symbol: 'AMZN', name: 'Amazon', price: 178.90, change: 2.1, alerts: ['Above all major MAs', 'Volume increasing'], priority: 'low' },
  { symbol: 'COIN', name: 'Coinbase', price: 145.20, change: 5.2, alerts: ['Unusual volume (3.2x avg)', 'Gap up not filled'], priority: 'medium' },
];

export default function WatchlistAlertsPage() {
  const highPriority = WATCH_ALERTS.filter((a) => a.priority === 'high');
  const medPriority = WATCH_ALERTS.filter((a) => a.priority === 'medium');
  const lowPriority = WATCH_ALERTS.filter((a) => a.priority === 'low');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Watchlist Alerts</h1>
        <p className="mt-1 text-sm text-gray-500">Technical and price alerts for your watched stocks</p>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">High Priority</p>
          <p className="text-lg font-bold text-red-400">{highPriority.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Medium</p>
          <p className="text-lg font-bold text-amber-400">{medPriority.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Low</p>
          <p className="text-lg font-bold text-gray-400">{lowPriority.length}</p>
        </Card>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        {WATCH_ALERTS.map((alert) => (
          <Card key={alert.symbol} className={cn('!p-3', alert.priority === 'high' && 'ring-1 ring-red-500/20')}>
            <div className="flex items-start gap-3">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', alert.change >= 0 ? 'bg-green-500/10' : 'bg-red-500/10')}>
                {alert.change >= 0 ? <ArrowUpRight className="h-4 w-4 text-green-400" /> : <ArrowDownRight className="h-4 w-4 text-red-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link href={`/stock/${alert.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{alert.symbol}</Link>
                  <span className="text-xs text-gray-500">{alert.name}</span>
                  <Badge variant={alert.priority === 'high' ? 'danger' : alert.priority === 'medium' ? 'warning' : 'info'}>
                    {alert.priority}
                  </Badge>
                  <span className={cn('text-xs font-mono ml-auto', alert.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {alert.change >= 0 ? '+' : ''}{alert.change.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1.5 space-y-1">
                  {alert.alerts.map((text, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3 w-3 text-amber-400 shrink-0" />
                      <span className="text-xs text-gray-400">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-sm font-mono text-white shrink-0">{formatCurrency(alert.price)}</span>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
