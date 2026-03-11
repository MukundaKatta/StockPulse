'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, TrendingUp, TrendingDown, Loader2, ArrowUpDown, Download } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';

interface ScreenerFilter {
  minMarketCap: string;
  maxPE: string;
  minDividend: string;
  sector: string;
  maxPB: string;
}

interface ScreenResult {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: string;
  dividendYield: string;
  sector: string;
}

const POPULAR_SCREENS = [
  { label: 'Large Cap Value', filters: { minMarketCap: '10000000000', maxPE: '20', minDividend: '2', sector: '', maxPB: '' } },
  { label: 'Growth Stocks', filters: { minMarketCap: '1000000000', maxPE: '', minDividend: '', sector: 'Technology', maxPB: '' } },
  { label: 'High Dividend', filters: { minMarketCap: '', maxPE: '', minDividend: '4', sector: '', maxPB: '' } },
  { label: 'Mega Cap', filters: { minMarketCap: '200000000000', maxPE: '', minDividend: '', sector: '', maxPB: '' } },
  { label: 'Value + Income', filters: { minMarketCap: '5000000000', maxPE: '15', minDividend: '3', sector: '', maxPB: '3' } },
];

const SECTORS = ['', 'Technology', 'Healthcare', 'Financial Services', 'Consumer Cyclical', 'Industrial', 'Energy', 'Utilities', 'Real Estate', 'Communication Services'];

// Expanded curated stock list covering major sectors
const SCREEN_SYMBOLS = [
  // Tech
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'AVGO', 'CRM', 'ADBE', 'AMD', 'INTC', 'ORCL', 'CSCO', 'QCOM',
  // Finance
  'JPM', 'V', 'MA', 'BAC', 'GS', 'WFC', 'BLK', 'AXP',
  // Healthcare
  'JNJ', 'UNH', 'PFE', 'ABBV', 'MRK', 'LLY', 'TMO', 'ABT',
  // Consumer
  'PG', 'KO', 'PEP', 'WMT', 'COST', 'HD', 'MCD', 'NKE', 'SBUX',
  // Energy & Industrials
  'XOM', 'CVX', 'CAT', 'BA', 'GE', 'UPS', 'HON',
  // Other
  'DIS', 'NFLX', 'T', 'VZ', 'NEE', 'BRK-B',
];

