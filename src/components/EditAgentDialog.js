import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material';

function EditAgentDialog({ open, onClose, agentData, onSave }) {
  const [agent, setAgent] = React.useState(agentData);

  React.useEffect(() => {
    setAgent(agentData);
  }, [agentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(agent);
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
