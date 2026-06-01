'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

function normalCDF(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

function bsPrice(S: number, K: number, T: number, r: number, sigma: number, type: 'call' | 'put') {
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  if (type === 'call') return S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
  return K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
}

function greeks(S: number, K: number, T: number, r: number, sigma: number) {
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const nd1 = Math.exp(-d1 * d1 / 2) / Math.sqrt(2 * Math.PI);
  return {
    delta: normalCDF(d1),
    gamma: nd1 / (S * sigma * Math.sqrt(T)),
    theta: -(S * nd1 * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normalCDF(d2),
    vega: S * nd1 * Math.sqrt(T) / 100,
    rho: K * T * Math.exp(-r * T) * normalCDF(d2) / 100,
  };
}

export default function BlackScholesPage() {
  const [S] = useState(186.05);
  const [K] = useState(190);
  const [T] = useState(0.12);
  const [r] = useState(0.055);
  const [sigma] = useState(0.225);

  const callPrice = bsPrice(S, K, T, r, sigma, 'call');
  const putPrice = bsPrice(S, K, T, r, sigma, 'put');
  const g = greeks(S, K, T, r, sigma);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Black-Scholes Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Options pricing model with Greeks</p>
      </div>

      <Card className="!p-4">
        <div className="grid grid-cols-5 gap-3 text-center">
          {[{ l: 'Stock', v: `$${S}` }, { l: 'Strike', v: `$${K}` }, { l: 'Time', v: `${(T * 365).toFixed(0)}d` }, { l: 'Rate', v: `${(r * 100).toFixed(1)}%` }, { l: 'IV', v: `${(sigma * 100).toFixed(1)}%` }].map((p) => (
            <div key={p.l}><p className="text-[10px] text-gray-500 uppercase">{p.l}</p><p className="text-sm font-bold text-white">{p.v}</p></div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="!p-4 text-center"><p className="text-[10px] text-gray-500 uppercase">Call Price</p><p className="text-2xl font-bold text-green-400">${callPrice.toFixed(2)}</p></Card>
        <Card className="!p-4 text-center"><p className="text-[10px] text-gray-500 uppercase">Put Price</p><p className="text-2xl font-bold text-red-400">${putPrice.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> Greeks</CardTitle></CardHeader>
        <div className="grid grid-cols-5 gap-px bg-white/5">
          {[{ l: 'Delta (Δ)', v: g.delta.toFixed(4), c: 'text-green-400' }, { l: 'Gamma (Γ)', v: g.gamma.toFixed(4), c: 'text-yellow-400' }, { l: 'Theta (Θ)', v: g.theta.toFixed(4), c: 'text-red-400' }, { l: 'Vega (ν)', v: g.vega.toFixed(4), c: 'text-indigo-400' }, { l: 'Rho (ρ)', v: g.rho.toFixed(4), c: 'text-gray-400' }].map((gr) => (
            <div key={gr.l} className="bg-[#12121a] p-3 text-center"><p className="text-[10px] text-gray-500">{gr.l}</p><p className={cn('text-sm font-mono font-bold mt-0.5', gr.c)}>{gr.v}</p></div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
