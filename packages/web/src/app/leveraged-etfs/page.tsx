'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Zap } from 'lucide-react';

interface LeveragedETF {
  ticker: string;
  name: string;
  underlying: string;
  leverage: string;
  price: number;
  dayChange: number;
  trackingError: number;
  aum: string;
  expenseRatio: number;
  risk: 'High' | 'Very High' | 'Extreme';
}

const ETFS: LeveragedETF[] = [
  { ticker: 'TQQQ', name: 'ProShares UltraPro QQQ', underlying: 'Nasdaq 100', leverage: '3x', price: 72.50, dayChange: 3.2, trackingError: 0.08, aum: '$22.5B', expenseRatio: 0.88, risk: 'Extreme' },
  { ticker: 'SPXL', name: 'Direxion Daily S&P 3x', underlying: 'S&P 500', leverage: '3x', price: 148.20, dayChange: 2.8, trackingError: 0.05, aum: '$4.2B', expenseRatio: 0.97, risk: 'Extreme' },
  { ticker: 'QLD', name: 'ProShares Ultra QQQ', underlying: 'Nasdaq 100', leverage: '2x', price: 98.40, dayChange: 2.1, trackingError: 0.04, aum: '$7.8B', expenseRatio: 0.95, risk: 'Very High' },
  { ticker: 'SSO', name: 'ProShares Ultra S&P 500', underlying: 'S&P 500', leverage: '2x', price: 82.30, dayChange: 1.8, trackingError: 0.03, aum: '$3.5B', expenseRatio: 0.91, risk: 'Very High' },
  { ticker: 'SOXL', name: 'Direxion Semis Bull 3x', underlying: 'Semiconductors', leverage: '3x', price: 35.80, dayChange: 4.5, trackingError: 0.12, aum: '$9.8B', expenseRatio: 0.76, risk: 'Extreme' },
  { ticker: 'UPRO', name: 'ProShares UltraPro S&P', underlying: 'S&P 500', leverage: '3x', price: 78.90, dayChange: 2.9, trackingError: 0.06, aum: '$3.8B', expenseRatio: 0.91, risk: 'Extreme' },
  { ticker: 'TNA', name: 'Direxion Small Cap 3x', underlying: 'Russell 2000', leverage: '3x', price: 42.60, dayChange: 3.8, trackingError: 0.15, aum: '$1.8B', expenseRatio: 1.09, risk: 'Extreme' },
  { ticker: 'TECL', name: 'Direxion Tech Bull 3x', underlying: 'Tech Select', leverage: '3x', price: 68.40, dayChange: 3.4, trackingError: 0.10, aum: '$2.5B', expenseRatio: 0.94, risk: 'Extreme' },
];

const riskVariant = (r: string) => r === 'High' ? 'warning' : r === 'Very High' ? 'danger' : 'danger';

export default function LeveragedETFsPage() {
  const avgChange = ETFS.reduce((s, e) => s + e.dayChange, 0) / ETFS.length;
  const avgError = ETFS.reduce((s, e) => s + e.trackingError, 0) / ETFS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Leveraged ETFs</h1>
        <p className="mt-1 text-sm text-gray-500">Leveraged ETF comparison and tracking analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">ETFs</p><p className="text-lg font-bold text-white">{ETFS.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Day Change</p><p className="text-lg font-bold text-green-400">+{avgChange.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Track Error</p><p className="text-lg font-bold text-indigo-400">{avgError.toFixed(2)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">3x Leveraged</p><p className="text-lg font-bold text-red-400">{ETFS.filter(e => e.leverage === '3x').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-indigo-400" /> Leveraged ETF Comparison</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ETFS.map((e) => (
            <div key={e.ticker} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-28">
                <p className="text-xs font-bold text-white">{e.ticker}</p>
                <p className="text-[10px] text-gray-500 truncate">{e.name}</p>
              </div>
              <span className="text-[10px] text-indigo-400 w-8">{e.leverage}</span>
              <span className="text-xs font-mono text-white w-14">{formatCurrency(e.price)}</span>
              <span className={cn('text-xs font-mono w-12', e.dayChange >= 0 ? 'text-green-400' : 'text-red-400')}>+{e.dayChange}%</span>
              <span className="text-[10px] text-gray-400 w-14">Err: {e.trackingError}%</span>
              <span className="text-[10px] text-gray-500 w-10">{e.aum}</span>
              <Badge variant={riskVariant(e.risk)} className="ml-auto">{e.risk}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
