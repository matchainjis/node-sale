import {
  closeNotification,
  getNotificationKey,
  showNotification,
} from 'modules/notifications';

export function useNotification() {
  return {
    closeNotification,
    getNotificationKey,
    showNotification,
  };
}
