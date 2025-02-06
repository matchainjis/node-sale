import { getUniqueId } from '@ankr.com/utils/getUniqueId';

export const cacheTags = {
  balance: `balance-${getUniqueId()}`,
  account: `account-${getUniqueId()}`,
  chainData: `chainData-${getUniqueId()}`,
};
