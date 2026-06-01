'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Rocket } from 'lucide-react';

interface IpoEvent {
  company: string;
  ticker: string;
  date: string;
  priceRange: string;
  valuation: string;
  sector: string;
  status: 'Upcoming' | 'Priced' | 'Filed';
}

const IPOS: IpoEvent[] = [
  { company: 'Stripe Inc', ticker: 'STRP', date: 'Q1 2025', priceRange: '$55-65', valuation: '$70B', sector: 'Fintech', status: 'Filed' },
  { company: 'Reddit Inc', ticker: 'RDDT', date: 'Mar 2025', priceRange: '$31-34', valuation: '$6.5B', sector: 'Social', status: 'Priced' },
  { company: 'Databricks', ticker: 'DATA', date: 'Q2 2025', priceRange: 'TBD', valuation: '$43B', sector: 'Cloud', status: 'Filed' },
  { company: 'Shein Group', ticker: 'SHEI', date: 'Q2 2025', priceRange: 'TBD', valuation: '$66B', sector: 'E-Commerce', status: 'Filed' },
  { company: 'Klarna', ticker: 'KLAR', date: 'Q1 2025', priceRange: '$40-48', valuation: '$15B', sector: 'Fintech', status: 'Upcoming' },
  { company: 'Cerebras Systems', ticker: 'CBRS', date: 'Q1 2025', priceRange: '$28-32', valuation: '$8B', sector: 'AI/Chips', status: 'Upcoming' },
];

const statusVariant = (s: string) => s === 'Priced' ? 'success' : s === 'Upcoming' ? 'warning' : 'info';

export default function IpoCalendarPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">IPO Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">Upcoming and recent IPOs</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Upcoming</p>
          <p className="text-lg font-bold text-white">{IPOS.filter(i => i.status === 'Upcoming').length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Filed</p>
          <p className="text-lg font-bold text-indigo-400">{IPOS.filter(i => i.status === 'Filed').length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Priced</p>
          <p className="text-lg font-bold text-green-400">{IPOS.filter(i => i.status === 'Priced').length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Rocket className="inline h-4 w-4 mr-1" />IPO Pipeline</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {IPOS.map((ipo) => (
            <div key={ipo.ticker} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{ipo.company} <span className="text-gray-500">{ipo.ticker}</span></p>
                <p className="text-xs text-gray-500">{ipo.date} &middot; {ipo.priceRange} &middot; {ipo.sector}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-mono text-white">{ipo.valuation}</p>
                <Badge variant={statusVariant(ipo.status)}>{ipo.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
