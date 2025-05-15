import React from 'react'
import {
FormControl,
FormLabel,
RadioGroup,
FormControlLabel,
Radio,
FormHelperText,
} from '@material-ui/core';
import { useStyles } from '../../styles';
import { Controller } from 'react-hook-form';
import { Incident } from '../../utils/schema';

export default function RadioController ({control, errors, name, label, data}) {
  const classes = useStyles();

  const errorMessage = errors[name as keyof Incident]?.message as string;

  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <FormControl fullWidth margin='normal' component="fieldset">
          <FormLabel className={classes.formLabel} component="legend" ><strong>{label}</strong></FormLabel>
          <RadioGroup 
            className={classes.radio} 
            aria-label={name} 
            name={name} 
            value={value} 
            onChange={onChange}
          >
            {data.map((option) => (
              <FormControlLabel 
                key={option.label} 
                value={option.value}
                control={<Radio key={option.value}/>} 
                label={option.label} 
              />
            ))}
          </RadioGroup>
          {errorMessage && <FormHelperText error={errorMessage.length > 0}>{errorMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}