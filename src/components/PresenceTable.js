import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

const PresenceTable = ({ presences }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#e0cd95' }}>
            <TableCell>Agent Name</TableCell>
            <TableCell>Login</TableCell>
            <TableCell>Logout</TableCell>
            <TableCell>Duree Log</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {presences.map((presence) => (
            <TableRow key={presence.id}>
              <TableCell>{presence.agent.name}</TableCell>
              <TableCell>{presence.login}</TableCell>
              <TableCell>{presence.logout}</TableCell>
              <TableCell>{presence.dureeLog}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PresenceTable;
