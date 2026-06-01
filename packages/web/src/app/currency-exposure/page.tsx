'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Globe } from 'lucide-react';

interface CurrencyExposure {
  currency: string;
  code: string;
  exposure: number;
  hedged: number;
  ytdChange: number;
  impact: number;
  holdings: string[];
}

const EXPOSURES: CurrencyExposure[] = [
  { currency: 'US Dollar', code: 'USD', exposure: 72.4, hedged: 0, ytdChange: 0, impact: 0, holdings: ['AAPL', 'MSFT', 'NVDA', 'META'] },
  { currency: 'Euro', code: 'EUR', exposure: 8.5, hedged: 50, ytdChange: -2.1, impact: -0.09, holdings: ['ASML', 'SAP'] },
  { currency: 'British Pound', code: 'GBP', exposure: 5.2, hedged: 0, ytdChange: -1.4, impact: -0.07, holdings: ['AZN', 'SHEL'] },
  { currency: 'Japanese Yen', code: 'JPY', exposure: 4.8, hedged: 75, ytdChange: -8.2, impact: -0.10, holdings: ['TM', 'SONY'] },
  { currency: 'Swiss Franc', code: 'CHF', exposure: 3.1, hedged: 0, ytdChange: 1.8, impact: 0.06, holdings: ['NESN', 'NOVN'] },
  { currency: 'Canadian Dollar', code: 'CAD', exposure: 2.8, hedged: 0, ytdChange: -3.2, impact: -0.09, holdings: ['SHOP', 'TD'] },
  { currency: 'Chinese Yuan', code: 'CNY', exposure: 2.0, hedged: 100, ytdChange: -4.5, impact: 0, holdings: ['BABA', 'JD'] },
  { currency: 'Indian Rupee', code: 'INR', exposure: 1.2, hedged: 0, ytdChange: -1.2, impact: -0.01, holdings: ['INFY'] },
];

export default function CurrencyExposurePage() {
  const totalImpact = EXPOSURES.reduce((s, e) => s + e.impact, 0);
  const hedgedPct = EXPOSURES.reduce((s, e) => s + (e.exposure * e.hedged / 100), 0);
  const nonUsd = EXPOSURES.filter((e) => e.code !== 'USD').reduce((s, e) => s + e.exposure, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Currency Exposure</h1>
        <p className="mt-1 text-sm text-gray-500">Portfolio foreign currency risk analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">USD Exposure</p><p className="text-lg font-bold text-white">{EXPOSURES[0].exposure}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Foreign Exposure</p><p className="text-lg font-bold text-indigo-400">{nonUsd.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Hedged</p><p className="text-lg font-bold text-blue-400">{hedgedPct.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">FX Impact</p><p className={cn('text-lg font-bold', totalImpact >= 0 ? 'text-green-400' : 'text-red-400')}>{totalImpact >= 0 ? '+' : ''}{totalImpact.toFixed(2)}%</p></Card>
      </div>

      <Card className="!p-4">
        <p className="text-[10px] text-gray-500 uppercase mb-2">Currency Allocation</p>
        <div className="h-5 rounded bg-white/5 flex overflow-hidden">
          {EXPOSURES.map((e, i) => {
            const colors = ['bg-green-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-red-500', 'bg-cyan-500', 'bg-pink-500', 'bg-teal-500'];
            return <div key={e.code} className={cn(colors[i], 'h-full')} style={{ width: `${e.exposure}%` }} />;
          })}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {EXPOSURES.map((e, i) => {
            const colors = ['bg-green-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-red-500', 'bg-cyan-500', 'bg-pink-500', 'bg-teal-500'];
            return (
              <div key={e.code} className="flex items-center gap-1">
                <span className={cn('h-1.5 w-1.5 rounded-full', colors[i])} />
                <span className="text-[9px] text-gray-400">{e.code} ({e.exposure}%)</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-indigo-400" /> Currency Details</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {EXPOSURES.map((e) => (
            <div key={e.code} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-24"><p className="text-xs font-bold text-white">{e.code}</p><p className="text-[10px] text-gray-500">{e.currency}</p></div>
              <span className="text-xs font-mono text-white w-12">{e.exposure}%</span>
              {e.hedged > 0 && <Badge variant="info">{e.hedged}% hedged</Badge>}
              <span className={cn('text-[10px] font-mono w-14', e.ytdChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                {e.ytdChange >= 0 ? '+' : ''}{e.ytdChange.toFixed(1)}%
              </span>
              <span className={cn('text-[10px] font-mono w-14', e.impact >= 0 ? 'text-green-400' : 'text-red-400')}>
                {e.impact >= 0 ? '+' : ''}{e.impact.toFixed(2)}%
              </span>
              <span className="text-[10px] text-gray-500 ml-auto">{e.holdings.join(', ')}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
