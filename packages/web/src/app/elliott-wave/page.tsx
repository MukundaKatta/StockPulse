'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Waves } from 'lucide-react';

interface ElliottWaveAnalysis {
  symbol: string;
  name: string;
  currentWave: string;
  degree: 'Primary' | 'Intermediate' | 'Minor';
  price: number;
  waveTarget: number;
  invalidation: number;
  trend: 'Impulse Up' | 'Corrective' | 'Impulse Down';
}

const ANALYSES: ElliottWaveAnalysis[] = [
  { symbol: 'SPY', name: 'S&P 500 ETF', currentWave: 'Wave 3 of 5', degree: 'Primary', price: 480.50, waveTarget: 520.00, invalidation: 445.00, trend: 'Impulse Up' },
  { symbol: 'QQQ', name: 'NASDAQ 100 ETF', currentWave: 'Wave 5 of 5', degree: 'Primary', price: 420.80, waveTarget: 445.00, invalidation: 395.00, trend: 'Impulse Up' },
  { symbol: 'AAPL', name: 'Apple', currentWave: 'Wave A of ABC', degree: 'Intermediate', price: 185.20, waveTarget: 170.00, invalidation: 195.00, trend: 'Corrective' },
  { symbol: 'TSLA', name: 'Tesla', currentWave: 'Wave C of ABC', degree: 'Intermediate', price: 245.80, waveTarget: 210.00, invalidation: 268.00, trend: 'Corrective' },
  { symbol: 'NVDA', name: 'NVIDIA', currentWave: 'Wave 3 of 3', degree: 'Minor', price: 132.40, waveTarget: 155.00, invalidation: 118.00, trend: 'Impulse Up' },
  { symbol: 'AMZN', name: 'Amazon', currentWave: 'Wave 4 of 5', degree: 'Intermediate', price: 190.30, waveTarget: 175.00, invalidation: 200.00, trend: 'Corrective' },
  { symbol: 'DXY', name: 'US Dollar Index', currentWave: 'Wave 5 of C', degree: 'Primary', price: 104.20, waveTarget: 98.00, invalidation: 107.00, trend: 'Impulse Down' },
]

const trendVariant = (t: string) => t === 'Impulse Up' ? 'success' : t === 'Impulse Down' ? 'danger' : 'warning';

export default function ElliottWavePage() {
  const impulseUp = ANALYSES.filter(a => a.trend === 'Impulse Up').length;
  const corrective = ANALYSES.filter(a => a.trend === 'Corrective').length;
  const avgUpsideTarget = ANALYSES.filter(a => a.trend === 'Impulse Up').reduce((s, a) => s + ((a.waveTarget - a.price) / a.price) * 100, 0) / ANALYSES.filter(a => a.trend === 'Impulse Up').length;
  const totalAnalyses = ANALYSES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Elliott Wave Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Wave count and pattern identification</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Analyses</p><p className="text-lg font-bold text-white">{totalAnalyses}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Impulse Up</p><p className="text-lg font-bold text-green-400">{impulseUp}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Corrective</p><p className="text-lg font-bold text-amber-400">{corrective}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Upside</p><p className="text-lg font-bold text-indigo-400">{avgUpsideTarget.toFixed(1)}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Waves className="h-4 w-4 text-indigo-400" /> Wave Counts</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ANALYSES.map((a) => (
            <div key={a.symbol} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{a.symbol} <span className="text-gray-500">{a.name}</span></p>
                <p className="text-xs text-gray-500">{a.currentWave} &middot; {a.degree} &middot; Inv. {formatCurrency(a.invalidation)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(a.price)}</p>
                  <p className="text-[10px] text-gray-500">Target {formatCurrency(a.waveTarget)}</p>
                </div>
                <Badge variant={trendVariant(a.trend)}>{a.trend}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
