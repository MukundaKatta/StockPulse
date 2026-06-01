export type FilterOp = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in';

export interface FilterRule<T> {
  field: keyof T;
  op: FilterOp;
  value: unknown;
}

export function applyFilter<T>(item: T, rule: FilterRule<T>): boolean {
  const fieldValue = item[rule.field];
  switch (rule.op) {
    case 'eq': return fieldValue === rule.value;
    case 'neq': return fieldValue !== rule.value;
    case 'gt': return (fieldValue as number) > (rule.value as number);
    case 'gte': return (fieldValue as number) >= (rule.value as number);
    case 'lt': return (fieldValue as number) < (rule.value as number);
    case 'lte': return (fieldValue as number) <= (rule.value as number);
    case 'contains': return String(fieldValue).toLowerCase().includes(String(rule.value).toLowerCase());
    case 'startsWith': return String(fieldValue).toLowerCase().startsWith(String(rule.value).toLowerCase());
    case 'endsWith': return String(fieldValue).toLowerCase().endsWith(String(rule.value).toLowerCase());
    case 'in': return Array.isArray(rule.value) && rule.value.includes(fieldValue);
    default: return true;
  }
}

export function applyFilters<T>(items: T[], rules: FilterRule<T>[]): T[] {
  return items.filter((item) => rules.every((rule) => applyFilter(item, rule)));
}

export function uniqueValues<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return [...new Set(items.map((item) => item[key]))];
}

export function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const k = String(item[key]);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

export function countBy<T, K extends keyof T>(items: T[], key: K): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    const k = String(item[key]);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
}
