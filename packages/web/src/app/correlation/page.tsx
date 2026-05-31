'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { Grid3x3 } from 'lucide-react';

const SYMBOLS = ['SPY', 'QQQ', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA'];

function generateCorrelation(): number[][] {
  const n = SYMBOLS.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    matrix[i][i] = 1.0;
    for (let j = i + 1; j < n; j++) {
      const base = i < 2 || j < 2 ? 0.7 : 0.4;
      const val = base + Math.random() * 0.3 - 0.1;
      const clamped = Math.max(-1, Math.min(1, val));
      matrix[i][j] = clamped;
      matrix[j][i] = clamped;
    }
  }
  return matrix;
}

function getColor(val: number): string {
  if (val >= 0.8) return 'bg-green-500/80 text-white';
  if (val >= 0.6) return 'bg-green-500/50 text-white';
  if (val >= 0.4) return 'bg-green-500/30 text-white';
  if (val >= 0.2) return 'bg-green-500/10 text-gray-300';
  if (val >= -0.2) return 'bg-white/5 text-gray-400';
  if (val >= -0.4) return 'bg-red-500/10 text-gray-300';
  if (val >= -0.6) return 'bg-red-500/30 text-white';
  return 'bg-red-500/50 text-white';
}

export default function CorrelationPage() {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');

  const matrix = useMemo(() => generateCorrelation(), [timeframe]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Correlation Matrix</h1>
          <p className="mt-1 text-sm text-gray-500">Cross-asset correlation analysis</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {(['1M', '3M', '6M', '1Y'] as const).map((t) => (
            <button key={t} onClick={() => setTimeframe(t)}
              className={cn('rounded-md px-3 py-1.5 text-xs font-medium transition-colors', timeframe === t ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
            >{t}</button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3x3 className="h-4 w-4 text-indigo-400" />
            Correlation Heatmap ({timeframe})
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="px-2 py-1.5"></th>
                {SYMBOLS.map((s) => (
                  <th key={s} className="px-2 py-1.5 text-center font-mono text-gray-400 font-medium">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYMBOLS.map((rowSym, i) => (
                <tr key={rowSym}>
                  <td className="px-2 py-1.5 font-mono text-gray-400 font-medium">{rowSym}</td>
                  {SYMBOLS.map((colSym, j) => (
                    <td key={colSym} className="px-1 py-1">
                      <div className={cn('rounded px-2 py-1.5 text-center font-mono text-[11px]', getColor(matrix[i][j]))}>
                        {matrix[i][j].toFixed(2)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500/50" />
            <span>Negative</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-white/5" />
            <span>Neutral</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500/50" />
            <span>Positive</span>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {[
            { text: 'SPY and QQQ are highly correlated (0.95+) — limited diversification', type: 'warning' as const },
            { text: 'TSLA shows lower correlation to indices — potential diversifier', type: 'info' as const },
            { text: 'Tech stocks (AAPL, MSFT, GOOGL, NVDA) cluster together', type: 'info' as const },
          ].map((insight, i) => (
            <div key={i} className={cn('rounded-lg px-3 py-2 text-xs', insight.type === 'warning' ? 'bg-amber-500/5 text-amber-400 border border-amber-500/10' : 'bg-indigo-500/5 text-indigo-400 border border-indigo-500/10')}>
              {insight.text}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
