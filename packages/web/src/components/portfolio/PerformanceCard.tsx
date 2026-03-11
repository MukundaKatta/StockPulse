'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import type { Holding } from '@/types';

interface PerformanceCardProps {
  holdings: Holding[];
}

export function PerformanceCard({ holdings }: PerformanceCardProps) {
  const totalValue = holdings.reduce((sum, h) => sum + h.totalCost, 0);
  const totalFees = holdings.reduce((sum, h) => sum + h.totalFees, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <Card hover>
        <CardHeader>
          <CardTitle>Total Value</CardTitle>
        </CardHeader>
        <div className="font-mono text-xl sm:text-2xl font-bold text-white">{formatCurrency(totalValue)}</div>
      </Card>

      <Card hover>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <div className="font-mono text-xl sm:text-2xl font-bold text-white">{holdings.length}</div>
        <div className="text-xs text-gray-500 mt-1">unique positions</div>
      </Card>

      <Card hover>
        <CardHeader>
          <CardTitle>Total Fees</CardTitle>
        </CardHeader>
        <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">{formatCurrency(totalFees)}</div>
      </Card>
    </div>
  );
}
