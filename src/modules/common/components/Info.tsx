import { ReactElement } from 'react';
import { alpha, Typography } from '@mui/material';

interface IInfoProps {
  className?: string;
  children: ReactElement | string;
}

export function Info({ children, className }: IInfoProps): ReactElement {
  return (
    <Typography
      className={className}
      component="div"
      sx={theme => ({
        backgroundColor: alpha(theme.palette.common.black, 0.05),
        borderRadius: '12px',
        padding: theme.spacing(3, 4),
        color: alpha(theme.palette.common.black, 0.6),
      })}
      variant="body2"
    >
      {children}
    </Typography>
  );
}
