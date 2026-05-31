'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { BarChart3 } from 'lucide-react';

interface StockPE {
  symbol: string;
  name: string;
  price: number;
  eps: number;
  pe: number;
  forwardPE: number;
  sectorAvg: number;
  peg: number;
}

const STOCKS: StockPE[] = [
  { symbol: 'AAPL', name: 'Apple', price: 185.92, eps: 6.16, pe: 30.2, forwardPE: 28.5, sectorAvg: 32.1, peg: 2.1 },
  { symbol: 'MSFT', name: 'Microsoft', price: 388.47, eps: 10.64, pe: 36.5, forwardPE: 32.8, sectorAvg: 32.1, peg: 2.5 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, eps: 5.72, pe: 24.8, forwardPE: 21.2, sectorAvg: 32.1, peg: 1.3 },
  { symbol: 'AMZN', name: 'Amazon', price: 155.20, eps: 2.90, pe: 53.5, forwardPE: 42.1, sectorAvg: 25.8, peg: 1.8 },
  { symbol: 'META', name: 'Meta', price: 370.45, eps: 14.86, pe: 24.9, forwardPE: 22.3, sectorAvg: 20.5, peg: 1.1 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 547.10, eps: 12.96, pe: 42.2, forwardPE: 28.5, sectorAvg: 32.1, peg: 1.0 },
  { symbol: 'JPM', name: 'JPMorgan', price: 172.30, eps: 16.23, pe: 10.6, forwardPE: 11.2, sectorAvg: 12.8, peg: 1.5 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.50, eps: 9.92, pe: 16.0, forwardPE: 14.8, sectorAvg: 18.5, peg: 2.8 },
  { symbol: 'V', name: 'Visa', price: 268.40, eps: 8.77, pe: 30.6, forwardPE: 27.1, sectorAvg: 20.5, peg: 1.9 },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 101.20, eps: 9.52, pe: 10.6, forwardPE: 12.5, sectorAvg: 11.2, peg: 3.2 },
];

function getValuation(pe: number, sectorAvg: number): { label: string; variant: 'success' | 'warning' | 'danger' } {
  const ratio = pe / sectorAvg;
  if (ratio < 0.8) return { label: 'Undervalued', variant: 'success' };
  if (ratio > 1.3) return { label: 'Overvalued', variant: 'danger' };
  return { label: 'Fair Value', variant: 'warning' };
}

export default function PERatioAnalyzerPage() {
  const maxPE = Math.max(...STOCKS.map((s) => s.pe));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4 sm:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">P/E Ratio Analyzer</h1>
        <p className="mt-1 text-sm text-gray-500">Valuation comparison across holdings</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-indigo-400" /> P/E Comparison</CardTitle></CardHeader>
        <div className="space-y-2 px-2 pb-3">
          {[...STOCKS].sort((a, b) => a.pe - b.pe).map((stock) => {
            const valuation = getValuation(stock.pe, stock.sectorAvg);
            return (
              <div key={stock.symbol} className="flex items-center gap-2">
                <span className="text-xs font-medium text-indigo-400 w-12">{stock.symbol}</span>
                <div className="flex-1 h-5 relative">
                  <div className="absolute inset-y-0 left-0 bg-indigo-500/40 rounded" style={{ width: `${(stock.pe / maxPE) * 100}%` }} />
                  <div className="absolute inset-y-0 left-0 flex items-center px-2">
                    <span className="text-[10px] font-mono text-white relative z-10">{stock.pe.toFixed(1)}x</span>
                  </div>
                </div>
                <Badge variant={valuation.variant} className="text-[9px] w-20 justify-center">{valuation.label}</Badge>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Detailed Valuation</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2 font-medium">Symbol</th>
              <th className="text-right py-2 px-2 font-medium">Price</th>
              <th className="text-right py-2 px-2 font-medium">EPS</th>
              <th className="text-right py-2 px-2 font-medium">P/E</th>
              <th className="text-right py-2 px-2 font-medium">Fwd P/E</th>
              <th className="text-right py-2 px-2 font-medium">Sector Avg</th>
              <th className="text-right py-2 px-2 font-medium">PEG</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {STOCKS.map((s) => (
                <tr key={s.symbol} className="hover:bg-white/[0.02]">
                  <td className="py-2 px-2 text-indigo-400 font-medium">{s.symbol}</td>
                  <td className="py-2 px-2 text-right font-mono text-gray-300">${s.price.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right font-mono text-gray-300">${s.eps.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right font-mono text-white">{s.pe.toFixed(1)}</td>
                  <td className="py-2 px-2 text-right font-mono text-gray-300">{s.forwardPE.toFixed(1)}</td>
                  <td className="py-2 px-2 text-right font-mono text-gray-500">{s.sectorAvg.toFixed(1)}</td>
                  <td className={cn('py-2 px-2 text-right font-mono', s.peg <= 1.5 ? 'text-green-400' : s.peg <= 2.5 ? 'text-yellow-400' : 'text-red-400')}>{s.peg.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
