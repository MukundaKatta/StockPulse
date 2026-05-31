'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

export default function OptionGreeksPage() {
  const [stockPrice, setStockPrice] = useState('190');
  const [strikePrice, setStrikePrice] = useState('195');
  const [daysToExpiry, setDaysToExpiry] = useState('30');
  const [volatility, setVolatility] = useState('25');
  const [riskFreeRate, setRiskFreeRate] = useState('5.25');
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');

  const greeks = useMemo(() => {
    const S = parseFloat(stockPrice) || 0;
    const K = parseFloat(strikePrice) || 0;
    const T = (parseFloat(daysToExpiry) || 0) / 365;
    const sigma = (parseFloat(volatility) || 0) / 100;
    const r = (parseFloat(riskFreeRate) || 0) / 100;

    if (!S || !K || !T || !sigma) return null;

    const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const normCDF = (x: number) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(x));
      const d = 0.3989422804 * Math.exp(-x * x / 2);
      const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return x > 0 ? 1 - p : p;
    };

    const normPDF = (x: number) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);

    const delta = optionType === 'call' ? normCDF(d1) : normCDF(d1) - 1;
    const gamma = normPDF(d1) / (S * sigma * Math.sqrt(T));
    const vega = S * normPDF(d1) * Math.sqrt(T) / 100;
    const theta = optionType === 'call'
      ? (-(S * normPDF(d1) * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normCDF(d2)) / 365
      : (-(S * normPDF(d1) * sigma) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * normCDF(-d2)) / 365;
    const rho = optionType === 'call'
      ? K * T * Math.exp(-r * T) * normCDF(d2) / 100
      : -K * T * Math.exp(-r * T) * normCDF(-d2) / 100;

    const price = optionType === 'call'
      ? S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2)
      : K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1);

    return { delta, gamma, vega, theta, rho, price };
  }, [stockPrice, strikePrice, daysToExpiry, volatility, riskFreeRate, optionType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Option Greeks Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Black-Scholes option pricing and greeks</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-indigo-400" />
            Parameters
          </CardTitle>
        </CardHeader>
        <div className="flex gap-2 mb-4">
          {(['call', 'put'] as const).map((t) => (
            <button key={t} onClick={() => setOptionType(t)}
              className={cn('rounded-lg px-4 py-2 text-xs font-medium capitalize border', optionType === t ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/[0.06]')}
            >{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Input label="Stock Price ($)" type="number" step="0.01" value={stockPrice} onChange={(e) => setStockPrice(e.target.value)} />
          <Input label="Strike Price ($)" type="number" step="0.01" value={strikePrice} onChange={(e) => setStrikePrice(e.target.value)} />
          <Input label="Days to Expiry" type="number" value={daysToExpiry} onChange={(e) => setDaysToExpiry(e.target.value)} />
          <Input label="IV (%)" type="number" step="0.1" value={volatility} onChange={(e) => setVolatility(e.target.value)} />
          <Input label="Risk-Free Rate (%)" type="number" step="0.01" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} />
        </div>
      </Card>

      {greeks && (
        <>
          <Card className="!p-4">
            <p className="text-[10px] text-gray-500 uppercase mb-1">Theoretical Price</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(greeks.price)}</p>
            <p className="text-[10px] text-gray-600">{optionType === 'call' ? 'Call' : 'Put'} option value per share</p>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Delta (Δ)', value: greeks.delta.toFixed(4), desc: 'Price sensitivity', color: 'text-indigo-400' },
              { label: 'Gamma (Γ)', value: greeks.gamma.toFixed(4), desc: 'Delta change rate', color: 'text-green-400' },
              { label: 'Vega (ν)', value: greeks.vega.toFixed(4), desc: 'Vol sensitivity', color: 'text-purple-400' },
              { label: 'Theta (Θ)', value: greeks.theta.toFixed(4), desc: 'Time decay/day', color: 'text-red-400' },
              { label: 'Rho (ρ)', value: greeks.rho.toFixed(4), desc: 'Rate sensitivity', color: 'text-amber-400' },
            ].map((g) => (
              <Card key={g.label} className="!p-3">
                <p className="text-[10px] text-gray-500">{g.label}</p>
                <p className={cn('text-sm font-bold font-mono', g.color)}>{g.value}</p>
                <p className="text-[10px] text-gray-600">{g.desc}</p>
              </Card>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
