/* eslint-disable no-template-curly-in-string */
import { Locale } from './locales';

export const globalTranslation = {
  [Locale.en]: {
    common: {
      space: ' ',
      colon: ':',
      to: 'to',
      of: 'of',
      from: 'from',
      ok: 'ok',
      connect: 'Connect',
      disconnect: 'Disconnect',
      connectWallet: 'Connect Wallet',
      balance: 'Balance',
      getMore: 'Get more',
      max: 'Max',
    },
    unit: {
      $: '${value}',
      tokenValue: '{value} {token}',
      percent: '{value}%',
    },
    tokens: {
      main: 'MAT',
      chainToken: 'MAT',
    },
    requestError: {},
    validation: {
      required: 'This field is required',
      numberOnly: 'Must be a number',
      min: 'Minimum amount is {value} {unit}',
      max: 'Your balance is not sufficient',
    },
  },
};
