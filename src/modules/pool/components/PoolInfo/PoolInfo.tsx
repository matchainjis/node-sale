import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

import { cropString } from 'modules/common/utils/cropString';
import { globalTranslation, useTranslation } from 'modules/i18n';

import { useStyles } from './useStyles';

interface IPoolInfoProps {
  name?: string;
  image?: string;
  address: string;
  type?: 'delegate' | 'withdraw';
}

export function PoolInfo({
  name,
  image,
  address,
  type = 'delegate',
}: IPoolInfoProps): ReactElement {
  const { t, keys } = useTranslation(globalTranslation);
  const { classes } = useStyles();

  return (
    <Typography className={classes.root} variant="body1">
      <span>
        {type === 'delegate' ? t(keys.common.to) : t(keys.common.from)}
      </span>

      {image && <img alt="" className={classes.icon} src={image} />}

      {name && (
        <Box color={theme => theme.palette.text.primary} component="span">
          {name}
        </Box>
      )}

      <span>{cropString(address)}</span>
    </Typography>
  );
}
