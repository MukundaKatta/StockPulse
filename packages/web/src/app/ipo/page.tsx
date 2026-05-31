'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rocket, Calendar, DollarSign, Building2 } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/formatters';

interface IPOEvent {
  symbol: string;
  company: string;
  exchange: string;
  priceRange: string;
  shares: string;
  date: string;
  status: 'upcoming' | 'today' | 'priced' | 'withdrawn';
  sector: string;
}

const MOCK_IPOS: IPOEvent[] = [
  { symbol: 'RDDT', company: 'Reddit Inc', exchange: 'NYSE', priceRange: '$31-$34', shares: '22M', date: '2026-06-02', status: 'upcoming', sector: 'Technology' },
  { symbol: 'SHEIN', company: 'Shein Group', exchange: 'NYSE', priceRange: '$60-$70', shares: '50M', date: '2026-06-05', status: 'upcoming', sector: 'Consumer' },
  { symbol: 'STRP', company: 'Stripe Inc', exchange: 'NASDAQ', priceRange: '$65-$75', shares: '40M', date: '2026-06-10', status: 'upcoming', sector: 'Fintech' },
  { symbol: 'DBRX', company: 'Databricks Inc', exchange: 'NASDAQ', priceRange: '$120-$140', shares: '30M', date: '2026-06-12', status: 'upcoming', sector: 'Technology' },
  { symbol: 'KLRN', company: 'Klarna Bank AB', exchange: 'NYSE', priceRange: '$45-$55', shares: '35M', date: '2026-06-15', status: 'upcoming', sector: 'Fintech' },
];

const statusColors: Record<string, string> = {
  upcoming: 'info',
  today: 'success',
  priced: 'warning',
  withdrawn: 'danger',
};

export default function IPOPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'priced'>('all');

  const filtered = filter === 'all' ? MOCK_IPOS : MOCK_IPOS.filter((ipo) => ipo.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">IPO Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">Track upcoming and recent initial public offerings</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'upcoming', 'priced'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'secondary'}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
              <Rocket className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{MOCK_IPOS.filter((i) => i.status === 'upcoming').length}</p>
              <p className="text-[10px] text-gray-500">Upcoming</p>
            </div>
          </div>
        </Card>
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
              <Calendar className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{MOCK_IPOS.filter((i) => i.status === 'today').length}</p>
              <p className="text-[10px] text-gray-500">Today</p>
            </div>
          </div>
        </Card>
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <DollarSign className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{MOCK_IPOS.filter((i) => i.status === 'priced').length}</p>
              <p className="text-[10px] text-gray-500">Priced</p>
            </div>
          </div>
        </Card>
        <Card className="!p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
              <Building2 className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{MOCK_IPOS.length}</p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>IPO Listings</CardTitle>
        </CardHeader>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Rocket className="mx-auto h-8 w-8 text-gray-600" />
            <p className="mt-3 text-sm text-gray-500">No IPOs found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Company</th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Exchange</th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Sector</th>
                  <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Price Range</th>
                  <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Shares</th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Date</th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ipo) => (
                  <tr key={ipo.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-3 py-3">
                      <div>
                        <span className="font-mono font-bold text-indigo-400">{ipo.symbol}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{ipo.company}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center text-gray-400">{ipo.exchange}</td>
                    <td className="px-3 py-3 text-center text-gray-400 text-xs">{ipo.sector}</td>
                    <td className="px-3 py-3 text-right font-mono text-gray-300">{ipo.priceRange}</td>
                    <td className="px-3 py-3 text-right font-mono text-gray-400">{ipo.shares}</td>
                    <td className="px-3 py-3 text-center text-gray-400">
                      {new Date(ipo.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Badge variant={statusColors[ipo.status] as 'info' | 'success' | 'warning' | 'danger'}>
                        {ipo.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
