'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Merge } from 'lucide-react';

interface MergerDeal {
  target: string;
  acquirer: string;
  dealValue: number;
  currentPrice: number;
  offerPrice: number;
  spread: number;
  annualizedReturn: number;
  closingDate: string;
  status: 'Pending' | 'Approved' | 'At Risk';
}

const DEALS: MergerDeal[] = [
  { target: 'ATVI', acquirer: 'MSFT', dealValue: 68.7e9, currentPrice: 92.80, offerPrice: 95.00, spread: 2.4, annualizedReturn: 8.5, closingDate: 'Aug 2026', status: 'Approved' },
  { target: 'VMW', acquirer: 'AVGO', dealValue: 61.0e9, currentPrice: 182.50, offerPrice: 185.00, spread: 1.4, annualizedReturn: 5.2, closingDate: 'Jul 2026', status: 'Approved' },
  { target: 'IRBT', acquirer: 'AMZN', dealValue: 1.4e9, currentPrice: 48.20, offerPrice: 61.00, spread: 26.6, annualizedReturn: 42.5, closingDate: 'Dec 2026', status: 'At Risk' },
  { target: 'SAVE', acquirer: 'JBLU', dealValue: 3.8e9, currentPrice: 15.80, offerPrice: 33.50, spread: 112.0, annualizedReturn: 185.0, closingDate: 'Oct 2026', status: 'At Risk' },
  { target: 'CPRI', acquirer: 'TPR', dealValue: 8.5e9, currentPrice: 38.50, offerPrice: 57.00, spread: 48.1, annualizedReturn: 65.2, closingDate: 'Nov 2026', status: 'Pending' },
  { target: 'HZNP', acquirer: 'AMGN', dealValue: 27.8e9, currentPrice: 114.20, offerPrice: 116.50, spread: 2.0, annualizedReturn: 12.8, closingDate: 'Jul 2026', status: 'Approved' },
  { target: 'SGEN', acquirer: 'PFE', dealValue: 43.0e9, currentPrice: 218.50, offerPrice: 229.00, spread: 4.8, annualizedReturn: 15.2, closingDate: 'Sep 2026', status: 'Pending' },
];

const statusVariant = (s: string) => s === 'Approved' ? 'success' : s === 'At Risk' ? 'danger' : 'warning';

export default function MergerArbitragePage() {
  const avgSpread = DEALS.reduce((s, d) => s + d.spread, 0) / DEALS.length;
  const approvedCount = DEALS.filter(d => d.status === 'Approved').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Merger Arbitrage</h1>
        <p className="mt-1 text-sm text-gray-500">Active merger and acquisition arbitrage opportunities</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Deals</p><p className="text-lg font-bold text-white">{DEALS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Spread</p><p className="text-lg font-bold text-indigo-400">{avgSpread.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Approved</p><p className="text-lg font-bold text-green-400">{approvedCount}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">At Risk</p><p className="text-lg font-bold text-red-400">{DEALS.filter(d => d.status === 'At Risk').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Merge className="h-4 w-4 text-indigo-400" /> Active Deals</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {DEALS.map((d) => (
            <div key={d.target} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{d.target}</p>
                <p className="text-[10px] text-gray-500">Acq: {d.acquirer}</p>
              </div>
              <span className="text-xs font-mono text-white w-16">{formatCurrency(d.currentPrice)}</span>
              <span className="text-xs font-mono text-gray-400 w-16">Offer {formatCurrency(d.offerPrice)}</span>
              <span className="text-xs font-mono text-green-400 w-12">{d.spread.toFixed(1)}%</span>
              <span className="text-[10px] text-gray-500 w-16">{d.closingDate}</span>
              <Badge variant={statusVariant(d.status)} className="ml-auto">{d.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
