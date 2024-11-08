import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Tooltip, TableSortLabel, TablePagination, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import { deleteAgent, editAgent, createAgent } from '../services/agentService';
import EditAgentDialog from './EditAgentDialog';

function AgentTable({ agents, setAgents }) {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for managing the edit and create dialogs
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAgent(id);
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    } catch (error) {
      console.error(`Failed to delete agent with id ${id}:`, error);
    }
  };

  const handleOpenEditDialog = (agent) => {
    setSelectedAgent(agent);
    setIsEditMode(true);
    setOpenDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setSelectedAgent({ name: '', email: '', phone: '' }); // Empty agent for new creation
    setIsEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async (agent) => {
    try {
      if (isEditMode) {
        // Edit Mode
        const updatedAgent = await editAgent(agent.id, agent);
        setAgents((prevAgents) =>
          prevAgents.map((a) => (a.id === agent.id ? updatedAgent : a))
        );
      } else {
        // Create Mode
        const newAgent = await createAgent(agent);
        setAgents((prevAgents) => [...prevAgents, newAgent]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save agent:', error);
    }
  };

  const sortedAgents = [...agents]
    .sort((a, b) => {
      const valueA = a[orderBy] ? a[orderBy].toString().toLowerCase() : '';
      const valueB = b[orderBy] ? b[orderBy].toString().toLowerCase() : '';
      if (valueA < valueB) return orderDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenCreateDialog}
        style={{ marginBottom: '20px' }}
      >
        Add New Agent
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#90d5ff' }}>
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
              <TableCell>Statistics</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAgents.map((agent) => (
              <TableRow key={agent.id} hover>
                <TableCell>{agent.name}</TableCell>
                <TableCell>
                  <EmailIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: 5 }} />
                  {agent.email}
                </TableCell>
                <TableCell>{agent.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => alert(`Statistics for ${agent.name} are coming soon!`)}
                  >
                    View Stats
                  </Button>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEditDialog(agent)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(agent.id)}>
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
          count={agents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>

      <EditAgentDialog
        open={openDialog}
        onClose={handleCloseDialog}
        agentData={selectedAgent}
        onSave={handleSave}
      />
    </>
  );
}

export default AgentTable;
