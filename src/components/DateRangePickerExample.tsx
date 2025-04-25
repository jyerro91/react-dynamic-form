import React, { useState } from 'react';
import { DateRangePicker, DateRange } from 'materialui-daterange-picker';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography, Paper, Box } from '@material-ui/core';

// Define styles using Material-UI's makeStyles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      maxWidth: 600,
      margin: '0 auto',
    },
    header: {
      marginBottom: theme.spacing(2),
    },
    dateDisplay: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
    },
    pickerContainer: {
      position: 'relative',
    },
    button: {
      marginTop: theme.spacing(2),
    },
  })
);

// Define the interface for our component props
interface DateRangePickerExampleProps {
  initialDateRange?: DateRange;
  onDateRangeChange?: (range: DateRange) => void;
}

// Define a type for date formatting options
interface DateFormatOptions {
  year: 'numeric';
  month: 'long';
  day: 'numeric';
}

const DateRangePickerExample: React.FC<DateRangePickerExampleProps> = ({
  initialDateRange,
  onDateRangeChange,
}) => {
  // Component state
  const [open, setOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(initialDateRange || null);
  const classes = useStyles();

  // Function to format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return 'Not selected';
    
    const options: DateFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    return date.toLocaleDateString(undefined, options);
  };

  // Handler for when a date range is selected
  const handleDateRangeChange = (range: DateRange): void => {
    setDateRange(range);
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  // Toggle the date picker's visibility
  const toggleDatePicker = (): void => {
    setOpen(!open);
  };

  return (
    <Paper className={classes.container} elevation={3}>
      <Typography variant="h5" className={classes.header}>
        Date Range Picker Example
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={toggleDatePicker}
      >
        {open ? 'Close Date Picker' : 'Open Date Picker'}
      </Button>
      
      <div className={classes.pickerContainer}>
        {open && (
          <DateRangePicker
            open={open}
            toggle={toggleDatePicker}
            onChange={handleDateRangeChange}
            initialDateRange={dateRange || undefined}
          />
        )}
      </div>
      
      {dateRange && (
        <Box className={classes.dateDisplay}>
          <Typography variant="subtitle1">Selected Date Range:</Typography>
          <Typography>
            From: {formatDate(dateRange.startDate)}
          </Typography>
          <Typography>
            To: {formatDate(dateRange.endDate)}
          </Typography>
        </Box>
      )}
      
      {!dateRange && (
        <Box className={classes.dateDisplay}>
          <Typography variant="body1">
            No date range selected. Click the button above to select dates.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default DateRangePickerExample;

