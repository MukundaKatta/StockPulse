'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Gauge, TrendingUp, TrendingDown } from 'lucide-react';

interface FGComponent {
  name: string;
  value: number;
  signal: string;
  weight: number;
}

const COMPONENTS: FGComponent[] = [
  { name: 'Market Momentum', value: 72, signal: 'Greed', weight: 25 },
  { name: 'Stock Price Strength', value: 65, signal: 'Greed', weight: 25 },
  { name: 'Stock Price Breadth', value: 58, signal: 'Neutral', weight: 12.5 },
  { name: 'Put/Call Ratio', value: 45, signal: 'Neutral', weight: 12.5 },
  { name: 'Market Volatility (VIX)', value: 78, signal: 'Extreme Greed', weight: 12.5 },
  { name: 'Safe Haven Demand', value: 35, signal: 'Fear', weight: 6.25 },
  { name: 'Junk Bond Demand', value: 68, signal: 'Greed', weight: 6.25 },
];

function getLabel(value: number): { text: string; color: string } {
  if (value >= 80) return { text: 'Extreme Greed', color: 'text-green-400' };
  if (value >= 60) return { text: 'Greed', color: 'text-green-400' };
  if (value >= 40) return { text: 'Neutral', color: 'text-yellow-400' };
  if (value >= 20) return { text: 'Fear', color: 'text-red-400' };
  return { text: 'Extreme Fear', color: 'text-red-400' };
}

function getGaugeColor(value: number): string {
  if (value >= 80) return '#22c55e';
  if (value >= 60) return '#4ade80';
  if (value >= 40) return '#eab308';
  if (value >= 20) return '#f87171';
  return '#ef4444';
}

export default function FearGreedPage() {
  const compositeScore = Math.round(COMPONENTS.reduce((s, c) => s + c.value * (c.weight / 100), 0));
  const label = getLabel(compositeScore);

  const history = [
    { period: 'Today', value: compositeScore },
    { period: 'Yesterday', value: 62 },
    { period: '1 Week Ago', value: 55 },
    { period: '1 Month Ago', value: 42 },
    { period: '1 Year Ago', value: 38 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Fear & Greed Index</h1>
        <p className="mt-1 text-sm text-gray-500">Market sentiment composite gauge</p>
      </div>

      <Card className="!p-6">
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-24 overflow-hidden">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path d="M 10 95 A 85 85 0 0 1 190 95" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round" />
              <path d="M 10 95 A 85 85 0 0 1 190 95" fill="none" stroke={getGaugeColor(compositeScore)} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${compositeScore * 2.67} 267`} />
              <line x1={100 + 70 * Math.cos(Math.PI - (compositeScore / 100) * Math.PI)} y1={95 - 70 * Math.sin(Math.PI - (compositeScore / 100) * Math.PI)} x2="100" y2="95" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="95" r="4" fill="white" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-white mt-2">{compositeScore}</p>
          <p className={cn('text-sm font-medium', label.color)}>{label.text}</p>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Historical Comparison</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {history.map((h) => {
            const l = getLabel(h.value);
            return (
              <div key={h.period} className="flex items-center justify-between py-2.5 px-2">
                <span className="text-sm text-gray-400">{h.period}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${h.value}%`, backgroundColor: getGaugeColor(h.value) }} />
                  </div>
                  <span className="text-sm font-mono text-white w-8 text-right">{h.value}</span>
                  <span className={cn('text-xs w-24', l.color)}>{l.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Gauge className="h-4 w-4 text-indigo-400" /> Components</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {COMPONENTS.map((comp) => {
            const l = getLabel(comp.value);
            return (
              <div key={comp.name} className="flex items-center gap-3 py-2.5 px-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{comp.name}</p>
                  <p className="text-[10px] text-gray-600">Weight: {comp.weight}%</p>
                </div>
                <div className="w-20 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${comp.value}%`, backgroundColor: getGaugeColor(comp.value) }} />
                </div>
                <span className="text-xs font-mono text-white w-8 text-right">{comp.value}</span>
                <Badge variant={comp.value >= 60 ? 'success' : comp.value <= 40 ? 'danger' : 'warning'} className="text-[9px] w-20 justify-center">{comp.signal}</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
