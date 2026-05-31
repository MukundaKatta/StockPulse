'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/formatters';
import { PieChart, Plus, Trash2 } from 'lucide-react';

interface Allocation {
  id: string;
  name: string;
  targetPercent: number;
  currentValue: number;
  color: string;
}

const COLORS = ['bg-indigo-500', 'bg-green-500', 'bg-amber-500', 'bg-red-500', 'bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-cyan-500'];

const INITIAL_ALLOCATIONS: Allocation[] = [
  { id: '1', name: 'US Stocks', targetPercent: 40, currentValue: 42000, color: COLORS[0] },
  { id: '2', name: 'International', targetPercent: 20, currentValue: 18000, color: COLORS[1] },
  { id: '3', name: 'Bonds', targetPercent: 20, currentValue: 22000, color: COLORS[2] },
  { id: '4', name: 'Real Estate', targetPercent: 10, currentValue: 12000, color: COLORS[3] },
  { id: '5', name: 'Crypto', targetPercent: 5, currentValue: 4000, color: COLORS[4] },
  { id: '6', name: 'Cash', targetPercent: 5, currentValue: 6000, color: COLORS[5] },
];

export default function PortfolioAllocationPage() {
  const [allocations, setAllocations] = useState(INITIAL_ALLOCATIONS);

  const totalValue = allocations.reduce((sum, a) => sum + a.currentValue, 0);
  const totalTarget = allocations.reduce((sum, a) => sum + a.targetPercent, 0);

  const analysed = allocations.map((a) => {
    const actualPercent = totalValue > 0 ? (a.currentValue / totalValue) * 100 : 0;
    const diff = actualPercent - a.targetPercent;
    const adjustAmount = (a.targetPercent / 100) * totalValue - a.currentValue;
    return { ...a, actualPercent, diff, adjustAmount };
  });

  const addAllocation = () => {
    const id = Date.now().toString();
    setAllocations([...allocations, { id, name: 'New Asset', targetPercent: 0, currentValue: 0, color: COLORS[allocations.length % COLORS.length] }]);
  };

  const removeAllocation = (id: string) => {
    setAllocations(allocations.filter((a) => a.id !== id));
  };

  const updateAllocation = (id: string, field: keyof Allocation, value: string | number) => {
    setAllocations(allocations.map((a) => a.id === id ? { ...a, [field]: value } : a));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Allocation</h1>
          <p className="mt-1 text-sm text-gray-500">Target vs actual asset allocation with rebalancing</p>
        </div>
        <Button variant="secondary" size="sm" onClick={addAllocation}>
          <Plus className="h-3.5 w-3.5 mr-1" /> Add
        </Button>
      </div>

      {/* Visual Bar */}
      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-2">Target Allocation</p>
        <div className="h-6 rounded-full overflow-hidden flex">
          {allocations.filter((a) => a.targetPercent > 0).map((a) => (
            <div key={a.id} className={cn('h-full', a.color)} style={{ width: `${a.targetPercent}%` }} title={`${a.name}: ${a.targetPercent}%`} />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-2">Actual Allocation</p>
        <div className="h-6 rounded-full overflow-hidden flex">
          {analysed.filter((a) => a.actualPercent > 0).map((a) => (
            <div key={a.id} className={cn('h-full', a.color)} style={{ width: `${a.actualPercent}%` }} title={`${a.name}: ${a.actualPercent.toFixed(1)}%`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {allocations.map((a) => (
            <div key={a.id} className="flex items-center gap-1.5">
              <div className={cn('w-2.5 h-2.5 rounded-sm', a.color)} />
              <span className="text-[10px] text-gray-400">{a.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {totalTarget !== 100 && (
        <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
          <p className="text-xs text-amber-400">Target allocations sum to {totalTarget}% (should be 100%)</p>
        </div>
      )}

      {/* Allocation Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-3 py-2 text-left text-xs text-gray-500">Asset Class</th>
                <th className="px-3 py-2 text-right text-xs text-gray-500">Target %</th>
                <th className="px-3 py-2 text-right text-xs text-gray-500">Actual %</th>
                <th className="px-3 py-2 text-right text-xs text-gray-500">Value</th>
                <th className="px-3 py-2 text-right text-xs text-gray-500">Adjust</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {analysed.map((a) => (
                <tr key={a.id} className="border-b border-white/[0.03]">
                  <td className="px-3 py-2">
                    <input
                      className="bg-transparent text-sm text-white font-medium outline-none w-full"
                      value={a.name}
                      onChange={(e) => updateAllocation(a.id, 'name', e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <input
                      type="number"
                      className="bg-transparent text-sm text-gray-300 font-mono text-right outline-none w-16"
                      value={a.targetPercent}
                      onChange={(e) => updateAllocation(a.id, 'targetPercent', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-gray-400">{a.actualPercent.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right font-mono text-white">{formatCurrency(a.currentValue)}</td>
                  <td className="px-3 py-2 text-right">
                    <span className={cn('font-mono text-xs', a.adjustAmount > 0 ? 'text-green-400' : a.adjustAmount < 0 ? 'text-red-400' : 'text-gray-600')}>
                      {a.adjustAmount > 0 ? '+' : ''}{formatCurrency(a.adjustAmount)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => removeAllocation(a.id)} className="text-gray-600 hover:text-red-400 p-1">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
