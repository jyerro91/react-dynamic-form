import React, { useState } from 'react'
import {
Grid,
InputAdornment,
} from '@material-ui/core';
import { useStyles, HtmlTooltip } from '../styles';
import PriorityForm from './Common/PriorityForm';
import DescriptionForm from './Common/DescriptionForm';
import TextfieldController from './Common/TextfieldController';
import InfoIcon from '@material-ui/icons/Info';
import SelectController from './Common/SelectController';
import { 
  ENVIRONMENTS,
  ICHP_CLUSTER_NAMES,
  ICHP_ISSUE_SCOPES,
  NETWORK_SEVERITIES,
 } from '../utils/constants'
import RadioController from './Common/RadioController';
import { useWatch } from 'react-hook-form';
import { IchpIssueScopeType } from '../utils/schema';
import NetworkFirewallForm from './IchpForm/NetworkFirewallForm';

export default function IchpForm ({ control, errors, setValue }) {
  const issueScopeField = useWatch({control, name: 'issueScope'});

  console.log(errors);
  

  // Render sub issue form
  function renderForm(issue: IchpIssueScopeType, props) {
    switch(issue) {
      case 'Network and Firewall':
        return <NetworkFirewallForm {...props} />;
      case 'Namespace quota':
        return (
          <Grid item xs={12}>
            <RadioController 
              control={control} 
              errors={errors} 
              name="activeAutoscaler" 
              label="Is autoscaler active?" 
              data={[
                {label: 'Yes', value: 'Yes'}, 
                {label: 'No', value: 'No'}, 
              ]}
            />
          </Grid>
        );
      case 'Deployment and Pipeline':
        return (
          <Grid item xs={12}>
            <div>Why wait for help when you could solve your issue now?
              Visit the <a href="https://theforge.ing.net/product/42426/documentation/7.240730.4/index.html" target="_blank" rel="noreferrer noopener">Azure DevOps</a> 
              / <a href="https://orangesharing.com/pages/viewpage.action?spaceKey=ICHP&title=FAQ" target="_blank" rel="noreferrer noopener">The Kingsroad</a> 
              explanation or the general <a href="https://orangesharing.com/pages/viewpage.action?spaceKey=ICHP&title=FAQ" target="_blank" rel="noreferrer noopener">ICHP FAQ on Confluence</a> 
               or <a href="https://theforge.ing.net/product/44893/documentation/latest/troubleshooting/index.html" target="_blank" rel="noreferrer noopener"> The Forge</a> for potential solutions. 
            </div>
          </Grid>
        )
      case 'Monitoring and Logging':
        return (
          <Grid item xs={12}>
            <div>Why wait for help when you could solve your issue now?
              Visit the <a href="https://theforge.ing.net/product/44893/documentation/latest/explanation/firewall.html" target="_blank" rel="noreferrer noopener">ICHP Mattermost channel</a> 
              or the general <a href="https://orangesharing.com/pages/viewpage.action?spaceKey=ICHP&title=FAQ" target="_blank" rel="noreferrer noopener">ICHP FAQ on Confluence</a> 
              or <a href="https://theforge.ing.net/product/44893/documentation/latest/troubleshooting/index.html" target="_blank" rel="noreferrer noopener"> The Forge</a> for potential solutions.
            </div>
          </Grid>
        )
      default:
        return (
          <Grid item xs={12}>
            <div>Why wait for help when you could solve your issue now?
              Visit the <a href="https://orangesharing.com/pages/viewpage.action?spaceKey=ICHP&title=FAQ" target="_blank" rel="noreferrer noopener">ICHP FAQ on Confluence</a> 
              or <a href="https://theforge.ing.net/product/44893/documentation/latest/troubleshooting/index.html" target="_blank" rel="noreferrer noopener"> The Forge</a> for potential solutions.
            </div>
          </Grid>
        );
    }
  }

  return (
    <>
      <Grid container item xs={12} sm={12} spacing={2}>
        <Grid item md={6} xs={12} sm={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="namespaceName"
            label="Namespace name"
          />
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
          <SelectController
            control={control}
            errors={errors}
            name="clusterName"
            label="Cluster"
            options={ICHP_CLUSTER_NAMES}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <SelectController
            control={control}
            errors={errors}
            name="issueScope"
            label="Choose issue scope"
            options={ICHP_ISSUE_SCOPES}
            withLabel={true}
          />
        </Grid>
      </Grid>

      {issueScopeField !== '' && renderForm(issueScopeField, {control, errors})}

      {issueScopeField && (
        <>
          <DescriptionForm control={control} errors={errors} />

          <PriorityForm control={control} errors={errors} />
        </>
      )}
    </>
  )
}