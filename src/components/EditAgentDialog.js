import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchCompagnes } from '../services/compagneService'; // Assumes a service to fetch compagnes

function EditAgentDialog({ open, onClose, agentData, onSave }) {
  const [agent, setAgent] = useState(agentData);
  const [compagnes, setCompagnes] = useState([]); // List of all compagnes from the backend
  const [selectedCompagnes, setSelectedCompagnes] = useState([]); // Selected compagnes for the agent

  useEffect(() => {
    // Set the agent data when opening the dialog
    setAgent(agentData);
    setSelectedCompagnes(agentData?.compagnes || []); // Initialize with existing compagnes

    // Fetch all available compagnes from backend
    const loadCompagnes = async () => {
      try {
        const data = await fetchCompagnes(); // Fetch all compagnes from the backend
        setCompagnes(data);
      } catch (error) {
        console.error('Failed to load compagnes:', error);
      }
    };

    loadCompagnes();
  }, [agentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompagneChange = (event, newValue) => {
    setSelectedCompagnes(newValue); // Update selected compagnes
  };

  const handleSave = () => {
    onSave({ ...agent, compagneIds: selectedCompagnes.map(c => c.id) }); // Pass only IDs to onSave
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{agentData?.id ? 'Edit Agent' : 'Create Agent'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={agent?.name || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={agent?.email || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Phone"
          name="phone"
          fullWidth
          value={agent?.phone || ''}
          onChange={handleChange}
        />

        {/* Compagnes Multi-Select with Disabled Selected Options */}
        <Autocomplete
          multiple
          options={compagnes}
          getOptionLabel={(option) => option.name}
          value={selectedCompagnes}
          onChange={handleCompagneChange}
          getOptionDisabled={(option) =>
            selectedCompagnes.some((selectedCompagne) => selectedCompagne.id === option.id)
          } // Disable already selected options
          renderInput={(params) => (
            <TextField {...params} variant="outlined" margin="dense" label="Select Compagnes" placeholder="Compagnes" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {agentData?.id ? 'Save Changes' : 'Add Agent'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAgentDialog;
