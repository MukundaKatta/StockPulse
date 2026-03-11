'use client';

import { useWatchlistStore } from '@/stores/watchlistStore';
import { WatchlistRow } from './WatchlistRow';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function WatchlistSidebar() {
  const { watchlists, activeWatchlistId } = useWatchlistStore();
  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <button className="rounded p-1 text-gray-500 hover:text-gray-300">
          <Plus className="h-4 w-4" />
        </button>
      </CardHeader>

      <div className="space-y-0.5">
        {activeWatchlist?.items.map((item) => (
          <WatchlistRow key={item.id} symbol={item.symbol} />
        ))}
        {(!activeWatchlist || activeWatchlist.items.length === 0) && (
          <p className="py-6 text-center text-xs text-gray-600">
            Search and add stocks to your watchlist
          </p>
        )}
      </div>
    </Card>
  );
}
