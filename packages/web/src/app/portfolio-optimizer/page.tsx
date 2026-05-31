'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/formatters';
import { Zap, PieChart, Scale } from 'lucide-react';

interface PortfolioAsset {
  symbol: string;
  name: string;
  currentWeight: number;
  optimalWeight: number;
  expectedReturn: number;
  risk: number;
}

const ASSETS: PortfolioAsset[] = [
  { symbol: 'VTI', name: 'US Stocks', currentWeight: 45, optimalWeight: 38, expectedReturn: 10.2, risk: 15.5 },
  { symbol: 'VXUS', name: 'International', currentWeight: 15, optimalWeight: 22, expectedReturn: 8.5, risk: 17.2 },
  { symbol: 'BND', name: 'US Bonds', currentWeight: 20, optimalWeight: 18, expectedReturn: 4.2, risk: 5.1 },
  { symbol: 'VNQ', name: 'REITs', currentWeight: 5, optimalWeight: 8, expectedReturn: 7.8, risk: 19.5 },
  { symbol: 'GLD', name: 'Gold', currentWeight: 5, optimalWeight: 7, expectedReturn: 5.5, risk: 14.8 },
  { symbol: 'TIPS', name: 'Inflation Protected', currentWeight: 10, optimalWeight: 7, expectedReturn: 3.8, risk: 4.2 },
];

export default function PortfolioOptimizerPage() {
  const [riskTolerance, setRiskTolerance] = useState(50);

  const currentReturn = ASSETS.reduce((s, a) => s + a.expectedReturn * (a.currentWeight / 100), 0);
  const optimalReturn = ASSETS.reduce((s, a) => s + a.expectedReturn * (a.optimalWeight / 100), 0);
  const currentRisk = ASSETS.reduce((s, a) => s + a.risk * (a.currentWeight / 100), 0);
  const optimalRisk = ASSETS.reduce((s, a) => s + a.risk * (a.optimalWeight / 100), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Optimizer</h1>
        <p className="mt-1 text-sm text-gray-500">Mean-variance optimization for efficient allocation</p>
      </div>

      <Card className="!p-4">
        <label className="text-xs text-gray-500 mb-2 block">Risk Tolerance</label>
        <input
          type="range"
          min={0}
          max={100}
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>Conservative</span>
          <span>Moderate</span>
          <span>Aggressive</span>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Current Return</p>
          <p className="text-sm font-bold text-white">{currentReturn.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Optimal Return</p>
          <p className="text-sm font-bold text-green-400">{optimalReturn.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Current Risk</p>
          <p className="text-sm font-bold text-white">{currentRisk.toFixed(1)}%</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Optimal Risk</p>
          <p className="text-sm font-bold text-yellow-400">{optimalRisk.toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Scale className="h-4 w-4 text-indigo-400" /> Allocation Comparison
          </CardTitle>
        </CardHeader>
        <div className="space-y-3 px-2 pb-3">
          {ASSETS.map((asset) => {
            const diff = asset.optimalWeight - asset.currentWeight;
            return (
              <div key={asset.symbol} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-indigo-400">{asset.symbol}</span>
                    <span className="text-xs text-gray-500">{asset.name}</span>
                  </div>
                  <span className={cn('text-xs font-mono', diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-gray-500')}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-gray-500/50 rounded-full" style={{ width: `${asset.currentWeight}%` }} />
                    <div className="absolute inset-y-0 left-0 bg-indigo-500/80 rounded-full" style={{ width: `${asset.optimalWeight}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500 w-8">{asset.optimalWeight}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="!p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-yellow-400" />
          <p className="text-sm font-medium text-white">Optimization Summary</p>
        </div>
        <p className="text-xs text-gray-400">
          The optimized portfolio increases expected return by {(optimalReturn - currentReturn).toFixed(1)}%
          while {optimalRisk < currentRisk ? `reducing risk by ${(currentRisk - optimalRisk).toFixed(1)}%` : `marginally increasing risk by ${(optimalRisk - currentRisk).toFixed(1)}%`}.
          This is achieved primarily by increasing international diversification and adding real asset exposure.
        </p>
      </Card>
    </motion.div>
  );
}
