import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper
} from '@mui/material';
import { fetchStatisticsBetweenDates } from '../services/statisticsService';

function AgentStatsDialog({ open, onClose, agent }) {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [compagneId, setCompagneId] = useState('');
  const [statistics, setStatistics] = useState(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setInitialFetchDone(false);
    setStatistics(null);
    if (agent?.compagnes?.length > 0) {
      setCompagneId(agent.compagnes[0].id); // Default to the first compagne
    } else {
      setCompagneId(''); // Clear if no compagnes
    }
  }, [agent]);

  const fetchStatistics = useCallback(async () => {
    if (!dateDebut || !dateFin || !compagneId) {
      setError('All fields must be filled out.');
      return;
    }

    setError(''); // Clear any existing error
    if (agent && agent.id) {
      try {
        const formattedDateDebut = `${dateDebut}T00:00:00.000Z`;
        const formattedDateFin = `${dateFin}T23:59:59.999Z`;
        const data = await fetchStatisticsBetweenDates(agent.id, compagneId, formattedDateDebut, formattedDateFin);
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setStatistics(null);
      }
    }
  }, [dateDebut, dateFin, compagneId, agent]);

  useEffect(() => {
    if (initialFetchDone) {
      fetchStatistics();
    }
  }, [dateDebut, dateFin, compagneId, fetchStatistics, initialFetchDone]);

  const handleInitialFetch = () => {
    fetchStatistics();
    setInitialFetchDone(true); // Mark the initial fetch as done
  };

  const handleDialogClose = () => {
    onClose();
    setStatistics(null);
    setInitialFetchDone(false); // Reset initial fetch status
    setError(''); // Clear error on close
  };

  const handleChange = (setter) => (value) => {
    setter(value);
  };

  const getFormattedKey = (key) => {
    const replacements = {
      nombreAppelsEntrants: "Nombre d'appels entrants",
      dtce: "Durée totale d'appels entrants (sec)",
      dmce: "Durée moyenne d'appels entrants (sec)",
      nombreAppelsSortants: "Nombre d'appels sortants",
      dtcs: "Durée totale d'appels sortants (sec)",
      dmcs: "Durée moyenne d'appels sortants (sec)",
      totalDays: 'Nombre de Jours',
    };
    return replacements[key] || key;
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="md">
      <DialogTitle>Statistics for {agent?.name || 'Unavailable'}</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <TextField
          label="Date Debut"
          type="date"
          fullWidth
          margin="dense"
          value={dateDebut}
          onChange={(e) => handleChange(setDateDebut)(e.target.value)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Date Fin"
          type="date"
          fullWidth
          margin="dense"
          value={dateFin}
          onChange={(e) => handleChange(setDateFin)(e.target.value)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Compagne"
          select
          fullWidth
          margin="dense"
          value={compagneId}
          onChange={(e) => handleChange(setCompagneId)(e.target.value)}
          variant="outlined"
        >
          {agent?.compagnes?.length > 0 ? (
            agent.compagnes.map((compagne) => (
              <MenuItem key={compagne.id} value={compagne.id}>
                {compagne.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No compagnes available</MenuItem>
          )}
        </TextField>
        {statistics && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table size="small" aria-label="Agent statistics">
              <TableBody>
                {Object.entries(statistics)
                  .filter(([key, _]) => !key.endsWith('Id'))
                  .map(([key, value], index) => (
                    <TableRow
                      key={key}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#bdddfc' : '#fff1e7',
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontWeight: 'bold' }}
                      >
                        {getFormattedKey(key)}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: 'right', paddingRight: '24px' }}
                      >
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleInitialFetch} color="primary" disabled={initialFetchDone}>
          Fetch Statistics
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AgentStatsDialog;
