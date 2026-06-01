'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { DollarSign } from 'lucide-react';

interface BuyingPowerBreakdown {
  category: string;
  amount: number;
  description: string;
  type: 'available' | 'used' | 'reserved';
}

const mockData: BuyingPowerBreakdown[] = [
  { category: 'Cash Balance', amount: 45000, description: 'Settled cash in account', type: 'available' },
  { category: 'Margin Buying Power', amount: 142500, description: '2x leverage on equity positions', type: 'available' },
  { category: 'Day Trade Buying Power', amount: 285000, description: '4x for pattern day traders', type: 'available' },
  { category: 'Options Buying Power', amount: 95000, description: 'Available for options strategies', type: 'available' },
  { category: 'Pending Settlements', amount: 12500, description: 'T+1 settlements in progress', type: 'reserved' },
  { category: 'Margin Used', amount: 142500, description: 'Currently borrowed funds', type: 'used' },
  { category: 'Open Order Reserves', amount: 8200, description: 'Reserved for pending orders', type: 'reserved' },
];

const summaryCards = [
  { label: 'Cash Buying Power', value: '$45.0K', sub: 'No leverage' },
  { label: 'Margin Buying Power', value: '$142.5K', sub: '2x leverage' },
  { label: 'Day Trade Power', value: '$285.0K', sub: '4x leverage' },
  { label: 'Options Power', value: '$95.0K', sub: 'For options' },
];

const typeVariant: Record<string, 'success' | 'danger' | 'warning'> = {
  available: 'success', used: 'danger', reserved: 'warning',
};

export default function BuyingPowerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Buying Power Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">View available buying power across account types</p>
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
          <CardTitle>Buying Power Breakdown</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((b) => (
            <div key={b.category} className="flex items-center justify-between rounded-lg border border-white/[0.06] p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{b.category}</p>
                  <Badge variant={typeVariant[b.type]}>{b.type}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">{b.description}</p>
              </div>
              <p className={cn('text-sm font-semibold', b.type === 'available' ? 'text-green-400' : b.type === 'used' ? 'text-red-400' : 'text-amber-400')}>
                ${b.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
