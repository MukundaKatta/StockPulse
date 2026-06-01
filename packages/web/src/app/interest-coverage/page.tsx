'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Percent } from 'lucide-react';

interface CoverageData {
  symbol: string;
  name: string;
  ebit: number;
  interestExpense: number;
  coverageRatio: number;
  debtToEquity: number;
  sector: string;
  health: 'Strong' | 'Adequate' | 'Weak' | 'Critical';
}

const COMPANIES: CoverageData[] = [
  { symbol: 'AAPL', name: 'Apple', ebit: 120.5, interestExpense: 3.9, coverageRatio: 30.9, debtToEquity: 1.76, sector: 'Tech', health: 'Strong' },
  { symbol: 'MSFT', name: 'Microsoft', ebit: 102.4, interestExpense: 2.1, coverageRatio: 48.8, debtToEquity: 0.42, sector: 'Tech', health: 'Strong' },
  { symbol: 'T', name: 'AT&T', ebit: 25.8, interestExpense: 6.9, coverageRatio: 3.7, debtToEquity: 1.14, sector: 'Telecom', health: 'Adequate' },
  { symbol: 'F', name: 'Ford', ebit: 8.2, interestExpense: 4.1, coverageRatio: 2.0, debtToEquity: 3.82, sector: 'Auto', health: 'Weak' },
  { symbol: 'BA', name: 'Boeing', ebit: -2.4, interestExpense: 2.5, coverageRatio: -0.96, debtToEquity: -8.50, sector: 'Aerospace', health: 'Critical' },
  { symbol: 'JNJ', name: 'J&J', ebit: 22.8, interestExpense: 0.9, coverageRatio: 25.3, debtToEquity: 0.48, sector: 'Healthcare', health: 'Strong' },
  { symbol: 'VZ', name: 'Verizon', ebit: 31.2, interestExpense: 5.5, coverageRatio: 5.7, debtToEquity: 1.68, sector: 'Telecom', health: 'Adequate' },
  { symbol: 'CCL', name: 'Carnival', ebit: 3.8, interestExpense: 2.1, coverageRatio: 1.8, debtToEquity: 5.20, sector: 'Leisure', health: 'Weak' },
];

const healthVariant = (h: string) => h === 'Strong' ? 'success' : h === 'Adequate' ? 'info' : h === 'Weak' ? 'warning' : 'danger';

export default function InterestCoveragePage() {
  const avgRatio = COMPANIES.filter(c => c.coverageRatio > 0).reduce((s, c) => s + c.coverageRatio, 0) / COMPANIES.filter(c => c.coverageRatio > 0).length;
  const strong = COMPANIES.filter(c => c.health === 'Strong').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Interest Coverage</h1>
        <p className="mt-1 text-sm text-gray-500">Interest coverage ratio and debt health analysis</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Companies</p><p className="text-lg font-bold text-white">{COMPANIES.length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Ratio</p><p className="text-lg font-bold text-indigo-400">{avgRatio.toFixed(1)}x</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Strong</p><p className="text-lg font-bold text-green-400">{strong}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Critical</p><p className="text-lg font-bold text-red-400">{COMPANIES.filter(c => c.health === 'Critical').length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Percent className="h-4 w-4 text-indigo-400" /> Coverage Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {COMPANIES.map((c) => (
            <div key={c.symbol} className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-24">
                <p className="text-xs font-bold text-white">{c.symbol}</p>
                <p className="text-[10px] text-gray-500">{c.name}</p>
              </div>
              <span className="text-[10px] text-gray-400 w-16">{c.sector}</span>
              <span className="text-xs font-mono text-white w-16">EBIT ${c.ebit}B</span>
              <span className="text-xs font-mono text-gray-400 w-14">Int ${c.interestExpense}B</span>
              <span className={cn('text-xs font-mono w-12', c.coverageRatio >= 5 ? 'text-green-400' : c.coverageRatio >= 2 ? 'text-yellow-400' : 'text-red-400')}>{c.coverageRatio.toFixed(1)}x</span>
              <span className="text-[10px] text-gray-500 w-14">D/E {c.debtToEquity}</span>
              <Badge variant={healthVariant(c.health)} className="ml-auto">{c.health}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
