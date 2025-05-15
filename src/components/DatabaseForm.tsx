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

export default function DatabaseForm ({ control, errors }) {
  const classes = useStyles();

  return (
    <>
      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <SelectController
            control={control}
            errors={errors}
            name="databaseType"
            label="Type of database"
            options={DB_TYPES}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="ciName"
            label="CI / Configuration item name"
            InputProps={{
              endAdornment: <InputAdornment position="start">
                <HtmlTooltip 
                  title="Database name as known in the CMDB" placement="right">
                  <InfoIcon />
                </HtmlTooltip>
              </InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="clusterName"
            label="Cluster name"
            required={false}
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
            name="contactPerson"
            label="Contact person"
            InputProps={{
              endAdornment: <InputAdornment position="start">
                <HtmlTooltip 
                  title="Contact Corporate Key" placement="right">
                  <InfoIcon />
                </HtmlTooltip>
              </InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="countryCaller"
            label="Country of caller"
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={6}>
          <FormLabel className={classes.formLabel} component="legend" ><strong>Choose category:</strong></FormLabel>
          <SelectController
            control={control}
            errors={errors}
            name="problemCategory"
            label="Category"
            options={DB_PROBLEM_CATEGORIES}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={8}>
          <TextareaController
            control={control}
            errors={errors}
            name="description"
            label="Describe your issue in English"
          />
        </Grid>
      </Grid>

      <PriorityForm control={control} errors={errors} />
    </>
  )
}