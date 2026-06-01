'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Users } from 'lucide-react';

interface ConsensusEstimate {
  ticker: string;
  company: string;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  targetPrice: number;
  currentPrice: number;
  analysts: number;
  epsEstimate: number;
  revenueEstimate: string;
}

const CONSENSUS: ConsensusEstimate[] = [
  { ticker: 'AAPL', company: 'Apple Inc', rating: 'Buy', targetPrice: 210, currentPrice: 185, analysts: 42, epsEstimate: 6.65, revenueEstimate: '$410B' },
  { ticker: 'MSFT', company: 'Microsoft', rating: 'Strong Buy', targetPrice: 480, currentPrice: 415, analysts: 48, epsEstimate: 13.20, revenueEstimate: '$270B' },
  { ticker: 'NVDA', company: 'NVIDIA', rating: 'Strong Buy', targetPrice: 160, currentPrice: 132, analysts: 52, epsEstimate: 2.85, revenueEstimate: '$120B' },
  { ticker: 'TSLA', company: 'Tesla', rating: 'Hold', targetPrice: 220, currentPrice: 245, analysts: 38, epsEstimate: 3.10, revenueEstimate: '$112B' },
  { ticker: 'AMZN', company: 'Amazon', rating: 'Strong Buy', targetPrice: 225, currentPrice: 190, analysts: 55, epsEstimate: 5.20, revenueEstimate: '$680B' },
  { ticker: 'GOOGL', company: 'Alphabet', rating: 'Buy', targetPrice: 185, currentPrice: 155, analysts: 45, epsEstimate: 7.80, revenueEstimate: '$380B' },
];

const ratingVariant = (r: string) => r.includes('Buy') ? 'success' : r === 'Hold' ? 'warning' : 'danger';

export default function AnalystConsensusPage() {
  const avgUpside = CONSENSUS.reduce((s, c) => s + ((c.targetPrice - c.currentPrice) / c.currentPrice) * 100, 0) / CONSENSUS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Analyst Consensus</h1>
        <p className="mt-1 text-sm text-gray-500">Consensus estimates and price targets</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Stocks</p>
          <p className="text-lg font-bold text-white">{CONSENSUS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Upside</p>
          <p className={cn('text-lg font-bold', avgUpside >= 0 ? 'text-green-400' : 'text-red-400')}>
            {avgUpside > 0 ? '+' : ''}{avgUpside.toFixed(1)}%
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Strong Buys</p>
          <p className="text-lg font-bold text-green-400">{CONSENSUS.filter(c => c.rating === 'Strong Buy').length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Users className="inline h-4 w-4 mr-1" />Consensus Estimates</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {CONSENSUS.map((c) => {
            const upside = ((c.targetPrice - c.currentPrice) / c.currentPrice) * 100;
            return (
              <div key={c.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-white">{c.ticker} <span className="text-gray-500">{c.company}</span></p>
                  <p className="text-xs text-gray-500">{c.analysts} analysts &middot; EPS ${c.epsEstimate} &middot; Rev {c.revenueEstimate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-mono text-white">PT ${c.targetPrice}</p>
                    <p className={cn('text-[10px] font-mono', upside >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {upside > 0 ? '+' : ''}{upside.toFixed(1)}%
                    </p>
                  </div>
                  <Badge variant={ratingVariant(c.rating)}>{c.rating}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
