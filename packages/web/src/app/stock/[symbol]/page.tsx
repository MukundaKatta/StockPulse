'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CandlestickChart } from '@/components/charts/CandlestickChart';
import { StockHeader } from '@/components/stock/StockHeader';
import { TechnicalPanel } from '@/components/stock/TechnicalPanel';
import { FundamentalPanel } from '@/components/stock/FundamentalPanel';
import { NewsPanel } from '@/components/stock/NewsPanel';
import { EarningsPanel } from '@/components/stock/EarningsPanel';
import { KeyMetrics } from '@/components/stock/KeyMetrics';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { useStockQuote, useStockHistory, useCompanyOverview, useStockNews } from '@/hooks/useStockData';
import { useTechnicalIndicators } from '@/hooks/useTechnicals';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { ChartSkeleton, CardSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/formatters';
import { TIMEFRAMES } from '@/lib/constants';
import { Star, StarOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TABS = ['Technical', 'Fundamental', 'Earnings', 'News'] as const;
type Tab = typeof TABS[number];

export default function StockPage() {
  const params = useParams();
  const symbol = (params.symbol as string)?.toUpperCase() || null;
  const [activeTab, setActiveTab] = useState<Tab>('Technical');
  const [timeframeIdx, setTimeframeIdx] = useState(4); // Default to '1Y'
  const tf = TIMEFRAMES[timeframeIdx];

  const { data: quote, isLoading: quoteLoading } = useStockQuote(symbol);
  const { data: history, isLoading: historyLoading } = useStockHistory(symbol, tf.value, tf.outputSize, tf.days);
  const { data: overview } = useCompanyOverview(symbol);
  const { data: indicators } = useTechnicalIndicators(symbol, tf.value);
  const { data: news } = useStockNews(symbol);

  const { watchlists, activeWatchlistId, addSymbol, removeItem } = useWatchlistStore();
  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId);
  const isInWatchlist = activeWatchlist?.items.some((item) => item.symbol === symbol);
  const watchlistItem = activeWatchlist?.items.find((item) => item.symbol === symbol);

  const handleToggleWatchlist = async () => {
    if (!symbol || !activeWatchlistId) return;
    if (isInWatchlist && watchlistItem) {
      await removeItem(activeWatchlistId, watchlistItem.id);
    } else {
      await addSymbol(activeWatchlistId, symbol);
    }
  };

  if (quoteLoading) {
    return (
      <div className="space-y-6">
        <CardSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Stock Not Found</h2>
          <p className="mt-2 text-gray-500">Could not load data for {symbol}</p>
          <p className="mt-1 text-xs text-gray-600">Check if API keys are configured in Settings</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Stock Header with Watchlist toggle */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <StockHeader quote={quote} overview={overview} />
        <Button
          variant={isInWatchlist ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleToggleWatchlist}
          aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          {isInWatchlist ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
          <span className="hidden sm:inline">{isInWatchlist ? 'Remove' : 'Watch'}</span>
        </Button>
      </div>

      {/* Chart */}
      <ErrorBoundary>
        <div className="rounded-xl border border-white/[0.06] bg-[#12121a] p-3 sm:p-4">
          {historyLoading ? (
            <ChartSkeleton />
          ) : history ? (
            <CandlestickChart
              data={history}
              currentTimeframeIdx={timeframeIdx}
              onTimeframeIdxChange={setTimeframeIdx}
              indicators={indicators}
            />
          ) : null}
        </div>
      </ErrorBoundary>

      {/* Key Metrics */}
      <KeyMetrics quote={quote} overview={overview} />

      {/* Tabs */}
      <div className="border-b border-white/[0.06]">
        <div className="flex gap-1 overflow-x-auto" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'
              )}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <ErrorBoundary>
        <div>
          {activeTab === 'Technical' && indicators && (
            <TechnicalPanel indicators={indicators} />
          )}
          {activeTab === 'Fundamental' && overview && (
            <FundamentalPanel overview={overview} />
          )}
          {activeTab === 'Earnings' && symbol && (
            <EarningsPanel symbol={symbol} />
          )}
          {activeTab === 'News' && (
            <NewsPanel news={news || []} />
          )}
        </div>
      </ErrorBoundary>
    </motion.div>
  );
}
