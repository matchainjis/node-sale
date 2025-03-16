import { ReactElement } from 'react';
import { Typography } from '@mui/material';

import { useCopyClick } from 'modules/common/hooks/useCopyClick';
import { cropString } from 'modules/common/utils/cropString';
import { useTranslation } from 'modules/i18n';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IAddressesProps {
  className?: string;
  poolAddress: string;
  nftAddress: string;
}

export function Addresses({
  className,
  poolAddress,
  nftAddress,
}: IAddressesProps): ReactElement {
  const { classes, cx } = useStyles();
  const { t, keys } = useTranslation(translation);

  const { onCopyClick } = useCopyClick();

  return (
    <div className={cx(classes.rows, className)}>
      <div className={classes.row}>
        <Typography sx={{ opacity: 0.6 }} variant="body1">
          {t(keys.poolAddress)}
        </Typography>

        <Typography
          className={classes.rowValue}
          component="div"
          variant="body1"
        >
          <span>{cropString(poolAddress, 8)}</span>

          <button
            className={classes.copyButton}
            type="button"
            onClick={() => onCopyClick(poolAddress)}
          >
            {t(keys.copy)}
          </button>
        </Typography>
      </div>

      {nftAddress && (
        <>
          <div className={classes.rowDivider} />

          <div className={classes.row}>
            <Typography component="div" sx={{ opacity: 0.6 }} variant="body1">
              {t(keys.nft)}
            </Typography>

            <Typography
              className={classes.rowValue}
              component="div"
              variant="body1"
            >
              <span>{cropString(nftAddress, 8)}</span>

              <button
                className={classes.copyButton}
                type="button"
                onClick={() => onCopyClick(nftAddress)}
              >
                {t(keys.copy)}
              </button>
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}
