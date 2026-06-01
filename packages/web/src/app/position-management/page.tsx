'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { LayoutList } from 'lucide-react';

interface Position {
  symbol: string;
  name: string;
  qty: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  pnl: number;
  pnlPct: number;
  weight: number;
  side: 'long' | 'short';
}

const mockData: Position[] = [
  { symbol: 'AAPL', name: 'Apple Inc', qty: 150, avgCost: 168.50, currentPrice: 185.20, marketValue: 27780, pnl: 2505, pnlPct: 9.91, weight: 12.5, side: 'long' },
  { symbol: 'MSFT', name: 'Microsoft Corp', qty: 80, avgCost: 378.00, currentPrice: 415.80, marketValue: 33264, pnl: 3024, pnlPct: 10.0, weight: 15.0, side: 'long' },
  { symbol: 'TSLA', name: 'Tesla Inc', qty: -30, avgCost: 245.00, currentPrice: 232.50, marketValue: -6975, pnl: 375, pnlPct: 5.10, weight: 3.1, side: 'short' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', qty: 45, avgCost: 820.00, currentPrice: 892.40, marketValue: 40158, pnl: 3258, pnlPct: 8.83, weight: 18.1, side: 'long' },
  { symbol: 'AMZN', name: 'Amazon.com', qty: 60, avgCost: 178.20, currentPrice: 192.50, marketValue: 11550, pnl: 858, pnlPct: 8.02, weight: 5.2, side: 'long' },
  { symbol: 'JPM', name: 'JPMorgan Chase', qty: 100, avgCost: 195.00, currentPrice: 202.80, marketValue: 20280, pnl: 780, pnlPct: 4.0, weight: 9.1, side: 'long' },
];

const summaryCards = [
  { label: 'Total Positions', value: '6', sub: '5 long, 1 short' },
  { label: 'Market Value', value: '$222.1K', sub: 'Net exposure' },
  { label: 'Total P&L', value: '+$10,800', sub: '+7.2% overall' },
  { label: 'Largest Position', value: 'NVDA', sub: '18.1% weight' },
];

export default function PositionManagementPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Position Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and monitor active portfolio positions</p>
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
          <CardTitle>Active Positions</CardTitle>
          <LayoutList className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((p) => (
            <div key={p.symbol} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{p.symbol}</p>
                  <Badge variant={p.side === 'long' ? 'success' : 'danger'}>{p.side}</Badge>
                  <span className="text-xs text-gray-500">{p.name}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Qty: {p.qty} | Avg: ${p.avgCost.toFixed(2)} | Mkt: ${p.currentPrice.toFixed(2)} | Wt: {p.weight}%
                </p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-semibold', p.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {p.pnl >= 0 ? '+' : ''}${p.pnl.toLocaleString()}
                </p>
                <p className={cn('text-[10px]', p.pnlPct >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {p.pnlPct >= 0 ? '+' : ''}{p.pnlPct.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
