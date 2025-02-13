import { ReactElement, useMemo } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';

import { useGetMainTokenBalanceQuery } from 'modules/api/actions/getMainTokenBalance';
import { UNSTAKE_PERIOD_DAYS } from 'modules/api/const';
import { GuardButton } from 'modules/auth/components/GuardButton';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { Info } from 'modules/common/components/Info';
import { NumberTextField } from 'modules/common/components/NumberTextField';
import { Summary } from 'modules/common/components/Summary';
import { SummaryItem } from 'modules/common/components/SummaryItem';
import {
  BUY_MORE_LINK,
  DEFAULT_DECIMAL_PLACES,
  HUNDRED,
  ZERO,
} from 'modules/common/const';
import { useGetDelegateAllowanceQuery } from 'modules/delegate/actions/getDelegateAllowance';
import { useSetDelegateAllowanceAllowanceMutation } from 'modules/delegate/actions/setDelegateAllowance';
import {
  globalTranslation,
  mergeTranslations,
  useTranslation,
} from 'modules/i18n';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { PoolInfo } from 'modules/pool/components/PoolInfo/PoolInfo';
import { useGetPoolAPYs } from 'modules/pool/hooks/useGetPoolAPYs';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IDelegateContentProps {
  poolAddress: string;
  onSubmit: (params: { amount: BigNumber }) => void;
  isSubmitLoading: boolean;
}

interface IFormValues extends FieldValues {
  amount: string;
}

const mergedTranslation = mergeTranslations(globalTranslation, translation);

export function DelegateForm({
  poolAddress,
  onSubmit,
  isSubmitLoading,
}: IDelegateContentProps): ReactElement | null {
  const { t, keys } = useTranslation(mergedTranslation);
  const { classes } = useStyles();
  const { data: pool } = useGetPoolQuery({ address: poolAddress });

  const { isConnected } = useConnection();
  const { data: balance = ZERO } = useGetMainTokenBalanceQuery(undefined, {
    skip: !isConnected,
  });
  const { poolAPYs } = useGetPoolAPYs();
  const poolAPY = poolAPYs[poolAddress] ?? ZERO;

  const [setAllowance, { isLoading: isSetAllowanceLoading }] =
    useSetDelegateAllowanceAllowanceMutation();
  const { data: allowanceData } = useGetDelegateAllowanceQuery(
    { poolAddress },
    { skip: !isConnected },
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormValues>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
    },
  });

  const amountInputValue = watch('amount');

  const convertedAmount = useMemo(() => {
    const convertedValue = new BigNumber(amountInputValue);
    return convertedValue.isNaN() ? ZERO : convertedValue;
  }, [amountInputValue]);

  if (!pool) {
    return null;
  }

  const isSubmitDisabled = !!errors.amount?.message || !watch('amount');
  const { commission } = pool;

  const incomeAmount = convertedAmount.multipliedBy(poolAPY.div(HUNDRED));

  const isApproved =
    allowanceData &&
    poolAddress === allowanceData.spender &&
    convertedAmount.isLessThanOrEqualTo(allowanceData.allowance);

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(({ amount }) =>
        onSubmit({ amount: new BigNumber(amount) }),
      )}
    >
      <Typography
        mb={1}
        textAlign="center"
        textTransform="uppercase"
        variant="h2"
      >
        {t(keys.delegate)}
      </Typography>

      <PoolInfo address={poolAddress} image={pool.image} name={pool.name} />

      <NumberTextField
        balance={balance}
        className={classes.input}
        control={control as unknown as Control<FieldValues>}
        error={!!errors.amount?.message}
        getMoreLink={BUY_MORE_LINK}
        label={t(keys.inputTokenLabel, { token: t(keys.tokens.main) })}
        name="amount"
        variant="filled"
        onMaxClick={undefined}
      />

      <div className={classes.content}>
        {!incomeAmount.isZero() && (
          <div className={classes.infos}>
            <Info>
              {t(keys.income, {
                value: incomeAmount.decimalPlaces(DEFAULT_DECIMAL_PLACES),
                apy: poolAPY.decimalPlaces(2),
                fee: commission,
                token: t(keys.tokens.main),
              })}
            </Info>

            <Info>{t(keys.period, { value: UNSTAKE_PERIOD_DAYS })}</Info>
          </div>
        )}
      </div>

      <Summary className={classes.summary}>
        <SummaryItem
          label={t(keys.gasFeeLabel)}
          value={t(keys.unit.tokenValue, {
            value: ZERO.decimalPlaces(8),
            token: t(keys.tokens.chainToken),
          })}
        />

        <SummaryItem
          label={t(keys.totalAmountLabel)}
          value={t(keys.unit.tokenValue, {
            value: convertedAmount.decimalPlaces(8),
            token: t(keys.tokens.main),
          })}
        />
      </Summary>

      {isApproved ? (
        <GuardButton
          disabled={isSubmitDisabled}
          loading={isSubmitLoading}
          size="large"
          sx={theme => ({ marginTop: theme.spacing(6) })}
          type="submit"
        >
          {t(keys.delegate)}
        </GuardButton>
      ) : (
        <GuardButton
          disabled={isSubmitDisabled}
          loading={isSetAllowanceLoading}
          size="large"
          sx={theme => ({ marginTop: theme.spacing(6) })}
          onClick={() => setAllowance({ amount: convertedAmount, poolAddress })}
        >
          {t(keys.approve)}
        </GuardButton>
      )}
    </form>
  );
}
