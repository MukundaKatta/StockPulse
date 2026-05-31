'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

export default function RiskRewardPage() {
  const [entryPrice, setEntryPrice] = useState('185.00');
  const [stopLoss, setStopLoss] = useState('178.00');
  const [target1, setTarget1] = useState('195.00');
  const [target2, setTarget2] = useState('205.00');
  const [target3, setTarget3] = useState('220.00');
  const [shares, setShares] = useState('100');

  const result = useMemo(() => {
    const entry = parseFloat(entryPrice) || 0;
    const stop = parseFloat(stopLoss) || 0;
    const t1 = parseFloat(target1) || 0;
    const t2 = parseFloat(target2) || 0;
    const t3 = parseFloat(target3) || 0;
    const qty = parseInt(shares) || 0;

    if (!entry || !stop || !t1) return null;

    const risk = Math.abs(entry - stop);
    const reward1 = Math.abs(t1 - entry);
    const reward2 = t2 ? Math.abs(t2 - entry) : 0;
    const reward3 = t3 ? Math.abs(t3 - entry) : 0;

    const rr1 = reward1 / risk;
    const rr2 = reward2 ? reward2 / risk : 0;
    const rr3 = reward3 ? reward3 / risk : 0;

    const riskDollar = risk * qty;
    const reward1Dollar = reward1 * qty;

    return {
      risk, reward1, reward2, reward3,
      rr1, rr2, rr3,
      riskDollar, reward1Dollar,
      riskPercent: (risk / entry) * 100,
      reward1Percent: (reward1 / entry) * 100,
    };
  }, [entryPrice, stopLoss, target1, target2, target3, shares]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Risk/Reward Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Plan entries with multiple profit targets</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-400" />
            Trade Setup
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Input label="Entry Price ($)" type="number" step="0.01" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
          <Input label="Stop Loss ($)" type="number" step="0.01" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
          <Input label="Shares" type="number" value={shares} onChange={(e) => setShares(e.target.value)} />
          <Input label="Target 1 ($)" type="number" step="0.01" value={target1} onChange={(e) => setTarget1(e.target.value)} />
          <Input label="Target 2 ($)" type="number" step="0.01" value={target2} onChange={(e) => setTarget2(e.target.value)} />
          <Input label="Target 3 ($)" type="number" step="0.01" value={target3} onChange={(e) => setTarget3(e.target.value)} />
        </div>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Risk</p>
              <p className="text-sm font-bold text-red-400">{formatCurrency(result.riskDollar)}</p>
              <p className="text-[10px] text-gray-600">{result.riskPercent.toFixed(1)}%</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Reward (T1)</p>
              <p className="text-sm font-bold text-green-400">{formatCurrency(result.reward1Dollar)}</p>
              <p className="text-[10px] text-gray-600">{result.reward1Percent.toFixed(1)}%</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">R:R Ratio</p>
              <p className={cn('text-lg font-bold font-mono', result.rr1 >= 2 ? 'text-green-400' : result.rr1 >= 1 ? 'text-amber-400' : 'text-red-400')}>
                1:{result.rr1.toFixed(1)}
              </p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Quality</p>
              <Badge variant={result.rr1 >= 3 ? 'success' : result.rr1 >= 2 ? 'warning' : 'danger'}>
                {result.rr1 >= 3 ? 'Excellent' : result.rr1 >= 2 ? 'Good' : 'Poor'}
              </Badge>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Targets Visualization</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {[
                { label: 'Target 3', rr: result.rr3, price: parseFloat(target3), color: 'bg-green-500' },
                { label: 'Target 2', rr: result.rr2, price: parseFloat(target2), color: 'bg-green-400' },
                { label: 'Target 1', rr: result.rr1, price: parseFloat(target1), color: 'bg-green-300' },
                { label: 'Entry', rr: 0, price: parseFloat(entryPrice), color: 'bg-indigo-400' },
                { label: 'Stop Loss', rr: -1, price: parseFloat(stopLoss), color: 'bg-red-400' },
              ].filter((t) => t.price > 0).map((target) => (
                <div key={target.label} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-500">{target.label}</span>
                  <div className={cn('w-2 h-2 rounded-full', target.color)} />
                  <span className="text-xs font-mono text-gray-300">${target.price.toFixed(2)}</span>
                  {target.rr > 0 && <span className="text-[10px] font-mono text-green-400">R:R 1:{target.rr.toFixed(1)}</span>}
                  {target.rr === -1 && <span className="text-[10px] font-mono text-red-400">-{result.riskPercent.toFixed(1)}%</span>}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </motion.div>
  );
}
