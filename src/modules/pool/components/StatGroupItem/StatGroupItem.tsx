import { ReactElement } from 'react';
import { Skeleton, Typography, TypographyProps } from '@mui/material';
import BigNumber from 'bignumber.js';

import { globalTranslation, useTranslation } from 'modules/i18n';

import { useStyles } from './useStyles';

interface IStatGroupItemProps {
  label: string;
  amount?: BigNumber;
  className?: string;
  variant?: TypographyProps['variant'];
  buttonSlot?: ReactElement;
}

export function StatGroupItem({
  label,
  amount,
  className,
  variant = 'h2',
  buttonSlot,
}: IStatGroupItemProps): ReactElement {
  const { t, keys } = useTranslation(globalTranslation);
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Typography
        component="div"
        sx={{ opacity: 0.6, fontWeight: 600 }}
        variant="body1"
      >
        {label}
      </Typography>

      <Typography variant={variant}>
        {amount ? (
          t(keys.unit.tokenValue, {
            token: t(keys.tokens.main),
            value: amount.decimalPlaces(5).toFormat(),
          })
        ) : (
          <Skeleton width={50} />
        )}
      </Typography>

      {buttonSlot}
    </div>
  );
}
