'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Star } from 'lucide-react';

interface StockScore {
  symbol: string;
  name: string;
  overall: number;
  value: number;
  growth: number;
  profitability: number;
  momentum: number;
  safety: number;
  grade: string;
}

const SCORES: StockScore[] = [
  { symbol: 'NVDA', name: 'NVIDIA', overall: 92, value: 45, growth: 98, profitability: 95, momentum: 99, safety: 72, grade: 'A+' },
  { symbol: 'MSFT', name: 'Microsoft', overall: 88, value: 62, growth: 82, profitability: 98, momentum: 85, safety: 92, grade: 'A' },
  { symbol: 'AAPL', name: 'Apple', overall: 85, value: 58, growth: 68, profitability: 96, momentum: 78, safety: 95, grade: 'A' },
  { symbol: 'META', name: 'Meta', overall: 84, value: 72, growth: 88, profitability: 90, momentum: 92, safety: 68, grade: 'A-' },
  { symbol: 'GOOGL', name: 'Alphabet', overall: 82, value: 75, growth: 78, profitability: 88, momentum: 72, safety: 90, grade: 'A-' },
  { symbol: 'AMZN', name: 'Amazon', overall: 78, value: 48, growth: 85, profitability: 72, momentum: 82, safety: 80, grade: 'B+' },
  { symbol: 'JPM', name: 'JP Morgan', overall: 74, value: 82, growth: 55, profitability: 78, momentum: 68, safety: 85, grade: 'B+' },
  { symbol: 'TSLA', name: 'Tesla', overall: 58, value: 22, growth: 72, profitability: 52, momentum: 35, safety: 42, grade: 'C+' },
];

function scoreColor(score: number): string {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
}

function gradeColor(grade: string): 'success' | 'warning' | 'danger' | 'default' {
  if (grade.startsWith('A')) return 'success';
  if (grade.startsWith('B')) return 'warning';
  return 'danger';
}

export default function StockScorePage() {
  const avgScore = SCORES.reduce((s, sc) => s + sc.overall, 0) / SCORES.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Scores</h1>
        <p className="mt-1 text-sm text-gray-500">Composite scoring across value, growth, profitability, momentum, and safety</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Score</p><p className={cn('text-lg font-bold', scoreColor(avgScore))}>{avgScore.toFixed(0)}/100</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">A-Rated</p><p className="text-lg font-bold text-green-400">{SCORES.filter((s) => s.grade.startsWith('A')).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Stocks Scored</p><p className="text-lg font-bold text-white">{SCORES.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 text-indigo-400" /> Score Breakdown</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {SCORES.sort((a, b) => b.overall - a.overall).map((s) => (
            <div key={s.symbol} className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{s.symbol}</span>
                  <span className="text-[10px] text-gray-500">{s.name}</span>
                  <Badge variant={gradeColor(s.grade)}>{s.grade}</Badge>
                </div>
                <span className={cn('text-sm font-bold font-mono', scoreColor(s.overall))}>{s.overall}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: 'Value', val: s.value },
                  { label: 'Growth', val: s.growth },
                  { label: 'Profit', val: s.profitability },
                  { label: 'Momentum', val: s.momentum },
                  { label: 'Safety', val: s.safety },
                ].map((dim) => (
                  <div key={dim.label} className="space-y-0.5">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-gray-500">{dim.label}</span>
                      <span className={cn('font-mono', scoreColor(dim.val))}>{dim.val}</span>
                    </div>
                    <div className="h-1 rounded bg-white/5">
                      <div className={cn('h-full rounded', dim.val >= 80 ? 'bg-green-500' : dim.val >= 60 ? 'bg-yellow-500' : dim.val >= 40 ? 'bg-orange-500' : 'bg-red-500')} style={{ width: `${dim.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
