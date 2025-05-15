import React, { useState } from 'react'
import {
Button,
Grid,
TextField,
} from '@material-ui/core';
import SelectController from '../Common/SelectController';
import { convertObjectToEnum } from '../../utils/helpers';
import { useStyles } from '../../styles';
import { Controller } from 'react-hook-form';
import TextfieldController from '../Common/TextfieldController';
import TextareaController from '../Common/TextareaController';
import { useWatch } from 'react-hook-form';
import { OS_LINUX_ISSUE_SCOPES } from '../../utils/constants';
import PriorityForm from '../Common/PriorityForm';
import { LinuxIssueScopeType } from '../../utils/schema';
import DescriptionForm from '../Common/DescriptionForm';

export default function LinuxForm ({ control, errors }) {
  const issueScopeField = useWatch({control, name: 'issueScope'});

  console.log(issueScopeField);
  console.log(errors);
  

  // Render issue forms
  function renderForm(issue: LinuxIssueScopeType, props) {
    switch(issue) {
      case 'patching':
        return (
          <>
            <Grid item xs={12}>
              <p>Why wait for help when you could solve your issue now? Visit the
              <a href="https://theforge.ing.net/product/241217/documentation/latest/pages/troubleshooting/02_Patching.html" rel="noreferrer noopener"
                target="_blank">RHEL Patch FAQ</a> for potential solutions.</p>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item md={4} sm={12} xs={12}>
                <TextfieldController
                  control={control}
                  errors={errors}
                  name="failedAction"
                  label="Patch action that failed"
                  required={false}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <TextfieldController
                  control={control}
                  errors={errors}
                  name="hostVmName"
                  label="Host name(s) / VM name(s)"
                  required={false}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <TextfieldController
                  control={control}
                  errors={errors}
                  name="ansibleJobId"
                  label="Ansible job ID"
                  required={false}
                />
              </Grid>
            </Grid>
          </>
        );
        break;
      case 'host-unreachable':
         return (
          <>
            <Grid item xs={12}>
              <p>Why wait for help when you could solve your issue now? Visit the
              <a href="https://theforge.ing.net/product/241217/documentation/latest/pages/troubleshooting/01_Connectivity.html"
                rel="noreferrer noopener" target="_blank">RHEL how to deal with unreachable/unresponsive hosts FAQ</a>
              for potential solutions.</p>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12}>
                <TextfieldController
                  control={control}
                  errors={errors}
                  name="fqdnVmName"
                  label="Host name(s) (FQDN) / VM name(s)"
                />
              </Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12}>
                <TextareaController
                  control={control}
                  errors={errors}
                  name="errorMessageSsh"
                  label="Error message returned from an SSH attempt"
                />
              </Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12}>
                <TextareaController
                  control={control}
                  errors={errors}
                  name="firewallReport"
                  label="FW report showing matching firewall rule"
                />
              </Grid>
            </Grid>
          </>
        );
        break;
      case 'resource-capacity':
        return (
          <>
            <Grid item xs={12}>
              <p>Why wait for help when you could solve your issue now? Visit the
              <a href="https://theforge.ing.net/product/241217/documentation/latest/index" rel="noreferrer noopener"
                target="_blank">RHEL generic troubleshooting</a> for potential solutions.</p>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12}>
                <TextfieldController
                  control={control}
                  errors={errors}
                  name="fqdnHostName"
                  label="Host name(s) (FQDN) / VM name(s)"
                />
              </Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12}>
                <TextareaController
                  control={control}
                  errors={errors}
                  name="description"
                  label="Describe issue in English"
                />
              </Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12}>
                <TextareaController
                  control={control}
                  errors={errors}
                  name="errorDescription"
                  label="Error message"
                />
              </Grid>
            </Grid>
          </>
        );
        break;
      case 'stack-wide':
        return (
          <Grid container item sm={12} spacing={2}>
            <Grid item sm={12}>
              <TextareaController
                control={control}
                errors={errors}
                name="description"
                label="Describe issue in English"
              />
            </Grid>
          </Grid>
        );
      default:
        break;
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
            options={convertObjectToEnum(OS_LINUX_ISSUE_SCOPES)}
            withLabel={true}
          />
        </Grid>
      </Grid>

      {issueScopeField !== '' && renderForm(issueScopeField, {control, errors})}

      { issueScopeField !== undefined && <PriorityForm control={control} errors={errors} /> }
      {/* <Grid container item sm={12} spacing={2}>
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
      </Grid> */}
    </>
  )
}