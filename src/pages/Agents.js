import React, { useState } from 'react';
import AgentTable from '../components/AgentTable';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


function Agents() {
  const [agents, setAgents] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "555-0100", stats: "View Stats" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "555-0101", stats: "View Stats" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555-0102", stats: "View Stats" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com", phone: "555-0103", stats: "View Stats" },
    { id: 5, name: "Charlie White", email: "charlie.white@example.com", phone: "555-0104", stats: "View Stats" },
    { id: 6, name: "David Black", email: "david.black@example.com", phone: "555-0105", stats: "View Stats" },
    { id: 7, name: "Eve Green", email: "eve.green@example.com", phone: "555-0106", stats: "View Stats" },
    { id: 8, name: "Frank Grey", email: "frank.grey@example.com", phone: "555-0107", stats: "View Stats" },
    { id: 9, name: "Grace Pink", email: "grace.pink@example.com", phone: "555-0108", stats: "View Stats" },
    { id: 10, name: "Henry Purple", email: "henry.purple@example.com", phone: "555-0109", stats: "View Stats" }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
      <div style={{ margin: '20px' }}>
        <TextField
          label="Search Agents"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }
          }}
          color="primary"
          style={{ marginBottom: '20px' }}
        />
        <AgentTable agents={agents.filter(agent => agent.name.toLowerCase().includes(searchQuery))} setAgents={setAgents} />
      </div>
  );
}

export default Agents;
