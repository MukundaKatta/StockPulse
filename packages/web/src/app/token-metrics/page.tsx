'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface TokenMetric {
  name: string;
  symbol: string;
  marketCap: string;
  fdv: string;
  tvl: string;
  mcapTvl: number;
  revenue30d: string;
  peRatio: number;
}

const TOKENS: TokenMetric[] = [
  { name: 'Ethereum', symbol: 'ETH', marketCap: '$280B', fdv: '$280B', tvl: '$48B', mcapTvl: 5.8, revenue30d: '$120M', peRatio: 28 },
  { name: 'Solana', symbol: 'SOL', marketCap: '$62B', fdv: '$72B', tvl: '$8.5B', mcapTvl: 7.3, revenue30d: '$45M', peRatio: 42 },
  { name: 'Uniswap', symbol: 'UNI', marketCap: '$5.8B', fdv: '$9.2B', tvl: '$4.2B', mcapTvl: 1.4, revenue30d: '$65M', peRatio: 8 },
  { name: 'Aave', symbol: 'AAVE', marketCap: '$4.1B', fdv: '$4.5B', tvl: '$12B', mcapTvl: 0.34, revenue30d: '$28M', peRatio: 12 },
  { name: 'Lido', symbol: 'LDO', marketCap: '$1.9B', fdv: '$2.1B', tvl: '$14B', mcapTvl: 0.14, revenue30d: '$8M', peRatio: 19 },
  { name: 'MakerDAO', symbol: 'MKR', marketCap: '$2.8B', fdv: '$2.8B', tvl: '$8.1B', mcapTvl: 0.35, revenue30d: '$18M', peRatio: 13 },
];

export default function TokenMetricsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Token Metrics</h1>
        <p className="mt-1 text-sm text-gray-500">Fundamental metrics for crypto tokens</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Tokens Tracked</p>
          <p className="text-lg font-bold text-white">{TOKENS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Lowest P/E</p>
          <p className="text-lg font-bold text-green-400">{Math.min(...TOKENS.map(t => t.peRatio))}x</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Best MCap/TVL</p>
          <p className="text-lg font-bold text-indigo-400">{Math.min(...TOKENS.map(t => t.mcapTvl)).toFixed(2)}x</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><BarChart3 className="inline h-4 w-4 mr-1" />Token Fundamentals</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {TOKENS.map((t) => (
            <div key={t.symbol} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{t.name} <span className="text-gray-500">{t.symbol}</span></p>
                <p className="text-xs text-gray-500">MCap {t.marketCap} &middot; FDV {t.fdv}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">P/E {t.peRatio}x</p>
                  <p className="text-[10px] text-gray-500">TVL {t.tvl}</p>
                </div>
                <Badge variant={t.mcapTvl < 1 ? 'success' : t.mcapTvl < 5 ? 'warning' : 'danger'}>{t.mcapTvl}x</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
