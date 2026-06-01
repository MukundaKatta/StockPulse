'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatLargeNumber } from '@/lib/formatters';
import { Building2 } from 'lucide-react';

interface Holding {
  institution: string;
  shares: number;
  value: number;
  changePct: number;
  pctPortfolio: number;
  filingDate: string;
}

const HOLDINGS: Holding[] = [
  { institution: 'Vanguard Group', shares: 1305200000, value: 242.8e9, changePct: 0.5, pctPortfolio: 5.8, filingDate: '2023-12-31' },
  { institution: 'BlackRock Inc', shares: 1020400000, value: 189.8e9, changePct: -0.2, pctPortfolio: 4.2, filingDate: '2023-12-31' },
  { institution: 'Berkshire Hathaway', shares: 905560000, value: 168.5e9, changePct: -1.0, pctPortfolio: 48.5, filingDate: '2023-12-31' },
  { institution: 'State Street', shares: 582400000, value: 108.3e9, changePct: 0.8, pctPortfolio: 3.8, filingDate: '2023-12-31' },
  { institution: 'FMR (Fidelity)', shares: 352800000, value: 65.6e9, changePct: 2.5, pctPortfolio: 2.1, filingDate: '2023-12-31' },
  { institution: 'Geode Capital', shares: 278500000, value: 51.8e9, changePct: 1.2, pctPortfolio: 5.2, filingDate: '2023-12-31' },
  { institution: 'Morgan Stanley', shares: 218400000, value: 40.6e9, changePct: -3.5, pctPortfolio: 1.5, filingDate: '2023-12-31' },
  { institution: 'JP Morgan Chase', shares: 185200000, value: 34.5e9, changePct: 4.2, pctPortfolio: 1.2, filingDate: '2023-12-31' },
  { institution: 'Northern Trust', shares: 165800000, value: 30.8e9, changePct: 0.3, pctPortfolio: 2.8, filingDate: '2023-12-31' },
  { institution: 'Bank of America', shares: 142500000, value: 26.5e9, changePct: -1.8, pctPortfolio: 0.9, filingDate: '2023-12-31' },
];

export default function InstitutionalHoldingsPage() {
  const totalShares = HOLDINGS.reduce((s, h) => s + h.shares, 0);
  const totalValue = HOLDINGS.reduce((s, h) => s + h.value, 0);
  const netBuyers = HOLDINGS.filter((h) => h.changePct > 0).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Institutional Holdings</h1>
        <p className="mt-1 text-sm text-gray-500">AAPL top institutional shareholders (13F filings)</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Total Value</p>
          <p className="text-lg font-bold text-white">{formatLargeNumber(totalValue)}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Institutions</p>
          <p className="text-lg font-bold text-indigo-400">{HOLDINGS.length}</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase">Net Buyers</p>
          <p className="text-lg font-bold text-green-400">{netBuyers}/{HOLDINGS.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-indigo-400" /> Top Holders
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {HOLDINGS.map((h, i) => (
            <div key={h.institution} className="flex items-center gap-3 py-2 px-4">
              <span className="text-xs font-mono text-gray-500 w-6">#{i + 1}</span>
              <span className="text-xs text-white w-32 truncate">{h.institution}</span>
              <span className="text-xs font-mono text-gray-400 w-16">{formatLargeNumber(h.shares)}</span>
              <span className="text-xs font-mono text-indigo-400 w-16">{formatLargeNumber(h.value)}</span>
              <span className={cn('text-xs font-mono w-14', h.changePct >= 0 ? 'text-green-400' : 'text-red-400')}>
                {h.changePct >= 0 ? '+' : ''}{h.changePct.toFixed(1)}%
              </span>
              <span className="text-[10px] text-gray-500 w-14">{h.pctPortfolio.toFixed(1)}% port</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
