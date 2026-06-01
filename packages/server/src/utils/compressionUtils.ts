/**
 * Compresses a JSON-serializable value by removing whitespace and applying
 * key shortening for repeated structures.
 */
export function compressJson(data: unknown): string {
  if (data === null || data === undefined) return '';

  const json = JSON.stringify(data);

  // For arrays of objects with identical keys, use a columnar format
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null) {
    const keys = Object.keys(data[0] as Record<string, unknown>);
    const allSameKeys = data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        Object.keys(item).length === keys.length &&
        keys.every((k) => k in (item as Record<string, unknown>))
    );

    if (allSameKeys) {
      const keyMap: Record<string, string> = {};
      keys.forEach((key, index) => {
        keyMap[key] = `_${index}`;
      });

      const compressed = {
        __compressed: true,
        __keys: keyMap,
        __data: data.map((item) => {
          const obj = item as Record<string, unknown>;
          const row: Record<string, unknown> = {};
          for (const key of keys) {
            row[keyMap[key]] = obj[key];
          }
          return row;
        }),
      };

      return JSON.stringify(compressed);
    }
  }

  return json;
}

/**
 * Decompresses a previously compressed JSON string back to its original form.
 */
export function decompressJson<T = unknown>(compressed: string): T {
  if (!compressed) return null as T;

  const parsed = JSON.parse(compressed);

  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    parsed.__compressed === true &&
    parsed.__keys &&
    Array.isArray(parsed.__data)
  ) {
    const reverseKeyMap: Record<string, string> = {};
    for (const [original, short] of Object.entries(parsed.__keys as Record<string, string>)) {
      reverseKeyMap[short] = original;
    }

    return parsed.__data.map((row: Record<string, unknown>) => {
      const restored: Record<string, unknown> = {};
      for (const [shortKey, value] of Object.entries(row)) {
        const originalKey = reverseKeyMap[shortKey] || shortKey;
        restored[originalKey] = value;
      }
      return restored;
    }) as T;
  }

  return parsed as T;
}

/**
 * Estimates the byte size of a JSON-serializable value.
 */
export function estimateSize(data: unknown): {
  bytes: number;
  kilobytes: number;
  megabytes: number;
  formatted: string;
} {
  const json = JSON.stringify(data) || '';
  const bytes = new TextEncoder().encode(json).length;
  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;

  let formatted: string;
  if (megabytes >= 1) {
    formatted = `${megabytes.toFixed(2)} MB`;
  } else if (kilobytes >= 1) {
    formatted = `${kilobytes.toFixed(2)} KB`;
  } else {
    formatted = `${bytes} B`;
  }

  return { bytes, kilobytes, megabytes, formatted };
}

/**
 * Calculates the compression ratio between original and compressed forms.
 */
export function compressionRatio(data: unknown): {
  originalSize: number;
  compressedSize: number;
  ratio: number;
  savings: string;
} {
  const original = JSON.stringify(data) || '';
  const compressed = compressJson(data);

  const originalSize = new TextEncoder().encode(original).length;
  const compressedSize = new TextEncoder().encode(compressed).length;
  const ratio = originalSize > 0 ? compressedSize / originalSize : 1;
  const savingsPercent = ((1 - ratio) * 100).toFixed(1);

  return {
    originalSize,
    compressedSize,
    ratio: parseFloat(ratio.toFixed(4)),
    savings: `${savingsPercent}%`,
  };
}
