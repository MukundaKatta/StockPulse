'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Split } from 'lucide-react';

interface SpinOff {
  parent: string;
  spinoff: string;
  date: string;
  ratio: string;
  sector: string;
  status: 'Completed' | 'Announced' | 'Pending';
  returnSinceSpinoff: number | null;
}

const SPINOFFS: SpinOff[] = [
  { parent: 'General Electric', spinoff: 'GE Vernova', date: 'Apr 2024', ratio: '1:4', sector: 'Energy', status: 'Completed', returnSinceSpinoff: 42.5 },
  { parent: 'Johnson & Johnson', spinoff: 'Kenvue', date: 'May 2023', ratio: '1:1', sector: 'Consumer', status: 'Completed', returnSinceSpinoff: -12.3 },
  { parent: '3M Company', spinoff: 'Solventum', date: 'Apr 2024', ratio: '1:1', sector: 'Healthcare', status: 'Completed', returnSinceSpinoff: 8.7 },
  { parent: 'Honeywell', spinoff: 'Quantinuum', date: 'Q2 2025', ratio: 'TBD', sector: 'Tech', status: 'Announced', returnSinceSpinoff: null },
  { parent: 'FedEx', spinoff: 'FedEx Freight', date: 'Q3 2025', ratio: 'TBD', sector: 'Logistics', status: 'Announced', returnSinceSpinoff: null },
  { parent: 'Fortive', spinoff: 'Ralliant', date: 'Oct 2024', ratio: '1:1', sector: 'Industrial', status: 'Pending', returnSinceSpinoff: null },
];

const statusVariant = (s: string) => s === 'Completed' ? 'success' : s === 'Announced' ? 'info' : 'warning';

export default function SpinOffsPage() {
  const completed = SPINOFFS.filter(s => s.status === 'Completed');

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Spin-Offs</h1>
        <p className="mt-1 text-sm text-gray-500">Corporate spin-off tracker</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total</p>
          <p className="text-lg font-bold text-white">{SPINOFFS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Completed</p>
          <p className="text-lg font-bold text-green-400">{completed.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Best Return</p>
          <p className="text-lg font-bold text-green-400">
            +{Math.max(...completed.map(s => s.returnSinceSpinoff ?? 0)).toFixed(1)}%
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Split className="inline h-4 w-4 mr-1" />Spin-Off Tracker</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {SPINOFFS.map((s) => (
            <div key={s.spinoff} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{s.parent} → {s.spinoff}</p>
                <p className="text-xs text-gray-500">{s.date} &middot; Ratio {s.ratio} &middot; {s.sector}</p>
              </div>
              <div className="flex items-center gap-3">
                {s.returnSinceSpinoff !== null ? (
                  <p className={cn('text-sm font-mono', s.returnSinceSpinoff >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {s.returnSinceSpinoff > 0 ? '+' : ''}{s.returnSinceSpinoff}%
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">--</p>
                )}
                <Badge variant={statusVariant(s.status)}>{s.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
