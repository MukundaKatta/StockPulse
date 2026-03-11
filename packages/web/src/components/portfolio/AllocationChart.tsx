'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioPieChart } from '@/components/charts/PortfolioPieChart';
import type { Holding } from '@/types';

interface AllocationChartProps {
  holdings: Holding[];
}

export function AllocationChart({ holdings }: AllocationChartProps) {
  const totalValue = holdings.reduce((sum, h) => sum + h.totalCost, 0);

  return (
    <Card hover>
      <CardHeader>
        <CardTitle>Allocation</CardTitle>
      </CardHeader>
      {holdings.length > 0 ? (
        <>
          <PortfolioPieChart holdings={holdings} />
          <div className="mt-2 space-y-1">
            {holdings.slice(0, 5).map((h) => (
              <div key={h.symbol} className="flex items-center justify-between text-xs">
                <span className="font-mono text-gray-300">{h.symbol}</span>
                <span className="text-gray-500">
                  {totalValue > 0 ? `${((h.totalCost / totalValue) * 100).toFixed(1)}%` : '-'}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="py-8 text-center text-sm text-gray-500">No holdings to display</p>
      )}
    </Card>
  );
}
