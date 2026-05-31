'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatLargeNumber, cn } from '@/lib/formatters';
import { FileText } from 'lucide-react';
import type { IncomeStatement } from '@/types';

interface FinancialStatementsProps {
  data: IncomeStatement[] | undefined;
}

export function FinancialStatements({ data }: FinancialStatementsProps) {
  const [view, setView] = useState<'annual' | 'quarterly'>('annual');

  if (!data || data.length === 0) return null;

  const statements = data.slice(0, view === 'annual' ? 5 : 8);

  const rows = [
    { label: 'Revenue', key: 'revenue' as const },
    { label: 'Gross Profit', key: 'grossProfit' as const },
    { label: 'Operating Income', key: 'operatingIncome' as const },
    { label: 'Net Income', key: 'netIncome' as const },
    { label: 'EPS (Diluted)', key: 'epsdiluted' as const },
    { label: 'Gross Margin', key: 'grossProfitRatio' as const },
    { label: 'Operating Margin', key: 'operatingIncomeRatio' as const },
    { label: 'Net Margin', key: 'netIncomeRatio' as const },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-400" />
          Financial Statements
        </CardTitle>
      </CardHeader>

      <div className="flex gap-2 mb-3">
        {(['annual', 'quarterly'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-medium transition-colors',
              view === v ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300'
            )}
          >
            {v === 'annual' ? 'Annual' : 'Quarterly'}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="sticky left-0 bg-[#12121a] px-2 py-2 text-left text-gray-500 font-medium min-w-[120px]">
                Metric
              </th>
              {statements.map((s) => (
                <th key={s.date} className="px-2 py-2 text-right text-gray-500 font-medium min-w-[80px]">
                  {new Date(s.date).getFullYear()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-white/[0.03]">
                <td className="sticky left-0 bg-[#12121a] px-2 py-2 text-gray-400 font-medium">
                  {row.label}
                </td>
                {statements.map((s) => {
                  const val = s[row.key];
                  const isRatio = row.key.includes('Ratio');
                  const isEps = row.key === 'epsdiluted';
                  return (
                    <td key={s.date} className="px-2 py-2 text-right font-mono text-gray-300">
                      {isRatio
                        ? `${(val * 100).toFixed(1)}%`
                        : isEps
                          ? `$${val.toFixed(2)}`
                          : formatLargeNumber(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
