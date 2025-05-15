import React from 'react'
import {
TextField,
} from '@material-ui/core';
import { useStyles } from '../../styles';
import { Controller } from 'react-hook-form';
import { Incident } from '../../utils/schema';

export default function DateTimeController ({control, errors, name, label, type, required = true, ...props}) {
  const classes = useStyles();

  const errorMessage = errors[name as keyof Incident]?.message as string;

  return (
    <Controller
      key={name}
      name={name as any}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <TextField
          className={classes.input} 
          fullWidth
          id={`field-${name}`}
          label={label}
          variant="outlined"
          margin="normal"
          type={type}
          onChange={onChange}
          value={value || ''}
          inputRef={ref}
          required={required}
          error={!!errorMessage}
          helperText={errorMessage}
          InputLabelProps={{
            shrink: true,
          }}
          {...props}
        />
      )}
    />
  )
}