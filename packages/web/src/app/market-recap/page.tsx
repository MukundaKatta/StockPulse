'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Newspaper, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const INDEX_DATA = [
  { name: 'S&P 500', value: 4783.83, change: 0.56, points: 26.64 },
  { name: 'Dow Jones', value: 37468.61, change: 0.31, points: 115.80 },
  { name: 'Nasdaq', value: 15055.65, change: 0.74, points: 110.50 },
  { name: 'Russell 2000', value: 2012.75, change: -0.42, points: -8.50 },
];

const SECTOR_MOVES = [
  { name: 'Technology', change: 1.2 },
  { name: 'Healthcare', change: 0.8 },
  { name: 'Consumer Disc.', change: 0.5 },
  { name: 'Financials', change: 0.3 },
  { name: 'Industrials', change: 0.1 },
  { name: 'Communication', change: -0.1 },
  { name: 'Materials', change: -0.3 },
  { name: 'Real Estate', change: -0.5 },
  { name: 'Utilities', change: -0.7 },
  { name: 'Energy', change: -1.1 },
];

const HEADLINES = [
  { title: 'Fed Minutes Signal Patience on Rate Cuts, Market Holds Steady', time: '4:30 PM', sentiment: 'neutral' as const },
  { title: 'NVDA Surges 4% on Data Center Revenue Beat Expectations', time: '3:45 PM', sentiment: 'bullish' as const },
  { title: 'Treasury Yields Dip Below 4.1% as Inflation Data Cools', time: '2:15 PM', sentiment: 'bullish' as const },
  { title: 'Small Caps Underperform as Regional Banks Face Headwinds', time: '1:30 PM', sentiment: 'bearish' as const },
  { title: 'AI Spending Boom Lifts Cloud Infrastructure Stocks', time: '11:00 AM', sentiment: 'bullish' as const },
];

export default function MarketRecapPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Recap</h1>
        <p className="mt-1 text-sm text-gray-500">End-of-day market summary</p>
      </div>

      {/* Indices */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {INDEX_DATA.map((idx) => (
          <Card key={idx.name} className="!p-3">
            <p className="text-[10px] text-gray-500 truncate">{idx.name}</p>
            <p className="text-sm font-bold text-white font-mono">{idx.value.toLocaleString()}</p>
            <p className={cn('text-xs font-mono', idx.change >= 0 ? 'text-green-400' : 'text-red-400')}>
              {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)}%
            </p>
          </Card>
        ))}
      </div>

      {/* Sector Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-indigo-400" /> Sector Performance
          </CardTitle>
        </CardHeader>
        <div className="space-y-1.5 px-2 pb-2">
          {SECTOR_MOVES.map((sector) => (
            <div key={sector.name} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-28 truncate">{sector.name}</span>
              <div className="flex-1 h-4 relative">
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
                {sector.change >= 0 ? (
                  <div
                    className="absolute inset-y-0 left-1/2 bg-green-500/40 rounded-r"
                    style={{ width: `${Math.abs(sector.change) * 20}%` }}
                  />
                ) : (
                  <div
                    className="absolute inset-y-0 right-1/2 bg-red-500/40 rounded-l"
                    style={{ width: `${Math.abs(sector.change) * 20}%` }}
                  />
                )}
              </div>
              <span className={cn('text-xs font-mono w-12 text-right', sector.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Headlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Newspaper className="h-4 w-4 text-indigo-400" /> Key Headlines
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {HEADLINES.map((headline, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 px-2">
              <Badge variant={headline.sentiment === 'bullish' ? 'success' : headline.sentiment === 'bearish' ? 'danger' : 'info'} className="text-[9px] mt-0.5 shrink-0">
                {headline.sentiment}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200">{headline.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{headline.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
