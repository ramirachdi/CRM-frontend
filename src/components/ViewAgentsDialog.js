import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';

function ViewAgentsDialog({ open, onClose, agents = [] }) { // Default to empty array if agents is undefined
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agents for Selected Compagne</DialogTitle>
      <DialogContent dividers>
        <List>
          {agents.length > 0 ? (
            agents.map((agent) => (
              <ListItem key={agent.id}>
                <ListItemText primary={agent.name} secondary={agent.email} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No agents associated with this compagne." />
            </ListItem>
          )}
        </List>
      </DialogContent>
      <Button onClick={onClose} color="primary" style={{ margin: '10px' }}>
        Close
      </Button>
    </Dialog>
  );
}

export default ViewAgentsDialog;
