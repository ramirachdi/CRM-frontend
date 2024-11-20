import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DateSelector = ({ selectedDate, setSelectedDate, availableDates }) => {
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <FormControl fullWidth style={{ marginBottom: '20px' }}>
      <InputLabel>Select Date</InputLabel>
      <Select value={selectedDate} onChange={handleChange}>
        {availableDates.map((date) => (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DateSelector;
