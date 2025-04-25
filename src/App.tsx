import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import IncidentForm from './components/IncidentForm';
import { Incident, IncidentType } from './schemas/incidentSchema';
import DateRangePickerExample from './components/DateRangePickerExample';
import { DateRange } from 'materialui-daterange-picker';

// Create a simple theme
const theme = createMuiTheme();

// Interface for submitted data
interface SubmittedData {
  data: Incident;
  type: IncidentType;
}

function App() {
  // State for tracking submitted data
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

  // Handle form submission
  const handleSubmit = (data: Incident, type: IncidentType) => {
    try {
      console.log('Form submitted:', { data, type });
      setSubmittedData({ data, type });
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  // Handle date range changes
  const handleDateRangeChange = (range: DateRange) => {
    console.log('Date range changed:', range);
    setSelectedDateRange(range);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Simple AppBar */}
      <AppBar position="static" style={{ marginBottom: '20px' }}>
        <Toolbar>
          <Typography variant="h6">
            Dynamic Incident Form
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* Main content */}
      <Container>
        {/* Incident Form Section */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Incident Form
          </Typography>
          <Grid container spacing={3}>
            {/* Form */}
            <Grid item xs={12} md={6}>
              <IncidentForm onSubmit={handleSubmit} />
            </Grid>
            
            {/* Submitted data display */}
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Submitted Data
                </Typography>
                
                {error && (
                  <Box 
                    bgcolor="error.light" 
                    color="error.contrastText" 
                    p={2} 
                    mb={2}
                    borderRadius="borderRadius"
                  >
                    <Typography>{error}</Typography>
                  </Box>
                )}
                
                {submittedData ? (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Type:</strong> {submittedData.type}
                    </Typography>
                    
                    <Box bgcolor="#f5f5f5" p={2} mt={2} style={{ overflowX: 'auto' }}>
                      <pre style={{ margin: 0 }}>
                        {JSON.stringify(submittedData.data, null, 2)}
                      </pre>
                    </Box>
                  </>
                ) : (
                  <Typography color="textSecondary">
                    No data submitted yet. Fill out the form and click submit.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Date Range Picker Example Section */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Date Range Picker Example
          </Typography>
          <Paper style={{ padding: '16px', marginBottom: '20px' }}>
            <DateRangePickerExample 
              initialDateRange={selectedDateRange || undefined}
              onDateRangeChange={handleDateRangeChange}
            />
          </Paper>
          
          {selectedDateRange && (
            <Paper style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Selected Date Range (Console)
              </Typography>
              <Box bgcolor="#f5f5f5" p={2} style={{ overflowX: 'auto' }}>
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(selectedDateRange, null, 2)}
                </pre>
              </Box>
            </Paper>
          )}
        </Box>
        
        {/* Simple footer */}
        <Box mt={4} mb={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Dynamic Form and Date Range Picker Example
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
