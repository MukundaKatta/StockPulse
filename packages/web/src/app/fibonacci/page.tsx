'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { Ruler } from 'lucide-react';

const FIB_LEVELS = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.0];
const FIB_EXTENSIONS = [1.0, 1.272, 1.414, 1.618, 2.0, 2.618];

export default function FibonacciPage() {
  const [highPrice, setHighPrice] = useState('520');
  const [lowPrice, setLowPrice] = useState('420');
  const [direction, setDirection] = useState<'retracement' | 'extension'>('retracement');

  const levels = useMemo(() => {
    const high = parseFloat(highPrice) || 0;
    const low = parseFloat(lowPrice) || 0;
    if (!high || !low || high <= low) return [];

    const range = high - low;
    const ratios = direction === 'retracement' ? FIB_LEVELS : FIB_EXTENSIONS;

    return ratios.map((ratio) => ({
      ratio,
      price: direction === 'retracement' ? high - range * ratio : low + range * ratio,
      label: `${(ratio * 100).toFixed(1)}%`,
    }));
  }, [highPrice, lowPrice, direction]);

  const high = parseFloat(highPrice) || 0;
  const low = parseFloat(lowPrice) || 0;
  const range = high - low;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Fibonacci Calculator</h1>
        <p className="mt-1 text-sm text-gray-500">Calculate retracement and extension levels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-indigo-400" />
            Price Range
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input label="Swing High ($)" type="number" step="0.01" value={highPrice} onChange={(e) => setHighPrice(e.target.value)} />
          <Input label="Swing Low ($)" type="number" step="0.01" value={lowPrice} onChange={(e) => setLowPrice(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['retracement', 'extension'] as const).map((d) => (
            <button key={d} onClick={() => setDirection(d)}
              className={cn('rounded-lg px-4 py-2 text-xs font-medium capitalize border transition-colors', direction === d ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/[0.06]')}
            >{d}</button>
          ))}
        </div>
      </Card>

      {levels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fibonacci {direction === 'retracement' ? 'Retracement' : 'Extension'} Levels</CardTitle>
          </CardHeader>
          <div className="space-y-1">
            {levels.map((level) => {
              const pctFromHigh = range > 0 ? ((high - level.price) / range) * 100 : 0;
              const barWidth = direction === 'retracement'
                ? Math.max(0, Math.min(100, level.ratio * 100))
                : Math.max(0, Math.min(100, ((level.price - low) / (levels[levels.length - 1].price - low)) * 100));
              return (
                <div key={level.ratio} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/[0.02]">
                  <span className={cn('w-14 text-xs font-mono font-medium', level.ratio === 0.618 || level.ratio === 0.5 ? 'text-amber-400' : 'text-gray-400')}>
                    {level.label}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', level.ratio === 0.618 ? 'bg-amber-500' : level.ratio === 0.5 ? 'bg-amber-500/70' : 'bg-indigo-500/50')}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className={cn('w-20 text-right text-sm font-mono font-medium', level.ratio === 0.618 || level.ratio === 0.5 ? 'text-amber-400' : 'text-white')}>
                    {formatCurrency(level.price)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06]">
            <p className="text-[10px] text-gray-600">
              {direction === 'retracement'
                ? 'Key levels: 38.2%, 50%, and 61.8% are common support/resistance areas during pullbacks.'
                : 'Key extensions: 127.2% and 161.8% are common profit targets for breakout moves.'}
            </p>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
