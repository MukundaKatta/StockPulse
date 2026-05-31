'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, BarChart3, PieChart, Shield, Lightbulb, DollarSign, Activity } from 'lucide-react';
import { cn } from '@/lib/formatters';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: typeof BookOpen;
  readTime: string;
}

const LESSONS: Lesson[] = [
  { id: 'what-is-stock', title: 'What is a Stock?', description: 'Understanding equity ownership and how the stock market works', category: 'Basics', difficulty: 'beginner', icon: BookOpen, readTime: '5 min' },
  { id: 'reading-charts', title: 'Reading Stock Charts', description: 'Candlestick patterns, trendlines, and support/resistance levels', category: 'Technical', difficulty: 'beginner', icon: BarChart3, readTime: '8 min' },
  { id: 'fundamental-analysis', title: 'Fundamental Analysis', description: 'Evaluating company financials: P/E, revenue, earnings, and growth', category: 'Fundamentals', difficulty: 'intermediate', icon: PieChart, readTime: '10 min' },
  { id: 'technical-indicators', title: 'Technical Indicators', description: 'RSI, MACD, Bollinger Bands, and moving averages explained', category: 'Technical', difficulty: 'intermediate', icon: Activity, readTime: '12 min' },
  { id: 'portfolio-diversification', title: 'Portfolio Diversification', description: 'Building a balanced portfolio across sectors and asset classes', category: 'Strategy', difficulty: 'beginner', icon: Shield, readTime: '7 min' },
  { id: 'options-basics', title: 'Options Trading Basics', description: 'Calls, puts, strikes, and expiration dates for beginners', category: 'Options', difficulty: 'intermediate', icon: Lightbulb, readTime: '15 min' },
  { id: 'dividend-investing', title: 'Dividend Investing', description: 'Building passive income through dividend growth strategies', category: 'Income', difficulty: 'beginner', icon: DollarSign, readTime: '8 min' },
  { id: 'risk-management', title: 'Risk Management', description: 'Position sizing, stop losses, and managing portfolio risk', category: 'Strategy', difficulty: 'advanced', icon: Shield, readTime: '10 min' },
  { id: 'growth-investing', title: 'Growth Investing', description: 'Identifying high-growth companies and evaluating future potential', category: 'Strategy', difficulty: 'intermediate', icon: TrendingUp, readTime: '9 min' },
];

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
} as const;

export default function LearnPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Learn</h1>
        <p className="mt-1 text-sm text-gray-500">Investment education and trading concepts</p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['Basics', 'Technical', 'Strategy', 'Options'].map((cat) => (
          <Card key={cat} className="!p-3 text-center">
            <p className="text-sm font-medium text-white">{cat}</p>
            <p className="text-xs text-gray-500">{LESSONS.filter((l) => l.category === cat).length} lessons</p>
          </Card>
        ))}
      </div>

      {/* Lessons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LESSONS.map((lesson) => {
          const Icon = lesson.icon;
          return (
            <Card key={lesson.id} hover className="cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                  <Icon className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white">{lesson.title}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{lesson.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={difficultyColors[lesson.difficulty]}>
                      {lesson.difficulty}
                    </Badge>
                    <span className="text-[10px] text-gray-600">{lesson.readTime} read</span>
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
