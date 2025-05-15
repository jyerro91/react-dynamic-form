import React, { useState } from 'react'
import {
Grid,
MenuItem,
FormControl,
InputLabel,
FormHelperText,
Select,
Typography,
} from '@material-ui/core';
import { useStyles } from '../../styles';
import { useWatch, Controller } from 'react-hook-form';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { 
  IMPACT_LEVELS,
  URGENCY_LEVELS 
} from '../../utils/constants';

import { 
  calculatePriority,
} from '../../utils/helpers';


export default function PriorityForm ({ control, errors }) {
  const classes = useStyles();

  const impactField = useWatch({control, name: 'impact'});
  const urgencyField = useWatch({control, name: 'urgency'});

  const priorityDescription = calculatePriority(impactField, urgencyField);

  return (
    <Grid container item xs={12} sm={12} spacing={2}>
      <Grid item md={6} xs={12} sm={12}>
        <Controller
          key='impact'
          name='impact'
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <FormControl
              className={classes.input}
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!errors['impact']?.message}
              required
            >
              <InputLabel id={`impact-label`}>Impact</InputLabel>
              <Select
                labelId={`impact-label`}
                id={`field-impact`}
                value={value || ''}
                onChange={onChange}
                label='Impact'
                inputRef={ref}
              >
                {IMPACT_LEVELS?.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              {errors['impact']?.message as string && <FormHelperText>{errors['impact']?.message as string}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item md={6} xs={12} sm={12}>
        <Controller
          key='urgency'
          name='urgency'
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <FormControl
              className={classes.input}
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!errors['urgency']?.message}
              required
            >
              <InputLabel id={`urgency-label`}>Urgency</InputLabel>
              <Select
                labelId={`urgency-label`}
                id={`field-urgency`}
                value={value || ''}
                onChange={onChange}
                label='Urgency'
                inputRef={ref}
              >
                {URGENCY_LEVELS?.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              {errors['urgency']?.message as string && <FormHelperText>{errors['urgency']?.message as string}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
      
      
      { priorityDescription && (
        <Typography variant="subtitle1" style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}gutterBottom>
          Calculated incident priority: { priorityDescription + ' - P' + priorityDescription.charAt(0) }  <HelpOutlineIcon style={{marginLeft: '7px'}}/>
        </Typography>
      )}
    </Grid>
  )
}