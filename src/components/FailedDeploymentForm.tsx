import React, { useState } from 'react'
import {
Grid,
FormLabel,
InputAdornment,
} from '@material-ui/core';
import { useStyles, HtmlTooltip } from '../styles';
import PriorityForm from './Common/PriorityForm';
import TextfieldController from './Common/TextfieldController';
import TextareaController from './Common/TextareaController';
import InfoIcon from '@material-ui/icons/Info';
import SelectController from './Common/SelectController';
import { 
  DB_TYPES,
  TENANT,
  ENVIRONMENTS,
  DB_PROBLEM_CATEGORIES,
 } from '../utils/constants'
import { convertObjectToEnum } from '../utils/helpers';
import DescriptionForm from './Common/DescriptionForm';

export default function FailedDeploymentForm ({ control, errors }) {
  const classes = useStyles();

  return (
    <>
      <Grid item sm={12}>
        <p>Why wait for help when you could solve your issue now?
      If issue is related to BMaaS, visit Forge for <a href="https://theforge.ing.net/product/241073/documentation/latest/troubleshooting/index.html" target="_blank" rel="noreferrer noopener">BMaaS</a> documentation for potential solutions.</p>
      </Grid>

      <Grid container item xs={12} direction='column'>
        
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="businessGroup"
            label="Business group"
            InputProps={{
              endAdornment: <InputAdornment position="start">
                <HtmlTooltip 
                  title="The IT-product on which the deployment was performed" placement="right">
                  <InfoIcon />
                </HtmlTooltip>
              </InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <SelectController
            control={control}
            errors={errors}
            name="tenant"
            label="Tenant"
            options={TENANT}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="serverVmName"
            label="VM / Server name"
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <SelectController
            control={control}
            errors={errors}
            name="environment"
            label="Environment"
            options={convertObjectToEnum(ENVIRONMENTS)}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="workflowName"
            label="Name of the failed workflow"
            InputProps={{
              endAdornment: <InputAdornment position="start">
                <HtmlTooltip 
                  title="Check error logs for the workflow name" placement="right">
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