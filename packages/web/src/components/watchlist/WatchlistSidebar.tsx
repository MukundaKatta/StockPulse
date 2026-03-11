'use client';

import { useState } from 'react';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { WatchlistRow } from './WatchlistRow';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Trash2 } from 'lucide-react';

export function WatchlistSidebar() {
  const { watchlists, activeWatchlistId, addSymbol, removeItem, createWatchlist } = useWatchlistStore();
  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  const handleAddSymbol = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol.trim() || !activeWatchlistId) return;
    await addSymbol(activeWatchlistId, newSymbol.trim().toUpperCase());
    setNewSymbol('');
    setShowAddInput(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <button
          onClick={() => setShowAddInput(!showAddInput)}
          className="rounded p-1 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label={showAddInput ? 'Cancel add' : 'Add stock to watchlist'}
        >
          {showAddInput ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </CardHeader>

      {/* Add symbol input */}
      {showAddInput && (
        <form onSubmit={handleAddSymbol} className="mb-3 flex gap-2">
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
            placeholder="AAPL"
            className="flex-1 rounded-lg border border-white/[0.06] bg-[#1a1a2e] px-3 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-500/50"
            autoFocus
            maxLength={10}
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </form>
      )}

      <div className="space-y-0.5">
        {activeWatchlist?.items.map((item) => (
          <div key={item.id} className="group flex items-center">
            <div className="flex-1">
              <WatchlistRow symbol={item.symbol} />
            </div>
            <button
              onClick={() => activeWatchlistId && removeItem(activeWatchlistId, item.id)}
              className="opacity-0 group-hover:opacity-100 rounded p-1 text-gray-600 hover:text-red-400 transition-all"
              aria-label={`Remove ${item.symbol}`}
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
        {(!activeWatchlist || activeWatchlist.items.length === 0) && (
          <p className="py-6 text-center text-xs text-gray-600">
            {showAddInput ? 'Type a symbol and click Add' : 'Click + to add stocks'}
          </p>
        )}
      </div>
    </Card>
  );
}
