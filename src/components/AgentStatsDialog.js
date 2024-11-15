import React, { useState, useEffect } from 'react';
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

  const getFormattedKey = (key) => {
    const replacements = {
      nombreAppelsEntrants: 'Nombre d\'appels entrants', 
      dtce: 'Durée totale d\'appels entrants (sec)',
      dmce: 'Durée moyenne d\'appels entrants (sec)',
      nombreAppelsSortants: 'Nombre d\'appels sortants',
      dtcs: 'Durée totale d\'appels sortants (sec)',
      dmcs: 'Durée moyenne d\'appels sortants (sec)',
      totalDays: 'Nombre de Jours'
    };
    return replacements[key] || key; // Return the replacement if it exists, otherwise return the key as is
  };

  const orderOfKeys = [
    'nombreAppelsEntrants',
    'dtce',
    'dmce',
    'nombreAppelsSortants',
    'dtcs',
    'dmcs',
    'totalDays' // Ensuring 'totalDays' appears last
  ];

  const sortedStatistics = statistics ? orderOfKeys
    .filter(key => key in statistics)  // Filter out keys that are not in the statistics
    .map(key => ({ key, value: statistics[key] })) : [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
          slotProps={{
            inputLabel: {
              shrink: true,
            },
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
          slotProps={{
            inputLabel: {
              shrink: true,
            },
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
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table size="small" aria-label="Agent statistics">
              <TableBody>
                {sortedStatistics.map(({ key, value }, index) => (
                  <TableRow key={key} style={{ backgroundColor: index % 2 === 0 ? '#adcced' : '#ede8d0' }}>
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
