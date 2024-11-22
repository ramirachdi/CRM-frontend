import React, { useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from '@mui/material';
import DetailsDialog from './DetailsDialog'; 
import { fetchPresenceDetails } from '../services/presenceService'; 

const PresenceTable = ({ presences }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const handleViewDetails = async (presenceId) => {
    try {
      const fetchedDetails = await fetchPresenceDetails(presenceId);
      setDetails(fetchedDetails);
      setOpen(true); // Open the dialog
    } catch (error) {
      console.error(`Error fetching details for presence ID ${presenceId}:`, error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDetails(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#EDF4F2' }}>
              <TableCell>Agent Name</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Logout</TableCell>
              <TableCell>Duration Logged</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presences.length > 0 ? (
              presences.map((presence) => (
                <TableRow key={presence.id}>
                  <TableCell>{presence.agent?.name || 'Unknown'}</TableCell>
                  <TableCell>{presence.login}</TableCell>
                  <TableCell>{presence.logout}</TableCell>
                  <TableCell>{presence.dureeLog}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDetails(presence.id)}
                      style={{ backgroundColor: '#7C8363' }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No presences found for the selected date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <DetailsDialog open={open} onClose={handleClose} details={details} />
    </>
  );
};

export default PresenceTable;
