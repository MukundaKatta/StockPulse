export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  symbols: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  category: string;
}

export interface NewsFeed {
  articles: NewsArticle[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface NewsFilter {
  symbols?: string[];
  sources?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}
