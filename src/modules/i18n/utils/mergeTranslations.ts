import { Translation } from 'modules/i18n/hooks/useTranslation';

import { Locale } from '../locales';

export function mergeTranslations<
  T extends Record<string, string | Record<string, string>>,
  B extends Record<string, string | Record<string, string>>,
>(
  baseTranslation: Translation<T>,
  translation: Translation<B>,
): Translation<T & B> {
  const newTranslation = { ...baseTranslation } as Translation<T & B>;

  Object.values(Locale).forEach(locale => {
    newTranslation[locale] = {
      ...newTranslation[locale],
      ...translation[locale],
    };
  });

  return newTranslation;
}
