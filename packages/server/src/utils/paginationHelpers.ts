export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  offset: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PageLinks {
  self: string;
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export function parsePaginationParams(
  query: Record<string, unknown>,
  defaults: { page?: number; limit?: number; maxLimit?: number } = {}
): PaginationParams {
  const { page: defaultPage = 1, limit: defaultLimit = 20, maxLimit = 100 } = defaults;

  let page = parseInt(String(query.page || ''), 10);
  if (isNaN(page) || page < 1) {
    page = defaultPage;
  }

  let limit = parseInt(String(query.limit || query.per_page || query.pageSize || ''), 10);
  if (isNaN(limit) || limit < 1) {
    limit = defaultLimit;
  }
  limit = Math.min(limit, maxLimit);

  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export function buildPaginationMeta(
  params: PaginationParams,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / params.limit) || 1;

  return {
    page: params.page,
    limit: params.limit,
    offset: params.offset,
    total,
    totalPages,
    hasNextPage: params.page < totalPages,
    hasPrevPage: params.page > 1,
  };
}

export function createPageLinks(
  basePath: string,
  meta: PaginationMeta,
  extraParams: Record<string, string> = {}
): PageLinks {
  const buildUrl = (page: number): string => {
    const params = new URLSearchParams({
      ...extraParams,
      page: String(page),
      limit: String(meta.limit),
    });
    return `${basePath}?${params.toString()}`;
  };

  return {
    self: buildUrl(meta.page),
    first: buildUrl(1),
    last: buildUrl(meta.totalPages),
    next: meta.hasNextPage ? buildUrl(meta.page + 1) : null,
    prev: meta.hasPrevPage ? buildUrl(meta.page - 1) : null,
  };
}

export function paginateArray<T>(items: T[], params: PaginationParams): T[] {
  return items.slice(params.offset, params.offset + params.limit);
}
