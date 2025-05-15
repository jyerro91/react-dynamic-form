import { useState, useCallback, useMemo } from 'react';

  // Handle form submission
const handleSubmit = useCallback(async (onSuccess, onError) => {
setIsSubmitting(true);

try {
  const isValid = validateForm();
  if (!isValid) {
    setIsSubmitting(false);
    return false;
  }

  const payload = preparePayload();
  
  // Here you would typically submit the payload to your API
  // For demonstration, we're just passing it to the onSuccess callback
  if (onSuccess) {
    await onSuccess(payload);
  }
  
  return true;
} catch (error) {
  if (onError) {
    onError(error);
  } else {
    console.error('Error submitting form:', error);
  }
  return false;
} finally {
  setIsSubmitting(false);
}
}, [validateForm, preparePayload]);