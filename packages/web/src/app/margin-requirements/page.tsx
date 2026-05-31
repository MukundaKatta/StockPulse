'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Lock } from 'lucide-react';

interface Position {
  symbol: string;
  shares: number;
  price: number;
  marginReq: number;
  maintenanceReq: number;
  marginUsed: number;
  type: 'Long' | 'Short';
}

const POSITIONS: Position[] = [
  { symbol: 'AAPL', shares: 200, price: 186.05, marginReq: 50, maintenanceReq: 25, marginUsed: 18605, type: 'Long' },
  { symbol: 'NVDA', shares: 50, price: 878.35, marginReq: 50, maintenanceReq: 30, marginUsed: 21958.75, type: 'Long' },
  { symbol: 'TSLA', shares: -100, price: 188.70, marginReq: 75, maintenanceReq: 40, marginUsed: 14152.50, type: 'Short' },
  { symbol: 'META', shares: 80, price: 484.10, marginReq: 50, maintenanceReq: 25, marginUsed: 19364, type: 'Long' },
  { symbol: 'AMD', shares: 150, price: 177.52, marginReq: 50, maintenanceReq: 30, marginUsed: 13314, type: 'Long' },
  { symbol: 'GOOGL', shares: 120, price: 141.80, marginReq: 50, maintenanceReq: 25, marginUsed: 8508, type: 'Long' },
];

export default function MarginRequirementsPage() {
  const totalMarginUsed = POSITIONS.reduce((s, p) => s + p.marginUsed, 0);
  const accountEquity = 250000;
  const buyingPower = accountEquity * 2 - totalMarginUsed;
  const marginUtil = (totalMarginUsed / accountEquity) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Margin Requirements</h1>
        <p className="mt-1 text-sm text-gray-500">Position margin usage and buying power</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Equity</p>
          <p className="text-lg font-bold text-white">{formatCurrency(accountEquity)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Margin Used</p>
          <p className="text-lg font-bold text-yellow-400">{formatCurrency(totalMarginUsed)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Buying Power</p>
          <p className="text-lg font-bold text-green-400">{formatCurrency(buyingPower)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-[10px] text-gray-500 uppercase">Utilization</p>
          <p className={cn('text-lg font-bold', marginUtil > 70 ? 'text-red-400' : marginUtil > 50 ? 'text-yellow-400' : 'text-green-400')}>
            {marginUtil.toFixed(1)}%
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Lock className="h-4 w-4 text-indigo-400" /> Position Margins
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {POSITIONS.map((p) => (
            <div key={p.symbol} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-bold text-white w-12">{p.symbol}</span>
              <Badge variant={p.type === 'Long' ? 'success' : 'danger'}>{p.type}</Badge>
              <span className="text-xs font-mono text-gray-400 w-14">{Math.abs(p.shares)} sh</span>
              <span className="text-xs font-mono text-white w-16">${p.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-gray-400 w-14">Init: {p.marginReq}%</span>
              <span className="text-xs font-mono text-gray-400 w-14">Maint: {p.maintenanceReq}%</span>
              <span className="text-xs font-mono text-yellow-400 ml-auto">{formatCurrency(p.marginUsed)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
