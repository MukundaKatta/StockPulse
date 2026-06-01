'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { GitMerge } from 'lucide-react';

interface MergerDeal {
  acquirer: string;
  target: string;
  value: string;
  announced: string;
  spread: number;
  status: 'Pending' | 'Approved' | 'Under Review';
  expectedClose: string;
}

const DEALS: MergerDeal[] = [
  { acquirer: 'Broadcom', target: 'VMware', value: '$69B', announced: 'May 2022', spread: 0.5, status: 'Approved', expectedClose: 'Q4 2024' },
  { acquirer: 'Exxon', target: 'Pioneer Natural', value: '$60B', announced: 'Oct 2023', spread: 1.2, status: 'Under Review', expectedClose: 'Q2 2025' },
  { acquirer: 'Cisco', target: 'Splunk', value: '$28B', announced: 'Sep 2023', spread: 0.3, status: 'Approved', expectedClose: 'Q1 2025' },
  { acquirer: 'Capital One', target: 'Discover Financial', value: '$35B', announced: 'Feb 2024', spread: 8.5, status: 'Under Review', expectedClose: 'Q1 2025' },
  { acquirer: 'Synopsys', target: 'Ansys', value: '$35B', announced: 'Jan 2024', spread: 5.2, status: 'Pending', expectedClose: 'H1 2025' },
  { acquirer: 'Mars', target: 'Kellanova', value: '$36B', announced: 'Aug 2024', spread: 1.8, status: 'Pending', expectedClose: 'H1 2025' },
];

const statusVariant = (s: string) => s === 'Approved' ? 'success' : s === 'Pending' ? 'warning' : 'info';

export default function MergerTrackerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">M&A Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">Active merger and acquisition deals</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Active Deals</p>
          <p className="text-lg font-bold text-white">{DEALS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Avg Spread</p>
          <p className="text-lg font-bold text-amber-400">{(DEALS.reduce((s, d) => s + d.spread, 0) / DEALS.length).toFixed(1)}%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Approved</p>
          <p className="text-lg font-bold text-green-400">{DEALS.filter(d => d.status === 'Approved').length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><GitMerge className="inline h-4 w-4 mr-1" />Deal Pipeline</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {DEALS.map((d) => (
            <div key={d.target} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{d.acquirer} → {d.target}</p>
                <p className="text-xs text-gray-500">{d.value} &middot; {d.announced} &middot; Close {d.expectedClose}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className={cn('text-sm font-mono', d.spread > 5 ? 'text-amber-400' : 'text-green-400')}>{d.spread}% spread</p>
                <Badge variant={statusVariant(d.status)}>{d.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
