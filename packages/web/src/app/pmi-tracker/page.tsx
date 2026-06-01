'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Factory } from 'lucide-react';

interface PMIData {
  country: string;
  code: string;
  manufacturing: number;
  services: number;
  composite: number;
  previousComposite: number;
  newOrders: number;
  status: 'Expanding' | 'Contracting' | 'Neutral';
}

const DATA: PMIData[] = [
  { country: 'United States', code: 'US', manufacturing: 49.2, services: 52.5, composite: 51.4, previousComposite: 50.9, newOrders: 52.8, status: 'Expanding' },
  { country: 'Eurozone', code: 'EU', manufacturing: 46.6, services: 48.8, composite: 47.6, previousComposite: 47.2, newOrders: 45.2, status: 'Contracting' },
  { country: 'China', code: 'CN', manufacturing: 50.8, services: 52.7, composite: 52.0, previousComposite: 51.6, newOrders: 51.4, status: 'Expanding' },
  { country: 'Japan', code: 'JP', manufacturing: 48.0, services: 53.8, composite: 51.5, previousComposite: 50.0, newOrders: 49.5, status: 'Expanding' },
  { country: 'Germany', code: 'DE', manufacturing: 43.3, services: 47.7, composite: 46.0, previousComposite: 45.5, newOrders: 42.1, status: 'Contracting' },
  { country: 'United Kingdom', code: 'UK', manufacturing: 47.0, services: 54.3, composite: 52.1, previousComposite: 52.8, newOrders: 53.2, status: 'Expanding' },
  { country: 'India', code: 'IN', manufacturing: 56.5, services: 61.2, composite: 59.8, previousComposite: 58.4, newOrders: 58.1, status: 'Expanding' },
  { country: 'Brazil', code: 'BR', manufacturing: 50.0, services: 50.1, composite: 50.0, previousComposite: 49.8, newOrders: 49.8, status: 'Neutral' },
];

export default function PmiTrackerPage() {
  const avgComposite = DATA.reduce((s, d) => s + d.composite, 0) / DATA.length;
  const expanding = DATA.filter((d) => d.status === 'Expanding').length;
  const avgManufacturing = DATA.reduce((s, d) => s + d.manufacturing, 0) / DATA.length;
  const avgServices = DATA.reduce((s, d) => s + d.services, 0) / DATA.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">PMI Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Purchasing Managers Index across manufacturing and services</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Composite</p>
          <p className={cn('text-lg font-bold', avgComposite >= 50 ? 'text-green-400' : 'text-red-400')}>{avgComposite.toFixed(1)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Expanding</p>
          <p className="text-lg font-bold text-green-400">{expanding}/{DATA.length}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Mfg PMI</p>
          <p className={cn('text-lg font-bold', avgManufacturing >= 50 ? 'text-green-400' : 'text-red-400')}>{avgManufacturing.toFixed(1)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Avg Svc PMI</p>
          <p className={cn('text-lg font-bold', avgServices >= 50 ? 'text-green-400' : 'text-red-400')}>{avgServices.toFixed(1)}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Factory className="h-4 w-4 text-indigo-400" /> PMI by Country
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {DATA.sort((a, b) => b.composite - a.composite).map((d) => (
            <div key={d.code} className="flex items-center gap-3 py-2 px-4">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{d.country}</p>
                <p className="text-[10px] text-gray-500">{d.code}</p>
              </div>
              <Badge variant={d.status === 'Expanding' ? 'success' : d.status === 'Contracting' ? 'danger' : 'warning'}>
                {d.status}
              </Badge>
              <span className={cn('text-xs font-mono w-10', d.composite >= 50 ? 'text-green-400' : 'text-red-400')}>{d.composite}</span>
              <span className={cn('text-[10px] font-mono w-14', d.manufacturing >= 50 ? 'text-green-400' : 'text-red-400')}>Mfg: {d.manufacturing}</span>
              <span className={cn('text-[10px] font-mono w-14', d.services >= 50 ? 'text-green-400' : 'text-red-400')}>Svc: {d.services}</span>
              <span className="text-[10px] text-gray-500 ml-auto">
                Prev: {d.previousComposite} ({d.composite >= d.previousComposite ? '+' : ''}{(d.composite - d.previousComposite).toFixed(1)})
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
