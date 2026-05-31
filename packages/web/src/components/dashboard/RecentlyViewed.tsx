'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, X } from 'lucide-react';
import { cn } from '@/lib/formatters';

const STORAGE_KEY = 'sp-recently-viewed';
const MAX_ITEMS = 10;

export interface RecentStock {
  symbol: string;
  name?: string;
  viewedAt: number;
}

export function addRecentlyViewed(symbol: string, name?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const items: RecentStock[] = stored ? JSON.parse(stored) : [];
    const filtered = items.filter((i) => i.symbol !== symbol);
    filtered.unshift({ symbol, name, viewedAt: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
  } catch {}
}

export function getRecentlyViewed(): RecentStock[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function RecentlyViewed() {
  const [items, setItems] = useState<RecentStock[]>([]);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  const removeItem = (symbol: string) => {
    const updated = items.filter((i) => i.symbol !== symbol);
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  if (items.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          Recently Viewed
        </CardTitle>
      </CardHeader>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div key={item.symbol} className="group relative">
            <Link
              href={`/stock/${item.symbol}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-sm transition-colors hover:bg-white/5 hover:border-white/10"
            >
              <span className="font-mono font-medium text-white">{item.symbol}</span>
              {item.name && <span className="text-xs text-gray-500 hidden sm:inline">{item.name}</span>}
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); removeItem(item.symbol); }}
              className="absolute -right-1 -top-1 hidden rounded-full bg-gray-800 p-0.5 text-gray-500 hover:text-red-400 group-hover:block"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
