'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { usePortfolioQuotes } from '@/hooks/usePortfolioQuotes';
import { HoldingsTable } from '@/components/portfolio/HoldingsTable';
import { PerformanceCard } from '@/components/portfolio/PerformanceCard';
import { AllocationChart } from '@/components/portfolio/AllocationChart';
import { TradeHistory } from '@/components/portfolio/TradeHistory';
import { AddTradeModal } from '@/components/portfolio/AddTradeModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Download } from 'lucide-react';

export default function PortfolioPage() {
  const { portfolios, activePortfolioId, holdings, trades, fetchPortfolios, fetchHoldings } = usePortfolioStore();
  const { quotes } = usePortfolioQuotes(holdings);
  const [showTradeModal, setShowTradeModal] = useState(false);

  const exportCSV = () => {
    if (holdings.length === 0) return;
    const headers = ['Symbol', 'Shares', 'Avg Cost', 'Cost Basis', 'Market Price', 'Market Value', 'P&L', 'P&L %'];
    const rows = holdings.map((h) => {
      const quote = quotes[h.symbol];
      const price = quote?.price ?? h.avgCost;
      const marketValue = price * h.quantity;
      const pl = marketValue - h.totalCost;
      const plPct = h.totalCost > 0 ? ((pl / h.totalCost) * 100).toFixed(2) : '0';
      return [h.symbol, h.quantity.toFixed(2), h.avgCost.toFixed(2), h.totalCost.toFixed(2), price.toFixed(2), marketValue.toFixed(2), pl.toFixed(2), plPct].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  useEffect(() => {
    if (activePortfolioId) {
      fetchHoldings(activePortfolioId);
    }
  }, [activePortfolioId, fetchHoldings]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio</h1>
          <p className="mt-1 text-sm text-gray-500">Track your investments and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={exportCSV} disabled={holdings.length === 0}>
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button onClick={() => setShowTradeModal(true)}>
            <Plus className="h-4 w-4" />
            Add Trade
          </Button>
        </div>
      </div>

      {/* Performance cards */}
      <ErrorBoundary>
        <PerformanceCard holdings={holdings} quotes={quotes} />
      </ErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Holdings table */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Holdings</CardTitle>
            </CardHeader>
            <HoldingsTable holdings={holdings} quotes={quotes} />
          </Card>
        </div>

        {/* Allocation chart */}
        <div className="lg:col-span-4">
          <AllocationChart holdings={holdings} />
        </div>
      </div>

      {/* Trade History */}
      {activePortfolioId && (
        <ErrorBoundary>
          <TradeHistory trades={trades} portfolioId={activePortfolioId} />
        </ErrorBoundary>
      )}

      {/* Add Trade Modal */}
      {activePortfolioId && (
        <AddTradeModal
          portfolioId={activePortfolioId}
          isOpen={showTradeModal}
          onClose={() => setShowTradeModal(false)}
        />
      )}
    </motion.div>
  );
}
