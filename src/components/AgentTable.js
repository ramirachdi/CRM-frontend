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
import { deleteAgent, editAgent, createAgent } from '../services/agentService';
import EditAgentDialog from './EditAgentDialog';
import AgentStatsDialog from './AgentStatsDialog';

function AgentTable({ agents, setAgents }) {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [openStatsDialog, setOpenStatsDialog] = useState(false);
  const [selectedAgentForStats, setSelectedAgentForStats] = useState(null);

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
    setSelectedAgent({ name: '', email: '', phone: '' });
    setIsEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      handleCloseDialog();
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
                  <PhoneIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: 5 }} />
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
                      onClick={() => handleDelete(agent.id)}
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

      <EditAgentDialog
        open={openDialog}
        onClose={handleCloseDialog}
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
