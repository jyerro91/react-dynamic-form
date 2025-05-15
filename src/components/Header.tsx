import React, { useState } from 'react'
import {
Box,
Typography,
} from '@material-ui/core';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

export default function Header () {
  return (
    <Box style={{marginBottom: '3rem'}}>
      <Typography variant="h4" component="h4" gutterBottom>
        <ReportProblemIcon /> Incidents
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Manage your issues here. Create new ones, track and escalate
      </Typography>
      <hr />
    </Box>
  )
}