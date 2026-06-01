'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Leaf } from 'lucide-react';

interface CleanEnergyStock {
  ticker: string;
  company: string;
  price: number;
  change: number;
  marketCap: string;
  subsector: string;
  esgScore: number;
  outlook: 'Strong' | 'Moderate' | 'Weak';
}

const STOCKS: CleanEnergyStock[] = [
  { ticker: 'ENPH', company: 'Enphase Energy', price: 128.40, change: 3.2, marketCap: '$17.4B', subsector: 'Solar', esgScore: 88, outlook: 'Strong' },
  { ticker: 'SEDG', company: 'SolarEdge Tech', price: 72.50, change: -2.8, marketCap: '$4.1B', subsector: 'Solar', esgScore: 82, outlook: 'Weak' },
  { ticker: 'FSLR', company: 'First Solar', price: 185.20, change: 5.4, marketCap: '$19.8B', subsector: 'Solar', esgScore: 90, outlook: 'Strong' },
  { ticker: 'NEE', company: 'NextEra Energy', price: 72.80, change: 1.2, marketCap: '$149.5B', subsector: 'Utilities', esgScore: 85, outlook: 'Strong' },
  { ticker: 'PLUG', company: 'Plug Power', price: 4.25, change: -5.8, marketCap: '$3.2B', subsector: 'Hydrogen', esgScore: 72, outlook: 'Weak' },
  { ticker: 'BE', company: 'Bloom Energy', price: 14.80, change: 2.1, marketCap: '$3.4B', subsector: 'Fuel Cells', esgScore: 78, outlook: 'Moderate' },
  { ticker: 'RUN', company: 'Sunrun Inc', price: 18.50, change: -1.5, marketCap: '$4.0B', subsector: 'Solar', esgScore: 80, outlook: 'Moderate' },
];

const outlookVariant = (o: string) => o === 'Strong' ? 'success' : o === 'Weak' ? 'danger' : 'warning';

export default function CleanEnergyPage() {
  const avgChange = STOCKS.reduce((s, st) => s + st.change, 0) / STOCKS.length;
  const positive = STOCKS.filter(st => st.change > 0).length;
  const avgEsg = STOCKS.reduce((s, st) => s + st.esgScore, 0) / STOCKS.length;
  const strongOutlook = STOCKS.filter(st => st.outlook === 'Strong').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Clean Energy</h1>
        <p className="mt-1 text-sm text-gray-500">Clean energy stocks tracker</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Change</p><p className={cn('text-lg font-bold', avgChange >= 0 ? 'text-green-400' : 'text-red-400')}>{avgChange > 0 ? '+' : ''}{avgChange.toFixed(1)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Positive</p><p className="text-lg font-bold text-green-400">{positive}/{STOCKS.length}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg ESG</p><p className="text-lg font-bold text-indigo-400">{avgEsg.toFixed(0)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Strong Outlook</p><p className="text-lg font-bold text-white">{strongOutlook}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Leaf className="h-4 w-4 text-green-400" /> Clean Energy Stocks</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.map((st) => (
            <div key={st.ticker} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{st.ticker} <span className="text-gray-500">{st.company}</span></p>
                <p className="text-xs text-gray-500">{st.subsector} &middot; {st.marketCap} &middot; ESG {st.esgScore}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">{formatCurrency(st.price)}</p>
                  <p className={cn('text-[10px] font-mono', st.change >= 0 ? 'text-green-400' : 'text-red-400')}>{st.change > 0 ? '+' : ''}{st.change}%</p>
                </div>
                <Badge variant={outlookVariant(st.outlook)}>{st.outlook}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
