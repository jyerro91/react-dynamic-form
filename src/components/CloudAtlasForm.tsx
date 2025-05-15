import React, { useState } from 'react'
import {
Grid,
InputAdornment,
} from '@material-ui/core';
import { useStyles, HtmlTooltip } from '../styles';
import DescriptionForm from './Common/DescriptionForm';
import PriorityForm from './Common/PriorityForm';
import TextfieldController from './Common/TextfieldController';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';



export default function CloudAtlasForm ({ control, errors }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <p>Why wait for help when you could solve your issue now? Visit the
        <a href="https://theforge.ing.net/product/44983/documentation/latest/faq" rel="noreferrer noopener" target="_blank"> Cloud Atlas FAQ </a> for potential solutions.</p>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="actionSetId"
            label="Action Set ID"
            InputProps={{
              endAdornment: <InputAdornment position="start">
                <HtmlTooltip title="Identifier of an Action started in Cloud Atlas, found in the Action Log." placement="right">
                  <InfoIcon />
                </HtmlTooltip>
              </InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      
      <DescriptionForm control={control} errors={errors} />

      <PriorityForm control={control} errors={errors} />
    </>
  )
}