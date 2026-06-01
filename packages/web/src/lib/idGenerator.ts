/**
 * ID generation utility functions.
 */

/** Generate a UUID v4. */
export function uuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Generate a short nano-style ID of a given length. */
export function nanoid(size: number = 21): string {
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  let id = '';
  for (let i = 0; i < size; i++) {
    id += alphabet[bytes[i] & 63];
  }
  return id;
}

/** Generate a compact 8-character ID. */
export function shortId(): string {
  return nanoid(8);
}

/** Generate an ID with a given prefix (e.g., "usr_abc123"). */
export function prefixedId(prefix: string, size: number = 12): string {
  return `${prefix}_${nanoid(size)}`;
}

/** Generate a timestamp-based ID with random suffix for uniqueness. */
export function timestampId(): string {
  const timestamp = Date.now().toString(36);
  const random = nanoid(6);
  return `${timestamp}-${random}`;
}
