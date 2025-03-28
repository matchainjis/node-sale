import { useMemo } from 'react';

import { getIsMobile } from '../utils/getIsMobile';

/**
 * Returns `true` if the current device is a mobile device.
 */
export const useIsMobile = (): boolean => {
  return useMemo(() => getIsMobile(), []);
};
