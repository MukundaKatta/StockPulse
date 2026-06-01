'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Eye } from 'lucide-react';

interface HedgeFundPosition {
  fund: string;
  manager: string;
  topHolding: string;
  aum: string;
  returnYTD: number;
  topWeight: number;
  change: 'New Position' | 'Increased' | 'Decreased' | 'Unchanged';
  filingDate: string;
}

const POSITIONS: HedgeFundPosition[] = [
  { fund: 'Bridgewater Associates', manager: 'Ray Dalio', topHolding: 'SPY', aum: '$124B', returnYTD: 8.5, topWeight: 12.4, change: 'Increased', filingDate: 'Mar 2024' },
  { fund: 'Renaissance Technologies', manager: 'Jim Simons', topHolding: 'NVDA', aum: '$68B', returnYTD: 22.4, topWeight: 8.2, change: 'New Position', filingDate: 'Mar 2024' },
  { fund: 'Citadel LLC', manager: 'Ken Griffin', topHolding: 'META', aum: '$58B', returnYTD: 15.8, topWeight: 6.5, change: 'Increased', filingDate: 'Mar 2024' },
  { fund: 'DE Shaw & Co', manager: 'David Shaw', topHolding: 'AAPL', aum: '$45B', returnYTD: 12.1, topWeight: 5.8, change: 'Unchanged', filingDate: 'Mar 2024' },
  { fund: 'Two Sigma', manager: 'John Overdeck', topHolding: 'MSFT', aum: '$38B', returnYTD: 10.2, topWeight: 7.1, change: 'Decreased', filingDate: 'Mar 2024' },
  { fund: 'Millennium Mgmt', manager: 'Israel Englander', topHolding: 'GOOGL', aum: '$52B', returnYTD: 14.5, topWeight: 4.8, change: 'Increased', filingDate: 'Mar 2024' },
  { fund: 'Point72', manager: 'Steve Cohen', topHolding: 'AMZN', aum: '$28B', returnYTD: 9.8, topWeight: 6.2, change: 'New Position', filingDate: 'Mar 2024' },
  { fund: 'Baupost Group', manager: 'Seth Klarman', topHolding: 'LBRDA', aum: '$25B', returnYTD: 5.2, topWeight: 15.8, change: 'Unchanged', filingDate: 'Mar 2024' },
];

const changeVariant = (c: string) => c === 'New Position' ? 'success' : c === 'Increased' ? 'info' : c === 'Decreased' ? 'danger' : 'default';

export default function HedgeFundTrackerPage() {
  const avgReturn = POSITIONS.reduce((s, p) => s + p.returnYTD, 0) / POSITIONS.length;
  const newPositions = POSITIONS.filter(p => p.change === 'New Position').length;
  const increased = POSITIONS.filter(p => p.change === 'Increased').length;
  const totalFunds = POSITIONS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Hedge Fund Tracker</h1>
        <p className="mt-1 text-sm text-gray-500">13F filings and top hedge fund positions</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Funds Tracked</p><p className="text-lg font-bold text-white">{totalFunds}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Return YTD</p><p className="text-lg font-bold text-green-400">{avgReturn.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">New Positions</p><p className="text-lg font-bold text-indigo-400">{newPositions}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Increased</p><p className="text-lg font-bold text-amber-400">{increased}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Eye className="h-4 w-4 text-indigo-400" /> Fund Positions</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {POSITIONS.map((p) => (
            <div key={p.fund} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{p.fund}</p>
                <p className="text-xs text-gray-500">{p.manager} &middot; AUM {p.aum} &middot; Top: {p.topHolding} ({p.topWeight}%)</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn('text-sm font-mono', p.returnYTD >= 0 ? 'text-green-400' : 'text-red-400')}>+{p.returnYTD}% YTD</p>
                  <p className="text-[10px] text-gray-500">{p.filingDate}</p>
                </div>
                <Badge variant={changeVariant(p.change)}>{p.change}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
