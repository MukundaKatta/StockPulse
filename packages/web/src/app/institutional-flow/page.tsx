'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Building2 } from 'lucide-react';

interface InstitutionalFlow {
  institution: string;
  ticker: string;
  action: 'Increased' | 'Decreased' | 'New Position' | 'Sold Out';
  shares: string;
  value: string;
  changePercent: number;
  filingDate: string;
}

const FLOWS: InstitutionalFlow[] = [
  { institution: 'Berkshire Hathaway', ticker: 'OXY', action: 'Increased', shares: '248M', value: '$15.2B', changePercent: 8.5, filingDate: 'Q4 2024' },
  { institution: 'Bridgewater Assoc', ticker: 'SPY', action: 'Decreased', shares: '12M', value: '$5.8B', changePercent: -22.0, filingDate: 'Q4 2024' },
  { institution: 'Citadel Advisors', ticker: 'NVDA', action: 'New Position', shares: '45M', value: '$5.9B', changePercent: 100, filingDate: 'Q4 2024' },
  { institution: 'Renaissance Tech', ticker: 'META', action: 'Increased', shares: '8.2M', value: '$3.9B', changePercent: 35.0, filingDate: 'Q4 2024' },
  { institution: 'BlackRock', ticker: 'AAPL', action: 'Decreased', shares: '180M', value: '$33.3B', changePercent: -2.1, filingDate: 'Q4 2024' },
  { institution: 'Vanguard Group', ticker: 'MSFT', action: 'Increased', shares: '350M', value: '$145B', changePercent: 1.2, filingDate: 'Q4 2024' },
  { institution: 'Soros Fund Mgmt', ticker: 'RIVN', action: 'Sold Out', shares: '0', value: '$0', changePercent: -100, filingDate: 'Q4 2024' },
];

const actionVariant = (a: string) => a === 'Increased' || a === 'New Position' ? 'success' : 'danger';

export default function InstitutionalFlowPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Institutional Flow</h1>
        <p className="mt-1 text-sm text-gray-500">Major institutional money movements</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Filings</p>
          <p className="text-lg font-bold text-white">{FLOWS.length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Increased</p>
          <p className="text-lg font-bold text-green-400">{FLOWS.filter(f => f.action === 'Increased' || f.action === 'New Position').length}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Decreased</p>
          <p className="text-lg font-bold text-red-400">{FLOWS.filter(f => f.action === 'Decreased' || f.action === 'Sold Out').length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm"><Building2 className="inline h-4 w-4 mr-1" />13F Filings</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {FLOWS.map((f, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{f.institution}</p>
                <p className="text-xs text-gray-500">{f.ticker} &middot; {f.shares} shares &middot; {f.filingDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{f.value}</p>
                  <p className={cn('text-[10px] font-mono', f.changePercent >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {f.changePercent > 0 ? '+' : ''}{f.changePercent}%
                  </p>
                </div>
                <Badge variant={actionVariant(f.action)}>{f.action}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
