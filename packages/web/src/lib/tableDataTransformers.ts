export type SortDirection = 'asc' | 'desc';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  format?: (value: T[keyof T]) => string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export function paginate<T>(items: T[], page: number, pageSize: number): { items: T[]; pagination: PaginationState } {
  const total = items.length;
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), pagination: { page, pageSize, total } };
}

export function sortItems<T>(items: T[], key: keyof T, direction: SortDirection): T[] {
  return [...items].sort((a, b) => {
    const va = a[key];
    const vb = b[key];
    if (va == null) return 1;
    if (vb == null) return -1;
    const cmp = va < vb ? -1 : va > vb ? 1 : 0;
    return direction === 'asc' ? cmp : -cmp;
  });
}

export function searchItems<T>(items: T[], query: string, keys: (keyof T)[]): T[] {
  if (!query.trim()) return items;
  const lower = query.toLowerCase();
  return items.filter((item) => keys.some((key) => String(item[key]).toLowerCase().includes(lower)));
}

export function totalPages(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize);
}

export function rangeLabel(page: number, pageSize: number, total: number): string {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return `${start}–${end} of ${total}`;
}
