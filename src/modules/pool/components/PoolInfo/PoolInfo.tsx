import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

import { cropString } from 'modules/common/utils/cropString';
import { globalTranslation, useTranslation } from 'modules/i18n';

import { useStyles } from './useStyles';

interface IPoolInfoProps {
  name: string;
  image: string;
  address: string;
}

export function PoolInfo({
  name,
  image,
  address,
}: IPoolInfoProps): ReactElement {
  const { t, keys } = useTranslation(globalTranslation);
  const { classes } = useStyles();

  return (
    <Typography className={classes.root} variant="body1">
      <span>{t(keys.common.to)}</span>

      {image && <img alt="" className={classes.icon} src={image} />}

      <Box color={theme => theme.palette.text.primary} component="span">
        {name}
      </Box>

      <span>{cropString(address)}</span>
    </Typography>
  );
}
