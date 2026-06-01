'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Zap } from 'lucide-react';

interface VolData { asset: string; weight: number; annualVol: number; beta: number; risk: string; }
const ASSETS: VolData[] = [
  { asset: 'US Equities', weight: 45, annualVol: 18.4, beta: 1.02, risk: 'Moderate' },
  { asset: 'International', weight: 15, annualVol: 22.1, beta: 1.18, risk: 'High' },
  { asset: 'Bonds', weight: 20, annualVol: 5.2, beta: 0.12, risk: 'Low' },
  { asset: 'REITs', weight: 8, annualVol: 24.8, beta: 0.85, risk: 'High' },
  { asset: 'Commodities', weight: 7, annualVol: 28.4, beta: 0.32, risk: 'High' },
  { asset: 'Cash', weight: 5, annualVol: 0.4, beta: 0.0, risk: 'Low' },
];

export default function PortfolioVolatilityPage() {
  const portfolioVol = ASSETS.reduce((sum, a) => sum + (a.weight / 100) * a.annualVol, 0);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Volatility</h1><p className="mt-1 text-sm text-gray-500">Annualized volatility breakdown by asset class</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Portfolio Vol</p><p className="text-lg font-bold text-amber-400">{portfolioVol.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Risk</p><p className="text-lg font-bold text-red-400">{ASSETS.filter((a) => a.risk === 'High').length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Assets</p><p className="text-lg font-bold text-indigo-400">{ASSETS.length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-indigo-400" /> Volatility by Asset</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {ASSETS.sort((a, b) => b.annualVol - a.annualVol).map((a) => (
            <div key={a.asset} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{a.asset}</span>
                <Badge variant={a.risk === 'High' ? 'danger' : a.risk === 'Low' ? 'success' : 'warning'}>{a.risk}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500">Wt: {a.weight}%</span>
                <span className="text-[10px] text-gray-500">Beta: {a.beta.toFixed(2)}</span>
                <span className={cn('text-sm font-bold font-mono', a.annualVol > 20 ? 'text-red-400' : a.annualVol > 10 ? 'text-amber-400' : 'text-green-400')}>{a.annualVol.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
