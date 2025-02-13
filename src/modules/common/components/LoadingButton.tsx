import { ReactElement } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

export interface ILoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({
  children,
  loading,
  disabled,
  ...props
}: ILoadingButtonProps): ReactElement {
  return (
    <Button {...props} disabled={disabled || loading}>
      {loading ? (
        <CircularProgress
          color="inherit"
          size={props.size === 'small' ? 16 : 24}
        />
      ) : (
        children
      )}
    </Button>
  );
}
