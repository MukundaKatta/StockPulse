'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/formatters';
import { Calculator } from 'lucide-react';

interface Valuation {
  symbol: string;
  name: string;
  price: number;
  dcfValue: number;
  grahamValue: number;
  peFairValue: number;
  avgIntrinsic: number;
  marginOfSafety: number;
  verdict: 'Undervalued' | 'Fair Value' | 'Overvalued';
}

const VALUATIONS: Valuation[] = [
  { symbol: 'AAPL', name: 'Apple', price: 186.05, dcfValue: 172.40, grahamValue: 148.20, peFairValue: 195.80, avgIntrinsic: 172.13, marginOfSafety: -7.5, verdict: 'Overvalued' },
  { symbol: 'MSFT', name: 'Microsoft', price: 404.87, dcfValue: 385.20, grahamValue: 310.50, peFairValue: 420.40, avgIntrinsic: 372.03, marginOfSafety: -8.1, verdict: 'Overvalued' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, dcfValue: 168.40, grahamValue: 152.80, peFairValue: 175.20, avgIntrinsic: 165.47, marginOfSafety: 16.7, verdict: 'Undervalued' },
  { symbol: 'META', name: 'Meta', price: 484.10, dcfValue: 520.80, grahamValue: 445.20, peFairValue: 510.40, avgIntrinsic: 492.13, marginOfSafety: 1.7, verdict: 'Fair Value' },
  { symbol: 'AMZN', name: 'Amazon', price: 178.25, dcfValue: 195.40, grahamValue: 142.80, peFairValue: 205.60, avgIntrinsic: 181.27, marginOfSafety: 1.7, verdict: 'Fair Value' },
  { symbol: 'JPM', name: 'JP Morgan', price: 182.40, dcfValue: 210.50, grahamValue: 195.80, peFairValue: 198.40, avgIntrinsic: 201.57, marginOfSafety: 10.5, verdict: 'Undervalued' },
  { symbol: 'JNJ', name: 'J&J', price: 156.80, dcfValue: 182.40, grahamValue: 175.20, peFairValue: 168.50, avgIntrinsic: 175.37, marginOfSafety: 11.8, verdict: 'Undervalued' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 878.35, dcfValue: 720.40, grahamValue: 425.80, peFairValue: 850.20, avgIntrinsic: 665.47, marginOfSafety: -24.3, verdict: 'Overvalued' },
];

export default function StockValuationPage() {
  const undervalued = VALUATIONS.filter((v) => v.verdict === 'Undervalued').length;
  const overvalued = VALUATIONS.filter((v) => v.verdict === 'Overvalued').length;
  const avgMargin = VALUATIONS.reduce((s, v) => s + v.marginOfSafety, 0) / VALUATIONS.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Valuation</h1>
        <p className="mt-1 text-sm text-gray-500">Intrinsic value estimates using DCF, Graham, and P/E models</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Undervalued</p><p className="text-lg font-bold text-green-400">{undervalued}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Overvalued</p><p className="text-lg font-bold text-red-400">{overvalued}</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Avg Margin</p><p className={cn('text-lg font-bold', avgMargin >= 0 ? 'text-green-400' : 'text-red-400')}>{avgMargin >= 0 ? '+' : ''}{avgMargin.toFixed(1)}%</p></Card>
        <Card className="!p-3"><p className="text-[10px] text-gray-500 uppercase">Analyzed</p><p className="text-lg font-bold text-white">{VALUATIONS.length}</p></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Calculator className="h-4 w-4 text-indigo-400" /> Valuation Models</CardTitle></CardHeader>
        <div className="divide-y divide-white/5">
          {VALUATIONS.sort((a, b) => b.marginOfSafety - a.marginOfSafety).map((v) => (
            <div key={v.symbol} className="px-4 py-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{v.symbol}</span>
                  <span className="text-[10px] text-gray-500">{v.name}</span>
                  <Badge variant={v.verdict === 'Undervalued' ? 'success' : v.verdict === 'Overvalued' ? 'danger' : 'default'}>{v.verdict}</Badge>
                </div>
                <span className={cn('text-xs font-mono font-bold', v.marginOfSafety >= 10 ? 'text-green-400' : v.marginOfSafety >= 0 ? 'text-gray-300' : 'text-red-400')}>
                  {v.marginOfSafety >= 0 ? '+' : ''}{v.marginOfSafety.toFixed(1)}%
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[10px]">
                <div><span className="text-gray-500">Price</span><p className="font-mono text-white">${v.price.toFixed(2)}</p></div>
                <div><span className="text-gray-500">DCF</span><p className={cn('font-mono', v.dcfValue > v.price ? 'text-green-400' : 'text-red-400')}>${v.dcfValue.toFixed(2)}</p></div>
                <div><span className="text-gray-500">Graham</span><p className={cn('font-mono', v.grahamValue > v.price ? 'text-green-400' : 'text-red-400')}>${v.grahamValue.toFixed(2)}</p></div>
                <div><span className="text-gray-500">P/E Fair</span><p className={cn('font-mono', v.peFairValue > v.price ? 'text-green-400' : 'text-red-400')}>${v.peFairValue.toFixed(2)}</p></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
