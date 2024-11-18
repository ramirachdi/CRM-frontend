import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';
import { fetchCompagneStatisticsBetweenDates } from '../services/statisticsService'; 

function CompagneStatsDialog({ open, onClose, compagne }) {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [statistics, setStatistics] = useState(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setInitialFetchDone(false);
    setStatistics(null);
    setDateDebut('');
    setDateFin('');
  }, [compagne]);

  const fetchStatistics = useCallback(async () => {
    if (!dateDebut || !dateFin) {
      setError('Both dates must be filled out.');
      return;
    }

    setError(''); // Clear any existing error
    if (compagne && compagne.id) {
      try {
        const formattedDateDebut = `${dateDebut}T00:00:00.000Z`;
        const formattedDateFin = `${dateFin}T23:59:59.999Z`;
        const data = await fetchCompagneStatisticsBetweenDates(
          compagne.id,
          formattedDateDebut,
          formattedDateFin
        );
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setStatistics(null);
      }
    }
  }, [dateDebut, dateFin, compagne]);

  useEffect(() => {
    if (initialFetchDone) {
      fetchStatistics();
    }
  }, [dateDebut, dateFin, fetchStatistics, initialFetchDone]);

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

  const getFormattedKey = (key) => {
    const replacements = {
      nombreAppelsEntrants: 'Nombre d\'appels entrants',
      dtce: 'Durée totale d\'appels entrants (sec)',
      dmce: 'Durée moyenne d\'appels entrants (sec)',
      nombreAppelsSortants: 'Nombre d\'appels sortants',
      dtcs: 'Durée totale d\'appels sortants (sec)',
      dmcs: 'Durée moyenne d\'appels sortants (sec)',
      totalDays: 'Nombre de Jours',
    };
    return replacements[key] || key;
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="md">
      <DialogTitle>Statistics for {compagne?.name || 'Unavailable'}</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <TextField
          label="Date Debut"
          type="date"
          fullWidth
          margin="dense"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Date Fin"
          type="date"
          fullWidth
          margin="dense"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        {statistics && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table size="small" aria-label="Compagne statistics">
              <TableBody>
                {Object.entries(statistics)
                  .filter(([key]) => !key.endsWith('Id'))
                  .map(([key, value], index) => (
                    <TableRow
                      key={key}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#bdddfc' : '#fff1e7',
                      }}
                    >
                      <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                        {getFormattedKey(key)}
                      </TableCell>
                      <TableCell style={{ textAlign: 'right', paddingRight: '24px' }}>
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

export default CompagneStatsDialog;
