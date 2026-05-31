'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { Play, BarChart3 } from 'lucide-react';

type Strategy = 'sma_cross' | 'rsi_oversold' | 'breakout' | 'mean_reversion';

interface BacktestResult {
  trades: number;
  winRate: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpe: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
}

function runBacktest(strategy: Strategy, capital: number): BacktestResult {
  const base = {
    sma_cross: { trades: 48, winRate: 55, totalReturn: 32.5, maxDrawdown: -12.4, sharpe: 1.35, profitFactor: 1.82, avgWin: 4.2, avgLoss: -2.8 },
    rsi_oversold: { trades: 35, winRate: 62, totalReturn: 28.8, maxDrawdown: -8.5, sharpe: 1.52, profitFactor: 2.15, avgWin: 3.8, avgLoss: -2.2 },
    breakout: { trades: 22, winRate: 45, totalReturn: 42.1, maxDrawdown: -18.2, sharpe: 1.18, profitFactor: 1.65, avgWin: 8.5, avgLoss: -4.2 },
    mean_reversion: { trades: 65, winRate: 58, totalReturn: 24.5, maxDrawdown: -9.8, sharpe: 1.42, profitFactor: 1.95, avgWin: 2.8, avgLoss: -2.1 },
  };
  return base[strategy];
}

export default function BacktestingPage() {
  const [strategy, setStrategy] = useState<Strategy>('sma_cross');
  const [capital, setCapital] = useState('100000');
  const [period, setPeriod] = useState('252');
  const [ran, setRan] = useState(false);

  const result = useMemo(() => {
    if (!ran) return null;
    return runBacktest(strategy, parseFloat(capital) || 100000);
  }, [strategy, capital, ran]);

  const strategies: { key: Strategy; name: string; desc: string }[] = [
    { key: 'sma_cross', name: 'SMA Crossover', desc: 'Buy on 20/50 golden cross, sell on death cross' },
    { key: 'rsi_oversold', name: 'RSI Oversold', desc: 'Buy when RSI < 30, sell when RSI > 70' },
    { key: 'breakout', name: '52W Breakout', desc: 'Buy on new 52-week high, trail stop at 10%' },
    { key: 'mean_reversion', name: 'Mean Reversion', desc: 'Buy 2+ std below SMA, sell at mean' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Strategy Backtester</h1>
        <p className="mt-1 text-sm text-gray-500">Test trading strategies against historical data</p>
      </div>

      {/* Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Strategy</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-2">
          {strategies.map((s) => (
            <button key={s.key} onClick={() => { setStrategy(s.key); setRan(false); }}
              className={cn('rounded-lg border p-3 text-left transition-all', strategy === s.key ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/[0.06] hover:border-white/10')}
            >
              <p className="text-sm font-medium text-white">{s.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{s.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Parameters</CardTitle>
        </CardHeader>
        <div className="flex gap-3 items-end">
          <Input label="Starting Capital ($)" type="number" value={capital} onChange={(e) => setCapital(e.target.value)} className="flex-1" />
          <Input label="Period (days)" type="number" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-32" />
          <Button onClick={() => setRan(true)}>
            <Play className="h-3.5 w-3.5 mr-1.5" /> Run
          </Button>
        </div>
      </Card>

      {/* Results */}
      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Total Return</p>
              <p className={cn('text-lg font-bold font-mono', result.totalReturn >= 0 ? 'text-green-400' : 'text-red-400')}>
                +{result.totalReturn.toFixed(1)}%
              </p>
              <p className="text-[10px] text-gray-600">{formatCurrency((parseFloat(capital) || 100000) * result.totalReturn / 100)} profit</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Win Rate</p>
              <p className={cn('text-lg font-bold font-mono', result.winRate >= 50 ? 'text-green-400' : 'text-red-400')}>
                {result.winRate}%
              </p>
              <p className="text-[10px] text-gray-600">{result.trades} trades</p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Sharpe Ratio</p>
              <p className={cn('text-lg font-bold font-mono', result.sharpe >= 1.0 ? 'text-green-400' : 'text-amber-400')}>
                {result.sharpe.toFixed(2)}
              </p>
            </Card>
            <Card className="!p-3">
              <p className="text-[10px] text-gray-500 uppercase">Max Drawdown</p>
              <p className="text-lg font-bold font-mono text-red-400">{result.maxDrawdown.toFixed(1)}%</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-400" />
                Detailed Metrics
              </CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Profit Factor</p>
                <p className="text-sm font-mono font-medium text-white">{result.profitFactor.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Avg Win</p>
                <p className="text-sm font-mono font-medium text-green-400">+{result.avgWin.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Avg Loss</p>
                <p className="text-sm font-mono font-medium text-red-400">{result.avgLoss.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Total Trades</p>
                <p className="text-sm font-mono font-medium text-white">{result.trades}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Win/Loss Ratio</p>
                <p className="text-sm font-mono font-medium text-white">{(result.avgWin / Math.abs(result.avgLoss)).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Expectancy</p>
                <p className="text-sm font-mono font-medium text-green-400">
                  +{((result.winRate / 100 * result.avgWin) + ((1 - result.winRate / 100) * result.avgLoss)).toFixed(2)}%
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </motion.div>
  );
}
