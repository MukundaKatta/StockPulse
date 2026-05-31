'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/formatters';
import { Flame, TrendingUp, Wallet, Target } from 'lucide-react';

export default function FIRECalculatorPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [annualExpenses, setAnnualExpenses] = useState('50000');
  const [currentSavings, setCurrentSavings] = useState('200000');
  const [returnRate, setReturnRate] = useState('7');
  const [withdrawalRate, setWithdrawalRate] = useState('4');

  const result = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const expenses = parseFloat(annualExpenses) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const rate = (parseFloat(returnRate) || 0) / 100;
    const withdrawal = (parseFloat(withdrawalRate) || 0) / 100;
    const age = parseInt(currentAge) || 30;

    if (!expenses || !withdrawal) return null;

    const fireNumber = expenses / withdrawal;
    const annualSavings = income - expenses;
    const savingsRate = income > 0 ? (annualSavings / income) * 100 : 0;

    let years = 0;
    let portfolio = savings;
    while (portfolio < fireNumber && years < 100) {
      portfolio = portfolio * (1 + rate) + annualSavings;
      years++;
    }

    const fireAge = age + years;
    const coastFIRE = fireNumber / Math.pow(1 + rate, years);

    return { fireNumber, years, fireAge, savingsRate, annualSavings, coastFIRE, portfolio };
  }, [currentAge, annualIncome, annualExpenses, currentSavings, returnRate, withdrawalRate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">FIRE Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Financial Independence, Retire Early planning tool</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-400" />
            Your Financial Profile
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Input label="Current Age" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
          <Input label="Annual Income ($)" type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} />
          <Input label="Annual Expenses ($)" type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} />
          <Input label="Current Savings ($)" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
          <Input label="Expected Return (%)" type="number" step="0.1" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} />
          <Input label="Withdrawal Rate (%)" type="number" step="0.1" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} />
        </div>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-[10px] text-gray-500 uppercase">FIRE Number</span>
              </div>
              <p className="text-lg font-bold text-white">{formatCurrency(result.fireNumber)}</p>
            </Card>
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                <span className="text-[10px] text-gray-500 uppercase">Years to FIRE</span>
              </div>
              <p className="text-lg font-bold text-green-400">{result.years} years</p>
              <p className="text-[10px] text-gray-600">Age {result.fireAge}</p>
            </Card>
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-[10px] text-gray-500 uppercase">Savings Rate</span>
              </div>
              <p className={cn('text-lg font-bold', result.savingsRate >= 50 ? 'text-green-400' : result.savingsRate >= 25 ? 'text-amber-400' : 'text-red-400')}>
                {result.savingsRate.toFixed(0)}%
              </p>
            </Card>
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-[10px] text-gray-500 uppercase">Coast FIRE</span>
              </div>
              <p className="text-lg font-bold text-purple-400">{formatCurrency(result.coastFIRE)}</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progress Timeline</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {Array.from({ length: Math.min(result.years, 10) }).map((_, i) => {
                const year = i + 1;
                const rate = (parseFloat(returnRate) || 7) / 100;
                const annualSavings = result.annualSavings;
                let val = parseFloat(currentSavings) || 0;
                for (let j = 0; j < year; j++) val = val * (1 + rate) + annualSavings;
                const pct = (val / result.fireNumber) * 100;
                return (
                  <div key={year} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-12">Yr {year}</span>
                    <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-500 transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                    <span className="text-xs font-mono text-gray-400 w-16 text-right">{pct.toFixed(0)}%</span>
                  </div>
                );
              })}
              {result.years > 10 && <p className="text-xs text-gray-600 text-center">... {result.years - 10} more years</p>}
            </div>
          </Card>
        </>
      )}
    </motion.div>
  );
}
