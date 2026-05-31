'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { Star, Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/formatters';
import api from '@/lib/api';

export default function WatchlistsPage() {
  const { watchlists, activeWatchlistId, setActiveWatchlist, createWatchlist, deleteWatchlist, fetchWatchlists } = useWatchlistStore();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await createWatchlist(newName.trim());
    setNewName('');
    setShowCreate(false);
  };

  const handleRename = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await api.patch(`/api/watchlist/${id}`, { name: editName.trim() });
      toast.success('Watchlist renamed');
      await fetchWatchlists();
    } catch {
      toast.error('Failed to rename watchlist');
    }
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this watchlist? This cannot be undone.')) return;
    await deleteWatchlist(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Watchlists</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your stock watchlists</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showCreate ? 'Cancel' : 'New Watchlist'}
        </Button>
      </div>

      {showCreate && (
        <Card>
          <form onSubmit={handleCreate} className="flex gap-3">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Watchlist name"
              autoFocus
              className="flex-1"
            />
            <Button type="submit">Create</Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {watchlists.map((wl) => (
          <Card key={wl.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => setActiveWatchlist(wl.id)}
                  className={cn(
                    'rounded-lg p-2 transition-colors',
                    activeWatchlistId === wl.id ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-600 hover:text-gray-400'
                  )}
                >
                  <Star className="h-4 w-4" fill={activeWatchlistId === wl.id ? 'currentColor' : 'none'} />
                </button>
                {editingId === wl.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 rounded border border-white/[0.06] bg-[#1a1a2e] px-2 py-1 text-sm text-white outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(wl.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                    />
                    <button onClick={() => handleRename(wl.id)} className="text-green-400 hover:text-green-300">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-300">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">{wl.name}</h3>
                    <p className="text-xs text-gray-500">{wl.items.length} stocks</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeWatchlistId === wl.id && <Badge variant="info">Active</Badge>}
                <button
                  onClick={() => { setEditingId(wl.id); setEditName(wl.name); }}
                  className="rounded p-1 text-gray-600 hover:text-gray-300 transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(wl.id)}
                  className="rounded p-1 text-gray-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            {wl.items.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {wl.items.slice(0, 10).map((item) => (
                  <Link
                    key={item.id}
                    href={`/stock/${item.symbol}`}
                    className="rounded bg-white/5 px-2 py-0.5 text-xs font-mono text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {item.symbol}
                  </Link>
                ))}
                {wl.items.length > 10 && (
                  <span className="text-xs text-gray-600">+{wl.items.length - 10} more</span>
                )}
              </div>
            )}
          </Card>
        ))}

        {watchlists.length === 0 && (
          <Card>
            <div className="py-12 text-center">
              <Star className="mx-auto h-8 w-8 text-gray-600" />
              <p className="mt-3 text-sm text-gray-500">No watchlists yet</p>
              <p className="mt-1 text-xs text-gray-600">Create one to start tracking stocks</p>
            </div>
          </Card>
        )}
      </div>
    </motion.div>
  );
}