export default function ScreenerPage() {
  const [filters, setFilters] = useState<ScreenerFilter>({
    minMarketCap: '',
    maxPE: '',
    minDividend: '',
    sector: '',
    maxPB: '',
  });
  const [runScreen, setRunScreen] = useState(false);
  const [screenKey, setScreenKey] = useState(0);
  const [sortCol, setSortCol] = useState<string>('marketCap');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const { data: results, isLoading } = useQuery({
    queryKey: ['screener', screenKey, filters],
    queryFn: async () => {
      // Fetch in batches of 5 to avoid rate limiting
      const BATCH_SIZE = 5;
      const allResults: (ScreenResult | null)[] = [];

      for (let i = 0; i < SCREEN_SYMBOLS.length; i += BATCH_SIZE) {
        const batch = SCREEN_SYMBOLS.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
          batch.map(async (symbol) => {
            try {
              const [quoteRes, overviewRes] = await Promise.allSettled([
                api.get(`/api/stocks/${symbol}/quote`),
                api.get(`/api/stocks/${symbol}/overview`),
              ]);
              const quote = quoteRes.status === 'fulfilled' ? quoteRes.value.data.quote : null;
              const overview = overviewRes.status === 'fulfilled' ? overviewRes.value.data.overview : null;
              if (!quote) return null;

              const result: ScreenResult = {
                symbol,
                name: overview?.Name || symbol,
                price: quote.price,
                change: quote.change,
                changePercent: quote.changePercent,
                marketCap: overview?.MarketCapitalization || '0',
                peRatio: overview?.PERatio || '-',
                dividendYield: overview?.DividendYield || '0',
                sector: overview?.Sector || '-',
              };

              // Apply filters
              if (filters.minMarketCap && parseFloat(result.marketCap) < parseFloat(filters.minMarketCap)) return null;
              if (filters.maxPE && result.peRatio !== '-' && parseFloat(result.peRatio) > parseFloat(filters.maxPE)) return null;
              if (filters.minDividend && parseFloat(result.dividendYield) < parseFloat(filters.minDividend) / 100) return null;
              if (filters.maxPB && overview?.PriceToBookRatio && overview.PriceToBookRatio !== '-' && parseFloat(overview.PriceToBookRatio) > parseFloat(filters.maxPB)) return null;
              if (filters.sector && result.sector !== filters.sector) return null;

              return result;
            } catch {
              return null;
            }
          })
        );
        allResults.push(...batchResults);
      }

      return allResults.filter(Boolean) as ScreenResult[];
    },
    enabled: runScreen,
    staleTime: 300000,
  });

  const handleScreen = () => {
    setRunScreen(true);
    setScreenKey((k) => k + 1);
  };

  const applyPreset = (preset: typeof POPULAR_SCREENS[0]) => {
    setFilters(preset.filters);
    toast.info(`Applied "${preset.label}" screen`);
  };

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const sortedResults = results ? [...results].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortCol === 'symbol') return a.symbol.localeCompare(b.symbol) * mul;
    if (sortCol === 'price') return (a.price - b.price) * mul;
    if (sortCol === 'changePercent') return (a.changePercent - b.changePercent) * mul;
    if (sortCol === 'marketCap') return (parseFloat(a.marketCap || '0') - parseFloat(b.marketCap || '0')) * mul;
    if (sortCol === 'peRatio') return ((parseFloat(a.peRatio) || 999) - (parseFloat(b.peRatio) || 999)) * mul;
    return 0;
  }) : [];

  const exportScreenerCSV = () => {
    if (!sortedResults.length) return;
    const headers = ['Symbol', 'Name', 'Price', 'Change %', 'Market Cap', 'P/E', 'Dividend Yield', 'Sector'];
    const rows = sortedResults.map((s) => {
      const div = parseFloat(s.dividendYield);
      return [s.symbol, `"${s.name}"`, s.price.toFixed(2), s.changePercent.toFixed(2), s.marketCap, s.peRatio, isNaN(div) ? '0%' : (div * 100).toFixed(2) + '%', `"${s.sector}"`].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `screener-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Stock Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Filter and find stocks matching your criteria</p>
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-2">
        {POPULAR_SCREENS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset)}
            className="rounded-lg border border-white/[0.06] bg-[#12121a] px-3 py-1.5 text-xs font-medium text-gray-400 transition-all hover:border-indigo-500/30 hover:text-indigo-400"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Filter className="mr-1 inline h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Min Market Cap"
            placeholder="e.g. 1000000000"
            value={filters.minMarketCap}
            onChange={(e) => setFilters((f) => ({ ...f, minMarketCap: e.target.value }))}
          />
          <Input
            label="Max P/E Ratio"
            placeholder="e.g. 30"
            value={filters.maxPE}
            onChange={(e) => setFilters((f) => ({ ...f, maxPE: e.target.value }))}
          />
          <Input
            label="Min Dividend Yield %"
            placeholder="e.g. 2"
            value={filters.minDividend}
            onChange={(e) => setFilters((f) => ({ ...f, minDividend: e.target.value }))}
          />
          <Input
            label="Max P/B Ratio"
            placeholder="e.g. 5"
            value={filters.maxPB}
            onChange={(e) => setFilters((f) => ({ ...f, maxPB: e.target.value }))}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-400">Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters((f) => ({ ...f, sector: e.target.value }))}
              className="w-full rounded-lg border border-white/[0.06] bg-[#1a1a2e] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
            >
              <option value="">All Sectors</option>
              {SECTORS.filter(Boolean).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={handleScreen} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {isLoading ? 'Screening...' : 'Screen'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Results{results ? ` (${results.length})` : ''}</CardTitle>
            {sortedResults.length > 0 && (
              <button onClick={exportScreenerCSV} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </button>
            )}
          </div>
        </CardHeader>
        {!runScreen ? (
          <div className="py-12 text-center text-gray-500">
            <Filter className="mx-auto mb-3 h-8 w-8 text-gray-600" />
            <p className="text-sm">Configure filters above and click Screen to find matching stocks</p>
            <p className="mt-1 text-xs text-gray-600">Or try a quick preset above</p>
          </div>
        ) : isLoading ? (
          <div className="py-12 text-center text-gray-500">
            <Loader2 className="mx-auto mb-3 h-8 w-8 text-indigo-400 animate-spin" />
            <p className="text-sm">Screening stocks...</p>
          </div>
        ) : results && results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[
                    { key: 'symbol', label: 'Symbol', align: 'left', hide: '' },
                    { key: 'price', label: 'Price', align: 'right', hide: '' },
                    { key: 'changePercent', label: 'Change', align: 'right', hide: '' },
                    { key: 'marketCap', label: 'Market Cap', align: 'right', hide: 'hidden md:table-cell' },
                    { key: 'peRatio', label: 'P/E', align: 'right', hide: 'hidden md:table-cell' },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className={cn('cursor-pointer px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-400', col.align === 'right' ? 'text-right' : 'text-left', col.hide)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <ArrowUpDown className="h-3 w-3" />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 hidden lg:table-cell">Sector</th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((stock) => {
                  const isPositive = stock.change >= 0;
                  return (
                    <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/stock/${stock.symbol}`} className="font-mono font-medium text-indigo-400 hover:text-indigo-300">
                          {stock.symbol}
                        </Link>
                        <div className="text-xs text-gray-600 truncate max-w-[120px]">{stock.name}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium text-white">{formatCurrency(stock.price)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn('inline-flex items-center gap-1 font-mono text-xs', isPositive ? 'text-green-400' : 'text-red-400')}>
                          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-gray-400 hidden md:table-cell">{formatLargeNumber(parseFloat(stock.marketCap || '0'))}</td>
                      <td className="px-4 py-3 text-right font-mono text-gray-400 hidden md:table-cell">{stock.peRatio}</td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <Badge variant="info">{stock.sector}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <p className="text-sm">No stocks match your criteria</p>
            <p className="mt-1 text-xs text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
