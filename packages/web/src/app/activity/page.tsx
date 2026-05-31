'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Bell, Settings } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'buy' | 'sell' | 'dividend' | 'alert' | 'settings';
  title: string;
  description: string;
  time: string;
  amount?: number;
  symbol?: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: '1', type: 'buy', title: 'Bought NVDA', description: '10 shares @ $875.20', time: '10 min ago', amount: 8752, symbol: 'NVDA' },
  { id: '2', type: 'sell', title: 'Sold TSLA', description: '25 shares @ $245.80', time: '1 hour ago', amount: 6145, symbol: 'TSLA' },
  { id: '3', type: 'alert', title: 'Alert Created', description: 'AAPL price above $195', time: '2 hours ago', symbol: 'AAPL' },
  { id: '4', type: 'dividend', title: 'Dividend Received', description: 'MSFT quarterly dividend', time: '1 day ago', amount: 42.50, symbol: 'MSFT' },
  { id: '5', type: 'buy', title: 'Bought SPY', description: '5 shares @ $502.15', time: '1 day ago', amount: 2510.75, symbol: 'SPY' },
  { id: '6', type: 'settings', title: 'Watchlist Updated', description: 'Added AMD, GOOGL to Tech Watchlist', time: '2 days ago' },
  { id: '7', type: 'sell', title: 'Sold AMD', description: '15 shares @ $172.60', time: '2 days ago', amount: 2589, symbol: 'AMD' },
  { id: '8', type: 'dividend', title: 'Dividend Received', description: 'VZ quarterly dividend', time: '3 days ago', amount: 67.50, symbol: 'VZ' },
  { id: '9', type: 'buy', title: 'Bought AMZN', description: '20 shares @ $178.90', time: '4 days ago', amount: 3578, symbol: 'AMZN' },
  { id: '10', type: 'alert', title: 'Alert Triggered', description: 'GOOGL crossed 200 DMA', time: '5 days ago', symbol: 'GOOGL' },
];

const typeConfig = {
  buy: { icon: ArrowUpRight, color: 'text-green-400 bg-green-400/10' },
  sell: { icon: ArrowDownRight, color: 'text-red-400 bg-red-400/10' },
  dividend: { icon: RefreshCw, color: 'text-indigo-400 bg-indigo-400/10' },
  alert: { icon: Bell, color: 'text-amber-400 bg-amber-400/10' },
  settings: { icon: Settings, color: 'text-gray-400 bg-gray-400/10' },
};

export default function ActivityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Activity Log</h1>
        <p className="mt-1 text-sm text-gray-500">Recent account activity and trade history</p>
      </div>

      <div className="space-y-1">
        {ACTIVITIES.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <Card key={item.id} className="!p-3">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', config.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    {item.symbol && <span className="text-[10px] font-mono text-indigo-400">{item.symbol}</span>}
                  </div>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <div className="text-right shrink-0">
                  {item.amount && (
                    <p className={cn('text-sm font-mono font-medium', item.type === 'sell' ? 'text-green-400' : item.type === 'buy' ? 'text-red-400' : 'text-indigo-400')}>
                      {item.type === 'sell' ? '+' : item.type === 'buy' ? '-' : '+'}{formatCurrency(item.amount)}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-600">{item.time}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
