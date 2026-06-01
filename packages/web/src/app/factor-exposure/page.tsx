'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface FactorExposure {
  factor: string;
  exposure: number;
  tStat: number;
  contribution: number;
  benchmark: number;
  active: number;
}

const FACTORS: FactorExposure[] = [
  { factor: 'Market (Beta)', exposure: 1.12, tStat: 15.2, contribution: 8.4, benchmark: 1.0, active: 0.12 },
  { factor: 'Size (SMB)', exposure: -0.15, tStat: -2.1, contribution: -0.3, benchmark: 0.0, active: -0.15 },
  { factor: 'Value (HML)', exposure: 0.08, tStat: 0.9, contribution: 0.1, benchmark: 0.0, active: 0.08 },
  { factor: 'Momentum (UMD)', exposure: 0.32, tStat: 3.8, contribution: 1.2, benchmark: 0.0, active: 0.32 },
  { factor: 'Quality (QMJ)', exposure: 0.25, tStat: 2.9, contribution: 0.8, benchmark: 0.0, active: 0.25 },
  { factor: 'Low Vol (BAB)', exposure: -0.18, tStat: -1.5, contribution: -0.2, benchmark: 0.0, active: -0.18 },
];

const sigBadge = (t: number) => Math.abs(t) > 2 ? 'success' : Math.abs(t) > 1.5 ? 'warning' : 'default';

export default function FactorExposurePage() {
  const totalContrib = FACTORS.reduce((s, f) => s + f.contribution, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Factor Exposure</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio factor exposures and contributions</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Factors</p>
          <p className="text-lg font-bold text-white">{FACTORS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Beta</p>
          <p className="text-lg font-bold text-indigo-400">{FACTORS[0].exposure}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Factor Return</p>
          <p className={cn('text-lg font-bold', totalContrib >= 0 ? 'text-green-400' : 'text-red-400')}>
            {totalContrib > 0 ? '+' : ''}{totalContrib.toFixed(1)}%
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Layers className="inline h-4 w-4 mr-1" />Factor Decomposition</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {FACTORS.map((f) => (
            <div key={f.factor} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{f.factor}</p>
                <p className="text-xs text-gray-500">t-stat {f.tStat.toFixed(1)} &middot; Active {f.active > 0 ? '+' : ''}{f.active.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', f.exposure >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {f.exposure > 0 ? '+' : ''}{f.exposure.toFixed(2)}
                  </p>
                  <p className={cn('text-[10px] font-mono', f.contribution >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {f.contribution > 0 ? '+' : ''}{f.contribution.toFixed(1)}%
                  </p>
                </div>
                <Badge variant={sigBadge(f.tStat)}>{Math.abs(f.tStat) > 2 ? 'Sig.' : 'Weak'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
