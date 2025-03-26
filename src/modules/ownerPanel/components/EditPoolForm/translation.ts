import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Edit',
    save: 'Save',

    updateInfo: 'Staking pool information update require smart contract update',
    commissionInfo:
      'You can change the commission once every {value} {value, plural, =1 {day} other {days}}.',
    remainingInfo:
      'The next commission change will be available in {value} {value, plural, =1 {day} other {days}}.',
    symbolsCount: '{count} / {maxCount}',

    label: {
      poolName: 'Pool name',
      description: 'Description',
      logo: 'Logo',
      commission: 'Commission',
    },
  },
};
