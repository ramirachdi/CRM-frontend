import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Tooltip, TableSortLabel, TablePagination, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import { deleteCompagne, editCompagne, createCompagne } from '../services/compagneService';
import EditCompagneDialog from './EditCompagneDialog';
import ViewAgentsDialog from './ViewAgentsDialog'; // Import the new dialog

function CompagneTable({ compagnes, setCompagnes }) {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompagne, setSelectedCompagne] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openAgentsDialog, setOpenAgentsDialog] = useState(false); // State for agents dialog
  const [agentsForDialog, setAgentsForDialog] = useState([]); // Agents for the dialog

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompagne(id);
      setCompagnes((prev) => prev.filter((compagne) => compagne.id !== id));
    } catch (error) {
      console.error(`Failed to delete compagne with id ${id}:`, error);
    }
  };

  const handleOpenEditDialog = (compagne) => {
    setSelectedCompagne(compagne);
    setIsEditMode(true);
    setOpenDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setSelectedCompagne({ name: '', email: '', phone: '', typeDeService: '' });
    setIsEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async (compagne) => {
    try {
      if (isEditMode) {
        const updatedCompagne = await editCompagne(compagne.id, compagne);
        setCompagnes((prevCompagnes) =>
          prevCompagnes.map((c) => (c.id === compagne.id ? updatedCompagne : c))
        );
      } else {
        const newCompagne = await createCompagne(compagne);
        setCompagnes((prevCompagnes) => [...prevCompagnes, newCompagne]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save compagne:', error);
    }
  };

  const handleViewAgents = (agents) => {
    setAgentsForDialog(agents);
    setOpenAgentsDialog(true);
  };

  const sortedCompagnes = [...compagnes]
    .sort((a, b) => {
      const valueA = a[orderBy] ? a[orderBy].toString().toLowerCase() : '';
      const valueB = b[orderBy] ? b[orderBy].toString().toLowerCase() : '';
      return (orderDirection === 'asc' ? 1 : -1) * valueA.localeCompare(valueB);
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenCreateDialog}
        style={{ marginBottom: '20px', backgroundColor: '#2e6f40' }}
      >
        Add New Compagne
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#68ba7f' }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? orderDirection : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Type de Service</TableCell>
              <TableCell>Agents</TableCell>
              <TableCell>Statistics</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCompagnes.map((compagne) => (
              <TableRow key={compagne.id} hover>
                <TableCell>{compagne.name}</TableCell>
                <TableCell>
                  <EmailIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: 5 }} />
                  {compagne.email}
                </TableCell>
                <TableCell>{compagne.phone}</TableCell>
                <TableCell>{compagne.typeDeService}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewAgents(compagne.agents)}
                    style={{ backgroundColor: '#84b067' , color: 'white' }}
                  >
                    View Agents
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => alert(`Statistics for ${compagne.name} are coming soon!`)}
                    style={{ backgroundColor: '#59b5f7' , color: 'white' }}
                  >
                    View Stats
                  </Button>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEditDialog(compagne)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(compagne.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={compagnes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>

      <EditCompagneDialog
        open={openDialog}
        onClose={handleCloseDialog}
        compagneData={selectedCompagne}
        onSave={handleSave}
      />

      {/* Agents Dialog */}
      <ViewAgentsDialog
        open={openAgentsDialog}
        onClose={() => setOpenAgentsDialog(false)}
        agents={agentsForDialog}
      />
    </>
  );
}

export default CompagneTable;
