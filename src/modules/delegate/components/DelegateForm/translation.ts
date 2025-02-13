import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    delegate: 'Delegate',
    approve: 'Approve',
    inputTokenLabel: 'Amount {token}',
    income:
      "Your yearly income will be ~{value} {token} based on {apy}% APY and staking pool's {fee}% commission.",
    period:
      'If you choose to undelegate, there is a {value}-{value, plural, =1 {day} other {days}} waiting period before the process completes.',
    gasFeeLabel: 'Gas fee',
    totalAmountLabel: 'Total amount',
  },
};
