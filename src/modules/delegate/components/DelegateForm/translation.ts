import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    delegate: 'Delegate',
    approve: 'Approve',
    inputTokenLabel: 'Amount {token}',
    income:
      "Your yearly income will be <b>~{value} {token}</b> based on <b>{apy}% APY</b> and staking pool's <b>{fee}% commission.</b>",
    period:
      'If you choose to undelegate, there is a {value}-{value, plural, =1 {day} other {days}} waiting period before the process completes.',
    gasFeeLabel: 'Gas fee',
    totalAmountLabel: 'Total amount',
  },
};
