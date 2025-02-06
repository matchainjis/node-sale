/* eslint-disable no-template-curly-in-string */
import { Locale } from './locales';

export const globalTranslation = {
  [Locale.en]: {
    common: {
      space: ' ',
      colon: ':',
      connect: 'Connect',
      disconnect: 'Disconnect',
      connectWallet: 'Connect Wallet',
    },
    unit: {
      $: '${value}',
      tokenValue: '{value, number} {token}',
      percent: '{value}%',
    },
    requestError: {},
  },
};
