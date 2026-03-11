'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/formatters';
import {
  TrendingUp,
  Briefcase,
  Bell,
  Search,
  LineChart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const STEPS = [
  {
    icon: Sparkles,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    title: 'Welcome to StockPulse',
    description: 'Your institutional-grade stock analysis platform with real-time data, technical indicators, and portfolio tracking.',
    features: [
      'Real-time stock quotes and charts',
      'Technical & fundamental analysis',
      'Portfolio tracking with P&L',
      'Custom price alerts',
    ],
  },
  {
    icon: Search,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    title: 'Find Any Stock Instantly',
    description: 'Use the command palette (Cmd+K / Ctrl+K) to search for any stock. Get detailed charts, technical indicators, and financial data.',
    features: [
      'Candlestick charts with multiple timeframes',
      'RSI, MACD, Bollinger Bands, and more',
      'Earnings history and financial statements',
      'Latest news and market sentiment',
    ],
  },
  {
    icon: Briefcase,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
    title: 'Track Your Portfolio',
    description: 'Log your trades, monitor real-time P&L, and see your portfolio allocation at a glance.',
    features: [
      'Live market value updates',
      'Unrealized P&L tracking',
      'Portfolio allocation breakdown',
      'Complete trade history',
    ],
  },
  {
    icon: Bell,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    title: 'Set Price Alerts',
    description: 'Never miss a move. Create alerts for price targets and get notified when stocks hit your levels.',
    features: [
      'Above and below price triggers',
      'Watchlist for quick monitoring',
      'Market overview dashboard',
      'Top movers at a glance',
    ],
  },
];

export function WelcomeModal() {
  const { onboardingComplete, completeOnboarding } = useAppStore();
  const [step, setStep] = useState(0);

  if (onboardingComplete) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const Icon = current.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      >
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#12121a] p-6 sm:p-8 shadow-2xl"
        >
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === step ? 'w-8 bg-indigo-500' : i < step ? 'w-4 bg-indigo-500/50' : 'w-4 bg-white/10'
                )}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className={cn('flex h-16 w-16 items-center justify-center rounded-2xl', current.iconBg)}>
              <Icon className={cn('h-8 w-8', current.iconColor)} />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-center font-display text-xl sm:text-2xl font-bold text-white mb-2">
            {current.title}
          </h2>
          <p className="text-center text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            {current.description}
          </p>

          {/* Features */}
          <div className="space-y-2.5 mb-8">
            {current.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-4 py-2.5"
              >
                <div className={cn('flex h-5 w-5 items-center justify-center rounded-full text-xs', current.iconBg, current.iconColor)}>
                  {i + 1}
                </div>
                <span className="text-sm text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={completeOnboarding}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip
            </button>
            <div className="flex gap-2">
              {step > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => {
                  if (isLast) {
                    completeOnboarding();
                  } else {
                    setStep(step + 1);
                  }
                }}
              >
                {isLast ? 'Get Started' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
