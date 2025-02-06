/* eslint-disable no-template-curly-in-string */
import { Locale } from './locales';

export const globalTranslation = {
  [Locale.en]: {
    common: {
      space: ' ',
      colon: ':',
    },
    unit: {
      $: '${value}',
      tokenValue: '{value, number} {token}',
      percent: '{value}%',
    },
    requestError: {},
  },
};
