'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Repeat, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function DCACalculatorPage() {
  const [symbol, setSymbol] = useState('SPY');
  const [amount, setAmount] = useState('500');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('monthly');
  const [duration, setDuration] = useState('24');
  const [startPrice, setStartPrice] = useState('450');
  const [endPrice, setEndPrice] = useState('520');

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    const months = parseInt(duration) || 0;
    const start = parseFloat(startPrice) || 0;
    const end = parseFloat(endPrice) || 0;
    if (!amt || !months || !start || !end) return null;

    const periodsPerMonth = frequency === 'weekly' ? 4.33 : frequency === 'biweekly' ? 2.17 : 1;
    const totalPeriods = Math.round(months * periodsPerMonth);
    const totalInvested = amt * totalPeriods;

    let totalShares = 0;
    const priceChange = (end - start) / totalPeriods;

    for (let i = 0; i < totalPeriods; i++) {
      const price = start + priceChange * i + (Math.sin(i * 0.5) * start * 0.03);
      const actualPrice = Math.max(price, start * 0.5);
      totalShares += amt / actualPrice;
    }

    const avgCost = totalInvested / totalShares;
    const currentValue = totalShares * end;
    const gainLoss = currentValue - totalInvested;
    const returnPct = (gainLoss / totalInvested) * 100;

    const lumpSumShares = totalInvested / start;
    const lumpSumValue = lumpSumShares * end;
    const lumpSumReturn = ((lumpSumValue - totalInvested) / totalInvested) * 100;

    return {
      totalInvested,
      totalShares,
      avgCost,
      currentValue,
      gainLoss,
      returnPct,
      totalPeriods,
      lumpSumValue,
      lumpSumReturn,
    };
  }, [amount, frequency, duration, startPrice, endPrice]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">DCA Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Dollar-Cost Averaging simulation tool</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-indigo-400" />
            Parameters
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Input label="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} />
          <Input label="Amount per Period ($)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-400">Frequency</label>
            <div className="flex gap-1">
              {(['weekly', 'biweekly', 'monthly'] as const).map((f) => (
                <button key={f} onClick={() => setFrequency(f)}
                  className={cn('flex-1 rounded-lg py-2 text-[10px] font-medium border', frequency === f ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/[0.06]')}
                >{f}</button>
              ))}
            </div>
          </div>
          <Input label="Duration (months)" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <Input label="Start Price ($)" type="number" step="0.01" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} />
          <Input label="End Price ($)" type="number" step="0.01" value={endPrice} onChange={(e) => setEndPrice(e.target.value)} />
        </div>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Total Invested</p>
              <p className="text-sm font-bold text-white">{formatCurrency(result.totalInvested)}</p>
              <p className="text-[10px] text-gray-600">{result.totalPeriods} purchases</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Current Value</p>
              <p className="text-sm font-bold text-white">{formatCurrency(result.currentValue)}</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Avg Cost</p>
              <p className="text-sm font-bold text-white">{formatCurrency(result.avgCost)}</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">DCA Return</p>
              <p className={cn('text-sm font-bold', result.returnPct >= 0 ? 'text-green-400' : 'text-red-400')}>
                {result.returnPct >= 0 ? '+' : ''}{result.returnPct.toFixed(2)}%
              </p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>DCA vs Lump Sum</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
                <p className="text-xs font-medium text-indigo-400 mb-2">Dollar-Cost Averaging</p>
                <p className="text-lg font-bold text-white">{formatCurrency(result.currentValue)}</p>
                <p className={cn('text-xs font-mono', result.returnPct >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {result.returnPct >= 0 ? '+' : ''}{result.returnPct.toFixed(2)}% return
                </p>
                <p className="text-[10px] text-gray-500 mt-1">{result.totalShares.toFixed(4)} shares @ avg {formatCurrency(result.avgCost)}</p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-xs font-medium text-gray-400 mb-2">Lump Sum</p>
                <p className="text-lg font-bold text-white">{formatCurrency(result.lumpSumValue)}</p>
                <p className={cn('text-xs font-mono', result.lumpSumReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {result.lumpSumReturn >= 0 ? '+' : ''}{result.lumpSumReturn.toFixed(2)}% return
                </p>
                <p className="text-[10px] text-gray-500 mt-1">All invested at {formatCurrency(parseFloat(startPrice))}</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </motion.div>
  );
}
