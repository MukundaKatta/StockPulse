'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CandlestickChart } from '@/components/charts/CandlestickChart';
import { StockHeader } from '@/components/stock/StockHeader';
import { TechnicalPanel } from '@/components/stock/TechnicalPanel';
import { FundamentalPanel } from '@/components/stock/FundamentalPanel';
import { NewsPanel } from '@/components/stock/NewsPanel';
import { KeyMetrics } from '@/components/stock/KeyMetrics';
import { useStockQuote, useStockHistory, useCompanyOverview, useStockNews } from '@/hooks/useStockData';
import { useTechnicalIndicators } from '@/hooks/useTechnicals';
import { ChartSkeleton, CardSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/formatters';

const TABS = ['Technical', 'Fundamental', 'News'] as const;
type Tab = typeof TABS[number];

export default function StockPage() {
  const params = useParams();
  const symbol = (params.symbol as string)?.toUpperCase() || null;
  const [activeTab, setActiveTab] = useState<Tab>('Technical');
  const [timeframe, setTimeframe] = useState('daily');

  const { data: quote, isLoading: quoteLoading } = useStockQuote(symbol);
  const { data: history, isLoading: historyLoading } = useStockHistory(symbol, timeframe);
  const { data: overview } = useCompanyOverview(symbol);
  const { data: indicators } = useTechnicalIndicators(symbol, timeframe);
  const { data: news } = useStockNews(symbol);

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
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Stock Header */}
      <StockHeader quote={quote} overview={overview} />

      {/* Chart */}
      <div className="rounded-xl border border-white/[0.06] bg-[#12121a] p-4">
        {historyLoading ? (
          <ChartSkeleton />
        ) : history ? (
          <CandlestickChart
            data={history}
            currentTimeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        ) : null}
      </div>

      {/* Key Metrics */}
      <KeyMetrics quote={quote} overview={overview} />

      {/* Tabs */}
      <div className="border-b border-white/[0.06]">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium transition-all',
                activeTab === tab ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'
              )}
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
      <div>
        {activeTab === 'Technical' && indicators && (
          <TechnicalPanel indicators={indicators} />
        )}
        {activeTab === 'Fundamental' && overview && (
          <FundamentalPanel overview={overview} />
        )}
        {activeTab === 'News' && (
          <NewsPanel news={news || []} />
        )}
      </div>
    </motion.div>
  );
}
