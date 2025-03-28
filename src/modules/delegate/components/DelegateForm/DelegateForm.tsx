import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';

import { useGetMainTokenBalanceQuery } from 'modules/api/actions/getMainTokenBalance';
import { UNSTAKE_PERIOD_DAYS } from 'modules/api/const';
import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
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
import { useLazyGetDelegateAllowanceQuery } from 'modules/delegate/actions/getDelegateAllowance';
import { useGetDelegateFeeQuery } from 'modules/delegate/actions/getDelegateFee';
import { useSetDelegateAllowanceMutation } from 'modules/delegate/actions/setDelegateAllowance';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';
import { PoolInfoColumn } from 'modules/pool/components/PoolInfoColumn/PoolInfoColumn';
import { useGetPoolAPYs } from 'modules/pool/hooks/useGetPoolAPYs';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IDelegateContentProps {
  title?: string;
  poolAddress: string;
  onSubmit: (params: { amount: BigNumber }) => void;
  isSubmitLoading: boolean;
}

interface IFormValues extends FieldValues {
  amount: string;
}

export function DelegateForm({
  title,
  poolAddress,
  onSubmit,
  isSubmitLoading,
}: IDelegateContentProps): ReactElement | null {
  const { t, keys } = useGlobalTranslation(translation);
  const { classes } = useStyles();
  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const { data: poolMeta } = useGetPoolMetaQuery({ address: poolAddress });

  const { isConnected } = useConnection();
  const { data: balance = ZERO } = useGetMainTokenBalanceQuery(undefined, {
    skip: !isConnected,
    selectFromResult: mapDataToUndefinedIfSkip,
  });
  const { poolAPYs } = useGetPoolAPYs();
  const poolAPY = poolAPYs[poolAddress] ?? ZERO;

  const [setAllowance, { isLoading: isSetAllowanceLoading }] =
    useSetDelegateAllowanceMutation();

  const [
    getAllowance,
    { data: allowanceData, isLoading: isGetAllowanceLoading },
  ] = useLazyGetDelegateAllowanceQuery();

  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
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

  useEffect(() => {
    void getAllowance({ poolAddress });
  }, [getAllowance, poolAddress]);

  const handleApprove = useCallback(() => {
    setIsAllowanceLoading(true);
    void setAllowance({ amount: convertedAmount, poolAddress })
      .then(() => getAllowance({ poolAddress }))
      .finally(() => setIsAllowanceLoading(false));
  }, [convertedAmount, getAllowance, poolAddress, setAllowance]);

  const isApproved =
    allowanceData &&
    poolAddress === allowanceData.spender &&
    convertedAmount.isLessThanOrEqualTo(allowanceData.allowance);

  const { data: feeAmount = ZERO } = useGetDelegateFeeQuery(
    {
      amount: convertedAmount,
      poolAddress,
    },
    {
      skip:
        !isConnected ||
        convertedAmount.isZero() ||
        convertedAmount.isGreaterThan(allowanceData?.allowance || ZERO),
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );

  const totalAmount = useMemo(
    () => convertedAmount.plus(feeAmount),
    [convertedAmount, feeAmount],
  );
  const onMaxClick = useCallback(
    () =>
      setValue('amount', balance.minus(feeAmount).decimalPlaces(8).toString()),
    [balance, feeAmount, setValue],
  );

  if (!pool) {
    return null;
  }

  const isApproveLoading =
    isGetAllowanceLoading || isAllowanceLoading || isSetAllowanceLoading;
  const isSubmitDisabled = !!errors.amount?.message || !watch('amount');
  const { commission } = pool;

  const incomeAmount = convertedAmount.multipliedBy(poolAPY.div(HUNDRED));

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
        {title || t(keys.delegate)}
      </Typography>

      <PoolInfoColumn
        address={poolAddress}
        image={poolMeta?.image}
        name={poolMeta?.name}
      />

      <NumberTextField
        balance={balance}
        className={classes.input}
        control={control as unknown as Control<FieldValues>}
        error={!!errors.amount?.message}
        getMoreLink={BUY_MORE_LINK}
        label={t(keys.inputTokenLabel, { token: t(keys.tokens.main) })}
        name="amount"
        placeholder="0"
        variant="filled"
        onMaxClick={onMaxClick}
      />

      <div className={classes.content}>
        <div className={classes.infos}>
          {!incomeAmount.isZero() && (
            <Info>
              {t(
                keys.income,
                {
                  value: incomeAmount.decimalPlaces(DEFAULT_DECIMAL_PLACES),
                  apy: poolAPY.decimalPlaces(2),
                  fee: commission,
                  token: t(keys.tokens.main),
                },
                true,
              )}
            </Info>
          )}

          <Info>{t(keys.period, { value: UNSTAKE_PERIOD_DAYS })}</Info>
        </div>
      </div>

      <Summary className={classes.summary}>
        {!feeAmount.decimalPlaces(8).isZero() && (
          <SummaryItem
            label={t(keys.gasFeeLabel)}
            value={t(keys.unit.tokenValue, {
              value: feeAmount.decimalPlaces(8),
              token: t(keys.tokens.chainToken),
            })}
          />
        )}

        <SummaryItem
          label={t(keys.totalAmountLabel)}
          value={t(keys.unit.tokenValue, {
            value: totalAmount.decimalPlaces(8),
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
          loading={isApproveLoading}
          size="large"
          sx={theme => ({ marginTop: theme.spacing(6) })}
          onClick={() => handleApprove()}
        >
          {t(keys.approve)}
        </GuardButton>
      )}
    </form>
  );
}
