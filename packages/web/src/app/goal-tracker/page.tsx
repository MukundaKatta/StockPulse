'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/formatters';
import { Target, Flag, CheckCircle2 } from 'lucide-react';

interface FinancialGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const GOALS: FinancialGoal[] = [
  { id: '1', name: 'Emergency Fund (6 months)', target: 30000, current: 24000, deadline: '2024-06-01', priority: 'high', category: 'Safety' },
  { id: '2', name: 'House Down Payment', target: 100000, current: 42000, deadline: '2026-01-01', priority: 'high', category: 'Property' },
  { id: '3', name: 'Max Roth IRA 2024', target: 7000, current: 5250, deadline: '2024-12-31', priority: 'medium', category: 'Retirement' },
  { id: '4', name: 'Max 401(k) 2024', target: 23000, current: 14500, deadline: '2024-12-31', priority: 'medium', category: 'Retirement' },
  { id: '5', name: 'Vacation Fund', target: 5000, current: 3200, deadline: '2024-07-01', priority: 'low', category: 'Lifestyle' },
  { id: '6', name: 'New Car Fund', target: 40000, current: 8500, deadline: '2025-06-01', priority: 'low', category: 'Property' },
  { id: '7', name: 'College 529 - Annual', target: 6000, current: 6000, deadline: '2024-12-31', priority: 'medium', category: 'Education' },
  { id: '8', name: '$1M Net Worth', target: 1000000, current: 425000, deadline: '2030-01-01', priority: 'high', category: 'Milestone' },
];

export default function GoalTrackerPage() {
  const totalTarget = GOALS.reduce((s, g) => s + g.target, 0);
  const totalCurrent = GOALS.reduce((s, g) => s + Math.min(g.current, g.target), 0);
  const overallProgress = (totalCurrent / totalTarget) * 100;
  const completed = GOALS.filter((g) => g.current >= g.target).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Financial Goals</h1>
        <p className="mt-1 text-sm text-gray-500">Track progress toward your financial milestones</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Overall Progress</p><p className="text-lg font-bold text-indigo-400">{overallProgress.toFixed(0)}%</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Active Goals</p><p className="text-lg font-bold text-white">{GOALS.length}</p></Card>
        <Card className="!p-4"><p className="text-[10px] text-gray-500 uppercase">Completed</p><p className="text-lg font-bold text-green-400">{completed}</p></Card>
      </div>

      <div className="space-y-3">
        {GOALS.map((goal) => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const isComplete = goal.current >= goal.target;
          const remaining = Math.max(0, goal.target - goal.current);
          const daysLeft = Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / 86400000));

          return (
            <Card key={goal.id} className={cn(isComplete && 'ring-1 ring-green-500/20')}>
              <div className="flex items-start gap-3">
                {isComplete ? <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 shrink-0" /> : <Flag className="h-5 w-5 text-gray-600 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-sm font-medium', isComplete ? 'text-green-400' : 'text-white')}>{goal.name}</span>
                    <Badge variant={goal.priority === 'high' ? 'danger' : goal.priority === 'medium' ? 'warning' : 'info'} className="text-[8px]">{goal.priority}</Badge>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all', isComplete ? 'bg-green-500/70' : 'bg-indigo-500/60')} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-gray-500">
                    <span>{formatCurrency(goal.current)} / {formatCurrency(goal.target)}</span>
                    <span>{isComplete ? 'Complete!' : `${formatCurrency(remaining)} left · ${daysLeft}d`}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
