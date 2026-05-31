'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Star, TrendingUp } from 'lucide-react';

interface AnalystRating {
  symbol: string;
  name: string;
  price: number;
  consensus: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  targetHigh: number;
  targetLow: number;
  targetMean: number;
  analysts: number;
  buy: number;
  hold: number;
  sell: number;
}

const RATINGS: AnalystRating[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 547.10, consensus: 'Strong Buy', targetHigh: 700, targetLow: 410, targetMean: 620, analysts: 42, buy: 38, hold: 3, sell: 1 },
  { symbol: 'AAPL', name: 'Apple', price: 185.92, consensus: 'Buy', targetHigh: 225, targetLow: 155, targetMean: 198, analysts: 38, buy: 28, hold: 8, sell: 2 },
  { symbol: 'MSFT', name: 'Microsoft', price: 388.47, consensus: 'Strong Buy', targetHigh: 450, targetLow: 350, targetMean: 415, analysts: 35, buy: 32, hold: 3, sell: 0 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, consensus: 'Buy', targetHigh: 175, targetLow: 120, targetMean: 158, analysts: 40, buy: 35, hold: 4, sell: 1 },
  { symbol: 'AMZN', name: 'Amazon', price: 155.20, consensus: 'Strong Buy', targetHigh: 195, targetLow: 130, targetMean: 178, analysts: 45, buy: 42, hold: 2, sell: 1 },
  { symbol: 'META', name: 'Meta', price: 370.45, consensus: 'Buy', targetHigh: 450, targetLow: 280, targetMean: 395, analysts: 38, buy: 32, hold: 5, sell: 1 },
  { symbol: 'TSLA', name: 'Tesla', price: 248.50, consensus: 'Hold', targetHigh: 380, targetLow: 85, targetMean: 230, analysts: 42, buy: 15, hold: 18, sell: 9 },
  { symbol: 'JPM', name: 'JPMorgan', price: 172.30, consensus: 'Buy', targetHigh: 205, targetLow: 155, targetMean: 185, analysts: 22, buy: 16, hold: 5, sell: 1 },
];

const consensusColors = { 'Strong Buy': 'success', 'Buy': 'success', 'Hold': 'warning', 'Sell': 'danger', 'Strong Sell': 'danger' } as const;

export default function AnalystRatingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Analyst Ratings</h1>
        <p className="mt-1 text-sm text-gray-500">Wall Street consensus and price targets</p>
      </div>

      {RATINGS.map((stock) => {
        const upside = ((stock.targetMean - stock.price) / stock.price) * 100;
        const total = stock.buy + stock.hold + stock.sell;
        return (
          <Card key={stock.symbol}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-indigo-400">{stock.symbol}</span>
                  <span className="text-xs text-gray-500">{stock.name}</span>
                  <Badge variant={consensusColors[stock.consensus]} className="text-[9px]">{stock.consensus}</Badge>
                </div>
                <p className="text-lg font-mono text-white mt-1">${stock.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">Mean Target</p>
                <p className="text-sm font-mono text-white">${stock.targetMean}</p>
                <p className={cn('text-xs font-mono', upside >= 0 ? 'text-green-400' : 'text-red-400')}>{upside >= 0 ? '+' : ''}{upside.toFixed(1)}% upside</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 w-8">Buy</span>
                <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-green-500/60 rounded-full" style={{ width: `${(stock.buy / total) * 100}%` }} /></div>
                <span className="text-[10px] text-gray-400 w-6 text-right">{stock.buy}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 w-8">Hold</span>
                <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-yellow-500/60 rounded-full" style={{ width: `${(stock.hold / total) * 100}%` }} /></div>
                <span className="text-[10px] text-gray-400 w-6 text-right">{stock.hold}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 w-8">Sell</span>
                <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-red-500/60 rounded-full" style={{ width: `${(stock.sell / total) * 100}%` }} /></div>
                <span className="text-[10px] text-gray-400 w-6 text-right">{stock.sell}</span>
              </div>
            </div>
            <div className="mt-3 relative h-3">
              <div className="absolute inset-x-0 top-1 h-1 bg-white/5 rounded-full" />
              <div className="absolute top-0 h-3 w-px bg-gray-500" style={{ left: `${((stock.price - stock.targetLow) / (stock.targetHigh - stock.targetLow)) * 100}%` }} title="Current" />
              <div className="absolute top-0 h-3 w-0.5 bg-green-400 rounded" style={{ left: `${((stock.targetMean - stock.targetLow) / (stock.targetHigh - stock.targetLow)) * 100}%` }} title="Target" />
            </div>
            <div className="flex justify-between text-[9px] text-gray-600 mt-1">
              <span>${stock.targetLow}</span>
              <span>{stock.analysts} analysts</span>
              <span>${stock.targetHigh}</span>
            </div>
          </Card>
        );
      })}
    </motion.div>
  );
}
