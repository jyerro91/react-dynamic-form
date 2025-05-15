import React, { useState } from 'react'
import {
Grid,
InputAdornment,
} from '@material-ui/core';
import TextfieldController from './Common/TextfieldController';
import DescriptionForm from './Common/DescriptionForm';
import PriorityForm from './Common/PriorityForm';

export default function OtherForm ({ control, errors }) {
  return (
    <>
      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="ciName"
            label="CI / Configuration item name"
            required={false}
          />
        </Grid>
      </Grid>

      <DescriptionForm control={control} errors={errors} />
      <PriorityForm control={control} errors={errors} />
    </>
  )
}