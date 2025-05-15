import React, { useState } from 'react'
import {
Grid,
InputAdornment,
} from '@material-ui/core';
import { useStyles, HtmlTooltip } from '../styles';
import PriorityForm from './Common/PriorityForm';
import TextfieldController from './Common/TextfieldController';
import TextareaController from './Common/TextareaController';
import InfoIcon from '@material-ui/icons/Info';
import SelectController from './Common/SelectController';
import { 
  ENVIRONMENTS,
  NETWORK_SEVERITIES,
 } from '../utils/constants'
import { convertObjectToEnum } from '../utils/helpers';
import DateRangeController from './Common/DateRangeController';
import RadioController from './Common/RadioController';

export default function NetworkForm ({ control, errors, setValue }) {
  const classes = useStyles();

  return (
    <>
      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <SelectController
            control={control}
            errors={errors}
            name="severity"
            label="Severity"
            options={NETWORK_SEVERITIES}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="siteUrl"
            label="URL of the site"
            required={false}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="hostName"
            label="Host name"
            required={false}
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
            name="applicationName"
            label="Application name"
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} sm={12} spacing={2}>
        <Grid item sm={6} xs={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="sourceIpAddress"
            label="Source IP address"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="destinationIpAddress"
            label="Destination IP address"
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="destinationPort"
            label="Destination port"
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="accessRequestId"
            label="Access request UUID"
            InputProps={{
              endAdornment: <InputAdornment position="start">
                <HtmlTooltip 
                  title="Firewall rules related" placement="right">
                  <InfoIcon />
                </HtmlTooltip>
              </InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid item sm={4}>
        <DateRangeController control={control} errors={errors} setValue={setValue} />
      </Grid>

      <Grid item xs={12}>
        <RadioController 
          control={control} 
          errors={errors} 
          name="workedInPast" 
          label="Did it work in past?" 
          data={[
            {label: 'Yes', value: 'Yes'}, 
            {label: 'No', value: 'No'}, 
          ]}
        />
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