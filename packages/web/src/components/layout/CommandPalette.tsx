'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useStockSearch } from '@/hooks/useStockData';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/formatters';

const MAX_RECENT = 8;

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('sp-recent-searches') || '[]');
  } catch {
    return [];
  }
}

function addRecentSearch(symbol: string) {
  const recent = getRecentSearches().filter((s) => s !== symbol);
  recent.unshift(symbol);
  localStorage.setItem('sp-recent-searches', JSON.stringify(recent.slice(0, MAX_RECENT)));
}

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const debouncedQuery = useDebounce(query, 300);
  const { data: results, isLoading } = useStockSearch(debouncedQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    },
    [commandPaletteOpen, setCommandPaletteOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [results]);

  useEffect(() => {
    if (!commandPaletteOpen) {
      setQuery('');
      setSelectedIdx(0);
    }
  }, [commandPaletteOpen]);

  const handleSelect = (symbol: string) => {
    addRecentSearch(symbol);
    setCommandPaletteOpen(false);
    setQuery('');
    router.push(`/stock/${symbol}`);
  };

  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    const items = results || [];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && items[selectedIdx]) {
      handleSelect(items[selectedIdx].symbol);
    }
  };

  const recentSearches = getRecentSearches();

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
            className="fixed left-1/2 top-[15%] sm:top-[20%] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border border-white/10 bg-[#12121a] shadow-2xl shadow-black/40"
            role="dialog"
            aria-modal="true"
            aria-label="Search stocks"
            onKeyDown={handlePaletteKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
              <Search className="h-5 w-5 text-gray-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stocks, ETFs, crypto..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                autoFocus
                aria-label="Search query"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-500 hover:text-gray-300">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {isLoading && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  <div className="mx-auto mb-2 h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                  Searching...
                </div>
              )}

              {!isLoading && results && results.length === 0 && query.length > 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">No results found</div>
              )}

              {!isLoading && results?.map((result, idx) => (
                <button
                  key={result.symbol}
                  onClick={() => handleSelect(result.symbol)}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
                    idx === selectedIdx ? 'bg-white/5' : 'hover:bg-white/5'
                  )}
                >
                  <TrendingUp className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-sm font-medium text-white">{result.symbol}</span>
                    <span className="ml-2 text-xs text-gray-500 truncate">{result.name}</span>
                  </div>
                  <span className="text-xs text-gray-600 shrink-0">{result.type}</span>
                </button>
              ))}

              {!query && recentSearches.length > 0 && (
                <div>
                  <div className="px-4 py-1.5 text-[10px] font-semibold uppercase text-gray-600">Recent</div>
                  {recentSearches.map((symbol) => (
                    <button
                      key={symbol}
                      onClick={() => handleSelect(symbol)}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-white/5 transition-colors"
                    >
                      <Clock className="h-3.5 w-3.5 text-gray-600" />
                      <span className="font-mono text-sm text-gray-300">{symbol}</span>
                    </button>
                  ))}
                </div>
              )}

              {!query && recentSearches.length === 0 && (
                <div className="px-4 py-6 text-center text-xs text-gray-600">
                  Type to search for stocks
                  <div className="mt-2 flex items-center justify-center gap-1 text-gray-700">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 text-[10px]">↑↓</kbd>
                    navigate
                    <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1 text-[10px]">���</kbd>
                    select
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
