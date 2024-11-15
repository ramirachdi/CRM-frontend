import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { fetchStatisticsBetweenDates } from '../services/statisticsService';

function AgentStatsDialog({ open, onClose, agent }) {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [compagneId, setCompagneId] = useState('');
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    if (agent && agent.compagnes.length > 0) {
      setCompagneId(agent.compagnes[0].id); // Default to the first compagne
    }
  }, [agent]);

  const handleFetchStatistics = async () => {
    if (!dateDebut || !dateFin || !compagneId) {
      alert('Please select all fields.');
      return;
    }

    try {
      const formattedDateDebut = new Date(dateDebut).toISOString();
      const formattedDateFin = new Date(dateFin).toISOString();
      const data = await fetchStatisticsBetweenDates(agent.id, compagneId, formattedDateDebut, formattedDateFin);
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Statistics for {agent?.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Date Debut"
          type="datetime-local"
          fullWidth
          margin="dense"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
        />
        <TextField
          label="Date Fin"
          type="datetime-local"
          fullWidth
          margin="dense"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
        />
        <TextField
          label="Compagne"
          select
          fullWidth
          margin="dense"
          value={compagneId}
          onChange={(e) => setCompagneId(e.target.value)}
        >
          {agent?.compagnes.map((compagne) => (
            <MenuItem key={compagne.id} value={compagne.id}>
              {compagne.name}
            </MenuItem>
          ))}
        </TextField>
        {statistics && (
          <div style={{ marginTop: '20px' }}>
            <h4>Statistics:</h4>
            <p>Nombre Appels Entrants: {statistics.nombreAppelsEntrants}</p>
            <p>DTCE: {statistics.dtce}</p>
            <p>DMCE: {statistics.dmce}</p>
            <p>Nombre Appels Sortants: {statistics.nombreAppelsSortants}</p>
            <p>DTCS: {statistics.dtcs}</p>
            <p>DMCS: {statistics.dmcs}</p>
            <p>Total Days: {statistics.totalDays}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleFetchStatistics} color="primary">
          Fetch Statistics
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AgentStatsDialog;
