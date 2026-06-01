'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Receipt } from 'lucide-react';

interface CommissionEntry {
  date: string;
  symbol: string;
  side: string;
  qty: number;
  commission: number;
  perShare: number;
  fees: number;
  total: number;
  broker: string;
}

const mockData: CommissionEntry[] = [
  { date: '2024-01-15', symbol: 'AAPL', side: 'Buy', qty: 100, commission: 0.00, perShare: 0.000, fees: 0.02, total: 0.02, broker: 'Schwab' },
  { date: '2024-01-15', symbol: 'NVDA', side: 'Buy', qty: 50, commission: 0.00, perShare: 0.000, fees: 0.01, total: 0.01, broker: 'Schwab' },
  { date: '2024-01-14', symbol: 'SPY', side: 'Sell', qty: 200, commission: 0.65, perShare: 0.003, fees: 0.04, total: 0.69, broker: 'IBKR' },
  { date: '2024-01-14', symbol: 'QQQ', side: 'Buy', qty: 150, commission: 0.49, perShare: 0.003, fees: 0.03, total: 0.52, broker: 'IBKR' },
  { date: '2024-01-13', symbol: 'TSLA', side: 'Sell', qty: 75, commission: 0.00, perShare: 0.000, fees: 0.02, total: 0.02, broker: 'Schwab' },
  { date: '2024-01-13', symbol: 'AMZN', side: 'Buy', qty: 60, commission: 0.20, perShare: 0.003, fees: 0.01, total: 0.21, broker: 'IBKR' },
];

const summaryCards = [
  { label: 'MTD Commissions', value: '$1.47', sub: '6 trades' },
  { label: 'YTD Commissions', value: '$42.85', sub: '182 trades' },
  { label: 'Avg Per Trade', value: '$0.24', sub: 'All brokers' },
  { label: 'Commission/Return', value: '0.02%', sub: 'Drag on returns' },
];

export default function CommissionTrackerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Commission Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Track trading commissions and fees across brokers</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summaryCards.map((c) => (
          <Card key={c.label}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="mt-1 text-lg font-bold text-white">{c.value}</p>
            <p className="text-[11px] text-gray-600">{c.sub}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
          <Receipt className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((e, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-600">{e.date}</span>
                  <p className="text-sm font-bold text-white">{e.symbol}</p>
                  <Badge variant={e.side === 'Buy' ? 'success' : 'danger'}>{e.side}</Badge>
                  <Badge variant="default">{e.broker}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Qty: {e.qty} | Commission: ${e.commission.toFixed(2)} | Fees: ${e.fees.toFixed(2)}
                </p>
              </div>
              <p className={cn('text-sm font-semibold', e.total === 0 ? 'text-green-400' : 'text-amber-400')}>
                ${e.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
