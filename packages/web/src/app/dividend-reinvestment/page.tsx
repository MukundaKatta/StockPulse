'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Repeat, TrendingUp } from 'lucide-react';

export default function DRIPPage() {
  const [investment, setInvestment] = useState('10000');
  const [divYield, setDivYield] = useState('3.5');
  const [growthRate, setGrowthRate] = useState('7');
  const [divGrowth, setDivGrowth] = useState('5');
  const [years, setYears] = useState('20');

  const inv = parseFloat(investment) || 0;
  const dy = (parseFloat(divYield) || 0) / 100;
  const gr = (parseFloat(growthRate) || 0) / 100;
  const dg = (parseFloat(divGrowth) || 0) / 100;
  const yrs = parseInt(years) || 0;

  const withDRIP: { year: number; value: number; income: number }[] = [];
  const withoutDRIP: { year: number; value: number; income: number }[] = [];

  let dripValue = inv;
  let noDripValue = inv;
  let currentYield = dy;

  for (let y = 1; y <= yrs; y++) {
    const dripDiv = dripValue * currentYield;
    dripValue = (dripValue + dripDiv) * (1 + gr);

    const noDripDiv = noDripValue * currentYield;
    noDripValue = noDripValue * (1 + gr);

    currentYield *= (1 + dg);

    withDRIP.push({ year: y, value: dripValue, income: dripDiv });
    withoutDRIP.push({ year: y, value: noDripValue, income: noDripDiv });
  }

  const finalDRIP = withDRIP[withDRIP.length - 1];
  const finalNoDRIP = withoutDRIP[withoutDRIP.length - 1];
  const dripAdvantage = finalDRIP ? finalDRIP.value - (finalNoDRIP?.value || 0) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">DRIP Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Dividend reinvestment plan compounding analysis</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Initial Investment</label><Input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Dividend Yield (%)</label><Input type="number" step="0.1" value={divYield} onChange={(e) => setDivYield(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Price Growth (%)</label><Input type="number" step="0.5" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Dividend Growth (%)</label><Input type="number" step="0.5" value={divGrowth} onChange={(e) => setDivGrowth(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Years</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} /></div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">With DRIP</p><p className="text-lg font-bold text-green-400">{formatCurrency(finalDRIP?.value || 0)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Without DRIP</p><p className="text-lg font-bold text-white">{formatCurrency(finalNoDRIP?.value || 0)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">DRIP Advantage</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(dripAdvantage)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Repeat className="h-4 w-4 text-green-400" /> Year-by-Year</CardTitle></CardHeader>
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-[#12121a]"><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2 font-medium">Year</th>
              <th className="text-right py-2 px-2 font-medium">With DRIP</th>
              <th className="text-right py-2 px-2 font-medium">Without DRIP</th>
              <th className="text-right py-2 px-2 font-medium">Div Income</th>
              <th className="text-right py-2 px-2 font-medium">Advantage</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {withDRIP.map((row, i) => (
                <tr key={row.year} className="hover:bg-white/[0.02]">
                  <td className="py-1.5 px-2 text-gray-300">{row.year}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-green-400">{formatCurrency(row.value)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-gray-400">{formatCurrency(withoutDRIP[i].value)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-yellow-400">{formatCurrency(row.income)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-indigo-400">{formatCurrency(row.value - withoutDRIP[i].value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
