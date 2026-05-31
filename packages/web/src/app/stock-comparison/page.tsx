'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';
import { Plus, X, Scale } from 'lucide-react';

interface StockMetrics {
  symbol: string;
  price: number;
  marketCap: number;
  pe: number;
  eps: number;
  divYield: number;
  beta: number;
  yearReturn: number;
  revenue: number;
  profitMargin: number;
}

const STOCK_DB: Record<string, StockMetrics> = {
  AAPL: { symbol: 'AAPL', price: 189.45, marketCap: 2950000000000, pe: 28.5, eps: 6.64, divYield: 0.5, beta: 1.28, yearReturn: 32.5, revenue: 383000000000, profitMargin: 25.3 },
  MSFT: { symbol: 'MSFT', price: 415.60, marketCap: 3100000000000, pe: 35.2, eps: 11.8, divYield: 0.7, beta: 0.92, yearReturn: 28.8, revenue: 212000000000, profitMargin: 34.1 },
  GOOGL: { symbol: 'GOOGL', price: 155.80, marketCap: 1960000000000, pe: 24.8, eps: 6.28, divYield: 0, beta: 1.05, yearReturn: 48.2, revenue: 307000000000, profitMargin: 22.5 },
  AMZN: { symbol: 'AMZN', price: 178.90, marketCap: 1850000000000, pe: 58.2, eps: 3.07, divYield: 0, beta: 1.15, yearReturn: 52.4, revenue: 575000000000, profitMargin: 6.2 },
  TSLA: { symbol: 'TSLA', price: 245.80, marketCap: 780000000000, pe: 62.5, eps: 3.93, divYield: 0, beta: 2.05, yearReturn: -12.5, revenue: 97000000000, profitMargin: 15.4 },
  NVDA: { symbol: 'NVDA', price: 875.20, marketCap: 2150000000000, pe: 68.4, eps: 12.8, divYield: 0.02, beta: 1.68, yearReturn: 185.2, revenue: 61000000000, profitMargin: 55.8 },
};

export default function StockComparisonPage() {
  const [symbols, setSymbols] = useState(['AAPL', 'MSFT', 'GOOGL']);
  const [newSymbol, setNewSymbol] = useState('');

  const addSymbol = () => {
    const sym = newSymbol.toUpperCase();
    if (sym && STOCK_DB[sym] && !symbols.includes(sym)) {
      setSymbols([...symbols, sym]);
      setNewSymbol('');
    }
  };

  const removeSymbol = (sym: string) => setSymbols(symbols.filter((s) => s !== sym));

  const stocks = symbols.map((s) => STOCK_DB[s]).filter(Boolean);

  const metrics = [
    { label: 'Price', key: 'price', format: (v: number) => formatCurrency(v) },
    { label: 'Market Cap', key: 'marketCap', format: (v: number) => formatLargeNumber(v) },
    { label: 'P/E Ratio', key: 'pe', format: (v: number) => v.toFixed(1) },
    { label: 'EPS', key: 'eps', format: (v: number) => `$${v.toFixed(2)}` },
    { label: 'Div Yield', key: 'divYield', format: (v: number) => `${v.toFixed(2)}%` },
    { label: 'Beta', key: 'beta', format: (v: number) => v.toFixed(2) },
    { label: '1Y Return', key: 'yearReturn', format: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%` },
    { label: 'Revenue', key: 'revenue', format: (v: number) => formatLargeNumber(v) },
    { label: 'Profit Margin', key: 'profitMargin', format: (v: number) => `${v.toFixed(1)}%` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Comparison</h1>
        <p className="mt-1 text-sm text-gray-500">Compare fundamental metrics side by side</p>
      </div>

      {/* Add Symbol */}
      <div className="flex gap-2 items-end">
        <Input label="Add Stock" value={newSymbol} onChange={(e) => setNewSymbol(e.target.value.toUpperCase())} placeholder="NVDA" className="w-32" />
        <Button onClick={addSymbol} size="sm"><Plus className="h-3.5 w-3.5" /></Button>
        <p className="text-[10px] text-gray-600 ml-2">Available: {Object.keys(STOCK_DB).join(', ')}</p>
      </div>

      {stocks.length > 0 && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-3 py-2.5 text-left text-xs font-medium uppercase text-gray-500">Metric</th>
                  {stocks.map((s) => (
                    <th key={s.symbol} className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="font-mono font-bold text-indigo-400">{s.symbol}</span>
                        <button onClick={() => removeSymbol(s.symbol)} className="text-gray-600 hover:text-red-400">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => {
                  const values = stocks.map((s) => (s as unknown as Record<string, number>)[metric.key]);
                  const maxIdx = values.indexOf(Math.max(...values));
                  return (
                    <tr key={metric.key} className="border-b border-white/[0.03]">
                      <td className="px-3 py-2.5 text-xs text-gray-500">{metric.label}</td>
                      {stocks.map((s, i) => {
                        const val = (s as unknown as Record<string, number>)[metric.key];
                        return (
                          <td key={s.symbol} className={cn('px-3 py-2.5 text-right font-mono text-xs', i === maxIdx ? 'text-green-400 font-medium' : 'text-gray-300')}>
                            {metric.format(val)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
