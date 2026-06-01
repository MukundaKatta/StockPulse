'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface Estimate {
  quarter: string;
  epsEstimate: number;
  epsHigh: number;
  epsLow: number;
  numAnalysts: number;
  revEstimate: number;
  epsPrior: number | null;
  epsActual: number | null;
}

const ESTIMATES: Estimate[] = [
  { quarter: 'Q2 2024', epsEstimate: 1.50, epsHigh: 1.65, epsLow: 1.35, numAnalysts: 32, revEstimate: 90.5e9, epsPrior: null, epsActual: null },
  { quarter: 'Q1 2024', epsEstimate: 2.10, epsHigh: 2.25, epsLow: 1.95, numAnalysts: 34, revEstimate: 117.9e9, epsPrior: null, epsActual: 2.18 },
  { quarter: 'Q4 2023', epsEstimate: 1.39, epsHigh: 1.52, epsLow: 1.25, numAnalysts: 33, revEstimate: 89.3e9, epsPrior: null, epsActual: 1.46 },
  { quarter: 'Q3 2023', epsEstimate: 1.19, epsHigh: 1.30, epsLow: 1.08, numAnalysts: 31, revEstimate: 81.7e9, epsPrior: null, epsActual: 1.26 },
  { quarter: 'Q2 2023', epsEstimate: 1.19, epsHigh: 1.28, epsLow: 1.10, numAnalysts: 30, revEstimate: 81.5e9, epsPrior: null, epsActual: 1.26 },
];

export default function EarningsEstimatesPage() {
  const nextQ = ESTIMATES[0];
  const beatRate = ESTIMATES.filter((e) => e.epsActual !== null && e.epsActual > e.epsEstimate).length;
  const reportedCount = ESTIMATES.filter((e) => e.epsActual !== null).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Earnings Estimates</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL analyst EPS estimates and actuals</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Next EPS Est</p><p className="text-lg font-bold text-white">${nextQ.epsEstimate.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Range</p><p className="text-lg font-bold text-gray-400">${nextQ.epsLow.toFixed(2)}-${nextQ.epsHigh.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Analysts</p><p className="text-lg font-bold text-indigo-400">{nextQ.numAnalysts}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Beat Rate</p><p className="text-lg font-bold text-green-400">{reportedCount > 0 ? ((beatRate / reportedCount) * 100).toFixed(0) : 0}%</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-indigo-400" /> Quarterly Estimates</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ESTIMATES.map((e) => {
            const beat = e.epsActual !== null && e.epsActual > e.epsEstimate;
            const surprise = e.epsActual !== null ? ((e.epsActual - e.epsEstimate) / e.epsEstimate * 100) : null;
            return (
              <div key={e.quarter} className="flex items-center gap-3 py-2 px-4">
                <span className="text-xs font-bold text-white w-16">{e.quarter}</span>
                <span className="text-xs font-mono text-indigo-400 w-12">E: ${e.epsEstimate.toFixed(2)}</span>
                <div className="flex-1 relative h-3 rounded bg-white/5">
                  <div className="absolute top-0 h-full bg-indigo-500/20 rounded" style={{ left: `${((e.epsLow - e.epsLow) / (e.epsHigh - e.epsLow)) * 100}%`, width: '100%' }} />
                  {e.epsActual !== null && (
                    <div className={cn('absolute top-0 h-full w-1 rounded', beat ? 'bg-green-400' : 'bg-red-400')} style={{ left: `${Math.min(((e.epsActual - e.epsLow) / (e.epsHigh - e.epsLow)) * 100, 100)}%` }} />
                  )}
                </div>
                {e.epsActual !== null ? (
                  <>
                    <span className={cn('text-xs font-mono w-12', beat ? 'text-green-400' : 'text-red-400')}>A: ${e.epsActual.toFixed(2)}</span>
                    <Badge variant={beat ? 'success' : 'danger'}>{surprise !== null ? `${surprise >= 0 ? '+' : ''}${surprise.toFixed(1)}%` : ''}</Badge>
                  </>
                ) : (
                  <Badge variant="default">Upcoming</Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
