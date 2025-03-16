import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import {} from '@mui/material';
import BigNumber from 'bignumber.js';

import { useStyles } from 'modules/common/components/NumberTextField/useStyles';
import {
  ITextFieldProps,
  TextField,
} from 'modules/common/components/TextField';
import { useValidateNumber } from 'modules/common/hooks/useValidateNumber';

interface INumberTextFieldProps<T extends FieldValues> extends ITextFieldProps {
  name: Path<T>;
  control: Control<T>;
  min?: BigNumber;
  unit?: string;
  integer?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const numberRegExp = /^(\d*\.{0,1}\d{0,18}$)/;

function NumberTextFieldComponent<T extends FieldValues>(
  {
    name,
    control,
    balance,
    onChange,
    min,
    unit,
    integer,
    ...props
  }: INumberTextFieldProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { classes } = useStyles();
  const validateAmount = useValidateNumber({
    balance,
    max: balance,
    min,
    unit,
  });
  const { field } = useController({
    name,
    control,
    rules: { validate: validateAmount },
  });

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;

    if (integer && value.includes('.')) {
      return;
    }

    if (numberRegExp.exec(value)) {
      if (onChange) {
        onChange(event);
      }

      field.onChange(event);
    }
  };

  return (
    <TextField
      ref={ref}
      autoComplete="off"
      balance={balance}
      value={field.value}
      onChange={handleChange}
      {...props}
      InputProps={{
        classes: {
          input: classes.input,
        },
      }}
    />
  );
}

export const NumberTextField = forwardRef(NumberTextFieldComponent);
