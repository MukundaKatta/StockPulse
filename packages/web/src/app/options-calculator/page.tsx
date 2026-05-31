'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

export default function OptionsCalculatorPage() {
  const [stockPrice, setStockPrice] = useState('185');
  const [strikePrice, setStrikePrice] = useState('190');
  const [premium, setPremium] = useState('5.50');
  const [contracts, setContracts] = useState('1');
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');

  const stock = parseFloat(stockPrice) || 0;
  const strike = parseFloat(strikePrice) || 0;
  const prem = parseFloat(premium) || 0;
  const qty = parseInt(contracts) || 1;
  const totalPremium = prem * 100 * qty;

  const breakeven = optionType === 'call' ? strike + prem : strike - prem;
  const maxLoss = totalPremium;
  const maxGain = optionType === 'call' ? Infinity : (strike - prem) * 100 * qty;
  const intrinsic = optionType === 'call' ? Math.max(0, stock - strike) : Math.max(0, strike - stock);
  const timeValue = Math.max(0, prem - intrinsic);
  const moneyness = optionType === 'call' ? (stock > strike ? 'ITM' : stock === strike ? 'ATM' : 'OTM') : (stock < strike ? 'ITM' : stock === strike ? 'ATM' : 'OTM');

  const pnlAtExpiry = Array.from({ length: 11 }, (_, i) => {
    const priceMove = (i - 5) * 5;
    const price = stock * (1 + priceMove / 100);
    const payoff = optionType === 'call' ? Math.max(0, price - strike) - prem : Math.max(0, strike - price) - prem;
    return { priceMove, price, pnl: payoff * 100 * qty };
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Options Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">P&L analysis for single options positions</p>
      </div>

      <Card className="!p-5">
        <div className="flex gap-2 mb-4">
          {(['call', 'put'] as const).map((t) => (
            <button key={t} onClick={() => setOptionType(t)} className={cn('rounded-md px-4 py-1.5 text-xs uppercase font-medium', optionType === t ? (t === 'call' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400') : 'text-gray-500 hover:text-gray-300')}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><label className="text-xs text-gray-500 mb-1 block">Stock Price</label><Input type="number" step="0.01" value={stockPrice} onChange={(e) => setStockPrice(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Strike Price</label><Input type="number" step="0.5" value={strikePrice} onChange={(e) => setStrikePrice(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Premium</label><Input type="number" step="0.05" value={premium} onChange={(e) => setPremium(e.target.value)} /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Contracts</label><Input type="number" value={contracts} onChange={(e) => setContracts(e.target.value)} /></div>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Breakeven</p><p className="text-sm font-bold text-indigo-400">${breakeven.toFixed(2)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Max Loss</p><p className="text-sm font-bold text-red-400">{formatCurrency(maxLoss)}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Intrinsic</p><p className="text-sm font-bold text-white">${intrinsic.toFixed(2)}</p><p className="text-[10px] text-gray-500">{moneyness}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Time Value</p><p className="text-sm font-bold text-yellow-400">${timeValue.toFixed(2)}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> P&L at Expiry</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {pnlAtExpiry.map((row) => (
            <div key={row.priceMove} className="flex items-center gap-3 py-1.5 px-2">
              <span className={cn('text-xs w-12', row.priceMove >= 0 ? 'text-green-400' : 'text-red-400')}>{row.priceMove >= 0 ? '+' : ''}{row.priceMove}%</span>
              <span className="text-xs font-mono text-gray-400 w-16">${row.price.toFixed(2)}</span>
              <div className="flex-1 h-3 relative">
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
                {row.pnl >= 0 ? (
                  <div className="absolute inset-y-0 left-1/2 bg-green-500/40 rounded-r" style={{ width: `${Math.min(Math.abs(row.pnl) / maxLoss * 50, 50)}%` }} />
                ) : (
                  <div className="absolute inset-y-0 right-1/2 bg-red-500/40 rounded-l" style={{ width: `${Math.min(Math.abs(row.pnl) / maxLoss * 50, 50)}%` }} />
                )}
              </div>
              <span className={cn('text-xs font-mono w-20 text-right', row.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>{row.pnl >= 0 ? '+' : ''}{formatCurrency(row.pnl)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
