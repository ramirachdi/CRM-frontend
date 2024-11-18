import React, { useState } from 'react';
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
} from '@mui/material';

function AgentStatisticsTable({ agentStatistics }) {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('agentName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredStatistics = agentStatistics.filter(
    (stat) =>
      stat.agentName.toLowerCase().includes(searchQuery) ||
      (stat.compagneName || 'All Compagnes').toLowerCase().includes(searchQuery)
  );

  const sortedStatistics = [...filteredStatistics].sort((a, b) => {
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
                <TableSortLabel
                  active={orderBy === 'compagneName'}
                  direction={orderBy === 'compagneName' ? orderDirection : 'asc'}
                  onClick={() => handleRequestSort('compagneName')}
                >
                  Compagne Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Nombre Appels Entrants</TableCell>
              <TableCell>Durée Totale Entrants (DTCE)</TableCell>
              <TableCell>Durée Moyenne Entrants (DMCE)</TableCell>
              <TableCell>Nombre Appels Sortants</TableCell>
              <TableCell>Durée Totale Sortants (DTCS)</TableCell>
              <TableCell>Durée Moyenne Sortants (DMCS)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStatistics.map((stat, index) => (
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
