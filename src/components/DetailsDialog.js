import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';

const DetailsDialog = ({ open, onClose, details }) => {
  if (!details) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        {details.data?.length > 0 ? (
          <List>
            {details.data.map((detail, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={detail.type}
                  secondary={`Durée: ${detail.value}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No details available.</p>
        )}
        <Button
          onClick={onClose}
          variant="contained"
          style={{ marginTop: '16px', backgroundColor: "#31473A" }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
