'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { Scale } from 'lucide-react';
interface DEData { symbol: string; name: string; deRatio: number; totalDebt: string; totalEquity: string; interestCoverage: number; netDebt: string; sector: string; }
const STOCKS: DEData[] = [
  { symbol: 'AAPL', name: 'Apple', deRatio: 1.76, totalDebt: '$111B', totalEquity: '$63B', interestCoverage: 28.4, netDebt: '$76B', sector: 'Tech' },
  { symbol: 'MSFT', name: 'Microsoft', deRatio: 0.42, totalDebt: '$59B', totalEquity: '$141B', interestCoverage: 42.1, netDebt: '-$18B', sector: 'Tech' },
  { symbol: 'NVDA', name: 'NVIDIA', deRatio: 0.41, totalDebt: '$11B', totalEquity: '$27B', interestCoverage: 68.2, netDebt: '-$15B', sector: 'Tech' },
  { symbol: 'META', name: 'Meta', deRatio: 0.28, totalDebt: '$37B', totalEquity: '$133B', interestCoverage: 32.5, netDebt: '-$24B', sector: 'Tech' },
  { symbol: 'AMZN', name: 'Amazon', deRatio: 0.64, totalDebt: '$67B', totalEquity: '$105B', interestCoverage: 12.8, netDebt: '$12B', sector: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla', deRatio: 0.11, totalDebt: '$6B', totalEquity: '$52B', interestCoverage: 42.8, netDebt: '-$23B', sector: 'Auto' },
  { symbol: 'JPM', name: 'JP Morgan', deRatio: 2.42, totalDebt: '$742B', totalEquity: '$307B', interestCoverage: 3.8, netDebt: '$420B', sector: 'Finance' },
  { symbol: 'T', name: 'AT&T', deRatio: 1.12, totalDebt: '$142B', totalEquity: '$127B', interestCoverage: 4.2, netDebt: '$132B', sector: 'Telecom' },
];
export default function DebtToEquityPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div><h1 className="font-display text-xl sm:text-2xl font-bold text-white">Debt-to-Equity</h1><p className="mt-1 text-sm text-gray-500">Leverage ratios and debt coverage analysis</p></div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Low Leverage</p><p className="text-lg font-bold text-green-400">{STOCKS.filter((s) => s.deRatio < 0.5).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Moderate</p><p className="text-lg font-bold text-amber-400">{STOCKS.filter((s) => s.deRatio >= 0.5 && s.deRatio < 1.5).length}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">High Leverage</p><p className="text-lg font-bold text-red-400">{STOCKS.filter((s) => s.deRatio >= 1.5).length}</p></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Scale className="h-4 w-4 text-indigo-400" /> Leverage Analysis</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {STOCKS.sort((a, b) => a.deRatio - b.deRatio).map((s) => (
            <div key={s.symbol} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-white">{s.symbol}</span><span className="text-[10px] text-gray-500">{s.name}</span><Badge variant={s.deRatio < 0.5 ? 'success' : s.deRatio < 1.5 ? 'warning' : 'danger'}>{s.deRatio < 0.5 ? 'Low' : s.deRatio < 1.5 ? 'Moderate' : 'High'}</Badge></div>
                <span className={cn('text-xs font-mono font-bold', s.deRatio < 0.5 ? 'text-green-400' : s.deRatio < 1.5 ? 'text-amber-400' : 'text-red-400')}>{s.deRatio.toFixed(2)}x</span>
              </div>
              <div className="flex flex-wrap gap-x-4 text-[10px]">
                <span className="text-gray-400">Debt: <span className="font-mono text-white">{s.totalDebt}</span></span>
                <span className="text-gray-400">Equity: <span className="font-mono text-white">{s.totalEquity}</span></span>
                <span className="text-gray-400">Coverage: <span className={cn('font-mono', s.interestCoverage > 10 ? 'text-green-400' : 'text-amber-400')}>{s.interestCoverage}x</span></span>
                <span className="text-gray-400">Net Debt: <span className="font-mono text-white">{s.netDebt}</span></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
