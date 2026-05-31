'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface GrowthStock {
  symbol: string;
  name: string;
  price: number;
  revGrowth: number;
  epsGrowth: number;
  forwardPE: number;
  pegRatio: number;
  sector: string;
}

const STOCKS: GrowthStock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 878.35, revGrowth: 122.4, epsGrowth: 486.5, forwardPE: 32.5, pegRatio: 0.07, sector: 'Semiconductors' },
  { symbol: 'SMCI', name: 'Super Micro', price: 1012.50, revGrowth: 103.2, epsGrowth: 312.8, forwardPE: 45.2, pegRatio: 0.14, sector: 'Hardware' },
  { symbol: 'META', name: 'Meta Platforms', price: 484.10, revGrowth: 24.7, epsGrowth: 203.4, forwardPE: 24.8, pegRatio: 0.12, sector: 'Social Media' },
  { symbol: 'CRWD', name: 'CrowdStrike', price: 312.45, revGrowth: 35.2, epsGrowth: 185.6, forwardPE: 68.4, pegRatio: 0.37, sector: 'Cybersecurity' },
  { symbol: 'UBER', name: 'Uber Technologies', price: 78.20, revGrowth: 15.8, epsGrowth: 152.3, forwardPE: 42.8, pegRatio: 0.28, sector: 'Mobility' },
  { symbol: 'SHOP', name: 'Shopify Inc', price: 82.45, revGrowth: 23.5, epsGrowth: 142.8, forwardPE: 58.2, pegRatio: 0.41, sector: 'E-Commerce' },
  { symbol: 'DDOG', name: 'Datadog Inc', price: 128.30, revGrowth: 26.1, epsGrowth: 98.4, forwardPE: 72.5, pegRatio: 0.74, sector: 'Cloud' },
  { symbol: 'NET', name: 'Cloudflare Inc', price: 92.15, revGrowth: 32.8, epsGrowth: 88.2, forwardPE: 185.0, pegRatio: 2.10, sector: 'Cloud' },
];

export default function GrowthStocksPage() {
  const avgRevGrowth = STOCKS.reduce((s, st) => s + st.revGrowth, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Growth Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">High-growth stocks ranked by revenue and earnings growth</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Avg Rev Growth</p>
          <p className="text-lg font-bold text-green-400">{avgRevGrowth.toFixed(0)}%</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Best PEG</p>
          <p className="text-lg font-bold text-indigo-400">{Math.min(...STOCKS.map((s) => s.pegRatio)).toFixed(2)}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Screened</p>
          <p className="text-lg font-bold text-white">{STOCKS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-400" /> Growth Rankings
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((s, i) => (
            <div key={s.symbol} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-6">#{i + 1}</span>
              <div className="w-24">
                <p className="text-xs font-bold text-white">{s.symbol}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.name}</p>
              </div>
              <span className="text-xs font-mono text-green-400 w-16">+{s.revGrowth.toFixed(0)}% rev</span>
              <span className="text-xs font-mono text-green-400 w-18">+{s.epsGrowth.toFixed(0)}% eps</span>
              <span className="text-xs font-mono text-gray-400 w-14">{s.forwardPE.toFixed(1)}x</span>
              <Badge variant={s.pegRatio < 1 ? 'success' : s.pegRatio < 2 ? 'warning' : 'danger'}>
                PEG {s.pegRatio.toFixed(2)}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
