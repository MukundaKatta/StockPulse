'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/formatters';
import { CheckCircle2, Circle, ClipboardCheck } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  description: string;
}

const CHECKLIST: ChecklistItem[] = [
  { id: '1', category: 'Fundamentals', text: 'Revenue growing YoY', description: 'Company shows consistent top-line growth' },
  { id: '2', category: 'Fundamentals', text: 'Positive free cash flow', description: 'Generating cash after capital expenditures' },
  { id: '3', category: 'Fundamentals', text: 'Reasonable P/E ratio', description: 'Valuation in line with industry or below' },
  { id: '4', category: 'Fundamentals', text: 'Low debt-to-equity', description: 'Balance sheet is not over-leveraged' },
  { id: '5', category: 'Fundamentals', text: 'Expanding margins', description: 'Operating or net margins improving' },
  { id: '6', category: 'Technical', text: 'Above 200-day SMA', description: 'Long-term trend is bullish' },
  { id: '7', category: 'Technical', text: 'RSI not overbought', description: 'RSI below 70, room to run' },
  { id: '8', category: 'Technical', text: 'Volume confirms trend', description: 'Price moves supported by volume' },
  { id: '9', category: 'Technical', text: 'No negative divergence', description: 'Price and indicators aligned' },
  { id: '10', category: 'Risk', text: 'Position size within limits', description: 'No more than 5% of portfolio' },
  { id: '11', category: 'Risk', text: 'Stop-loss defined', description: 'Clear exit point if thesis breaks' },
  { id: '12', category: 'Risk', text: 'Risk/reward > 2:1', description: 'Potential reward justifies the risk' },
  { id: '13', category: 'Risk', text: 'No upcoming binary event', description: 'Not buying before earnings/FDA' },
  { id: '14', category: 'Qualitative', text: 'Understand the business', description: 'Can explain how company makes money' },
  { id: '15', category: 'Qualitative', text: 'Competitive moat', description: 'Sustainable competitive advantage exists' },
  { id: '16', category: 'Qualitative', text: 'Quality management', description: 'Trustworthy leadership with skin in game' },
];

export default function InvestmentChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = [...new Set(CHECKLIST.map((i) => i.category))];
  const score = Math.round((checked.size / CHECKLIST.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Investment Checklist</h1>
          <p className="mt-1 text-sm text-gray-500">Pre-trade due diligence framework</p>
        </div>
        <div className="text-right">
          <p className={cn('text-2xl font-bold', score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400')}>
            {score}%
          </p>
          <p className="text-[10px] text-gray-500">{checked.size}/{CHECKLIST.length} passed</p>
        </div>
      </div>

      <Card className="!p-4">
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-300', score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500')}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {score >= 75 ? 'Strong candidate — most criteria met' : score >= 50 ? 'Moderate — review unchecked items' : 'Weak — significant concerns remain'}
        </p>
      </Card>

      {categories.map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <ClipboardCheck className="h-4 w-4 text-indigo-400" />
              {category}
            </CardTitle>
          </CardHeader>
          <div className="space-y-1 px-1 pb-2">
            {CHECKLIST.filter((i) => i.category === category).map((item) => {
              const isChecked = checked.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={cn(
                    'flex items-start gap-3 w-full text-left py-2 px-2 rounded-lg transition-colors',
                    isChecked ? 'bg-green-500/5' : 'hover:bg-white/[0.02]'
                  )}
                >
                  {isChecked ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-600 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className={cn('text-sm', isChecked ? 'text-green-400' : 'text-gray-300')}>{item.text}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
