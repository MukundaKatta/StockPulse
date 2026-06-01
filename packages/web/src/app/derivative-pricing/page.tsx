'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

interface DerivativeModel {
  name: string;
  underlying: string;
  modelPrice: number;
  marketPrice: number;
  delta: number;
  gamma: number;
  theta: number;
  status: 'Undervalued' | 'Overvalued' | 'Fair Value';
}

const MODELS: DerivativeModel[] = [
  { name: 'SPY 480C Jun', underlying: 'SPY', modelPrice: 12.45, marketPrice: 11.80, delta: 0.62, gamma: 0.018, theta: -0.15, status: 'Undervalued' },
  { name: 'AAPL 190P Jul', underlying: 'AAPL', modelPrice: 5.30, marketPrice: 6.10, delta: -0.35, gamma: 0.022, theta: -0.08, status: 'Overvalued' },
  { name: 'TSLA 250C Jun', underlying: 'TSLA', modelPrice: 18.90, marketPrice: 18.75, delta: 0.48, gamma: 0.012, theta: -0.22, status: 'Fair Value' },
  { name: 'NVDA 900C Jul', underlying: 'NVDA', modelPrice: 42.10, marketPrice: 38.50, delta: 0.55, gamma: 0.008, theta: -0.35, status: 'Undervalued' },
  { name: 'QQQ 420P Jun', underlying: 'QQQ', modelPrice: 8.20, marketPrice: 9.45, delta: -0.42, gamma: 0.015, theta: -0.12, status: 'Overvalued' },
  { name: 'AMZN 185C Aug', underlying: 'AMZN', modelPrice: 14.65, marketPrice: 14.50, delta: 0.58, gamma: 0.014, theta: -0.10, status: 'Fair Value' },
  { name: 'META 500C Jul', underlying: 'META', modelPrice: 22.30, marketPrice: 19.80, delta: 0.44, gamma: 0.010, theta: -0.18, status: 'Undervalued' },
];

const statusVariant = (s: string) => s === 'Undervalued' ? 'success' : s === 'Overvalued' ? 'danger' : 'default';

export default function DerivativePricingPage() {
  const undervalued = MODELS.filter(m => m.status === 'Undervalued').length;
  const avgMispricing = MODELS.reduce((s, m) => s + Math.abs(m.modelPrice - m.marketPrice), 0) / MODELS.length;
  const totalModels = MODELS.length;
  const avgDelta = MODELS.reduce((s, m) => s + Math.abs(m.delta), 0) / MODELS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Derivative Pricing</h1>
        <p className="mt-1 text-sm text-gray-500">Black-Scholes and binomial pricing models</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Models</p><p className="text-lg font-bold text-white">{totalModels}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Undervalued</p><p className="text-lg font-bold text-green-400">{undervalued}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Mispricing</p><p className="text-lg font-bold text-indigo-400">{formatCurrency(avgMispricing)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg |Delta|</p><p className="text-lg font-bold text-amber-400">{avgDelta.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> Pricing Models</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {MODELS.map((m) => (
            <div key={m.name} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{m.name}</p>
                <p className="text-xs text-gray-500">Delta {m.delta} &middot; Gamma {m.gamma} &middot; Theta {m.theta}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">Model {formatCurrency(m.modelPrice)}</p>
                  <p className="text-[10px] text-gray-500">Mkt {formatCurrency(m.marketPrice)}</p>
                </div>
                <Badge variant={statusVariant(m.status)}>{m.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
