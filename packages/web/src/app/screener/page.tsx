'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { formatCurrency, formatLargeNumber, cn } from '@/lib/formatters';

interface ScreenerFilter {
  minMarketCap: string;
  maxPE: string;
  minDividend: string;
  sector: string;
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
  { label: 'Large Cap Value', filters: { minMarketCap: '10000000000', maxPE: '20', minDividend: '2', sector: '' } },
  { label: 'Growth Stocks', filters: { minMarketCap: '1000000000', maxPE: '', minDividend: '', sector: 'Technology' } },
  { label: 'High Dividend', filters: { minMarketCap: '', maxPE: '', minDividend: '4', sector: '' } },
];

const SECTORS = ['', 'Technology', 'Healthcare', 'Financial Services', 'Consumer Cyclical', 'Industrial', 'Energy', 'Utilities', 'Real Estate', 'Communication Services'];

// Curated stock lists for screening (since we don't have a full market database)
const SCREEN_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'BRK-B', 'JPM', 'JNJ', 'V', 'UNH', 'PG', 'HD', 'MA', 'XOM', 'CVX', 'PFE', 'KO', 'PEP', 'ABBV', 'MRK', 'WMT', 'COST', 'DIS'];

export default function ScreenerPage() {
  const [filters, setFilters] = useState<ScreenerFilter>({
    minMarketCap: '',
    maxPE: '',
    minDividend: '',
    sector: '',
  });
  const [runScreen, setRunScreen] = useState(false);
  const [screenKey, setScreenKey] = useState(0);

  const { data: results, isLoading } = useQuery({
    queryKey: ['screener', screenKey, filters],
    queryFn: async () => {
      const overviews: ScreenResult[] = [];
      // Fetch quotes and overviews for curated symbols
      const symbolBatch = SCREEN_SYMBOLS.slice(0, 12);
      const promises = symbolBatch.map(async (symbol) => {
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
          if (filters.sector && result.sector !== filters.sector) return null;

          return result;
        } catch {
          return null;
        }
      });

      const settled = await Promise.all(promises);
      return settled.filter(Boolean) as ScreenResult[];
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          <CardTitle>Results{results ? ` (${results.length})` : ''}</CardTitle>
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
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Symbol</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:table-cell">Name</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Change</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 hidden md:table-cell">Market Cap</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 hidden md:table-cell">P/E</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 hidden lg:table-cell">Sector</th>
                </tr>
              </thead>
              <tbody>
                {results.map((stock) => {
                  const isPositive = stock.change >= 0;
                  return (
                    <tr key={stock.symbol} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/stock/${stock.symbol}`} className="font-mono font-medium text-indigo-400 hover:text-indigo-300">
                          {stock.symbol}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{stock.name}</td>
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
