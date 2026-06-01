'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Crosshair } from 'lucide-react';

interface DriftData { sector: string; target: number; current: number; drift: number; action: string; }
const SECTORS: DriftData[] = [
  { sector: 'Technology', target: 30, current: 38.2, drift: 8.2, action: 'Reduce' },
  { sector: 'Healthcare', target: 15, current: 12.4, drift: -2.6, action: 'Add' },
  { sector: 'Financials', target: 15, current: 14.8, drift: -0.2, action: 'Hold' },
  { sector: 'Consumer Disc.', target: 10, current: 8.2, drift: -1.8, action: 'Add' },
  { sector: 'Energy', target: 8, current: 6.4, drift: -1.6, action: 'Add' },
  { sector: 'Industrials', target: 8, current: 7.2, drift: -0.8, action: 'Hold' },
  { sector: 'Utilities', target: 5, current: 4.8, drift: -0.2, action: 'Hold' },
  { sector: 'Real Estate', target: 5, current: 4.2, drift: -0.8, action: 'Hold' },
  { sector: 'Materials', target: 4, current: 3.8, drift: -0.2, action: 'Hold' },
];

export default function SectorDriftPage() {
  const needAction = SECTORS.filter((s) => s.action !== 'Hold').length;
  const maxDrift = Math.max(...SECTORS.map((s) => Math.abs(s.drift)));
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Sector Drift</h1><p className="mt-1 text-sm text-gray-500">Sector allocation drift from target weights</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Max Drift</p><p className="text-lg font-bold text-amber-400">{maxDrift.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Need Action</p><p className="text-lg font-bold text-red-400">{needAction}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Sectors</p><p className="text-lg font-bold text-indigo-400">{SECTORS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Crosshair className="h-4 w-4 text-indigo-400" /> Allocation Drift</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SECTORS.sort((a, b) => Math.abs(b.drift) - Math.abs(a.drift)).map((s) => (
            <div key={s.sector} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{s.sector}</span>
                <Badge variant={s.action === 'Reduce' ? 'danger' : s.action === 'Add' ? 'success' : 'default'}>{s.action}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Target: {s.target}%</span>
                <span className="text-[10px] text-gray-500">Current: {s.current}%</span>
                <span className={cn('text-sm font-bold font-mono', Math.abs(s.drift) > 2 ? 'text-amber-400' : 'text-gray-400')}>{s.drift > 0 ? '+' : ''}{s.drift.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
