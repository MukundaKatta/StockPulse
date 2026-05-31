'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator, Banknote } from 'lucide-react';

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState('350000');
  const [rate, setRate] = useState('7.0');
  const [termYears, setTermYears] = useState('30');

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(termYears) || 0) * 12;

  const monthlyPayment = r > 0 && n > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - P;

  const schedule = [];
  let balance = P;
  for (let year = 1; year <= Math.min(parseInt(termYears) || 0, 30); year++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 0; m < 12; m++) {
      const intPayment = balance * r;
      const prinPayment = monthlyPayment - intPayment;
      yearInterest += intPayment;
      yearPrincipal += prinPayment;
      balance -= prinPayment;
    }
    schedule.push({ year, interest: yearInterest, principal: yearPrincipal, balance: Math.max(0, balance) });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Loan Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Amortization schedule and payment breakdown</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Loan Amount</label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Interest Rate (%)</label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Term (Years)</label>
            <Input type="number" value={termYears} onChange={(e) => setTermYears(e.target.value)} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Monthly Payment</p>
          <p className="text-lg font-bold text-white">{formatCurrency(monthlyPayment)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Interest</p>
          <p className="text-lg font-bold text-red-400">{formatCurrency(totalInterest)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-[10px] text-gray-500 uppercase">Total Paid</p>
          <p className="text-lg font-bold text-white">{formatCurrency(totalPaid)}</p>
        </Card>
      </div>

      {/* Principal vs Interest Visualization */}
      <Card className="!p-4">
        <p className="text-xs text-gray-500 mb-2">Payment Breakdown</p>
        <div className="h-4 rounded-full overflow-hidden flex">
          <div className="h-full bg-indigo-500/70" style={{ width: `${(P / totalPaid) * 100}%` }} />
          <div className="h-full bg-red-500/50" style={{ width: `${(totalInterest / totalPaid) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          <span>Principal ({((P / totalPaid) * 100).toFixed(0)}%)</span>
          <span>Interest ({((totalInterest / totalPaid) * 100).toFixed(0)}%)</span>
        </div>
      </Card>

      {/* Amortization Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Banknote className="h-4 w-4 text-indigo-400" /> Amortization Schedule
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-900">
              <tr className="text-gray-500 border-b border-white/5">
                <th className="text-left py-2 px-2 font-medium">Year</th>
                <th className="text-right py-2 px-2 font-medium">Principal</th>
                <th className="text-right py-2 px-2 font-medium">Interest</th>
                <th className="text-right py-2 px-2 font-medium">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schedule.map((row) => (
                <tr key={row.year} className="hover:bg-white/[0.02]">
                  <td className="py-1.5 px-2 text-gray-300">{row.year}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-green-400">{formatCurrency(row.principal)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-red-400">{formatCurrency(row.interest)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-gray-300">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
