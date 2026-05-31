'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Users, Star, TrendingUp } from 'lucide-react';

interface Trader {
  name: string;
  handle: string;
  return30d: number;
  returnYTD: number;
  winRate: number;
  followers: number;
  copiers: number;
  riskScore: number;
  style: string;
  recentTrades: { symbol: string; side: 'long' | 'short'; pnl: number }[];
}

const TRADERS: Trader[] = [
  { name: 'Alex Chen', handle: '@quant_alpha', return30d: 12.5, returnYTD: 85.2, winRate: 72, followers: 15420, copiers: 1250, riskScore: 6, style: 'Momentum', recentTrades: [{ symbol: 'NVDA', side: 'long', pnl: 4200 }, { symbol: 'TSLA', side: 'short', pnl: 1800 }] },
  { name: 'Sarah Kim', handle: '@value_hunter', return30d: 5.8, returnYTD: 42.1, winRate: 68, followers: 8950, copiers: 890, riskScore: 4, style: 'Value', recentTrades: [{ symbol: 'META', side: 'long', pnl: 3500 }, { symbol: 'AMZN', side: 'long', pnl: 2100 }] },
  { name: 'Mike Patel', handle: '@swing_master', return30d: 8.2, returnYTD: 55.8, winRate: 65, followers: 12100, copiers: 1100, riskScore: 7, style: 'Swing', recentTrades: [{ symbol: 'AMD', side: 'long', pnl: 2800 }, { symbol: 'SPY', side: 'short', pnl: -950 }] },
  { name: 'Lisa Wang', handle: '@dividend_queen', return30d: 2.1, returnYTD: 18.5, winRate: 82, followers: 22800, copiers: 3200, riskScore: 2, style: 'Income', recentTrades: [{ symbol: 'O', side: 'long', pnl: 450 }, { symbol: 'SCHD', side: 'long', pnl: 680 }] },
  { name: 'James Brooks', handle: '@options_shark', return30d: 22.4, returnYTD: 142.5, winRate: 58, followers: 6500, copiers: 420, riskScore: 9, style: 'Options', recentTrades: [{ symbol: 'AAPL', side: 'long', pnl: 8500 }, { symbol: 'GOOGL', side: 'long', pnl: -2200 }] },
];

export default function SocialTradingPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Social Trading</h1>
        <p className="mt-1 text-sm text-gray-500">Top traders and copy trading leaderboard</p>
      </div>

      {TRADERS.map((trader) => (
        <Card key={trader.handle} hover>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-sm font-bold text-indigo-400">{trader.name.split(' ').map((w) => w[0]).join('')}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{trader.name}</span>
                <span className="text-xs text-gray-500">{trader.handle}</span>
                <Badge variant="info" className="text-[9px]">{trader.style}</Badge>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div><p className="text-[10px] text-gray-500">30D Return</p><p className={cn('text-sm font-mono font-medium', trader.return30d >= 0 ? 'text-green-400' : 'text-red-400')}>{trader.return30d >= 0 ? '+' : ''}{trader.return30d}%</p></div>
                <div><p className="text-[10px] text-gray-500">YTD</p><p className={cn('text-sm font-mono font-medium', trader.returnYTD >= 0 ? 'text-green-400' : 'text-red-400')}>{trader.returnYTD >= 0 ? '+' : ''}{trader.returnYTD}%</p></div>
                <div><p className="text-[10px] text-gray-500">Win Rate</p><p className="text-sm font-mono text-white">{trader.winRate}%</p></div>
                <div><p className="text-[10px] text-gray-500">Risk</p><p className={cn('text-sm font-mono', trader.riskScore <= 3 ? 'text-green-400' : trader.riskScore <= 6 ? 'text-yellow-400' : 'text-red-400')}>{trader.riskScore}/10</p></div>
              </div>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                <span>{trader.followers.toLocaleString()} followers</span>
                <span>{trader.copiers.toLocaleString()} copiers</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 ml-13">
            {trader.recentTrades.map((t, i) => (
              <span key={i} className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded', t.pnl >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>
                {t.symbol} {t.side === 'short' ? 'S' : 'L'} {t.pnl >= 0 ? '+' : ''}{formatCurrency(t.pnl)}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
