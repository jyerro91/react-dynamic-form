import React, { useState } from 'react'
import DescriptionForm from './Common/DescriptionForm';
import PriorityForm from './Common/PriorityForm';

export default function SecurityAccessForm ({ control, errors }) {
  return (
    <>
      <DescriptionForm control={control} errors={errors} />
      <PriorityForm control={control} errors={errors} />
    </>
  )
}