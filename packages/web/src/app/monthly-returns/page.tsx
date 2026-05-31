'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { CalendarDays } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = [2020, 2021, 2022, 2023, 2024];

function generateReturns(): Record<number, number[]> {
  const data: Record<number, number[]> = {};
  YEARS.forEach((year) => {
    data[year] = MONTHS.map(() => {
      const base = year === 2022 ? -2 : year === 2021 ? 2.5 : 1.5;
      return base + (Math.random() - 0.5) * 8;
    });
  });
  return data;
}

function getCellColor(val: number): string {
  if (val >= 8) return 'bg-green-500/70 text-white';
  if (val >= 5) return 'bg-green-500/50 text-white';
  if (val >= 2) return 'bg-green-500/30 text-white';
  if (val >= 0) return 'bg-green-500/10 text-green-300';
  if (val >= -2) return 'bg-red-500/10 text-red-300';
  if (val >= -5) return 'bg-red-500/30 text-white';
  if (val >= -8) return 'bg-red-500/50 text-white';
  return 'bg-red-500/70 text-white';
}

export default function MonthlyReturnsPage() {
  const returns = useMemo(() => generateReturns(), []);

  const yearlyTotals = YEARS.map((year) => ({
    year,
    total: returns[year].reduce((sum, v) => sum + v, 0),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Monthly Returns</h1>
        <p className="mt-1 text-sm text-gray-500">Historical portfolio returns heatmap</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-indigo-400" />
            Returns Heatmap (%)
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="px-2 py-1.5 text-left text-gray-500 font-medium">Year</th>
                {MONTHS.map((m) => (
                  <th key={m} className="px-1 py-1.5 text-center text-gray-500 font-medium">{m}</th>
                ))}
                <th className="px-2 py-1.5 text-center text-gray-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {YEARS.map((year) => {
                const total = returns[year].reduce((s, v) => s + v, 0);
                return (
                  <tr key={year}>
                    <td className="px-2 py-1 font-mono text-gray-400 font-medium">{year}</td>
                    {returns[year].map((val, i) => (
                      <td key={i} className="px-0.5 py-0.5">
                        <div className={cn('rounded px-1.5 py-1.5 text-center font-mono text-[11px]', getCellColor(val))}>
                          {val >= 0 ? '+' : ''}{val.toFixed(1)}
                        </div>
                      </td>
                    ))}
                    <td className="px-1 py-0.5">
                      <div className={cn('rounded px-1.5 py-1.5 text-center font-mono text-[11px] font-bold', getCellColor(total / 3))}>
                        {total >= 0 ? '+' : ''}{total.toFixed(1)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-gray-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500/50" /><span>Loss</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-white/5" /><span>Flat</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500/50" /><span>Gain</span></div>
        </div>
      </Card>

      {/* Yearly Summary */}
      <div className="grid grid-cols-5 gap-2">
        {yearlyTotals.map(({ year, total }) => (
          <Card key={year} className="!p-3 text-center">
            <p className="text-[10px] text-gray-500">{year}</p>
            <p className={cn('text-sm font-bold font-mono', total >= 0 ? 'text-green-400' : 'text-red-400')}>
              {total >= 0 ? '+' : ''}{total.toFixed(1)}%
            </p>
          </Card>
        ))}
      </div>

      {/* Monthly Averages */}
      <Card>
        <CardHeader>
          <CardTitle>Average Monthly Returns</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
          {MONTHS.map((month, i) => {
            const avg = YEARS.reduce((sum, year) => sum + returns[year][i], 0) / YEARS.length;
            return (
              <div key={month} className="text-center">
                <p className="text-[10px] text-gray-500 mb-1">{month}</p>
                <div className={cn('rounded py-2 text-xs font-mono font-medium', getCellColor(avg))}>
                  {avg >= 0 ? '+' : ''}{avg.toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
