'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

interface PriceTargetRevision {
  analyst: string;
  firm: string;
  ticker: string;
  oldTarget: number;
  newTarget: number;
  action: 'Raised' | 'Lowered' | 'Initiated';
  date: string;
}

const REVISIONS: PriceTargetRevision[] = [
  { analyst: 'Dan Ives', firm: 'Wedbush', ticker: 'AAPL', oldTarget: 200, newTarget: 225, action: 'Raised', date: 'Jan 15' },
  { analyst: 'Mark Lipacis', firm: 'Evercore', ticker: 'NVDA', oldTarget: 150, newTarget: 175, action: 'Raised', date: 'Jan 14' },
  { analyst: 'Brent Thill', firm: 'Jefferies', ticker: 'MSFT', oldTarget: 450, newTarget: 500, action: 'Raised', date: 'Jan 14' },
  { analyst: 'Adam Jonas', firm: 'Morgan Stanley', ticker: 'TSLA', oldTarget: 310, newTarget: 280, action: 'Lowered', date: 'Jan 13' },
  { analyst: 'Brian Nowak', firm: 'Morgan Stanley', ticker: 'AMZN', oldTarget: 210, newTarget: 240, action: 'Raised', date: 'Jan 12' },
  { analyst: 'Justin Post', firm: 'BofA', ticker: 'META', oldTarget: 420, newTarget: 450, action: 'Raised', date: 'Jan 11' },
  { analyst: 'Gil Luria', firm: 'DA Davidson', ticker: 'PLTR', oldTarget: 0, newTarget: 35, action: 'Initiated', date: 'Jan 10' },
];

const actionVariant = (a: string) => a === 'Raised' ? 'success' : a === 'Lowered' ? 'danger' : 'info';

export default function PriceTargetHistoryPage() {
  const raised = REVISIONS.filter(r => r.action === 'Raised').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Price Target History</h1>
        <p className="mt-1 text-sm text-gray-500">Recent price target revisions</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Revisions</p>
          <p className="text-lg font-bold text-white">{REVISIONS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Raised</p>
          <p className="text-lg font-bold text-green-400">{raised}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Lowered</p>
          <p className="text-lg font-bold text-red-400">{REVISIONS.filter(r => r.action === 'Lowered').length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Target className="inline h-4 w-4 mr-1" />Recent Revisions</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {REVISIONS.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{r.ticker} <span className="text-gray-500">&middot; {r.firm}</span></p>
                <p className="text-xs text-gray-500">{r.analyst} &middot; {r.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  {r.action !== 'Initiated' ? (
                    <p className="text-sm font-mono text-white">${r.oldTarget} → ${r.newTarget}</p>
                  ) : (
                    <p className="text-sm font-mono text-white">New ${r.newTarget}</p>
                  )}
                </div>
                <Badge variant={actionVariant(r.action)}>{r.action}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
