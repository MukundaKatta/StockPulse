'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Landmark, TrendingUp } from 'lucide-react';

export default function RetirementPlannerPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retireAge, setRetireAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('100000');
  const [monthlyContrib, setMonthlyContrib] = useState('2000');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [withdrawalRate, setWithdrawalRate] = useState('4');

  const age = parseInt(currentAge) || 30;
  const retire = parseInt(retireAge) || 65;
  const savings = parseFloat(currentSavings) || 0;
  const monthly = parseFloat(monthlyContrib) || 0;
  const rate = (parseFloat(annualReturn) || 0) / 100;
  const withdrawal = (parseFloat(withdrawalRate) || 4) / 100;

  const yearsToRetire = Math.max(0, retire - age);
  const monthlyRate = rate / 12;
  const months = yearsToRetire * 12;

  let projected = savings;
  const milestones: { age: number; value: number }[] = [{ age, value: savings }];
  for (let y = 1; y <= yearsToRetire; y++) {
    for (let m = 0; m < 12; m++) {
      projected = projected * (1 + monthlyRate) + monthly;
    }
    if (y % 5 === 0 || y === yearsToRetire) {
      milestones.push({ age: age + y, value: projected });
    }
  }

  const annualIncome = projected * withdrawal;
  const monthlyIncome = annualIncome / 12;
  const totalContributed = savings + monthly * months;
  const totalGrowth = projected - totalContributed;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Retirement Planner</h1>
        <p className="mt-1 text-sm text-gray-500">Project your retirement savings and income</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Current Age</label><Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Retirement Age</label><Input type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Current Savings</label><Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Monthly Contribution</label><Input type="number" value={monthlyContrib} onChange={(e) => setMonthlyContrib(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Annual Return (%)</label><Input type="number" step="0.5" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Withdrawal Rate (%)</label><Input type="number" step="0.5" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} /></div>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Nest Egg</p><p className="text-sm font-bold text-green-400">{formatCurrency(projected)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Annual Income</p><p className="text-sm font-bold text-indigo-400">{formatCurrency(annualIncome)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Monthly Income</p><p className="text-sm font-bold text-white">{formatCurrency(monthlyIncome)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Growth Earned</p><p className="text-sm font-bold text-yellow-400">{formatCurrency(totalGrowth)}</p></Card>
      </div>

      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-2">Contributions vs Growth</p>
        <div className="h-4 rounded-full overflow-hidden flex">
          <div className="h-full bg-indigo-500/70" style={{ width: `${(totalContributed / projected) * 100}%` }} />
          <div className="h-full bg-green-500/50" style={{ width: `${(totalGrowth / projected) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          <span>Contributions ({((totalContributed / projected) * 100).toFixed(0)}%)</span>
          <span>Growth ({((totalGrowth / projected) * 100).toFixed(0)}%)</span>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Landmark className="h-4 w-4 text-indigo-400" /> Milestones</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {milestones.map((m) => (
            <div key={m.age} className="flex items-center justify-between py-2 px-2">
              <span className="text-sm text-gray-400">Age {m.age}</span>
              <span className="text-sm font-mono text-green-400">{formatCurrency(m.value)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
