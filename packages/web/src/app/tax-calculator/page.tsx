'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator, DollarSign } from 'lucide-react';

const TAX_BRACKETS_2024 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const LTCG_BRACKETS = [
  { min: 0, max: 47025, rate: 0 },
  { min: 47025, max: 518900, rate: 0.15 },
  { min: 518900, max: Infinity, rate: 0.20 },
];

function calculateTax(income: number, brackets: typeof TAX_BRACKETS_2024) {
  let tax = 0;
  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

export default function TaxCalculatorPage() {
  const [income, setIncome] = useState('150000');
  const [shortTermGains, setShortTermGains] = useState('25000');
  const [longTermGains, setLongTermGains] = useState('50000');
  const [deductions, setDeductions] = useState('14600');

  const incomeNum = parseFloat(income) || 0;
  const stGains = parseFloat(shortTermGains) || 0;
  const ltGains = parseFloat(longTermGains) || 0;
  const deductionsNum = parseFloat(deductions) || 0;

  const taxableOrdinary = Math.max(0, incomeNum + stGains - deductionsNum);
  const ordinaryTax = calculateTax(taxableOrdinary, TAX_BRACKETS_2024);
  const ltcgTax = calculateTax(ltGains, LTCG_BRACKETS);
  const totalTax = ordinaryTax + ltcgTax;
  const effectiveRate = (incomeNum + stGains + ltGains) > 0 ? (totalTax / (incomeNum + stGains + ltGains)) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Tax Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Estimate capital gains and income tax (2024 brackets)</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">W-2 Income</label>
            <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Short-Term Gains</label>
            <Input type="number" value={shortTermGains} onChange={(e) => setShortTermGains(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Long-Term Gains</label>
            <Input type="number" value={longTermGains} onChange={(e) => setLongTermGains(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Deductions</label>
            <Input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Tax</p>
          <p className="text-xl font-bold text-red-400">{formatCurrency(totalTax)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Effective Rate</p>
          <p className="text-xl font-bold text-yellow-400">{effectiveRate.toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Calculator className="h-4 w-4 text-indigo-400" /> Tax Breakdown
          </CardTitle>
        </CardHeader>
        <div className="space-y-3 px-2 pb-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Taxable Ordinary Income</span>
            <span className="font-mono text-white">{formatCurrency(taxableOrdinary)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Ordinary Income Tax</span>
            <span className="font-mono text-red-400">{formatCurrency(ordinaryTax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Long-Term Capital Gains</span>
            <span className="font-mono text-white">{formatCurrency(ltGains)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">LTCG Tax</span>
            <span className="font-mono text-red-400">{formatCurrency(ltcgTax)}</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-medium">
            <span className="text-white">Total Tax Liability</span>
            <span className="font-mono text-red-400">{formatCurrency(totalTax)}</span>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">2024 Federal Tax Brackets (Single)</CardTitle>
        </CardHeader>
        <div className="divide-y divide-white/5">
          {TAX_BRACKETS_2024.map((bracket, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-2">
              <span className="text-xs text-gray-400">
                {formatCurrency(bracket.min)} – {bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}
              </span>
              <span className="text-xs font-mono text-white">{(bracket.rate * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
