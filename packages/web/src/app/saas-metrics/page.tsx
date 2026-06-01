'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatCurrency, formatLargeNumber } from '@/lib/formatters';
import { Cloud } from 'lucide-react';

interface SaaSCompany {
  symbol: string;
  name: string;
  arr: number;
  nrr: number;
  grossMargin: number;
  ruleOf40: number;
  ltv_cac: number;
  magicNumber: number;
  fcfMargin: number;
}

const COMPANIES: SaaSCompany[] = [
  { symbol: 'CRM', name: 'Salesforce', arr: 34.8e9, nrr: 112, grossMargin: 75.2, ruleOf40: 52, ltv_cac: 4.2, magicNumber: 0.85, fcfMargin: 28.5 },
  { symbol: 'NOW', name: 'ServiceNow', arr: 9.2e9, nrr: 125, grossMargin: 79.5, ruleOf40: 58, ltv_cac: 5.8, magicNumber: 1.15, fcfMargin: 32.1 },
  { symbol: 'DDOG', name: 'Datadog', arr: 2.4e9, nrr: 120, grossMargin: 78.8, ruleOf40: 48, ltv_cac: 4.5, magicNumber: 0.92, fcfMargin: 22.4 },
  { symbol: 'CRWD', name: 'CrowdStrike', arr: 3.4e9, nrr: 118, grossMargin: 75.8, ruleOf40: 55, ltv_cac: 5.2, magicNumber: 1.08, fcfMargin: 30.2 },
  { symbol: 'ZS', name: 'Zscaler', arr: 2.1e9, nrr: 122, grossMargin: 77.5, ruleOf40: 50, ltv_cac: 4.0, magicNumber: 0.88, fcfMargin: 18.5 },
  { symbol: 'NET', name: 'Cloudflare', arr: 1.5e9, nrr: 116, grossMargin: 76.2, ruleOf40: 42, ltv_cac: 3.5, magicNumber: 0.75, fcfMargin: 8.2 },
  { symbol: 'MDB', name: 'MongoDB', arr: 1.8e9, nrr: 128, grossMargin: 72.4, ruleOf40: 55, ltv_cac: 4.8, magicNumber: 0.95, fcfMargin: 15.8 },
  { symbol: 'SNOW', name: 'Snowflake', arr: 3.0e9, nrr: 131, grossMargin: 68.5, ruleOf40: 44, ltv_cac: 3.8, magicNumber: 0.82, fcfMargin: 12.5 },
];

export default function SaaSMetricsPage() {
  const avgRule40 = COMPANIES.reduce((s, c) => s + c.ruleOf40, 0) / COMPANIES.length;
  const avgNRR = COMPANIES.reduce((s, c) => s + c.nrr, 0) / COMPANIES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">SaaS Metrics</h1>
        <p className="mt-1 text-sm text-gray-500">Key SaaS operating metrics for cloud companies</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg Rule of 40</p><p className="text-lg font-bold text-green-400">{avgRule40.toFixed(0)}</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Avg NRR</p><p className="text-lg font-bold text-indigo-400">{avgNRR.toFixed(0)}%</p></Card>
        <Card className="!p-3 text-center"><p className="text-[10px] text-gray-500 uppercase">Companies</p><p className="text-lg font-bold text-white">{COMPANIES.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Cloud className="h-4 w-4 text-indigo-400" /> SaaS Comps</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {COMPANIES.sort((a, b) => b.ruleOf40 - a.ruleOf40).map((c) => (
            <div key={c.symbol} className="flex items-center gap-3 py-2 px-4">
              <div className="w-20"><p className="text-xs font-bold text-white">{c.symbol}</p><p className="text-[10px] text-gray-500 truncate">{c.name}</p></div>
              <span className="text-xs font-mono text-white w-14">{formatLargeNumber(c.arr)}</span>
              <span className="text-xs font-mono text-indigo-400 w-12">{c.nrr}% NRR</span>
              <span className="text-xs font-mono text-gray-400 w-12">{c.grossMargin.toFixed(0)}% GM</span>
              <span className={cn('text-xs font-mono w-10', c.ruleOf40 >= 40 ? 'text-green-400' : 'text-red-400')}>R40: {c.ruleOf40}</span>
              <span className="text-xs font-mono text-yellow-400 w-14">LTV {c.ltv_cac.toFixed(1)}x</span>
              <span className={cn('text-xs font-mono w-12', c.magicNumber >= 1 ? 'text-green-400' : 'text-gray-400')}>M# {c.magicNumber.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
