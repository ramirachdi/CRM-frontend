import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Tooltip, TableSortLabel, TablePagination, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';

function AgentTable({ agents, setAgents }) {
  const [orderDirection, setOrderDirection] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedAgents = [...agents].sort((a, b) => {
    let valueA = a[orderBy] || '';
    let valueB = b[orderBy] || '';
    if (typeof valueA === 'string') {
      return (orderDirection === 'asc' ? 1 : -1) * valueA.localeCompare(valueB);
    }
    return (orderDirection === 'asc' ? 1 : -1) * ((valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0);
  }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
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
            <TableCell>
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? orderDirection : 'asc'}
                onClick={() => handleRequestSort('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
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
                <Button variant="outlined" color="primary" onClick={() => alert(`Statistics for ${agent.name}`)}>
                  View Stats
                </Button>
              </TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton>
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default AgentTable;