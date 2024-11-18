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

function CompagneStatisticsTable({ compagneStatistics }) {
  const [orderDirection, setOrderDirection] = useState('desc');
  const [orderBy, setOrderBy] = useState('tauxOccupation');
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

  // Filter and sort the compagne statistics
  const filteredStatistics = compagneStatistics
    .filter((stat) =>
      stat.compagneName.toLowerCase().includes(searchQuery)
    )
    .map((stat) => {
      const totalOccupationWeight = compagneStatistics.reduce(
        (sum, stat) => sum + (stat.dtce + stat.dtcs),
        0
      );
      const currentOccupationWeight = stat.dtce + stat.dtcs;
      const tauxOccupation =
        totalOccupationWeight > 0
          ? (currentOccupationWeight / totalOccupationWeight) * 100
          : 0;

      return { ...stat, tauxOccupation };
    })
    .sort((a, b) => {
      if (orderBy === 'tauxOccupation') {
        return orderDirection === 'asc'
          ? a.tauxOccupation - b.tauxOccupation
          : b.tauxOccupation - a.tauxOccupation;
      } else {
        const valueA = a[orderBy]?.toString().toLowerCase() || '';
        const valueB = b[orderBy]?.toString().toLowerCase() || '';
        return orderDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });

  const paginatedStatistics = filteredStatistics.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TextField
        label="Search Compagnes"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
        placeholder="Type to search..."
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#e0cd95' }}>
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
              <TableCell style={{backgroundColor: "#cd1c18"}}>
                <TableSortLabel
                  active={orderBy === 'tauxOccupation'}
                  direction={orderBy === 'tauxOccupation' ? orderDirection : 'asc'}
                  onClick={() => handleRequestSort('tauxOccupation')}
                >
                  Taux d&apos;Occupation
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStatistics.map((stat, index) => (
              <TableRow key={index}>
                <TableCell>{stat.compagneName}</TableCell>
                <TableCell>{stat.nombreAppelsEntrants}</TableCell>
                <TableCell>{stat.dtce}</TableCell>
                <TableCell>{stat.dmce}</TableCell>
                <TableCell>{stat.nombreAppelsSortants}</TableCell>
                <TableCell>{stat.dtcs}</TableCell>
                <TableCell>{stat.dmcs}</TableCell>
                <TableCell style={{ backgroundColor: '#ffa896' }}>
                  {stat.tauxOccupation.toFixed(2)}%
                </TableCell>
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

export default CompagneStatisticsTable;
