'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Activity } from 'lucide-react';

interface HoldingBeta {
  symbol: string;
  name: string;
  beta: number;
  weight: number;
  contribution: number;
  correlation: number;
  volatility: number;
}

const HOLDINGS: HoldingBeta[] = [
  { symbol: 'NVDA', name: 'NVIDIA', beta: 1.72, weight: 17.8, contribution: 0.306, correlation: 0.78, volatility: 48.2 },
  { symbol: 'AAPL', name: 'Apple', beta: 1.21, weight: 18.8, contribution: 0.227, correlation: 0.92, volatility: 22.4 },
  { symbol: 'TSLA', name: 'Tesla', beta: 2.08, weight: 5.2, contribution: 0.108, correlation: 0.52, volatility: 62.8 },
  { symbol: 'MSFT', name: 'Microsoft', beta: 0.94, weight: 12.3, contribution: 0.116, correlation: 0.95, volatility: 18.2 },
  { symbol: 'META', name: 'Meta', beta: 1.35, weight: 8.2, contribution: 0.111, correlation: 0.82, volatility: 32.5 },
  { symbol: 'JPM', name: 'JP Morgan', beta: 1.12, weight: 4.9, contribution: 0.055, correlation: 0.88, volatility: 24.1 },
  { symbol: 'BND', name: 'Vanguard Bond', beta: -0.05, weight: 9.8, contribution: -0.005, correlation: -0.18, volatility: 5.8 },
  { symbol: 'GOOGL', name: 'Alphabet', beta: 1.08, weight: 7.6, contribution: 0.082, correlation: 0.91, volatility: 25.4 },
  { symbol: 'V', name: 'Visa', beta: 0.95, weight: 6.6, contribution: 0.063, correlation: 0.85, volatility: 19.8 },
  { symbol: 'UNH', name: 'UnitedHealth', beta: 0.62, weight: 5.3, contribution: 0.033, correlation: 0.72, volatility: 21.2 },
];

export default function PortfolioBetaPage() {
  const portfolioBeta = HOLDINGS.reduce((s, h) => s + h.contribution, 0);
  const avgCorr = HOLDINGS.reduce((s, h) => s + h.correlation * h.weight, 0) / 100;
  const portfolioVol = Math.sqrt(HOLDINGS.reduce((s, h) => s + (h.weight / 100) ** 2 * h.volatility ** 2, 0));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Beta</h1>
        <p className="mt-1 text-sm text-gray-500">Systematic risk and market sensitivity analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Portfolio Beta</p><p className={cn('text-lg font-bold', portfolioBeta > 1.2 ? 'text-amber-400' : portfolioBeta < 0.8 ? 'text-blue-400' : 'text-green-400')}>{portfolioBeta.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Correlation</p><p className="text-lg font-bold text-indigo-400">{avgCorr.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Est. Volatility</p><p className="text-lg font-bold text-amber-400">{portfolioVol.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Risk Level</p><p className={cn('text-lg font-bold', portfolioBeta > 1.3 ? 'text-red-400' : portfolioBeta > 1 ? 'text-amber-400' : 'text-green-400')}>{portfolioBeta > 1.3 ? 'High' : portfolioBeta > 1 ? 'Moderate' : 'Low'}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Activity className="h-4 w-4 text-indigo-400" /> Beta Contribution</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.sort((a, b) => b.contribution - a.contribution).map((h) => (
            <div key={h.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{h.symbol}</span>
                  <span className="text-[10px] text-gray-500">{h.name}</span>
                  <Badge variant={h.beta > 1.5 ? 'danger' : h.beta > 1 ? 'warning' : h.beta < 0 ? 'info' : 'success'}>
                    {h.beta < 0 ? 'Defensive' : h.beta > 1.5 ? 'High Beta' : h.beta > 1 ? 'Growth' : 'Stable'}
                  </Badge>
                </div>
                <span className="text-xs font-mono text-white">&beta; {h.beta.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded bg-white/5">
                  <div className={cn('h-full rounded', h.contribution >= 0 ? 'bg-indigo-500' : 'bg-blue-500')} style={{ width: `${Math.abs(h.contribution / 0.32) * 100}%` }} />
                </div>
                <span className="text-[10px] font-mono text-gray-400 w-16 text-right">+{h.contribution.toFixed(3)}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-gray-400">
                <span>Weight: {h.weight}%</span>
                <span>Corr: {h.correlation.toFixed(2)}</span>
                <span>Vol: {h.volatility}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
