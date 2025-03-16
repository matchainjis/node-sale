import { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import CloseIcon from 'modules/common/icons/close-icon.svg?react';
import { useTranslation } from 'modules/i18n';
import { useNotification } from 'modules/notifications/hooks/useNotification';

import { translation } from './translation';
import { useStyles } from './useStyles';

const MAX_FILE_SIZE_MB = 1;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface IImageUploaderProps {
  className?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  defaultImageUrl?: string;
}

export function ImageUploader({
  className,
  value,
  defaultImageUrl,
  onChange,
}: IImageUploaderProps) {
  const { t, keys } = useTranslation(translation);
  const { classes, cx } = useStyles();
  const [preview, setPreview] = useState<string | null>(
    defaultImageUrl || null,
  );

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(value);
    } else {
      setPreview(defaultImageUrl || null);
    }
  }, [value, defaultImageUrl]);

  const { showNotification } = useNotification();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (value) {
        return;
      }

      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        showNotification({
          key: Date.now(),
          variant: 'error',
          message: t(keys.onlyTypes),
        });

        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        showNotification({
          key: Date.now(),
          variant: 'error',
          message: t(keys.maxSize, { size: MAX_FILE_SIZE_MB }),
        });
        return;
      }

      onChange(file);
    },
    [keys.maxSize, keys.onlyTypes, onChange, showNotification, t, value],
  );

  return (
    <div className={cx(classes.container, className)}>
      <div className={classes.logoWrapper}>
        <div className={classes.logo}>
          {preview && (
            <img alt="Logo" className={classes.logoImage} src={preview} />
          )}
        </div>
      </div>

      {value ? (
        <div
          className={cx(classes.button, classes.closeButton)}
          onClick={() => {
            setPreview(defaultImageUrl || null);
            onChange(null);
          }}
        >
          <CloseIcon />
        </div>
      ) : (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={classes.button}>
          <Typography fontWeight={600} variant="body1">
            {t(keys.replace)}
          </Typography>

          <input
            accept="image/*"
            className={classes.hiddenInput}
            type="file"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
