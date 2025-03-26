import { ReactElement } from 'react';
import { Button, Typography } from '@mui/material';

import { globalTranslation, useTranslation } from 'modules/i18n';

import { useStyles } from './useStyles';

interface ISuccessDialogContentProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  onClose: () => void;
  image: string;
}

export function SuccessDialogContent({
  title,
  buttonLabel,
  description,
  onClose,
  image,
}: ISuccessDialogContentProps): ReactElement {
  const { classes } = useStyles();
  const { t, keys } = useTranslation(globalTranslation);

  return (
    <div className={classes.root}>
      <Typography
        mb={1}
        textAlign="center"
        textTransform="uppercase"
        variant="h2"
      >
        {title}
      </Typography>

      {description && (
        <Typography textAlign="center" variant="body1">
          {description}
        </Typography>
      )}

      <div className={classes.content}>
        <img alt="" className={classes.image} src={image} />
      </div>

      <Button
        fullWidth
        color="primary"
        size="large"
        sx={{ textTransform: 'uppercase' }}
        variant="contained"
        onClick={onClose}
      >
        {buttonLabel || t(keys.common.ok)}
      </Button>
    </div>
  );
}
