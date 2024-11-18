import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TableSortLabel,
  TablePagination,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteAgent, editAgent, createAgent } from '../services/agentService';
import EditAgentDialog from './EditAgentDialog';
import AgentStatsDialog from './AgentStatsDialog';

function AgentTable({ agents, setAgents }) {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [openStatsDialog, setOpenStatsDialog] = useState(false);
  const [selectedAgentForStats, setSelectedAgentForStats] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAgentIdForDelete, setSelectedAgentIdForDelete] = useState(null);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = async () => {
    try {
      await deleteAgent(selectedAgentIdForDelete);
      setAgents((prevAgents) =>
        prevAgents.filter((agent) => agent.id !== selectedAgentIdForDelete)
      );
    } catch (error) {
      console.error(`Error deleting agent with id ${selectedAgentIdForDelete}:`, error);
    } finally {
      setOpenDeleteDialog(false);
      setSelectedAgentIdForDelete(null);
    }
  };

  const handleOpenEditDialog = (agent) => {
    setSelectedAgent(agent);
    setIsEditMode(true);
    setOpenEditDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setSelectedAgent({ name: '', email: '', phone: '' });
    setIsEditMode(false);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedAgent(null); // Clear selected agent on close
  };

  const handleSave = async (agent) => {
    try {
      if (isEditMode) {
        const updatedAgent = await editAgent(agent.id, agent);
        setAgents((prevAgents) =>
          prevAgents.map((a) => (a.id === agent.id ? updatedAgent : a))
        );
      } else {
        const newAgent = await createAgent(agent);
        setAgents((prevAgents) => [...prevAgents, newAgent]);
      }
      handleCloseEditDialog();
    } catch (error) {
      console.error('Failed to save agent:', error);
    }
  };

  const handleViewStats = (agent) => {
    setSelectedAgentForStats(agent);
    setOpenStatsDialog(true);
  };

  const handleCloseStatsDialog = () => {
    setOpenStatsDialog(false);
    setSelectedAgentForStats(null); // Clear selected agent for stats on close
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
              <TableCell>Compagnes</TableCell>
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
                <TableCell>
                  <PhoneIcon
                    fontSize="small"
                    style={{ verticalAlign: 'middle', marginRight: 5, color: '#2e6f40' }}
                  />
                  {agent.phone}
                </TableCell>
                <TableCell>
                  {agent.compagnes?.length
                    ? agent.compagnes.map((compagne) => compagne.name).join(', ')
                    : 'No compagnes'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewStats(agent)}
                    style={{ backgroundColor: '#59b5f7', color: 'white' }}
                  >
                    View Stats
                  </Button>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => handleOpenEditDialog(agent)}
                      style={{ color: '#453306' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        setSelectedAgentIdForDelete(agent.id);
                        setOpenDeleteDialog(true);
                      }}
                      style={{ color: '#cd1c18' }}
                    >
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

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Agent"
        message="Are you sure you want to delete this agent ? This action cannot be undone."
      />

      <EditAgentDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        agentData={selectedAgent}
        onSave={handleSave}
      />

      <AgentStatsDialog
        open={openStatsDialog}
        onClose={handleCloseStatsDialog}
        agent={selectedAgentForStats}
      />
    </>
  );
}

export default AgentTable;
