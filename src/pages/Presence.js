import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import DateSelector from '../components/DateSelector';
import PresenceTable from '../components/PresenceTable';
import { fetchPresencesByDate } from '../services/presenceService';

const Presence = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [presences, setPresences] = useState([]);
  const [error, setError] = useState('');

  const handleFetchPresences = async () => {
    if (!selectedDate) {
      setError('Please select a date before fetching presences.');
      return;
    }

    setError('');
    try {
      const data = await fetchPresencesByDate(selectedDate);
      setPresences(data);
    } catch (error) {
      setError('Failed to fetch presences. Please try again later.');
      console.error('Error fetching presences:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Presence Management
      </Typography>
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Button
        variant="contained"
        onClick={handleFetchPresences}
        style={{ marginBottom: '20px', backgroundColor: '#31473A' }}
      >
        Fetch Presences
      </Button>
      {error && (
        <Typography color="error" style={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}
      <PresenceTable presences={presences} />
    </div>
  );
};

export default Presence;
