'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowDownUp } from 'lucide-react';

interface SlippageRecord {
  symbol: string;
  orderType: string;
  expectedPrice: number;
  executedPrice: number;
  slippage: number;
  slippageBps: number;
  orderSize: number;
  impact: 'minimal' | 'moderate' | 'significant';
}

const mockData: SlippageRecord[] = [
  { symbol: 'AAPL', orderType: 'Market Buy', expectedPrice: 185.00, executedPrice: 185.12, slippage: 0.12, slippageBps: 6.5, orderSize: 5000, impact: 'minimal' },
  { symbol: 'NVDA', orderType: 'Market Buy', expectedPrice: 890.00, executedPrice: 891.85, slippage: 1.85, slippageBps: 20.8, orderSize: 15000, impact: 'moderate' },
  { symbol: 'TSLA', orderType: 'Market Sell', expectedPrice: 235.00, executedPrice: 234.42, slippage: 0.58, slippageBps: 24.7, orderSize: 8000, impact: 'moderate' },
  { symbol: 'MSFT', orderType: 'Limit Buy', expectedPrice: 415.00, executedPrice: 415.00, slippage: 0.00, slippageBps: 0.0, orderSize: 3000, impact: 'minimal' },
  { symbol: 'AMZN', orderType: 'Market Buy', expectedPrice: 192.00, executedPrice: 192.88, slippage: 0.88, slippageBps: 45.8, orderSize: 25000, impact: 'significant' },
  { symbol: 'META', orderType: 'Market Sell', expectedPrice: 505.00, executedPrice: 504.15, slippage: 0.85, slippageBps: 16.8, orderSize: 12000, impact: 'moderate' },
];

const summaryCards = [
  { label: 'Avg Slippage', value: '19.1 bps', sub: 'Per order' },
  { label: 'Total Slippage Cost', value: '$1,842', sub: 'This month' },
  { label: 'Worst Slippage', value: '45.8 bps', sub: 'AMZN market buy' },
  { label: 'Zero Slippage', value: '23%', sub: 'Limit orders' },
];

const impactVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  minimal: 'success', moderate: 'warning', significant: 'danger',
};

export default function SlippageAnalysisPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Slippage Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Track order slippage and market impact costs</p>
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
          <CardTitle>Order Slippage Details</CardTitle>
          <ArrowDownUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((r) => (
            <div key={r.symbol + r.orderType} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{r.symbol}</p>
                  <Badge variant="default">{r.orderType}</Badge>
                  <Badge variant={impactVariant[r.impact]}>{r.impact}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Expected: ${r.expectedPrice.toFixed(2)} | Executed: ${r.executedPrice.toFixed(2)} | Size: ${r.orderSize.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-semibold', r.slippageBps === 0 ? 'text-green-400' : r.slippageBps > 20 ? 'text-red-400' : 'text-amber-400')}>
                  {r.slippageBps.toFixed(1)} bps
                </p>
                <p className="text-[10px] text-gray-600">${r.slippage.toFixed(2)}/share</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
