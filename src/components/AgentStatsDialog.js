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
      const formattedDateDebut = `${dateDebut}T00:00:00.000Z`;
      const formattedDateFin = `${dateFin}T23:59:59.999Z`;
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
          type="date"
          fullWidth
          margin="dense"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Date Fin"
          type="date"
          fullWidth
          margin="dense"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Compagne"
          select
          fullWidth
          margin="dense"
          value={compagneId}
          onChange={(e) => setCompagneId(e.target.value)}
          variant="outlined"
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
            <p>DTAE: {statistics.dtce}</p>
            <p>DMAE: {statistics.dmce}</p>
            <p>Nombre Appels Sortants: {statistics.nombreAppelsSortants}</p>
            <p>DTAS: {statistics.dtcs}</p>
            <p>DMAS: {statistics.dmcs}</p>
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
