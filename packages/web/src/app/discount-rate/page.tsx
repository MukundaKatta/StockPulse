'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Percent } from 'lucide-react';

interface DiscountRateScenario {
  name: string;
  riskFree: number;
  equityPremium: number;
  beta: number;
  wacc: number;
  impliedValue: number;
  currentPrice: number;
  verdict: 'Undervalued' | 'Overvalued' | 'Fair';
}

const SCENARIOS: DiscountRateScenario[] = [
  { name: 'AAPL Base Case', riskFree: 4.25, equityPremium: 5.5, beta: 1.18, wacc: 9.8, impliedValue: 205.40, currentPrice: 185.20, verdict: 'Undervalued' },
  { name: 'MSFT Conservative', riskFree: 4.25, equityPremium: 6.0, beta: 0.95, wacc: 10.2, impliedValue: 380.00, currentPrice: 404.80, verdict: 'Overvalued' },
  { name: 'GOOGL Growth', riskFree: 4.25, equityPremium: 5.5, beta: 1.08, wacc: 9.5, impliedValue: 162.50, currentPrice: 141.80, verdict: 'Undervalued' },
  { name: 'TSLA Bull Case', riskFree: 4.25, equityPremium: 7.0, beta: 1.95, wacc: 14.5, impliedValue: 210.00, currentPrice: 245.80, verdict: 'Overvalued' },
  { name: 'AMZN Base Case', riskFree: 4.25, equityPremium: 5.5, beta: 1.22, wacc: 10.1, impliedValue: 198.60, currentPrice: 190.30, verdict: 'Fair' },
  { name: 'NVDA Aggressive', riskFree: 4.25, equityPremium: 5.0, beta: 1.68, wacc: 11.0, impliedValue: 155.20, currentPrice: 132.40, verdict: 'Undervalued' },
  { name: 'META Value', riskFree: 4.25, equityPremium: 5.5, beta: 1.30, wacc: 10.8, impliedValue: 510.00, currentPrice: 484.10, verdict: 'Undervalued' },
  { name: 'JPM Defensive', riskFree: 4.25, equityPremium: 6.0, beta: 1.10, wacc: 10.0, impliedValue: 195.00, currentPrice: 198.50, verdict: 'Fair' },
];

const verdictVariant = (v: string) => v === 'Undervalued' ? 'success' : v === 'Overvalued' ? 'danger' : 'default';

export default function DiscountRatePage() {
  const avgWacc = SCENARIOS.reduce((s, t) => s + t.wacc, 0) / SCENARIOS.length;
  const undervalued = SCENARIOS.filter(s => s.verdict === 'Undervalued').length;
  const avgBeta = SCENARIOS.reduce((s, t) => s + t.beta, 0) / SCENARIOS.length;
  const totalScenarios = SCENARIOS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Discount Rate Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">WACC and DCF discount rate scenarios</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Scenarios</p><p className="text-lg font-bold text-white">{totalScenarios}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg WACC</p><p className="text-lg font-bold text-indigo-400">{avgWacc.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Undervalued</p><p className="text-lg font-bold text-green-400">{undervalued}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Beta</p><p className="text-lg font-bold text-amber-400">{avgBeta.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Percent className="h-4 w-4 text-indigo-400" /> Rate Scenarios</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SCENARIOS.map((s) => (
            <div key={s.name} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{s.name}</p>
                <p className="text-xs text-gray-500">Rf {s.riskFree}% &middot; ERP {s.equityPremium}% &middot; Beta {s.beta}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">WACC {s.wacc}%</p>
                  <p className="text-[10px] text-gray-500">IV {formatCurrency(s.impliedValue)} vs {formatCurrency(s.currentPrice)}</p>
                </div>
                <Badge variant={verdictVariant(s.verdict)}>{s.verdict}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
