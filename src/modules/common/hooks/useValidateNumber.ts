import { ReactText, useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { globalTranslation, useTranslation } from 'modules/i18n';

export type UseValidateNumberResult = (value?: ReactText) => string | undefined;

interface Props {
  balance?: BigNumber;
  max?: BigNumber;
  min?: BigNumber;
  unit?: string;
}

export const useValidateNumber = ({
  balance = ZERO,
  max = balance,
  min = ZERO,
  unit = '',
}: Props): UseValidateNumberResult => {
  const { t, keys } = useTranslation(globalTranslation);

  return useCallback(
    (value?: ReactText) => {
      if (!value) {
        return t(keys.validation.required);
      }

      const currentValue = new BigNumber(value);
      if (currentValue.isNaN()) {
        return t(keys.validation.numberOnly);
      }

      if (currentValue.isLessThan(min)) {
        return t(keys.validation.min, { value: min.toFormat(), unit });
      }

      const isGreater = currentValue.isGreaterThan(max);
      const isZeroBalance = balance?.isEqualTo(0); // This validation must not know anything about business logic. TODO: remove
      if (isGreater || isZeroBalance) {
        return t(keys.validation.max);
      }
    },
    [
      balance,
      keys.validation.max,
      keys.validation.min,
      keys.validation.numberOnly,
      keys.validation.required,
      max,
      min,
      t,
      unit,
    ],
  );
};
