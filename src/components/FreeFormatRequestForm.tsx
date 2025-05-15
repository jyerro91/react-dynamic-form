import React, { useState } from 'react'
import {
Button,
Grid,
TextField,
} from '@material-ui/core';
import { useStyles } from '../styles';
import { Controller } from 'react-hook-form';
import DescriptionForm from './Common/DescriptionForm';

export default function FreeFormatRequestForm ({ control, errors }) {
  const classes = useStyles();

  return (
    <>
      <DescriptionForm control={control} errors={errors} />

      {/* <Grid item xs={4}>
        <Button
          className={classes.fileUpload}
          variant="outlined"
          component="label"
        >
          Upload Attachment
          <input
            type="file"
            hidden
          />
        </Button>
      </Grid> */}
    </>
  )
}