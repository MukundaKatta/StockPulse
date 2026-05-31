'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { Newspaper, ExternalLink, Clock, Search } from 'lucide-react';
import type { NewsArticle } from '@/types';

const MARKET_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'SPY'];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: news = [], isLoading } = useQuery({
    queryKey: ['market-news'],
    queryFn: async () => {
      const results = await Promise.allSettled(
        MARKET_SYMBOLS.slice(0, 4).map((sym) =>
          api.get(`/api/stocks/${sym}/news`).then((r) => r.data.news as NewsArticle[])
        )
      );
      const all = results
        .filter((r): r is PromiseFulfilledResult<NewsArticle[]> => r.status === 'fulfilled')
        .flatMap((r) => r.value);
      const unique = Array.from(new Map(all.map((a) => [a.id, a])).values());
      return unique.sort((a, b) => b.datetime - a.datetime);
    },
    staleTime: 300000,
  });

  const filtered = searchQuery
    ? news.filter(
        (a) =>
          a.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : news;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.floor(diff / 60000)}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Market News</h1>
          <p className="mt-1 text-sm text-gray-500">Latest headlines from top sources</p>
        </div>
        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter news..."
              className="w-full rounded-lg border border-white/[0.06] bg-[#1a1a2e] pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <Newspaper className="mx-auto h-12 w-12 text-gray-600" />
            <p className="mt-3 text-gray-500">No news found</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.slice(0, 50).map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card hover>
                <div className="flex gap-4">
                  {article.image && (
                    <div className="hidden sm:block h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-white/5">
                      <img
                        src={article.image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {article.headline}
                    </h3>
                    {article.summary && (
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">{article.summary}</p>
                    )}
                    <div className="mt-2 flex items-center gap-3">
                      <Badge variant="default">{article.source}</Badge>
                      <span className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3" />
                        {formatTime(article.datetime)}
                      </span>
                      {article.related && (
                        <span className="text-xs text-gray-600 font-mono">{article.related}</span>
                      )}
                      <ExternalLink className="ml-auto h-3.5 w-3.5 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}
