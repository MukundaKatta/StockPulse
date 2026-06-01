'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Droplets } from 'lucide-react';

interface LiquidityData {
  symbol: string;
  name: string;
  avgVolume: string;
  bidAskSpread: number;
  depth10bps: string;
  turnover: number;
  impactCost: number;
  liquidityScore: number;
}

const STOCKS: LiquidityData[] = [
  { symbol: 'AAPL', name: 'Apple', avgVolume: '54.2M', bidAskSpread: 0.01, depth10bps: '$480M', turnover: 0.35, impactCost: 0.02, liquidityScore: 99 },
  { symbol: 'MSFT', name: 'Microsoft', avgVolume: '22.8M', bidAskSpread: 0.01, depth10bps: '$320M', turnover: 0.15, impactCost: 0.03, liquidityScore: 97 },
  { symbol: 'TSLA', name: 'Tesla', avgVolume: '98.4M', bidAskSpread: 0.02, depth10bps: '$210M', turnover: 3.08, impactCost: 0.05, liquidityScore: 95 },
  { symbol: 'NVDA', name: 'NVIDIA', avgVolume: '42.1M', bidAskSpread: 0.03, depth10bps: '$290M', turnover: 1.70, impactCost: 0.04, liquidityScore: 96 },
  { symbol: 'AMD', name: 'AMD', avgVolume: '54.2M', bidAskSpread: 0.02, depth10bps: '$185M', turnover: 1.94, impactCost: 0.05, liquidityScore: 93 },
  { symbol: 'META', name: 'Meta', avgVolume: '18.5M', bidAskSpread: 0.05, depth10bps: '$220M', turnover: 0.74, impactCost: 0.06, liquidityScore: 92 },
  { symbol: 'RIVN', name: 'Rivian', avgVolume: '28.6M', bidAskSpread: 0.02, depth10bps: '$42M', turnover: 2.92, impactCost: 0.12, liquidityScore: 72 },
  { symbol: 'CVNA', name: 'Carvana', avgVolume: '6.4M', bidAskSpread: 0.08, depth10bps: '$18M', turnover: 3.24, impactCost: 0.25, liquidityScore: 48 },
];

function scoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Poor';
}

export default function LiquidityAnalysisPage() {
  const avgScore = STOCKS.reduce((s, st) => s + st.liquidityScore, 0) / STOCKS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Liquidity Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Market depth, spreads, and execution quality metrics</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Liquidity</p><p className="text-lg font-bold text-indigo-400">{avgScore.toFixed(0)}/100</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Highly Liquid</p><p className="text-lg font-bold text-green-400">{STOCKS.filter((s) => s.liquidityScore >= 90).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Low Liquidity</p><p className="text-lg font-bold text-red-400">{STOCKS.filter((s) => s.liquidityScore < 60).length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Droplets className="h-4 w-4 text-indigo-400" /> Liquidity Metrics</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => b.liquidityScore - a.liquidityScore).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={s.liquidityScore >= 90 ? 'success' : s.liquidityScore >= 70 ? 'warning' : 'danger'}>{scoreLabel(s.liquidityScore)}</Badge>
                </div>
                <span className={cn('text-xs font-bold font-mono', s.liquidityScore >= 90 ? 'text-green-400' : s.liquidityScore >= 70 ? 'text-yellow-400' : 'text-red-400')}>{s.liquidityScore}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                <span className="text-gray-400">Avg Vol: <span className="font-mono text-white">{s.avgVolume}</span></span>
                <span className="text-gray-400">Spread: <span className="font-mono text-white">${s.bidAskSpread.toFixed(2)}</span></span>
                <span className="text-gray-400">Depth: <span className="font-mono text-white">{s.depth10bps}</span></span>
                <span className="text-gray-400">Turnover: <span className="font-mono text-white">{s.turnover.toFixed(2)}%</span></span>
                <span className="text-gray-400">Impact: <span className={cn('font-mono', s.impactCost <= 0.05 ? 'text-green-400' : s.impactCost <= 0.15 ? 'text-yellow-400' : 'text-red-400')}>{(s.impactCost * 100).toFixed(0)}bps</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
