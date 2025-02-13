export function memoizePromise<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  keyGenerator: (...args: TArgs) => string,
): (...args: TArgs) => Promise<TResult> {
  const cache = new Map<string, Promise<TResult>>();

  return (...args: TArgs): Promise<TResult> => {
    const key = keyGenerator(...args);

    if (cache.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return cache.get(key)!;
    }

    const promise = fn(...args);
    cache.set(key, promise);

    promise.catch(() => cache.delete(key));

    return promise;
  };
}
