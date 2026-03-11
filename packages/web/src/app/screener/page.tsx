'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';

interface ScreenerFilter {
  minMarketCap: string;
  maxPE: string;
  minDividend: string;
  sector: string;
}

export default function ScreenerPage() {
  const [filters, setFilters] = useState<ScreenerFilter>({
    minMarketCap: '',
    maxPE: '',
    minDividend: '',
    sector: '',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Stock Screener</h1>
        <p className="mt-1 text-sm text-gray-500">Filter and find stocks matching your criteria</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Filter className="mr-1 inline h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-4 gap-4">
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
          <div className="flex items-end">
            <Button className="w-full">
              <Search className="h-4 w-4" />
              Screen
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <div className="py-12 text-center text-gray-500">
          <Filter className="mx-auto mb-3 h-8 w-8 text-gray-600" />
          <p className="text-sm">Configure filters above and click Screen to find matching stocks</p>
          <p className="mt-1 text-xs text-gray-600">Requires API keys to be configured in Settings</p>
        </div>
      </Card>
    </motion.div>
  );
}
