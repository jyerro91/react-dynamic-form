import React from 'react'
import { useWatch } from 'react-hook-form';
import { HtmlTooltip } from '../styles';
import { StorageIssueScopeType } from '../utils/schema';
import { Grid, InputAdornment } from '@material-ui/core';
import { STORAGE_ISSUE_SCOPES } from '../utils/constants'
import InfoIcon from '@material-ui/icons/Info';
import PriorityForm from './Common/PriorityForm';
import DescriptionForm from './Common/DescriptionForm';
import SelectController from './Common/SelectController';
import ObjectStorageForm from './StorageForm/ObjectStorageForm';
import TextfieldController from './Common/TextfieldController';

export default function StorageForm ({ control, errors, setValue }) {
  const issueScopeField = useWatch({control, name: 'issueScope'});

  console.log(errors);
  

  // Render sub issue form
  function renderForm(issue: StorageIssueScopeType, props) {
    switch(issue) {
      case 'File sharing (NFS / SMB)':
        return (
          <Grid container item xs={12} direction='column'>
            <Grid item xs={12} sm={4}>
              <TextfieldController
                control={control}
                errors={errors}
                name="fileSharePath"
                label="File Share:Path"
                InputProps={{
                  endAdornment: <InputAdornment position="start">
                    <HtmlTooltip 
                      title="Address of your share from the IPC Portal" placement="right">
                      <InfoIcon />
                    </HtmlTooltip>
                  </InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        );
      case 'ECS object storage (s3)':
        return (
          <>
            <Grid container item xs={12} direction='column'>
              <Grid item xs={12} sm={4}>
                <TextfieldController
                  control={control}
                  errors={errors}
                  name="namespaceName"
                  label="Namespace name"
                />
              </Grid>
            </Grid>

            <ObjectStorageForm {...props} />
          </>
        );
      case 'Minio object storage':
        return (
          <>
            <ObjectStorageForm {...props} />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <SelectController
            control={control}
            errors={errors}
            name="issueScope"
            label="Choose issue scope"
            options={STORAGE_ISSUE_SCOPES}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} sm={12} spacing={2}>
        <Grid item md={4} xs={12} sm={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="occurrenceTimeStart"
            label="Issue start date"
          />
        </Grid>
        <Grid item md={4} xs={12} sm={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="occurrenceTimeEnd"
            label="Issue end date"
          />
        </Grid>
        <Grid item md={4} xs={12} sm={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="timezone"
            label="Time zone"
          />
        </Grid>
      </Grid>

      {issueScopeField !== '' && renderForm(issueScopeField, {control, errors})}

      <DescriptionForm control={control} errors={errors} />

      <PriorityForm control={control} errors={errors} />
    </>
  )
}