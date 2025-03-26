import { queryFnNotificationWrapper } from '@ankr.com/utils/queryFnNotificationWrapper';
import { VariantType } from 'notistack';

import {
  closeNotification,
  getNotificationKey,
  showNotification,
} from 'modules/notifications';

import { getErrorMessage } from './getErrorMessage';

export const queryFnNotifyWrapper = queryFnNotificationWrapper({
  onNotification({ api, error, onError }) {
    const message =
      typeof onError === 'function' ? onError(error) : getErrorMessage(error);

    showNotification({
      key: api.endpoint,
      message,
      variant: (error as { cause?: VariantType })?.cause ? 'warning' : 'error',
    });
  },

  onAfterQuery: ({ api }) => {
    const key = getNotificationKey(api.endpoint);
    closeNotification(key);
  },
});
