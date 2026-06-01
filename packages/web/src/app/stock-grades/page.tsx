'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Award } from 'lucide-react';

interface StockGrade {
  symbol: string;
  name: string;
  overall: string;
  value: string;
  growth: string;
  profitability: string;
  momentum: string;
  revisions: string;
  sector: string;
}

const GRADES: StockGrade[] = [
  { symbol: 'NVDA', name: 'NVIDIA', overall: 'A+', value: 'D', growth: 'A+', profitability: 'A+', momentum: 'A+', revisions: 'A+', sector: 'Tech' },
  { symbol: 'MSFT', name: 'Microsoft', overall: 'A', value: 'C', growth: 'A-', profitability: 'A+', momentum: 'A', revisions: 'A', sector: 'Tech' },
  { symbol: 'GOOGL', name: 'Alphabet', overall: 'A-', value: 'B+', growth: 'B+', profitability: 'A', momentum: 'B', revisions: 'A-', sector: 'Tech' },
  { symbol: 'META', name: 'Meta', overall: 'A-', value: 'B', growth: 'A', profitability: 'A', momentum: 'A', revisions: 'B+', sector: 'Tech' },
  { symbol: 'JPM', name: 'JP Morgan', overall: 'B+', value: 'A-', growth: 'C+', profitability: 'A-', momentum: 'B', revisions: 'B+', sector: 'Finance' },
  { symbol: 'AAPL', name: 'Apple', overall: 'B+', value: 'C+', growth: 'C', profitability: 'A+', momentum: 'B-', revisions: 'B', sector: 'Tech' },
  { symbol: 'AMZN', name: 'Amazon', overall: 'B', value: 'D+', growth: 'A-', profitability: 'B-', momentum: 'B+', revisions: 'A-', sector: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla', overall: 'C', value: 'F', growth: 'B-', profitability: 'C+', momentum: 'D', revisions: 'D+', sector: 'Auto' },
];

function gradeColor(grade: string): string {
  if (grade.startsWith('A')) return 'text-green-400';
  if (grade.startsWith('B')) return 'text-blue-400';
  if (grade.startsWith('C')) return 'text-yellow-400';
  if (grade.startsWith('D')) return 'text-orange-400';
  return 'text-red-400';
}

function gradeBg(grade: string): string {
  if (grade.startsWith('A')) return 'bg-green-500/15';
  if (grade.startsWith('B')) return 'bg-blue-500/15';
  if (grade.startsWith('C')) return 'bg-yellow-500/15';
  if (grade.startsWith('D')) return 'bg-orange-500/15';
  return 'bg-red-500/15';
}

export default function StockGradesPage() {
  const aGrades = GRADES.filter((g) => g.overall.startsWith('A')).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Grades</h1>
        <p className="mt-1 text-sm text-gray-500">A–F composite grading across key dimensions</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">A-Rated</p><p className="text-lg font-bold text-green-400">{aGrades}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">B-Rated</p><p className="text-lg font-bold text-blue-400">{GRADES.filter((g) => g.overall.startsWith('B')).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">C or Below</p><p className="text-lg font-bold text-amber-400">{GRADES.filter((g) => !g.overall.startsWith('A') && !g.overall.startsWith('B')).length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Award className="h-4 w-4 text-indigo-400" /> Grade Cards</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {GRADES.map((g) => (
            <div key={g.symbol} className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{g.symbol}</span>
                  <span className="text-[10px] text-gray-500">{g.name}</span>
                  <Badge variant="info">{g.sector}</Badge>
                </div>
                <span className={cn('text-lg font-bold font-mono', gradeColor(g.overall))}>{g.overall}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: 'Value', grade: g.value },
                  { label: 'Growth', grade: g.growth },
                  { label: 'Profit', grade: g.profitability },
                  { label: 'Momentum', grade: g.momentum },
                  { label: 'Revisions', grade: g.revisions },
                ].map((d) => (
                  <div key={d.label} className={cn('rounded px-2 py-1 text-center', gradeBg(d.grade))}>
                    <p className="text-[8px] text-gray-500">{d.label}</p>
                    <p className={cn('text-xs font-bold font-mono', gradeColor(d.grade))}>{d.grade}</p>
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
