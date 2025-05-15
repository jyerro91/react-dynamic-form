import React from 'react'
import {
FormControl,
InputLabel,
Select,
MenuItem,
FormLabel,
FormHelperText,
} from '@material-ui/core';
import { useStyles } from '../../styles';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Incident } from '../../utils/schema';
import { capitalize } from '../../utils/helpers';

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

export default function SelectController ({control, errors, name, label, options, required = true, withLabel = false, multiple = false, ...props}) {
  const classes = useStyles();

  const errorMessage = errors[name as keyof Incident]?.message as string;

  const defaultValue = multiple ? [] : '';

  return (
    <Controller
      key={name}
      name={name as any}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <>
          {withLabel && <FormLabel className={classes.formLabel} component="legend" ><strong>{label}</strong></FormLabel>}
          <FormControl
            className={classes.input}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errorMessage}
            required={required}
            // required={required}
          >
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              id={`field-${name}`}
              value={value || defaultValue}
              onChange={onChange}
              label={label}
              inputRef={ref}
              multiple={multiple}
            >
              {options?.map((option) => {
                if (option.length > 0) {
                  return <MenuItem key={option} value={option}>
                  {capitalize(option)}
                </MenuItem> 
                }
              })}
            </Select>
            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
          </FormControl>
        </>
      )}
    />
  )
}