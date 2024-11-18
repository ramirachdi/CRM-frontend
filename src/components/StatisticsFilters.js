import React from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

function StatisticsFilters({ dateDebut, setDateDebut, dateFin, setDateFin, selection, setSelection, handleFetchStatistics, error }) {
  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <TextField
        label="Date Debut"
        type="date"
        fullWidth
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Date Fin"
        type="date"
        fullWidth
        value={dateFin}
        onChange={(e) => setDateFin(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Selection"
        select
        fullWidth
        value={selection}
        onChange={(e) => setSelection(e.target.value)}
      >
        <MenuItem value="compagne">Compagnes</MenuItem>
        <MenuItem value="agent">Agents</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleFetchStatistics}>
        Fetch Stats
      </Button>
      {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
    </div>
  );
}

export default StatisticsFilters;
