import { ReactElement, useCallback, useMemo } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';

import { UNSTAKE_PERIOD_DAYS } from 'modules/api/const';
import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { GuardButton } from 'modules/auth/components/GuardButton';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { Info } from 'modules/common/components/Info';
import { NumberTextField } from 'modules/common/components/NumberTextField';
import { Summary } from 'modules/common/components/Summary';
import { SummaryItem } from 'modules/common/components/SummaryItem';
import { BUY_MORE_LINK, ZERO } from 'modules/common/const';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';
import { useGetAvailableSelfStakeAmountQuery } from 'modules/ownerPanel/actions/getSelfStakeAmount';
import { useGetIsOwnerPoolQuery } from 'modules/ownerPanel/actions/isPoolOwner';
import { useGetAccountPoolQuery } from 'modules/pool/actions/getAccountPool';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';
import { PoolInfoColumn } from 'modules/pool/components/PoolInfoColumn/PoolInfoColumn';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IWithdrawContentProps {
  poolAddress: string;
  onSubmit: (params: { amount: BigNumber }) => void;
  isSubmitLoading: boolean;
}

interface IFormValues extends FieldValues {
  amount: string;
}

export function WithdrawForm({
  poolAddress,
  onSubmit,
  isSubmitLoading,
}: IWithdrawContentProps): ReactElement | null {
  const { t, keys } = useGlobalTranslation(translation);
  const { classes } = useStyles();
  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const { data: poolMeta } = useGetPoolMetaQuery({ address: poolAddress });

  const { isConnected } = useConnection();
  const { data: accountPool } = useGetAccountPoolQuery(
    { address: poolAddress },
    {
      skip: !isConnected,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );
  const { data: isOwner = false } = useGetIsOwnerPoolQuery(
    { poolAddress },
    {
      skip: !isConnected,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );
  const { data: availableSelfStakeAmount = ZERO } =
    useGetAvailableSelfStakeAmountQuery(
      { poolAddress },
      {
        skip: !isConnected || !isOwner,
        selectFromResult: mapDataToUndefinedIfSkip,
      },
    );

  const balance = useMemo(() => {
    if (!isConnected) {
      return ZERO;
    }

    if (isOwner) {
      return availableSelfStakeAmount;
    }

    return accountPool?.stakedAmount || ZERO;
  }, [
    accountPool?.stakedAmount,
    availableSelfStakeAmount,
    isConnected,
    isOwner,
  ]);

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

  const onMaxClick = useCallback(
    () => setValue('amount', balance.decimalPlaces(8).toString()),
    [balance, setValue],
  );

  if (!pool) {
    return null;
  }

  const isSubmitDisabled = !!errors.amount?.message || !watch('amount');

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
        {t(keys.withdraw)}
      </Typography>

      <PoolInfoColumn
        address={poolAddress}
        image={poolMeta?.image}
        name={poolMeta?.name}
        type="withdraw"
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
          <Info>{t(keys.period, { value: UNSTAKE_PERIOD_DAYS })}</Info>
        </div>
      </div>

      <Summary className={classes.summary}>
        <SummaryItem
          label={t(keys.totalAmountLabel)}
          value={t(keys.unit.tokenValue, {
            value: convertedAmount.decimalPlaces(8),
            token: t(keys.tokens.main),
          })}
        />
      </Summary>

      <GuardButton
        disabled={isSubmitDisabled}
        loading={isSubmitLoading}
        size="large"
        sx={theme => ({ marginTop: theme.spacing(6) })}
        type="submit"
      >
        {t(keys.withdraw)}
      </GuardButton>
    </form>
  );
}
