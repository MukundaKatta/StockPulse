'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { WatchlistRow } from './WatchlistRow';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Trash2, Download, Upload } from 'lucide-react';

export function WatchlistSidebar() {
  const { watchlists, activeWatchlistId, addSymbol, removeItem } = useWatchlistStore();
  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  const handleAddSymbol = async (e: React.FormEvent) => {
    e.preventDefault();
    const symbol = newSymbol.trim().toUpperCase();
    if (!symbol || !activeWatchlistId) return;
    if (!/^[A-Z]{1,10}$/.test(symbol)) {
      toast.error('Invalid symbol format');
      return;
    }
    await addSymbol(activeWatchlistId, symbol);
    setNewSymbol('');
    setShowAddInput(false);
  };

  const handleExport = () => {
    if (!activeWatchlist?.items.length) return;
    const symbols = activeWatchlist.items.map((i) => i.symbol).join('\n');
    const blob = new Blob([symbols], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `watchlist-${activeWatchlist.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Watchlist exported');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !activeWatchlistId) return;
      const text = await file.text();
      const symbols = text
        .split(/[\n,]+/)
        .map((s) => s.trim().toUpperCase())
        .filter((s) => /^[A-Z]{1,10}$/.test(s));
      if (symbols.length === 0) {
        toast.error('No valid symbols found in file');
        return;
      }
      for (const sym of symbols) {
        await addSymbol(activeWatchlistId, sym);
      }
      toast.success(`Imported ${symbols.length} symbols`);
    };
    input.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <div className="flex items-center gap-1">
          {activeWatchlist && activeWatchlist.items.length > 0 && (
            <>
              <button
                onClick={handleExport}
                className="rounded p-1 text-gray-600 hover:text-gray-300 transition-colors"
                aria-label="Export watchlist"
                title="Export"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleImport}
                className="rounded p-1 text-gray-600 hover:text-gray-300 transition-colors"
                aria-label="Import watchlist"
                title="Import"
              >
                <Upload className="h-3.5 w-3.5" />
              </button>
            </>
          )}
          <button
            onClick={() => setShowAddInput(!showAddInput)}
            className="rounded p-1 text-gray-500 hover:text-gray-300 transition-colors"
            aria-label={showAddInput ? 'Cancel add' : 'Add stock to watchlist'}
          >
            {showAddInput ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </CardHeader>

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
            pattern="[A-Za-z]+"
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
          <div className="py-6 text-center">
            <p className="text-xs text-gray-600">
              {showAddInput ? 'Type a symbol and click Add' : 'Click + to add stocks'}
            </p>
            {!showAddInput && (
              <button
                onClick={handleImport}
                className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
              >
                or import from file
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
