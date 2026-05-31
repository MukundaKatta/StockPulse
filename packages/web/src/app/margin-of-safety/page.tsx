'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Shield, AlertTriangle } from 'lucide-react';

export default function MarginOfSafetyPage() {
  const [eps, setEps] = useState('6.50');
  const [growthRate, setGrowthRate] = useState('12');
  const [peRatio, setPeRatio] = useState('15');
  const [discountRate, setDiscountRate] = useState('10');
  const [currentPrice, setCurrentPrice] = useState('185');
  const [years, setYears] = useState('10');

  const e = parseFloat(eps) || 0;
  const g = (parseFloat(growthRate) || 0) / 100;
  const pe = parseFloat(peRatio) || 0;
  const dr = (parseFloat(discountRate) || 0) / 100;
  const price = parseFloat(currentPrice) || 0;
  const yrs = parseInt(years) || 0;

  const futureEPS = e * Math.pow(1 + g, yrs);
  const futurePrice = futureEPS * pe;
  const intrinsicValue = futurePrice / Math.pow(1 + dr, yrs);
  const margin = ((intrinsicValue - price) / intrinsicValue) * 100;

  const mosLevels = [10, 20, 30, 40, 50].map((pct) => ({
    mos: pct,
    buyPrice: intrinsicValue * (1 - pct / 100),
    isBuyable: price <= intrinsicValue * (1 - pct / 100),
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Margin of Safety</h1>
        <p className="mt-1 text-sm text-gray-500">Graham-style intrinsic value and safety margin</p>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Current EPS</label><Input type="number" step="0.1" value={eps} onChange={(e) => setEps(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Growth Rate (%)</label><Input type="number" step="0.5" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Terminal P/E</label><Input type="number" step="0.5" value={peRatio} onChange={(e) => setPeRatio(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Discount Rate (%)</label><Input type="number" step="0.5" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Current Price</label><Input type="number" step="0.01" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Projection Years</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} /></div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Intrinsic Value</p><p className="text-lg font-bold text-green-400">${intrinsicValue.toFixed(2)}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Current Price</p><p className="text-lg font-bold text-white">${price.toFixed(2)}</p></Card>
        <Card className={cn('!p-4 ring-1', margin >= 20 ? 'ring-green-500/20' : margin >= 0 ? 'ring-yellow-500/20' : 'ring-red-500/20')}>
          <p className="text-[10px] text-gray-500 uppercase">Margin of Safety</p>
          <p className={cn('text-lg font-bold', margin >= 20 ? 'text-green-400' : margin >= 0 ? 'text-yellow-400' : 'text-red-400')}>{margin.toFixed(1)}%</p>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-indigo-400" /> Buy Price at Safety Levels</CardTitle></CardHeader>
        <div className="space-y-2 px-2 pb-3">
          {mosLevels.map((level) => (
            <div key={level.mos} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-12">{level.mos}% MoS</span>
              <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-indigo-500/30 rounded-full" style={{ width: `${(level.buyPrice / intrinsicValue) * 100}%` }} />
                {price <= intrinsicValue && <div className="absolute inset-y-0 w-px bg-white/50" style={{ left: `${(price / intrinsicValue) * 100}%` }} />}
              </div>
              <span className={cn('text-xs font-mono w-16 text-right', level.isBuyable ? 'text-green-400' : 'text-gray-500')}>${level.buyPrice.toFixed(2)}</span>
              {level.isBuyable && <span className="text-[9px] text-green-400">BUY</span>}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
