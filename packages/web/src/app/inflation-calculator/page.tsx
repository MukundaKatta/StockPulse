'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { TrendingDown } from 'lucide-react';

const HISTORICAL_INFLATION: { year: number; rate: number }[] = [
  { year: 2015, rate: 0.1 }, { year: 2016, rate: 1.3 }, { year: 2017, rate: 2.1 },
  { year: 2018, rate: 2.4 }, { year: 2019, rate: 1.8 }, { year: 2020, rate: 1.2 },
  { year: 2021, rate: 4.7 }, { year: 2022, rate: 8.0 }, { year: 2023, rate: 3.4 },
  { year: 2024, rate: 3.1 },
];

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState('100000');
  const [inflationRate, setInflationRate] = useState('3.0');
  const [years, setYears] = useState('20');

  const amt = parseFloat(amount) || 0;
  const rate = (parseFloat(inflationRate) || 0) / 100;
  const yrs = parseInt(years) || 0;

  const futureValue = amt * Math.pow(1 + rate, yrs);
  const purchasingPower = amt / Math.pow(1 + rate, yrs);
  const lostPower = amt - purchasingPower;

  const timeline = Array.from({ length: yrs }, (_, i) => ({
    year: i + 1,
    nominal: amt,
    real: amt / Math.pow(1 + rate, i + 1),
    equivalent: amt * Math.pow(1 + rate, i + 1),
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Inflation Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">See how inflation erodes purchasing power</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Current Amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Inflation Rate (%)</label><Input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Years</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} /></div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Future Equivalent</p><p className="text-lg font-bold text-red-400">{formatCurrency(futureValue)}</p><p className="text-[10px] text-gray-500">needed to match today</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Purchasing Power</p><p className="text-lg font-bold text-yellow-400">{formatCurrency(purchasingPower)}</p><p className="text-[10px] text-gray-500">of {formatCurrency(amt)} in {yrs}yr</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Power Lost</p><p className="text-lg font-bold text-red-400">{formatCurrency(lostPower)}</p><p className="text-[10px] text-gray-500">{((lostPower / amt) * 100).toFixed(1)}% erosion</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Historical US Inflation</CardTitle></CardHeader>
        <div className="flex items-end gap-1 h-24 px-2 pb-2">
          {HISTORICAL_INFLATION.map((h) => {
            const height = (h.rate / 8.5) * 100;
            return (
              <div key={h.year} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[8px] text-gray-500">{h.rate}%</span>
                <div className={cn('w-full rounded-t', h.rate > 3 ? 'bg-red-500/50' : 'bg-green-500/40')} style={{ height: `${Math.max(height, 5)}%` }} />
                <span className="text-[8px] text-gray-600">{h.year.toString().slice(2)}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingDown className="h-4 w-4 text-red-400" /> Erosion Timeline</CardTitle></CardHeader>
        <div className="overflow-x-auto max-h-48 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-[#12121a]"><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2 font-medium">Year</th>
              <th className="text-right py-2 px-2 font-medium">Real Value</th>
              <th className="text-right py-2 px-2 font-medium">Cost Equivalent</th>
              <th className="text-right py-2 px-2 font-medium">Lost</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {timeline.filter((_, i) => i % (yrs > 10 ? 2 : 1) === 0 || i === timeline.length - 1).map((row) => (
                <tr key={row.year}><td className="py-1.5 px-2 text-gray-300">{row.year}</td><td className="py-1.5 px-2 text-right font-mono text-yellow-400">{formatCurrency(row.real)}</td><td className="py-1.5 px-2 text-right font-mono text-red-400">{formatCurrency(row.equivalent)}</td><td className="py-1.5 px-2 text-right font-mono text-gray-500">{((1 - row.real / amt) * 100).toFixed(1)}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
