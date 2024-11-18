import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper } from '@mui/material';

function AgentStatisticsTable({ agentStatistics }) {
  return (
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
  );
}

export default AgentStatisticsTable;
