'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import type { TechnicalIndicators } from '@/types';

interface TechnicalPanelProps {
  indicators: TechnicalIndicators;
}

function RSIGauge({ value }: { value: number }) {
  const angle = (value / 100) * 180 - 90;
  const isOverbought = value > 70;
  const isOversold = value < 30;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-40 overflow-hidden">
        <svg viewBox="0 0 200 100" className="h-full w-full">
          {/* Background arc */}
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round" />
          {/* Oversold zone (green) */}
          <path d="M 10 100 A 90 90 0 0 1 46 28" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="12" strokeLinecap="round" />
          {/* Overbought zone (red) */}
          <path d="M 154 28 A 90 90 0 0 1 190 100" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="12" strokeLinecap="round" />
          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
            y2={100 - 70 * Math.sin((angle * Math.PI) / 180)}
            stroke={isOverbought ? '#ef4444' : isOversold ? '#22c55e' : '#6366f1'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="4" fill={isOverbought ? '#ef4444' : isOversold ? '#22c55e' : '#6366f1'} />
        </svg>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="font-mono text-lg font-bold text-white">{value.toFixed(1)}</span>
        <Badge variant={isOversold ? 'success' : isOverbought ? 'danger' : 'default'}>
          {isOversold ? 'Oversold' : isOverbought ? 'Overbought' : 'Neutral'}
        </Badge>
      </div>
    </div>
  );
}

function MACDDisplay({ macd, signal, histogram }: { macd: number | null; signal: number | null; histogram: number | null }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-[10px] uppercase text-gray-500">MACD</div>
          <div className="font-mono text-sm font-medium text-white">{macd?.toFixed(2) ?? '-'}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-gray-500">Signal</div>
          <div className="font-mono text-sm font-medium text-white">{signal?.toFixed(2) ?? '-'}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-gray-500">Histogram</div>
          <div className={cn(
            'font-mono text-sm font-medium',
            histogram === null ? 'text-gray-400' : histogram > 0 ? 'text-green-400' : histogram < 0 ? 'text-red-400' : 'text-gray-400'
          )}>
            {histogram?.toFixed(2) ?? '-'}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechnicalPanel({ indicators }: TechnicalPanelProps) {
  const { signal } = indicators;

  return (
    <div className="space-y-4">
      {/* Signal Summary */}
      <Card hover>
        <CardHeader>
          <CardTitle>Signal Summary</CardTitle>
          <Badge variant={signal.signal === 'BUY' ? 'success' : signal.signal === 'SELL' ? 'danger' : 'warning'}>
            {signal.signal} ({signal.confidence}%)
          </Badge>
        </CardHeader>
        <div className="space-y-1">
          {signal.reasons.map((reason, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
              <span className={cn(
                'h-1.5 w-1.5 rounded-full',
                reason.includes('bullish') || reason.includes('oversold') || reason.includes('above')
                  ? 'bg-green-400'
                  : reason.includes('bearish') || reason.includes('overbought') || reason.includes('below')
                  ? 'bg-red-400'
                  : 'bg-gray-400'
              )} />
              {reason}
            </div>
          ))}
        </div>
      </Card>

      {/* RSI */}
      <Card hover>
        <CardHeader>
          <CardTitle>RSI (14)</CardTitle>
        </CardHeader>
        <RSIGauge value={indicators.rsi.current ?? 50} />
      </Card>

      {/* MACD */}
      <Card hover>
        <CardHeader>
          <CardTitle>MACD (12, 26, 9)</CardTitle>
        </CardHeader>
        <MACDDisplay
          macd={indicators.macd.current.macd}
          signal={indicators.macd.current.signal}
          histogram={indicators.macd.current.histogram}
        />
      </Card>
    </div>
  );
}
