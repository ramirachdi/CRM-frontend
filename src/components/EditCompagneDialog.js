// src/components/EditCompagneDialog.js
import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material';

function EditCompagneDialog({ open, onClose, compagneData, onSave }) {
  const [compagne, setCompagne] = React.useState(compagneData);

  React.useEffect(() => {
    setCompagne(compagneData);
  }, [compagneData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompagne((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(compagne);
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
