'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { FileText } from 'lucide-react';

interface CotData {
  market: string;
  commercialNet: number;
  nonCommercialNet: number;
  openInterest: number;
  weeklyChange: number;
}

const COT_DATA: CotData[] = [
  { market: 'S&P 500 E-mini', commercialNet: -125000, nonCommercialNet: 98000, openInterest: 2800000, weeklyChange: 12000 },
  { market: 'Euro FX', commercialNet: -82000, nonCommercialNet: 65000, openInterest: 580000, weeklyChange: -5400 },
  { market: 'Gold', commercialNet: -210000, nonCommercialNet: 185000, openInterest: 520000, weeklyChange: 8200 },
  { market: 'Crude Oil', commercialNet: -95000, nonCommercialNet: 72000, openInterest: 1600000, weeklyChange: -15000 },
  { market: '10Y T-Note', commercialNet: -320000, nonCommercialNet: 280000, openInterest: 4200000, weeklyChange: 22000 },
  { market: 'Corn', commercialNet: 45000, nonCommercialNet: -38000, openInterest: 1450000, weeklyChange: -8500 },
  { market: 'Soybeans', commercialNet: 32000, nonCommercialNet: -25000, openInterest: 780000, weeklyChange: 4200 },
];

const fmtK = (v: number) => `${v >= 0 ? '+' : ''}${(v / 1000).toFixed(0)}K`;

export default function CotReportPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">COT Report</h1>
        <p className="mt-1 text-sm text-gray-500">Commitments of Traders positioning data</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Markets</p>
          <p className="text-lg font-bold text-white">{COT_DATA.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Net Bullish</p>
          <p className="text-lg font-bold text-green-400">{COT_DATA.filter(c => c.nonCommercialNet > 0).length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Net Bearish</p>
          <p className="text-lg font-bold text-red-400">{COT_DATA.filter(c => c.nonCommercialNet < 0).length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><FileText className="inline h-4 w-4 mr-1" />Positioning Data</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {COT_DATA.map((c) => (
            <div key={c.market} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{c.market}</p>
                <p className="text-xs text-gray-500">OI: {(c.openInterest / 1000).toFixed(0)}K &middot; Wkly: {fmtK(c.weeklyChange)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', c.nonCommercialNet >= 0 ? 'text-green-400' : 'text-red-400')}>
                    Spec {fmtK(c.nonCommercialNet)}
                  </p>
                  <p className="text-[10px] text-gray-500">Comm {fmtK(c.commercialNet)}</p>
                </div>
                <Badge variant={c.nonCommercialNet > 0 ? 'success' : 'danger'}>{c.nonCommercialNet > 0 ? 'Long' : 'Short'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
