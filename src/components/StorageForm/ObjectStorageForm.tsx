import React, { useState } from 'react'
import {
Grid,
} from '@material-ui/core';
import TextfieldController from '../Common/TextfieldController';

export default function ObjectStorageForm ({ control, errors }) {
  return (
    <>
      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="bucket"
            label="Bucket"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="accessKey"
            label="Access key"
            required={false}
          />
        </Grid>
      </Grid>
    </>
  )
}