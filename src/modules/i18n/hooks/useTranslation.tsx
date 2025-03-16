import { useCallback, useMemo } from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';

import { Locale } from 'modules/i18n';
import i18n from 'modules/i18n/i18n';

export type Translation<
  T extends Record<string, string | Record<string, string>>,
> = Record<Locale, T>;

export type UseTranslationResult<
  T extends Record<string, string | Record<string, string>>,
> = {
  t: (key: string, variables?: unknown, withHTML?: boolean) => string;
  keys: T;
  locale: Locale;
};

export function useTranslation<
  T extends Record<string, string | Record<string, string>>,
>(data: Translation<T>): UseTranslationResult<T> {
  const { t: i18nT } = useI18nextTranslation();

  useMemo(() => {
    const locale = Locale.en;
    if (!i18n.hasResourceBundle(locale, 'translation')) {
      i18n.addResourceBundle(locale, 'translation', data[locale], true, true);
    }
  }, [data]);

  const keys = useMemo(() => data[Locale.en], [data]);

  const t = useCallback(
    (key: string, variables?: unknown, withHTML?: boolean): string => {
      const safeVariables =
        typeof variables === 'object' && variables !== null
          ? (variables as Record<string, unknown>)
          : {};

      const translated = i18nT(key, {
        ...safeVariables,
        interpolation: { escapeValue: false },
      });

      if (withHTML) {
        return (
          // eslint-disable-next-line react/no-danger
          <span dangerouslySetInnerHTML={{ __html: translated }} />
        ) as unknown as string;
      }

      return translated as unknown as string;
    },
    [i18nT],
  );

  return {
    t,
    keys,
    locale: Locale.en,
  };
}
