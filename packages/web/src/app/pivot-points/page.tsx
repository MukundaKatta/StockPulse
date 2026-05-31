'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency, cn } from '@/lib/formatters';
import { ArrowUpDown } from 'lucide-react';

type PivotMethod = 'classic' | 'fibonacci' | 'woodie' | 'camarilla';

export default function PivotPointsPage() {
  const [high, setHigh] = useState('192.50');
  const [low, setLow] = useState('185.20');
  const [close, setClose] = useState('189.45');
  const [method, setMethod] = useState<PivotMethod>('classic');

  const levels = useMemo(() => {
    const h = parseFloat(high) || 0;
    const l = parseFloat(low) || 0;
    const c = parseFloat(close) || 0;
    if (!h || !l || !c) return null;

    const pivot = (h + l + c) / 3;
    const range = h - l;

    if (method === 'classic') {
      return {
        r3: h + 2 * (pivot - l),
        r2: pivot + range,
        r1: 2 * pivot - l,
        pivot,
        s1: 2 * pivot - h,
        s2: pivot - range,
        s3: l - 2 * (h - pivot),
      };
    }
    if (method === 'fibonacci') {
      return {
        r3: pivot + range * 1.0,
        r2: pivot + range * 0.618,
        r1: pivot + range * 0.382,
        pivot,
        s1: pivot - range * 0.382,
        s2: pivot - range * 0.618,
        s3: pivot - range * 1.0,
      };
    }
    if (method === 'woodie') {
      const wPivot = (h + l + 2 * c) / 4;
      return {
        r3: h + 2 * (wPivot - l),
        r2: wPivot + range,
        r1: 2 * wPivot - l,
        pivot: wPivot,
        s1: 2 * wPivot - h,
        s2: wPivot - range,
        s3: l - 2 * (h - wPivot),
      };
    }
    // camarilla
    return {
      r3: c + range * 1.1 / 4,
      r2: c + range * 1.1 / 6,
      r1: c + range * 1.1 / 12,
      pivot,
      s1: c - range * 1.1 / 12,
      s2: c - range * 1.1 / 6,
      s3: c - range * 1.1 / 4,
    };
  }, [high, low, close, method]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Pivot Points</h1>
        <p className="mt-1 text-sm text-gray-500">Calculate support and resistance levels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-indigo-400" />
            Previous Session
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Input label="High ($)" type="number" step="0.01" value={high} onChange={(e) => setHigh(e.target.value)} />
          <Input label="Low ($)" type="number" step="0.01" value={low} onChange={(e) => setLow(e.target.value)} />
          <Input label="Close ($)" type="number" step="0.01" value={close} onChange={(e) => setClose(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['classic', 'fibonacci', 'woodie', 'camarilla'] as const).map((m) => (
            <button key={m} onClick={() => setMethod(m)}
              className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors', method === m ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-500 hover:text-gray-300')}
            >{m}</button>
          ))}
        </div>
      </Card>

      {levels && (
        <Card>
          <CardHeader>
            <CardTitle>Pivot Levels ({method})</CardTitle>
          </CardHeader>
          <div className="space-y-1.5">
            {[
              { label: 'R3', value: levels.r3, color: 'text-red-400' },
              { label: 'R2', value: levels.r2, color: 'text-red-400' },
              { label: 'R1', value: levels.r1, color: 'text-red-300' },
              { label: 'Pivot', value: levels.pivot, color: 'text-amber-400' },
              { label: 'S1', value: levels.s1, color: 'text-green-300' },
              { label: 'S2', value: levels.s2, color: 'text-green-400' },
              { label: 'S3', value: levels.s3, color: 'text-green-400' },
            ].map((level) => {
              const c = parseFloat(close) || 0;
              const distFromClose = c ? ((level.value - c) / c * 100) : 0;
              return (
                <div key={level.label} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/[0.02]">
                  <span className={cn('w-10 text-xs font-medium', level.color)}>{level.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 relative overflow-hidden">
                    <div className={cn('absolute h-full rounded-full', level.label.startsWith('R') ? 'bg-red-500/40' : level.label === 'Pivot' ? 'bg-amber-500/40' : 'bg-green-500/40')}
                      style={{ width: `${50 + distFromClose * 5}%` }} />
                  </div>
                  <span className={cn('w-20 text-right text-sm font-mono font-medium', level.color)}>{formatCurrency(level.value)}</span>
                  <span className="w-14 text-right text-[10px] font-mono text-gray-600">{distFromClose >= 0 ? '+' : ''}{distFromClose.toFixed(2)}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </motion.div>
  );
}
