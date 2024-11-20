import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  TableSortLabel,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { fetchStatisticsBetweenDates, fetchSummedStatisticsForAllCompagnes } from '../services/statisticsService';

function AgentStatisticsTable({
  agentStatistics,
  setAgentStatistics,
  dateDebut,
  dateFin,
  selectedCompagne,
  setSelectedCompagne,
}) {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('agentName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [compagnes, setCompagnes] = useState([]);

  useEffect(() => {
    // Fetch the list of compagnes
    async function fetchCompagneList() {
      try {
        const response = await fetch('http://localhost:3001/compagnes'); // Replace with your service
        const data = await response.json();
        setCompagnes([{ id: -1, name: 'All Compagnes' }, ...data]);
      } catch (error) {
        console.error('Error fetching compagnes:', error);
      }
    }

    fetchCompagneList();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCompagneChange = async (event) => {
    const selected = event.target.value;
    setSelectedCompagne(selected);

    try {
      if (selected === -1) {
        // Fetch all agents stats for all compagnes
        const response = await fetchSummedStatisticsForAllCompagnes(null, dateDebut, dateFin);
        setAgentStatistics(response);
      } else {
        // Fetch stats for the selected compagne
        const response = await fetchStatisticsBetweenDates(null, selected, dateDebut, dateFin);
        setAgentStatistics(response);
      }
    } catch (error) {
      console.error('Error fetching agent statistics for selected compagne:', error);
    }
  };

  const filteredStatistics = agentStatistics.filter(
    (stat) =>
      stat.agentName.toLowerCase().includes(searchQuery) ||
      (stat.compagneName || 'All Compagnes').toLowerCase().includes(searchQuery)
  );

  const enrichedStatistics = filteredStatistics.map((stat) => ({
    ...stat,
    appelsTotal: stat.dtce + stat.dtcs,
  }));

  const sortedStatistics = [...enrichedStatistics].sort((a, b) => {
    if (orderBy === 'agentName' || orderBy === 'compagneName') {
      const valueA = (a[orderBy] || '').toLowerCase();
      const valueB = (b[orderBy] || '').toLowerCase();
      return orderDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      const valueA = a[orderBy] || 0;
      const valueB = b[orderBy] || 0;
      return orderDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
  });

  const paginatedStatistics = sortedStatistics.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TextField
        label="Search Agents"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
        placeholder="Search by agent or compagne name..."
      />
      <FormControl fullWidth style={{ marginBottom: '16px' }}>
        <InputLabel>Compagne</InputLabel>
        <Select value={selectedCompagne ?? -1} onChange={handleCompagneChange}>
          {compagnes.map((compagne) => (
            <MenuItem key={compagne.id} value={compagne.id}>
              {compagne.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#e0cd95' }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'agentName'}
                  direction={orderBy === 'agentName' ? orderDirection : 'asc'}
                  onClick={() => handleRequestSort('agentName')}
                >
                  Agent Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Compagne Name
              </TableCell>
              <TableCell>Nombre Appels Entrants</TableCell>
              <TableCell>Durée Totale Entrants (DTCE)</TableCell>
              <TableCell>Durée Moyenne Entrants (DMCE)</TableCell>
              <TableCell>Nombre Appels Sortants</TableCell>
              <TableCell>Durée Totale Sortants (DTCS)</TableCell>
              <TableCell>Durée Moyenne Sortants (DMCS)</TableCell>
              <TableCell style={{backgroundColor: "#cd1c18"}}>
                <TableSortLabel
                  active={orderBy === 'appelsTotal'}
                  direction={orderBy === 'appelsTotal' ? orderDirection : 'asc'}
                  onClick={() => handleRequestSort('appelsTotal')}
                >
                  Durée Totale d'Appels
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStatistics.map((stat, index) => (
              <TableRow key={index}>
                <TableCell>{stat.agentName}</TableCell>
                <TableCell>
                  {selectedCompagne === -1
                    ? 'All Compagnes'
                    : compagnes.find((compagne) => compagne.id === selectedCompagne)?.name || 'Unknown Compagne'}
                </TableCell>
                <TableCell>{stat.nombreAppelsEntrants}</TableCell>
                <TableCell>{stat.dtce}</TableCell>
                <TableCell>{stat.dmce}</TableCell>
                <TableCell>{stat.nombreAppelsSortants}</TableCell>
                <TableCell>{stat.dtcs}</TableCell>
                <TableCell>{stat.dmcs}</TableCell>
                <TableCell style={{ backgroundColor: '#ffa896' }}>
                  {stat.appelsTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStatistics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </>
  );
}

export default AgentStatisticsTable;
