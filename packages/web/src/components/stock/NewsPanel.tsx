'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/formatters';
import { ExternalLink } from 'lucide-react';
import type { NewsArticle } from '@/types';

interface NewsPanelProps {
  news: NewsArticle[];
}

export function NewsPanel({ news }: NewsPanelProps) {
  if (!news.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>News</CardTitle>
        </CardHeader>
        <p className="text-center text-sm text-gray-500 py-8">No recent news available</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-white/[0.04] bg-[#0a0a0f] p-3 transition-all hover:border-indigo-500/20 hover:bg-[#0f0f18]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-white line-clamp-2">
                  {article.headline}
                </h4>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{article.summary}</p>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-600">
                  <span>{article.source}</span>
                  <span>·</span>
                  <span>{formatDate(new Date(article.datetime * 1000))}</span>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-600 group-hover:text-indigo-400" />
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}
