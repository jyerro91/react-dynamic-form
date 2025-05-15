import React, { useState } from 'react'
import {
Grid,
} from '@material-ui/core';
import TextfieldController from '../Common/TextfieldController';
import SelectController from '../Common/SelectController';
import { ICHP_NETWORK_DOMAIN_INTERACTION } from '../../utils/constants';

export default function NetworkFirewallForm ({ control, errors }) {
  return (
    <>
      <Grid item xs={12}>
        <div className="additional-help-text">Why wait for help when you could solve your issue now?
          Visit the <a href="https://theforge.ing.net/product/44893/documentation/latest/explanation/firewall.html" target="_blank" rel="noreferrer noopener">Firewall explanation</a> 
          or the general <a href="https://orangesharing.com/pages/viewpage.action?spaceKey=ICHP&title=FAQ" target="_blank" rel="noreferrer noopener">ICHP FAQ on Confluence</a> 
          or <a href="https://theforge.ing.net/product/44893/documentation/latest/troubleshooting/index.html" target="_blank" rel="noreferrer noopener"> The Forge</a> for potential solutions.
        </div>
      </Grid>
      <Grid container item sm={12} spacing={2}>
        <Grid item md={4} sm={12} xs={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="source"
            label="Source"
            required={false}
          />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="destination"
            label="Destination"
            required={false}
          />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <TextfieldController
            control={control}
            errors={errors}
            name="port"
            label="Port"
            required={false}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} direction='column'>
        <Grid item xs={12} sm={4}>
          <SelectController
            control={control}
            errors={errors}
            name="networkDomainInteraction"
            label="Network domain interaction"
            options={ICHP_NETWORK_DOMAIN_INTERACTION}
            multiple={true}
          />
        </Grid>
      </Grid>
    </>
  )
}