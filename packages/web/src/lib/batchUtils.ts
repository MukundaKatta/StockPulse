/**
 * Batch processing utility functions for handling large datasets.
 */

/** Process items in batches, calling the handler for each batch. */
export async function batchProcess<T, R>(
  items: T[],
  batchSize: number,
  handler: (batch: T[], batchIndex: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const result = await handler(batch, Math.floor(i / batchSize));
    results.push(result);
  }
  return results;
}

/** Process an async iterable in chunks. */
export async function* chunkAsync<T>(
  iterable: AsyncIterable<T>,
  size: number
): AsyncGenerator<T[]> {
  let chunk: T[] = [];
  for await (const item of iterable) {
    chunk.push(item);
    if (chunk.length >= size) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length > 0) {
    yield chunk;
  }
}

/** Run async tasks with a concurrency limit. */
export async function parallelLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await fn(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => worker()
  );

  await Promise.all(workers);
  return results;
}

/** Debatch (flatten) results from batch processing back into a single array. */
export function debatchResults<T>(batches: T[][]): T[] {
  return batches.reduce<T[]>((acc, batch) => {
    acc.push(...batch);
    return acc;
  }, []);
}
