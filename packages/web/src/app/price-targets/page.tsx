'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Target } from 'lucide-react';
import Link from 'next/link';

interface PriceTargetData {
  symbol: string;
  name: string;
  currentPrice: number;
  targetLow: number;
  targetMedian: number;
  targetHigh: number;
  numAnalysts: number;
  consensus: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';
  upside: number;
}

const TARGET_DATA: PriceTargetData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', currentPrice: 875.20, targetLow: 650, targetMedian: 1050, targetHigh: 1400, numAnalysts: 45, consensus: 'strong_buy', upside: 20.0 },
  { symbol: 'AAPL', name: 'Apple', currentPrice: 189.45, targetLow: 160, targetMedian: 210, targetHigh: 250, numAnalysts: 42, consensus: 'buy', upside: 10.8 },
  { symbol: 'MSFT', name: 'Microsoft', currentPrice: 415.60, targetLow: 380, targetMedian: 480, targetHigh: 550, numAnalysts: 40, consensus: 'strong_buy', upside: 15.5 },
  { symbol: 'TSLA', name: 'Tesla', currentPrice: 245.80, targetLow: 120, targetMedian: 275, targetHigh: 420, numAnalysts: 38, consensus: 'hold', upside: 11.9 },
  { symbol: 'AMZN', name: 'Amazon', currentPrice: 178.90, targetLow: 155, targetMedian: 215, targetHigh: 260, numAnalysts: 44, consensus: 'strong_buy', upside: 20.2 },
  { symbol: 'META', name: 'Meta', currentPrice: 485.30, targetLow: 380, targetMedian: 550, targetHigh: 650, numAnalysts: 42, consensus: 'buy', upside: 13.3 },
  { symbol: 'GOOGL', name: 'Alphabet', currentPrice: 155.80, targetLow: 140, targetMedian: 180, targetHigh: 220, numAnalysts: 40, consensus: 'buy', upside: 15.5 },
  { symbol: 'AMD', name: 'AMD', currentPrice: 172.60, targetLow: 130, targetMedian: 200, targetHigh: 260, numAnalysts: 35, consensus: 'buy', upside: 15.9 },
];

const consensusColors = {
  strong_buy: 'text-green-400',
  buy: 'text-green-300',
  hold: 'text-amber-400',
  sell: 'text-red-300',
  strong_sell: 'text-red-400',
};

export default function PriceTargetsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Analyst Price Targets</h1>
        <p className="mt-1 text-sm text-gray-500">Wall Street consensus targets and ratings</p>
      </div>

      <div className="space-y-3">
        {TARGET_DATA.map((stock) => {
          const range = stock.targetHigh - stock.targetLow;
          const currentPct = range > 0 ? ((stock.currentPrice - stock.targetLow) / range) * 100 : 50;
          const medianPct = range > 0 ? ((stock.targetMedian - stock.targetLow) / range) * 100 : 50;
          return (
            <Card key={stock.symbol} className="!p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Link href={`/stock/${stock.symbol}`} className="font-mono font-bold text-sm text-indigo-400 hover:text-indigo-300">{stock.symbol}</Link>
                  <span className="text-xs text-gray-500">{stock.name}</span>
                  <Badge variant={stock.consensus.includes('buy') ? 'success' : stock.consensus === 'hold' ? 'warning' : 'danger'}>
                    {stock.consensus.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className={cn('text-sm font-mono font-medium', stock.upside >= 0 ? 'text-green-400' : 'text-red-400')}>
                    +{stock.upside.toFixed(1)}% upside
                  </span>
                  <p className="text-[10px] text-gray-600">{stock.numAnalysts} analysts</p>
                </div>
              </div>
              {/* Target Range */}
              <div className="relative h-3 rounded-full bg-white/5 mb-1">
                {/* Current price marker */}
                <div className="absolute top-0 h-full w-0.5 bg-white rounded-full z-10" style={{ left: `${currentPct}%` }} />
                {/* Median target marker */}
                <div className="absolute top-0 h-full w-0.5 bg-indigo-400 rounded-full z-10" style={{ left: `${medianPct}%` }} />
                {/* Range fill */}
                <div className="absolute top-0 h-full bg-indigo-500/20 rounded-full" style={{ left: '0%', width: '100%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                <span>Low: {formatCurrency(stock.targetLow)}</span>
                <span className="text-indigo-400">Median: {formatCurrency(stock.targetMedian)}</span>
                <span>High: {formatCurrency(stock.targetHigh)}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
