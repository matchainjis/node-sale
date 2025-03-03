import { useEffect, useState } from 'react';

export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  },
) => {
  const [targetRef, setTargetRef] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!targetRef || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          callback();
          setIsLoading(false);
        }, 500);
      }
    }, options);

    observer.observe(targetRef);
    return () => observer.disconnect();
  }, [callback, options, targetRef, isLoading]);

  return setTargetRef;
};
