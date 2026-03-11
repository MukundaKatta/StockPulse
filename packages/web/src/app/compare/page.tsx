'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQueries } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { formatCurrency, formatLargeNumber, formatPercent, cn } from '@/lib/formatters';
import { Plus, X, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import type { StockQuote, CompanyOverview } from '@/types';

const MAX_COMPARE = 4;

interface CompareStock {
  symbol: string;
  quote?: StockQuote;
  overview?: CompanyOverview;
}

const COMPARE_METRICS = [
  { key: 'price', label: 'Price', format: 'currency' },
  { key: 'change', label: 'Daily Change', format: 'change' },
  { key: 'MarketCapitalization', label: 'Market Cap', format: 'large' },
  { key: 'PERatio', label: 'P/E Ratio', format: 'number' },
  { key: 'ForwardPE', label: 'Forward P/E', format: 'number' },
  { key: 'PEGRatio', label: 'PEG Ratio', format: 'number' },
  { key: 'PriceToBookRatio', label: 'P/B Ratio', format: 'number' },
  { key: 'PriceToSalesRatioTTM', label: 'P/S Ratio', format: 'number' },
  { key: 'EPS', label: 'EPS', format: 'currency' },
  { key: 'DividendYield', label: 'Dividend Yield', format: 'percent' },
  { key: 'Beta', label: 'Beta', format: 'number' },
  { key: 'ProfitMargin', label: 'Profit Margin', format: 'percent' },
  { key: 'OperatingMarginTTM', label: 'Operating Margin', format: 'percent' },
  { key: 'ReturnOnEquityTTM', label: 'ROE', format: 'percent' },
  { key: 'ReturnOnAssetsTTM', label: 'ROA', format: 'percent' },
  { key: '52WeekHigh', label: '52W High', format: 'currency' },
  { key: '52WeekLow', label: '52W Low', format: 'currency' },
  { key: 'Sector', label: 'Sector', format: 'text' },
  { key: 'Industry', label: 'Industry', format: 'text' },
] as const;

function formatMetricValue(value: string | number | undefined, format: string, quote?: StockQuote): string {
  if (value === undefined || value === '' || value === 'None' || value === '-') return '-';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (format === 'currency') return isNaN(num) ? '-' : formatCurrency(num);
  if (format === 'large') return isNaN(num) ? '-' : formatLargeNumber(num);
  if (format === 'percent') return isNaN(num) ? '-' : `${(num * 100).toFixed(2)}%`;
  if (format === 'number') return isNaN(num) ? '-' : num.toFixed(2);
  if (format === 'change' && quote) {
    const pct = quote.changePercent;
    return `${quote.change >= 0 ? '+' : ''}${formatCurrency(quote.change)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)`;
  }
  return String(value);
}

export default function ComparePage() {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addSymbol = () => {
    const sym = inputValue.trim().toUpperCase();
    if (!sym || symbols.includes(sym) || symbols.length >= MAX_COMPARE) return;
    setSymbols([...symbols, sym]);
    setInputValue('');
  };

  const removeSymbol = (sym: string) => {
    setSymbols(symbols.filter((s) => s !== sym));
  };

  const quoteQueries = useQueries({
    queries: symbols.map((symbol) => ({
      queryKey: ['quote', symbol],
      queryFn: async () => {
        const { data } = await api.get(`/api/stocks/${symbol}/quote`);
        return data.quote as StockQuote;
      },
      staleTime: 30000,
    })),
  });

  const overviewQueries = useQueries({
    queries: symbols.map((symbol) => ({
      queryKey: ['overview', symbol],
      queryFn: async () => {
        const { data } = await api.get(`/api/stocks/${symbol}/overview`);
        return data.overview as CompanyOverview;
      },
      staleTime: 86400000,
    })),
  });

  const stocks: CompareStock[] = symbols.map((symbol, i) => ({
    symbol,
    quote: quoteQueries[i]?.data,
    overview: overviewQueries[i]?.data,
  }));

  const getMetricValue = (stock: CompareStock, metric: typeof COMPARE_METRICS[number]): string => {
    if (metric.key === 'price') return formatMetricValue(stock.quote?.price, 'currency');
    if (metric.key === 'change') return formatMetricValue(stock.quote?.change, 'change', stock.quote);
    return formatMetricValue(stock.overview?.[metric.key], metric.format);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Compare Stocks</h1>
        <p className="mt-1 text-sm text-gray-500">Side-by-side comparison of up to {MAX_COMPARE} stocks</p>
      </div>

      {/* Add symbols */}
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <form
            onSubmit={(e) => { e.preventDefault(); addSymbol(); }}
            className="flex gap-2 flex-1 min-w-[200px]"
          >
            <Input
              placeholder="Enter symbol (e.g. AAPL)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              maxLength={10}
            />
            <Button type="submit" disabled={symbols.length >= MAX_COMPARE || !inputValue.trim()}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </form>
          {symbols.map((sym) => (
            <div
              key={sym}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 text-sm font-mono font-medium text-indigo-400"
            >
              {sym}
              <button onClick={() => removeSymbol(sym)} className="text-indigo-400/60 hover:text-red-400 transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {symbols.length === 0 ? (
        <div className="py-16 text-center">
          <BarChart3 className="mx-auto mb-4 h-12 w-12 text-gray-700" />
          <p className="text-gray-500">Add stock symbols above to start comparing</p>
          <p className="mt-1 text-xs text-gray-600">Try AAPL, MSFT, GOOGL for a tech comparison</p>
        </div>
      ) : (
        <ErrorBoundary>
          <Card className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="sticky left-0 bg-[#12121a] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 min-w-[140px]">
                    Metric
                  </th>
                  {stocks.map((stock) => (
                    <th key={stock.symbol} className="px-4 py-3 text-center min-w-[120px]">
                      <Link href={`/stock/${stock.symbol}`} className="font-mono font-medium text-indigo-400 hover:text-indigo-300">
                        {stock.symbol}
                      </Link>
                      {stock.overview?.Name && (
                        <div className="text-xs text-gray-600 font-normal truncate max-w-[140px] mx-auto mt-0.5">
                          {stock.overview.Name}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_METRICS.map((metric) => (
                  <tr key={metric.key} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="sticky left-0 bg-[#12121a] px-4 py-2.5 text-xs font-medium text-gray-500">
                      {metric.label}
                    </td>
                    {stocks.map((stock) => {
                      const val = getMetricValue(stock, metric);
                      const isChange = metric.key === 'change';
                      const changePositive = isChange && stock.quote && stock.quote.change >= 0;
                      return (
                        <td
                          key={stock.symbol}
                          className={cn(
                            'px-4 py-2.5 text-center font-mono text-sm',
                            isChange ? (changePositive ? 'text-green-400' : 'text-red-400') : 'text-gray-300',
                            metric.format === 'text' ? 'text-xs text-gray-400' : ''
                          )}
                        >
                          {quoteQueries[symbols.indexOf(stock.symbol)]?.isLoading ? (
                            <div className="h-4 w-16 mx-auto rounded bg-white/5 animate-pulse" />
                          ) : val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </ErrorBoundary>
      )}
    </motion.div>
  );
}
