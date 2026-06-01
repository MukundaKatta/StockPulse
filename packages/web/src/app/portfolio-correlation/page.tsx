'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { Grid3X3 } from 'lucide-react';

const SYMBOLS = ['AAPL', 'MSFT', 'NVDA', 'META', 'GOOGL', 'AMZN', 'JPM', 'BND'];

const CORR_MATRIX: number[][] = [
  [1.00, 0.82, 0.65, 0.71, 0.78, 0.72, 0.45, -0.12],
  [0.82, 1.00, 0.72, 0.68, 0.85, 0.74, 0.52, -0.08],
  [0.65, 0.72, 1.00, 0.58, 0.62, 0.55, 0.32, -0.18],
  [0.71, 0.68, 0.58, 1.00, 0.74, 0.65, 0.38, -0.15],
  [0.78, 0.85, 0.62, 0.74, 1.00, 0.78, 0.48, -0.10],
  [0.72, 0.74, 0.55, 0.65, 0.78, 1.00, 0.42, -0.14],
  [0.45, 0.52, 0.32, 0.38, 0.48, 0.42, 1.00, 0.22],
  [-0.12, -0.08, -0.18, -0.15, -0.10, -0.14, 0.22, 1.00],
];

function corrColor(val: number): string {
  if (val >= 0.7) return 'bg-red-500/40 text-red-300';
  if (val >= 0.4) return 'bg-orange-500/30 text-orange-300';
  if (val >= 0.1) return 'bg-yellow-500/20 text-yellow-300';
  if (val >= -0.1) return 'bg-gray-500/10 text-gray-400';
  if (val >= -0.4) return 'bg-blue-500/20 text-blue-300';
  return 'bg-blue-500/40 text-blue-200';
}

export default function PortfolioCorrelationPage() {
  const pairs: { a: string; b: string; corr: number }[] = [];
  for (let i = 0; i < SYMBOLS.length; i++) {
    for (let j = i + 1; j < SYMBOLS.length; j++) {
      pairs.push({ a: SYMBOLS[i], b: SYMBOLS[j], corr: CORR_MATRIX[i][j] });
    }
  }
  const avgCorr = pairs.reduce((s, p) => s + p.corr, 0) / pairs.length;
  const highCorr = pairs.filter((p) => p.corr > 0.7).length;
  const negCorr = pairs.filter((p) => p.corr < 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Correlation</h1>
        <p className="mt-1 text-sm text-gray-500">Cross-asset correlation matrix for holdings</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Correlation</p><p className="text-lg font-bold text-amber-400">{avgCorr.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Corr Pairs</p><p className="text-lg font-bold text-red-400">{highCorr}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Neg Corr Pairs</p><p className="text-lg font-bold text-green-400">{negCorr}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Grid3X3 className="h-4 w-4 text-indigo-400" /> Correlation Matrix</CardTitle></CardHeader>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-[9px] text-gray-500 p-1" />
                {SYMBOLS.map((s) => (
                  <th key={s} className="text-[9px] text-gray-400 p-1 font-mono">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYMBOLS.map((sym, i) => (
                <tr key={sym}>
                  <td className="text-[9px] text-gray-400 p-1 font-mono">{sym}</td>
                  {CORR_MATRIX[i].map((val, j) => (
                    <td key={j} className="p-0.5">
                      <div className={cn('text-center text-[9px] font-mono rounded py-1 px-0.5', i === j ? 'bg-white/5 text-gray-500' : corrColor(val))}>
                        {val.toFixed(2)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Most Correlated Pairs</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {pairs.sort((a, b) => Math.abs(b.corr) - Math.abs(a.corr)).slice(0, 8).map((p) => (
            <div key={`${p.a}-${p.b}`} className="flex items-center justify-between px-4 py-2">
              <span className="text-xs text-white">{p.a} / {p.b}</span>
              <span className={cn('text-xs font-mono font-bold', p.corr > 0.7 ? 'text-red-400' : p.corr > 0.4 ? 'text-amber-400' : p.corr < 0 ? 'text-blue-400' : 'text-gray-400')}>{p.corr.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
