'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, Star, Zap, TrendingUp, Shield, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/formatters';

interface ScreenerPreset {
  id: string;
  name: string;
  description: string;
  icon: typeof Filter;
  category: string;
  criteria: string[];
  matches: number;
}

const PRESETS: ScreenerPreset[] = [
  {
    id: 'value-stocks',
    name: 'Value Stocks',
    description: 'Undervalued stocks with strong fundamentals',
    icon: DollarSign,
    category: 'Value',
    criteria: ['P/E < 15', 'P/B < 2', 'Div Yield > 2%', 'Debt/Equity < 0.5'],
    matches: 47,
  },
  {
    id: 'growth-momentum',
    name: 'Growth Momentum',
    description: 'High-growth companies with price momentum',
    icon: TrendingUp,
    category: 'Growth',
    criteria: ['Rev Growth > 25%', 'EPS Growth > 20%', 'RSI > 50', 'Above 50-SMA'],
    matches: 32,
  },
  {
    id: 'dividend-kings',
    name: 'Dividend Kings',
    description: 'Stocks with 25+ years of consecutive dividend increases',
    icon: Shield,
    category: 'Income',
    criteria: ['Div Yield > 2%', 'Payout Ratio < 75%', 'Div Growth > 5%', 'Years Increasing > 25'],
    matches: 18,
  },
  {
    id: 'breakout-stocks',
    name: 'Breakout Stocks',
    description: 'Stocks breaking above resistance with volume',
    icon: Zap,
    category: 'Technical',
    criteria: ['Near 52W High', 'Volume > 150% avg', 'RSI 60-70', 'Above all SMAs'],
    matches: 23,
  },
  {
    id: 'small-cap-gems',
    name: 'Small-Cap Gems',
    description: 'Small cap companies with institutional interest',
    icon: Star,
    category: 'Size',
    criteria: ['Market Cap $300M-$2B', 'Institutional > 30%', 'Rev Growth > 15%', 'Profit Margin > 10%'],
    matches: 41,
  },
  {
    id: 'low-volatility',
    name: 'Low Volatility',
    description: 'Stable stocks with minimal price fluctuation',
    icon: Shield,
    category: 'Risk',
    criteria: ['Beta < 0.8', 'Volatility < 20%', 'Market Cap > $10B', 'Div Yield > 1%'],
    matches: 56,
  },
];

export default function ScreenerPresetsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Screener Presets</h1>
          <p className="mt-1 text-sm text-gray-500">Pre-built stock screens for common investment strategies</p>
        </div>
        <Link href="/screener">
          <Button variant="secondary">
            <Filter className="h-4 w-4" />
            Custom Screener
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRESETS.map((preset) => {
          const Icon = preset.icon;
          return (
            <Card
              key={preset.id}
              hover
              className={cn(
                'cursor-pointer transition-all',
                selected === preset.id && 'ring-1 ring-indigo-500/50'
              )}
              onClick={() => setSelected(selected === preset.id ? null : preset.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                  <Icon className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-white">{preset.name}</h3>
                    <Badge variant="info">{preset.category}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">{preset.description}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {preset.criteria.map((c) => (
                  <span key={c} className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-400">
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{preset.matches} matches</span>
                <Link
                  href="/screener"
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Run Screen →
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
