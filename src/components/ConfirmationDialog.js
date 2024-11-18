import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';

function ConfirmationDialog({ open, onClose, onConfirm, title, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || "Confirm Action"}</DialogTitle>
      <DialogContent>
        <Typography style={{ color: 'red' }}>
          {message || "Are you sure you want to proceed?"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          style={{ backgroundColor: 'red', color: 'white' }}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
