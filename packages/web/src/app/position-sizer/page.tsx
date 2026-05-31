'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator, AlertTriangle, Target, Shield } from 'lucide-react';

export default function PositionSizerPage() {
  const [accountSize, setAccountSize] = useState('100000');
  const [riskPercent, setRiskPercent] = useState('2');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  const calculation = useMemo(() => {
    const account = parseFloat(accountSize) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const stop = parseFloat(stopPrice) || 0;
    const target = parseFloat(targetPrice) || 0;

    if (!account || !risk || !entry || !stop) return null;

    const riskAmount = account * (risk / 100);
    const riskPerShare = Math.abs(entry - stop);
    if (riskPerShare === 0) return null;

    const shares = Math.floor(riskAmount / riskPerShare);
    const positionSize = shares * entry;
    const positionPercent = (positionSize / account) * 100;
    const maxLoss = shares * riskPerShare;
    const reward = target ? Math.abs(target - entry) * shares : 0;
    const riskRewardRatio = target && riskPerShare > 0 ? Math.abs(target - entry) / riskPerShare : 0;

    return {
      shares,
      positionSize,
      positionPercent,
      maxLoss,
      riskAmount,
      reward,
      riskRewardRatio,
    };
  }, [accountSize, riskPercent, entryPrice, stopPrice, targetPrice]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Position Size Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Calculate optimal position size based on your risk tolerance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-indigo-400" />
            Parameters
          </CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Account Size ($)"
            type="number"
            value={accountSize}
            onChange={(e) => setAccountSize(e.target.value)}
            placeholder="100000"
          />
          <Input
            label="Risk Per Trade (%)"
            type="number"
            step="0.1"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            placeholder="2"
          />
          <Input
            label="Entry Price ($)"
            type="number"
            step="0.01"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            placeholder="150.00"
          />
          <Input
            label="Stop Loss Price ($)"
            type="number"
            step="0.01"
            value={stopPrice}
            onChange={(e) => setStopPrice(e.target.value)}
            placeholder="145.00"
          />
          <Input
            label="Target Price ($) (optional)"
            type="number"
            step="0.01"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="165.00"
          />
        </div>
      </Card>

      {/* Results */}
      {calculation && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Position</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Target className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-xs text-indigo-400 font-medium">Shares</span>
              </div>
              <p className="text-xl font-bold text-white">{calculation.shares}</p>
            </div>
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
              <p className="text-[10px] text-gray-500 uppercase">Position Size</p>
              <p className="text-lg font-bold font-mono text-white">{formatCurrency(calculation.positionSize)}</p>
              <p className="text-[10px] text-gray-600">{calculation.positionPercent.toFixed(1)}% of account</p>
            </div>
            <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                <span className="text-xs text-red-400 font-medium">Max Loss</span>
              </div>
              <p className="text-lg font-bold font-mono text-red-400">{formatCurrency(calculation.maxLoss)}</p>
            </div>
            {calculation.riskRewardRatio > 0 && (
              <>
                <div className="rounded-lg bg-green-500/5 border border-green-500/10 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Shield className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Potential Reward</span>
                  </div>
                  <p className="text-lg font-bold font-mono text-green-400">{formatCurrency(calculation.reward)}</p>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
                  <p className="text-[10px] text-gray-500 uppercase">Risk:Reward</p>
                  <p className={cn(
                    'text-lg font-bold font-mono',
                    calculation.riskRewardRatio >= 2 ? 'text-green-400' : calculation.riskRewardRatio >= 1 ? 'text-amber-400' : 'text-red-400'
                  )}>
                    1:{calculation.riskRewardRatio.toFixed(1)}
                  </p>
                  <p className="text-[10px] text-gray-600">
                    {calculation.riskRewardRatio >= 2 ? 'Good' : calculation.riskRewardRatio >= 1 ? 'Fair' : 'Poor'}
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {!calculation && entryPrice && stopPrice && (
        <Card>
          <div className="py-8 text-center text-sm text-gray-500">
            Enter valid entry and stop loss prices to calculate position size
          </div>
        </Card>
      )}
    </motion.div>
  );
}
