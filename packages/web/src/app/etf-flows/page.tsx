'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { ArrowDownUp } from 'lucide-react';

interface EtfFlow {
  ticker: string;
  name: string;
  dailyFlow: number;
  weeklyFlow: number;
  monthlyFlow: number;
  aum: string;
}

const FLOWS: EtfFlow[] = [
  { ticker: 'SPY', name: 'SPDR S&P 500', dailyFlow: 1200, weeklyFlow: 4500, monthlyFlow: 12000, aum: '$510B' },
  { ticker: 'QQQ', name: 'Invesco Nasdaq 100', dailyFlow: -800, weeklyFlow: -2100, monthlyFlow: 3200, aum: '$250B' },
  { ticker: 'IVV', name: 'iShares Core S&P 500', dailyFlow: 650, weeklyFlow: 2800, monthlyFlow: 9500, aum: '$430B' },
  { ticker: 'VTI', name: 'Vanguard Total Market', dailyFlow: 320, weeklyFlow: 1200, monthlyFlow: 4800, aum: '$380B' },
  { ticker: 'IWM', name: 'iShares Russell 2000', dailyFlow: -450, weeklyFlow: -1800, monthlyFlow: -3200, aum: '$60B' },
  { ticker: 'TLT', name: 'iShares 20+ Yr Treasury', dailyFlow: 280, weeklyFlow: 950, monthlyFlow: 2100, aum: '$40B' },
  { ticker: 'HYG', name: 'iShares High Yield Corp', dailyFlow: -190, weeklyFlow: -600, monthlyFlow: -800, aum: '$18B' },
];

const fmtFlow = (v: number) => `${v >= 0 ? '+' : ''}$${Math.abs(v).toLocaleString()}M`;

export default function EtfFlowsPage() {
  const totalDaily = FLOWS.reduce((s, f) => s + f.dailyFlow, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">ETF Flows</h1>
        <p className="mt-1 text-sm text-gray-500">Track inflows and outflows across ETFs</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Daily Net</p>
          <p className={cn('text-lg font-bold', totalDaily >= 0 ? 'text-green-400' : 'text-red-400')}>{fmtFlow(totalDaily)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Top Inflow</p>
          <p className="text-lg font-bold text-green-400">{fmtFlow(Math.max(...FLOWS.map(f => f.dailyFlow)))}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Top Outflow</p>
          <p className="text-lg font-bold text-red-400">{fmtFlow(Math.min(...FLOWS.map(f => f.dailyFlow)))}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><ArrowDownUp className="inline h-4 w-4 mr-1" />ETF Fund Flows</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {FLOWS.map((f) => (
            <div key={f.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{f.ticker}</p>
                <p className="text-xs text-gray-500">{f.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', f.dailyFlow >= 0 ? 'text-green-400' : 'text-red-400')}>{fmtFlow(f.dailyFlow)}</p>
                  <p className="text-[10px] text-gray-500">30d: {fmtFlow(f.monthlyFlow)}</p>
                </div>
                <Badge variant={f.dailyFlow >= 0 ? 'success' : 'danger'}>{f.dailyFlow >= 0 ? 'Inflow' : 'Outflow'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
