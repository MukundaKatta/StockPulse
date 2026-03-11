'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { PriceCard } from '@/components/stock/PriceCard';
import { WatchlistSidebar } from '@/components/watchlist/WatchlistSidebar';
import { useAppStore } from '@/stores/appStore';
import { LineChart, TrendingUp, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURED_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'TSLA', name: 'Tesla' },
];

export default function DashboardPage() {
  const { setCommandPaletteOpen } = useAppStore();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#12121a] to-[#1a1a2e] p-5 sm:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.15)_0%,transparent_50%)]" />
        <div className="relative">
          <h1 className="font-display text-xl sm:text-3xl font-bold text-white">
            Welcome to StockPulse
          </h1>
          <p className="mt-2 max-w-lg text-sm text-gray-400">
            Institutional-grade stock analysis with real-time data, technical indicators, and portfolio tracking.
          </p>
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700"
          >
            <TrendingUp className="h-4 w-4" />
            Search Stocks
            <kbd className="ml-2 hidden sm:inline rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Main content */}
        <div className="lg:col-span-9 space-y-4 sm:space-y-6">
          {/* Featured stocks */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-400">
              <TrendingUp className="h-4 w-4" />
              Popular Stocks
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FEATURED_STOCKS.map((stock) => (
                <PriceCard key={stock.symbol} symbol={stock.symbol} name={stock.name} />
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/portfolio">
              <Card hover className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                    <Briefcase className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Portfolio</h3>
                    <p className="text-xs text-gray-500">Track your investments</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-600" />
                </div>
              </Card>
            </Link>
            <Link href="/screener">
              <Card hover className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                    <LineChart className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Screener</h3>
                    <p className="text-xs text-gray-500">Find stocks with filters</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-600" />
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Watchlist sidebar */}
        <div className="lg:col-span-3">
          <WatchlistSidebar />
        </div>
      </div>
    </div>
  );
}
