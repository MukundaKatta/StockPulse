'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Microscope } from 'lucide-react';

interface MicrostructureMetric {
  symbol: string;
  bidAskSpread: number;
  depth: string;
  orderImbalance: number;
  toxicity: number;
  venue: string;
  latency: number;
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

const METRICS: MicrostructureMetric[] = [
  { symbol: 'AAPL', bidAskSpread: 0.01, depth: '$4.2M', orderImbalance: 12.5, toxicity: 0.18, venue: 'NYSE', latency: 0.8, quality: 'Excellent' },
  { symbol: 'MSFT', bidAskSpread: 0.01, depth: '$3.8M', orderImbalance: -5.2, toxicity: 0.15, venue: 'NASDAQ', latency: 0.6, quality: 'Excellent' },
  { symbol: 'TSLA', bidAskSpread: 0.02, depth: '$2.1M', orderImbalance: 28.4, toxicity: 0.42, venue: 'NASDAQ', latency: 1.2, quality: 'Fair' },
  { symbol: 'NVDA', bidAskSpread: 0.01, depth: '$3.5M', orderImbalance: 18.8, toxicity: 0.25, venue: 'NASDAQ', latency: 0.7, quality: 'Good' },
  { symbol: 'AMD', bidAskSpread: 0.01, depth: '$1.8M', orderImbalance: -15.2, toxicity: 0.32, venue: 'NASDAQ', latency: 0.9, quality: 'Good' },
  { symbol: 'GME', bidAskSpread: 0.05, depth: '$0.5M', orderImbalance: 45.2, toxicity: 0.68, venue: 'NYSE', latency: 2.5, quality: 'Poor' },
  { symbol: 'SPY', bidAskSpread: 0.01, depth: '$12.5M', orderImbalance: 2.1, toxicity: 0.08, venue: 'ARCA', latency: 0.3, quality: 'Excellent' },
];

const qualityVariant = (q: string) => q === 'Excellent' ? 'success' : q === 'Good' ? 'info' : q === 'Fair' ? 'warning' : 'danger';

export default function MarketMicrostructurePage() {
  const avgSpread = METRICS.reduce((s, m) => s + m.bidAskSpread, 0) / METRICS.length;
  const avgToxicity = METRICS.reduce((s, m) => s + m.toxicity, 0) / METRICS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market Microstructure</h1>
        <p className="mt-1 text-sm text-gray-500">Order flow, spreads, and market quality analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Securities</p><p className="text-lg font-bold text-white">{METRICS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Spread</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(avgSpread)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Toxicity</p><p className="text-lg font-bold text-yellow-400">{avgToxicity.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Excellent</p><p className="text-lg font-bold text-green-400">{METRICS.filter(m => m.quality === 'Excellent').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Microscope className="h-4 w-4 text-indigo-400" /> Microstructure Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {METRICS.map((m) => (
            <div key={m.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-16">
                <p className="text-xs font-bold text-white">{m.symbol}</p>
                <p className="text-[10px] text-gray-500">{m.venue}</p>
              </div>
              <span className="text-xs font-mono text-white w-14">Spr {formatCurrency(m.bidAskSpread)}</span>
              <span className="text-[10px] text-gray-400 w-14">Dep {m.depth}</span>
              <span className={cn('text-xs font-mono w-12', m.orderImbalance >= 0 ? 'text-green-400' : 'text-red-400')}>{m.orderImbalance >= 0 ? '+' : ''}{m.orderImbalance}%</span>
              <span className={cn('text-[10px] w-10', m.toxicity > 0.4 ? 'text-red-400' : 'text-gray-400')}>Tox {m.toxicity}</span>
              <span className="text-[10px] text-gray-500 w-10">{m.latency}ms</span>
              <Badge variant={qualityVariant(m.quality)} className="ml-auto">{m.quality}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
