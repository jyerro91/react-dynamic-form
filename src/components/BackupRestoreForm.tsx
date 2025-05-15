import React, { useState } from 'react'
import {
Grid,
MenuItem,
FormControl,
InputLabel,
FormHelperText,
Select,
} from '@material-ui/core';
import { useStyles } from '../styles';
import { Controller } from 'react-hook-form';
import DescriptionForm from './Common/DescriptionForm';
import PriorityForm from './Common/PriorityForm';

export default function BackupRestoreForm ({ control, errors }) {
  return (
    <>
      <DescriptionForm control={control} errors={errors} />
      <PriorityForm control={control} errors={errors} />
    </>
  )
}