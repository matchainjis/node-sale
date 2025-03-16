import { ReactElement, useEffect, useMemo } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { InputAdornment, TextField, Typography } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { GuardButton } from 'modules/auth/components/GuardButton';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { ImageUploader } from 'modules/common/components/ImageUploader';
import { Info } from 'modules/common/components/Info';
import { numberRegExp } from 'modules/common/components/NumberTextField';
import { ZERO } from 'modules/common/const';
import { useValidateNumber } from 'modules/common/hooks/useValidateNumber';
import {
  globalTranslation,
  mergeTranslations,
  useTranslation,
} from 'modules/i18n';
import { useGetCommissionInfoQuery } from 'modules/ownerPanel/actions/getCommissionInfo';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IFormValues extends FieldValues {
  name: string;
  description: string;
  image: File | null;
  comission: string;
}

interface IEditPoolContentProps {
  poolAddress: string;
  onSubmit: (params: IFormValues) => void;
  isSubmitLoading: boolean;
}

const mergedTranslation = mergeTranslations(globalTranslation, translation);

const MAX_SYMBOLS = 250;

export function EditPoolForm({
  poolAddress,
  onSubmit,
  isSubmitLoading,
}: IEditPoolContentProps): ReactElement | null {
  const { t, keys } = useTranslation(mergedTranslation);
  const { classes } = useStyles();
  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const { data: poolMeta } = useGetPoolMetaQuery({ address: poolAddress });

  const { isConnected } = useConnection();

  const { data: commissionData } = useGetCommissionInfoQuery(
    { poolAddress },
    {
      skip: !isConnected,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );

  const commissionText = useMemo(() => {
    if (!commissionData) {
      return '';
    }
    const { totalDelayDays, remainingDays } = commissionData;
    if (remainingDays > 0) {
      return t(keys.remainingInfo, { value: remainingDays });
    }

    return t(keys.commissionInfo, { value: totalDelayDays });
  }, [commissionData, keys.commissionInfo, keys.remainingInfo, t]);

  const validateAmount = useValidateNumber({
    balance: commissionData?.maxCommission,
    max: commissionData?.maxCommission,
    min: ZERO,
    unit: '%',
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<IFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      image: null,
      comission: '',
    },
  });

  const name = watch('name');
  const description = watch('description');
  const image = watch('image');
  const comission = watch('comission');

  useEffect(() => {
    if (!poolMeta) {
      return;
    }

    setValue('name', poolMeta.name);
    setValue('description', poolMeta.description);
  }, [poolMeta, setValue]);

  useEffect(() => {
    if (!pool) {
      return;
    }

    setValue('comission', pool.commission.toString());
  }, [pool, setValue]);

  const isMetaEqual =
    poolMeta?.name === name && poolMeta?.description === description && !image;
  const isCommisionEqual = pool?.commission.toString() === comission;

  const onFormSubmit = handleSubmit(
    ({ name, description, image, comission }) => {
      if (isMetaEqual && isCommisionEqual) {
        return;
      }

      onSubmit({
        name,
        description,
        image,
        comission,
      });
    },
  );

  if (!pool || !isConnected) {
    return null;
  }

  const isSubmitDisabled =
    (isCommisionEqual && isMetaEqual) || Object.keys(errors).length > 0;
  const isCommissionDisabled =
    !!commissionData?.remainingDays && commissionData.remainingDays > 0;

  return (
    <form className={classes.root} onSubmit={onFormSubmit}>
      <Typography
        mb={1}
        textAlign="center"
        textTransform="uppercase"
        variant="h2"
      >
        {t(keys.title)}
      </Typography>

      <Info className={classes.info}>{t(keys.updateInfo)}</Info>

      <div className={classes.control}>
        <Typography className={classes.label}>
          {t(keys.label.poolName)}
        </Typography>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField {...field} className={classes.field} />
          )}
        />
      </div>

      <div className={classes.divider} />

      <div className={classes.control}>
        <Typography className={classes.label}>
          {t(keys.label.description)}
        </Typography>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <div className={classes.wrapper}>
              <TextField
                {...field}
                multiline
                className={classes.field}
                maxRows={4}
                rows={4}
                onChange={event => {
                  const { value } = event.target;

                  if (value.length <= MAX_SYMBOLS) {
                    field.onChange(event);
                  }
                }}
              />

              <div className={classes.symbols}>
                {t(keys.symbolsCount, {
                  count: description.length,
                  maxCount: MAX_SYMBOLS,
                })}
              </div>
            </div>
          )}
          rules={{ maxLength: MAX_SYMBOLS }}
        />
      </div>

      <div className={classes.divider} />

      <div className={classes.control}>
        <Typography className={classes.label}>{t(keys.label.logo)}</Typography>

        <ImageUploader
          className={classes.field}
          defaultImageUrl={poolMeta?.image}
          value={image}
          onChange={value => setValue('image', value)}
        />
      </div>

      <div className={classes.divider} />

      <div className={classes.control}>
        <Typography className={classes.label}>
          {t(keys.label.commission)}
        </Typography>

        <Controller
          control={control}
          name="comission"
          render={({ field }) => (
            <TextField
              {...field}
              className={classes.field}
              disabled={isCommissionDisabled}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              onChange={event => {
                const { value } = event.target;

                if (numberRegExp.exec(value)) {
                  field.onChange(event);
                }
              }}
            />
          )}
          rules={{ validate: validateAmount }}
        />
      </div>

      {commissionText && <Info className={classes.info}>{commissionText}</Info>}

      <GuardButton
        disabled={isSubmitDisabled}
        loading={isSubmitLoading}
        size="large"
        sx={theme => ({ marginTop: theme.spacing(6) })}
        type="submit"
      >
        {t(keys.save)}
      </GuardButton>
    </form>
  );
}
