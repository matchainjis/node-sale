import { useMemo } from 'react';

import { globalTranslation } from 'modules/i18n/globalTranslation';
import {
  Translation,
  useTranslation,
  UseTranslationResult,
} from 'modules/i18n/hooks/useTranslation';
import { mergeTranslations } from 'modules/i18n/utils/mergeTranslations';

type GlobalTranslation = (typeof globalTranslation)['en-US'];

export function useGlobalTranslation<
  T extends Record<string, string | Record<string, string>>,
>(data?: Translation<T>): UseTranslationResult<GlobalTranslation & T> {
  const mergedTranslation = useMemo(
    () => mergeTranslations(globalTranslation, (data || {}) as Translation<T>),
    [data],
  );

  return useTranslation(mergedTranslation);
}
