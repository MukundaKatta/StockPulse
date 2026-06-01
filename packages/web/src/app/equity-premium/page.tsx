'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { TrendingUp } from 'lucide-react';

interface ERPEstimate {
  method: string;
  source: string;
  erp: number;
  riskFree: number;
  impliedReturn: number;
  period: string;
  confidence: 'High' | 'Medium' | 'Low';
}

const ESTIMATES: ERPEstimate[] = [
  { method: 'Historical Arithmetic', source: 'Damodaran', erp: 5.50, riskFree: 4.25, impliedReturn: 9.75, period: '1928-2024', confidence: 'High' },
  { method: 'Historical Geometric', source: 'Damodaran', erp: 4.20, riskFree: 4.25, impliedReturn: 8.45, period: '1928-2024', confidence: 'High' },
  { method: 'Implied (DDM)', source: 'Fed Model', erp: 3.80, riskFree: 4.25, impliedReturn: 8.05, period: 'Current', confidence: 'Medium' },
  { method: 'Survey (CFO)', source: 'Duke/CFO Survey', erp: 4.70, riskFree: 4.25, impliedReturn: 8.95, period: 'Q1 2024', confidence: 'Medium' },
  { method: 'CAPE-Based', source: 'Shiller', erp: 3.20, riskFree: 4.25, impliedReturn: 7.45, period: '10Y Forward', confidence: 'Medium' },
  { method: 'Bond Spread', source: 'Credit Suisse', erp: 5.10, riskFree: 4.25, impliedReturn: 9.35, period: '1900-2024', confidence: 'High' },
  { method: 'Consensus Blend', source: 'Composite', erp: 4.40, riskFree: 4.25, impliedReturn: 8.65, period: 'Forward', confidence: 'High' },
];

const confVariant = (c: string) => c === 'High' ? 'success' : c === 'Medium' ? 'warning' : 'danger';

export default function EquityPremiumPage() {
  const avgERP = ESTIMATES.reduce((s, e) => s + e.erp, 0) / ESTIMATES.length;
  const highConf = ESTIMATES.filter(e => e.confidence === 'High').length;
  const maxERP = Math.max(...ESTIMATES.map(e => e.erp));
  const minERP = Math.min(...ESTIMATES.map(e => e.erp));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Equity Risk Premium</h1>
        <p className="mt-1 text-sm text-gray-500">ERP estimates across methodologies</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg ERP</p><p className="text-lg font-bold text-white">{avgERP.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Range</p><p className="text-lg font-bold text-indigo-400">{minERP}-{maxERP}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Risk-Free</p><p className="text-lg font-bold text-green-400">4.25%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Conf.</p><p className="text-lg font-bold text-amber-400">{highConf}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-indigo-400" /> ERP Estimates</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ESTIMATES.map((e) => (
            <div key={e.method} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{e.method}</p>
                <p className="text-xs text-gray-500">{e.source} &middot; {e.period}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{e.erp}% ERP</p>
                  <p className="text-[10px] text-gray-500">Implied {e.impliedReturn}%</p>
                </div>
                <Badge variant={confVariant(e.confidence)}>{e.confidence}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
