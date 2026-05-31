'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Target } from 'lucide-react';

export default function BreakevenCalculatorPage() {
  const [entryPrice, setEntryPrice] = useState('150.00');
  const [shares, setShares] = useState('100');
  const [commission, setCommission] = useState('0');
  const [taxRate, setTaxRate] = useState('15');

  const entry = parseFloat(entryPrice) || 0;
  const qty = parseInt(shares) || 0;
  const comm = parseFloat(commission) || 0;
  const tax = (parseFloat(taxRate) || 0) / 100;

  const totalCost = entry * qty + comm * 2;
  const breakevenPrice = qty > 0 ? totalCost / qty : 0;

  const scenarios = [5, 10, 15, 20, 25, 30].map((pct) => {
    const targetPrice = entry * (1 + pct / 100);
    const grossProfit = (targetPrice - entry) * qty - comm * 2;
    const taxAmount = grossProfit > 0 ? grossProfit * tax : 0;
    const netProfit = grossProfit - taxAmount;
    return { pct, targetPrice, grossProfit, taxAmount, netProfit };
  });

  const lossScenarios = [5, 10, 15, 20, 25].map((pct) => {
    const price = entry * (1 - pct / 100);
    const loss = (entry - price) * qty + comm * 2;
    return { pct, price, loss };
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Breakeven Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Calculate breakeven price and profit scenarios</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Entry Price</label><Input type="number" step="0.01" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Shares</label><Input type="number" value={shares} onChange={(e) => setShares(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Commission</label><Input type="number" step="0.01" value={commission} onChange={(e) => setCommission(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Tax Rate (%)</label><Input type="number" step="1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} /></div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Total Cost</p><p className="text-lg font-bold text-white">{formatCurrency(totalCost)}</p></Card>
        <Card className="!p-4 ring-1 ring-indigo-500/20"><p className="text-[10px] text-gray-500 uppercase">Breakeven Price</p><p className="text-lg font-bold text-indigo-400">${breakevenPrice.toFixed(2)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Cost Basis</p><p className="text-lg font-bold text-white">${entry.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm text-green-400"><Target className="h-4 w-4" /> Profit Scenarios</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2">Gain</th><th className="text-right py-2 px-2">Target</th><th className="text-right py-2 px-2">Gross P&L</th><th className="text-right py-2 px-2">Tax</th><th className="text-right py-2 px-2">Net Profit</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {scenarios.map((s) => (
                <tr key={s.pct}><td className="py-1.5 px-2 text-green-400">+{s.pct}%</td><td className="py-1.5 px-2 text-right font-mono text-white">${s.targetPrice.toFixed(2)}</td><td className="py-1.5 px-2 text-right font-mono text-green-400">{formatCurrency(s.grossProfit)}</td><td className="py-1.5 px-2 text-right font-mono text-red-400">{formatCurrency(s.taxAmount)}</td><td className="py-1.5 px-2 text-right font-mono text-green-400 font-medium">{formatCurrency(s.netProfit)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm text-red-400">Loss Scenarios</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5"><th className="text-left py-2 px-2">Decline</th><th className="text-right py-2 px-2">Price</th><th className="text-right py-2 px-2">Loss</th></tr></thead>
            <tbody className="divide-y divide-white/5">
              {lossScenarios.map((s) => (
                <tr key={s.pct}><td className="py-1.5 px-2 text-red-400">-{s.pct}%</td><td className="py-1.5 px-2 text-right font-mono text-white">${s.price.toFixed(2)}</td><td className="py-1.5 px-2 text-right font-mono text-red-400">-{formatCurrency(s.loss)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
