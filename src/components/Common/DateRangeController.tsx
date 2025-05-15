import React, { useState } from 'react';
import {
TextField,
InputAdornment,
Grid,
} from '@material-ui/core';
import { DateRangePicker, DateRange } from 'materialui-daterange-picker';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography, Paper, Box } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { useStyles } from '../../styles';
import { filterObjectKeys } from '../../utils/helpers'

// Define styles using Material-UI's makeStyles
const useStyle = makeStyles((theme: Theme) =>
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
  month: '2-digit';
  day: '2-digit';
}

export default function DateRangeController ({
  control,
  errors,
  setValue
}) {
  const classes = useStyle();
  const classe = useStyles();

   // Component state
  const [open, setOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  // Function to format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return 'Not selected';
   
    const options: DateFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    const dtf = new Intl.DateTimeFormat('en-US', options);

    return dtf.format(date);
  };

  // Handler for when a date range is selected
  const handleDateRangeChange = (range: DateRange): void => {
    const {startDate, endDate} = range;

    setValue('occurrenceTimeStart', formatDate(startDate), { shouldValidate: true })
    setValue('occurrenceTimeEnd', formatDate(endDate), { shouldValidate: true })
    setDateRange(range);
  };

  // Toggle the date picker's visibility
  const toggleDatePicker = (): void => {
    setOpen(!open);
  };

  const displayDates = () => {
    const startDate = dateRange?.startDate ? formatDate(dateRange?.startDate) : ''
    const endDate = dateRange?.endDate ? formatDate(dateRange?.endDate) : ''

    if (dateRange?.startDate && dateRange.endDate) {
      return formatDate(dateRange?.startDate) + ' - ' +  formatDate(dateRange.endDate)
    } else {
      return '';
    }
  }

  const dateRangeErrors = filterObjectKeys(errors, ['occurrenceTimeStart', 'occurrenceTimeEnd']);
  const dateRangeErrorMessage = (Object.entries(dateRangeErrors).length > 0 ) 
    ? Object.values(dateRangeErrors)[0]?.message 
    : '';

  return (
    <>
      <TextField
        className={classe.input} 
        fullWidth
        id='date-picker'
        variant="outlined"
        margin="normal"
        // onChange={onChange}
        value={displayDates()}
        label="Date of the occurrence?" 
        // inputRef={ref}
        // required={required}
        error={!!dateRangeErrorMessage}
        helperText={dateRangeErrorMessage}
        InputLabelProps={{ shrink: true }} 
        InputProps={{
          endAdornment: <InputAdornment position="start">
            <EventIcon 
              onClick={toggleDatePicker} />
          </InputAdornment>
        }}
      />

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
    </>
  )
}