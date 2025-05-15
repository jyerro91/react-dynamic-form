import React, { useState } from 'react'
import {
Grid,
FormLabel,
FormControlLabel,
RadioGroup,
Radio,
FormControl,
TextField,
InputLabel,
Select,
} from '@material-ui/core';
import { 
  IS_APPLICATION_OWNER,
  PORTAL_VERSION,
  IMPACTED_USERS,
} from '../utils/constants';
import { useStyles } from '../styles';
import DescriptionForm from './Common/DescriptionForm';
import PriorityForm from './Common/PriorityForm';
import TextfieldController from './Common/TextfieldController';
import TextareaController from './Common/TextareaController';
import DateTimeController from './Common/DateTimeController';
import { useWatch, Controller } from 'react-hook-form';
import RadioController from './Common/RadioController';
import { isApplicationOwner } from '../utils/helpers'

export default function CitrixForm ({ control, errors }) {
  const classes = useStyles();

  const applicationOwnerField = useWatch({control, name: 'applicationOwner'});

  console.log(errors);
  

  return (
    <>
      <Grid item xs={12}>
        Visit the <a href="https://confluence.ing.net/display/CTX/FAQ+and+How+To%27s" target="_blank" rel="noreferrer noopener">trouble shooting schema</a> for potential solutions.
      </Grid>
      <Grid item xs={12}>
        <RadioController 
          control={control} 
          errors={errors} 
          name="applicationOwner" 
          label="Are you the application owner?" 
          data={IS_APPLICATION_OWNER}
        />
      </Grid>

      <Grid item xs={12}>
        <RadioController 
          control={control} 
          errors={errors} 
          name="portalVersion" 
          label="Which portal was used to access the published application?" 
          data={PORTAL_VERSION}
        />
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={4}>
          <TextfieldController
            control={control}
            errors={errors}
            name="userCk"
            label="Corporate Key"
          />
        </Grid>
      </Grid>

      {isApplicationOwner(applicationOwnerField) && ( 
        <>
          <Grid container item xs={12} direction='column'>
            <Grid item xs={4}>
              <TextfieldController
                control={control}
                errors={errors}
                name="citrixServerName"
                label="Citrix server name"
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} direction='column'>
            <Grid item xs={4}>
              <TextfieldController
                control={control}
                errors={errors}
                name="deliveryGroupName"
                label="Delivery group name"
              />
            </Grid>
          </Grid>
        </> 
      )}

      <Grid item container sm={12} spacing={2}>
        <Grid item sm={4} xs={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="publishedApplicationName"
            label="Published application name"
            required={true}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="publishedApplicationFolderName"
            label="Published app folder name"
            required={true}
          />
        </Grid>
      </Grid>

      <Grid item container sm={12} spacing={2}>
        <Grid item sm={4} xs={12}>
          <DateTimeController
            control={control}
            errors={errors}
            type='date'
            name="occurrenceDateStart"
            label="Date of the occurence"
            required={true}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <DateTimeController
            control={control}
            errors={errors}
            type='time'
            name="occurrenceTimeStart"
            label="Time of the occurence"
            required={true}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <RadioController 
          control={control} 
          errors={errors} 
          name="impactedUsers" 
          label="How many users are impacted?" 
          data={IMPACTED_USERS}
        />
      </Grid>
      
      <DescriptionForm control={control} errors={errors} />

      {isApplicationOwner(applicationOwnerField) && ( 
        <Grid item xs={12}>
          <TextareaController 
            control={control}
            errors={errors}
            name="additionalDescription"
            label="Changes or modifications prior to the incident"
            required={false}
          />
        </Grid>
      )}
      <PriorityForm control={control} errors={errors} />
    </>
  )
}