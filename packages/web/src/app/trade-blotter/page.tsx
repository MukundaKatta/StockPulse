'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ScrollText } from 'lucide-react';

interface Trade {
  id: string;
  time: string;
  symbol: string;
  side: 'buy' | 'sell';
  qty: number;
  price: number;
  total: number;
  status: 'filled' | 'partial' | 'pending' | 'cancelled';
  venue: string;
}

const mockData: Trade[] = [
  { id: 'T001', time: '09:31:02', symbol: 'AAPL', side: 'buy', qty: 100, price: 185.20, total: 18520, status: 'filled', venue: 'NYSE' },
  { id: 'T002', time: '09:45:18', symbol: 'TSLA', side: 'sell', qty: 50, price: 232.50, total: 11625, status: 'filled', venue: 'NASDAQ' },
  { id: 'T003', time: '10:12:44', symbol: 'NVDA', side: 'buy', qty: 25, price: 892.10, total: 22302.5, status: 'partial', venue: 'ARCA' },
  { id: 'T004', time: '10:30:00', symbol: 'MSFT', side: 'buy', qty: 75, price: 415.80, total: 31185, status: 'pending', venue: 'NYSE' },
  { id: 'T005', time: '11:05:33', symbol: 'AMZN', side: 'sell', qty: 30, price: 192.50, total: 5775, status: 'filled', venue: 'NASDAQ' },
  { id: 'T006', time: '11:22:15', symbol: 'META', side: 'buy', qty: 40, price: 505.20, total: 20208, status: 'cancelled', venue: 'ARCA' },
];

const summaryCards = [
  { label: 'Trades Today', value: '6', sub: '4 filled, 1 partial' },
  { label: 'Volume Traded', value: '$109.6K', sub: 'Gross notional' },
  { label: 'Buy Volume', value: '$92.2K', sub: '4 orders' },
  { label: 'Sell Volume', value: '$17.4K', sub: '2 orders' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  filled: 'success', partial: 'warning', pending: 'info', cancelled: 'danger',
};

export default function TradeBlotterPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Trade Blotter</h1>
        <p className="mt-1 text-sm text-gray-500">Real-time view of all trading activity</p>
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
          <CardTitle>Recent Trades</CardTitle>
          <ScrollText className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-600">{t.time}</span>
                  <p className="text-sm font-bold text-white">{t.symbol}</p>
                  <Badge variant={t.side === 'buy' ? 'success' : 'danger'}>{t.side}</Badge>
                  <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Qty: {t.qty} | Price: ${t.price.toFixed(2)} | Venue: {t.venue}
                </p>
              </div>
              <p className={cn('text-sm font-semibold text-white')}>${t.total.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
