'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { MapPin } from 'lucide-react';

interface AssetLocationItem {
  asset: string;
  taxable: number;
  traditional: number;
  roth: number;
  optimalAccount: string;
  taxEfficiency: number;
  annualSavings: number;
  status: 'optimal' | 'suboptimal' | 'needs-review';
}

const mockData: AssetLocationItem[] = [
  { asset: 'US Stock Index', taxable: 60, traditional: 20, roth: 20, optimalAccount: 'Taxable', taxEfficiency: 92, annualSavings: 0, status: 'optimal' },
  { asset: 'REITs', taxable: 0, traditional: 100, roth: 0, optimalAccount: 'Traditional', taxEfficiency: 95, annualSavings: 1200, status: 'optimal' },
  { asset: 'Corporate Bonds', taxable: 30, traditional: 70, roth: 0, optimalAccount: 'Traditional', taxEfficiency: 78, annualSavings: 450, status: 'suboptimal' },
  { asset: 'Growth Stocks', taxable: 40, traditional: 0, roth: 60, optimalAccount: 'Roth', taxEfficiency: 88, annualSavings: 380, status: 'optimal' },
  { asset: 'International Equity', taxable: 80, traditional: 10, roth: 10, optimalAccount: 'Taxable', taxEfficiency: 90, annualSavings: 250, status: 'optimal' },
  { asset: 'High-Yield Bonds', taxable: 50, traditional: 50, roth: 0, optimalAccount: 'Traditional', taxEfficiency: 62, annualSavings: 820, status: 'needs-review' },
];

const summaryCards = [
  { label: 'Tax Savings', value: '$3,100/yr', sub: 'From optimal location' },
  { label: 'Avg Efficiency', value: '84%', sub: 'Tax efficiency score' },
  { label: 'Accounts', value: '3', sub: 'Taxable, Trad, Roth' },
  { label: 'Needs Review', value: '1', sub: 'Asset to relocate' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  optimal: 'success', suboptimal: 'warning', 'needs-review': 'danger',
};

export default function AssetLocationPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Asset Location</h1>
        <p className="mt-1 text-sm text-gray-500">Optimize tax efficiency by placing assets in the right accounts</p>
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
          <CardTitle>Asset Placement</CardTitle>
          <MapPin className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <div className="space-y-3">
          {mockData.map((a) => (
            <div key={a.asset} className="rounded-lg border border-white/[0.06] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{a.asset}</p>
                  <Badge variant={statusVariant[a.status]}>{a.status}</Badge>
                </div>
                <p className={cn('text-sm font-semibold', a.taxEfficiency >= 85 ? 'text-green-400' : a.taxEfficiency >= 70 ? 'text-amber-400' : 'text-red-400')}>
                  {a.taxEfficiency}%
                </p>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                <div><span className="text-gray-500">Taxable</span><p className="font-medium text-white">{a.taxable}%</p></div>
                <div><span className="text-gray-500">Traditional</span><p className="font-medium text-white">{a.traditional}%</p></div>
                <div><span className="text-gray-500">Roth</span><p className="font-medium text-white">{a.roth}%</p></div>
                <div><span className="text-gray-500">Savings</span><p className="font-medium text-green-400">${a.annualSavings.toLocaleString()}/yr</p></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
