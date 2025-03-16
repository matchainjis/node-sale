import { useCallback, useEffect, useState } from 'react';

export interface ICopyClickData {
  isCopied: boolean;
  onCopyClick: (msg: string) => void;
}

const TIMEOUT = 1000;

export const useCopyClick = (): ICopyClickData => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyClick = useCallback((message: string) => {
    void navigator.clipboard.writeText(message);
    setIsCopied(true);
  }, []);

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return { isCopied, onCopyClick };
};
