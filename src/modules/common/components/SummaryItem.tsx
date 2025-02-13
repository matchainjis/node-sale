import { ReactElement } from 'react';
import { alpha, Box, Typography } from '@mui/material';

interface ISummaryItemProps {
  label: string;
  value: string;
}

export function SummaryItem({ label, value }: ISummaryItemProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Typography
        color={theme => alpha(theme.palette.text.primary, 0.6)}
        variant="body1"
      >
        {label}:
      </Typography>

      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}
