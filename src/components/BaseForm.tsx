import React, { useState } from 'react'
import {
Button,
Box,
Grid,
Radio,
RadioGroup,
FormControlLabel,
FormControl,
Typography,
InputLabel,
Select,
FormLabel,
MenuItem,
Paper
} from '@material-ui/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  SubmittedData,
  FormType,  
  Incident,
  getDefaultValuesForType,
  getSchemaForType
} from '../utils/schema';
import { 
  preparePayload,
  getIncidentIssue,
} from '../utils/helpers';
import { 
  ISSUE_TYPES, 
  ISSUE_SUB_TYPES, 
  CATEGORIES,
  URGENCY_LEVELS,
  SNAPI_API_URL,
  STORAGE_ISSUE_SCOPES,
} from '../utils/constants';
import { useStyles } from '../styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BackupRestoreForm from './BackupRestoreForm';
import CitrixForm from './CitrixForm';
import CloudAtlasForm from './CloudAtlasForm';
import FreeFormatRequestForm from './FreeFormatRequestForm';
import DatabaseForm from './DatabaseForm';
import SecurityAccessForm from './SecurityAccessForm';
import OtherForm from './OtherForm';
import { useForm, Controller } from 'react-hook-form';
import FailedDeploymentForm from './FailedDeploymentForm';
import NetworkForm from './NetworkForm';
import IchpForm from './IchpForm';
import OperatingSystemForm from './OperatingSystemForm';
import StorageForm from './StorageForm';
import SelectController from './Common/SelectController';

interface IncidentFormProps {
  onSubmit?: (data: Incident) => void;
}

