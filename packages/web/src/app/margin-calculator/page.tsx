'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { AlertTriangle, Scale } from 'lucide-react';

export default function MarginCalculatorPage() {
  const [accountValue, setAccountValue] = useState('100000');
  const [marginUsed, setMarginUsed] = useState('50000');
  const [maintenanceReq, setMaintenanceReq] = useState('25');
  const [positionValue, setPositionValue] = useState('150000');

  const result = useMemo(() => {
    const account = parseFloat(accountValue) || 0;
    const margin = parseFloat(marginUsed) || 0;
    const maint = (parseFloat(maintenanceReq) || 25) / 100;
    const position = parseFloat(positionValue) || 0;

    if (!account || !position) return null;

    const equity = account;
    const totalValue = position;
    const leverage = totalValue / equity;
    const marginLevel = equity / margin * 100;
    const freeMargin = equity - (margin * maint);
    const marginCallPrice = (margin * maint) / totalValue;
    const liquidationDrop = ((equity - margin * maint) / totalValue) * 100;
    const buyingPower = equity * (1 / maint);

    return {
      equity,
      leverage,
      marginLevel: isFinite(marginLevel) ? marginLevel : 0,
      freeMargin,
      liquidationDrop,
      buyingPower,
      riskLevel: leverage > 3 ? 'high' : leverage > 2 ? 'medium' : 'low',
    };
  }, [accountValue, marginUsed, maintenanceReq, positionValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Margin Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Calculate margin requirements and liquidation levels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-indigo-400" />
            Account Parameters
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Account Value ($)" type="number" value={accountValue} onChange={(e) => setAccountValue(e.target.value)} />
          <Input label="Margin Used ($)" type="number" value={marginUsed} onChange={(e) => setMarginUsed(e.target.value)} />
          <Input label="Maintenance Req (%)" type="number" value={maintenanceReq} onChange={(e) => setMaintenanceReq(e.target.value)} />
          <Input label="Position Value ($)" type="number" value={positionValue} onChange={(e) => setPositionValue(e.target.value)} />
        </div>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Leverage</p>
              <p className={cn('text-lg font-bold font-mono', result.riskLevel === 'high' ? 'text-red-400' : result.riskLevel === 'medium' ? 'text-amber-400' : 'text-green-400')}>
                {result.leverage.toFixed(2)}x
              </p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Free Margin</p>
              <p className="text-lg font-bold text-white">{formatCurrency(result.freeMargin)}</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Buying Power</p>
              <p className="text-lg font-bold text-indigo-400">{formatCurrency(result.buyingPower)}</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Drop to Call</p>
              <p className="text-lg font-bold text-red-400">{result.liquidationDrop.toFixed(1)}%</p>
            </Card>
          </div>

          {result.riskLevel === 'high' && (
            <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-400">High Leverage Warning</p>
                <p className="text-xs text-gray-400">Your leverage exceeds 3x. Consider reducing position size to lower margin call risk.</p>
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Risk Gauge</CardTitle>
            </CardHeader>
            <div className="relative h-4 rounded-full overflow-hidden bg-white/5">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-green-500/30" />
                <div className="flex-1 bg-amber-500/30" />
                <div className="flex-1 bg-red-500/30" />
              </div>
              <div
                className="absolute top-0 h-full w-1 bg-white rounded-full transition-all"
                style={{ left: `${Math.min((result.leverage / 5) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-gray-500">
              <span>Conservative (1x)</span>
              <span>Moderate (2-3x)</span>
              <span>Aggressive (4x+)</span>
            </div>
          </Card>
        </>
      )}
    </motion.div>
  );
}
