export type SortDirection = 'asc' | 'desc';

export function sortByKey<T>(array: T[], key: keyof T, direction: SortDirection = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const va = a[key];
    const vb = b[key];
    if (va === vb) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    const cmp = va < vb ? -1 : 1;
    return direction === 'asc' ? cmp : -cmp;
  });
}

export function sortByMultiple<T>(array: T[], criteria: { key: keyof T; direction: SortDirection }[]): T[] {
  return [...array].sort((a, b) => {
    for (const { key, direction } of criteria) {
      const va = a[key];
      const vb = b[key];
      if (va === vb) continue;
      if (va == null) return 1;
      if (vb == null) return -1;
      const cmp = va < vb ? -1 : 1;
      return direction === 'asc' ? cmp : -cmp;
    }
    return 0;
  });
}

export function stableSort<T>(array: T[], compareFn: (a: T, b: T) => number): T[] {
  const indexed = array.map((item, index) => ({ item, index }));
  indexed.sort((a, b) => {
    const result = compareFn(a.item, b.item);
    return result !== 0 ? result : a.index - b.index;
  });
  return indexed.map(({ item }) => item);
}

export function toggleDirection(current: SortDirection): SortDirection {
  return current === 'asc' ? 'desc' : 'asc';
}
