import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { getUniqueId } from '@ankr.com/utils/getUniqueId';

import { Locale } from '../locales';
import { TFunction } from '../utils/t';

export function transformKey(
  id: string,
  key: string,
  value: string | Record<string, string>,
): string | Record<string, string> {
  if (typeof value === 'string') {
    return `${id}.${key}`;
  }

  return Object.keys(value).reduce(
    (obj, itemKey) => {
      return {
        ...obj,
        [itemKey]: `${id}.${key}.${itemKey}`,
      };
    },
    {} as Record<string, string>,
  );
}

export type Translation<
  T extends Record<string, string | Record<string, string>>,
> = Record<Locale, T>;

export type UseTranslationResult<
  T extends Record<string, string | Record<string, string>>,
> = {
  t: TFunction;
  keys: T;
  locale: Locale;
};

export const baseT: TFunction = (key, variables, withHTML) => {
  if (withHTML) {
    return intl.getHTML(key, variables) || key;
  }

  return intl.get(key, variables) || key;
};

export function useTranslation<
  T extends Record<string, string | Record<string, string>>,
>(data: Translation<T>): UseTranslationResult<T> {
  const [id] = useState(getUniqueId(data));
  const [isLoaded, setIsLoaded] = useState(false);

  const keys = useMemo(() => {
    return Object.entries(data[Locale.en]).reduce((obj, [key, value]) => {
      return {
        ...obj,
        [key]: transformKey(id, key, value),
      };
    }, {} as T);
  }, [data, id]);

  useLayoutEffect(() => {
    if (isLoaded && intl.get(id)) {
      return;
    }

    const intlData = Object.entries(data).reduce((data, [locale, text]) => {
      return {
        ...data,
        [locale]: {
          [id]: text,
        },
      };
    }, {});

    intl.load(intlData);
    setIsLoaded(true);
  }, [data, id, isLoaded]);

  const t: TFunction = useCallback(
    (key, variables, withHTML) => {
      if (!isLoaded) {
        return key;
      }

      return baseT(key, variables, withHTML);
    },
    [isLoaded],
  );

  return {
    t,
    keys,
    locale: Locale.en,
  };
}