export default function BaseForm () {
  const classes = useStyles();

  // State for selected incident type
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [category, setCategory] = useState('ipc');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    issue: '1-incident',
    category: '',
    subIssue: '4-database', // Temporary for testing
  });

  const handleFormChange = (event) => {
    const name = event.target.name;
    
    if (name === 'issue') {
      setForm({
        'issue': event.target.value,
        'category': '',
        'subIssue': '',
      });
    } else {
      setForm({
        ...form,
        [name]: event.target.value,
      });
    }

    reset(getDefaultValuesForType(form.issue, form.subIssue));
  };

  // Get schema and fields for the current type
  const schema = getSchemaForType(form.issue, form.subIssue);

  // Setup form with react-hook-form and Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<Incident>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValuesForType(form.issue, form.subIssue),
  });
  

  // Handle form submission
  const onFormSubmit = async (data: Incident) => {
    setIsSubmitting(true);

    // Get Incident Issue
    const issue = getIncidentIssue(form);
    const incidentPayload = preparePayload(data, issue);

    console.log('Incidents: ' + incidentPayload);
    

    try {
      console.log('Form submitted:', { incidentPayload, form });
      setSubmittedData({ incidentPayload, form });
      setError(null);

      const response = await fetch(SNAPI_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa('NPA_Backstage' + ':' + '?zg.gm*jE-Yv7w5X='),
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(incidentPayload),
        });
        if (response.ok) {
          // Handle success
          console.log('Data sent successfully!');
        } else {
          // Handle error
          console.error('Failed to send data.');
        }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
    
    // console.log('Form submitted:', { type: incidentType, data });
    
    // if (onSubmit) {
    //   onSubmit(data, incidentType);
    // }
    
    // // Reset form
    reset(getDefaultValuesForType(form.issue, form.subIssue));
  };
  
  const onFormError = (errors, e) => console.log(errors, e);

  // Render sub issue form
  function renderForm(form, props) {
    switch(form.subIssue) {
      case '1-backup-restore':
        return <BackupRestoreForm {...props} />;
      case '2-citrix':
        return <CitrixForm {...props} />;
      case '3-cloud-atlas':
        return <CloudAtlasForm {...props} />;
      case '4-database':
        return <DatabaseForm {...props} />;
      case '5-failed-deployment':
        return <FailedDeploymentForm {...props} />;
      case '6-ichp':
        return <IchpForm {...props} />;
      case '7-network-gso':
        return <NetworkForm {...props} />;
      case '8-operating-system':
        return <OperatingSystemForm {...props} />;
      case '9-other':
        return <OtherForm {...props} />;
      case '10-security-access':
        return <SecurityAccessForm {...props} />;
      case '11-storage':
        return <StorageForm {...props} />;
      default:
        return ;
    }
  }
  
  const isIncident = form.issue === '1-incident';
    
  return (
    <>
      <Paper style={{ padding: '16px', marginBottom: '2rem' }}>
        <Typography variant="h6" gutterBottom>
          Submitted Data
        </Typography>

        {submittedData ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Issue:</strong> {submittedData?.form.issue}
              <br />
              <strong>Sub Issue:</strong> {submittedData?.form.subIssue}
            </Typography>
            
            <Box bgcolor="#f5f5f5" p={2} mt={2} style={{ overflowX: 'auto' }}>
              <pre style={{ margin: 0 }}>
                {JSON.stringify(submittedData.incident, null, 2)}
              </pre>
            </Box>
          </>
        ) : (
          <Typography color="textSecondary">
            No data submitted yet. Fill out the form and click submit.
          </Typography>
        )}
      </Paper>
      <form 
        className={classes.category} 
        onSubmit={handleSubmit(onFormSubmit, onFormError)}
        autoComplete="off">
        
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FormControl className={classes.category} component="fieldset">
              <FormLabel className={classes.formLabel} component="legend" >Choose issue type <HelpOutlineIcon /></FormLabel>
              <RadioGroup 
                className={classes.radio} 
                aria-label="issue" 
                name="issue" 
                value={form.issue} 
                onChange={handleFormChange}
              >
                {ISSUE_TYPES.map((option) => (
                  <FormControlLabel
                    key={option.label}  
                    value={option.value}
                    control={<Radio key={option.value}/>} 
                    label={option.label} 
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          
          {isIncident && (
            <Grid item sm={12}>
              <FormControl className={classes.category} component="fieldset">
                <FormLabel className={classes.formLabel} component="legend" ><strong>Choose category?</strong></FormLabel>
                <RadioGroup 
                  className={classes.radio} 
                  aria-label='category' 
                  name='category' 
                  value={category} 
                  // onChange={onChange}
                >
                  {CATEGORIES.map((option) => (
                    <FormControlLabel 
                      key={option.label} 
                      value={option.value}
                      control={<Radio key={option.value}/>} 
                      label={option.label} 
                      // Disable rest of the radio button
                      disabled={option.value !== 'ipc'}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          )}

          {isIncident ? (
            <>
              <Grid container item xs={12} direction='column'>
                <Grid item xs={12} sm={4}>
                  <SelectController
                    control={control}
                    errors={errors}
                    name="issueScope"
                    label="Choose issue scope"
                    options={STORAGE_ISSUE_SCOPES}
                  >
                    <MenuItem key="None" value=""></MenuItem>
                    {ISSUE_SUB_TYPES.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </SelectController>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <FormControl variant="outlined" className={classes.input} required>
                  <InputLabel htmlFor="outlined-age-native-simple">What is your issue related to?</InputLabel>
                  <Select
                    labelId={`sub-issue-label`}
                    id={`field-sub-issue`}
                    value={form.subIssue}
                    onChange={handleFormChange}
                    label="What is your issue related to?"
                    
                    // withLabel={true}
                    inputProps={{
                      name: 'subIssue',
                      id: 'outlined-subCategory-native-simple',
                    }}
                  >
                    
                    <MenuItem key="None" value=""></MenuItem>
                    {ISSUE_SUB_TYPES.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              


              {renderForm(form, { control, errors, setValue })}
            </>
          ) : (<FreeFormatRequestForm control={control} errors={errors} />)}
          
          <Grid item xs={12}>
            <Button className={ classes.button } variant='contained' color='primary' type='submit'>Submit</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}