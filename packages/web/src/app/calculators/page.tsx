'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator, Percent, TrendingUp, Clock } from 'lucide-react';

type CalcType = 'compound' | 'dividend' | 'breakeven';

export default function CalculatorsPage() {
  const [activeCalc, setActiveCalc] = useState<CalcType>('compound');

  // Compound interest
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('10');
  const [years, setYears] = useState('20');
  const [monthly, setMonthly] = useState('500');

  // Dividend
  const [divShares, setDivShares] = useState('100');
  const [divPrice, setDivPrice] = useState('50');
  const [divYield, setDivYield] = useState('4');
  const [divGrowth, setDivGrowth] = useState('5');

  // Breakeven
  const [buyPrice, setBuyPrice] = useState('');
  const [shares, setShares] = useState('');
  const [fees, setFees] = useState('0');

  const compoundResult = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseInt(years) || 0;
    const m = parseFloat(monthly) || 0;

    let total = p;
    const yearlyData: number[] = [p];
    for (let i = 0; i < t; i++) {
      total = total * (1 + r) + m * 12;
      yearlyData.push(total);
    }

    const totalContributions = p + m * 12 * t;
    const totalInterest = total - totalContributions;

    return { total, totalContributions, totalInterest, yearlyData };
  }, [principal, rate, years, monthly]);

  const dividendResult = useMemo(() => {
    const s = parseFloat(divShares) || 0;
    const p = parseFloat(divPrice) || 0;
    const y = (parseFloat(divYield) || 0) / 100;
    const g = (parseFloat(divGrowth) || 0) / 100;

    const annualDiv = s * p * y;
    const monthlyDiv = annualDiv / 12;
    const yieldOnCost5yr = y * Math.pow(1 + g, 5);
    const annualDiv5yr = s * p * yieldOnCost5yr;

    return { annualDiv, monthlyDiv, yieldOnCost5yr: yieldOnCost5yr * 100, annualDiv5yr };
  }, [divShares, divPrice, divYield, divGrowth]);

  const breakeven = useMemo(() => {
    const price = parseFloat(buyPrice) || 0;
    const qty = parseFloat(shares) || 0;
    const fee = parseFloat(fees) || 0;
    if (!price || !qty) return null;
    return (price * qty + fee * 2) / qty;
  }, [buyPrice, shares, fees]);

  const calcs = [
    { key: 'compound' as CalcType, label: 'Compound Interest', icon: TrendingUp },
    { key: 'dividend' as CalcType, label: 'Dividend Income', icon: Percent },
    { key: 'breakeven' as CalcType, label: 'Breakeven Price', icon: Calculator },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Financial Calculators</h1>
        <p className="mt-1 text-sm text-gray-500">Tools for investment planning and analysis</p>
      </div>

      {/* Calc selector */}
      <div className="flex gap-2">
        {calcs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveCalc(key)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
              activeCalc === key ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-500 border border-white/[0.06] hover:text-gray-300'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Compound Interest */}
      {activeCalc === 'compound' && (
        <Card>
          <CardHeader>
            <CardTitle>Compound Interest Calculator</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Input label="Initial Investment ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            <Input label="Annual Return (%)" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
            <Input label="Years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
            <Input label="Monthly Contribution ($)" type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-green-500/5 border border-green-500/10 p-3">
              <p className="text-[10px] text-gray-500 uppercase">Final Value</p>
              <p className="text-lg font-bold text-green-400">{formatCurrency(compoundResult.total)}</p>
            </div>
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
              <p className="text-[10px] text-gray-500 uppercase">Contributions</p>
              <p className="text-lg font-bold text-white">{formatCurrency(compoundResult.totalContributions)}</p>
            </div>
            <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-3">
              <p className="text-[10px] text-gray-500 uppercase">Interest Earned</p>
              <p className="text-lg font-bold text-indigo-400">{formatCurrency(compoundResult.totalInterest)}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Dividend */}
      {activeCalc === 'dividend' && (
        <Card>
          <CardHeader>
            <CardTitle>Dividend Income Calculator</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Input label="Shares" type="number" value={divShares} onChange={(e) => setDivShares(e.target.value)} />
            <Input label="Share Price ($)" type="number" step="0.01" value={divPrice} onChange={(e) => setDivPrice(e.target.value)} />
            <Input label="Dividend Yield (%)" type="number" step="0.1" value={divYield} onChange={(e) => setDivYield(e.target.value)} />
            <Input label="Div Growth Rate (%)" type="number" step="0.1" value={divGrowth} onChange={(e) => setDivGrowth(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-green-500/5 border border-green-500/10 p-3">
              <p className="text-[10px] text-gray-500 uppercase">Annual Income</p>
              <p className="text-lg font-bold text-green-400">{formatCurrency(dividendResult.annualDiv)}</p>
            </div>
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
              <p className="text-[10px] text-gray-500 uppercase">Monthly</p>
              <p className="text-lg font-bold text-white">{formatCurrency(dividendResult.monthlyDiv)}</p>
            </div>
            <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-3">
              <p className="text-[10px] text-gray-500 uppercase">5Y Yield on Cost</p>
              <p className="text-lg font-bold text-indigo-400">{dividendResult.yieldOnCost5yr.toFixed(2)}%</p>
            </div>
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
              <p className="text-[10px] text-gray-500 uppercase">5Y Annual Income</p>
              <p className="text-lg font-bold text-white">{formatCurrency(dividendResult.annualDiv5yr)}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Breakeven */}
      {activeCalc === 'breakeven' && (
        <Card>
          <CardHeader>
            <CardTitle>Breakeven Price Calculator</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Input label="Buy Price ($)" type="number" step="0.01" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
            <Input label="Shares" type="number" value={shares} onChange={(e) => setShares(e.target.value)} />
            <Input label="Fee per Trade ($)" type="number" step="0.01" value={fees} onChange={(e) => setFees(e.target.value)} />
          </div>
          {breakeven && (
            <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-4 text-center">
              <p className="text-xs text-gray-500 uppercase">Breakeven Sell Price</p>
              <p className="text-2xl font-bold text-indigo-400 mt-1">{formatCurrency(breakeven)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {breakeven > parseFloat(buyPrice)
                  ? `+${formatCurrency(breakeven - parseFloat(buyPrice))} per share to break even`
                  : 'Same as buy price (no fees)'}
              </p>
            </div>
          )}
        </Card>
      )}
    </motion.div>
  );
}
