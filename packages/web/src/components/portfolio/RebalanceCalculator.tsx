'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Scale, ArrowRight } from 'lucide-react';
import type { Holding } from '@/types';

interface RebalanceCalculatorProps {
  holdings: Holding[];
  quotes: Record<string, { price: number } | undefined>;
}

interface TargetAllocation {
  symbol: string;
  target: number;
  current: number;
  diff: number;
  action: string;
  amount: number;
}

export function RebalanceCalculator({ holdings, quotes }: RebalanceCalculatorProps) {
  const [targets, setTargets] = useState<Record<string, string>>({});

  const totalValue = useMemo(() => {
    return holdings.reduce((sum, h) => {
      const price = quotes[h.symbol]?.price ?? h.avgCost;
      return sum + price * h.quantity;
    }, 0);
  }, [holdings, quotes]);

  const allocations = useMemo<TargetAllocation[]>(() => {
    return holdings.map((h) => {
      const price = quotes[h.symbol]?.price ?? h.avgCost;
      const value = price * h.quantity;
      const currentPct = totalValue > 0 ? (value / totalValue) * 100 : 0;
      const targetPct = parseFloat(targets[h.symbol] || '') || currentPct;
      const diff = targetPct - currentPct;
      const targetValue = (targetPct / 100) * totalValue;
      const amount = targetValue - value;

      return {
        symbol: h.symbol,
        target: targetPct,
        current: currentPct,
        diff,
        action: amount > 0 ? 'Buy' : amount < 0 ? 'Sell' : 'Hold',
        amount: Math.abs(amount),
      };
    });
  }, [holdings, quotes, targets, totalValue]);

  if (holdings.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-indigo-400" />
          Rebalance Calculator
        </CardTitle>
      </CardHeader>

      <p className="text-xs text-gray-500 mb-3">
        Set target allocations to see what trades are needed to rebalance.
      </p>

      <div className="space-y-2">
        {allocations.map((alloc) => (
          <div key={alloc.symbol} className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0">
            <span className="font-mono text-sm font-bold text-white w-14">{alloc.symbol}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-14 text-right">{alloc.current.toFixed(1)}%</span>
                <ArrowRight className="h-3 w-3 text-gray-600" />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={targets[alloc.symbol] || ''}
                  onChange={(e) => setTargets((t) => ({ ...t, [alloc.symbol]: e.target.value }))}
                  placeholder={alloc.current.toFixed(1)}
                  className="w-20 text-xs !py-1"
                />
                <span className="text-[10px] text-gray-600">%</span>
              </div>
            </div>
            {targets[alloc.symbol] && (
              <div className="text-right">
                <span className={cn(
                  'text-xs font-mono font-medium',
                  alloc.action === 'Buy' ? 'text-green-400' : alloc.action === 'Sell' ? 'text-red-400' : 'text-gray-400'
                )}>
                  {alloc.action} {formatCurrency(alloc.amount)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>Portfolio value: {formatCurrency(totalValue)}</span>
        <Button variant="secondary" onClick={() => setTargets({})}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
