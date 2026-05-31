'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Eye, TrendingUp } from 'lucide-react';

interface WatchlistStock {
  symbol: string;
  name: string;
  addedDate: string;
  priceAdded: number;
  currentPrice: number;
  change: number;
}

const WATCHLISTS: { name: string; stocks: WatchlistStock[] }[] = [
  {
    name: 'AI Plays',
    stocks: [
      { symbol: 'NVDA', name: 'NVIDIA', addedDate: '2023-09-15', priceAdded: 435.20, currentPrice: 547.10, change: 25.7 },
      { symbol: 'AMD', name: 'AMD', addedDate: '2023-10-01', priceAdded: 102.50, currentPrice: 141.80, change: 38.3 },
      { symbol: 'SMCI', name: 'Super Micro', addedDate: '2023-11-10', priceAdded: 252.80, currentPrice: 284.50, change: 12.5 },
      { symbol: 'PLTR', name: 'Palantir', addedDate: '2023-12-01', priceAdded: 18.20, currentPrice: 18.90, change: 3.8 },
    ],
  },
  {
    name: 'Dividend Aristocrats',
    stocks: [
      { symbol: 'JNJ', name: 'Johnson & Johnson', addedDate: '2023-08-01', priceAdded: 165.80, currentPrice: 158.50, change: -4.4 },
      { symbol: 'PG', name: 'Procter & Gamble', addedDate: '2023-08-01', priceAdded: 155.20, currentPrice: 155.80, change: 0.4 },
      { symbol: 'KO', name: 'Coca-Cola', addedDate: '2023-08-01', priceAdded: 59.80, currentPrice: 58.50, change: -2.2 },
      { symbol: 'O', name: 'Realty Income', addedDate: '2023-08-01', priceAdded: 58.50, currentPrice: 56.80, change: -2.9 },
    ],
  },
  {
    name: 'Recovery Bets',
    stocks: [
      { symbol: 'BABA', name: 'Alibaba', addedDate: '2023-11-15', priceAdded: 78.50, currentPrice: 72.80, change: -7.3 },
      { symbol: 'NIO', name: 'NIO', addedDate: '2023-12-10', priceAdded: 7.20, currentPrice: 7.85, change: 9.0 },
      { symbol: 'PYPL', name: 'PayPal', addedDate: '2023-10-20', priceAdded: 55.80, currentPrice: 62.50, change: 12.0 },
    ],
  },
];

export default function WatchPerformancePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Watchlist Performance</h1>
        <p className="mt-1 text-sm text-gray-500">Track performance since you added stocks</p>
      </div>

      {WATCHLISTS.map((wl) => {
        const avgChange = wl.stocks.reduce((s, st) => s + st.change, 0) / wl.stocks.length;
        return (
          <Card key={wl.name}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm"><Eye className="h-4 w-4 text-indigo-400" /> {wl.name}</CardTitle>
              <span className={cn('text-xs font-mono', avgChange >= 0 ? 'text-green-400' : 'text-red-400')}>Avg: {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(1)}%</span>
            </CardHeader>
            <div className="divide-y divide-white/5">
              {wl.stocks.map((stock) => (
                <div key={stock.symbol} className="flex items-center gap-3 py-2 px-2">
                  <span className="text-sm font-medium text-indigo-400 w-12">{stock.symbol}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 truncate">{stock.name}</p>
                    <p className="text-[10px] text-gray-600">Added {stock.addedDate} @ ${stock.priceAdded.toFixed(2)}</p>
                  </div>
                  <span className="text-sm font-mono text-white">${stock.currentPrice.toFixed(2)}</span>
                  <span className={cn('text-xs font-mono w-16 text-right', stock.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </motion.div>
  );
}
