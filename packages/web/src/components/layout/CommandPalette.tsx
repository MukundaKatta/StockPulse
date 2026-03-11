'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useStockSearch } from '@/hooks/useStockData';
import { useDebounce } from '@/hooks/useDebounce';

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data: results, isLoading } = useStockSearch(debouncedQuery);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const handleSelect = (symbol: string) => {
    setCommandPaletteOpen(false);
    setQuery('');
    router.push(`/stock/${symbol}`);
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-white/10 bg-[#12121a] shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stocks, ETFs, crypto..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                autoFocus
              />
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {isLoading && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">Searching...</div>
              )}

              {!isLoading && results && results.length === 0 && query.length > 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">No results found</div>
              )}

              {!isLoading && results?.map((result) => (
                <button
                  key={result.symbol}
                  onClick={() => handleSelect(result.symbol)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5"
                >
                  <TrendingUp className="h-4 w-4 shrink-0 text-indigo-400" />
                  <div className="flex-1">
                    <span className="font-mono text-sm font-medium text-white">{result.symbol}</span>
                    <span className="ml-2 text-xs text-gray-500">{result.name}</span>
                  </div>
                  <span className="text-xs text-gray-600">{result.type}</span>
                </button>
              ))}

              {!query && (
                <div className="px-4 py-4 text-center text-xs text-gray-600">
                  <Clock className="mx-auto mb-2 h-5 w-5" />
                  Type to search for stocks
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
