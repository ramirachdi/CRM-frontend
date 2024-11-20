import React, { useState } from 'react';
import { Typography } from '@mui/material';
import DateSelector from '../components/DateSelector';
import PresenceTable from '../components/PresenceTable';
import { fetchPresencesByDate } from '../services/presenceService';

const PresencePage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [presences, setPresences] = useState([]);

  const availableDates = ['2024-11-01', '2024-11-02']; // Replace with dynamic dates if needed

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    try {
      const data = await fetchPresencesByDate(date);
      setPresences(data);
    } catch (error) {
      console.error('Error fetching presences:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Presence Management
      </Typography>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
        availableDates={availableDates}
      />
      <PresenceTable presences={presences} />
    </div>
  );
};

export default PresencePage;
