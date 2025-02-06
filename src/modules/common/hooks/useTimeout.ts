import { useEffect, useMemo, useRef } from 'react';

// Browsers store the delay as a 32-bit signed integer internally (1 bit for sign).
// This causes an integer overflow when using delays larger than 2,147,483,647 ms (about 24.8 days).
const MAX_SAFE_DELAY: number = 2 ** 31 - 1;

export function useTimeout(callback: () => void, timeout: number | null) {
  const delay = useMemo(
    () => (!!timeout && timeout > MAX_SAFE_DELAY ? MAX_SAFE_DELAY : timeout),
    [timeout],
  );

  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const timerId = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(timerId);
  }, [delay]);
}
