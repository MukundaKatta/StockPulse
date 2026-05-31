'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

export default function CompoundCalculatorPage() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('25');
  const [monthly, setMonthly] = useState('500');
  const [compounding, setCompounding] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseInt(years) || 0;
  const M = parseFloat(monthly) || 0;
  const n = compounding === 'monthly' ? 12 : compounding === 'quarterly' ? 4 : 1;

  const periods = n * t;
  const ratePerPeriod = r / n;
  const contributionPerPeriod = M * (12 / n);

  let balance = P;
  const timeline: { year: number; balance: number; contributions: number; interest: number }[] = [];
  let totalContributions = P;

  for (let y = 1; y <= t; y++) {
    for (let p = 0; p < n; p++) {
      balance = balance * (1 + ratePerPeriod) + contributionPerPeriod;
    }
    totalContributions += M * 12;
    timeline.push({ year: y, balance, contributions: totalContributions, interest: balance - totalContributions });
  }

  const finalBalance = balance;
  const totalInterest = finalBalance - totalContributions;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Compound Interest Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Watch your money grow exponentially</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Initial Amount</label><Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Annual Rate (%)</label><Input type="number" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Monthly Add</label><Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Years</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} /></div>
        </div>
        <div className="flex gap-2 mt-4">
          {(['monthly', 'quarterly', 'annual'] as const).map((c) => (
            <button key={c} onClick={() => setCompounding(c)} className={cn('rounded-md px-3 py-1 text-xs capitalize', compounding === c ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}>{c}</button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Final Balance</p><p className="text-lg font-bold text-green-400">{formatCurrency(finalBalance)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Total Contributed</p><p className="text-lg font-bold text-white">{formatCurrency(totalContributions)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Interest Earned</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(totalInterest)}</p></Card>
      </div>

      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-2">Growth Breakdown</p>
        <div className="h-4 rounded-full overflow-hidden flex">
          <div className="h-full bg-indigo-500/70" style={{ width: `${totalContributions > 0 ? (totalContributions / finalBalance) * 100 : 0}%` }} />
          <div className="h-full bg-green-500/50" />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          <span>Contributions ({((totalContributions / finalBalance) * 100).toFixed(0)}%)</span>
          <span>Interest ({((totalInterest / finalBalance) * 100).toFixed(0)}%)</span>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> Growth Timeline</CardTitle></CardHeader>
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-[#12121a]"><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2 font-medium">Year</th>
              <th className="text-right py-2 px-2 font-medium">Balance</th>
              <th className="text-right py-2 px-2 font-medium">Contributed</th>
              <th className="text-right py-2 px-2 font-medium">Interest</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {timeline.map((row) => (
                <tr key={row.year} className="hover:bg-white/[0.02]">
                  <td className="py-1.5 px-2 text-gray-300">{row.year}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-green-400">{formatCurrency(row.balance)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-gray-400">{formatCurrency(row.contributions)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-indigo-400">{formatCurrency(row.interest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
