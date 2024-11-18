import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper } from '@mui/material';

function CompagneStatisticsTable({ compagneStatistics }) {
  // Calculate the denominator (sum of the weights for all compagnes)
  const totalOccupationWeight = compagneStatistics.reduce((sum, stat) => {
    return sum + (stat.dtce + stat.dtcs);
  }, 0);

  // Add taux d'occupation to each compagne and sort the statistics by taux d'occupation in descending order
  const sortedStatistics = [...compagneStatistics]
    .map((stat) => {
      const currentOccupationWeight =
        stat.dtce + stat.dtcs;
      const tauxOccupation =
        totalOccupationWeight > 0 ? (currentOccupationWeight / totalOccupationWeight) * 100 : 0;

      return { ...stat, tauxOccupation };
    })
    .sort((a, b) => b.tauxOccupation - a.tauxOccupation); // Sort by taux d'occupation descending

  return (
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
            <TableCell style={{backgroundColor: "#cd1c18"}}>Taux d&apos;Occupation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedStatistics.map((stat, index) => (
            <TableRow key={index}>
              <TableCell>{stat.compagneName}</TableCell>
              <TableCell>{stat.nombreAppelsEntrants}</TableCell>
              <TableCell>{stat.dtce}</TableCell>
              <TableCell>{stat.dmce}</TableCell>
              <TableCell>{stat.nombreAppelsSortants}</TableCell>
              <TableCell>{stat.dtcs}</TableCell>
              <TableCell>{stat.dmcs}</TableCell>
              <TableCell style={{backgroundColor: "#ffa896"}}>{stat.tauxOccupation.toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompagneStatisticsTable;
