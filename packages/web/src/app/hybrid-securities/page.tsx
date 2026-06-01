'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Layers } from 'lucide-react';

interface HybridSecurity {
  name: string;
  ticker: string;
  type: 'Convertible' | 'Preferred' | 'CoCo' | 'Mezzanine';
  price: number;
  yield: number;
  conversionPremium: number;
  rating: string;
  status: 'Active' | 'Called' | 'Converting';
}

const SECURITIES: HybridSecurity[] = [
  { name: 'Tesla Conv 2025', ticker: 'TSLA-CV', type: 'Convertible', price: 1024.50, yield: 2.0, conversionPremium: 32.5, rating: 'BB+', status: 'Active' },
  { name: 'BAC Pref Series L', ticker: 'BAC-PL', type: 'Preferred', price: 25.80, yield: 5.8, conversionPremium: 0, rating: 'BBB', status: 'Active' },
  { name: 'DB CoCo 6.0%', ticker: 'DB-CC', type: 'CoCo', price: 98.20, yield: 6.1, conversionPremium: 45.0, rating: 'BB', status: 'Active' },
  { name: 'JPM Pref Series DD', ticker: 'JPM-PD', type: 'Preferred', price: 26.10, yield: 5.2, conversionPremium: 0, rating: 'A-', status: 'Active' },
  { name: 'Ford Conv 2026', ticker: 'F-CV', type: 'Convertible', price: 112.40, yield: 3.5, conversionPremium: 18.2, rating: 'BBB-', status: 'Converting' },
  { name: 'GS Mezz Fund III', ticker: 'GS-MZ', type: 'Mezzanine', price: 1000.00, yield: 9.2, conversionPremium: 0, rating: 'B+', status: 'Active' },
  { name: 'MS Pref Series K', ticker: 'MS-PK', type: 'Preferred', price: 24.50, yield: 5.5, conversionPremium: 0, rating: 'BBB+', status: 'Called' },
];

const typeVariant = (t: string) => t === 'Convertible' ? 'info' : t === 'Preferred' ? 'default' : t === 'CoCo' ? 'warning' : 'danger';
const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'Called' ? 'danger' : 'warning';

export default function HybridSecuritiesPage() {
  const avgYield = SECURITIES.reduce((s, sec) => s + sec.yield, 0) / SECURITIES.length;
  const activeCount = SECURITIES.filter(s => s.status === 'Active').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Hybrid Securities</h1>
        <p className="mt-1 text-sm text-gray-500">Convertibles, preferreds, CoCos &amp; mezzanine analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Securities</p><p className="text-lg font-bold text-white">{SECURITIES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Yield</p><p className="text-lg font-bold text-green-400">{avgYield.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Active</p><p className="text-lg font-bold text-indigo-400">{activeCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Convertibles</p><p className="text-lg font-bold text-cyan-400">{SECURITIES.filter(s => s.type === 'Convertible').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-indigo-400" /> Hybrid Security Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SECURITIES.map((sec) => (
            <div key={sec.ticker} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{sec.ticker}</p>
                <p className="text-[10px] text-gray-500 truncate">{sec.name}</p>
              </div>
              <Badge variant={typeVariant(sec.type)}>{sec.type}</Badge>
              <span className="text-xs font-mono text-white w-20">{formatCurrency(sec.price)}</span>
              <span className="text-xs font-mono text-green-400 w-12">{sec.yield}%</span>
              <span className="text-[10px] text-gray-400 w-10">{sec.rating}</span>
              {sec.conversionPremium > 0 && <span className="text-[10px] text-gray-500">Prem: {sec.conversionPremium}%</span>}
              <Badge variant={statusVariant(sec.status)} className="ml-auto">{sec.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
