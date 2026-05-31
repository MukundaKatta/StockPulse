'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Shield, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function EmergencyFundPage() {
  const [monthlyExpenses, setMonthlyExpenses] = useState('5000');
  const [currentSavings, setCurrentSavings] = useState('18000');
  const [targetMonths, setTargetMonths] = useState('6');
  const [monthlySaving, setMonthlySaving] = useState('1000');

  const expenses = parseFloat(monthlyExpenses) || 0;
  const savings = parseFloat(currentSavings) || 0;
  const months = parseInt(targetMonths) || 6;
  const saving = parseFloat(monthlySaving) || 0;

  const target = expenses * months;
  const progress = target > 0 ? (savings / target) * 100 : 0;
  const remaining = Math.max(0, target - savings);
  const monthsToGoal = saving > 0 ? Math.ceil(remaining / saving) : Infinity;
  const coveredMonths = expenses > 0 ? savings / expenses : 0;

  const status = coveredMonths >= 6 ? 'excellent' : coveredMonths >= 3 ? 'good' : coveredMonths >= 1 ? 'low' : 'critical';
  const statusConfig = {
    excellent: { color: 'text-green-400', bg: 'ring-green-500/20', label: 'Fully Funded', icon: CheckCircle2 },
    good: { color: 'text-yellow-400', bg: 'ring-yellow-500/20', label: 'Getting There', icon: Shield },
    low: { color: 'text-orange-400', bg: 'ring-orange-500/20', label: 'Underfunded', icon: AlertTriangle },
    critical: { color: 'text-red-400', bg: 'ring-red-500/20', label: 'Critical', icon: AlertTriangle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Emergency Fund</h1>
        <p className="mt-1 text-sm text-gray-500">Build and track your financial safety net</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Monthly Expenses</label><Input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Current Savings</label><Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Target Months</label><Input type="number" value={targetMonths} onChange={(e) => setTargetMonths(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Monthly Saving</label><Input type="number" value={monthlySaving} onChange={(e) => setMonthlySaving(e.target.value)} /></div>
        </div>
      </Card>

      <Card className={cn('!p-5', config.bg, 'ring-1')}>
        <div className="flex items-center gap-3 mb-3">
          <StatusIcon className={cn('h-6 w-6', config.color)} />
          <div>
            <p className={cn('text-sm font-medium', config.color)}>{config.label}</p>
            <p className="text-[10px] text-gray-500">{coveredMonths.toFixed(1)} months of expenses covered</p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <div className={cn('h-full rounded-full', status === 'excellent' ? 'bg-green-500/70' : status === 'good' ? 'bg-yellow-500/70' : 'bg-red-500/70')} style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          <span>{formatCurrency(savings)} saved</span>
          <span>{formatCurrency(target)} target ({months} months)</span>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Remaining</p><p className="text-lg font-bold text-white">{formatCurrency(remaining)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Time to Goal</p><p className="text-lg font-bold text-indigo-400">{monthsToGoal === Infinity ? '∞' : `${monthsToGoal} months`}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Coverage Milestones</CardTitle></CardHeader>
        <div className="space-y-2 px-2 pb-3">
          {[1, 3, 6, 9, 12].map((m) => {
            const needed = expenses * m;
            const isMet = savings >= needed;
            return (
              <div key={m} className="flex items-center gap-3">
                {isMet ? <CheckCircle2 className="h-3.5 w-3.5 text-green-400 shrink-0" /> : <div className="h-3.5 w-3.5 rounded-full border border-white/10 shrink-0" />}
                <span className={cn('text-xs', isMet ? 'text-green-400' : 'text-gray-400')}>{m} {m === 1 ? 'month' : 'months'}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={cn('h-full rounded-full', isMet ? 'bg-green-500/50' : 'bg-white/10')} style={{ width: `${Math.min((savings / needed) * 100, 100)}%` }} />
                </div>
                <span className="text-[10px] text-gray-500 font-mono w-16 text-right">{formatCurrency(needed)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
