'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

const CURRENT = [
  { term: '3M', yield: 5.40 }, { term: '6M', yield: 5.27 }, { term: '1Y', yield: 4.89 },
  { term: '2Y', yield: 4.38 }, { term: '3Y', yield: 4.15 }, { term: '5Y', yield: 4.05 },
  { term: '7Y', yield: 4.09 }, { term: '10Y', yield: 4.12 }, { term: '20Y', yield: 4.42 }, { term: '30Y', yield: 4.32 },
];

const YEAR_AGO = [
  { term: '3M', yield: 4.65 }, { term: '6M', yield: 4.82 }, { term: '1Y', yield: 4.72 },
  { term: '2Y', yield: 4.28 }, { term: '3Y', yield: 4.02 }, { term: '5Y', yield: 3.82 },
  { term: '7Y', yield: 3.88 }, { term: '10Y', yield: 3.95 }, { term: '20Y', yield: 4.25 }, { term: '30Y', yield: 4.05 },
];

export default function YieldCurvePage() {
  const maxY = Math.max(...CURRENT.map((c) => c.yield));
  const minY = Math.min(...CURRENT.map((c) => c.yield));
  const spread2s10s = CURRENT[7].yield - CURRENT[3].yield;
  const spread3m10y = CURRENT[7].yield - CURRENT[0].yield;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Yield Curve</h1>
        <p className="mt-1 text-sm text-gray-500">US Treasury yield curve current vs 1 year ago</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">2s10s Spread</p><p className={cn('text-lg font-bold', spread2s10s < 0 ? 'text-red-400' : 'text-green-400')}>{(spread2s10s * 100).toFixed(0)} bps</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">3M-10Y Spread</p><p className={cn('text-lg font-bold', spread3m10y < 0 ? 'text-red-400' : 'text-green-400')}>{(spread3m10y * 100).toFixed(0)} bps</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Shape</p><p className="text-lg font-bold text-yellow-400">{spread3m10y < 0 ? 'Inverted' : spread2s10s < 0 ? 'Partially Inverted' : 'Normal'}</p></Card>
      </div>

      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-3">Yield Curve Comparison</p>
        <svg viewBox="0 0 400 150" className="w-full h-40">
          {CURRENT.map((pt, i) => {
            const x = (i / (CURRENT.length - 1)) * 380 + 10;
            const y = 140 - ((pt.yield - minY + 0.2) / (maxY - minY + 0.4)) * 120;
            const yOld = 140 - ((YEAR_AGO[i].yield - minY + 0.2) / (maxY - minY + 0.4)) * 120;
            return (
              <g key={pt.term}>
                {i > 0 && (
                  <>
                    <line x1={(((i - 1) / (CURRENT.length - 1)) * 380 + 10)} y1={140 - ((CURRENT[i - 1].yield - minY + 0.2) / (maxY - minY + 0.4)) * 120} x2={x} y2={y} stroke="#6366f1" strokeWidth="2" />
                    <line x1={(((i - 1) / (CURRENT.length - 1)) * 380 + 10)} y1={140 - ((YEAR_AGO[i - 1].yield - minY + 0.2) / (maxY - minY + 0.4)) * 120} x2={x} y2={yOld} stroke="#6b7280" strokeWidth="1" strokeDasharray="4" />
                  </>
                )}
                <circle cx={x} cy={y} r="3" fill="#6366f1" />
                <circle cx={x} cy={yOld} r="2" fill="#6b7280" />
                <text x={x} y="150" textAnchor="middle" className="text-[8px] fill-gray-500">{pt.term}</text>
              </g>
            );
          })}
        </svg>
        <div className="flex gap-4 mt-2 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-indigo-500 rounded" /> Current</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-gray-500 rounded border-dashed" /> 1 Year Ago</span>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Term Comparison</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2 font-medium">Term</th>
              <th className="text-right py-2 px-2 font-medium">Current</th>
              <th className="text-right py-2 px-2 font-medium">1Y Ago</th>
              <th className="text-right py-2 px-2 font-medium">Change</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {CURRENT.map((pt, i) => {
                const diff = pt.yield - YEAR_AGO[i].yield;
                return (
                  <tr key={pt.term}><td className="py-1.5 px-2 text-gray-300">{pt.term}</td><td className="py-1.5 px-2 text-right font-mono text-white">{pt.yield.toFixed(2)}%</td><td className="py-1.5 px-2 text-right font-mono text-gray-500">{YEAR_AGO[i].yield.toFixed(2)}%</td><td className={cn('py-1.5 px-2 text-right font-mono', diff > 0 ? 'text-red-400' : 'text-green-400')}>{diff > 0 ? '+' : ''}{(diff * 100).toFixed(0)} bps</td></tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
