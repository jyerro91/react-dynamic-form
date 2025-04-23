import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Typography,
  Paper,
  Divider,
} from '@material-ui/core';

import {
  Incident,
  IncidentType,
  incidentTypeEnum,
  getSchemaForType,
  getDefaultValuesForType,
  getFieldsForType,
  Field,
} from '../schemas/incidentSchema';

interface IncidentFormProps {
  onSubmit?: (data: Incident, type: IncidentType) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  // State for selected incident type
  const [incidentType, setIncidentType] = useState<IncidentType>('general');
  
  // Get schema and fields for the current type
  const schema = getSchemaForType(incidentType);
  const fields = getFieldsForType(incidentType);
  
  // Setup form with react-hook-form and Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Incident>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValuesForType(incidentType),
  });
  
  // Handle incident type change
  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newType = event.target.value as IncidentType;
    setIncidentType(newType);
    
    // Reset form with new default values
    reset(getDefaultValuesForType(newType));
  };
  
  // Handle form submission
  const onFormSubmit = (data: Incident) => {
    console.log('Form submitted:', { type: incidentType, data });
    
    if (onSubmit) {
      onSubmit(data, incidentType);
    }
    
    // Reset form
    reset(getDefaultValuesForType(incidentType));
  };
  
  // Capitalize first letter helper
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Render a field based on its type
  const renderField = (field: Field) => {
    const { name, label, type, options, required } = field;
    const errorMessage = errors[name as keyof Incident]?.message as string;
    
    switch (type) {
      case 'text':
        return (
          <Controller
            key={name}
            name={name as any}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                fullWidth
                id={`field-${name}`}
                label={label}
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value || ''}
                inputRef={ref}
                required={required}
                error={!!errorMessage}
                helperText={errorMessage}
              />
            )}
          />
        );
        
      case 'textarea':
        return (
          <Controller
            key={name}
            name={name as any}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                fullWidth
                id={`field-${name}`}
                label={label}
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value || ''}
                inputRef={ref}
                required={required}
                error={!!errorMessage}
                helperText={errorMessage}
                multiline
                rows={4}
              />
            )}
          />
        );
        
      case 'date':
        return (
          <Controller
            key={name}
            name={name as any}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                fullWidth
                id={`field-${name}`}
                label={label}
                variant="outlined"
                margin="normal"
                type="date"
                onChange={onChange}
                value={value || ''}
                inputRef={ref}
                required={required}
                error={!!errorMessage}
                helperText={errorMessage}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        );
        
      case 'select':
        return (
          <Controller
            key={name}
            name={name as any}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errorMessage}
                required={required}
              >
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                  labelId={`${name}-label`}
                  id={`field-${name}`}
                  value={value || ''}
                  onChange={onChange}
                  label={label}
                  inputRef={ref}
                >
                  {options?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {capitalize(option)}
                    </MenuItem>
                  ))}
                </Select>
                {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
              </FormControl>
            )}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Paper style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Incident Report
      </Typography>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Incident Type Selector */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="incident-type-label">Incident Type</InputLabel>
          <Select
            labelId="incident-type-label"
            id="incident-type"
            value={incidentType}
            onChange={handleTypeChange}
            label="Incident Type"
          >
            {Object.values(incidentTypeEnum.enum).map((type) => (
              <MenuItem key={type} value={type}>
                {capitalize(type)} Incident
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Divider style={{ margin: '16px 0' }} />
        
        {/* Dynamic Form Fields */}
        {fields.map(field => renderField(field))}
        
        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default IncidentForm;

