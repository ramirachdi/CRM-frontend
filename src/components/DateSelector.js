import React from 'react';
import { FormControl, TextField } from '@mui/material';

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (event) => {
    setSelectedDate(event.target.value); // This returns a string in YYYY-MM-DD format
  };

  return (
    <FormControl fullWidth style={{ marginBottom: '20px' }}>
      <TextField
        label="Select Date"
        type="date"
        value={selectedDate || ''}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
};

export default DateSelector;
