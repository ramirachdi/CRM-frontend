import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchAgents } from '../services/agentService'; 

function EditCompagneDialog({ open, onClose, compagneData, onSave }) {
  const [compagne, setCompagne] = useState(compagneData);
  const [agents, setAgents] = useState([]); 
  const [selectedAgents, setSelectedAgents] = useState([]); // Selected agents for the compagne

  useEffect(() => {
    // Set the compagne data when opening the dialog
    setCompagne(compagneData);
    setSelectedAgents(compagneData?.agents || []); // Initialize with existing agents

    // Fetch all available agents from the backend
    const loadAgents = async () => {
      try {
        const data = await fetchAgents(); // Fetch all agents from the backend
        setAgents(data);
      } catch (error) {
        console.error('Failed to load agents:', error);
      }
    };

    loadAgents();
  }, [compagneData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompagne((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgentChange = (event, newValue) => {
    setSelectedAgents(newValue); // Update selected agents
  };

  const handleSave = () => {
    onSave({ ...compagne, agentsIds: selectedAgents.map(a => a.id) }); // Pass only IDs to onSave
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{compagneData?.id ? 'Edit Compagne' : 'Create Compagne'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={compagne?.name || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={compagne?.email || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Phone"
          name="phone"
          fullWidth
          value={compagne?.phone || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Type de Service"
          name="typeDeService"
          fullWidth
          value={compagne?.typeDeService || ''}
          onChange={handleChange}
        />

        <Autocomplete
          multiple
          options={agents}
          getOptionLabel={(option) => option.name}
          value={selectedAgents}
          onChange={handleAgentChange}
          getOptionDisabled={(option) =>
            selectedAgents.some((selectedAgent) => selectedAgent.id === option.id)
          } // Disable already selected options
          renderInput={(params) => (
            <TextField {...params} variant="outlined" margin="dense" label="Select Agents" placeholder="Agents" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {compagneData?.id ? 'Save Changes' : 'Add Compagne'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCompagneDialog;
