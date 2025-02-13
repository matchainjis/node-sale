import { ReactElement } from 'react';
import {
  Box,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import BigNumber from 'bignumber.js';

import { globalTranslation, useTranslation } from 'modules/i18n';

import { useStyles } from './useStyles';

export interface ITextFieldProps extends MuiTextFieldProps<'filled'> {
  balance?: BigNumber;
  getMoreLink?: string;
  onMaxClick?: () => void;
}

export function TextField({
  label,
  balance,
  getMoreLink,
  onMaxClick,
  ...props
}: ITextFieldProps): ReactElement {
  const { t, keys } = useTranslation(globalTranslation);
  const { classes } = useStyles();

  const isShowRightLabel = !!(balance || getMoreLink || onMaxClick);

  return (
    <MuiTextField
      label={
        <div className={classes.label}>
          <span>{label}</span>

          {isShowRightLabel && (
            <div className={classes.rightLabel}>
              <div className={classes.rightTopLabel}>
                {balance && (
                  <Box fontWeight={500}>
                    {t(keys.common.balance)}

                    {`: ${t(keys.unit.tokenValue, { value: balance.toFormat(), token: t(keys.tokens.main) })}`}
                  </Box>
                )}

                {getMoreLink && (
                  <a
                    className={classes.link}
                    href={getMoreLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t(keys.common.getMore)}
                  </a>
                )}
              </div>

              {onMaxClick && (
                <Box
                  className={classes.link}
                  textTransform="uppercase"
                  onClick={onMaxClick}
                >
                  {t(keys.common.max)}
                </Box>
              )}
            </div>
          )}
        </div>
      }
      {...props}
    />
  );
}
