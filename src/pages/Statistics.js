import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Typography,
} from '@mui/material';
import {
  fetchCompagneStatisticsBetweenDates,
  fetchSummedStatisticsForAllCompagnes,
} from '../services/statisticsService';

function Statistics() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [selection, setSelection] = useState(''); // 'compagne' or 'agent'
  const [compagneStatistics, setCompagneStatistics] = useState([]);
  const [agentStatistics, setAgentStatistics] = useState([]);
  const [error, setError] = useState('');

  const handleFetchStatistics = async () => {
    setError('');
    setCompagneStatistics([]);
    setAgentStatistics([]);
    if (!dateDebut || !dateFin || !selection) {
      setError('All fields must be filled.');
      return;
    }

    try {
      if (selection === 'compagne') {
        const response = await fetchCompagneStatisticsBetweenDates(null, dateDebut, dateFin);
        setCompagneStatistics(response);
      } else if (selection === 'agent') {
        const response = await fetchSummedStatisticsForAllCompagnes(null, dateDebut, dateFin);
        setAgentStatistics(response);
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError('Failed to fetch statistics.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Statistics
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
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
      </div>

      {/* Compagnes Table */}
      {selection === 'compagne' && compagneStatistics.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#e0cd95' }}>
                <TableCell>Compagne Name</TableCell>
                <TableCell>Nombre Appels Entrants</TableCell>
                <TableCell>Durée Totale Entrants (DTCE)</TableCell>
                <TableCell>Durée Moyenne Entrants (DMCE)</TableCell>
                <TableCell>Nombre Appels Sortants</TableCell>
                <TableCell>Durée Totale Sortants (DTCS)</TableCell>
                <TableCell>Durée Moyenne Sortants (DMCS)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compagneStatistics.map((stat, index) => (
                <TableRow key={index}>
                  <TableCell>{stat.compagneName}</TableCell>
                  <TableCell>{stat.nombreAppelsEntrants}</TableCell>
                  <TableCell>{stat.dtce}</TableCell>
                  <TableCell>{stat.dmce}</TableCell>
                  <TableCell>{stat.nombreAppelsSortants}</TableCell>
                  <TableCell>{stat.dtcs}</TableCell>
                  <TableCell>{stat.dmcs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Agents Table */}
      {selection === 'agent' && agentStatistics.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#e0cd95' }}>
                <TableCell>Agent Name</TableCell>
                <TableCell>Compagne Name</TableCell>
                <TableCell>Nombre Appels Entrants</TableCell>
                <TableCell>Durée Totale Entrants (DTCE)</TableCell>
                <TableCell>Durée Moyenne Entrants (DMCE)</TableCell>
                <TableCell>Nombre Appels Sortants</TableCell>
                <TableCell>Durée Totale Sortants (DTCS)</TableCell>
                <TableCell>Durée Moyenne Sortants (DMCS)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agentStatistics.map((stat, index) => (
                <TableRow key={index}>
                  <TableCell>{stat.agentName}</TableCell>
                  <TableCell>{stat.compagneName || 'All Compagnes'}</TableCell>
                  <TableCell>{stat.nombreAppelsEntrants}</TableCell>
                  <TableCell>{stat.dtce}</TableCell>
                  <TableCell>{stat.dmce}</TableCell>
                  <TableCell>{stat.nombreAppelsSortants}</TableCell>
                  <TableCell>{stat.dtcs}</TableCell>
                  <TableCell>{stat.dmcs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Statistics;
