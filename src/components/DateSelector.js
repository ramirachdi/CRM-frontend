import React from 'react';
import { TextField } from '@mui/material';

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <TextField
      label="Select Date"
      type="date"
      value={selectedDate}
      onChange={handleChange}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      style={{ marginBottom: '20px' }}
    />
  );
};

export default DateSelector;
