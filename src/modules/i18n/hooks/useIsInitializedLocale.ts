import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';

import { Locale } from '../consts';
import { globalTranslation } from '../globalTranslation';

export function useIsInitializedLocale(): boolean {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialized(false);

    void intl
      .init({
        currentLocale: Locale.en,
        locales: globalTranslation,
        fallbackLocale: Locale.en,
      })
      .then(() => setIsInitialized(true));
  }, []);

  return isInitialized;
}
