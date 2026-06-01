'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Gauge } from 'lucide-react';

interface ExposureCategory {
  category: string;
  longExposure: number;
  shortExposure: number;
  netExposure: number;
  grossExposure: number;
  beta: number;
  positions: number;
  risk: 'Low' | 'Medium' | 'High';
}

const EXPOSURES: ExposureCategory[] = [
  { category: 'US Large Cap', longExposure: 450000, shortExposure: 120000, netExposure: 330000, grossExposure: 570000, beta: 1.05, positions: 25, risk: 'Medium' },
  { category: 'US Small Cap', longExposure: 85000, shortExposure: 45000, netExposure: 40000, grossExposure: 130000, beta: 1.35, positions: 18, risk: 'High' },
  { category: 'International', longExposure: 180000, shortExposure: 60000, netExposure: 120000, grossExposure: 240000, beta: 0.85, positions: 12, risk: 'Medium' },
  { category: 'Fixed Income', longExposure: 220000, shortExposure: 80000, netExposure: 140000, grossExposure: 300000, beta: -0.15, positions: 8, risk: 'Low' },
  { category: 'Commodities', longExposure: 55000, shortExposure: 30000, netExposure: 25000, grossExposure: 85000, beta: 0.25, positions: 6, risk: 'High' },
  { category: 'Real Estate', longExposure: 95000, shortExposure: 15000, netExposure: 80000, grossExposure: 110000, beta: 0.72, positions: 5, risk: 'Medium' },
  { category: 'Alternatives', longExposure: 40000, shortExposure: 25000, netExposure: 15000, grossExposure: 65000, beta: 0.10, positions: 4, risk: 'Low' },
];

const riskVariant = (r: string) => r === 'Low' ? 'success' : r === 'Medium' ? 'warning' : 'danger';

export default function NetExposurePage() {
  const totalLong = EXPOSURES.reduce((s, e) => s + e.longExposure, 0);
  const totalShort = EXPOSURES.reduce((s, e) => s + e.shortExposure, 0);
  const totalNet = EXPOSURES.reduce((s, e) => s + e.netExposure, 0);
  const totalGross = EXPOSURES.reduce((s, e) => s + e.grossExposure, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Net Exposure</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio net and gross market exposure calculator</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Net Exposure</p><p className="text-lg font-bold text-white">{formatCurrency(totalNet)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Gross Exposure</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(totalGross)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Long</p><p className="text-lg font-bold text-green-400">{formatCurrency(totalLong)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Short</p><p className="text-lg font-bold text-red-400">{formatCurrency(totalShort)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gauge className="h-4 w-4 text-indigo-400" /> Exposure by Category</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {EXPOSURES.map((e) => (
            <div key={e.category} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{e.category}</p>
                <p className="text-[10px] text-gray-500">{e.positions} positions</p>
              </div>
              <span className="text-xs font-mono text-green-400 w-16">L {formatCurrency(e.longExposure)}</span>
              <span className="text-xs font-mono text-red-400 w-16">S {formatCurrency(e.shortExposure)}</span>
              <span className="text-xs font-mono text-white w-16">Net {formatCurrency(e.netExposure)}</span>
              <span className="text-[10px] text-gray-400 w-10">β {e.beta}</span>
              <Badge variant={riskVariant(e.risk)} className="ml-auto">{e.risk}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
