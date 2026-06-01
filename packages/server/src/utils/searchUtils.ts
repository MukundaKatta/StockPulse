export interface SearchResult<T> {
  item: T;
  score: number;
  matches: string[];
}

export interface SearchIndex<T> {
  items: T[];
  fields: string[];
  tokenMap: Map<string, Set<number>>;
}

/**
 * Performs a fuzzy search on an array of objects.
 * Returns results sorted by relevance score.
 */
export function fuzzySearch<T extends Record<string, unknown>>(
  items: T[],
  query: string,
  fields: string[],
  options: { threshold?: number; maxResults?: number } = {}
): SearchResult<T>[] {
  const { threshold = 0.3, maxResults = 50 } = options;

  if (!query.trim()) return [];

  const queryLower = query.toLowerCase();
  const queryTokens = tokenize(queryLower);

  const results: SearchResult<T>[] = [];

  for (const item of items) {
    let bestScore = 0;
    const matches: string[] = [];

    for (const field of fields) {
      const value = getNestedValue(item, field);
      if (typeof value !== 'string') continue;

      const valueLower = value.toLowerCase();
      const score = calculateMatchScore(queryLower, queryTokens, valueLower);

      if (score > bestScore) {
        bestScore = score;
      }

      if (score >= threshold) {
        matches.push(field);
      }
    }

    if (bestScore >= threshold) {
      results.push({ item, score: bestScore, matches });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}

/**
 * Tokenizes a string into searchable tokens.
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 0);
}

/**
 * Builds a search index for fast lookups.
 */
export function buildSearchIndex<T extends Record<string, unknown>>(
  items: T[],
  fields: string[]
): SearchIndex<T> {
  const tokenMap = new Map<string, Set<number>>();

  for (let i = 0; i < items.length; i++) {
    for (const field of fields) {
      const value = getNestedValue(items[i], field);
      if (typeof value !== 'string') continue;

      const tokens = tokenize(value);
      for (const token of tokens) {
        // Index full token and all prefixes
        for (let len = 1; len <= token.length; len++) {
          const prefix = token.substring(0, len);
          if (!tokenMap.has(prefix)) {
            tokenMap.set(prefix, new Set());
          }
          tokenMap.get(prefix)!.add(i);
        }
      }
    }
  }

  return { items, fields, tokenMap };
}

/**
 * Search using a pre-built search index.
 */
export function searchIndex<T extends Record<string, unknown>>(
  index: SearchIndex<T>,
  query: string,
  maxResults = 50
): SearchResult<T>[] {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) return [];

  let matchingIndices: Set<number> | null = null;

  for (const token of queryTokens) {
    const indices = index.tokenMap.get(token);
    if (!indices) return [];

    if (matchingIndices === null) {
      matchingIndices = new Set(indices);
    } else {
      matchingIndices = new Set([...matchingIndices].filter((i) => indices.has(i)));
    }
  }

  if (!matchingIndices || matchingIndices.size === 0) return [];

  const results: SearchResult<T>[] = [];
  for (const idx of matchingIndices) {
    const item = index.items[idx];
    const queryLower = query.toLowerCase();
    const tokens = tokenize(queryLower);

    let bestScore = 0;
    const matches: string[] = [];

    for (const field of index.fields) {
      const value = getNestedValue(item, field);
      if (typeof value !== 'string') continue;
      const score = calculateMatchScore(queryLower, tokens, value.toLowerCase());
      if (score > bestScore) bestScore = score;
      if (score > 0) matches.push(field);
    }

    results.push({ item, score: bestScore, matches });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}

/**
 * Highlights matching portions of text.
 */
export function highlightMatches(
  text: string,
  query: string,
  wrapStart = '<mark>',
  wrapEnd = '</mark>'
): string {
  if (!query.trim()) return text;

  const queryTokens = tokenize(query);
  let result = text;

  for (const token of queryTokens) {
    const regex = new RegExp(`(${escapeRegex(token)})`, 'gi');
    result = result.replace(regex, `${wrapStart}$1${wrapEnd}`);
  }

  return result;
}

function calculateMatchScore(
  query: string,
  queryTokens: string[],
  target: string
): number {
  // Exact match
  if (target === query) return 1.0;

  // Starts with query
  if (target.startsWith(query)) return 0.9;

  // Contains query as substring
  if (target.includes(query)) return 0.7;

  // Token matching
  const targetTokens = tokenize(target);
  let matchedTokens = 0;

  for (const qt of queryTokens) {
    for (const tt of targetTokens) {
      if (tt === qt) {
        matchedTokens += 1.0;
        break;
      } else if (tt.startsWith(qt)) {
        matchedTokens += 0.8;
        break;
      } else if (tt.includes(qt)) {
        matchedTokens += 0.5;
        break;
      }
    }
  }

  return queryTokens.length > 0 ? (matchedTokens / queryTokens.length) * 0.6 : 0;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
