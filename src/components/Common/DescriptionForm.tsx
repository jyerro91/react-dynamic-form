import React, { useState } from 'react'
import {
Button,
Grid,
TextField,
} from '@material-ui/core';
import { useStyles } from '../../styles';
import { Controller } from 'react-hook-form';
import TextfieldController from './TextfieldController';
import TextareaController from './TextareaController';

export default function DescriptionForm ({ control, errors }) {
  const classes = useStyles();
  

  return (
    <>
      <Grid container item sm={12} spacing={2}>
        <Grid item sm={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="shortDescription"
            label="Short description in English"
          />
        </Grid>
        <Grid item sm={12}>
          <TextareaController
            control={control}
            errors={errors}
            name="description"
            label="Describe your issue in English"
          />
        </Grid>
      </Grid>
    </>
  )
}