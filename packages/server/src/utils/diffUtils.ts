export interface DiffEntry {
  path: string;
  type: 'added' | 'removed' | 'changed';
  oldValue?: unknown;
  newValue?: unknown;
}

export interface ChangelogEntry {
  timestamp: string;
  changes: DiffEntry[];
  summary: string;
}

export function objectDiff(
  oldObj: Record<string, unknown>,
  newObj: Record<string, unknown>,
  prefix = ''
): DiffEntry[] {
  const diffs: DiffEntry[] = [];
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const path = prefix ? `${prefix}.${key}` : key;
    const oldVal = oldObj[key];
    const newVal = newObj[key];

    if (!(key in oldObj)) {
      diffs.push({ path, type: 'added', newValue: newVal });
    } else if (!(key in newObj)) {
      diffs.push({ path, type: 'removed', oldValue: oldVal });
    } else if (
      typeof oldVal === 'object' &&
      typeof newVal === 'object' &&
      oldVal !== null &&
      newVal !== null &&
      !Array.isArray(oldVal) &&
      !Array.isArray(newVal)
    ) {
      diffs.push(
        ...objectDiff(
          oldVal as Record<string, unknown>,
          newVal as Record<string, unknown>,
          path
        )
      );
    } else if (!deepEqual(oldVal, newVal)) {
      diffs.push({ path, type: 'changed', oldValue: oldVal, newValue: newVal });
    }
  }

  return diffs;
}

export function arrayDiff<T>(
  oldArr: T[],
  newArr: T[],
  keyFn?: (item: T) => string
): { added: T[]; removed: T[]; unchanged: T[] } {
  if (keyFn) {
    const oldKeys = new Set(oldArr.map(keyFn));
    const newKeys = new Set(newArr.map(keyFn));

    return {
      added: newArr.filter((item) => !oldKeys.has(keyFn(item))),
      removed: oldArr.filter((item) => !newKeys.has(keyFn(item))),
      unchanged: newArr.filter((item) => oldKeys.has(keyFn(item))),
    };
  }

  const oldSet = new Set(oldArr.map((item) => JSON.stringify(item)));
  const newSet = new Set(newArr.map((item) => JSON.stringify(item)));

  return {
    added: newArr.filter((item) => !oldSet.has(JSON.stringify(item))),
    removed: oldArr.filter((item) => !newSet.has(JSON.stringify(item))),
    unchanged: newArr.filter((item) => oldSet.has(JSON.stringify(item))),
  };
}

export function generateChangelog(
  oldObj: Record<string, unknown>,
  newObj: Record<string, unknown>,
  description?: string
): ChangelogEntry {
  const changes = objectDiff(oldObj, newObj);

  const parts: string[] = [];
  const added = changes.filter((c) => c.type === 'added').length;
  const removed = changes.filter((c) => c.type === 'removed').length;
  const changed = changes.filter((c) => c.type === 'changed').length;

  if (added > 0) parts.push(`${added} added`);
  if (removed > 0) parts.push(`${removed} removed`);
  if (changed > 0) parts.push(`${changed} changed`);

  const summary = description
    ? `${description}: ${parts.join(', ')}`
    : parts.join(', ') || 'No changes';

  return {
    timestamp: new Date().toISOString(),
    changes,
    summary,
  };
}

export function hasDiff(
  oldObj: Record<string, unknown>,
  newObj: Record<string, unknown>
): boolean {
  return objectDiff(oldObj, newObj).length > 0;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);

    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => deepEqual(aObj[key], bObj[key]));
  }

  return false;
}
