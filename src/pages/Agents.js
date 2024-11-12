import React, { useState, useEffect } from 'react';
import AgentTable from '../components/AgentTable';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { fetchAgents } from '../services/agentService';

function Agents() {
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (error) {
        console.error('Failed to load agents:', error);
      }
    };
    loadAgents();
  }, []);

  return (
      <div>
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
          }}}
          
          color="primary"
          style={{ marginBottom: '20px' }}
        />
        <AgentTable 
          agents={agents.filter(agent => agent.name.toLowerCase().includes(searchQuery))} 
          setAgents={setAgents} 
        />
      </div>
  );
}

export default Agents;
